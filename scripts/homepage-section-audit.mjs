/**
 * Fresh homepage + navbar section audit: React vs live WP.
 * Captures viewport screenshots per section (scroll-into-view).
 *
 * Usage: node scripts/homepage-section-audit.mjs
 *        node scripts/homepage-section-audit.mjs --viewports 1920,768,390
 */
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const REACT = process.env.REACT_URL ?? 'http://localhost:3000';
const WP = process.env.WP_URL ?? 'https://ipekcislachterij.localclicks.nl';
const OUT = '.visual-qa/homepage-audit';

const ALL_VPS = [
  { w: 1920, h: 1080, name: '1920' },
  { w: 1600, h: 900, name: '1600' },
  { w: 1440, h: 900, name: '1440' },
  { w: 1280, h: 800, name: '1280' },
  { w: 1024, h: 768, name: '1024' },
  { w: 768, h: 1024, name: '768' },
  { w: 390, h: 844, name: '390' },
];

const SECTIONS = [
  {
    id: 'navbar',
    react: ['div.fixed.inset-x-0.top-0.z-50', '#ipekci-nav', '.ipekci-nav'],
    wp: ['#ipekci-nav', '.ipekci-nav'],
    fullWidth: true,
  },
  {
    id: 'hero',
    react: ['[data-story-chapter="introduction"]', '.ipekci-hero', '#ipekci-hero'],
    wp: ['#ipekci-hero', '.ipekci-hero', '[data-story-chapter="introduction"]'],
  },
  {
    id: 'enterprise-trust',
    react: ['section[aria-labelledby="enterprise-trust-heading"]', '.ipekci-trust'],
    wp: ['.ipekci-trust', 'section.ipekci-trust'],
  },
  {
    id: 'speerpunten',
    react: ['#speerpunten', '.speerpunten-section', '.ipekci-speerpunten'],
    wp: ['.ipekci-speerpunten', '#speerpunten', '.speerpunten-section'],
  },
  {
    id: 'premium-meat',
    react: ['#meat-explorer', '.ipekci-meat', '#ipekci-meat'],
    wp: ['.ipekci-meat', '#meat-explorer', '#ipekci-meat'],
  },
  {
    id: 'over-ons',
    react: ['#over-ons', '.story-section--editorial', '.ipekci-overons'],
    wp: ['#over-ons', '.ipekci-overons', '.story-section--editorial'],
  },
  {
    id: 'assortiment',
    react: ['.ipekci-assortiment', '#ipekci-assortiment', '#ons-assortiment'],
    wp: ['.ipekci-assortiment', '#ipekci-assortiment', '#ons-assortiment'],
  },
  {
    id: 'voor-wie',
    react: ['#ipekci-voorwie', '#segments', '.ipekci-voorwie'],
    wp: ['#ipekci-voorwie', '#segments', '.ipekci-voorwie'],
  },
  {
    id: 'eindproducten',
    react: ['[data-story-chapter="finished-products"]', '.ipekci-eindproducten', '#products'],
    wp: ['[data-story-chapter="finished-products"]', '.ipekci-eindproducten', '#products'],
  },
  {
    id: 'footer',
    react: ['footer.ipekci-footer', 'footer'],
    wp: ['footer.ipekci-footer', 'footer'],
    clipHeight: 520,
    fullWidth: true,
  },
];

const vpArg = process.argv.find((a, i) => process.argv[i - 1] === '--viewports');
const VP_NAMES = vpArg ? vpArg.split(',').map((s) => s.trim()) : ['1920', '1440', '768', '390'];
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

async function captureSection(page, section, vp, selectors) {
  let target = null;
  for (const s of selectors) {
    const loc = page.locator(s).first();
    if ((await loc.count()) > 0) {
      const box = await loc.boundingBox().catch(() => null);
      if (box && box.height > 20) {
        target = loc;
        break;
      }
    }
  }
  if (!target) return { error: 'selector not found' };

  await target.scrollIntoViewIfNeeded({ timeout: 15000 }).catch(() => {});
  // Pin section top to the viewport top so clips never start mid-section
  // (scrollIntoViewIfNeeded can leave box.y negative → Math.max(0,y) crops the head).
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
  await page.waitForTimeout(200);
  await page.evaluate((hideNav) => {
    document.querySelectorAll('.story-reveal').forEach((el) => el.classList.add('is-visible'));
    // Force lazy images to load — toggling loading=eager alone does not re-fetch in Chromium.
    document.querySelectorAll('img[loading="lazy"], img:not([src])').forEach((img) => {
      img.loading = 'eager';
      const src = img.getAttribute('src') || img.dataset.src || '';
      if (src) {
        img.removeAttribute('loading');
        img.setAttribute('src', src);
      }
    });
    // Finish typewriter animations so React/WP land on the same steady state.
    document.querySelectorAll('[data-typewriter]').forEach((el) => {
      const full = el.getAttribute('data-typewriter');
      if (!full) return;
      el.setAttribute('data-typewriter-done', '1');
      const textTarget = el.querySelector('.ipekci-voorwie__heading-text') || el.querySelector('[data-typewriter-text]');
      if (textTarget) textTarget.textContent = full;
      el.querySelectorAll('.ipekci-voorwie__heading-caret').forEach((c) => c.remove());
    });
    document.querySelectorAll('h2[aria-label]').forEach((h2) => {
      const full = h2.getAttribute('aria-label');
      if (!full || full.length < 10) return;
      const current = (h2.textContent || '').replace(/\s+/g, ' ').trim();
      if (current.length >= full.length) return;
      h2.textContent = full;
    });
    // Speerpunten bars animate via IntersectionObserver / Framer — force final widths.
    const SPEER_TARGETS = {
      'Snelle levertijd': 94,
      'Hoge kwaliteit': 98,
      '100% halal': 100,
      'Klant staat centraal': 100,
      'Hoge hygiene': 99,
      'Hoge hygiëne': 99,
      'Hoge service': 92,
    };
    document.querySelectorAll('[data-speerpunt-bar]').forEach((bar) => {
      const target = parseFloat(bar.getAttribute('data-value') || '0');
      const fill = bar.querySelector('[data-speerpunt-fill]');
      const label = bar.querySelector('[data-speerpunt-value]');
      if (fill) fill.style.width = `${Math.max(0, Math.min(100, target))}%`;
      if (label) label.textContent = `${Math.round(target)}%`;
      bar.classList.add('is-active');
    });
    // React SpeerpuntBar: motion fill is absolute inset-y-0 left-0 inside the track.
    document.querySelectorAll('#speerpunten .group, .speerpunten-section .group').forEach((row) => {
      const labelEl = row.querySelector('span');
      const label = (labelEl?.textContent || '').trim();
      const target = SPEER_TARGETS[label];
      if (target == null) return;
      const fill = row.querySelector('.relative > div, .relative > span, [style*="width"]');
      const track = row.querySelector('.relative');
      const motionFill = track?.querySelector('div');
      if (motionFill instanceof HTMLElement) {
        motionFill.style.width = `${target}%`;
      }
      const valueEl = row.querySelector('.font-display, [class*="tabular-nums"]');
      if (valueEl) valueEl.textContent = `${target}%`;
    });
    // Over Ons experience counter: React resets to 0 until inView animation finishes.
    document.querySelectorAll('.over-ons-proof .tabular-nums, .over-ons-proof__stat-num').forEach((el) => {
      const raw = (el.textContent || '').replace(/[^\d]/g, '');
      if (!raw || Number(raw) < 10) el.textContent = el.classList.contains('over-ons-proof__stat-num') ? '10+' : '10';
    });
    // WP admin bar shifts every section clip — hide during audit.
    document.getElementById('wpadminbar')?.style.setProperty('display', 'none', 'important');
    document.documentElement.classList.remove('admin-bar');
    document.body?.style.setProperty('margin-top', '0', 'important');
    // Sticky nav overlays section clips — hide during non-navbar captures.
    if (hideNav) {
      document.querySelectorAll('#ipekci-nav, .ipekci-nav, .fixed.inset-x-0.top-0.z-50').forEach((el) => {
        el.style.setProperty('visibility', 'hidden', 'important');
      });
    }
    document.querySelectorAll('body *').forEach((el) => {
      const s = getComputedStyle(el);
      if (s.position !== 'fixed' || parseFloat(s.bottom) > 8) return;
      if (el.offsetHeight > 140 || el.offsetHeight < 40) return;
      const t = (el.textContent || '').toLowerCase();
      if (t.includes('bel direct') || t.includes('word klant')) {
        el.style.setProperty('display', 'none', 'important');
      }
    });
  }, section.id !== 'navbar');
  // Wait for forced image loads + bar paints.
  await page.waitForTimeout(
    section.id === 'eindproducten' || section.id === 'premium-meat'
      ? 1400
      : section.id === 'over-ons'
        ? 1800
        : 500,
  );

  if (section.id === 'over-ons') {
    await page.evaluate(() => {
      document.querySelectorAll('.over-ons-proof .tabular-nums, .over-ons-proof__stat-num').forEach((el) => {
        if (el.classList.contains('over-ons-proof__stat-num')) {
          el.textContent = '10+';
        } else {
          el.textContent = '10';
        }
      });
    });
    await page.waitForTimeout(200);
  }
  // Allow in-flight typewriters to finish, then force the steady-state text again.
  if (section.id === 'voor-wie') {
    await page.waitForTimeout(2800);
    await page.evaluate(() => {
      document.querySelectorAll('[data-typewriter]').forEach((el) => {
        const full = el.getAttribute('data-typewriter');
        if (!full) return;
        const textTarget = el.querySelector('.ipekci-voorwie__heading-text');
        if (textTarget) textTarget.textContent = full;
        el.querySelectorAll('.ipekci-voorwie__heading-caret').forEach((c) => c.remove());
      });
      document.querySelectorAll('h2[aria-label]').forEach((h2) => {
        const full = h2.getAttribute('aria-label');
        if (!full || full.length < 10) return;
        h2.textContent = full;
      });
    });
  }
  await page.waitForTimeout(900);

  if (section.id === 'navbar') {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);
    // Transparent nav composites the hero — pin BG slide 0 without clearing
    // page-wide timers (that would starve later section captures).
    await page.evaluate(() => {
      const root = document.querySelector(
        '#ipekci-hero, [data-story-chapter="introduction"], .ipekci-hero',
      );
      if (!root) return;
      root.querySelectorAll('.ipekci-hero__bg-slide').forEach((slide, i) => {
        slide.classList.toggle('is-active', i === 0);
        if (slide instanceof HTMLElement) {
          slide.style.opacity = i === 0 ? '1' : '0';
          slide.style.transition = 'none';
        }
      });
      root.querySelectorAll('.ipekci-hero__bg-tab').forEach((tab, i) => {
        tab.classList.toggle('is-active', i === 0);
      });
      const bgTabs = [...root.querySelectorAll('[role="tab"]')];
      if (bgTabs[0] instanceof HTMLElement) bgTabs[0].click();
    });
    await page.waitForTimeout(500);
  }

  // Hero autoplay makes React/WP land on different showcase slides — pin slide 0.
  if (section.id === 'hero') {
    await page.evaluate(() => {
      const root = document.querySelector(
        '#ipekci-hero, [data-story-chapter="introduction"], .ipekci-hero',
      );
      if (!root) return;

      // Pause WP autoplay timers / React intervals for a stable clip.
      root.querySelectorAll('[data-autoplay-ms]').forEach((el) => {
        el.setAttribute('data-autoplay-ms', '86400000');
        el.setAttribute('data-audit-paused', '1');
      });
      const highest = window.setTimeout(() => {}, 0);
      for (let i = 0; i <= highest; i++) {
        window.clearInterval(i);
        window.clearTimeout(i);
      }

      // WP background crossfade (separate from product showcase)
      root.querySelectorAll('.ipekci-hero__bg-slide').forEach((slide, i) => {
        slide.classList.toggle('is-active', i === 0);
        if (slide instanceof HTMLElement) {
          slide.style.opacity = i === 0 ? '1' : '0';
        }
      });
      root.querySelectorAll('.ipekci-hero__bg-tab').forEach((tab, i) => {
        tab.classList.toggle('is-active', i === 0);
      });

      // WP thumbs (canonical class)
      const wpThumbs = root.querySelectorAll(
        '.ipekci-hero-showcase__thumb, .ipekci-hero-thumb, [data-hero-thumb]',
      );
      wpThumbs.forEach((t, i) => {
        t.classList.toggle('is-active', i === 0);
        if (t instanceof HTMLElement) {
          t.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
          if (i === 0) t.click();
        }
      });

      // React background tabs (role=tab)
      const bgTabs = [...root.querySelectorAll('[role="tab"]')];
      if (bgTabs[0] instanceof HTMLElement) bgTabs[0].click();

      // React thumbs — aria-label starts with "Bekijk " (not the CTA text node)
      const reactThumbs = [...root.querySelectorAll('button[aria-label^="Bekijk "]')];
      if (reactThumbs[0] instanceof HTMLElement) reactThumbs[0].click();
      reactThumbs.forEach((t, i) => t.setAttribute('aria-pressed', i === 0 ? 'true' : 'false'));

      root.querySelectorAll('.ipekci-hero-showcase__image').forEach((img, i) => {
        img.classList.toggle('is-active', i === 0);
      });
      root.querySelectorAll('.ipekci-hero-showcase__caption-item').forEach((el, i) => {
        el.classList.toggle('is-active', i === 0);
      });

      // Finish entrance animations so opacity/blur settle before clip.
      root.querySelectorAll('.ipekci-hero__headline-line, .ipekci-hero__lede, .ipekci-hero__cta-row, .ipekci-hero__trust').forEach((el) => {
        if (el instanceof HTMLElement) {
          el.style.opacity = '1';
          el.style.transform = 'none';
          el.style.filter = 'none';
          el.style.animation = 'none';
          el.style.clipPath = 'none';
        }
      });
    });
    await page.waitForTimeout(800);
  }

  // Framer Motion / story items: force settled opacity+transform so React
  // whileInView residuals don't inflate diffs (esp. eindproducten unicards).
  if (section.id !== 'navbar') {
    await page.evaluate(() => {
      document.querySelectorAll('[style*="opacity"], [style*="transform"], .story-item, [data-framer-appear-id]').forEach((el) => {
        if (!(el instanceof HTMLElement)) return;
        const s = el.style;
        // Only clear residual animation styles — don't wipe intentional layout transforms.
        if (s.opacity === '0' || (s.opacity && parseFloat(s.opacity) < 0.95)) {
          s.opacity = '1';
        }
        if (s.transform && s.transform !== 'none' && /translate|scale|blur/i.test(s.transform)) {
          s.transform = 'none';
        }
        if (s.filter && s.filter !== 'none') s.filter = 'none';
      });
      // Motion components often leave opacity on the element via inline style from Framer.
      document.querySelectorAll('article, [data-story-chapter] h2, [data-story-chapter] h3, [data-story-chapter] p').forEach((el) => {
        if (!(el instanceof HTMLElement)) return;
        const op = getComputedStyle(el).opacity;
        if (parseFloat(op) < 0.95) {
          el.style.opacity = '1';
          el.style.transform = 'none';
        }
      });
    });
  }

  const box = await target.boundingBox();
  if (!box) return { error: 'no bounding box' };

  const clip = section.clipHeight
    ? { x: 0, y: Math.max(0, box.y), width: vp.w, height: Math.min(section.clipHeight, vp.h) }
    : section.fullWidth
      ? {
          x: 0,
          y: Math.max(0, box.y - (section.id === 'navbar' ? 0 : 4)),
          width: vp.w,
          height: Math.min(vp.h - 20, box.height + 8),
        }
      : {
          x: Math.max(0, box.x - 8),
          y: Math.max(0, box.y - (section.id === 'navbar' ? 0 : 4)),
          width: Math.min(vp.w, box.width + 16),
          height: Math.min(vp.h - 20, box.height + 8),
        };

  return { clip };
}

async function runSite(browser, base, label, vp) {
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
  const page = await ctx.newPage();
  await page.goto(`${base}/?audit=${Date.now()}`, { waitUntil: 'domcontentloaded', timeout: 240000 });
  await page.waitForTimeout(4000);
  await page.addStyleTag({ content: '#wpadminbar{display:none!important} html{margin-top:0!important}' });
  // Don't let a hung webfont block every screenshot for 30s.
  await page.evaluate(() =>
    Promise.race([
      document.fonts?.ready ?? Promise.resolve(),
      new Promise((r) => setTimeout(r, 3000)),
    ]),
  );

  const results = {};
  for (const section of SECTIONS) {
    const file = path.join(OUT, `${section.id}_${vp.name}_${label}.png`);
    const selectors = label === 'react' ? section.react : section.wp;
    try {
      const cap = await captureSection(page, section, vp, selectors);
      if (cap.error) {
        results[section.id] = { error: cap.error };
        continue;
      }
      await page.screenshot({ path: file, clip: cap.clip, timeout: 90000 });
      results[section.id] = { file };
    } catch (e) {
      results[section.id] = { error: e.message };
    }
  }
  await ctx.close();
  return results;
}

const browser = await chromium.launch({ headless: true });
const report = { generatedAt: new Date().toISOString(), react: REACT, wp: WP, sections: {} };

for (const vp of VPs) {
  console.log(`\n=== viewport ${vp.name} ===`);
  const reactR = await runSite(browser, REACT, 'react', vp);
  const wpR = await runSite(browser, WP, 'wp', vp);

  for (const section of SECTIONS) {
    const id = section.id;
    if (!report.sections[id]) report.sections[id] = { viewports: {} };
    const reactFile = reactR[id]?.file;
    const wpFile = wpR[id]?.file;
    let diff = null;
    if (reactFile && wpFile) {
      diff = diffPct(reactFile, wpFile, path.join(OUT, `${id}_${vp.name}_diff.png`));
    }
    const entry = {
      diffPct: diff,
      reactError: reactR[id]?.error,
      wpError: wpR[id]?.error,
    };
    report.sections[id].viewports[vp.name] = entry;
    const status = diff !== null ? (diff < 3 ? 'CLOSE' : diff < 8 ? 'DIFF' : 'FAIL') : 'ERR';
    console.log(`  ${id.padEnd(18)} ${status.padEnd(5)} ${diff !== null ? diff + '%' : entry.reactError || entry.wpError || '?'}`);
  }
}

await browser.close();
fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));
console.log(`\nReport: ${OUT}/report.json`);
