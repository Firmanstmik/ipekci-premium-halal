/**
 * For every route: which element is the LCP, what image does it load, how big is
 * that image intrinsically, and how big is the box it is actually painted into?
 *
 * The gap between those last two is the resize budget. Measured at both 1440px
 * and 390px, because the LCP element differs by breakpoint on the front page and
 * an image must satisfy the LARGER of the two rendered widths.
 */
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

const BASE = 'https://ipekcislachterij.localclicks.nl';
const ROUTES = [
  '/', '/ons-verhaal/', '/contact/',
  '/assortiment/', '/assortiment/lamsvlees/', '/assortiment/rundvlees/',
  '/assortiment/kip/', '/assortiment/eindproducten/',
  '/voor-wie/', '/voor-wie/slagerijen/', '/voor-wie/groothandels/',
  '/voor-wie/supermarkten/', '/voor-wie/restaurants/',
];
const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

const browser = await chromium.launch();
const found = new Map(); // url -> max rendered width

for (const route of ROUTES) {
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await ctx.newPage();
    try {
      await page.goto(BASE + route, { waitUntil: 'load', timeout: 120000 });
      await page.waitForTimeout(2500);

      const info = await page.evaluate(
        () =>
          new Promise((resolve) => {
            let last = null;
            new PerformanceObserver((l) => {
              for (const e of l.getEntries()) last = e;
            }).observe({ type: 'largest-contentful-paint', buffered: true });
            setTimeout(() => {
              if (!last) return resolve(null);
              const el = last.element;
              const r = el ? el.getBoundingClientRect() : null;
              const img = el && el.tagName === 'IMG' ? el : null;
              resolve({
                tag: el ? el.tagName + '.' + (el.className || '').toString().split(' ')[0] : '?',
                url: last.url || (img && img.currentSrc) || '',
                renderedW: r ? Math.round(r.width) : 0,
                intrinsicW: img ? img.naturalWidth : 0,
                time: Math.round(last.startTime),
              });
            }, 300);
          })
      );

      if (info && info.url) {
        const prev = found.get(info.url) ?? { renderedW: 0, intrinsicW: 0, routes: new Set() };
        prev.renderedW = Math.max(prev.renderedW, info.renderedW);
        prev.intrinsicW = info.intrinsicW || prev.intrinsicW;
        prev.routes.add(route);
        found.set(info.url, prev);
      }
      const short = (info?.url || '(none)').replace(/^https?:\/\//, '').replace(/^[^/]*\//, '…/');
      console.log(
        `${route.padEnd(30)} ${vp.name.padEnd(8)} ${String(info?.time ?? '-').padStart(5)}ms  ${(info?.tag ?? '-').padEnd(34)} render ${String(info?.renderedW ?? 0).padStart(4)}px  intrinsic ${String(info?.intrinsicW ?? 0).padStart(4)}px  ${short.slice(-52)}`
      );
    } catch (e) {
      console.log(`${route.padEnd(30)} ${vp.name.padEnd(8)} ERROR ${e.message.slice(0, 60)}`);
    }
    await ctx.close();
  }
}

console.log('\n=== distinct LCP images (rendered width = max across routes/breakpoints) ===');
const manifest = [];
for (const [url, v] of found) {
  const external = !url.includes('localclicks.nl');
  // A retina display can resolve at most 2x the largest box it is painted into.
  const target = v.renderedW * 2;
  manifest.push({ url, renderedW: v.renderedW, intrinsicW: v.intrinsicW, target, external, routes: [...v.routes] });
  console.log(
    `${external ? 'CDN ' : 'SELF'}  render ${String(v.renderedW).padStart(4)}px  intrinsic ${String(v.intrinsicW).padStart(4)}px  target ${String(target).padStart(4)}px  ${url}`
  );
}

writeFileSync('lcp-manifest.json', JSON.stringify(manifest, null, 2));
console.log(`\nwrote lcp-manifest.json (${manifest.length} images, ${manifest.filter((m) => m.external).length} external)`);

await browser.close();
