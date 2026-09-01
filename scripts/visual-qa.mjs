import { chromium } from 'playwright';
import fs from 'fs';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import path from 'path';

const REACT_URL = 'http://localhost:3001';
const WP_URL = 'https://ipekcislachterij.localclicks.nl';

const VIEWPORTS = [
  { width: 1920, height: 1080, name: 'Desktop' },
  { width: 768, height: 1024, name: 'Tablet' },
  { width: 390, height: 844, name: 'Mobile' }
];

const PAGES = [
  { path: '/', name: 'Home' },
  { path: '/ons-verhaal/', name: 'OverOns' },
  { path: '/producten/doner/', name: 'Category' },
  { path: '/vacatures/', name: 'Vacatures' },
  { path: '/contact/', name: 'Contact' }
];

async function captureAndCompare() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  
  if (!fs.existsSync('.visual-qa')) fs.mkdirSync('.visual-qa');

  let totalDiffs = 0;

  for (const pageInfo of PAGES) {
    for (const vp of VIEWPORTS) {
      console.log(`\nTesting ${pageInfo.name} on ${vp.name}...`);
      
      const reactPage = await context.newPage();
      await reactPage.setViewportSize(vp);
      await reactPage.goto(REACT_URL + pageInfo.path, { waitUntil: 'networkidle' });
      await reactPage.waitForTimeout(2000); // Let animations settle
      
      // Remove or hide things that might naturally differ (like video backgrounds if they don't load instantly)
      const reactScreenshotPath = `.visual-qa/${pageInfo.name}_${vp.name}_React.png`;
      await reactPage.screenshot({ path: reactScreenshotPath, fullPage: true });
      await reactPage.close();

      const wpPage = await context.newPage();
      await wpPage.setViewportSize(vp);
      await wpPage.goto(WP_URL + pageInfo.path, { waitUntil: 'networkidle' });
      await wpPage.waitForTimeout(2000); // Let animations settle
      const wpScreenshotPath = `.visual-qa/${pageInfo.name}_${vp.name}_WP.png`;
      await wpPage.screenshot({ path: wpScreenshotPath, fullPage: true });
      await wpPage.close();

      // Compare
      const img1 = PNG.sync.read(fs.readFileSync(reactScreenshotPath));
      const img2 = PNG.sync.read(fs.readFileSync(wpScreenshotPath));

      // Resize images if heights differ
      const width = Math.min(img1.width, img2.width);
      const height = Math.min(img1.height, img2.height);

      const diff = new PNG({ width, height });

      const numDiffPixels = pixelmatch(
          img1.data, 
          img2.data, 
          diff.data, 
          width, 
          height, 
          { threshold: 0.1 }
      );

      const diffPercent = (numDiffPixels / (width * height)) * 100;
      console.log(`Mismatch: ${diffPercent.toFixed(2)}% (${numDiffPixels} pixels)`);
      
      if (numDiffPixels > 0) {
         fs.writeFileSync(`.visual-qa/${pageInfo.name}_${vp.name}_Diff.png`, PNG.sync.write(diff));
         totalDiffs++;
      }
    }
  }

  await browser.close();
  console.log(`\nDone! Found differences in ${totalDiffs} views.`);
}

captureAndCompare().catch(console.error);