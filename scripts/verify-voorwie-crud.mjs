/**
 * End-to-end Voor Wie CMS proof through the real wp-admin UI, then full revert:
 *
 *   upload image → create segment (published, with slug/eyebrow/desc/benefits/CTA
 *   + featured image) → verify it is live: 5th overview card, 5th tab, AND its
 *   detail page /voor-wie/{slug}/ routes (exercises the CMS-driven rewrite) →
 *   edit title + swap image + change CTA → verify live + CTA persisted in admin →
 *   delete segment + upload → verify the section is back to exactly 4.
 *
 * Front-end reads run anonymously after a LiteSpeed purge (admins bypass cache).
 *
 * Usage: node scripts/verify-voorwie-crud.mjs
 */
import { chromium } from 'playwright';
import { resolve } from 'node:path';

const BASE = 'https://ipekcislachterij.localclicks.nl';
const PROFILE =
  process.env.WP_PROFILE ??
  'C:\\Users\\HYPE AMD\\AppData\\Local\\ms-playwright-mcp\\mcp-chrome-0885b19';

const TITLE = 'QA Klantgroep (tijdelijk)';
const TITLE_EDITED = 'QA Klantgroep (bewerkt)';
const SLUG = 'qa-klantgroep-temp';
const UPLOAD = resolve('ipekci-theme/assets/images/cdn/2025/11/Voor-restaurants.webp');
const ROUTES = ['/', '/voor-wie/', `/voor-wie/${SLUG}/`];

const ctx = await chromium.launchPersistentContext(PROFILE, { headless: true });
ctx.setDefaultTimeout(180000);
ctx.setDefaultNavigationTimeout(180000);
const page = ctx.pages()[0] ?? (await ctx.newPage());

let failed = false;
const fail = (m) => {
  console.log(`✘ ${m}`);
  failed = true;
};

await page.goto(`${BASE}/wp-admin/`, { waitUntil: 'domcontentloaded' });
if (!(await page.$('#wpadminbar'))) {
  console.error('not authenticated');
  await ctx.close();
  process.exit(2);
}

async function purge() {
  await page.goto(`${BASE}/wp-admin/admin.php?page=litespeed-toolbox`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(async (routes) => {
    const all = [...document.querySelectorAll('a')].find((a) => /litespeed_type=purge_all(&|$)/.test(a.href));
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

/** Read /voor-wie/ overview + a segment detail page, anonymously. */
async function readLive(detailSlug) {
  await purge();
  // This host has a server-level cache above LSCache; give the purge a beat to
  // propagate before an anonymous read, or the read races the eviction.
  await page.waitForTimeout(3500);
  const anon = await ctx.browser().newContext();
  const p = await anon.newPage();
  p.setDefaultNavigationTimeout(120000);

  await p.goto(`${BASE}/voor-wie/`, { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(1200);
  const overview = await p.evaluate(() => {
    const cards = [...document.querySelectorAll('.ipekci-vw-card')];
    return {
      cards: cards.length,
      labels: cards.map((c) => c.querySelector('.ipekci-vw-card__title')?.textContent?.trim()),
      tabs: document.querySelectorAll('.ipekci-vw-tab').length,
      lastImg: cards.length
        ? cards[cards.length - 1].querySelector('.ipekci-vw-card__img')?.getAttribute('src') ?? ''
        : '',
    };
  });

  let detail = null;
  if (detailSlug) {
    const res = await p.goto(`${BASE}/voor-wie/${detailSlug}/`, { waitUntil: 'domcontentloaded' });
    await p.waitForTimeout(900);
    detail = await p.evaluate(() => {
      const img = document.querySelector('.ipekci-vw-detail__img');
      return {
        has: !!document.querySelector('.ipekci-vw-detail'),
        title: document.querySelector('.ipekci-vw-detail__title')?.textContent?.trim() ?? '',
        benefits: document.querySelectorAll('.ipekci-vw-detail__benefits li').length,
        img: img ? img.getAttribute('src') : '',
        imgBroken: img ? img.complete && img.naturalWidth === 0 : true,
      };
    });
    detail.status = res.status();
  }

  await anon.close();
  return { overview, detail };
}

// --- 1. upload image ------------------------------------------------------
await page.goto(`${BASE}/wp-admin/media-new.php?browser-uploader=1`, { waitUntil: 'domcontentloaded' });
await page.setInputFiles('#async-upload', UPLOAD);
await page.click('#html-upload', { noWaitAfter: true });
await page.waitForSelector('#the-list', { timeout: 180000 });
const ids = await page.evaluate(() =>
  [...document.querySelectorAll('#the-list tr[id^="post-"]')].map((tr) => Number(tr.id.replace('post-', '')))
);
const uploadId = ids[0] ?? 0;
const swapId = ids[1] ?? 0;
console.log(uploadId ? `✔ uploaded image → attachment ${uploadId}` : '✘ upload failed');
if (!uploadId) {
  await ctx.close();
  process.exit(1);
}

// --- 2. create segment ----------------------------------------------------
await page.goto(`${BASE}/wp-admin/post-new.php?post_type=ipekci_voorwie`, { waitUntil: 'domcontentloaded' });
await page.fill('#title', TITLE);
await page.fill('#_ipekci_vw_slug', SLUG);
await page.fill('#_ipekci_vw_eyebrow', 'QA klantgroep eyebrow');
await page.fill('#_ipekci_vw_description', 'Korte QA-omschrijving voor de tijdelijke klantgroep.');
await page.fill('#_ipekci_vw_long', 'Lange QA-omschrijving die op de detailpagina verschijnt voor deze tijdelijke klantgroep.');
await page.fill('#_ipekci_vw_benefits', 'QA voordeel één\nQA voordeel twee\nQA voordeel drie');
await page.fill('#_ipekci_vw_cta_text', 'QA CTA start');
await page.fill('#_ipekci_vw_cta_url', 'https://example.com/qa-start');
await page.evaluate((id) => { document.querySelector('#_thumbnail_id').value = String(id); }, uploadId);
await page.evaluate(() => document.querySelector('#publish').click());
await page.waitForURL(/[?&]message=\d+/, { timeout: 180000 });
const postId = await page.evaluate(() => Number(document.querySelector('#post_ID')?.value ?? 0));
console.log(`✔ created segment ${postId} "${TITLE}" (slug ${SLUG}, featured ${uploadId})`);

// --- 3. verify live -------------------------------------------------------
let live = await readLive(SLUG);
if (live.overview.cards !== 5) fail(`overview should be 5 cards, got ${live.overview.cards}`);
if (live.overview.tabs !== 6) fail(`should be 6 tabs, got ${live.overview.tabs}`);
if (!live.overview.labels.includes(TITLE)) fail('new segment not in overview grid');
if (live.overview.labels[live.overview.labels.length - 1] !== TITLE) fail('new segment did not append last');
if (!live.detail || live.detail.status !== 200) fail(`detail page did not route 200 (got ${live.detail?.status})`);
else {
  if (!live.detail.has) fail('detail showcase missing (segment not resolved by slug)');
  if (live.detail.title !== TITLE) fail(`detail title wrong: "${live.detail.title}"`);
  if (live.detail.benefits !== 3) fail(`detail should show 3 benefits, got ${live.detail.benefits}`);
  if (live.detail.imgBroken) fail('detail image broken');
  if (!live.detail.img.includes('/wp-content/uploads/')) fail(`detail image not from Media Library: ${live.detail.img}`);
  if (!failed) console.log('✔ live: 5 cards / 6 tabs, appended last, detail page routes 200 with title+benefits+image');
}
const imgBefore = live.detail?.img ?? '';

// --- 4. edit: title + image + CTA ----------------------------------------
await page.goto(`${BASE}/wp-admin/post.php?post=${postId}&action=edit`, { waitUntil: 'domcontentloaded' });
await page.fill('#title', TITLE_EDITED);
await page.fill('#_ipekci_vw_cta_text', 'QA CTA gewijzigd');
await page.fill('#_ipekci_vw_cta_url', 'https://example.com/qa-changed');
await page.evaluate((id) => { document.querySelector('#_thumbnail_id').value = String(id); }, swapId);
await page.evaluate(() => document.querySelector('#publish').click());
await page.waitForURL(/[?&]message=\d+/, { timeout: 180000 });
const ctaSaved = await page.evaluate(() => document.querySelector('#_ipekci_vw_cta_text')?.value ?? '');
const ctaUrlSaved = await page.evaluate(() => document.querySelector('#_ipekci_vw_cta_url')?.value ?? '');
if (ctaSaved !== 'QA CTA gewijzigd' || ctaUrlSaved !== 'https://example.com/qa-changed') {
  fail(`CTA meta did not persist (text "${ctaSaved}", url "${ctaUrlSaved}")`);
} else {
  console.log('✔ edited segment: title + image swapped, CTA text/url persisted in admin');
}

// --- 5. verify edit is live ----------------------------------------------
live = await readLive(SLUG);
if (!live.overview.labels.includes(TITLE_EDITED)) fail('edited title not live in overview');
if (live.overview.labels.includes(TITLE)) fail('old title still live');
if (live.detail?.title !== TITLE_EDITED) fail(`detail title not updated: "${live.detail?.title}"`);
if (live.detail && live.detail.img === imgBefore) fail('detail image did not change');
if (live.detail && live.detail.imgBroken) fail('swapped detail image broken');
if (!failed) console.log('✔ live: title updated and image swapped on overview + detail page');

// --- 6. revert ------------------------------------------------------------
await page.goto(`${BASE}/wp-admin/edit.php?post_type=ipekci_voorwie&s=QA+Klantgroep`, { waitUntil: 'domcontentloaded' });
await page.evaluate(async (id) => {
  const link = document.querySelector(`#post-${id} .submitdelete`);
  if (link) await fetch(link.href, { credentials: 'include' });
}, postId);
await page.goto(`${BASE}/wp-admin/edit.php?post_type=ipekci_voorwie&post_status=trash`, { waitUntil: 'domcontentloaded' });
await page.evaluate(async (id) => {
  const link = document.querySelector(`#post-${id} .submitdelete`);
  if (link) await fetch(link.href, { credentials: 'include' });
}, postId);
await page.goto(`${BASE}/wp-admin/upload.php?mode=list`, { waitUntil: 'domcontentloaded' });
await page.evaluate(async (id) => {
  const link = document.querySelector(`#post-${id} .submitdelete`);
  if (link) await fetch(link.href, { credentials: 'include' });
}, uploadId);
console.log('✔ reverted: segment deleted, uploaded image removed');

// --- 7. verify back to 4 --------------------------------------------------
live = await readLive(SLUG);
if (live.overview.cards !== 4) fail(`overview should be back to 4, got ${live.overview.cards}`);
if (live.overview.tabs !== 5) fail(`should be back to 5 tabs, got ${live.overview.tabs}`);
if (live.overview.labels.some((l) => l && l.startsWith('QA Klantgroep'))) fail('test segment still live');
// The deleted slug must stop routing (CMS-driven rewrite shrank).
if (live.detail && live.detail.status === 200 && live.detail.has) fail('deleted segment detail page still resolves');
if (!failed) console.log(`✔ live: section restored — 4 cards, 5 tabs, deleted slug no longer resolves (status ${live.detail?.status})`);

await ctx.close();
console.log(failed ? '\nFAILED' : '\nVoor Wie CMS create/edit/media/CTA/delete verified end-to-end');
process.exit(failed ? 1 : 0);
