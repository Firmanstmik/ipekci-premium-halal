import { chromium } from 'playwright';

const BASE = process.env.WP_BASE ?? 'http://localhost:3000';
const ROUTES = [
  '/producten/',
  '/producten/doner/',
  '/producten/shoarma/',
  '/producten/tortilla-durum/',
];

const LEGACY = /ipek|harder|slachterij|lammeren|voor-wie|Contact-Ipek|hero-slachterij|logo-ipek|werken-bij/i;

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

for (const route of ROUTES) {
  await page.goto(BASE + route, { waitUntil: 'networkidle', timeout: 60000 });
  const data = await page.evaluate((legacySrc) => {
    const re = new RegExp(legacySrc, 'i');
    const imgs = [...document.querySelectorAll('img')].map((i) => ({
      src: i.currentSrc || i.src,
      alt: i.alt || '',
    }));
    return {
      route: location.pathname,
      title: document.title,
      imgs,
      legacyAlt: imgs.filter((i) => re.test(i.alt)),
      legacySrc: imgs.filter((i) => re.test(i.src)),
      bodyLegacy: [
        ...new Set(
          (document.body.innerText.match(
            /\bipekci\b|\bharderwijk\b|eigen slachterij|complete lammeren|\bslachterij\b/gi
          ) || [])
        ),
      ],
    };
  }, LEGACY.source);

  console.log(`\n=== ${route} ===`);
  console.log('title:', data.title);
  console.log('body legacy:', data.bodyLegacy.length ? data.bodyLegacy : 'none');
  console.log('legacy img src:', data.legacySrc.length ? data.legacySrc : 'none');
  console.log('legacy alt:', data.legacyAlt.length ? data.legacyAlt : 'none');
  console.log('all images:');
  for (const img of data.imgs) {
    const short = img.src.replace(/^.*\/assets\//, 'assets/');
    console.log(`  - ${short}${img.alt ? ` (alt: ${img.alt.slice(0, 60)})` : ''}`);
  }
}

await browser.close();
