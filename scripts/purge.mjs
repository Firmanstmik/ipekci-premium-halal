/**
 * Purge LiteSpeed and then PROVE the cache actually cleared.
 *
 * This host has bitten the project repeatedly: "Purge All" alone leaves a
 * server-level cache above the LSCache plugin still holding "/", so anonymous
 * visitors keep getting pre-deploy HTML while a logged-in admin (who bypasses
 * the cache) sees everything working. Purge-by-URL is what actually evicts it,
 * and both steps report success even when the page stays stale.
 *
 * So this does not trust the purge notices. It fetches each route twice —
 * once normally (cache-eligible) and once with a cache-busting query — and
 * compares them. A route whose cached copy differs from its freshly generated
 * copy is still stale, and the purge is retried.
 *
 * Volatile bits (nonces, inline CSS versions, comment counts) are stripped
 * before comparing so they cannot masquerade as staleness.
 *
 * Usage: node scripts/purge.mjs
 */
import { chromium } from 'playwright';

const BASE = 'https://ipekcislachterij.localclicks.nl';
const PROFILE =
  process.env.WP_PROFILE ??
  'C:\\Users\\HYPE AMD\\AppData\\Local\\ms-playwright-mcp\\mcp-chrome-0885b19';

const ROUTES = [
  '/', '/ons-verhaal/', '/contact/',
  '/assortiment/', '/assortiment/lamsvlees/', '/assortiment/rundvlees/',
  '/assortiment/kip/', '/assortiment/eindproducten/',
  '/voor-wie/', '/voor-wie/slagerijen/', '/voor-wie/groothandels/',
  '/voor-wie/supermarkten/', '/voor-wie/restaurants/',
];

const ctx = await chromium.launchPersistentContext(PROFILE, { headless: true });
ctx.setDefaultTimeout(180000);
ctx.setDefaultNavigationTimeout(180000);
const page = ctx.pages()[0] ?? (await ctx.newPage());

await page.goto(`${BASE}/wp-admin/`, { waitUntil: 'domcontentloaded' });
if (!(await page.$('#wpadminbar'))) {
  console.error('not authenticated — cannot purge');
  await ctx.close();
  process.exit(2);
}

async function purge() {
  await page.goto(`${BASE}/wp-admin/admin.php?page=litespeed-toolbox`, {
    waitUntil: 'domcontentloaded',
  });

  return page.evaluate(async ({ base, routes }) => {
    const out = {};

    const all = [...document.querySelectorAll('a')].find((a) =>
      /litespeed_type=purge_all(&|$)/.test(a.href)
    );
    if (all) {
      await fetch(all.href, { credentials: 'include' });
      out.purgeAll = true;
    }

    const form = [...document.querySelectorAll('form')].find((f) =>
      [...f.querySelectorAll('input')].some((i) => i.value === 'PURGE_BY')
    );
    if (form) {
      const radio = [...form.querySelectorAll('input[name="purgeby"]')].find((r) => r.value === '3');
      if (radio) radio.checked = true;
      const ta = form.querySelector('textarea[name="purgebylist"]');
      if (ta) ta.value = routes.map((p) => base + p).join('\n');
      await fetch(form.action, { method: 'POST', body: new FormData(form), credentials: 'include' });
      out.purgeByUrl = true;
    }

    return out;
  }, { base: BASE, routes: ROUTES });
}

// Strip everything that legitimately differs between two renders of one page.
const normalize = (html) =>
  html
    .replace(/nonce["':=\s]+[A-Za-z0-9]+/gi, '')
    .replace(/\?ver=\d+/g, '')
    .replace(/cachebust=\d+/g, '')
    .replace(/<!--.*?-->/gs, '')
    .replace(/\s+/g, ' ')
    .trim();

async function stale() {
  const out = [];
  for (const route of ROUTES) {
    const [cached, fresh] = await Promise.all([
      fetch(BASE + route).then((r) => r.text()),
      fetch(`${BASE}${route}?cachebust=${Date.now()}${Math.random()}`).then((r) => r.text()),
    ]);
    if (normalize(cached) !== normalize(fresh)) out.push(route);
  }
  return out;
}

let remaining = ROUTES;

for (let attempt = 1; attempt <= 3; attempt++) {
  const res = await purge();
  console.log(`purge attempt ${attempt}: ${JSON.stringify(res)}`);
  await page.waitForTimeout(4000);

  remaining = await stale();
  if (!remaining.length) {
    console.log(`\n✔ cache verified fresh on all ${ROUTES.length} routes`);
    await ctx.close();
    process.exit(0);
  }
  console.log(`  still stale (${remaining.length}): ${remaining.join(', ')}`);
}

console.error(`\n✘ still stale after 3 attempts: ${remaining.join(', ')}`);
await ctx.close();
process.exit(1);
