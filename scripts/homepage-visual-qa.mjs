/**
 * Homepage-only visual QA at multiple viewports.
 */
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const TARGETS = [
  { label: 'wp', url: process.env.WP_BASE ?? 'https://ipekcislachterij.localclicks.nl/' },
  { label: 'react', url: process.env.REACT_BASE ?? 'http://localhost:3000/' },
];
const VIEWPORTS = [
  { name: '1440', width: 1440, height: 900 },
  { name: '1280', width: 1280, height: 900 },
  { name: '390', width: 390, height: 844 },
  { name: '430', width: 430, height: 932 },
];

const OUT = '.tmp-audit/homepage-qa';
mkdirSync(OUT, { recursive: true });

const SECTION_IDS = [
  '#ipekci-hero',
  '#ipekci-trust',
  '#ipekci-speerpunten',
  '#ipekci-meat',
  '#ipekci-assortiment',
  '#over-ons',
  '#ipekci-voorwie',
  '#ipekci-eindproducten',
  'footer',
];

async function auditPage(browser, target, vp) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await ctx.newPage();
  const consoleErrors = [];
  const failed = [];
  page.on('console', (m) => {
    if (m.type() === 'error') consoleErrors.push(m.text());
  });
  page.on('response', (r) => {
    if (r.status() >= 400) failed.push({ url: r.url(), status: r.status() });
  });

  await page.goto(target.url, { waitUntil: 'networkidle', timeout: 120000 });
  await page.waitForTimeout(2500);

  const shot = join(OUT, `${target.label}-${vp.name}.png`);
  await page.screenshot({ path: shot, fullPage: true });

  const data = await page.evaluate((sectionIds) => {
    const body = document.body?.innerText || '';
    const imgs = [...document.querySelectorAll('img')].map((i) => ({
      src: (i.currentSrc || i.src || '').slice(0, 220),
      alt: i.alt || '',
      w: i.naturalWidth,
      h: i.naturalHeight,
      broken: i.complete && i.naturalWidth === 0,
    }));
    const sections = sectionIds.map((sel) => {
      const el = document.querySelector(sel);
      if (!el) return { sel, found: false };
      const r = el.getBoundingClientRect();
      return {
        sel,
        found: true,
        h: Math.round(r.height),
        w: Math.round(r.width),
        text: (el.textContent || '').trim().slice(0, 120),
      };
    });
    const counter =
      document.querySelector('.over-ons-proof__stat-num')?.textContent?.trim() ||
      document.querySelector('[data-count-to]')?.textContent?.trim() ||
      null;
    const overflow = document.documentElement.scrollWidth > document.documentElement.clientWidth;
    const visibleBrand = {
      ipekciText: /Ipekci|Ipekçi/i.test(body),
      slachthuis: /slachthuis/i.test(body),
      harderwijk: /Harderwijk/i.test(body),
      counterZero: /0\s*\+\s*jaar ervaring/i.test(body),
      ayat: /Ayat Food/i.test(body),
    };
    const heroImg = document.querySelector('#ipekci-hero img, .ipekci-hero img')?.src || null;
    const logo = document.querySelector('header img, .ipekci-nav img')?.src || null;
    const meta = {
      title: document.title,
      desc: document.querySelector('meta[name="description"]')?.content || null,
    };
    const emptyAlts = imgs.filter((i) => !i.alt && !i.src.includes('logo')).length;
    const brokenImgs = imgs.filter((i) => i.broken);
    return {
      sections,
      counter,
      overflow,
      visibleBrand,
      heroImg,
      logo,
      meta,
      imgCount: imgs.length,
      emptyAlts,
      brokenImgs,
      sampleImgs: imgs.slice(0, 25),
      bodySnippet: body.slice(0, 800),
    };
  }, SECTION_IDS);

  await ctx.close();
  return {
    target: target.label,
    viewport: vp.name,
    screenshot: shot,
    consoleErrors: consoleErrors.slice(0, 20),
    failed: failed.filter((f) => !/favicon|analytics/i.test(f.url)).slice(0, 30),
    ...data,
  };
}

const browser = await chromium.launch({ headless: true });
const results = [];

for (const target of TARGETS) {
  for (const vp of VIEWPORTS) {
    try {
      console.log('audit', target.label, vp.name);
      results.push(await auditPage(browser, target, vp));
    } catch (e) {
      results.push({ target: target.label, viewport: vp.name, error: String(e.message || e) });
    }
  }
}

writeFileSync(join(OUT, 'report.json'), JSON.stringify({ generatedAt: new Date().toISOString(), results }, null, 2));
console.log('done', results.length);
for (const r of results) {
  if (r.error) {
    console.log(r.target, r.viewport, 'ERR', r.error);
    continue;
  }
  console.log(
    r.target,
    r.viewport,
    'counter=',
    r.counter,
    'overflow=',
    r.overflow,
    'brand=',
    JSON.stringify(r.visibleBrand),
    'broken=',
    r.brokenImgs?.length,
  );
}
await browser.close();
