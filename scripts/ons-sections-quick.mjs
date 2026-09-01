/**
 * Quick parity check for key ons-verhaal sections at 1920px.
 */
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const REACT = 'http://localhost:3000/ons-verhaal';
const WP = `https://ipekcislachterij.localclicks.nl/ons-verhaal/?bust=${Date.now()}`;
const OUT = '.visual-qa/ons-sections-quick';
const SECTIONS = [
  { id: 'service', sel: 'section[aria-labelledby="ons-verhaal-service-heading"]' },
  { id: 'halal', sel: 'section[aria-labelledby="ons-verhaal-halal-heading"]' },
  { id: 'workflow', sel: 'section[aria-labelledby="ons-verhaal-workflow-heading"]' },
  { id: 'stats', sel: 'section[aria-labelledby="ons-verhaal-stats-heading"]' },
  { id: 'highlights', sel: 'section[aria-label="Waarom Ayat Food"], .ipekci-ov2-hl' },
];

fs.mkdirSync(OUT, { recursive: true });
const vp = { width: 1920, height: 1080 };

function cropPng(img, width, height) {
  const out = new PNG({ width, height });
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const si = (img.width * y + x) << 2;
      const di = (width * y + x) << 2;
      out.data[di] = img.data[si];
      out.data[di + 1] = img.data[si + 1];
      out.data[di + 2] = img.data[si + 2];
      out.data[di + 3] = img.data[si + 3];
    }
  }
  return out;
}

async function prep(page, sel) {
  await page.evaluate((selector) => {
    document.querySelectorAll('.ov-motion, .story-reveal').forEach((el) => el.classList.add('is-in'));
    document.querySelectorAll('[data-count-to]').forEach((el) => {
      el.textContent = `${el.getAttribute('data-count-to') || ''}${el.getAttribute('data-count-suffix') || ''}`;
    });
    document.querySelectorAll('img[loading="lazy"]').forEach((img) => { img.loading = 'eager'; if (img.src) img.src = img.src; });
    document.querySelectorAll('#ipekci-nav,.ipekci-nav,.fixed.inset-x-0.top-0.z-50').forEach((el) => { el.style.visibility = 'hidden'; });
    const el = document.querySelector(selector);
    if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY);
  }, sel);
  await page.waitForTimeout(2500);
}

const browser = await chromium.launch({ headless: true });
for (const section of SECTIONS) {
  for (const [label, url] of [['react', REACT], ['wp', WP]]) {
    const ctx = await browser.newContext({ viewport: vp });
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'networkidle', timeout: 120000 });
    await prep(page, section.sel);
    await page.locator(section.sel).first().screenshot({ path: path.join(OUT, `${section.id}_${label}.png`) });
    await ctx.close();
  }
  const a = PNG.sync.read(fs.readFileSync(path.join(OUT, `${section.id}_react.png`)));
  const b = PNG.sync.read(fs.readFileSync(path.join(OUT, `${section.id}_wp.png`)));
  const w = Math.min(a.width, b.width), h = Math.min(a.height, b.height);
  const diff = new PNG({ width: w, height: h });
  const n = pixelmatch(cropPng(a, w, h).data, cropPng(b, w, h).data, diff.data, w, h, { threshold: 0.12 });
  fs.writeFileSync(path.join(OUT, `${section.id}_diff.png`), PNG.sync.write(diff));
  const pct = +((n / (w * h)) * 100).toFixed(1);
  console.log(`${section.id}: ${pct}% ${pct < 2.5 ? 'PASS' : 'FAIL'}`);
}
await browser.close();
