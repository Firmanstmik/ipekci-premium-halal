/**
 * React (source of truth) vs WordPress — what content is MISSING or EXTRA?
 *
 * Compares the two renderings of every route on the things that reveal an
 * unmigrated section: the heading outline, the set of visible text blocks, and
 * the interactive affordances (links/buttons). Pure styling differences are
 * deliberately ignored — this hunts for content that never made it across, not
 * for pixel drift.
 *
 * Text is normalised (whitespace, case, curly quotes) so that trivial
 * formatting differences do not masquerade as missing content.
 *
 * Usage: node scripts/compare-react-wp.mjs [--viewport=1440]
 */
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

const REACT = 'http://localhost:3000';
const WP = 'https://ipekcislachterij.localclicks.nl';

const ROUTES = [
  '/', '/ons-verhaal/', '/contact/',
  '/assortiment/', '/assortiment/lamsvlees/', '/assortiment/rundvlees/',
  '/assortiment/kip/', '/assortiment/eindproducten/',
  '/voor-wie/', '/voor-wie/slagerijen/', '/voor-wie/groothandels/',
  '/voor-wie/supermarkten/', '/voor-wie/restaurants/',
];

const width = Number((process.argv.find((a) => a.startsWith('--viewport=')) ?? '').split('=')[1] || 1440);

// The WP host is flaky under load; allow re-running just the routes that failed.
const only = (process.argv.find((a) => a.startsWith('--routes=')) ?? '').split('=')[1];
const routes = only ? only.split(',') : ROUTES;

const norm = (s) =>
  s
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/ /g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

const browser = await chromium.launch();

async function capture(base, route) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await ctx.newPage();
  // React SPA needs its route without the trailing slash quirk; both accept it.
  await page.goto(base + route, { waitUntil: 'networkidle', timeout: 120000 });
  await page.waitForTimeout(2000);

  // Scroll through so IntersectionObserver-gated sections actually render.
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1200);

  const data = await page.evaluate(() => {
    const vis = (el) => {
      const s = getComputedStyle(el);
      if (s.display === 'none' || s.visibility === 'hidden') return false;
      return el.getClientRects().length > 0;
    };
    const headings = [...document.querySelectorAll('h1,h2,h3')]
      .filter(vis)
      .map((h) => `${h.tagName} ${h.innerText}`);
    const text = [...document.querySelectorAll('p,li,span,div,a,button,label,h1,h2,h3,h4')]
      .filter(vis)
      .map((e) => e.childNodes)
      .flatMap((nodes) => [...nodes].filter((n) => n.nodeType === 3).map((n) => n.textContent))
      .map((t) => t.trim())
      .filter((t) => t.length > 2);
    const actions = [...document.querySelectorAll('a[href],button')]
      .filter(vis)
      .map((e) => e.innerText.trim())
      .filter(Boolean);
    return { headings, text, actions, height: document.body.scrollHeight };
  });

  await ctx.close();
  return data;
}

const report = [];

for (const route of routes) {
  let r, w;
  // Capture serially with retries: the host stalls when both loads race it.
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      r = await capture(REACT, route);
      w = await capture(WP, route);
      break;
    } catch (e) {
      if (attempt === 3) console.log(`\n### ${route}\n  ERROR after 3 tries: ${e.message.slice(0, 90)}`);
      else await new Promise((res) => setTimeout(res, 3000));
    }
  }
  if (!r || !w) continue;

  const rText = new Set(r.text.map(norm));
  const wText = new Set(w.text.map(norm));
  const missing = [...rText].filter((t) => !wText.has(t));
  const extra = [...wText].filter((t) => !rText.has(t));

  const rH = r.headings.map(norm);
  const wH = w.headings.map(norm);
  const missingH = rH.filter((h) => !wH.includes(h));
  const extraH = wH.filter((h) => !rH.includes(h));

  const rA = new Set(r.actions.map(norm));
  const wA = new Set(w.actions.map(norm));
  const missingA = [...rA].filter((a) => !wA.has(a));

  const delta = Math.round(((w.height - r.height) / r.height) * 100);

  report.push({ route, missing, extra, missingH, extraH, missingA, rHeight: r.height, wHeight: w.height });

  console.log(`\n### ${route}   height react ${r.height} vs wp ${w.height} (${delta > 0 ? '+' : ''}${delta}%)`);
  console.log(`  headings: react ${rH.length}, wp ${wH.length}`);
  if (missingH.length) console.log(`  MISSING HEADINGS (${missingH.length}):\n${missingH.map((h) => '    - ' + h).join('\n')}`);
  if (extraH.length) console.log(`  EXTRA HEADINGS (${extraH.length}):\n${extraH.map((h) => '    + ' + h).join('\n')}`);
  if (missingA.length) console.log(`  MISSING ACTIONS (${missingA.length}): ${missingA.slice(0, 12).join(' | ')}`);
  if (missing.length) {
    console.log(`  MISSING TEXT (${missing.length}):`);
    for (const t of missing.slice(0, 25)) console.log(`    - ${t.slice(0, 110)}`);
  }
  if (!missingH.length && !missing.length && !missingA.length) console.log('  ✔ no missing content');
}

writeFileSync('react-wp-diff.json', JSON.stringify(report, null, 2));
console.log('\nwrote react-wp-diff.json');

await browser.close();
