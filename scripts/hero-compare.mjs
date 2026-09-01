import { chromium } from 'playwright';
import fs from 'fs';

const OUT = '.visual-qa/homepage-audit';
fs.mkdirSync(OUT, { recursive: true });

const targets = [
  ['react', 'http://localhost:3000'],
  ['wp', `https://ipekcislachterij.localclicks.nl/?nocache=${Date.now()}`],
];

const browser = await chromium.launch();
for (const [name, url] of targets) {
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto(url, { waitUntil: 'load', timeout: 120000 });
  await page.waitForTimeout(2500);
  await page.evaluate(() => {
    document.querySelectorAll('.story-reveal').forEach((el) => el.classList.add('is-visible'));
    const thumbs = document.querySelectorAll(
      '.ipekci-hero-showcase__thumb, button[aria-label^="Bekijk"]',
    );
    if (thumbs[0]) thumbs[0].click();
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/hero_fix_1920_${name}.png`, fullPage: false });
  console.log('saved', name);
  await page.close();
}
await browser.close();
