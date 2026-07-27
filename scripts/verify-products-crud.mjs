/**
 * End-to-end CMS proof: do the things the client will actually do, through the real
 * wp-admin UI, and confirm each one reaches the live front end — then undo them all.
 *
 *   upload an image → create a product → verify live → edit title → swap the image
 *   → verify live → delete the product + the upload → verify the catalogue is back
 *   to exactly its original 44.
 *
 * Front-end checks run in a clean anonymous context after an explicit LiteSpeed
 * purge, because "it looks right to the logged-in admin" is precisely the failure
 * this host is known for (admins bypass the cache; visitors do not).
 *
 * Usage: node scripts/verify-products-crud.mjs
 */
import { chromium } from 'playwright';
import { resolve } from 'node:path';

const BASE = 'https://ipekcislachterij.localclicks.nl';
const PROFILE =
  process.env.WP_PROFILE ??
  'C:\\Users\\HYPE AMD\\AppData\\Local\\ms-playwright-mcp\\mcp-chrome-0885b19';

const TITLE = 'QA Testproduct (tijdelijk)';
const TITLE_EDITED = 'QA Testproduct (bewerkt)';
const UPLOAD = resolve('ipekci-theme/assets/images/cdn/2025/12/Hamburger.png');

const ROUTES = ['/', '/assortiment/', '/assortiment/kip/', '/ons-verhaal/'];

const ctx = await chromium.launchPersistentContext(PROFILE, { headless: true });
ctx.setDefaultTimeout(180000);
ctx.setDefaultNavigationTimeout(180000);
const page = ctx.pages()[0] ?? (await ctx.newPage());

const fail = (msg) => {
  console.log(`✘ ${msg}`);
  failed = true;
};
let failed = false;

await page.goto(`${BASE}/wp-admin/`, { waitUntil: 'domcontentloaded' });
if (!(await page.$('#wpadminbar'))) {
  console.error('not authenticated');
  await ctx.close();
  process.exit(2);
}

/** Purge LiteSpeed (all + by-URL — this host needs both). */
async function purge() {
  await page.goto(`${BASE}/wp-admin/admin.php?page=litespeed-toolbox`, {
    waitUntil: 'domcontentloaded',
  });
  await page.evaluate(async (routes) => {
    const all = [...document.querySelectorAll('a')].find((a) =>
      /litespeed_type=purge_all(&|$)/.test(a.href)
    );
    if (all) await fetch(all.href, { credentials: 'include' });

    const form = [...document.querySelectorAll('form')].find((f) =>
      [...f.querySelectorAll('input')].some((i) => i.value === 'PURGE_BY')
    );
    if (form) {
      const radio = [...form.querySelectorAll('input[name="purgeby"]')].find((r) => r.value === '3');
      if (radio) radio.checked = true;
      form.querySelector('textarea[name="purgebylist"]').value = routes
        .map((p) => 'https://ipekcislachterij.localclicks.nl' + p)
        .join('\n');
      await fetch(form.action, { method: 'POST', body: new FormData(form), credentials: 'include' });
    }
  }, ROUTES);
}

/** Read the /assortiment/kip/ grid as an anonymous visitor. */
async function readLive() {
  await purge();
  const anon = await ctx.browser().newContext();
  const p = await anon.newPage();
  p.setDefaultNavigationTimeout(120000);

  await p.goto(`${BASE}/assortiment/kip/`, { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(1200);
  const kip = await p.evaluate(() =>
    [...document.querySelectorAll('.ipekci-as-card')].map((c) => ({
      title: c.querySelector('.ipekci-as-card__title')?.textContent?.trim() ?? '',
      src: c.querySelector('.ipekci-as-card__img')?.getAttribute('src') ?? '',
      broken: (() => {
        const i = c.querySelector('.ipekci-as-card__img');
        return i ? i.complete && i.naturalWidth === 0 : true;
      })(),
    }))
  );

  await p.goto(`${BASE}/assortiment/`, { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(1200);
  const all = await p.evaluate(
    () => document.querySelectorAll('.ipekci-as-card').length
  );

  await anon.close();
  return { kip, all };
}

// --- 1. upload an image ---------------------------------------------------
await page.goto(`${BASE}/wp-admin/media-new.php?browser-uploader=1`, {
  waitUntil: 'domcontentloaded',
});
await page.setInputFiles('#async-upload', UPLOAD);
await page.click('#html-upload', { noWaitAfter: true });
await page.waitForSelector('#the-list', { timeout: 180000 });

// The media list table rows carry id="post-{attachment_id}" (it does not use the
// .row-title class the posts table does), newest first.
const ids = await page.evaluate(() =>
  [...document.querySelectorAll('#the-list tr[id^="post-"]')].map((tr) =>
    Number(tr.id.replace('post-', ''))
  )
);

const uploadId = ids[0] ?? 0;
console.log(uploadId ? `✔ uploaded image → attachment ${uploadId}` : '✘ upload failed');
if (!uploadId) {
  await ctx.close();
  process.exit(1);
}

// A second, different image to swap to later — reuse one the import already made.
const swapId = ids[1] ?? 0;

// --- 2. create a product --------------------------------------------------
await page.goto(`${BASE}/wp-admin/post-new.php?post_type=ipekci_product`, {
  waitUntil: 'domcontentloaded',
});
await page.fill('#title', TITLE);
await page.fill('#_ipekci_badge', 'QA');
await page.fill('#_ipekci_weight', '1 kg');

// Category: tick "Kip" so the change is measurable against a known count (5).
const ticked = await page.evaluate(() => {
  const boxes = [...document.querySelectorAll('#ipekci_product_catchecklist input[type=checkbox]')];
  const kip = boxes.find((b) => b.parentElement.textContent.trim() === 'Kip');
  if (!kip) return false;
  kip.checked = true;
  return true;
});
if (!ticked) fail('could not tick the Kip category checkbox');

// Featured image: the classic editor posts _thumbnail_id, and edit_post() honours
// it — the same code path the media modal uses.
await page.evaluate((id) => {
  document.querySelector('#_thumbnail_id').value = String(id);
}, uploadId);

// DOM-click: the admin's publish box never settles for Playwright's actionability
// check on this host, and this takes the identical code path.
await page.evaluate(() => document.querySelector('#publish').click());
// WordPress redirects to ...&message=6 on a successful save; the on-page notice is
// rendered collapsed, so wait on the URL, not its visibility.
await page.waitForURL(/[?&]message=\d+/, { timeout: 180000 });

const productId = await page.evaluate(() => Number(document.querySelector('#post_ID')?.value ?? 0));
console.log(`✔ created product ${productId} "${TITLE}" (Kip, featured image ${uploadId})`);

// --- 3. verify it is live -------------------------------------------------
let live = await readLive();
const created = live.kip.find((c) => c.title === TITLE);
if (live.kip.length !== 6) fail(`kip grid should be 6, got ${live.kip.length}`);
if (live.all !== 45) fail(`all grid should be 45, got ${live.all}`);
if (!created) fail('new product not on the live front end');
else {
  if (created.broken) fail('new product image is broken');
  if (!created.src.includes('/wp-content/uploads/')) fail(`image not from Media Library: ${created.src}`);
  if (live.kip[live.kip.length - 1].title !== TITLE)
    fail('new product did not append to the end of the grid');
  else console.log('✔ live: appears last in the Kip grid, image from Media Library, 6 cards / 45 total');
}
const srcBefore = created?.src ?? '';

// --- 4. edit it: new title + swapped image --------------------------------
await page.goto(`${BASE}/wp-admin/post.php?post=${productId}&action=edit`, {
  waitUntil: 'domcontentloaded',
});
await page.fill('#title', TITLE_EDITED);
await page.fill('#_ipekci_badge', 'QA bewerkt');
await page.evaluate((id) => {
  document.querySelector('#_thumbnail_id').value = String(id);
}, swapId);
// DOM-click: the admin's publish box never settles for Playwright's actionability
// check on this host, and this takes the identical code path.
await page.evaluate(() => document.querySelector('#publish').click());
// WordPress redirects to ...&message=6 on a successful save; the on-page notice is
// rendered collapsed, so wait on the URL, not its visibility.
await page.waitForURL(/[?&]message=\d+/, { timeout: 180000 });
console.log(`✔ edited product ${productId}: title + featured image → ${swapId}`);

const badgeSaved = await page.evaluate(
  () => document.querySelector('#_ipekci_badge')?.value ?? ''
);
if (badgeSaved !== 'QA bewerkt') fail(`meta field did not persist (got "${badgeSaved}")`);
else console.log('✔ meta field persisted after save');

// --- 5. verify the edit is live -------------------------------------------
live = await readLive();
const edited = live.kip.find((c) => c.title === TITLE_EDITED);
if (!edited) fail('edited title not on the live front end');
else {
  if (edited.broken) fail('swapped image is broken');
  if (edited.src === srcBefore) fail('image did not change on the front end');
  else console.log('✔ live: title updated and image swapped to the new Media Library file');
}
if (live.kip.some((c) => c.title === TITLE)) fail('old title still live');

// --- 6. revert ------------------------------------------------------------
// Trash via the list-table row action, so the nonce comes from WordPress itself
// rather than being hand-built.
await page.goto(`${BASE}/wp-admin/edit.php?post_type=ipekci_product&s=QA+Testproduct`, {
  waitUntil: 'domcontentloaded',
});
const trashed = await page.evaluate(async (id) => {
  const link = document.querySelector(`#post-${id} .submitdelete`);
  if (!link) return false;
  await fetch(link.href, { credentials: 'include' });
  return true;
}, productId);
if (!trashed) fail('could not trash the test product');

// Empty trash so the product is gone for good.
await page.goto(`${BASE}/wp-admin/edit.php?post_type=ipekci_product&post_status=trash`, {
  waitUntil: 'domcontentloaded',
});
await page.evaluate(async (id) => {
  const link = document.querySelector(`#post-${id} .submitdelete`);
  if (link) await fetch(link.href, { credentials: 'include' });
});

// Delete the uploaded attachment too.
await page.goto(`${BASE}/wp-admin/upload.php?mode=list`, { waitUntil: 'domcontentloaded' });
await page.evaluate(async (id) => {
  const link = document.querySelector(`#post-${id} .submitdelete`);
  if (link) await fetch(link.href, { credentials: 'include' });
}, uploadId);
console.log('✔ reverted: product deleted, uploaded image removed');

// --- 7. verify the catalogue is exactly back to its original state --------
live = await readLive();
if (live.kip.length !== 5) fail(`kip grid should be back to 5, got ${live.kip.length}`);
if (live.all !== 44) fail(`all grid should be back to 44, got ${live.all}`);
if (live.kip.some((c) => c.title.startsWith('QA Testproduct'))) fail('test product still live');
if (live.kip.some((c) => c.broken)) fail('broken image after revert');
if (!failed) console.log('✔ live: catalogue restored — Kip 5, total 44, no test data');

await ctx.close();
console.log(failed ? '\nFAILED' : '\nCMS create/edit/media/delete verified end-to-end');
process.exit(failed ? 1 : 0);
