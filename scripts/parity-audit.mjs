/**
 * Desktop-first visual parity: React (source of truth) vs live WordPress.
 * Captures viewport screenshots + extracts section metrics for diagnosis.
 *
 * Usage: node scripts/parity-audit.mjs
 */
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const REACT = process.env.REACT_URL ?? 'http://localhost:3000';
const WP = process.env.WP_URL ?? 'https://ipekcislachterij.localclicks.nl';
const OUT = '.visual-qa/parity';
const VIEWPORT = { width: 1920, height: 1080 };

const PAGES = [
  { path: '/', name: 'home', sections: [
    'header, .ipekci-nav, nav',
    '.ipekci-hero, [data-section="hero"], section:first-of-type',
  ]},
  { path: '/ons-verhaal/', name: 'over-ons' },
  { path: '/producten/', name: 'producten' },
  { path: '/producten/doner/', name: 'producten-doner' },
  { path: '/voor-wie/', name: 'voor-wie' },
  { path: '/vacatures/', name: 'vacatures' },
  { path: '/contact/', name: 'contact' },
];

fs.mkdirSync(OUT, { recursive: true });

async function extractStructure(page) {
  return page.evaluate(() => {
    const pick = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        tag: el.tagName.toLowerCase(),
        className: (el.className || '').toString().slice(0, 120),
        text: (el.innerText || '').slice(0, 200).replace(/\s+/g, ' ').trim(),
        w: Math.round(r.width),
        h: Math.round(r.height),
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        lineHeight: cs.lineHeight,
        color: cs.color,
        bg: cs.backgroundColor,
        display: cs.display,
        gap: cs.gap,
        padding: `${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}`,
        margin: `${cs.marginTop} ${cs.marginRight} ${cs.marginBottom} ${cs.marginLeft}`,
      };
    };

    const h1 = document.querySelector('h1');
    const navLinks = [...document.querySelectorAll('header a, nav a, .ipekci-nav a, [class*="nav"] a')]
      .map((a) => (a.textContent || '').trim().replace(/\s+/g, ' '))
      .filter(Boolean)
      .slice(0, 30);

    const sections = [...document.querySelectorAll('main section, main > div > section, [class*="section"]')]
      .slice(0, 20)
      .map((s) => ({
        className: (s.className || '').toString().slice(0, 80),
        h: Math.round(s.getBoundingClientRect().height),
        heading: (s.querySelector('h1,h2,h3')?.innerText || '').slice(0, 80).replace(/\s+/g, ' '),
      }));

    const title = document.title;
    const bodyText = (document.body?.innerText || '').slice(0, 500).replace(/\s+/g, ' ');

    // Detect admin bar / mobile-only nav
    const hasAdminBar = !!document.querySelector('#wpadminbar');
    const openMenuBtn = !!document.querySelector('button[aria-label*="menu" i], button[aria-label*="Open menu" i]');
    const desktopNavVisible = (() => {
      const links = [...document.querySelectorAll('header nav a, .ipekci-nav__links a, [data-desktop-nav] a')];
      return links.some((a) => {
        const r = a.getBoundingClientRect();
        return r.width > 0 && r.height > 0;
      });
    })();

    return {
      title,
      h1: h1 ? { text: h1.innerText.slice(0, 120), fontSize: getComputedStyle(h1).fontSize, fontWeight: getComputedStyle(h1).fontWeight } : null,
      navLinks: [...new Set(navLinks)],
      sections,
      hasAdminBar,
      openMenuBtn,
      desktopNavVisible,
      bodyPreview: bodyText,
      header: pick('header') || pick('.ipekci-nav') || pick('nav'),
      footer: pick('footer'),
      ctas: [...document.querySelectorAll('a.ipek-btn-premium, a.lux-btn, a[class*="cta"], button[class*="cta"]')]
        .slice(0, 12)
        .map((a) => (a.innerText || '').replace(/\s+/g, ' ').trim()),
    };
  });
}

async function capture(browser, label, base, pagePath, scrollTo) {
  const context = await browser.newContext({
    viewport: VIEWPORT,
    // anonymous — no WP cookies
    storageState: undefined,
  });
  const page = await context.newPage();
  const url = `${base}${pagePath}${pagePath.includes('?') ? '&' : '?'}parity=${Date.now()}`;
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForTimeout(2500);
  // Hide WP admin bar if somehow present
  await page.addStyleTag({ content: '#wpadminbar{display:none!important} html{margin-top:0!important}' });
  if (scrollTo) {
    await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (el) el.scrollIntoView({ block: 'start', behavior: 'instant' });
    }, scrollTo);
    await page.waitForTimeout(800);
  }
  const shot = path.join(OUT, `${label}.png`);
  await page.screenshot({ path: shot, fullPage: false });
  const structure = await extractStructure(page);
  await context.close();
  return { shot, structure };
}

const browser = await chromium.launch({ headless: true });
const report = [];

for (const p of PAGES) {
  console.log(`\n=== ${p.name} (${p.path}) ===`);
  let react, wp;
  try {
    react = await capture(browser, `${p.name}_react`, REACT, p.path);
    console.log('  React OK:', react.structure.title);
  } catch (e) {
    console.error('  React FAIL:', e.message);
    continue;
  }
  try {
    wp = await capture(browser, `${p.name}_wp`, WP, p.path);
    console.log('  WP OK:', wp.structure.title);
  } catch (e) {
    console.error('  WP FAIL:', e.message);
    continue;
  }

  const diffs = [];
  if (react.structure.title !== wp.structure.title) {
    diffs.push(`TITLE: React="${react.structure.title}" | WP="${wp.structure.title}"`);
  }
  if ((react.structure.h1?.text || '') !== (wp.structure.h1?.text || '')) {
    diffs.push(`H1: React="${react.structure.h1?.text}" | WP="${wp.structure.h1?.text}"`);
  }
  if ((react.structure.h1?.fontSize || '') !== (wp.structure.h1?.fontSize || '')) {
    diffs.push(`H1 size: React=${react.structure.h1?.fontSize} | WP=${wp.structure.h1?.fontSize}`);
  }
  if (react.structure.desktopNavVisible !== wp.structure.desktopNavVisible) {
    diffs.push(`DESKTOP NAV visible: React=${react.structure.desktopNavVisible} | WP=${wp.structure.desktopNavVisible}`);
  }
  if (wp.structure.openMenuBtn && react.structure.desktopNavVisible) {
    diffs.push('WP shows mobile Open menu button at 1920 — desktop nav likely broken/hidden');
  }

  // Compare nav link labels (order-sensitive, first 10 unique meaningful)
  const rn = react.structure.navLinks.filter((t) => t.length < 40).slice(0, 12);
  const wn = wp.structure.navLinks.filter((t) => t.length < 40).slice(0, 12);
  if (JSON.stringify(rn) !== JSON.stringify(wn)) {
    diffs.push(`NAV links React=${JSON.stringify(rn)} | WP=${JSON.stringify(wn)}`);
  }

  // Section count / headings
  const rs = react.structure.sections.map((s) => s.heading).filter(Boolean);
  const ws = wp.structure.sections.map((s) => s.heading).filter(Boolean);
  if (JSON.stringify(rs) !== JSON.stringify(ws)) {
    diffs.push(`SECTION headings React=${JSON.stringify(rs)} | WP=${JSON.stringify(ws)}`);
  }

  // CTA labels
  if (JSON.stringify(react.structure.ctas) !== JSON.stringify(wp.structure.ctas)) {
    diffs.push(`CTAs React=${JSON.stringify(react.structure.ctas)} | WP=${JSON.stringify(wp.structure.ctas)}`);
  }

  console.log(`  Diffs: ${diffs.length}`);
  diffs.forEach((d) => console.log('   -', d));

  report.push({
    page: p.name,
    path: p.path,
    diffs,
    react: {
      title: react.structure.title,
      h1: react.structure.h1,
      sections: react.structure.sections,
      navLinks: rn,
      ctas: react.structure.ctas,
      desktopNavVisible: react.structure.desktopNavVisible,
    },
    wp: {
      title: wp.structure.title,
      h1: wp.structure.h1,
      sections: wp.structure.sections,
      navLinks: wn,
      ctas: wp.structure.ctas,
      desktopNavVisible: wp.structure.desktopNavVisible,
      openMenuBtn: wp.structure.openMenuBtn,
    },
  });

  fs.writeFileSync(path.join(OUT, `${p.name}_react.json`), JSON.stringify(react.structure, null, 2));
  fs.writeFileSync(path.join(OUT, `${p.name}_wp.json`), JSON.stringify(wp.structure, null, 2));
}

fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));

// Scrolled captures for homepage Over Ons bento (nav + section in one frame).
console.log('\n=== home over-ons section (scrolled) ===');
const OVER_ONS_SEL = '.ipekci-overons, .story-section--editorial, #ipekci-overons';
try {
  await capture(browser, 'home_overons_react', REACT, '/', OVER_ONS_SEL);
  console.log('  React over-ons screenshot OK');
} catch (e) {
  console.error('  React over-ons FAIL:', e.message);
}
try {
  await capture(browser, 'home_overons_wp', WP, '/', OVER_ONS_SEL);
  console.log('  WP over-ons screenshot OK');
} catch (e) {
  console.error('  WP over-ons FAIL:', e.message);
}

await browser.close();

const totalDiffs = report.reduce((n, r) => n + r.diffs.length, 0);
console.log(`\n\nDONE. Pages: ${report.length}, total structural diffs: ${totalDiffs}`);
console.log(`Screenshots + JSON in ${OUT}/`);
