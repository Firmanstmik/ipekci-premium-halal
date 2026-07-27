/**
 * Rasterize the hero scroll-cue stickers.
 *
 * They ship as auto-traced SVGs (2418 paths / 785 KB for one of them, 479 KB for
 * the three together on the wire) but render as 16px icons at 35% opacity, dimmed
 * and desaturated — and are hidden on phones. A raster at retina size is visually
 * identical here and ~1% of the bytes.
 *
 * Rendered in a real browser (not a converter) so the output is exactly what the
 * SVG paints today. Output is 96px on the long edge = 6x the 16px display size,
 * which covers DPR3 with headroom.
 */
import { chromium } from 'playwright';
import { readFileSync, writeFileSync, statSync } from 'node:fs';

const DIR = 'ipekci-theme/assets/images/stickers/';
const FILES = ['stiker-kambing.svg', 'stiker-sapi.svg', 'stiker-ayam.svg'];
const EDGE = 96;

const browser = await chromium.launch();

for (const f of FILES) {
  const svg = readFileSync(DIR + f, 'utf8');

  // Preserve the artwork's aspect ratio from its viewBox.
  const vb = svg.match(/viewBox=["']([\d.\s-]+)["']/);
  let w = EDGE;
  let h = EDGE;
  if (vb) {
    const [, , vw, vh] = vb[1].trim().split(/\s+/).map(Number);
    if (vw && vh) {
      if (vw >= vh) {
        w = EDGE;
        h = Math.round((EDGE * vh) / vw);
      } else {
        h = EDGE;
        w = Math.round((EDGE * vw) / vh);
      }
    }
  }

  const page = await browser.newPage({
    viewport: { width: w, height: h },
    deviceScaleFactor: 1,
  });

  // Transparent background so the icon composites over the hero exactly as the SVG does.
  await page.setContent(
    `<style>html,body{margin:0;padding:0;background:transparent}
     img{display:block;width:${w}px;height:${h}px;object-fit:contain}</style>
     <img src="data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}">`
  );
  await page.waitForTimeout(600);

  const png = await page.screenshot({ omitBackground: true, type: 'png' });
  const out = DIR + f.replace('.svg', '.png');
  writeFileSync(out, png);

  const before = statSync(DIR + f).size;
  const after = statSync(out).size;
  console.log(
    `${f.padEnd(22)} ${w}x${h}  ${(before / 1024).toFixed(0)} KB SVG -> ${(after / 1024).toFixed(1)} KB PNG  (${(
      (100 * after) / before
    ).toFixed(1)}%)`
  );

  await page.close();
}

await browser.close();
