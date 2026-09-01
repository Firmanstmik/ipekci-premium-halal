import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto('https://ipekcislachterij.localclicks.nl/ons-verhaal/?bust=10', { waitUntil: 'domcontentloaded', timeout: 90000 });
await page.evaluate(() => {
  document.querySelectorAll('.ov-motion').forEach((el) => el.classList.add('is-in'));
  const s = document.querySelector('section[aria-labelledby="ons-verhaal-workflow-heading"]');
  if (s) window.scrollTo(0, s.getBoundingClientRect().top + window.scrollY);
});
await page.waitForTimeout(2000);
const data = await page.evaluate(() => {
  const imgs = [...document.querySelectorAll('.ipekci-ov2-wf__step-img img, .ipekci-ov2-wf__hero-media img')];
  return imgs.map((img) => ({
    src: (img.currentSrc || img.src).split('/').pop(),
    complete: img.complete,
    naturalWidth: img.naturalWidth,
    decoded: img.classList.contains('is-decoded'),
    opacity: getComputedStyle(img).opacity,
  }));
});
console.log(JSON.stringify(data, null, 2));
await page.locator('section[aria-labelledby="ons-verhaal-workflow-heading"]').screenshot({ path: '.visual-qa/wf-only/live-after-webp.png' });
await browser.close();
