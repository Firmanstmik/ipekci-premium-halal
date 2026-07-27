/**
 * What is actually delaying first paint? Lists every render-blocking resource on
 * the homepage with its transfer size and the moment it finished, plus the LCP
 * image's own timing — so we can see whether FCP is CSS-bound or network-bound.
 */
import { chromium } from 'playwright';

const BASE = 'https://ipekcislachterij.localclicks.nl';
const route = process.argv[2] ?? '/';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

await page.goto(BASE + route, { waitUntil: 'load', timeout: 120000 });
await page.waitForTimeout(3000);

const data = await page.evaluate(() => {
  const nav = performance.getEntriesByType('navigation')[0];
  const res = performance.getEntriesByType('resource').map((r) => ({
    name: r.name.split('/').pop().split('?')[0],
    host: new URL(r.name).host,
    type: r.initiatorType,
    kb: Math.round(r.encodedBodySize / 1024),
    start: Math.round(r.startTime),
    end: Math.round(r.responseEnd),
  }));
  const fcp = performance.getEntriesByName('first-contentful-paint')[0];
  return {
    ttfb: Math.round(nav.responseStart),
    domInteractive: Math.round(nav.domInteractive),
    fcp: fcp ? Math.round(fcp.startTime) : null,
    res,
  };
});

console.log(`\n=== ${route} ===`);
console.log(`TTFB ${data.ttfb}ms | FCP ${data.fcp}ms | domInteractive ${data.domInteractive}ms\n`);

const css = data.res.filter((r) => r.type === 'link' || r.type === 'css');
const fonts = data.res.filter((r) => /woff2/.test(r.name));
const scripts = data.res.filter((r) => r.type === 'script');

const show = (label, rows) => {
  if (!rows.length) return;
  console.log(`--- ${label} ---`);
  for (const r of rows.sort((a, b) => b.end - a.end)) {
    console.log(`  ${String(r.kb).padStart(4)} KB  ${String(r.start).padStart(5)}→${String(r.end).padStart(5)}ms  ${r.name}  [${r.host.replace('ipekcislachterij.localclicks.nl', 'self')}]`);
  }
  console.log();
};

show('CSS / link (render-blocking candidates)', css.filter((r) => !/woff2/.test(r.name)));
show('FONTS', fonts);
show('SCRIPTS', scripts);

const total = data.res.reduce((s, r) => s + r.kb, 0);
console.log(`total transferred: ${total} KB across ${data.res.length} requests`);

await browser.close();
