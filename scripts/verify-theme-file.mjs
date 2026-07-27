/**
 * Confirm a live theme file is byte-identical to the local one.
 *
 * deploy-binaries.mjs temporarily writes an asset installer into a theme PHP
 * file and restores it afterwards. If that restore ever fails, the live theme
 * would keep an admin-gated arbitrary-file-write endpoint. This is the check
 * that says it did not.
 *
 * Usage: node scripts/verify-theme-file.mjs inc/customizer.php [...]
 */
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const BASE = 'https://ipekcislachterij.localclicks.nl';
const THEME = 'ipekci-theme';
const PROFILE =
  process.env.WP_PROFILE ??
  'C:\\Users\\HYPE AMD\\AppData\\Local\\ms-playwright-mcp\\mcp-chrome-0885b19';

const files = process.argv.slice(2);
if (!files.length) {
  console.error('usage: node scripts/verify-theme-file.mjs <rel-path> [...]');
  process.exit(1);
}

const ctx = await chromium.launchPersistentContext(PROFILE, { headless: true });
ctx.setDefaultTimeout(180000);
ctx.setDefaultNavigationTimeout(180000);
const page = ctx.pages()[0] ?? (await ctx.newPage());

await page.goto(`${BASE}/wp-admin/`, { waitUntil: 'domcontentloaded' });
if (!(await page.$('#wpadminbar'))) {
  console.error('not authenticated');
  await ctx.close();
  process.exit(2);
}

let bad = false;

for (const rel of files) {
  await page.goto(
    `${BASE}/wp-admin/theme-editor.php?file=${encodeURIComponent(rel)}&theme=${THEME}`,
    { waitUntil: 'domcontentloaded' }
  );

  const live = await page.evaluate(() => document.querySelector('#newcontent')?.value ?? null);
  if (live === null) {
    console.error(`  ?  ${rel} — editor unavailable`);
    bad = true;
    continue;
  }

  const local = readFileSync(resolve('ipekci-theme', rel), 'utf8');
  const norm = (s) => s.replace(/\r\n/g, '\n').trimEnd();

  const match = norm(live) === norm(local);
  const dirty = /ipekci_install_assets|TEMPORARY ASSET INSTALLER|base64_decode/.test(live);

  console.log(
    `  ${match && !dirty ? '✔' : '✘'}  ${rel} — ${match ? 'identical to local' : `DIFFERS (live ${live.length}b vs local ${local.length}b)`}${dirty ? '  !! INSTALLER RESIDUE PRESENT' : ''}`
  );

  if (!match || dirty) bad = true;
}

await ctx.close();
console.log(bad ? '\nFAILED' : '\nall verified clean');
process.exit(bad ? 1 : 0);
