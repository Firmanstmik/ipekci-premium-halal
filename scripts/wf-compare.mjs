import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const OUT = '.visual-qa/wf-only';
fs.mkdirSync(OUT, { recursive: true });
const vp = { w: 1920, h: 1080 };
const sel = 'section[aria-labelledby="ons-verhaal-workflow-heading"]';

async function shot(browser, url, file) {
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 120000 });
  await page.waitForTimeout(1500);
  await page.evaluate((selector) => {
    document.querySelectorAll('.ov-motion, .story-reveal').forEach((el) => el.classList.add('is-in', 'is-visible'));
    document.querySelectorAll('[data-count-to]').forEach((el) => {
      el.textContent = `${el.getAttribute('data-count-to') || ''}${el.getAttribute('data-count-suffix') || ''}`;
    });
    document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
      img.loading = 'eager';
      if (img.src) img.src = img.src;
    });
    document.querySelectorAll('#ipekci-nav, .ipekci-nav, .fixed.inset-x-0.top-0.z-50').forEach((el) => {
      el.style.visibility = 'hidden';
    });
    document.querySelectorAll('body *').forEach((el) => {
      const s = getComputedStyle(el);
      if (s.position === 'fixed' && parseFloat(s.bottom) <= 8 && (el.textContent || '').toLowerCase().includes('bel direct')) {
        el.style.display = 'none';
      }
    });
    const el = document.querySelector(selector);
    if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY);
  }, sel);
  await page.waitForFunction(() => {
    const img = document.querySelector('.ipekci-ov2-wf__hero-media img, section[aria-labelledby="ons-verhaal-workflow-heading"] img');
    return img && img.complete && img.naturalWidth > 0;
  }, { timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(800);
  await page.locator(sel).first().screenshot({ path: file });
  const styles = await page.evaluate((selector) => {
    const section = document.querySelector(selector);
    const step = section?.querySelector('.ipekci-ov2-wf__step, article');
    const heroMedia = section?.querySelector('.ipekci-ov2-wf__hero-media');
    const stepImg = section?.querySelector('.ipekci-ov2-wf__step-img img, article img');
    const cs = (el) => (el ? getComputedStyle(el) : null);
    const inline = document.getElementById('ipekci-inline-css')?.textContent || '';
    return {
      hasHeroMedia: !!heroMedia,
      hasFixCss: inline.includes('ipekci-ov2-wf__hero-media'),
      hasPremiumB: inline.includes('ipekci-ov2-wf__step'),
      stepShadow: cs(step)?.boxShadow,
      stepImgSrc: stepImg?.getAttribute('src')?.split('/').pop(),
      heroImgSrc: section?.querySelector('.ipekci-ov2-wf__hero-media img, .ipekci-ov2-wf__hero-bg img')?.getAttribute('src')?.split('/').pop(),
      heroMediaLeft: cs(heroMedia)?.left,
    };
  }, sel);
  await ctx.close();
  return styles;
}

const browser = await chromium.launch({ headless: true });
const reactStyles = await shot(browser, 'http://localhost:3000/ons-verhaal', path.join(OUT, 'react.png'));
const wpStyles = await shot(browser, 'https://ipekcislachterij.localclicks.nl/ons-verhaal/?bust=3', path.join(OUT, 'wp.png'));
const a = PNG.sync.read(fs.readFileSync(path.join(OUT, 'react.png')));
const b = PNG.sync.read(fs.readFileSync(path.join(OUT, 'wp.png')));
const w = Math.min(a.width, b.width);
const h = Math.min(a.height, b.height);
const diff = new PNG({ width: w, height: h });
const n = pixelmatch(a.data, b.data, diff.data, w, h, { threshold: 0.12 });
fs.writeFileSync(path.join(OUT, 'diff.png'), PNG.sync.write(diff));
console.log(JSON.stringify({ reactStyles, wpStyles, diffPct: +((n / (w * h)) * 100).toFixed(1) }, null, 2));
await browser.close();
