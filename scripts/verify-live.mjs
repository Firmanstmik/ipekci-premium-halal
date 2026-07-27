/**
 * Client-eyes verification of the LIVE WordPress site.
 *
 * Walks every route at desktop/tablet/mobile and reports only defects: console
 * errors, PHP notices leaking into the HTML, failed requests, broken images or
 * videos, missing CSS/JS, missing sections, horizontal overflow.
 *
 * Anonymous (logged-out) so it sees exactly what a visitor — and LiteSpeed's
 * cache — serves.
 *
 * Usage: node scripts/verify-live.mjs [--viewport=1440]
 */
import { chromium } from 'playwright';

const BASE = 'https://ipekcislachterij.localclicks.nl';

const ROUTES = [
  '/', '/ons-verhaal/', '/contact/',
  '/assortiment/', '/assortiment/lamsvlees/', '/assortiment/rundvlees/',
  '/assortiment/kip/', '/assortiment/eindproducten/',
  '/voor-wie/', '/voor-wie/slagerijen/', '/voor-wie/groothandels/',
  '/voor-wie/supermarkten/', '/voor-wie/restaurants/',
];

// Homepage sections, in React DOM order.
const HOME_SECTIONS = [
  '.ipekci-hero',
  '.ipekci-trust',
  '.ipekci-meat',
  '.ipekci-story',
  '.ipekci-assortiment',
  '.ipekci-voorwie',
  '.ipekci-eindproducten',
];

const width = Number((process.argv.find((a) => a.startsWith('--viewport=')) ?? '').split('=')[1] || 1440);
const height = width < 500 ? 844 : width < 900 ? 1024 : 900;

const PHP_ERR = /(Warning|Notice|Fatal error|Deprecated|Parse error)\s*:\s/;

// This host's HTTP/3 is flaky (ERR_QUIC_PROTOCOL_ERROR on assets that plainly
// exist). Drop to HTTP/2 — but NOT to HTTP/1.1: without multiplexing, this
// media-heavy site starves itself on 6 connections and we'd be measuring our own
// transport choice rather than the site.
const browser = await chromium.launch({ args: ['--disable-quic'] });
let failures = 0;

async function check(route) {
  const ctx = await browser.newContext({ viewport: { width, height } });
  const page = await ctx.newPage();

  const consoleErrors = [];
  const failed = [];

  page.on('console', (m) => {
    if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 120));
  });
  page.on('pageerror', (e) => consoleErrors.push('pageerror: ' + e.message.slice(0, 120)));
  page.on('requestfailed', (r) => {
    const err = r.failure()?.errorText ?? '';
    // A streaming <video> whose range request is still open when we tear the
    // page down always reports ERR_ABORTED. That is our teardown, not a defect —
    // the hero video is separately asserted to be *playing* below.
    if (err.includes('ERR_ABORTED') && /\.(webm|mp4)/.test(r.url())) return;
    failed.push(`${r.url().slice(-60)} (${err})`);
  });
  page.on('response', (r) => {
    if (r.status() >= 400) failed.push(`${r.status()} ${r.url().slice(-70)}`);
  });

  let status = 0;
  try {
    const resp = await page.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 90000 });
    status = resp?.status() ?? 0;
  } catch (e) {
    await ctx.close();
    throw e;
  }

  // Scroll so lazy / IntersectionObserver content actually mounts.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 150));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1500);

  const probe = await page.evaluate((sections) => {
    const brokenImgs = [...document.querySelectorAll('img')]
      .filter((i) => i.complete && i.naturalWidth === 0)
      .map((i) => i.currentSrc || i.src);
    const brokenVids = [...document.querySelectorAll('video')]
      .filter((v) => v.networkState === 3 /* NETWORK_NO_SOURCE */ || v.error)
      .map((v) => v.currentSrc || v.src || '(no src)');
    const missing = sections.filter((s) => !document.querySelector(s));
    // The theme INLINES its CSS (<style id="ipekci-inline-css">) rather than
    // shipping <link rel=stylesheet>, so presence of a link tag proves nothing.
    // Assert the styling actually landed: the fixed navbar is the sentinel.
    const nav = document.querySelector('.ipekci-nav, .ipekci-navbar, header nav');
    const navPos = nav ? getComputedStyle(nav).position : null;
    const cssOk = Boolean(document.querySelector('#ipekci-inline-css, link[rel=stylesheet]'));

    return {
      title: document.title,
      h1: document.querySelectorAll('h1').length,
      cssOk,
      styled: navPos === 'fixed' || navPos === 'absolute' || navPos === 'sticky',
      js: document.querySelectorAll('script[src]').length,
      brokenImgs,
      brokenVids,
      missing: location.pathname === '/' ? missing : [],
      overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
      scrollW: document.documentElement.scrollWidth,
    };
  }, HOME_SECTIONS);

  const html = await page.content();
  const phpErr = PHP_ERR.test(html.replace(/<script[\s\S]*?<\/script>/g, ''));

  const issues = [];

  if (status !== 200) issues.push(`status ${status}`);
  if (phpErr) issues.push('PHP error/notice in HTML');
  if (consoleErrors.length) issues.push(`console: ${consoleErrors.slice(0, 3).join(' | ')}`);
  if (failed.length) issues.push(`failed req: ${[...new Set(failed)].slice(0, 3).join(' | ')}`);
  if (probe.brokenImgs.length) issues.push(`broken img: ${probe.brokenImgs.slice(0, 3).join(', ')}`);
  if (probe.brokenVids.length) issues.push(`broken video: ${probe.brokenVids.slice(0, 2).join(', ')}`);
  if (probe.missing.length) issues.push(`MISSING SECTIONS: ${probe.missing.join(', ')}`);
  if (probe.h1 !== 1) issues.push(`h1 count = ${probe.h1}`);
  if (!probe.cssOk) issues.push('no CSS delivered');
  if (!probe.styled) issues.push('CSS present but navbar unstyled');
  if (!probe.js) issues.push('no scripts');
  if (probe.overflow) issues.push(`horizontal overflow (${probe.scrollW} > ${width})`);

  await ctx.close();
  return issues;
}

for (const route of ROUTES) {
  let issues = null;
  // Retry: this host intermittently drops connections, and a transient failure
  // must not be reported as a site defect.
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      issues = await check(route);
      if (!issues.length || attempt === 3) break;
    } catch (e) {
      if (attempt === 3) issues = [`NAVIGATION FAILED: ${e.message.slice(0, 70)}`];
    }
    await new Promise((r) => setTimeout(r, 4000));
  }

  if (issues && issues.length) {
    failures += 1;
    console.log(`\n### ${route} @${width}  ✖`);
    issues.forEach((i) => console.log('   - ' + i));
  } else {
    console.log(`✔ ${route} @${width}`);
  }
}

// Hero background loop — asserted in its OWN page, sitting at the top of the
// hero like a real visitor. It must not share bandwidth with the lazy brand
// videos that a full-page scroll pulls in, or the 6.7 MB loop simply loses the
// race and we'd report a working hero as broken.
//
// home.js holds it at preload="none" until the window `load` event + an idle
// callback (fetching it sooner starves the poster, which is the LCP element), so
// we honour that lifecycle rather than measuring our own impatience.
// Desktop only: shouldLoadHeroVideo() deliberately skips it below 1024px.
if (width >= 1024) {
  const ctx = await browser.newContext({ viewport: { width, height } });
  const page = await ctx.newPage();
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded', timeout: 120000 });
  await page.waitForLoadState('load', { timeout: 90000 }).catch(() => {});

  const v = await page.evaluate(async () => {
    const el = document.querySelector('.ipekci-hero video');
    if (!el) return { missing: true };
    const deadline = Date.now() + 60000;
    while (Date.now() < deadline && !el.error && !(el.readyState >= 3 && !el.paused)) {
      await new Promise((r) => setTimeout(r, 500));
    }
    const t0 = el.currentTime;
    await new Promise((r) => setTimeout(r, 2000));
    return {
      readyState: el.readyState,
      advanced: el.currentTime > t0,
      paused: el.paused,
      err: el.error?.code ?? null,
      active: document.querySelector('.ipekci-hero')?.classList.contains('is-video-active'),
    };
  });

  if (v.missing) { failures += 1; console.log('\n### hero video ✖ <video> element absent'); }
  else if (v.err) { failures += 1; console.log(`\n### hero video ✖ error code ${v.err}`); }
  else if (v.readyState < 3) { failures += 1; console.log(`\n### hero video ✖ never buffered (readyState ${v.readyState})`); }
  else if (!v.advanced) { failures += 1; console.log(`\n### hero video ✖ buffered but not advancing (paused=${v.paused})`); }
  else console.log(`✔ hero video playing (readyState ${v.readyState}, is-video-active=${v.active})`);

  await ctx.close();
}

console.log(failures ? `\n${failures} issue(s) @${width}` : `\nALL CLEAN @${width}`);
await browser.close();
process.exit(failures ? 1 : 0);
