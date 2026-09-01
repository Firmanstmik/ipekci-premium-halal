/**
 * Global layout system audit: React vs live WP.
 * Measures container max-width, horizontal padding, content edges.
 *
 * Usage: node scripts/layout-audit.mjs
 */
import { chromium } from 'playwright';
import fs from 'fs';

const REACT = process.env.REACT_URL ?? 'http://localhost:3000';
const WP = process.env.WP_URL ?? 'https://ipekcislachterij.localclicks.nl';
const OUT = '.visual-qa/layout-audit';

const VPs = [
  { w: 1920, h: 1080, name: '1920' },
  { w: 1440, h: 900, name: '1440' },
  { w: 1280, h: 800, name: '1280' },
  { w: 1024, h: 768, name: '1024' },
  { w: 768, h: 1024, name: '768' },
  { w: 390, h: 844, name: '390' },
];

const TARGETS = {
  react: {
    navTop: '.ipek-container',
    navBar: 'div.fixed.inset-x-0.top-0.z-50 .ipek-container.hidden.lg\\:flex',
    navMobile: 'div.fixed.inset-x-0.top-0.z-50 .ipek-container.flex.lg\\:hidden',
    hero: '[data-story-chapter="introduction"] .ipek-container',
    trust: 'section[aria-labelledby="enterprise-trust-heading"] .ipek-container',
    meat: '#meat-explorer .ipek-container',
    overOns: '#over-ons .ipek-container',
    speerpunten: '#speerpunten .ipek-container',
    footer: 'footer .ipek-container',
  },
  wp: {
    navTop: '.ipekci-nav-topbar__inner',
    navBar: '.ipekci-nav__desktop',
    navMobile: '.ipekci-nav__mobile',
    hero: '.ipekci-hero__inner',
    trust: '.ipekci-trust__inner',
    meat: '.ipekci-meat__inner',
    overOns: '#over-ons .ipek-container',
    speerpunten: '.ipekci-speerpunten__inner',
    footer: '.ipekci-footer__inner',
  },
};

fs.mkdirSync(OUT, { recursive: true });

async function measure(page, selector) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return { error: 'not found', selector: sel };
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return {
      selector: sel,
      left: Math.round(r.left),
      width: Math.round(r.width),
      right: Math.round(r.right),
      maxWidth: cs.maxWidth,
      paddingLeft: cs.paddingLeft,
      paddingRight: cs.paddingRight,
      marginLeft: cs.marginLeft,
      marginRight: cs.marginRight,
    };
  }, selector);
}

async function auditSite(browser, base, label) {
  const data = {};
  for (const vp of VPs) {
    const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
    const page = await ctx.newPage();
    await page.goto(`${base}/?layout=${Date.now()}`, { waitUntil: 'domcontentloaded', timeout: 120000 });
    await page.waitForTimeout(2500);
    await page.addStyleTag({ content: '#wpadminbar{display:none!important} html{margin-top:0!important}' });
    if (label === 'wp') await page.evaluate(() => window.scrollTo(0, 0));

    data[vp.name] = {};
    const targets = TARGETS[label];
    for (const [key, sel] of Object.entries(targets)) {
      data[vp.name][key] = await measure(page, sel);
    }
    await ctx.close();
  }
  return data;
}

const browser = await chromium.launch({ headless: true });
const react = await auditSite(browser, REACT, 'react');
const wp = await auditSite(browser, WP, 'wp');
await browser.close();

const report = { generatedAt: new Date().toISOString(), react, wp, diffs: {} };

for (const vp of VPs) {
  report.diffs[vp.name] = {};
  for (const key of Object.keys(TARGETS.react)) {
    const a = react[vp.name][key];
    const b = wp[vp.name][key];
    if (a?.error || b?.error) {
      report.diffs[vp.name][key] = { error: a?.error || b?.error };
      continue;
    }
    report.diffs[vp.name][key] = {
      react,
      wp: b,
      deltaLeft: b.left - a.left,
      deltaWidth: b.width - a.width,
      maxWidthMatch: a.maxWidth === b.maxWidth,
      padLeftMatch: a.paddingLeft === b.paddingLeft,
      padRightMatch: a.paddingRight === b.paddingRight,
    };
    report.diffs[vp.name][key].react = a;
  }
}

fs.writeFileSync(`${OUT}/report.json`, JSON.stringify(report, null, 2));

console.log('\n=== Layout alignment (React vs WP) ===\n');
for (const vp of VPs) {
  console.log(`--- ${vp.name}px ---`);
  for (const key of Object.keys(TARGETS.react)) {
    const d = report.diffs[vp.name][key];
    if (d.error) {
      console.log(`  ${key.padEnd(12)} ERR  ${d.error}`);
      continue;
    }
    const ok = d.deltaLeft === 0 && d.deltaWidth === 0;
    const flag = ok ? 'OK  ' : 'DIFF';
    console.log(
      `  ${key.padEnd(12)} ${flag} Δleft=${d.deltaLeft}px Δwidth=${d.deltaWidth}px  R[max=${d.react.maxWidth} pl=${d.react.paddingLeft}] WP[max=${d.wp.maxWidth} pl=${d.wp.paddingLeft}]`,
    );
  }
}
console.log(`\nReport: ${OUT}/report.json`);
