/**
 * Client-meeting readiness QA — public routes only.
 * Output: .tmp-audit/client-readiness.json
 */
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';

const WP = process.env.WP_BASE ?? 'https://ipekcislachterij.localclicks.nl';
const ROUTES = [
  '/',
  '/producten/',
  '/producten/doner/',
  '/voor-wie/',
  '/voor-wie/supermarkten/',
  '/ons-verhaal/',
  '/vacatures/',
  '/contact/',
];
const VIEWPORTS = [
  { label: 'desktop-1440', width: 1440, height: 900 },
  { label: 'desktop-1280', width: 1280, height: 900 },
  { label: 'mobile-390', width: 390, height: 844 },
  { label: 'mobile-430', width: 430, height: 932 },
];

mkdirSync('.tmp-audit', { recursive: true });

const LEGACY_COPY =
  /ipekci|ipekçi|harderwijk|eigen slachthuis|complete lammeren|lammeren en delen|dagelijks vers halalvlees/i;
const LEGACY_IMG = /ipekci|Ipekci-voor|\/Voor-wie-|\/Voor-restaurants/i;

async function auditViewport(browser, vp) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await ctx.newPage();
  const consoleErrors = [];
  const failed = [];
  page.on('console', (m) => {
    if (m.type() === 'error') consoleErrors.push(m.text());
  });
  page.on('response', (r) => {
    if (r.status() >= 400) failed.push({ url: r.url(), status: r.status() });
  });

  const pages = [];

  for (const route of ROUTES) {
    const entry = { route, status: null, issues: [] };
    try {
      const resp = await page.goto(WP + route, { waitUntil: 'domcontentloaded', timeout: 90000 });
      entry.status = resp?.status() ?? null;
      await page.waitForTimeout(2000);

      const data = await page.evaluate(
        ({ legacyCopy, legacyImg }) => {
          const body = document.body?.innerText || '';
          const html = document.documentElement.outerHTML;
          const imgs = [...document.querySelectorAll('img')].map((i) => i.currentSrc || i.src || '');
          const issues = [];

          if (new RegExp(legacyCopy, 'i').test(body)) {
            const m = body.match(new RegExp(`.{0,50}(${legacyCopy.source}).{0,50}`, 'i'));
            issues.push({ type: 'legacy-copy', detail: m ? m[0].trim() : 'matched' });
          }
          if (new RegExp(legacyCopy, 'i').test(html)) {
            const brand = (html.match(/Ipekci|Ipekçi/gi) || []).length;
            if (brand) issues.push({ type: 'brand-in-html', count: brand });
          }
          imgs.forEach((src) => {
            if (new RegExp(legacyImg, 'i').test(src) && !/\/ipekci-theme/i.test(src)) {
              issues.push({ type: 'legacy-image', src });
            }
          });
          if (/0\s*\+\s*jaar ervaring/i.test(body)) {
            issues.push({ type: 'counter-bug', detail: '0 + jaar ervaring visible' });
          }
          const hasAyat = /Ayat Food/i.test(body);
          return {
            title: document.title,
            issues,
            counterText:
              document.querySelector('.over-ons-proof__stat-num')?.textContent?.trim() || null,
            voorWieImgs: imgs.filter((s) =>
              /voor-wie|supermarkten|slagerijen|restaurants|groothandels|ayat-segment/i.test(s),
            ),
            hasAyat,
          };
        },
        { legacyCopy: LEGACY_COPY.source, legacyImg: LEGACY_IMG.source },
      );

      entry.title = data.title;
      entry.issues = data.issues;
      entry.counterText = data.counterText;
      entry.voorWieImgs = data.voorWieImgs;
    } catch (e) {
      entry.error = String(e.message || e);
    }
    pages.push(entry);
  }

  await ctx.close();
  return {
    viewport: vp.label,
    pages,
    consoleErrors: consoleErrors.slice(0, 30),
    failedRequests: failed.filter((f) => !/favicon|analytics/i.test(f.url)).slice(0, 40),
  };
}

const browser = await chromium.launch({ headless: true });
const results = [];

for (const vp of VIEWPORTS) {
  console.log('QA', vp.label);
  results.push(await auditViewport(browser, vp));
}

const allIssues = results.flatMap((r) =>
  r.pages.flatMap((p) => p.issues.map((i) => ({ viewport: r.viewport, route: p.route, ...i }))),
);

const report = {
  generatedAt: new Date().toISOString(),
  wp: WP,
  results,
  summary: {
    viewportPasses: results.filter((r) => r.pages.every((p) => !p.issues?.length && p.status === 200))
      .length,
    totalViewports: VIEWPORTS.length,
    issueCount: allIssues.length,
    issues: allIssues,
    desktopPass: results
      .filter((r) => r.viewport.startsWith('desktop'))
      .every((r) => r.pages.every((p) => !p.issues?.length && p.status === 200)),
    mobilePass: results
      .filter((r) => r.viewport.startsWith('mobile'))
      .every((r) => r.pages.every((p) => !p.issues?.length && p.status === 200)),
  },
};

writeFileSync('.tmp-audit/client-readiness.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report.summary, null, 2));
await browser.close();
