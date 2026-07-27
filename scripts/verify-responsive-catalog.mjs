/**
 * Confirm the catalogue grid is intact at desktop / tablet / mobile after the CMS
 * cutover: right card count, images loaded from the Media Library, no horizontal
 * overflow, and the approved responsive column counts unchanged.
 *
 * Anonymous (visitor's-eye view).
 */
import { chromium } from 'playwright';

const BASE = 'https://ipekcislachterij.localclicks.nl';
const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
];

const browser = await chromium.launch({ headless: true });
let bad = false;

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await ctx.newPage();
  page.setDefaultNavigationTimeout(120000);

  await page.goto(`${BASE}/assortiment/`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  // Scroll the whole grid through the viewport so lazy images decode.
  await page.evaluate(async () => {
    for (let y = 0; y <= document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1500);

  const r = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('.ipekci-as-card')];
    const imgs = cards.map((c) => c.querySelector('.ipekci-as-card__img')).filter(Boolean);
    const firstTop = Math.round(cards[0].getBoundingClientRect().top);
    const cols = cards.filter((c) => Math.abs(Math.round(c.getBoundingClientRect().top) - firstTop) < 8).length;
    return {
      cards: cards.length,
      // A broken image is one that finished loading with no pixels.
      broken: imgs.filter((i) => i.complete && i.naturalWidth === 0).length,
      uploads: imgs.filter((i) => i.src.includes('/wp-content/uploads/')).length,
      cols,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });

  const ok = r.cards === 44 && r.broken === 0 && r.uploads === 44 && r.overflow <= 1;
  if (!ok) bad = true;

  console.log(
    `${ok ? '✔' : '✘'} ${vp.name} (${vp.width}px) — cards ${r.cards}/44, broken ${r.broken}, ` +
      `uploads ${r.uploads}, columns ${r.cols}, h-overflow ${r.overflow}px`
  );

  await ctx.close();
}

await browser.close();
console.log(bad ? '\nFAILED' : '\nresponsive catalogue verified at all breakpoints');
process.exit(bad ? 1 : 0);
