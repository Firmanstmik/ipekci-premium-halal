import { chromium } from 'playwright';

const BASE = 'https://ipekcislachterij.localclicks.nl';
const PROFILE = process.env.WP_PROFILE ?? 'C:\\Users\\HYPE AMD\\AppData\\Local\\ms-playwright-mcp\\mcp-chrome-0885b19';

async function run() {
  const ctx = await chromium.launchPersistentContext(PROFILE, { headless: false });
  const page = ctx.pages()[0] ?? (await ctx.newPage());

  await page.goto(`${BASE}/wp-admin/admin.php?page=litespeed-toolbox`, { waitUntil: 'domcontentloaded' });
  const purge = await page.evaluate(async () => {
    const out = {};
    const routes = [
      '/', '/ons-verhaal/', '/contact/', '/assortiment/', '/assortiment/lamsvlees/',
      '/assortiment/rundvlees/', '/assortiment/kip/', '/assortiment/eindproducten/',
      '/voor-wie/', '/voor-wie/slagerijen/', '/voor-wie/groothandels/',
      '/voor-wie/supermarkten/', '/voor-wie/restaurants/', '/vacatures/'
    ];
    
    // Purge ALL
    const all = [...document.querySelectorAll('a')].find((a) => /litespeed_type=purge_all(&|$)/.test(a.href));
    if (all) {
      const r = await fetch(all.href, { credentials: 'include' });
      const d = new DOMParser().parseFromString(await r.text(), 'text/html');
      out.purgeAll = [...d.querySelectorAll('.notice')].map((n) => n.textContent.trim()).find((t) => /Purged/i.test(t)) ?? 'none';
    }
    
    // Purge By URL
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
}

run().catch(console.error);