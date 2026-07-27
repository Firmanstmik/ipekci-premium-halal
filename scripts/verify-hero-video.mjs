/**
 * Verify the hero background loop is gated correctly.
 *
 * The loop is decorative and 6.7 MB, so it must be downloaded on desktop only.
 * Asserts BOTH halves, because a gate that never loads the video would "pass" a
 * mobile-only check while silently breaking the desktop hero.
 *
 * Usage: node scripts/verify-hero-video.mjs
 */
import { chromium } from 'playwright';

const BASE = 'https://ipekcislachterij.localclicks.nl';
const VIDEO = 'ipekci-introductie.webm';

const CASES = [
  { name: 'mobile-portrait', width: 390, height: 844, expectVideo: false },
  { name: 'mobile-landscape', width: 844, height: 390, expectVideo: false },
  { name: 'tablet-portrait', width: 768, height: 1024, expectVideo: false },
  { name: 'desktop', width: 1440, height: 900, expectVideo: true },
];

const browser = await chromium.launch();
let failed = 0;

for (const c of CASES) {
  const ctx = await browser.newContext({ viewport: { width: c.width, height: c.height } });
  const page = await ctx.newPage();

  let videoBytes = 0;
  let videoRequested = false;
  page.on('request', (r) => {
    if (r.url().includes(VIDEO)) videoRequested = true;
  });
  page.on('response', async (r) => {
    if (r.url().includes(VIDEO)) {
      videoBytes = Number(r.headers()['content-length'] || 0);
    }
  });

  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text().slice(0, 120)));

  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  // The activation crossfade is on a 1500ms timer; give it room to start playing.
  await page.waitForTimeout(6000);

  const state = await page.evaluate(() => {
    const v = document.getElementById('ipekci-hero-video');
    const poster = document.getElementById('ipekci-hero-poster');
    return {
      hasSrc: !!(v && v.getAttribute('src')),
      readyState: v ? v.readyState : null,
      currentTime: v ? +v.currentTime.toFixed(2) : null,
      paused: v ? v.paused : null,
      posterVisible: poster ? getComputedStyle(poster).opacity !== '0' : null,
      heroVideoActive: !!document.querySelector('.ipekci-hero.is-video-active, #ipekci-hero.is-video-active'),
    };
  });

  // Playing means the clock actually advanced, not just that play() was called.
  const t1 = state.currentTime;
  await page.waitForTimeout(1200);
  const t2 = await page.evaluate(() => {
    const v = document.getElementById('ipekci-hero-video');
    return v ? +v.currentTime.toFixed(2) : null;
  });

  const ok = c.expectVideo
    ? videoRequested && state.hasSrc && t2 > t1
    : !videoRequested && !state.hasSrc;

  if (!ok) failed++;

  console.log(
    `${ok ? 'PASS' : 'FAIL'}  ${c.name.padEnd(17)} ` +
      `requested:${String(videoRequested).padEnd(5)} src:${String(state.hasSrc).padEnd(5)} ` +
      `bytes:${String(videoBytes).padEnd(8)} time:${t1}->${t2} ` +
      `posterVisible:${state.posterVisible} consoleErrors:${errors.length}`
  );
  if (errors.length) console.log('        errors:', errors);

  await ctx.close();
}

await browser.close();
console.log(failed ? `\n${failed} case(s) FAILED` : '\nall cases passed');
process.exit(failed ? 1 : 0);
