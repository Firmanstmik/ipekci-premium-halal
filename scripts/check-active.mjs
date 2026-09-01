import { chromium } from 'playwright';

const BASE = 'https://ipekcislachterij.localclicks.nl';
const PROFILE = process.env.WP_PROFILE ?? 'C:\\Users\\HYPE AMD\\AppData\\Local\\ms-playwright-mcp\\mcp-chrome-0885b19';

async function run() {
  const ctx = await chromium.launchPersistentContext(PROFILE, { headless: false });
  const page = ctx.pages()[0] ?? (await ctx.newPage());

  await page.goto(`${BASE}/wp-admin/themes.php`, { waitUntil: 'domcontentloaded' });
  const activeTheme = await page.evaluate(() => {
    return document.querySelector('.theme.active')?.getAttribute('data-slug') || 'unknown';
  });
  console.log('Currently active theme:', activeTheme);
  await ctx.close();
}

run().catch(console.error);