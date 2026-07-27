/**
 * Delete only the duplicate test uploads the CRUD runs created — attachments whose
 * slug is "hamburger-<n>" (WordPress's auto-dedupe suffix). The real product photo
 * keeps the bare "hamburger" slug and is never touched. Precise by design: no
 * "delete everything unattached" bulk action.
 */
import { chromium } from 'playwright';

const BASE = 'https://ipekcislachterij.localclicks.nl';
const PROFILE =
  process.env.WP_PROFILE ??
  'C:\\Users\\HYPE AMD\\AppData\\Local\\ms-playwright-mcp\\mcp-chrome-0885b19';

const ctx = await chromium.launchPersistentContext(PROFILE, { headless: true });
ctx.setDefaultTimeout(120000);
ctx.setDefaultNavigationTimeout(120000);
const page = ctx.pages()[0] ?? (await ctx.newPage());

await page.goto(`${BASE}/wp-admin/upload.php?mode=list&s=Hamburger`, {
  waitUntil: 'domcontentloaded',
});

const removed = await page.evaluate(async () => {
  const out = [];
  for (const tr of document.querySelectorAll('#the-list tr[id^="post-"]')) {
    const title = tr.querySelector('.row-title')?.textContent?.trim() ?? '';
    // The edit link's post= id, and the "Trash" row action.
    const del = tr.querySelector('.submitdelete');
    // Only the auto-dedupe duplicates: "Hamburger-1", "Hamburger-2", ...
    if (del && /^Hamburger-\d+$/.test(title)) {
      await fetch(del.href, { credentials: 'include' });
      out.push(title);
    }
  }
  return out;
});

console.log(`removed ${removed.length} duplicate upload(s): ${removed.join(', ') || '(none)'}`);
await ctx.close();
