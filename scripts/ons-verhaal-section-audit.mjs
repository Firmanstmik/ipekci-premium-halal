/**
 * Over ons (/ons-verhaal/) section-by-section visual parity audit.
 * Usage: node scripts/ons-verhaal-section-audit.mjs
 *        node scripts/ons-verhaal-section-audit.mjs --viewports 1920,768
 */
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const REACT = process.env.REACT_URL ?? 'http://localhost:3000';
const WP = process.env.WP_URL ?? 'https://ipekcislachterij.localclicks.nl';
const OUT = '.visual-qa/ons-verhaal-sections';

const ALL_VPS = [
  { w: 1920, h: 1080, name: '1920' },
  { w: 1440, h: 900, name: '1440' },
  { w: 768, h: 1024, name: '768' },
  { w: 390, h: 844, name: '390' },
];

const SECTIONS = [
  { id: 'hero', react: ['#ons-verhaal-hero', '.product-hero-mobile', 'section[aria-labelledby="ons-verhaal-hero-heading"]'], wp: ['.ipekci-ov2-hero', '#ons-verhaal-hero', 'section[aria-labelledby="ons-verhaal-hero-heading"]'] },
  { id: 'service', react: ['#ons-verhaal-service', 'section[aria-labelledby="ons-verhaal-service-heading"]'], wp: ['.ipekci-ov2-svc', 'section[aria-labelledby="ons-verhaal-service-heading"]'] },
  { id: 'halal', react: ['#ons-verhaal-halal', 'section[aria-labelledby="ons-verhaal-halal-heading"]'], wp: ['.ipekci-ov2-halal', 'section[aria-labelledby="ons-verhaal-halal-heading"]'] },
  { id: 'workflow', react: ['#ons-verhaal-workflow-heading', 'section[aria-labelledby="ons-verhaal-workflow-heading"]'], wp: ['.ipekci-ov2-wf', 'section[aria-labelledby="ons-verhaal-workflow-heading"]'] },
  { id: 'stats', react: ['#ons-verhaal-stats-heading', 'section[aria-labelledby="ons-verhaal-stats-heading"]'], wp: ['.ipekci-ov2-stats', 'section[aria-labelledby="ons-verhaal-stats-heading"]'] },
  { id: 'highlights', react: ['#ons-verhaal-highlights-heading', 'section[aria-labelledby="ons-verhaal-highlights-heading"]'], wp: ['.ipekci-ov2-hl', 'section[aria-labelledby="ons-verhaal-highlights-heading"]'] },
  { id: 'assortiment', react: ['#ons-verhaal-assortiment-heading', 'section[aria-labelledby="ons-verhaal-assortiment-heading"]'], wp: ['.ipekci-ov2-as', 'section[aria-labelledby="ons-verhaal-assortiment-heading"]'] },
  { id: 'careers', react: ['#ons-verhaal-careers-heading', 'section[aria-labelledby="ons-verhaal-careers-heading"]'], wp: ['.ipekci-ov2-careers', 'section[aria-labelledby="ons-verhaal-careers-heading"]'] },
  { id: 'klant-cta', react: ['.assortiment-klant-cta', '.ipekci-klant-cta'], wp: ['.ipekci-klant-cta', '.assortiment-klant-cta'] },
];

const vpArg = process.argv.find((a, i) => process.argv[i - 1] === '--viewports');
const VP_NAMES = vpArg ? vpArg.split(',').map((s) => s.trim()) : ['1920', '1440', '768'];
const VPs = ALL_VPS.filter((v) => VP_NAMES.includes(v.name));

fs.mkdirSync(OUT, { recursive: true });

function cropPng(img, width, height) {
  const out = new PNG({ width, height });
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const si = (img.width * y + x) << 2;
      const di = (width * y + x) << 2;
      out.data[di] = img.data[si];
      out.data[di + 1] = img.data[si + 1];
      out.data[di + 2] = img.data[si + 2];
      out.data[di + 3] = img.data[si + 3];
    }
  }
  return out;
}

function diffPct(aPath, bPath, diffPath) {
  if (!fs.existsSync(aPath) || !fs.existsSync(bPath)) return null;
  const img1 = PNG.sync.read(fs.readFileSync(aPath));
  const img2 = PNG.sync.read(fs.readFileSync(bPath));
  const w = Math.min(img1.width, img2.width);
  const h = Math.min(img1.height, img2.height);
  const a = cropPng(img1, w, h);
  const b = cropPng(img2, w, h);
  const diff = new PNG({ width: w, height: h });
  const n = pixelmatch(a.data, b.data, diff.data, w, h, { threshold: 0.12 });
  if (n > 0) fs.writeFileSync(diffPath, PNG.sync.write(diff));
  return +((n / (w * h)) * 100).toFixed(1);
}

async function prepPage(page) {
  await page.evaluate(() => {
    document.querySelectorAll('.ov-motion, .story-reveal').forEach((el) => el.classList.add('is-in', 'is-visible'));
    document.querySelectorAll('[data-count-to]').forEach((el) => {
      const to = el.getAttribute('data-count-to');
      const suffix = el.getAttribute('data-count-suffix') || '';
      if (to) el.textContent = `${to}${suffix}`;
    });
    document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
      img.loading = 'eager';
      const src = img.getAttribute('src');
      if (src) img.src = src;
    });
    document.getElementById('wpadminbar')?.style.setProperty('display', 'none', 'important');
    document.documentElement.classList.remove('admin-bar');
    document.body?.style.setProperty('margin-top', '0', 'important');
    document.querySelectorAll('#ipekci-nav, .ipekci-nav, .fixed.inset-x-0.top-0.z-50').forEach((el) => {
      el.style.setProperty('visibility', 'hidden', 'important');
    });
    document.querySelectorAll('body *').forEach((el) => {
      const s = getComputedStyle(el);
      if (s.position !== 'fixed' || parseFloat(s.bottom) > 8) return;
      const t = (el.textContent || '').toLowerCase();
      if (t.includes('bel direct') || t.includes('word klant')) {
        el.style.setProperty('display', 'none', 'important');
      }
    });
  });
}

async function captureSection(page, selectors, vp, label) {
  let target = null;
  for (const s of selectors) {
    const loc = page.locator(s).first();
    if ((await loc.count()) > 0) {
      const box = await loc.boundingBox().catch(() => null);
      if (box && box.height > 40) {
        target = loc;
        break;
      }
    }
  }
  if (!target) return { error: 'selector not found' };

  await target.scrollIntoViewIfNeeded({ timeout: 15000 }).catch(() => {});
  await page.evaluate((sels) => {
    let el = null;
    for (const s of sels) {
      el = document.querySelector(s);
      if (el) break;
    }
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, Math.max(0, top));
  }, selectors);
  await page.waitForTimeout(300);
  await prepPage(page);
  await page.waitForTimeout(2000);

  const box = await target.boundingBox();
  if (!box) return { error: 'no bounding box' };

  const shotPath = path.join(OUT, `${label}.png`);
  await page.screenshot({
    path: shotPath,
    clip: { x: 0, y: Math.max(0, box.y), width: vp.w, height: Math.min(box.height + 20, vp.h) },
  });
  return { path: shotPath, height: box.height };
}

async function auditSection(browser, section, vp) {
  const reactCtx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
  const wpCtx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
  const reactPage = await reactCtx.newPage();
  const wpPage = await wpCtx.newPage();

  await reactPage.goto(`${REACT}/ons-verhaal`, { waitUntil: 'networkidle', timeout: 120000 });
  await wpPage.goto(`${WP}/ons-verhaal/?bust=${Date.now()}`, { waitUntil: 'networkidle', timeout: 120000 });

  const base = `${section.id}_${vp.name}`;
  const react = await captureSection(reactPage, section.react, vp, `${base}_react`);
  const wpRes = await captureSection(wpPage, section.wp, vp, `${base}_wp`);

  await reactCtx.close();
  await wpCtx.close();

  if (react.error || wpRes.error) {
    return { section: section.id, viewport: vp.name, error: react.error || wpRes.error };
  }

  const diffPath = path.join(OUT, `${base}_diff.png`);
  const diff = diffPct(react.path, wpRes.path, diffPath);
  return { section: section.id, viewport: vp.name, diffPct: diff, pass: diff != null && diff < 2.5 };
}

const browser = await chromium.launch({ headless: true });
const results = [];
for (const vp of VPs) {
  for (const section of SECTIONS) {
    console.log('audit', section.id, vp.name);
    results.push(await auditSection(browser, section, vp));
  }
}
await browser.close();

const report = { generatedAt: new Date().toISOString(), results };
fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));
console.log('\n=== SUMMARY ===');
for (const r of results) {
  if (r.error) console.log(`${r.section}@${r.viewport}: ERROR ${r.error}`);
  else console.log(`${r.section}@${r.viewport}: ${r.diffPct}% ${r.pass ? 'PASS' : 'FAIL'}`);
}
