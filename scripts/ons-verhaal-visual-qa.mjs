/**
 * Over Ons (/ons-verhaal/) visual QA at multiple viewports.
 */
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const URL = process.env.REACT_BASE ?? 'http://localhost:3000/ons-verhaal';
const VIEWPORTS = [
  { name: '1440', width: 1440, height: 900 },
  { name: '1280', width: 1280, height: 900 },
  { name: '390', width: 390, height: 844 },
  { name: '430', width: 430, height: 932 },
];

const OUT = '.tmp-audit/ons-verhaal-qa';
mkdirSync(OUT, { recursive: true });

async function auditPage(browser, vp) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await ctx.newPage();
  const consoleErrors = [];
  const failed = [];
  page.on('console', (m) => {
    if (m.type() === 'error') consoleErrors.push(m.text());
  });
  page.on('response', (r) => {
    if (r.status() >= 400) failed.push({ url: r.url(), status: r.status() });
  });

  await page.goto(URL, { waitUntil: 'networkidle', timeout: 120000 });
  await page.waitForTimeout(2000);

  const shot = join(OUT, `react-${vp.name}.png`);
  await page.screenshot({ path: shot, fullPage: true });

  const data = await page.evaluate(() => {
    const body = document.body?.innerText || '';
    const overflow = document.documentElement.scrollWidth > document.documentElement.clientWidth;
    const stats = [...document.querySelectorAll('.tabular-nums')].map((el) => el.textContent?.trim());
    const brand = {
      ipekciText: /Ipekci|Ipekçi/i.test(body),
      slachthuis: /\bslachthuis\b/i.test(body),
      harderwijk: /Harderwijk/i.test(body),
      counterZero: /\b0\s*\+\s*jaar/i.test(body) && !/\b10\s*\+/i.test(body),
      ayat: /Ayat Food/i.test(body),
    };
    const imgs = [...document.querySelectorAll('img')];
    const brokenImgs = imgs.filter((i) => i.complete && i.naturalWidth === 0).length;
    const h1 = document.querySelector('h1')?.textContent?.trim();
    return { overflow, stats, brand, brokenImgs, h1, bodyLen: body.length };
  });

  await ctx.close();
  return { viewport: vp.name, screenshot: shot, consoleErrors: consoleErrors.slice(0, 10), failed: failed.slice(0, 10), ...data };
}

const browser = await chromium.launch({ headless: true });
const results = [];
for (const vp of VIEWPORTS) {
  console.log('audit', vp.name);
  results.push(await auditPage(browser, vp));
}
writeFileSync(join(OUT, 'report.json'), JSON.stringify({ generatedAt: new Date().toISOString(), results }, null, 2));
for (const r of results) {
  console.log(r.viewport, 'overflow=', r.overflow, 'stats=', r.stats?.slice(0, 4), 'brand=', JSON.stringify(r.brand), 'broken=', r.brokenImgs);
}
await browser.close();
