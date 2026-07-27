/**
 * Deploy individual theme files to the live site via the WordPress Theme File
 * Editor, then purge LiteSpeed.
 *
 * Why not the 32 MB zip: re-uploading the whole theme takes minutes on this host
 * and has stalled mid-upload before. For a handful of changed files the editor
 * POST is seconds and cannot half-apply. WordPress runs a loopback fatal-error
 * check on every .php write and reverts the file if it would white-screen the
 * site, so a syntax error cannot take the site down.
 *
 * Purging is TWO steps on this host — see the purge() note below.
 *
 * Usage: node scripts/deploy-files.mjs inc/enqueue.php templates/page-ons-verhaal.php
 */
import { chromium } from 'playwright';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const BASE = 'https://ipekcislachterij.localclicks.nl';
const THEME = 'ipekci-theme';

// Reuse the already-authenticated browser profile rather than logging in: the
// wp-admin password is not in the repo (the admin/admin in the old status doc is
// stale and is rejected). WP_USER / WP_PASS can be exported to force a login.
const PROFILE = process.env.WP_PROFILE
  ?? 'C:\\Users\\HYPE AMD\\AppData\\Local\\ms-playwright-mcp\\mcp-chrome-0885b19';
const USER = process.env.WP_USER ?? '';
const PASS = process.env.WP_PASS ?? '';

const ROUTES = [
  '/', '/ons-verhaal/', '/contact/',
  '/assortiment/', '/assortiment/lamsvlees/', '/assortiment/rundvlees/',
  '/assortiment/kip/', '/assortiment/eindproducten/',
  '/voor-wie/', '/voor-wie/slagerijen/', '/voor-wie/groothandels/',
  '/voor-wie/supermarkten/', '/voor-wie/restaurants/',
];

const files = process.argv.slice(2);
if (!files.length) {
  console.error('usage: node scripts/deploy-files.mjs <theme-relative-path>...');
  process.exit(1);
}

if (!existsSync(PROFILE) && !PASS) {
  console.error(`no authenticated profile at ${PROFILE} and no WP_PASS set — cannot authenticate`);
  process.exit(2);
}

// This host is slow; the wp-admin dashboard in particular can take minutes to
// reach 'load'. Everything below waits on specific elements instead.
const ctx = await chromium.launchPersistentContext(PROFILE, { headless: true });
ctx.setDefaultTimeout(120000);
ctx.setDefaultNavigationTimeout(120000);
const page = ctx.pages()[0] ?? (await ctx.newPage());

// --- authenticate ---------------------------------------------------------
await page.goto(`${BASE}/wp-admin/`, { waitUntil: 'domcontentloaded' });

if (!(await page.$('#wpadminbar'))) {
  if (!PASS) {
    console.error('profile session expired and no WP_PASS set — cannot authenticate');
    await ctx.close();
    process.exit(2);
  }
  await page.goto(`${BASE}/wp-login.php`, { waitUntil: 'domcontentloaded' });
  await page.fill('#user_login', USER);
  await page.fill('#user_pass', PASS);
  // noWaitAfter: the post-login dashboard can take minutes to reach 'load'.
  await page.click('#wp-submit', { noWaitAfter: true });
  await page.waitForSelector('#wpadminbar', { timeout: 120000 });
  console.log('logged in as', USER);
} else {
  console.log('reusing authenticated session from profile');
}

// --- push each file -------------------------------------------------------
let failed = 0;
for (const rel of files) {
  const local = readFileSync(resolve('ipekci-theme', rel), 'utf8');

  await page.goto(
    `${BASE}/wp-admin/theme-editor.php?file=${encodeURIComponent(rel)}&theme=${THEME}`,
    { waitUntil: 'domcontentloaded' }
  );

  const result = await page.evaluate(async (content) => {
    const form = document.querySelector('#template');
    const ta = document.querySelector('#newcontent');
    if (!form || !ta) return { error: 'editor not available (file editor disabled?)' };

    const before = ta.value;
    if (before === content) return { unchanged: true };

    // Write the local file verbatim — no patching, so the live file is an exact
    // copy of what is in the repo and the zip.
    ta.value = content;

    const res = await fetch('/wp-admin/theme-editor.php', {
      method: 'POST',
      body: new FormData(form),
      credentials: 'include',
      redirect: 'follow',
    });
    const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
    const saved = doc.querySelector('#newcontent');

    return {
      status: res.status,
      notices: [...doc.querySelectorAll('#message, .notice, .error')]
        .map((n) => n.textContent.trim().replace(/\s+/g, ' ').slice(0, 120))
        .filter(Boolean)
        .slice(0, 2),
      // The definitive check: does the file WordPress now serves back match ours?
      verified: saved ? saved.value === content : null,
    };
  }, local);

  if (result.unchanged) {
    console.log(`  = ${rel} (already identical)`);
  } else if (result.verified) {
    console.log(`  ✔ ${rel} (${local.length} bytes) — ${result.notices?.[0] ?? 'saved'}`);
  } else {
    failed++;
    console.log(`  ✘ ${rel} — ${JSON.stringify(result)}`);
  }
}

// --- purge ----------------------------------------------------------------
// Purge All alone is NOT enough on this host: a server-level cache above the
// LSCache plugin keeps its own copy of "/", so the homepage would keep serving
// pre-deploy HTML to anonymous visitors while looking fine to logged-in admins.
// Purge-by-URL is what actually evicts it.
await page.goto(`${BASE}/wp-admin/admin.php?page=litespeed-toolbox`, { waitUntil: 'domcontentloaded' });

const purge = await page.evaluate(async (routes) => {
  const out = {};

  const all = [...document.querySelectorAll('a')].find((a) => /litespeed_type=purge_all(&|$)/.test(a.href));
  if (all) {
    const r = await fetch(all.href, { credentials: 'include' });
    const d = new DOMParser().parseFromString(await r.text(), 'text/html');
    out.purgeAll = [...d.querySelectorAll('.notice')]
      .map((n) => n.textContent.trim().replace(/\s+/g, ' '))
      .find((t) => /Purged/i.test(t)) ?? 'no confirmation';
  }

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
      .map((n) => n.textContent.trim().replace(/\s+/g, ' '))
      .some((t) => /Notified LiteSpeed Web Server/i.test(t));
  }

  return out;
}, ROUTES);

console.log('purge:', JSON.stringify(purge));

await ctx.close();
process.exit(failed ? 1 : 0);
