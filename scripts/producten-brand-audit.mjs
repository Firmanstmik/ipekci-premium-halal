/**
 * Audit /producten/ for legacy Ipekci brand, copy, and image URLs.
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

const LEGACY_COPY = /ipekci|ipekçi|harderwijk|eigen slachterij|complete lammeren|lammeren en delen|dagelijks vers halalvlees|slachterij/i;
const LEGACY_IMG = /ipekci-voor|\/Voor-wie-|\/Voor-restaurants|ipekci-logo|old-ipek/i;

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const failed = [];
const broken = [];

page.on('response', (r) => {
  if (r.status() >= 400 && r.url().includes('ipekcislachterij')) {
    failed.push({ url: r.url(), status: r.status() });
  }
});

const results = [];

for (const route of ROUTES) {
  console.log('checking', route);
  await page.goto(WP + route, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForTimeout(1500);

  const data = await page.evaluate(({ legacyCopy, legacyImg }) => {
    const body = document.body?.innerText || '';
    const html = document.documentElement.outerHTML;
    const imgs = [...document.querySelectorAll('img')].map((i) => ({
      src: i.currentSrc || i.src || '',
      alt: i.alt || '',
      broken: i.complete && i.naturalWidth === 0,
    }));
    const issues = [];

    const copyMatches = body.match(new RegExp(legacyCopy, 'gi')) || [];
    if (copyMatches.length) {
      issues.push({ type: 'legacy-copy', matches: [...new Set(copyMatches)] });
    }

    const brandInHtml = html.match(/Ipekci|Ipekçi/gi) || [];
    if (brandInHtml.length) {
      issues.push({ type: 'brand-in-html', count: brandInHtml.length, samples: brandInHtml.slice(0, 5) });
    }

    const legacyImgs = imgs.filter((i) => new RegExp(legacyImg, 'i').test(i.src));
    if (legacyImgs.length) {
      issues.push({ type: 'legacy-image-url', imgs: legacyImgs.map((i) => i.src) });
    }

    const brokenImgs = imgs.filter((i) => i.broken);
    if (brokenImgs.length) {
      issues.push({ type: 'broken-image', imgs: brokenImgs.map((i) => i.src) });
    }

    const suspiciousAlts = imgs.filter((i) => /ipekci|ipekçi|harderwijk|slachterij/i.test(i.alt));
    if (suspiciousAlts.length) {
      issues.push({ type: 'legacy-alt', alts: suspiciousAlts });
    }

    return {
      title: document.title,
      hasAyat: /Ayat Food/i.test(body),
      imgCount: imgs.length,
      issues,
      sampleImgs: imgs.slice(0, 8).map((i) => i.src.split('/').slice(-2).join('/')),
    };
  }, { legacyCopy: LEGACY_COPY.source, legacyImg: LEGACY_IMG.source });

  results.push({ route, ...data });
}

await ctx.close();
await browser.close();

console.log('\n=== PRODUCTEN BRAND AUDIT ===\n');
let totalIssues = 0;
for (const r of results) {
  const status = r.issues.length ? 'FAIL' : 'PASS';
  console.log(`${status} ${r.route} — ${r.title} (${r.imgCount} imgs, Ayat=${r.hasAyat})`);
  if (r.issues.length) {
    totalIssues += r.issues.length;
    for (const iss of r.issues) console.log('  ', JSON.stringify(iss));
  } else {
    console.log('   imgs:', r.sampleImgs.join(', '));
  }
}
if (failed.length) {
  console.log('\nHTTP failures:', failed.slice(0, 20));
}
console.log(`\nTotal issue groups: ${totalIssues}`);
