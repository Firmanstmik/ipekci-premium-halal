import { chromium } from 'playwright';

const BASE = 'https://ipekcislachterij.localclicks.nl';
const PROFILE = process.env.WP_PROFILE ?? 'C:\\Users\\HYPE AMD\\AppData\\Local\\ms-playwright-mcp\\mcp-chrome-0885b19';

async function run() {
  const ctx = await chromium.launchPersistentContext(PROFILE, { headless: false });
  const page = ctx.pages()[0] ?? (await ctx.newPage());

  await page.goto(`${BASE}/wp-admin/admin.php?page=litespeed-toolbox`, { waitUntil: 'domcontentloaded' });
  const purge = await page.evaluate(async () => {
    const out = {};
    const all = [...document.querySelectorAll('a')].find((a) => /litespeed_type=purge_all(&|$)/.test(a.href));
    if (all) {
      const r = await fetch(all.href, { credentials: 'include' });
      const d = new DOMParser().parseFromString(await r.text(), 'text/html');
      out.purgeAll = [...d.querySelectorAll('.notice')].map((n) => n.textContent.trim()).find((t) => /Purged/i.test(t)) ?? 'none';
    }
    return out;
  });
  console.log('purge:', JSON.stringify(purge));
  await ctx.close();
}

run().catch(console.error);