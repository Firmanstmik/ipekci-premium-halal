/**
 * Install ipekci-theme-v3 ZIP, activate it, purge LiteSpeed.
 * Used when theme-editor deploy cannot verify large/complex files.
 */
import { chromium } from 'playwright';
import { resolve } from 'path';
import { existsSync, statSync } from 'fs';

const BASE = 'https://ipekcislachterij.localclicks.nl';
const ZIP = resolve('ipekci-theme.zip');
const PROFILE = process.env.WP_PROFILE ?? 'C:\\Users\\HYPE AMD\\AppData\\Local\\ms-playwright-mcp\\mcp-chrome-0885b19';
const SLUG = process.env.WP_THEME ?? 'ipekci-theme-v4';

if (!existsSync(ZIP)) {
  console.error('ipekci-theme.zip missing');
  process.exit(1);
}
console.log(`uploading ${(statSync(ZIP).size / 1024 / 1024).toFixed(1)} MB as ${SLUG}...`);

const ctx = await chromium.launchPersistentContext(PROFILE, { headless: false });
ctx.setDefaultTimeout(300000);
const page = ctx.pages()[0] ?? (await ctx.newPage());

await page.goto(`${BASE}/wp-admin/theme-install.php?browse=upload`, { waitUntil: 'domcontentloaded' });
if (!(await page.$('#wpadminbar'))) {
  console.log('pausing for login...');
  await page.waitForSelector('#wpadminbar', { timeout: 300000 });
  console.log('logged in');
  await page.goto(`${BASE}/wp-admin/theme-install.php?browse=upload`, { waitUntil: 'domcontentloaded' });
}

await page.waitForSelector('button.upload-view-toggle', { state: 'visible' });
await page.click('button.upload-view-toggle');
await page.waitForSelector('.upload-theme', { state: 'visible' });
await page.setInputFiles('#themezip', ZIP);
await page.waitForFunction(() => !document.querySelector('#install-theme-submit')?.disabled);
await page.click('#install-theme-submit', { noWaitAfter: true });

let ok = false;
let lastText = '';
for (let i = 0; i < 60; i++) {
  await page.waitForTimeout(3000);
  try {
    lastText = await page.evaluate(() => document.body?.innerText || '');
  } catch {
    continue;
  }
  if (/Theme installed successfully|succesvol geïnstalleerd/i.test(lastText)) {
    ok = true;
    console.log('installed after', (i + 1) * 3, 's');
    break;
  }
  if (/destination folder already exists|already installed/i.test(lastText)) {
    console.error('folder exists — rebuild with a new slug');
    console.error(lastText.slice(0, 400));
    break;
  }
}
if (!ok) {
  console.error('install failed');
  await ctx.close();
  process.exit(3);
}

await page.goto(`${BASE}/wp-admin/themes.php`, { waitUntil: 'domcontentloaded' });
await page.evaluate((slug) => {
  const btn = document.querySelector(`.theme[data-slug="${slug}"] .activate, .theme[data-slug="${slug}"] a.activate`);
  if (btn) btn.click();
}, SLUG);
await page.waitForTimeout(8000);
const active = await page.evaluate(() => document.querySelector('.theme.active')?.getAttribute('data-slug'));
console.log('active theme:', active);

await page.goto(`${BASE}/wp-admin/admin.php?page=litespeed-toolbox`, { waitUntil: 'domcontentloaded' });
const purge = await page.evaluate(async () => {
  const all = [...document.querySelectorAll('a')].find((a) => /litespeed_type=purge_all(&|$)/.test(a.href));
  if (!all) return { purgeAll: 'missing' };
  const r = await fetch(all.href, { credentials: 'include' });
  const d = new DOMParser().parseFromString(await r.text(), 'text/html');
  return {
    purgeAll: [...d.querySelectorAll('.notice')].map((n) => n.textContent.trim()).find((t) => /Purged/i.test(t)) ?? 'none',
  };
});
console.log('purge:', purge);
await ctx.close();
console.log('done');
