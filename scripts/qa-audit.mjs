/**
 * Full production-readiness sweep of the live Ipekçi site.
 *
 * Runs anonymously (no wp-admin bar, LiteSpeed cache active) so every number
 * reflects what a real visitor gets. Per route x viewport it collects:
 * axe-core WCAG 2.1 A/AA violations, console errors, failed requests,
 * horizontal overflow, and the Core Web Vitals we can measure in-page.
 *
 * Usage: node scripts/qa-audit.mjs [> qa-audit.json]
 */
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

const BASE = 'https://ipekcislachterij.localclicks.nl';
const AXE = 'https://cdn.jsdelivr.net/npm/axe-core@4.10.2/axe.min.js';

const ROUTES = [
  '/', '/ons-verhaal/', '/contact/',
  '/assortiment/', '/assortiment/lamsvlees/', '/assortiment/rundvlees/',
  '/assortiment/kip/', '/assortiment/eindproducten/',
  '/voor-wie/', '/voor-wie/slagerijen/', '/voor-wie/groothandels/',
  '/voor-wie/supermarkten/', '/voor-wie/restaurants/',
];

const VIEWPORTS = [
  { name: 'mobile-portrait', width: 390, height: 844 },
  { name: 'mobile-landscape', width: 844, height: 390 },
  { name: 'tablet-portrait', width: 768, height: 1024 },
  { name: 'tablet-landscape', width: 1024, height: 768 },
  { name: 'desktop', width: 1440, height: 900 },
];

const results = [];

const browser = await chromium.launch();

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  });

  for (const route of ROUTES) {
    const page = await ctx.newPage();
    const consoleErrors = [];
    const failedRequests = [];

    page.on('console', (m) => {
      if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 200));
    });
    page.on('requestfailed', (r) => {
      failedRequests.push(`${r.url().slice(0, 120)} :: ${r.failure()?.errorText}`);
    });
    page.on('response', (r) => {
      if (r.status() >= 400) failedRequests.push(`${r.status()} ${r.url().slice(0, 120)}`);
    });

    const entry = { viewport: vp.name, route };

    try {
      // 'domcontentloaded', not 'load': the homepage pulls ~117 images from the
      // external media CDN, which intermittently resets connections. Waiting for
      // 'load' therefore measures that CDN's flakiness (and times out) rather
      // than the page. Everything asserted below is settled by DCL + the pause.
      const resp = await page.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 60000 });
      entry.status = resp?.status() ?? null;

      // Let lazy content, fonts and scroll-triggered animations settle.
      await page.waitForTimeout(3000);

      // Accessibility — exclude nothing; anonymous pages have no admin bar.
      await page.addScriptTag({ url: AXE });
      const axeResult = await page.evaluate(async () => {
        const r = await window.axe.run(document, {
          runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
          resultTypes: ['violations'],
        });
        return r.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          count: v.nodes.length,
          help: v.help,
          targets: v.nodes.slice(0, 5).map((n) => n.target.join(' ')),
        }));
      });
      entry.axeViolations = axeResult;

      // Layout + vitals.
      const page_metrics = await page.evaluate(() => {
        const de = document.documentElement;
        const offenders = [...document.querySelectorAll('body *')]
          .filter((el) => {
            const r = el.getBoundingClientRect();
            return r.width > 0 && (r.right > de.clientWidth + 1 || r.left < -1);
          })
          .slice(0, 5)
          .map((el) => `${el.tagName}.${(el.className || '').toString().split(' ')[0]}`);

        const imgs = [...document.querySelectorAll('img')];
        const broken = imgs.filter((i) => i.complete && i.naturalWidth === 0).length;

        const nav = performance.getEntriesByType('navigation')[0];
        const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
        const lcp = lcpEntries[lcpEntries.length - 1];

        return {
          scrollWidth: de.scrollWidth,
          clientWidth: de.clientWidth,
          overflow: de.scrollWidth > de.clientWidth + 1,
          overflowOffenders: offenders,
          pageHeight: de.scrollHeight,
          h1Count: document.querySelectorAll('h1').length,
          imgTotal: imgs.length,
          imgBroken: broken,
          imgNoAlt: imgs.filter((i) => !i.hasAttribute('alt')).length,
          imgNoDims: imgs.filter((i) => !i.getAttribute('width') || !i.getAttribute('height')).length,
          ttfb: nav ? Math.round(nav.responseStart) : null,
          lcp: lcp ? Math.round(lcp.startTime) : null,
          domInteractive: nav ? Math.round(nav.domInteractive) : null,
        };
      });
      Object.assign(entry, page_metrics);

      // CLS needs an observer window; collect what buffered so far.
      entry.cls = await page.evaluate(
        () =>
          new Promise((res) => {
            let total = 0;
            new PerformanceObserver((list) => {
              for (const e of list.getEntries()) if (!e.hadRecentInput) total += e.value;
            }).observe({ type: 'layout-shift', buffered: true });
            setTimeout(() => res(+total.toFixed(4)), 800);
          })
      );
    } catch (err) {
      entry.error = String(err).slice(0, 200);
    }

    entry.consoleErrors = consoleErrors;
    entry.failedRequests = [...new Set(failedRequests)].filter(
      // jsdelivr is our own axe injection, not a site asset.
      (f) => !f.includes('jsdelivr')
    );

    results.push(entry);
    const v = (entry.axeViolations || []).reduce((s, x) => s + x.count, 0);
    console.error(
      `${vp.name.padEnd(17)} ${route.padEnd(30)} ${entry.status} ` +
        `a11y:${v} console:${consoleErrors.length} net:${entry.failedRequests.length} ` +
        `overflow:${entry.overflow} cls:${entry.cls}`
    );
    await page.close();
  }
  await ctx.close();
}

await browser.close();
writeFileSync('qa-audit.json', JSON.stringify(results, null, 2));

// Rollup
const allViolations = {};
for (const r of results) {
  for (const v of r.axeViolations || []) {
    allViolations[v.id] ??= { impact: v.impact, help: v.help, routes: new Set(), nodes: 0 };
    allViolations[v.id].routes.add(r.route);
    allViolations[v.id].nodes += v.count;
  }
}
console.error('\n===== ROLLUP =====');
console.error('routes x viewports:', results.length);
console.error('console errors:', results.reduce((s, r) => s + r.consoleErrors.length, 0));
console.error('failed requests:', results.reduce((s, r) => s + r.failedRequests.length, 0));
console.error('overflow cases:', results.filter((r) => r.overflow).length);
console.error('broken images:', results.reduce((s, r) => s + (r.imgBroken || 0), 0));
console.error('non-200:', results.filter((r) => r.status !== 200).map((r) => r.route + ':' + r.status));
console.error('\nA11Y VIOLATIONS:');
for (const [id, d] of Object.entries(allViolations)) {
  console.error(`  [${d.impact}] ${id} — ${d.nodes} nodes across ${d.routes.size} routes — ${d.help}`);
}
if (!Object.keys(allViolations).length) console.error('  none');
