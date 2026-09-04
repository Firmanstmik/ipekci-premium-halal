/**
 * Verify the homepage hero no longer depends on a legacy brand video loop.
 *
 * Older builds used a decorative ~6.7 MB webm. Current Ayat hero uses stills only.
 * This script asserts that no legacy intro video is requested on any viewport.
 *
 * Usage: node scripts/verify-hero-video.mjs
 */
import { chromium } from 'playwright';

const BASE = process.env.WP_BASE ?? 'https://ipekcislachterij.localclicks.nl';
const LEGACY_VIDEO_MARKERS = [
  'ipekci-introductie.webm',
  'Ipekci_Brandmovie',
  'Ipekci_introductie',
];

const CASES = [
  { name: 'mobile-portrait', width: 390, height: 844 },
  { name: 'mobile-landscape', width: 844, height: 390 },
  { name: 'tablet-portrait', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

const browser = await chromium.launch();
let failed = 0;

for (const c of CASES) {
  const ctx = await browser.newContext({ viewport: { width: c.width, height: c.height } });
  const page = await ctx.newPage();

  const hits = [];
  page.on('request', (r) => {
    const url = r.url();
    if (LEGACY_VIDEO_MARKERS.some((m) => url.includes(m))) hits.push(url);
  });

  try {
    await page.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 90000 });
    await page.waitForTimeout(1200);
  } catch (err) {
    console.error(`FAIL ${c.name}: navigation error`, err.message);
    failed += 1;
    await ctx.close();
    continue;
  }

  if (hits.length) {
    console.error(`FAIL ${c.name}: legacy video requested`, hits);
    failed += 1;
  } else {
    console.log(`OK   ${c.name}: no legacy brand video`);
  }

  await ctx.close();
}

await browser.close();
process.exit(failed ? 1 : 0);
