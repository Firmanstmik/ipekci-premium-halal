import { chromium } from 'playwright';
import { resolve } from 'path';

const BASE = 'https://ipekcislachterij.localclicks.nl';
const ZIP = resolve('ipekci-theme.zip');
const PROFILE = process.env.WP_PROFILE ?? 'C:\\Users\\HYPE AMD\\AppData\\Local\\ms-playwright-mcp\\mcp-chrome-0885b19';

async function run() {
  const ctx = await chromium.launchPersistentContext(PROFILE, { headless: false });
  ctx.setDefaultTimeout(60000);
  const page = ctx.pages()[0] ?? (await ctx.newPage());

  console.log('Navigating to themes page...');
  await page.goto(`${BASE}/wp-admin/themes.php`, { waitUntil: 'domcontentloaded' });
  
  if (!(await page.$('#wpadminbar'))) {
    console.error('Not authenticated! Please login.');
    await page.waitForSelector('#wpadminbar', { state: 'visible', timeout: 300000 });
  }

  // 1. Activate a fallback theme
  console.log('Activating a fallback theme (twentytwentyfour)...');
  const fallbackActivate = await page.$('.theme[data-slug="twentytwentyfour"] .activate, a.button.activate[aria-label*="Twenty Twenty-Four"]');
  if (fallbackActivate) {
    await page.evaluate(el => el.click(), fallbackActivate);
    await page.waitForTimeout(5000);
  } else {
    // try any other theme
    const anyOtherActivate = await page.$('.theme:not([data-slug="ipekci-theme"]) .activate');
    if (anyOtherActivate) {
      await page.evaluate(el => el.click(), anyOtherActivate);
      await page.waitForTimeout(5000);
    }
  }

  // 2. Delete ipekci-theme
  console.log('Deleting existing ipekci-theme...');
  await page.goto(`${BASE}/wp-admin/themes.php`, { waitUntil: 'domcontentloaded' });
  const themeCard = await page.$('.theme[data-slug="ipekci-theme"]');
  if (themeCard) {
    // Click on the theme to open the modal
    await page.evaluate(el => el.click(), themeCard);
    await page.waitForSelector('.theme-overlay', { state: 'visible' });
    
    // Accept the confirmation dialog
    page.once('dialog', dialog => dialog.accept());
    
    const deleteBtn = await page.$('.theme-overlay a.delete-theme');
    if (deleteBtn) {
      await page.evaluate(el => el.click(), deleteBtn);
      console.log('Delete button clicked, waiting for deletion...');
      await page.waitForTimeout(10000);
    }
  } else {
    console.log('ipekci-theme not found, proceeding to install...');
  }

  // 3. Upload new zip
  console.log('Uploading new ZIP...');
  await page.goto(`${BASE}/wp-admin/theme-install.php?browse=upload`, { waitUntil: 'domcontentloaded' });
  await page.click('button.upload-view-toggle');
  await page.waitForSelector('.upload-theme', { state: 'visible' });

  await page.setInputFiles('#themezip', ZIP);
  await page.waitForFunction(() => !document.querySelector('#install-theme-submit')?.disabled);
  await page.click('#install-theme-submit');

  console.log('Waiting for installation success...');
  let uploaded = false;
  for (let i = 0; i < 60; i++) {
    await page.waitForTimeout(3000);
    const text = await page.evaluate(() => document.body.innerText || '');
    if (/Theme installed successfully|succesvol geïnstalleerd/i.test(text)) {
      uploaded = true;
      console.log('Upload complete!');
      break;
    }
    if (/destination folder already exists/i.test(text)) {
      console.log('Failed! Destination folder still exists.');
      break;
    }
  }

  if (uploaded) {
    // 4. Activate the theme
    console.log('Activating ipekci-theme...');
    await page.goto(`${BASE}/wp-admin/themes.php`, { waitUntil: 'domcontentloaded' });
    const activate = await page.$('.theme[data-slug="ipekci-theme"] .activate, a.button.activate');
    if (activate) {
      await activate.click();
      await page.waitForTimeout(5000);
      console.log('ipekci-theme activated successfully!');
    }
  }

  await ctx.close();
  console.log('Done.');
}

run().catch(console.error);