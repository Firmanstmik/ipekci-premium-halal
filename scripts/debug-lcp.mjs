/**
 * Dump every LCP candidate on the homepage, in order, with size and load timing.
 *
 * LCP only ever moves to a LARGER element, so the full candidate list (not just
 * the final entry) is what explains why a given element won.
 */
import { chromium } from 'playwright';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

const imgTimings = [];
page.on('response', (r) => {
  if (/\.(webp|jpg|jpeg|png)/i.test(r.url())) {
    imgTimings.push({ url: r.url().split('/').pop().slice(0, 45), status: r.status(), t: Date.now() });
  }
});

const t0 = Date.now();
await page.goto('https://ipekcislachterij.localclicks.nl/', { waitUntil: 'load', timeout: 120000 });
await page.waitForTimeout(4000);

const out = await page.evaluate(
  () =>
    new Promise((res) => {
      const cands = [];
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) {
          cands.push({
            time: Math.round(e.startTime),
            size: e.size,
            el: e.element ? e.element.tagName + '.' + (e.element.className || '').toString().split(' ')[0] : '?',
            url: e.url ? e.url.split('/').pop().slice(0, 45) : '(text)',
            loadTime: Math.round(e.loadTime || 0),
            renderTime: Math.round(e.renderTime || 0),
          });
        }
      }).observe({ type: 'largest-contentful-paint', buffered: true });

      setTimeout(() => {
        const poster = document.getElementById('ipekci-hero-poster');
        const showcase = document.querySelector('.ipekci-hero-showcase__image');
        const info = (el) => {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          const cs = getComputedStyle(el);
          return {
            rect: `${Math.round(r.width)}x${Math.round(r.height)}`,
            area: Math.round(r.width * r.height),
            opacity: cs.opacity,
            visibility: cs.visibility,
            complete: el.complete,
            naturalW: el.naturalWidth,
            currentSrc: (el.currentSrc || '').split('/').pop().slice(0, 45),
            fetchPriority: el.getAttribute('fetchpriority'),
            loading: el.getAttribute('loading'),
          };
        };
        res({ candidates: cands, poster: info(poster), showcase: info(showcase) });
      }, 500);
    })
);

console.log('=== LCP candidates (in order; LCP = the last one) ===');
for (const c of out.candidates) {
  console.log(`  t=${String(c.time).padStart(6)}ms  size=${String(c.size).padStart(8)}px²  load=${String(c.loadTime).padStart(6)}  ${c.el.padEnd(34)} ${c.url}`);
}
console.log('\n=== hero poster (the image we preload) ===');
console.log(' ', JSON.stringify(out.poster));
console.log('\n=== showcase image (the reported LCP) ===');
console.log(' ', JSON.stringify(out.showcase));

console.log('\n=== image responses (first 12, ms after nav) ===');
imgTimings.slice(0, 12).forEach((i) => console.log(`  +${String(i.t - t0).padStart(6)}ms  ${i.status}  ${i.url}`));

await browser.close();
