import { chromium } from 'playwright';

const PROFILE =
  process.env.WP_PROFILE ?? 'C:\\Users\\HYPE AMD\\AppData\\Local\\ms-playwright-mcp\\mcp-chrome-0885b19';
const BASE = 'https://ipekcislachterij.localclicks.nl';

const ctx = await chromium.launchPersistentContext(PROFILE, { headless: true });
ctx.setDefaultTimeout(180000);
ctx.setDefaultNavigationTimeout(180000);
const page = ctx.pages()[0] ?? (await ctx.newPage());

await page.goto(`${BASE}/wp-admin/site-health.php?tab=debug`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(8000);

const info = await page.evaluate(() => {
  const rows = {};
  document.querySelectorAll('tr').forEach((tr) => {
    const th = tr.querySelector('th, td:first-child');
    const td = tr.querySelector('td:last-child');
    if (th && td) rows[th.textContent.trim()] = td.textContent.trim();
  });
  const want = [
    'upload_max_filesize', 'post_max_size', 'max_execution_time',
    'memory_limit', 'max_input_time', 'PHP version',
  ];
  const out = {};
  for (const w of want) {
    const k = Object.keys(rows).find((k) => k.toLowerCase() === w.toLowerCase());
    if (k) out[w] = rows[k];
  }
  return out;
});
console.log('PHP limits:', JSON.stringify(info, null, 2));

await page.goto(`${BASE}/wp-admin/theme-install.php?browse=upload`, { waitUntil: 'domcontentloaded' });
const note = await page.evaluate(() => {
  const m = document.body.innerText.match(/Maximum upload file size[^\n]*/i);
  return m ? m[0] : '(not shown on page)';
});
console.log('theme upload page:', note);

await ctx.close();
