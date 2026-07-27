/**
 * Report images whose intrinsic resolution far exceeds the size they are shown at.
 *
 * "Big file" alone is not a defect — a big file rendered big is fine. What wastes
 * bytes is decoding a 1536px image into a 160px box. This measures the ratio at
 * every breakpoint an image is used at, so a resize target can be chosen from
 * evidence rather than guessed.
 */
import { chromium } from 'playwright';

const BASE = 'https://ipekcislachterij.localclicks.nl';
const ROUTES = ['/', '/ons-verhaal/', '/assortiment/', '/voor-wie/', '/contact/'];
const WIDTHS = [390, 1440];

const seen = new Map(); // file -> { natural, maxDisplayed, kb, routes }

const browser = await chromium.launch();

for (const w of WIDTHS) {
  for (const route of ROUTES) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    try {
      await page.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 90000 });
    } catch {
      await ctx.close();
      continue;
    }

    // Force lazy images to resolve so they report real sizes.
    await page.evaluate(async () => {
      document.querySelectorAll('img[loading="lazy"]').forEach((i) => (i.loading = 'eager'));
      await new Promise((r) => {
        let y = 0;
        const step = () => {
          y += 1000;
          window.scrollTo(0, y);
          if (y < document.body.scrollHeight) setTimeout(step, 90);
          else r();
        };
        step();
      });
    });
    await page.waitForTimeout(3500);

    const imgs = await page.evaluate(() => {
      const sizes = {};
      performance.getEntriesByType('resource').forEach((r) => {
        if (r.encodedBodySize) sizes[r.name] = r.encodedBodySize;
      });
      return [...document.querySelectorAll('img')]
        .filter((i) => i.currentSrc && i.naturalWidth)
        .map((i) => {
          const r = i.getBoundingClientRect();
          return {
            src: i.currentSrc,
            naturalW: i.naturalWidth,
            naturalH: i.naturalHeight,
            dispW: Math.round(r.width),
            dispH: Math.round(r.height),
            bytes: sizes[i.currentSrc] || 0,
          };
        });
    });

    for (const im of imgs) {
      const name = im.src.split('/').pop();
      const prev = seen.get(name) || { natural: 0, naturalH: 0, maxDisp: 0, bytes: 0, routes: new Set() };
      prev.natural = Math.max(prev.natural, im.naturalW);
      prev.naturalH = Math.max(prev.naturalH, im.naturalH);
      prev.maxDisp = Math.max(prev.maxDisp, im.dispW);
      prev.bytes = Math.max(prev.bytes, im.bytes);
      prev.routes.add(route);
      seen.set(name, prev);
    }

    await ctx.close();
  }
}
await browser.close();

const rows = [...seen.entries()]
  .map(([name, d]) => ({
    name,
    natural: d.natural,
    naturalH: d.naturalH,
    maxDisp: d.maxDisp,
    kb: Math.round(d.bytes / 1024),
    // Needed width for a crisp render on a 2x display.
    needed: d.maxDisp * 2,
    ratio: d.maxDisp ? +(d.natural / (d.maxDisp * 2)).toFixed(2) : 0,
    routes: [...d.routes].join(','),
  }))
  .filter((r) => r.kb >= 30)
  .sort((a, b) => b.kb - a.kb);

console.log('image                                  KB   intrinsic   shown@1x  need@2x  oversize');
console.log('-'.repeat(92));
let waste = 0;
for (const r of rows) {
  const flag = r.ratio > 1.5 ? `  <<< ${r.ratio}x too big` : '';
  if (r.ratio > 1.5) waste += r.kb;
  console.log(
    `${r.name.slice(0, 36).padEnd(36)} ${String(r.kb).padStart(5)}  ${String(r.natural + 'x' + r.naturalH).padStart(10)}  ${String(
      r.maxDisp
    ).padStart(8)}  ${String(r.needed).padStart(7)}${flag}`
  );
}
console.log(`\nKB sitting in images that are >1.5x larger than needed: ${waste} KB`);
