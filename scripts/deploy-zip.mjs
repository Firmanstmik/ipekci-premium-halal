/**
 * Deploy the full theme zip to the live site.
 *
 * Needed only when BINARY assets change (images, fonts) — text files should go via
 * scripts/deploy-files.mjs, which is seconds rather than a 21 MB upload on a host
 * that has stalled mid-upload before.
 *
 * Uses WordPress's update-from-upload flow ("Replace current with uploaded"), NOT
 * the delete-then-reinstall dance: the theme stays installed and active the whole
 * time, so a stalled upload cannot leave the site themeless. If WP does not offer
 * the overwrite screen this bails out rather than guessing.
 *
 * Usage: node scripts/deploy-zip.mjs
 */
import { chromium } from 'playwright';
import { existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

const BASE = 'https://ipekcislachterij.localclicks.nl';
const ZIP = resolve('ipekci-theme.zip');
const PROFILE =
  process.env.WP_PROFILE ??
  'C:\\Users\\HYPE AMD\\AppData\\Local\\ms-playwright-mcp\\mcp-chrome-0885b19';

if (!existsSync(ZIP)) {
  console.error('ipekci-theme.zip not found — run scripts/build-theme-zip.py first');
  process.exit(1);
}
console.log(`uploading ${(statSync(ZIP).size / 1024 / 1024).toFixed(1)} MB ...`);

const ctx = await chromium.launchPersistentContext(PROFILE, { headless: false });
ctx.setDefaultTimeout(300000);
ctx.setDefaultNavigationTimeout(300000);
const page = ctx.pages()[0] ?? (await ctx.newPage());

await page.goto(`${BASE}/wp-admin/theme-install.php?browse=upload`, { waitUntil: 'domcontentloaded' });
if (!(await page.$('#wpadminbar'))) {
  console.error('not authenticated (profile session expired) — pausing for login...');
  await page.waitForSelector('#wpadminbar', { state: 'visible', timeout: 300000 });
  console.log('Login successful. Resuming deployment...');
  // Navigate back to the upload page if login redirects elsewhere
  if (!page.url().includes('theme-install.php')) {
    console.log('Navigating back to theme install page...');
    await page.goto(`${BASE}/wp-admin/theme-install.php?browse=upload`, { waitUntil: 'domcontentloaded' });
  }
}

// This host drops large upload POSTs (net::ERR_CONNECTION_CLOSED) intermittently —
// the 32 MB zip took 3 attempts in an earlier session. So: detect the dropped POST
// immediately and retry, rather than sitting through a 5-minute timeout for a
// request that is already dead.
const ATTEMPTS = 6;
let text = '';
let uploaded = false;

for (let attempt = 1; attempt <= ATTEMPTS && !uploaded; attempt++) {
  let postFailed = null;
  const onFailed = (r) => {
    if (r.method() === 'POST' && /update\.php/.test(r.url())) postFailed = r.failure()?.errorText;
  };
  page.on('requestfailed', onFailed);

  console.log(`Starting attempt ${attempt}...`);
  await page.goto(`${BASE}/wp-admin/theme-install.php?browse=upload`, { waitUntil: 'domcontentloaded' });

  console.log('Waiting for upload toggle...');
  await page.waitForSelector('button.upload-view-toggle', { state: 'visible', timeout: 60000 });
  await page.click('button.upload-view-toggle');
  
  console.log('Waiting for upload form...');
  await page.waitForSelector('.upload-theme', { state: 'visible', timeout: 30000 });

  console.log('Setting file input...');
  await page.setInputFiles('#themezip', ZIP);
  
  console.log('Waiting for submit button to be enabled...');
  await page.waitForFunction(() => !document.querySelector('#install-theme-submit')?.disabled, { timeout: 30000 });
  
  console.log('Clicking submit...');
  await page.click('#install-theme-submit', { noWaitAfter: true });

  for (let i = 0; i < 60; i++) {
    await page.waitForTimeout(5000);
    if (postFailed) {
      console.log('POST failed detected:', postFailed);
      break;
    }
    text = await page.evaluate(() => document.body.innerText || '').catch(() => '');
    if (/already installed|Theme installed successfully|Theme updated successfully|destination folder already exists|succesvol geïnstalleerd|al geïnstalleerd|bestaat al/i.test(text)) {
      uploaded = true;
      console.log(`  attempt ${attempt}: upload accepted after ${(i + 1) * 5}s. Match found in text:`, text.match(/already installed|Theme installed successfully|Theme updated successfully|destination folder already exists|succesvol geïnstalleerd|al geïnstalleerd|bestaat al/i)[0]);
      break;
    }
  }

  page.off('requestfailed', onFailed);

  if (!uploaded) {
    console.log(`  attempt ${attempt}/${ATTEMPTS} failed${postFailed ? ` (${postFailed})` : ' (timed out)'} — retrying`);
    await page.waitForTimeout(4000);
  }
}

if (!uploaded) {
  console.error(`\nupload rejected by the host on all ${ATTEMPTS} attempts.`);
  await ctx.close();
  process.exit(4);
}

if (/already installed|destination folder already exists|al geïnstalleerd|bestaat al/i.test(text)) {
  console.log('theme already installed — using WP overwrite flow');

  const overwrite = await page.$(
    'a.button:has-text("Replace current with uploaded"), a:has-text("Replace current with uploaded"), a.button:has-text("Huidige vervangen met geüploade"), a.button:has-text("Replace active with uploaded"), a.button:has-text("Vervang huidige")'
  ) || await page.$('.update-from-upload-actions .button-primary, a.button-primary');
  if (!overwrite) {
    console.error('WP did not offer "Replace current with uploaded". HTML said:\n', await page.evaluate(() => document.querySelector('.wrap')?.innerHTML || document.body.innerHTML));
    await page.screenshot({ path: 'upload-error.png', fullPage: true }).catch(() => {});
    await ctx.close();
    process.exit(3);
  }

  await overwrite.click({ noWaitAfter: true });
  await page
    .waitForFunction(
      () => /Theme updated successfully|successfully installed|has been updated|succesvol bijgewerkt|succesvol geïnstalleerd|succesvol geüpload/i.test(document.body.innerText),
      { timeout: 300000 }
    )
    .catch(() => {});
  console.log('overwrite result:', (await page.evaluate(() => document.body.innerText)).slice(0, 200).replace(/\s+/g, ' '));
} else if (/Theme installed successfully/i.test(text)) {
  console.log('theme installed fresh');
} else {
  console.error('unexpected install screen:\n', text.slice(0, 600));
  await ctx.close();
  process.exit(3);
}

// --- confirm the theme is still installed AND active ---------------------
await page.goto(`${BASE}/wp-admin/themes.php`, { waitUntil: 'domcontentloaded' });
const active = await page.evaluate(() => {
  const el = document.querySelector('.theme.active .theme-name');
  return el ? el.textContent.trim().replace(/\s+/g, ' ') : null;
});
console.log('active theme:', active);

if (!/ipek/i.test(active || '')) {
  console.error('ipekci-theme is NOT active after deploy — activating');
  const activate = await page.$('.theme[data-slug="ipekci-theme-v2"] .activate, a.button.activate');
  if (activate) {
    await activate.click({ noWaitAfter: true });
    await page.waitForTimeout(15000);
  }
}

// --- purge (both steps — see deploy-files.mjs) ---------------------------
await page.goto(`${BASE}/wp-admin/admin.php?page=litespeed-toolbox`, { waitUntil: 'domcontentloaded' });
const purge = await page.evaluate(async () => {
  const out = {};
  const routes = [
    '/', '/ons-verhaal/', '/contact/', '/assortiment/', '/assortiment/lamsvlees/',
    '/assortiment/rundvlees/', '/assortiment/kip/', '/assortiment/eindproducten/',
    '/voor-wie/', '/voor-wie/slagerijen/', '/voor-wie/groothandels/',
    '/voor-wie/supermarkten/', '/voor-wie/restaurants/',
  ];
  const all = [...document.querySelectorAll('a')].find((a) => /litespeed_type=purge_all(&|$)/.test(a.href));
  const css = [...document.querySelectorAll('a')].find((a) => /litespeed_type=purge_all_css(&|$)/.test(a.href));
  const js = [...document.querySelectorAll('a')].find((a) => /litespeed_type=purge_all_js(&|$)/.test(a.href));
  const obj = [...document.querySelectorAll('a')].find((a) => /litespeed_type=purge_all_object(&|$)/.test(a.href));
  
  if (all) {
    const r = await fetch(all.href, { credentials: 'include' });
    const d = new DOMParser().parseFromString(await r.text(), 'text/html');
    out.purgeAll = [...d.querySelectorAll('.notice')].map((n) => n.textContent.trim()).find((t) => /Purged/i.test(t)) ?? 'none';
  }
  if (css) await fetch(css.href, { credentials: 'include' });
  if (js) await fetch(js.href, { credentials: 'include' });
  if (obj) await fetch(obj.href, { credentials: 'include' });
  const form = [...document.querySelectorAll('form')].find((f) =>
    [...f.querySelectorAll('input')].some((i) => i.value === 'PURGE_BY')
  );
  if (form) {
    const radio = [...form.querySelectorAll('input[name="purgeby"]')].find((r) => r.value === '3');
    if (radio) radio.checked = true;
    form.querySelector('textarea[name="purgebylist"]').value = routes
      .map((p) => 'https://ipekcislachterij.localclicks.nl' + p)
      .join('\n');
    const r = await fetch(form.action, { method: 'POST', body: new FormData(form), credentials: 'include' });
    const d = new DOMParser().parseFromString(await r.text(), 'text/html');
    out.purgeByUrl = [...d.querySelectorAll('.notice')]
      .map((n) => n.textContent.trim())
      .some((t) => /Notified LiteSpeed Web Server/i.test(t));
  }
  return out;
});
console.log('purge:', JSON.stringify(purge));

await ctx.close();
