/**
 * Remove any leftover QA test data: products whose title starts with
 * "QA Testproduct", and orphan Hamburger.png uploads created by the CRUD test.
 * Idempotent — safe to run any time to force the catalogue back to its 44.
 */
import { chromium } from 'playwright';

const BASE = 'https://ipekcislachterij.localclicks.nl';
const PROFILE =
  process.env.WP_PROFILE ??
  'C:\\Users\\HYPE AMD\\AppData\\Local\\ms-playwright-mcp\\mcp-chrome-0885b19';

const ctx = await chromium.launchPersistentContext(PROFILE, { headless: true });
ctx.setDefaultTimeout(120000);
ctx.setDefaultNavigationTimeout(120000);
const page = ctx.pages()[0] ?? (await ctx.newPage());

await page.goto(`${BASE}/wp-admin/`, { waitUntil: 'domcontentloaded' });

async function purgeList(url, match) {
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  const removed = await page.evaluate(async (m) => {
    const rows = [...document.querySelectorAll('#the-list tr[id^="post-"]')];
    let n = 0;
    for (const tr of rows) {
      const title = tr.querySelector('.row-title')?.textContent?.trim() ?? '';
      const del = tr.querySelector('.submitdelete');
      if (del && (m === '*' || title.startsWith(m))) {
        await fetch(del.href, { credentials: 'include' });
        n++;
      }
    }
    return n;
  }, match);
  return removed;
}

let n = 0;
n += await purgeList(
  `${BASE}/wp-admin/edit.php?post_type=ipekci_product&s=QA+Testproduct`,
  'QA Testproduct'
);
n += await purgeList(
  `${BASE}/wp-admin/edit.php?post_type=ipekci_product&post_status=trash`,
  '*'
);
// Orphan uploads: any Hamburger* in the media list (the import's own copy is named
// Hamburger.png too, but it is attached; here we only trash unattached duplicates).
await page.goto(`${BASE}/wp-admin/upload.php?mode=list&detached=1`, {
  waitUntil: 'domcontentloaded',
});
const media = await page.evaluate(async () => {
  const rows = [...document.querySelectorAll('#the-list tr[id^="post-"]')];
  let k = 0;
  for (const tr of rows) {
    const del = tr.querySelector('.submitdelete');
    if (del) {
      await fetch(del.href, { credentials: 'include' });
      k++;
    }
  }
  return k;
});

console.log(`removed ${n} QA product(s), ${media} detached upload(s)`);
await ctx.close();
