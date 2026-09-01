/**
 * Scrape all image URLs from ayatfood.nl producten pages.
 */
import fs from 'node:fs';
import path from 'node:path';

const BASE = 'https://ayatfood.nl';
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

const IMG_RE = /https?:\/\/ayatfood\.nl\/wp-content\/uploads\/[^"'\\)\s>]+\.(?:jpg|jpeg|png|webp|gif)/gi;
const CSS_URL_RE = /url\((['"]?)(https?:\/\/ayatfood\.nl\/wp-content\/uploads\/[^)'"]+)\1\)/gi;

function extractImages(html) {
  const found = new Set();
  for (const m of html.matchAll(IMG_RE)) found.add(m[0].split('?')[0]);
  for (const m of html.matchAll(CSS_URL_RE)) found.add(m[2].split('?')[0]);
  // elementor inline background in data-settings JSON
  for (const m of html.matchAll(/"url":"(https?:\\\/\\\/ayatfood\.nl\\\/wp-content\\\/uploads\\\/[^"]+)"/g)) {
    found.add(m[1].replace(/\\\//g, '/').split('?')[0]);
  }
  return [...found].filter((u) => !u.includes('/elementor/') && !u.includes('Logo'));
}

async function fetchCssUrls(html) {
  const cssLinks = [...html.matchAll(/href=['"](https:\/\/ayatfood\.nl\/wp-content\/uploads\/elementor\/css\/[^'"]+)['"]/g)].map((m) => m[1]);
  const bg = new Set();
  for (const url of cssLinks) {
    try {
      const res = await fetch(url);
      const css = await res.text();
      for (const m of css.matchAll(/url\((['"]?)(https?:\/\/ayatfood\.nl\/wp-content\/uploads\/[^)'"]+)\1\)/gi)) {
        bg.add(m[2].split('?')[0]);
      }
      for (const m of css.matchAll(/url\((['"]?)(\/?wp-content\/uploads\/[^)'"]+)\1\)/gi)) {
        bg.add((BASE + m[2]).split('?')[0]);
      }
    } catch (e) {
      console.warn('CSS fetch failed:', url, e.message);
    }
  }
  return [...bg];
}

const report = {};

for (const route of ROUTES) {
  const file = path.join(process.cwd(), `.tmp-${route.replace(/\//g, '-').replace(/^-|-$/g, '')}.html`);
  if (!fs.existsSync(file)) {
    console.warn('Missing', file);
    continue;
  }
  const html = fs.readFileSync(file, 'utf8');
  const inline = extractImages(html);
  const cssImgs = await fetchCssUrls(html);
  const all = [...new Set([...inline, ...cssImgs])].sort();
  report[route] = all;
  console.log(`\n${route} (${all.length} images)`);
  for (const u of all) console.log(' ', u.replace(BASE, ''));
}

fs.writeFileSync('.tmp-ayat-producten-images.json', JSON.stringify(report, null, 2));
console.log('\nSaved .tmp-ayat-producten-images.json');
