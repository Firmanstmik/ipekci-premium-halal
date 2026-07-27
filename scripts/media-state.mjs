import { chromium } from 'playwright';
const BASE = 'https://ipekcislachterij.localclicks.nl';
const PROFILE = process.env.WP_PROFILE ?? 'C:\\Users\\HYPE AMD\\AppData\\Local\\ms-playwright-mcp\\mcp-chrome-0885b19';
const ctx = await chromium.launchPersistentContext(PROFILE, { headless: true });
ctx.setDefaultTimeout(120000); ctx.setDefaultNavigationTimeout(120000);
const page = ctx.pages()[0] ?? (await ctx.newPage());
const num = async (url) => {
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  return page.evaluate(() => document.querySelector('.displaying-num')?.textContent?.trim() ?? '?');
};
console.log('media total   :', await num(`${BASE}/wp-admin/upload.php?mode=list`));
console.log('media detached:', await num(`${BASE}/wp-admin/upload.php?mode=list&detached=1`));
console.log('products      :', await num(`${BASE}/wp-admin/edit.php?post_type=ipekci_product`));
console.log('repair count  :', 'see below');
// list detached titles to see what (if anything) is stray
await page.goto(`${BASE}/wp-admin/upload.php?mode=list&detached=1`, { waitUntil: 'domcontentloaded' });
const det = await page.evaluate(() =>
  [...document.querySelectorAll('#the-list tr[id^="post-"] .row-title')].map((a) => a.textContent.trim())
);
console.log('detached items:', det.length ? det.join(', ') : '(none)');
await ctx.close();
