import { chromium } from 'playwright';
import fs from 'fs';

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
const page = await ctx.newPage();
await page.goto('https://ipekcislachterij.localclicks.nl/ons-verhaal/?bust=5', { waitUntil: 'domcontentloaded', timeout: 90000 });
await page.waitForTimeout(3000);
const sel = 'section[aria-labelledby="ons-verhaal-workflow-heading"]';
await page.evaluate((selector) => {
  document.querySelectorAll('.ov-motion').forEach((el) => el.classList.add('is-in'));
  document.querySelectorAll('img[loading="lazy"]').forEach((img) => { img.loading = 'eager'; if (img.src) img.src = img.src; });
  const el = document.querySelector(selector);
  if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY);
}, sel);
await page.waitForTimeout(2000);

const data = await page.evaluate((selector) => {
  const section = document.querySelector(selector);
  const heroBg = section?.querySelector('.ipekci-ov2-wf__hero-bg');
  const heroImg = section?.querySelector('.ipekci-ov2-wf__hero-media img');
  const step0img = section?.querySelector('.ipekci-ov2-wf__step-img img');
  const cs = (el) => (el ? getComputedStyle(el) : null);
  const rect = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: r.x, y: r.y, w: r.width, h: r.height };
  };
  return {
    heroBgOpacity: cs(heroBg)?.opacity,
    heroBgHasIsIn: heroBg?.classList.contains('is-in'),
    heroImgRect: rect(heroImg),
    heroImgOpacity: cs(heroImg)?.opacity,
    heroImgFilter: cs(heroImg)?.filter,
    step0Rect: rect(step0img),
    step0Opacity: cs(step0img)?.opacity,
    step0Visibility: cs(step0img)?.visibility,
    step0Src: step0img?.currentSrc,
  };
}, sel);

await page.locator('.ipekci-ov2-wf__hero-media').first().screenshot({ path: '.visual-qa/wf-only/hero-media.png' }).catch(() => {});
await page.locator('.ipekci-ov2-wf__step-img').first().screenshot({ path: '.visual-qa/wf-only/step0-img.png' }).catch(() => {});

console.log(JSON.stringify(data, null, 2));
await browser.close();
