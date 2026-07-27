import { chromium } from 'playwright';

const BASE = 'https://ipekcislachterij.localclicks.nl';
const browser = await chromium.launch();
const ctx = await browser.newContext();
ctx.setDefaultTimeout(60000);
const page = await ctx.newPage();

await page.goto(`${BASE}/wp-login.php`, { waitUntil: 'domcontentloaded' });
await page.fill('#user_login', 'admin');
await page.fill('#user_pass', 'admin');
await page.click('#wp-submit', { noWaitAfter: true });
await page.waitForTimeout(12000);

const info = await page.evaluate(() => ({
  url: location.href,
  error: document.querySelector('#login_error')?.textContent?.trim().replace(/\s+/g, ' ').slice(0, 200) ?? null,
  message: document.querySelector('.message')?.textContent?.trim().slice(0, 160) ?? null,
  hasAdminBar: !!document.querySelector('#wpadminbar'),
}));

console.log(JSON.stringify(info, null, 2));
console.log('cookies:', (await ctx.cookies()).map((c) => c.name).filter((n) => /wordpress|wp-/.test(n)));
await browser.close();
