/**
 * Verify the Products CMS in wp-admin: the CPT registered, the import ran, the
 * four categories exist and the products carry a category + a Media Library image.
 *
 * Hitting wp-admin is what triggers the one-time import (it runs on admin_init),
 * so the first run here is also the run that performs it — hence the long timeout.
 *
 * Usage: node scripts/verify-products-cms.mjs
 */
import { chromium } from 'playwright';

const BASE = 'https://ipekcislachterij.localclicks.nl';
const PROFILE =
  process.env.WP_PROFILE ??
  'C:\\Users\\HYPE AMD\\AppData\\Local\\ms-playwright-mcp\\mcp-chrome-0885b19';

const ctx = await chromium.launchPersistentContext(PROFILE, { headless: true });
ctx.setDefaultTimeout(300000);
ctx.setDefaultNavigationTimeout(300000);
const page = ctx.pages()[0] ?? (await ctx.newPage());

// Triggers ipekci_maybe_import_products() on admin_init.
await page.goto(`${BASE}/wp-admin/`, { waitUntil: 'domcontentloaded' });
if (!(await page.$('#wpadminbar'))) {
  console.error('not authenticated');
  await ctx.close();
  process.exit(2);
}

const hasMenu = await page.evaluate(() =>
  [...document.querySelectorAll('#adminmenu a')].some((a) =>
    a.href.includes('post_type=ipekci_product')
  )
);
console.log(`admin menu "Producten" present: ${hasMenu}`);

// --- products -------------------------------------------------------------
// The admin list table paginates at 20 regardless of posts_per_page in the URL
// (it is a screen option), so read the authoritative "N items" total instead of
// counting rows.
await page.goto(`${BASE}/wp-admin/edit.php?post_type=ipekci_product`, {
  waitUntil: 'domcontentloaded',
});

const total = await page.evaluate(
  () => document.querySelector('.displaying-num')?.textContent?.trim() ?? '?'
);
console.log(`\nproducts in CPT: ${total}`);

// --- categories -----------------------------------------------------------
await page.goto(
  `${BASE}/wp-admin/edit-tags.php?taxonomy=ipekci_product_cat&post_type=ipekci_product`,
  { waitUntil: 'domcontentloaded' }
);

const cats = await page.evaluate(() =>
  [...document.querySelectorAll('#the-list tr')].map((tr) => ({
    name: tr.querySelector('.row-title')?.textContent?.trim() ?? '',
    slug: tr.querySelector('.column-slug')?.textContent?.trim() ?? '',
    count: tr.querySelector('.column-posts')?.textContent?.trim() ?? '',
  }))
);
console.log('\ncategories:');
for (const c of cats) console.log(`  ${c.name} (${c.slug}) — ${c.count} products`);

// --- media library --------------------------------------------------------
await page.goto(`${BASE}/wp-admin/upload.php?mode=list`, {
  waitUntil: 'domcontentloaded',
});
const media = await page.evaluate(
  () => document.querySelector('.displaying-num')?.textContent?.trim() ?? '?'
);
console.log(`\nmedia library: ${media}`);

// --- featured images ------------------------------------------------------
// Every card on the front end must resolve to an uploads/ URL, i.e. the Media
// Library copy, not the old hardcoded theme/CDN path.
await page.goto(`${BASE}/assortiment/`, { waitUntil: 'domcontentloaded' });
const imgs = await page.evaluate(() => {
  const cards = [...document.querySelectorAll('.ipekci-as-card__img')];
  return {
    cards: cards.length,
    fromUploads: cards.filter((i) => i.src.includes('/wp-content/uploads/')).length,
    other: [...new Set(cards.filter((i) => !i.src.includes('/wp-content/uploads/')).map((i) => i.src))],
  };
});
console.log(`\n/assortiment cards: ${imgs.cards}`);
console.log(`  images served from Media Library: ${imgs.fromUploads}/${imgs.cards}`);
if (imgs.other.length) console.log('  not from uploads:', imgs.other.slice(0, 5));

await ctx.close();
