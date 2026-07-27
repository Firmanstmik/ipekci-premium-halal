/**
 * Regression + responsive sweep for the Voor Wie CMS cutover, run anonymously.
 *
 * The section now renders from the CPT instead of a PHP array. The contract: same
 * routes, same content, images from the Media Library, one <h1> each, no PHP
 * notices, no console errors, no broken images — and the approved responsive
 * layout (2-col overview grid → 1-col on mobile) unchanged.
 *
 * Usage: node scripts/verify-voorwie-routes.mjs
 */
import { chromium } from 'playwright';

const BASE = 'https://ipekcislachterij.localclicks.nl';
const SEGMENTS = ['slagerijen', 'groothandels', 'supermarkten', 'restaurants'];

const browser = await chromium.launch({ headless: true });
let bad = false;

// --- content + integrity across every affected route ---------------------
const ctx = await browser.newContext();
const page = await ctx.newPage();
page.setDefaultNavigationTimeout(120000);

async function auditRoute(route, checks) {
  const errors = [];
  const onErr = (m) => m.type() === 'error' && errors.push(m.text());
  page.on('console', onErr);
  const res = await page.goto(BASE + route, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);
  const r = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll('main img')];
    return {
      h1: document.querySelectorAll('h1').length,
      php: /Warning:|Notice:|Deprecated:|Fatal error/.test(document.body.innerText),
      brokenImgs: imgs.filter((i) => i.complete && i.naturalWidth === 0 && i.getAttribute('src')).length,
      vwCards: document.querySelectorAll('.ipekci-vw-card').length,
      detail: !!document.querySelector('.ipekci-vw-detail'),
      detailImgUploads: (() => {
        const i = document.querySelector('.ipekci-vw-detail__img');
        return i ? i.src.includes('/wp-content/uploads/') : null;
      })(),
      cardImgUploads: [...document.querySelectorAll('.ipekci-vw-card__img')].every((i) =>
        i.src.includes('/wp-content/uploads/')
      ),
    };
  });
  page.removeListener('console', onErr);

  const ok =
    res.status() === 200 && r.h1 === 1 && !r.php && r.brokenImgs === 0 && errors.length === 0 && checks(r);
  if (!ok) bad = true;
  console.log(
    `${ok ? '✔' : '✘'} ${route} — ${res.status()}, h1 ${r.h1}, php ${r.php}, broken ${r.brokenImgs}, ` +
      `console ${errors.length}` +
      (r.vwCards ? `, cards ${r.vwCards}, cardImgUploads ${r.cardImgUploads}` : '') +
      (r.detail ? `, detail uploads ${r.detailImgUploads}` : '')
  );
  if (errors.length) console.log('   console:', errors.slice(0, 2));
}

await auditRoute('/', (r) => true); // homepage (its own voor-wie section untouched)
await auditRoute('/voor-wie/', (r) => r.vwCards === 4 && r.cardImgUploads);
for (const s of SEGMENTS) {
  await auditRoute(`/voor-wie/${s}/`, (r) => r.detail && r.detailImgUploads === true);
}
await ctx.close();

// --- responsive: overview grid columns at 3 breakpoints ------------------
const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900, expectCols: 2 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844, expectCols: 1 },
];

console.log('');
for (const vp of VIEWPORTS) {
  const c = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const p = await c.newPage();
  p.setDefaultNavigationTimeout(120000);
  await p.goto(`${BASE}/voor-wie/`, { waitUntil: 'domcontentloaded' });
  await p.evaluate(async () => {
    for (let y = 0; y <= document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 100));
    }
    window.scrollTo(0, 0);
  });
  await p.waitForTimeout(1200);
  const r = await p.evaluate(() => {
    const cards = [...document.querySelectorAll('.ipekci-vw-card')];
    const firstTop = cards.length ? Math.round(cards[0].getBoundingClientRect().top) : 0;
    const cols = cards.filter((c) => Math.abs(Math.round(c.getBoundingClientRect().top) - firstTop) < 8).length;
    const imgs = cards.map((c) => c.querySelector('.ipekci-vw-card__img')).filter(Boolean);
    return {
      cards: cards.length,
      cols,
      broken: imgs.filter((i) => i.complete && i.naturalWidth === 0).length,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });
  const okCols = vp.expectCols ? r.cols === vp.expectCols : true;
  const ok = r.cards === 4 && r.broken === 0 && r.overflow <= 1 && okCols;
  if (!ok) bad = true;
  console.log(
    `${ok ? '✔' : '✘'} ${vp.name} (${vp.width}px) — cards ${r.cards}, columns ${r.cols}` +
      `${vp.expectCols ? ` (expect ${vp.expectCols})` : ''}, broken ${r.broken}, h-overflow ${r.overflow}px`
  );
  await c.close();
}

await browser.close();
console.log(bad ? '\nFAILED' : '\nVoor Wie routes + responsive verified');
process.exit(bad ? 1 : 0);
