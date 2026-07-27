/**
 * Accessibility checks that axe cannot make: keyboard operability, visible focus,
 * skip link, touch-target size, and prefers-reduced-motion.
 *
 * axe reports zero violations on this site, but "no axe violations" and "usable
 * with a keyboard" are different claims — this checks the second one.
 */
import { chromium } from 'playwright';

const BASE = 'https://ipekcislachterij.localclicks.nl';
const ROUTES = ['/', '/contact/', '/assortiment/', '/voor-wie/'];

const browser = await chromium.launch();

for (const route of ROUTES) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForTimeout(2500);

  // --- skip link: first Tab should reach it, and it should become visible ---
  await page.keyboard.press('Tab');
  const skip = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return null;
    const r = el.getBoundingClientRect();
    return {
      text: (el.textContent || '').trim().slice(0, 30),
      href: el.getAttribute('href'),
      onScreen: r.top >= 0 && r.left >= 0 && r.width > 0 && r.height > 0,
    };
  });

  // --- tab through and check every stop has a visible focus indicator ---
  const focusReport = await page.evaluate(async () => {
    const focusables = [...document.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'
    )].filter((el) => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none';
    });

    let noIndicator = 0;
    const offenders = [];
    for (const el of focusables.slice(0, 60)) {
      el.focus();
      const cs = getComputedStyle(el);
      // A visible ring = a real outline, or a box-shadow/border the theme swaps in.
      const hasOutline = cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0;
      const hasShadow = cs.boxShadow && cs.boxShadow !== 'none';
      if (!hasOutline && !hasShadow) {
        noIndicator++;
        if (offenders.length < 4) {
          offenders.push(el.tagName + '.' + (el.className || '').toString().split(' ')[0]);
        }
      }
    }
    return { focusableCount: focusables.length, noIndicator, offenders };
  });

  // --- touch targets (WCAG 2.5.5 / 2.5.8: 24px minimum) ---
  const smallTargets = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll('a[href], button:not([disabled])').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      if (r.width < 24 || r.height < 24) {
        out.push(`${el.tagName}.${(el.className || '').toString().split(' ')[0]} ${Math.round(r.width)}x${Math.round(r.height)}`);
      }
    });
    return out.slice(0, 6);
  });

  console.log(`\n=== ${route} ===`);
  console.log(`  skip link on first Tab : ${skip ? `"${skip.text}" -> ${skip.href} (visible: ${skip.onScreen})` : 'NONE'}`);
  console.log(`  focusable elements     : ${focusReport.focusableCount}`);
  console.log(
    `  without focus indicator: ${focusReport.noIndicator}` +
      (focusReport.offenders.length ? `  e.g. ${focusReport.offenders.join(', ')}` : '')
  );
  console.log(`  targets < 24px         : ${smallTargets.length ? smallTargets.join(' | ') : 'none'}`);

  await ctx.close();
}

// --- reduced motion: animations must not run ---
const rm = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
const p = await rm.newPage();
await p.goto(BASE + '/', { waitUntil: 'domcontentloaded', timeout: 90000 });
await p.waitForTimeout(3000);
const motion = await p.evaluate(() => {
  const running = [];
  document.querySelectorAll('*').forEach((el) => {
    const a = el.getAnimations ? el.getAnimations() : [];
    for (const an of a) {
      if (an.playState === 'running') {
        running.push(el.tagName + '.' + (el.className || '').toString().split(' ')[0]);
      }
    }
  });
  const v = document.getElementById('ipekci-hero-video');
  return {
    runningAnimations: [...new Set(running)].slice(0, 6),
    runningCount: running.length,
    heroVideoPlaying: v ? !v.paused : null,
  };
});
console.log('\n=== prefers-reduced-motion: reduce (homepage) ===');
console.log('  running animations:', motion.runningCount, motion.runningAnimations.length ? motion.runningAnimations : '');
console.log('  hero video playing:', motion.heroVideoPlaying);

await browser.close();
