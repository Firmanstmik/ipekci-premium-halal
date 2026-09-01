import { chromium } from 'playwright';

const BASE = 'https://ipekcislachterij.localclicks.nl';
const PROFILE = process.env.WP_PROFILE ?? 'C:\\Users\\HYPE AMD\\AppData\\Local\\ms-playwright-mcp\\mcp-chrome-0885b19';

async function run() {
  const ctx = await chromium.launchPersistentContext(PROFILE, { headless: false });
  const page = ctx.pages()[0] ?? (await ctx.newPage());

  await page.goto(`${BASE}/wp-admin/nav-menus.php`, { waitUntil: 'domcontentloaded' });
  
  // Check if we have a menu
  const deleteBtn = await page.$('.submitdelete');
  if (deleteBtn) {
    console.log('Deleting existing menu...');
    page.once('dialog', dialog => dialog.accept());
    await deleteBtn.click();
    await page.waitForNavigation({ waitUntil: 'domcontentloaded' }).catch(()=>console.log('waited'));
  }
  
  console.log('Menu deleted. It will now use the fallback array in PHP.');
  await ctx.close();
}

run().catch(console.error);