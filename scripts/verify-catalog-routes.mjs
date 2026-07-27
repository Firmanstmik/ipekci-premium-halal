/**
 * Regression check for the Products CMS cutover.
 *
 * The catalogue now renders from the CPT instead of a PHP array. The contract is
 * that nothing about the approved layout moved: same routes, same card counts per
 * category, same curated strips, no PHP notices, no broken images.
 *
 * Runs anonymously (no admin cookie) so it sees what a visitor sees, cache included.
 *
 * Usage: node scripts/verify-catalog-routes.mjs
 */
import { chromium } from 'playwright';

const BASE = 'https://ipekcislachterij.localclicks.nl';

const EXPECTED = {
  '/assortiment/': 44,
  '/assortiment/lamsvlees/': 11,
  '/assortiment/rundvlees/': 20,
  '/assortiment/kip/': 5,
  '/assortiment/eindproducten/': 8,
};

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext();
ctx.setDefaultTimeout(120000);
ctx.setDefaultNavigationTimeout(120000);
const page = await ctx.newPage();

let bad = false;

for (const [route, expected] of Object.entries(EXPECTED)) {
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));

  const res = await page.goto(BASE + route, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);

  const r = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('.ipekci-as-card__img')];
    return {
      cards: cards.length,
      broken: cards.filter((i) => i.complete && i.naturalWidth === 0).length,
      noAlt: cards.filter((i) => !i.alt).length,
      uploads: cards.filter((i) => i.src.includes('/wp-content/uploads/')).length,
      h1: document.querySelectorAll('h1').length,
      // A PHP notice would print raw text into the markup.
      php: /Warning:|Notice:|Deprecated:|Fatal error/.test(document.body.innerText),
      count: document.querySelector('.ipekci-as-hero__count')?.textContent?.trim() ?? '',
    };
  });

  const ok =
    res.status() === 200 &&
    r.cards === expected &&
    r.broken === 0 &&
    r.noAlt === 0 &&
    r.uploads === expected &&
    r.h1 === 1 &&
    !r.php &&
    errors.length === 0;

  if (!ok) bad = true;

  console.log(
    `${ok ? '✔' : '✘'} ${route} — ${res.status()}, cards ${r.cards}/${expected}, ` +
      `uploads ${r.uploads}, broken ${r.broken}, noAlt ${r.noAlt}, h1 ${r.h1}, ` +
      `php-notice ${r.php}, console ${errors.length}`
  );
  if (errors.length) console.log('   console:', errors.slice(0, 3));

  page.removeAllListeners('console');
}

// --- curated strips that read the same catalogue --------------------------
await page.goto(`${BASE}/ons-verhaal/`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1000);
const ov = await page.evaluate(() => {
  const imgs = [...document.querySelectorAll('.ipekci-ov-mini__img')];
  return {
    n: imgs.length,
    uploads: imgs.filter((i) => i.src.includes('/wp-content/uploads/')).length,
    broken: imgs.filter((i) => i.complete && i.naturalWidth === 0).length,
  };
});
const ovOk = ov.n > 0 && ov.broken === 0;
if (!ovOk) bad = true;
console.log(
  `${ovOk ? '✔' : '✘'} /ons-verhaal/ curated strip — ${ov.n} products, uploads ${ov.uploads}, broken ${ov.broken}`
);

await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1500);
const home = await page.evaluate(() => {
  const imgs = [...document.querySelectorAll('.ipekci-eind__card img, .ipekci-eind-card__img')];
  return {
    n: imgs.length,
    broken: imgs.filter((i) => i.complete && i.naturalWidth === 0).length,
  };
});
console.log(
  `${home.broken === 0 ? '✔' : '✘'} / homepage eindproducten — ${home.n} images, broken ${home.broken}`
);
if (home.broken) bad = true;

await browser.close();
console.log(bad ? '\nFAILED' : '\nall catalogue routes verified');
process.exit(bad ? 1 : 0);
