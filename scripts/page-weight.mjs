/**
 * Real transfer weight per route, broken down by resource type.
 *
 * Uses the browser's own resource timing (encodedBodySize) rather than the raw
 * file sizes on disk, so brotli/gzip is accounted for — a 785 KB SVG that ships
 * as 40 KB on the wire is not a performance problem, and this is what tells the
 * two apart. Scrolls the page so lazy images actually load.
 */
import { chromium } from 'playwright';

const BASE = 'https://ipekcislachterij.localclicks.nl';
const ROUTES = ['/', '/ons-verhaal/', '/assortiment/', '/voor-wie/', '/contact/'];

const browser = await chromium.launch();

for (const route of ROUTES) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 120000 });

  // Scroll to the bottom so lazy-loaded imagery is actually fetched.
  await page.evaluate(async () => {
    await new Promise((res) => {
      let y = 0;
      const step = () => {
        y += 900;
        window.scrollTo(0, y);
        if (y < document.body.scrollHeight) setTimeout(step, 120);
        else res();
      };
      step();
    });
  });
  await page.waitForTimeout(3000);

  const stats = await page.evaluate(() => {
    const rs = performance.getEntriesByType('resource');
    const byType = {};
    let total = 0;
    const biggest = [];
    for (const r of rs) {
      const size = r.encodedBodySize || 0;
      total += size;
      let t = r.initiatorType;
      if (/\.(webp|png|jpe?g|avif|svg)/i.test(r.name)) t = 'image';
      else if (/\.(woff2?|ttf)/i.test(r.name)) t = 'font';
      else if (/\.css/i.test(r.name)) t = 'css';
      else if (/\.js/i.test(r.name)) t = 'js';
      else if (/\.(webm|mp4)/i.test(r.name)) t = 'video';
      byType[t] = (byType[t] || 0) + size;
      if (size > 60000) biggest.push({ n: r.name.split('/').pop().slice(0, 44), kb: Math.round(size / 1024) });
    }
    const doc = performance.getEntriesByType('navigation')[0];
    total += doc?.encodedBodySize || 0;
    byType.html = doc?.encodedBodySize || 0;
    return {
      totalKB: Math.round(total / 1024),
      byType: Object.fromEntries(Object.entries(byType).map(([k, v]) => [k, Math.round(v / 1024)])),
      requests: rs.length,
      biggest: biggest.sort((a, b) => b.kb - a.kb).slice(0, 8),
    };
  });

  console.log(`\n=== ${route}  —  ${stats.totalKB} KB over ${stats.requests} requests ===`);
  console.log(
    '   ' +
      Object.entries(stats.byType)
        .sort((a, b) => b[1] - a[1])
        .map(([k, v]) => `${k}:${v}KB`)
        .join('  ')
  );
  if (stats.biggest.length) {
    console.log('   heaviest resources:');
    stats.biggest.forEach((b) => console.log(`     ${String(b.kb).padStart(5)} KB  ${b.n}`));
  }

  await ctx.close();
}

await browser.close();
