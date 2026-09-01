import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
const page = await ctx.newPage();
await page.goto('https://ipekcislachterij.localclicks.nl/ons-verhaal/?bust=6', { waitUntil: 'networkidle', timeout: 120000 });
await page.evaluate(() => {
  document.querySelectorAll('.ov-motion').forEach((el) => el.classList.add('is-in'));
  const el = document.querySelector('section[aria-labelledby="ons-verhaal-workflow-heading"]');
  if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY);
});
await page.waitForFunction(() => {
  const img = document.querySelector('.ipekci-ov2-wf__step-img img');
  return img && img.complete && img.naturalWidth > 0;
}, { timeout: 60000 });
await page.waitForTimeout(500);
await page.locator('.ipekci-ov2-wf__hero-media img').first().screenshot({ path: '.visual-qa/wf-only/hero-img-only.png' });
await page.locator('.ipekci-ov2-wf__step-img img').first().screenshot({ path: '.visual-qa/wf-only/step-img-only.png' });
await page.locator('section[aria-labelledby="ons-verhaal-workflow-heading"]').first().screenshot({ path: '.visual-qa/wf-only/section-loaded.png' });
await browser.close();
