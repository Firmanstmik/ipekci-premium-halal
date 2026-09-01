/**
 * Producten legacy check — visible text + suspicious image paths only.
 */
import { chromium } from 'playwright';

const WP = process.env.WP_BASE ?? 'https://ipekcislachterij.localclicks.nl';
const ROUTES = [
  '/producten/',
  '/producten/doner/',
  '/producten/shoarma/',
  '/producten/gevogelte/',
  '/producten/vleessoorten/',
  '/producten/diepvriesproducten/',
  '/producten/turkse-pizza/',
  '/producten/gegrilde-producten/',
  '/producten/tortilla-durum/',
];

const LEGACY_VISIBLE = /\bipekci\b|\bipekçi\b|harderwijk|eigen slachterij|complete lammeren|lammeren en delen|dagelijks vers halalvlees|\bslachterij\b/i;
const LEGACY_IMG = /ipekci-voor|Voor-wie-|Voor-restaurants|ipekci-logo|old-ipek|harderwijk|slachterij|lammeren/i;

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
const summary = [];

for (const route of ROUTES) {
  await page.goto(WP + route, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForTimeout(1200);
  const d = await page.evaluate(({ lv, li }) => {
    const body = document.body?.innerText || '';
    const vis = [...new Set(body.match(new RegExp(lv, 'gi')) || [])];
    const imgs = [...document.querySelectorAll('img')].map((i) => i.currentSrc || i.src);
    const badImgs = imgs.filter((s) => {
      if (!s) return false;
      if (/ipekci-theme/i.test(s) && !new RegExp(li, 'i').test(s)) return false;
      return new RegExp(li, 'i').test(s);
    });
    const uploads = imgs.filter((s) => /wp-content\/uploads/i.test(s));
    const broken = [...document.querySelectorAll('img')].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src);
    const ayatDirs = [...new Set(imgs.map((s) => {
      const m = s.match(/assets\/images\/([^/]+)/);
      return m ? m[1] : 'other';
    }))];
    return {
      title: document.title,
      h1: document.querySelector('h1')?.textContent?.trim(),
      vis, badImgs, uploads: uploads.length, broken, ayatDirs,
      hasAyat: /Ayat Food/i.test(body),
    };
  }, { lv: LEGACY_VISIBLE.source, li: LEGACY_IMG.source });
  const ok = !d.vis.length && !d.badImgs.length && !d.broken.length;
  summary.push({ route, ok, ...d });
}

await browser.close();

console.log('PRODUCTEN LEGACY CHECK\n');
for (const s of summary) {
  console.log(`${s.ok ? 'PASS' : 'FAIL'} ${s.route}`);
  console.log(`  title: ${s.title}`);
  console.log(`  h1: ${s.h1}`);
  console.log(`  Ayat Food in body: ${s.hasAyat}`);
  console.log(`  image dirs: ${s.ayatDirs.join(', ')}`);
  console.log(`  wp uploads imgs: ${s.uploads}`);
  if (s.vis.length) console.log(`  VISIBLE LEGACY: ${s.vis.join(', ')}`);
  if (s.badImgs.length) console.log(`  LEGACY IMG URLS:`, s.badImgs);
  if (s.broken.length) console.log(`  BROKEN:`, s.broken);
  console.log('');
}
