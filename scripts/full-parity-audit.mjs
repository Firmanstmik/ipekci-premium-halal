/**
 * Full-site visual parity audit: React (source of truth) vs live WordPress.
 * Captures viewport + full-page screenshots, pixel diffs, and layout metrics.
 *
 * Usage:
 *   node scripts/full-parity-audit.mjs
 *   node scripts/full-parity-audit.mjs --pages home,producten-doner
 *   node scripts/full-parity-audit.mjs --viewports 1920,768
 */
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const REACT = process.env.REACT_URL ?? 'http://localhost:3000';
const WP = process.env.WP_URL ?? 'https://ipekcislachterij.localclicks.nl';
const OUT = '.visual-qa/full-parity';

const VIEWPORTS = [
  { w: 1920, h: 1080, name: '1920' },
  { w: 1600, h: 900, name: '1600' },
  { w: 1440, h: 900, name: '1440' },
  { w: 1280, h: 800, name: '1280' },
  { w: 1024, h: 768, name: '1024' },
  { w: 768, h: 1024, name: '768' },
  { w: 390, h: 844, name: '390' },
];

const PRODUCT_SLUGS = [
  'doner', 'shoarma', 'gevogelte', 'vleessoorten',
  'diepvriesproducten', 'turkse-pizza', 'gegrilde-producten', 'tortilla-durum',
];

const VOOR_WIE_SLUGS = ['slagerijen', 'groothandels', 'supermarkten', 'restaurants'];

const ALL_PAGES = [
  { name: 'home', path: '/' },
  { name: 'over-ons', path: '/ons-verhaal/' },
  { name: 'producten', path: '/producten/' },
  ...PRODUCT_SLUGS.map((s) => ({ name: `producten-${s}`, path: `/producten/${s}/` })),
  { name: 'voor-wie', path: '/voor-wie/' },
  ...VOOR_WIE_SLUGS.map((s) => ({ name: `voor-wie-${s}`, path: `/voor-wie/${s}/` })),
  { name: 'vacatures', path: '/vacatures/' },
  { name: 'contact', path: '/contact/' },
  { name: '404', path: '/__parity-404-not-found__/' },
];

const args = process.argv.slice(2);
const pagesFilter = args.includes('--pages')
  ? args[args.indexOf('--pages') + 1]?.split(',').map((s) => s.trim())
  : null;
const vpFilter = args.includes('--viewports')
  ? args[args.indexOf('--viewports') + 1]?.split(',').map((s) => s.trim())
  : null;

const PAGES = pagesFilter
  ? ALL_PAGES.filter((p) => pagesFilter.includes(p.name))
  : ALL_PAGES;
const VPs = vpFilter
  ? VIEWPORTS.filter((v) => vpFilter.includes(v.name))
  : VIEWPORTS;

fs.mkdirSync(OUT, { recursive: true });

function comparePng(aPath, bPath, diffPath) {
  const img1 = PNG.sync.read(fs.readFileSync(aPath));
  const img2 = PNG.sync.read(fs.readFileSync(bPath));
  const width = Math.min(img1.width, img2.width);
  const height = Math.min(img1.height, img2.height);
  const diff = new PNG({ width, height });

  const crop = (img) => {
    const out = new PNG({ width, height });
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (width * y + x) << 2;
        const j = (img.width * y + x) << 2;
        out.data[i] = img.data[j];
        out.data[i + 1] = img.data[j + 1];
        out.data[i + 2] = img.data[j + 2];
        out.data[i + 3] = img.data[j + 3];
      }
    }
    return out;
  };

  const a = crop(img1);
  const b = crop(img2);
  const numDiff = pixelmatch(a.data, b.data, diff.data, width, height, { threshold: 0.12 });
  const pct = (numDiff / (width * height)) * 100;
  if (numDiff > 0) fs.writeFileSync(diffPath, PNG.sync.write(diff));
  return { numDiff, pct, width, height };
}

async function capturePage(browser, base, pagePath, vp, label, fullPage) {
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
  const page = await ctx.newPage();
  const url = `${base}${pagePath}${pagePath.includes('?') ? '&' : '?'}v=${Date.now()}`;
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 });
  await page.waitForTimeout(fullPage ? 3500 : 2500);
  await page.addStyleTag({
    content: '#wpadminbar{display:none!important} html{margin-top:0!important}',
  });
  const out = path.join(OUT, `${label}.png`);
  await page.screenshot({ path: out, fullPage });
  const metrics = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    const nav = document.querySelector('header, .ipekci-nav');
    const footer = document.querySelector('footer');
    const cs = (el) => (el ? getComputedStyle(el) : null);
    const r = (el) => (el ? el.getBoundingClientRect() : null);
    return {
      title: document.title,
      h1: h1 ? { text: h1.innerText.slice(0, 80), size: cs(h1).fontSize } : null,
      navH: nav ? Math.round(r(nav).height) : null,
      footerVisible: footer ? r(footer).top < innerHeight : false,
      bodyH: document.body.scrollHeight,
      openMenu: !!document.querySelector('button[aria-label*="menu" i], button[aria-label*="Open" i]'),
    };
  });
  await ctx.close();
  return { out, metrics };
}

const browser = await chromium.launch({ headless: true });
const report = [];
let totalChecks = 0;
let failedChecks = 0;

for (const p of PAGES) {
  console.log(`\n## ${p.name} (${p.path})`);
  const pageEntry = { page: p.name, path: p.path, viewports: [] };

  for (const vp of VPs) {
    const tag = `${p.name}_${vp.name}`;
    let react, wp;
    try {
      react = await capturePage(browser, REACT, p.path, vp, `${tag}_react`, false);
    } catch (e) {
      console.log(`  ${vp.name} React FAIL: ${e.message}`);
      pageEntry.viewports.push({ viewport: vp.name, error: `react: ${e.message}` });
      continue;
    }
    try {
      wp = await capturePage(browser, WP, p.path, vp, `${tag}_wp`, false);
    } catch (e) {
      console.log(`  ${vp.name} WP FAIL: ${e.message}`);
      pageEntry.viewports.push({ viewport: vp.name, error: `wp: ${e.message}` });
      continue;
    }

    const diffPath = path.join(OUT, `${tag}_diff.png`);
    const { pct, numDiff } = comparePng(react.out, wp.out, diffPath);
    totalChecks++;
    const pass = pct < 2;
    if (!pass) failedChecks++;
    const status = pass ? 'OK' : 'DIFF';
    console.log(`  ${vp.name}: ${status} ${pct.toFixed(1)}% (${numDiff}px)`);

    pageEntry.viewports.push({
      viewport: vp.name,
      diffPct: +pct.toFixed(2),
      diffPixels: numDiff,
      pass,
      react: react.metrics,
      wp: wp.metrics,
    });
  }

  // Full-page at 1920 for documentation
  if (VPs.some((v) => v.name === '1920')) {
    const vp1920 = VIEWPORTS.find((v) => v.name === '1920');
    try {
      await capturePage(browser, REACT, p.path, vp1920, `${p.name}_1920_full_react`, true);
      await capturePage(browser, WP, p.path, vp1920, `${p.name}_1920_full_wp`, true);
    } catch {
      /* non-fatal */
    }
  }

  report.push(pageEntry);
}

await browser.close();

const parityPct = totalChecks
  ? +(((totalChecks - failedChecks) / totalChecks) * 100).toFixed(1)
  : 0;

const summary = {
  generatedAt: new Date().toISOString(),
  react: REACT,
  wp: WP,
  overallParityPct: parityPct,
  totalChecks,
  failedChecks,
  pages: report,
};

fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(summary, null, 2));

console.log(`\n========================================`);
console.log(`Overall parity: ${parityPct}% (${totalChecks - failedChecks}/${totalChecks} viewports pass <2% diff)`);
console.log(`Report: ${OUT}/report.json`);
