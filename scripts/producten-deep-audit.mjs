/**
 * Deep audit /producten/ — visible copy, image URLs, alts, meta.
 */
import { chromium } from 'playwright';

const WP = process.env.WP_BASE ?? 'https://ipekcislachterij.localclicks.nl';
const ROUTES = ['/', '/producten/', '/producten/doner/', '/producten/shoarma/'];

const LEGACY_VISIBLE = /ipekci|ipekçi|harderwijk|eigen slachterij|complete lammeren|lammeren en delen|dagelijks vers halalvlees|slachterij/i;
const LEGACY_IMG_PATH = /ipekci-voor|Voor-wie-|Voor-restaurants|\/ipekci-logo|old-ipek|harderwijk|slachterij/i;

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

for (const route of ROUTES) {
  await page.goto(WP + route, { waitUntil: 'networkidle', timeout: 120000 });
  await page.waitForTimeout(1500);

  const data = await page.evaluate(({ legacyVisible, legacyImgPath }) => {
    const body = document.body?.innerText || '';
    const visibleLegacy = body.match(new RegExp(legacyVisible, 'gi')) || [];
    const imgs = [...document.querySelectorAll('img')].map((i) => ({
      src: i.currentSrc || i.src,
      alt: i.alt,
      broken: i.complete && i.naturalWidth === 0,
    }));
    const legacySrcs = imgs.filter((i) => new RegExp(legacyImgPath, 'i').test(i.src));
    const legacyAlts = imgs.filter((i) => /ipekci|ipekçi|harderwijk|slachterij/i.test(i.alt));
    const broken = imgs.filter((i) => i.broken);
    const og = document.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';
    const title = document.title;
    const h1 = document.querySelector('h1')?.textContent?.trim() || '';
    const uniqueSrcDirs = [...new Set(imgs.map((i) => {
      try { return new URL(i.src).pathname.split('/').slice(-3, -1).join('/'); } catch { return i.src; }
    }))];
    return {
      title, h1, visibleLegacy: [...new Set(visibleLegacy)],
      legacySrcs: legacySrcs.map((i) => i.src),
      legacyAlts,
      broken: broken.map((i) => i.src),
      ogImage: og,
      imgCount: imgs.length,
      uniqueSrcDirs,
      allImgFiles: imgs.map((i) => i.src.split('/').pop()).sort(),
    };
  }, { legacyVisible: LEGACY_VISIBLE.source, legacyImgPath: LEGACY_IMG_PATH.source });

  console.log('\n===', route, '===');
  console.log(JSON.stringify(data, null, 2));
}

await browser.close();
