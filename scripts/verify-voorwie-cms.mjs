/**
 * Verify the Voor Wie CMS: the CPT registered, the one-time import ran (4 segments,
 * each with a Media Library image), and the live pages render from the CPT.
 *
 * Hitting wp-admin triggers the import (admin_init), so the first run is also the
 * run that performs it.
 *
 * Usage: node scripts/verify-voorwie-cms.mjs
 */
import { chromium } from 'playwright';

const BASE = 'https://ipekcislachterij.localclicks.nl';
const PROFILE =
  process.env.WP_PROFILE ??
  'C:\\Users\\HYPE AMD\\AppData\\Local\\ms-playwright-mcp\\mcp-chrome-0885b19';

const SEGMENTS = ['slagerijen', 'groothandels', 'supermarkten', 'restaurants'];

const ctx = await chromium.launchPersistentContext(PROFILE, { headless: true });
ctx.setDefaultTimeout(300000);
ctx.setDefaultNavigationTimeout(300000);
const page = ctx.pages()[0] ?? (await ctx.newPage());

// Triggers ipekci_maybe_import_voorwie() on admin_init.
await page.goto(`${BASE}/wp-admin/`, { waitUntil: 'domcontentloaded' });
if (!(await page.$('#wpadminbar'))) {
  console.error('not authenticated');
  await ctx.close();
  process.exit(2);
}

const hasMenu = await page.evaluate(() =>
  [...document.querySelectorAll('#adminmenu a')].some((a) => a.href.includes('post_type=ipekci_voorwie'))
);
console.log(`admin menu "Voor wie" present: ${hasMenu}`);

// --- entries --------------------------------------------------------------
await page.goto(`${BASE}/wp-admin/edit.php?post_type=ipekci_voorwie`, { waitUntil: 'domcontentloaded' });
const total = await page.evaluate(
  () => document.querySelector('.displaying-num')?.textContent?.trim() ?? '?'
);
console.log(`voor wie entries in CPT: ${total}`);

// --- live frontend (anonymous) -------------------------------------------
const anon = await ctx.browser().newContext();
const p = await anon.newPage();
p.setDefaultNavigationTimeout(120000);

// Overview page: 4 cards, images from uploads.
await p.goto(`${BASE}/voor-wie/`, { waitUntil: 'domcontentloaded' });
await p.waitForTimeout(1200);
const overview = await p.evaluate(() => {
  const cards = [...document.querySelectorAll('.ipekci-vw-card')];
  const imgs = cards.map((c) => c.querySelector('.ipekci-vw-card__img')).filter(Boolean);
  return {
    cards: cards.length,
    labels: cards.map((c) => c.querySelector('.ipekci-vw-card__title')?.textContent?.trim()),
    uploads: imgs.filter((i) => i.src.includes('/wp-content/uploads/')).length,
    broken: imgs.filter((i) => i.complete && i.naturalWidth === 0).length,
    tabs: document.querySelectorAll('.ipekci-vw-tab').length,
    h1: document.querySelectorAll('h1').length,
    php: /Warning:|Notice:|Deprecated:|Fatal error/.test(document.body.innerText),
  };
});
console.log(`\n/voor-wie/ overview:`);
console.log(`  cards ${overview.cards}, labels [${overview.labels.join(', ')}]`);
console.log(`  images from uploads ${overview.uploads}/${overview.cards}, broken ${overview.broken}`);
console.log(`  tabs ${overview.tabs}, h1 ${overview.h1}, php-notice ${overview.php}`);

// Each segment detail page.
console.log(`\nsegment detail pages:`);
for (const slug of SEGMENTS) {
  await p.goto(`${BASE}/voor-wie/${slug}/`, { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(800);
  const d = await p.evaluate(() => {
    const img = document.querySelector('.ipekci-vw-detail__img');
    return {
      status: document.querySelector('.ipekci-vw-detail') ? 'ok' : 'missing-detail',
      title: document.querySelector('.ipekci-vw-detail__title')?.textContent?.trim() ?? '',
      benefits: document.querySelectorAll('.ipekci-vw-detail__benefits li').length,
      more: document.querySelectorAll('.ipekci-vw-more__card').length,
      imgUploads: img ? img.src.includes('/wp-content/uploads/') : false,
      imgBroken: img ? img.complete && img.naturalWidth === 0 : true,
      activeTab: document.querySelector('.ipekci-vw-tab.is-active .ipekci-vw-tab__label')?.textContent?.trim() ?? '',
    };
  });
  console.log(
    `  /voor-wie/${slug}/ — ${d.status}, title "${d.title}", benefits ${d.benefits}, ` +
      `ontdek-ook ${d.more}, img-uploads ${d.imgUploads}, img-broken ${d.imgBroken}, active "${d.activeTab}"`
  );
}

// Navbar mega-menu (desktop) reads the same segments.
await p.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
await p.waitForTimeout(1000);
const nav = await p.evaluate(() => {
  const items = [...document.querySelectorAll('[data-nav-dropdown="voorwie"] .ipekci-nav-panel__item')];
  return {
    items: items.length,
    labels: items.map((i) => i.getAttribute('data-label')),
    previews: items.filter((i) => (i.getAttribute('data-preview') || '').includes('/wp-content/uploads/')).length,
  };
});
console.log(`\nnavbar voorwie mega-menu: ${nav.items} items [${nav.labels.join(', ')}], previews-from-uploads ${nav.previews}`);

await anon.close();
await ctx.close();
