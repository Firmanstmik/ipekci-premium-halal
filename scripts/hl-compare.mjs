import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const sel = 'section[aria-label="Waarom Ayat Food"], .ipekci-ov2-hl';
const OUT = '.visual-qa/hl-only';
fs.mkdirSync(OUT, { recursive: true });

async function shot(browser, url, file) {
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 120000 });
  await page.evaluate((selector) => {
    document.querySelectorAll('.ov-motion').forEach((el) => el.classList.add('is-in'));
    document.querySelectorAll('img').forEach((img) => { img.loading = 'eager'; if (img.src) img.src = img.src; });
    document.querySelectorAll('#ipekci-nav,.ipekci-nav').forEach((el) => { el.style.visibility = 'hidden'; });
    const el = document.querySelector(selector);
    if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY);
  }, sel);
  await page.waitForTimeout(4000);
  await page.locator(sel).first().screenshot({ path: file });
  await ctx.close();
}

const browser = await chromium.launch({ headless: true });
await shot(browser, 'http://localhost:3000/ons-verhaal', path.join(OUT, 'react.png'));
await shot(browser, 'https://ipekcislachterij.localclicks.nl/ons-verhaal/?bust=9', path.join(OUT, 'wp.png'));
const a = PNG.sync.read(fs.readFileSync(path.join(OUT, 'react.png')));
const b = PNG.sync.read(fs.readFileSync(path.join(OUT, 'wp.png')));
const w = Math.min(a.width, b.width), h = Math.min(a.height, b.height);
const diff = new PNG({ width: w, height: h });
function crop(img, width, height) {
  const out = new PNG({ width, height });
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    const si = (img.width * y + x) << 2, di = (width * y + x) << 2;
    out.data[di] = img.data[si]; out.data[di+1] = img.data[si+1]; out.data[di+2] = img.data[si+2]; out.data[di+3] = img.data[si+3];
  }
  return out;
}
const n = pixelmatch(crop(a,w,h).data, crop(b,w,h).data, diff.data, w, h, { threshold: 0.12 });
fs.writeFileSync(path.join(OUT, 'diff.png'), PNG.sync.write(diff));
console.log('highlights diff:', +((n/(w*h))*100).toFixed(1), '%');
await browser.close();
