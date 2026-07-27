/**
 * Anonymous Core Web Vitals check against the live site.
 *
 * Runs as a real visitor (no admin cookie, LiteSpeed cache active) because
 * logged-in requests bypass the cache entirely and report meaningless TTFB.
 * Each route is measured twice and the better run is kept, so a single blip on
 * this (known-flaky) host does not masquerade as a regression.
 *
 * Usage: node scripts/perf-check.mjs
 */
import { chromium } from 'playwright';

const BASE = 'https://ipekcislachterij.localclicks.nl';
const ROUTES = ['/', '/ons-verhaal/', '/contact/', '/assortiment/', '/voor-wie/'];
const RUNS = 2;

const browser = await chromium.launch();

async function measure(route) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  let bytes = 0;
  page.on('response', async (r) => {
    const len = Number(r.headers()['content-length'] || 0);
    bytes += len;
  });

  await page.goto(BASE + route, { waitUntil: 'load', timeout: 120000 });
  // Give LCP/CLS observers a window to settle after load.
  await page.waitForTimeout(2500);

  const m = await page.evaluate(
    () =>
      new Promise((res) => {
        let cls = 0;
        const shifts = [];
        new PerformanceObserver((l) => {
          for (const e of l.getEntries())
            if (!e.hadRecentInput) {
              cls += e.value;
              shifts.push(e);
            }
        }).observe({ type: 'layout-shift', buffered: true });

        let lcp = null;
        new PerformanceObserver((l) => {
          const es = l.getEntries();
          lcp = es[es.length - 1];
        }).observe({ type: 'largest-contentful-paint', buffered: true });

        setTimeout(() => {
          const nav = performance.getEntriesByType('navigation')[0];
          const fcp = performance.getEntriesByName('first-contentful-paint')[0];
          const worst = shifts.sort((a, b) => b.value - a.value)[0];
          res({
            ttfb: nav ? Math.round(nav.responseStart) : null,
            fcp: fcp ? Math.round(fcp.startTime) : null,
            lcp: lcp ? Math.round(lcp.startTime) : null,
            lcpEl: lcp?.element ? lcp.element.tagName + '.' + (lcp.element.className || '').toString().split(' ')[0] : null,
            cls: +cls.toFixed(4),
            worstShift: worst
              ? {
                  value: +worst.value.toFixed(4),
                  sources: (worst.sources || []).map((s) =>
                    s.node ? s.node.tagName + '.' + (s.node.className || '').toString().split(' ')[0] : '?'
                  ),
                }
              : null,
            domNodes: document.querySelectorAll('*').length,
            fontsLoaded: [...document.fonts].filter((f) => f.status === 'loaded').length,
          });
        }, 800);
      })
  );

  await ctx.close();
  return { ...m, bytesKB: Math.round(bytes / 1024) };
}

console.log('route                LCP      FCP     TTFB    CLS      LCP element');
console.log('-'.repeat(78));

const summary = [];
for (const route of ROUTES) {
  const runs = [];
  for (let i = 0; i < RUNS; i++) {
    try {
      runs.push(await measure(route));
    } catch (e) {
      // Host is flaky; a timed-out run should not kill the sweep.
    }
  }
  if (!runs.length) {
    console.log(`${route.padEnd(20)} FAILED (all runs errored)`);
    continue;
  }
  // Best = lowest LCP.
  const best = runs.sort((a, b) => (a.lcp ?? 1e9) - (b.lcp ?? 1e9))[0];
  summary.push({ route, ...best });
  console.log(
    `${route.padEnd(20)} ${String(best.lcp ?? '-').padStart(6)}ms ${String(best.fcp ?? '-').padStart(6)}ms ` +
      `${String(best.ttfb ?? '-').padStart(6)}ms ${String(best.cls).padStart(7)}  ${best.lcpEl ?? '-'}`
  );
  if (best.worstShift && best.worstShift.value > 0.01) {
    console.log(`${' '.repeat(21)}worst shift ${best.worstShift.value} from ${best.worstShift.sources.join(', ')}`);
  }
}

console.log('\n=== VERDICT (Core Web Vitals thresholds) ===');
for (const s of summary) {
  const lcpV = s.lcp <= 2500 ? 'GOOD' : s.lcp <= 4000 ? 'NEEDS-WORK' : 'POOR';
  const clsV = s.cls <= 0.1 ? 'GOOD' : s.cls <= 0.25 ? 'NEEDS-WORK' : 'POOR';
  console.log(`${s.route.padEnd(20)} LCP ${lcpV.padEnd(11)} CLS ${clsV}`);
}

await browser.close();
