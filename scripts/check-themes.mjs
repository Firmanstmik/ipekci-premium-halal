import { chromium } from 'playwright';

const BASE = 'https://ipekcislachterij.localclicks.nl';
const PROFILE = process.env.WP_PROFILE ?? 'C:\\Users\\HYPE AMD\\AppData\\Local\\ms-playwright-mcp\\mcp-chrome-0885b19';

async function run() {
  const ctx = await chromium.launchPersistentContext(PROFILE, { headless: false });
  const page = ctx.pages()[0] ?? (await ctx.newPage());

  await page.goto(`${BASE}/wp-admin/themes.php`, { waitUntil: 'domcontentloaded' });
  const themes = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.theme')).map(el => el.getAttribute('data-slug'));
  });
  console.log('Installed themes:', themes);
  
  // if ipekci-theme-v2 is installed, let's activate it to see if it works!
  if (themes.includes('ipekci-theme-v2')) {
    console.log('Activating ipekci-theme-v2...');
    await page.evaluate(() => {
      document.querySelector('.theme[data-slug="ipekci-theme-v2"] .activate, .theme[data-slug="ipekci-theme-v2"] a.activate').click();
    });
    await page.waitForTimeout(5000);
    console.log('Done!');
  }

  await ctx.close();
}

run().catch(console.error);