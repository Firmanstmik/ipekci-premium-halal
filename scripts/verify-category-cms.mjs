/**
 * Verify the Product Category CMS: the term-meta fields exist on the category edit
 * screen, editing a category's eyebrow / description / preview image reaches the
 * live /assortiment/{category} hero AND the navbar mega-menu, and clearing them
 * restores the hardcoded defaults byte-for-byte.
 *
 * Front-end reads run anonymously after a LiteSpeed purge (+ settle) because admins
 * bypass the cache on this host.
 *
 * Usage: node scripts/verify-category-cms.mjs
 */
import { chromium } from 'playwright';

const BASE = 'https://ipekcislachterij.localclicks.nl';
const PROFILE =
  process.env.WP_PROFILE ??
  'C:\\Users\\HYPE AMD\\AppData\\Local\\ms-playwright-mcp\\mcp-chrome-0885b19';

const TAX = 'ipekci_product_cat';
const SLUG = 'rundvlees';
const HARD_EYEBROW = 'Ipekci rundvlees';
const NEW_EYEBROW = 'QA rundvlees eyebrow';
const NEW_DESC = 'QA beschrijving voor rundvlees categorie.';

const ctx = await chromium.launchPersistentContext(PROFILE, { headless: true });
ctx.setDefaultTimeout(180000);
ctx.setDefaultNavigationTimeout(180000);
const page = ctx.pages()[0] ?? (await ctx.newPage());

let failed = false;
const fail = (m) => { console.log(`✘ ${m}`); failed = true; };

await page.goto(`${BASE}/wp-admin/`, { waitUntil: 'domcontentloaded' });
if (!(await page.$('#wpadminbar'))) {
  console.error('not authenticated');
  await ctx.close();
  process.exit(2);
}

// --- resolve the rundvlees term id + an attachment to use as preview ------
await page.goto(`${BASE}/wp-admin/edit-tags.php?taxonomy=${TAX}&post_type=ipekci_product`, { waitUntil: 'domcontentloaded' });
const termId = await page.evaluate((slug) => {
  const row = [...document.querySelectorAll('#the-list tr')].find((tr) =>
    (tr.querySelector('.slug')?.textContent?.trim() ?? '') === slug
  );
  const m = row?.querySelector('.row-title')?.href?.match(/tag_ID=(\d+)/);
  return m ? Number(m[1]) : 0;
}, SLUG);
console.log(termId ? `✔ resolved ${SLUG} term id ${termId}` : '✘ could not resolve term id');
if (!termId) { await ctx.close(); process.exit(1); }

await page.goto(`${BASE}/wp-admin/upload.php?mode=list`, { waitUntil: 'domcontentloaded' });
const attId = await page.evaluate(() => {
  const tr = document.querySelector('#the-list tr[id^="post-"]');
  return tr ? Number(tr.id.replace('post-', '')) : 0;
});

// --- admin: the edit screen exposes all four fields -----------------------
await page.goto(`${BASE}/wp-admin/term.php?taxonomy=${TAX}&tag_ID=${termId}&post_type=ipekci_product`, { waitUntil: 'domcontentloaded' });
const fields = await page.evaluate(() => ({
  eyebrow: !!document.querySelector('[name="_ipekci_cat_eyebrow"]'),
  description: !!document.querySelector('[name="_ipekci_cat_description"]'),
  preview: !!document.querySelector('[name="_ipekci_cat_preview"]'),
  sticker: !!document.querySelector('[name="_ipekci_cat_sticker"]'),
  chooseButtons: document.querySelectorAll('.ipekci-cat-media__choose').length,
}));
if (!fields.eyebrow || !fields.description || !fields.preview || !fields.sticker) fail(`missing fields: ${JSON.stringify(fields)}`);
else console.log(`✔ edit screen has all 4 fields + ${fields.chooseButtons} media pickers`);

/** Purge + settle, then read the live category page + mega-menu anonymously. */
async function readLive() {
  await page.goto(`${BASE}/wp-admin/admin.php?page=litespeed-toolbox`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(async () => {
    const all = [...document.querySelectorAll('a')].find((a) => /litespeed_type=purge_all(&|$)/.test(a.href));
    if (all) await fetch(all.href, { credentials: 'include' });
    const form = [...document.querySelectorAll('form')].find((f) => [...f.querySelectorAll('input')].some((i) => i.value === 'PURGE_BY'));
    if (form) {
      const r = [...form.querySelectorAll('input[name="purgeby"]')].find((x) => x.value === '3');
      if (r) r.checked = true;
      form.querySelector('textarea[name="purgebylist"]').value = ['/', '/assortiment/rundvlees/']
        .map((x) => 'https://ipekcislachterij.localclicks.nl' + x).join('\n');
      await fetch(form.action, { method: 'POST', body: new FormData(form), credentials: 'include' });
    }
  });
  await page.waitForTimeout(3500);

  const anon = await ctx.browser().newContext();
  const p = await anon.newPage();
  p.setDefaultNavigationTimeout(120000);
  await p.goto(`${BASE}/assortiment/rundvlees/`, { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(1000);
  const catpage = await p.evaluate(() => ({
    eyebrow: document.querySelector('.ipekci-as-hero__eyebrow')?.textContent?.trim() ?? '',
    lede: document.querySelector('.ipekci-as-hero__lede')?.textContent?.trim() ?? '',
    heroImg: document.querySelector('.ipekci-as-hero__img')?.getAttribute('src') ?? '',
  }));
  await p.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(800);
  const mega = await p.evaluate(() => {
    const it = [...document.querySelectorAll('[data-nav-dropdown="assortiment"] .ipekci-nav-panel__item')]
      .find((i) => (i.getAttribute('href') || '').includes('/assortiment/rundvlees'));
    return it ? { eyebrow: it.getAttribute('data-eyebrow'), preview: it.getAttribute('data-preview') } : null;
  });
  await anon.close();
  return { catpage, mega };
}

/** Fill the term edit form and submit it natively (real WP save path). */
async function saveMeta(vals) {
  await page.goto(`${BASE}/wp-admin/term.php?taxonomy=${TAX}&tag_ID=${termId}&post_type=ipekci_product`, { waitUntil: 'domcontentloaded' });
  await page.evaluate((vals) => {
    for (const [k, v] of Object.entries(vals)) {
      const el = document.querySelector(`[name="${k}"]`);
      if (el) el.value = v;
    }
  }, vals);
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 120000 }),
    page.evaluate(() => document.querySelector('#edittag').submit()),
  ]);
  return 'saved';
}

// --- baseline: unchanged = hardcoded --------------------------------------
let live = await readLive();
if (live.catpage.eyebrow !== HARD_EYEBROW) fail(`baseline eyebrow wrong: "${live.catpage.eyebrow}"`);
else console.log(`✔ baseline: category page + mega-menu render hardcoded defaults (eyebrow "${live.catpage.eyebrow}")`);
const baseHero = live.catpage.heroImg;
const basePreview = live.mega?.preview;

// --- edit: eyebrow + description + preview image ---------------------------
const st = await saveMeta({ _ipekci_cat_eyebrow: NEW_EYEBROW, _ipekci_cat_description: NEW_DESC, _ipekci_cat_preview: String(attId) });
console.log(`edited term (HTTP ${st}, preview attachment ${attId})`);

live = await readLive();
if (live.catpage.eyebrow !== NEW_EYEBROW) fail(`category page eyebrow not updated: "${live.catpage.eyebrow}"`);
if (live.catpage.lede !== NEW_DESC) fail(`category page description not updated: "${live.catpage.lede}"`);
if (live.mega?.eyebrow !== NEW_EYEBROW) fail(`mega-menu eyebrow not updated: "${live.mega?.eyebrow}"`);
if (attId) {
  if (!live.catpage.heroImg.includes('/wp-content/uploads/')) fail(`hero image not from Media Library: ${live.catpage.heroImg}`);
  if (live.catpage.heroImg === baseHero) fail('hero image did not change');
  if (!live.mega?.preview.includes('/wp-content/uploads/')) fail(`mega preview not from Media Library: ${live.mega?.preview}`);
}
if (!failed) console.log('✔ live: eyebrow + description + preview image updated on BOTH the category page and the mega-menu');

// --- revert ---------------------------------------------------------------
await saveMeta({ _ipekci_cat_eyebrow: '', _ipekci_cat_description: '', _ipekci_cat_preview: '' });
live = await readLive();
if (live.catpage.eyebrow !== HARD_EYEBROW) fail(`revert failed, eyebrow "${live.catpage.eyebrow}"`);
if (live.catpage.heroImg !== baseHero) fail(`revert failed, hero image "${live.catpage.heroImg}" != baseline`);
if (live.mega?.preview !== basePreview) fail('revert failed, mega preview != baseline');
if (!failed) console.log('✔ reverted: category page + mega-menu back to hardcoded defaults');

await ctx.close();
console.log(failed ? '\nFAILED' : '\nProduct Category CMS verified end-to-end');
process.exit(failed ? 1 : 0);
