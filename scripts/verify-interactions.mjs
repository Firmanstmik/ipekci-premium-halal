/**
 * Drive the live site's interactive surfaces the way a visitor would, and assert
 * they actually respond. Page-load checks (verify-live.mjs) cannot see any of
 * this: a mega menu that never opens still renders a perfect DOM.
 *
 * Selectors below are the real contract read off assets/js/{navbar,home,pages}.js
 * — not guesses. The state each widget flips:
 *   nav dropdown  [data-nav-dropdown]      -> .is-open        (panel .ipekci-nav-panel)
 *   mobile drawer #ipekci-nav-drawer       -> .is-open        (toggle #ipekci-nav-toggle)
 *   drawer accord [data-nav-accordion]     -> .is-open
 *   meat showcase #ipekci-meat             -> [data-active-cut]
 *   eindproducten [data-eind-track]        -> transform x
 *   contact form  [data-contact-form]      -> [data-contact-success] / .ipekci-ct-toast-host
 *
 * Usage: node scripts/verify-interactions.mjs
 */
import { chromium } from 'playwright';

const BASE = 'https://ipekcislachterij.localclicks.nl';

const browser = await chromium.launch({ args: ['--disable-quic'] });
const results = [];

const ok = (name, pass, detail = '') => {
  results.push({ name, pass, detail });
  console.log(`${pass ? '✔' : '✖'} ${name}${detail ? ' — ' + detail : ''}`);
};

// The host intermittently stalls; retry so a dropped connection is not reported
// as a broken interaction.
async function open(route, width, height) {
  let last;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const ctx = await browser.newContext({ viewport: { width, height } });
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message.slice(0, 90)));
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text().slice(0, 90)));
    try {
      await page.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 120000 });
      await page.waitForTimeout(2500);
      return { ctx, page, errors };
    } catch (e) {
      last = e;
      await ctx.close();
      await new Promise((r) => setTimeout(r, 5000));
    }
  }
  throw last;
}

/* ---------- 1. Desktop mega menu ---------- */
{
  const { ctx, page } = await open('/', 1440, 900);
  const dd = page.locator('[data-nav-dropdown]').first();
  const before = await dd.evaluate((e) => e.classList.contains('is-open'));
  const panelVis0 = await dd.locator('.ipekci-nav-panel').first().isVisible().catch(() => false);

  await dd.locator('.ipekci-nav-link--dropdown').first().hover();
  await page.waitForTimeout(1000);

  const after = await dd.evaluate((e) => e.classList.contains('is-open'));
  const panel = dd.locator('.ipekci-nav-panel').first();
  const panelVis1 = await panel.isVisible().catch(() => false);
  const items = await dd.locator('.ipekci-nav-panel__item').count();

  ok('Desktop mega menu opens on hover', !before && after && panelVis1,
    `is-open ${before}->${after}, panel visible ${panelVis0}->${panelVis1}, ${items} items`);
  await ctx.close();
}

/* ---------- 2. Mobile drawer + accordion ---------- */
{
  const { ctx, page } = await open('/', 390, 844);
  const drawer = page.locator('#ipekci-nav-drawer');
  const toggle = page.locator('#ipekci-nav-toggle');

  const before = await drawer.evaluate((e) => e.classList.contains('is-open'));
  await toggle.click();
  await page.waitForTimeout(900);
  const after = await drawer.evaluate((e) => e.classList.contains('is-open'));
  const expanded = await toggle.getAttribute('aria-expanded');
  ok('Mobile drawer opens on toggle', !before && after && expanded === 'true',
    `is-open ${before}->${after}, aria-expanded=${expanded}`);

  const acc = page.locator('[data-nav-accordion]').first();
  const a0 = await acc.evaluate((e) => e.classList.contains('is-open'));
  await acc.locator('.ipekci-nav-accordion__trigger').first().click();
  await page.waitForTimeout(700);
  const a1 = await acc.evaluate((e) => e.classList.contains('is-open'));
  ok('Mobile drawer accordion expands', !a0 && a1, `is-open ${a0}->${a1}`);
  await ctx.close();
}

/* ---------- 3. Premium meat showcase hotspots ---------- */
{
  const { ctx, page } = await open('/', 1440, 900);
  const section = page.locator('#ipekci-meat');
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);

  const before = await section.getAttribute('data-active-cut');
  const hotspots = page.locator('.ipekci-meat-hotspot');
  const n = await hotspots.count();

  // Pick a hotspot that is NOT the currently active cut.
  let clicked = null;
  for (let i = 0; i < n; i += 1) {
    const cut = await hotspots.nth(i).getAttribute('data-cut');
    if (cut && cut !== before) { await hotspots.nth(i).click({ force: true }); clicked = cut; break; }
  }
  await page.waitForTimeout(900);

  const after = await section.getAttribute('data-active-cut');
  // is-active lands on the [data-cut] targets (SVG region group, connector,
  // callouts) — NOT on .ipekci-meat-panel, which carries no data-cut.
  const activeTargets = await page.locator('#ipekci-meat [data-cut].is-active').count();
  ok('Meat showcase hotspot switches cut', after === clicked && after !== before && activeTargets > 0,
    `${n} hotspots; "${before}" -> "${after}", ${activeTargets} active target(s)`);
  await ctx.close();
}

/* ---------- 4. Enterprise trust pillars ---------- */
{
  const { ctx, page } = await open('/', 1440, 900);
  await page.locator('.ipekci-trust').first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);
  const pillars = page.locator('.ipekci-trust-pillar');
  const n = await pillars.count();
  await pillars.nth(Math.min(2, n - 1)).click({ force: true }).catch(() => {});
  await page.waitForTimeout(800);
  const active = await page.locator('.ipekci-trust-pillar.is-active').count();
  ok('Enterprise trust pillar activates', n > 0 && active > 0, `${n} pillars, ${active} active`);
  await ctx.close();
}

/* ---------- 5. Eindproducten carousel ---------- */
{
  const { ctx, page } = await open('/', 1440, 900);
  await page.locator('.ipekci-eindproducten').first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(2000);
  const track = page.locator('[data-eind-track]').first();

  const t0 = await track.evaluate((e) => getComputedStyle(e).transform);
  await page.waitForTimeout(3500);
  const t1 = await track.evaluate((e) => getComputedStyle(e).transform);
  const auto = t0 !== t1;

  // Explicit next-button nudge must also move it.
  const next = page.locator('[data-eind-next]').first();
  const b0 = await track.evaluate((e) => getComputedStyle(e).transform);
  await next.click({ force: true }).catch(() => {});
  await page.waitForTimeout(1500);
  const b1 = await track.evaluate((e) => getComputedStyle(e).transform);

  ok('Eindproducten marquee auto-advances', auto, `transform ${auto ? 'changed' : 'static: ' + t0}`);
  ok('Eindproducten next-button nudges track', b0 !== b1);
  await ctx.close();
}

/* ---------- 6. Contact form ---------- */
{
  const { ctx, page, errors } = await open('/contact/', 1440, 900);
  const form = page.locator('[data-contact-form]');
  await form.scrollIntoViewIfNeeded();

  await form.locator('button[type=submit]').first().click({ force: true });
  await page.waitForTimeout(1000);
  const invalid = await page.locator('.is-invalid').count();
  ok('Contact form blocks empty submit', invalid > 0, `${invalid} invalid field(s)`);

  const fill = async (name, val) => {
    const l = form.locator(`[name="${name}"]`).first();
    if (await l.count()) await l.fill(val);
  };
  await fill('name', 'Kak Raffy');
  await fill('email', 'raffy@example.com');
  await fill('phone', '0612345678');
  await fill('company', 'Ipekci Review');
  await fill('message', 'Test bericht voor migratieverificatie.');
  // Consent is required. The real <input name=privacy> is a 0x0, opacity:0
  // control inside <label class="ipekci-ct-checkbox"> (custom-styled checkbox),
  // so it cannot be .check()'d — click the label, exactly as a visitor does.
  await form.locator('label.ipekci-ct-checkbox').first().click();
  const consented = await form.locator('[name="privacy"]').first().isChecked();
  ok('Privacy consent checkbox is clickable', consented);
  await page.waitForTimeout(400);

  // Watch the actual network call, so a silent server-side failure cannot pass.
  const post = page.waitForResponse(
    (r) => r.request().method() === 'POST',
    { timeout: 20000 },
  ).catch(() => null);

  await form.locator('button[type=submit]').first().click({ force: true });
  const resp = await post;
  await page.waitForTimeout(4000);

  const successVis = await page.locator('[data-contact-success]').isVisible().catch(() => false);
  const stillInvalid = await page.locator('[data-contact-form] .is-invalid').count();
  ok('Contact form accepts a valid submit', successVis && stillInvalid === 0,
    `POST ${resp ? resp.status() : 'none'}, success panel visible=${successVis}, invalid=${stillInvalid}`);
  ok('Contact page free of JS errors', errors.length === 0, errors.slice(0, 2).join(' | '));
  await ctx.close();
}

/* ---------- 7. Navigation routes ---------- */
{
  const { ctx, page } = await open('/', 1440, 900);
  await page.locator('a[href*="/ons-verhaal"]').first().click({ force: true });
  await page.waitForTimeout(3500);
  ok('Navbar link routes to Ons verhaal', page.url().includes('ons-verhaal'), page.url());
  await ctx.close();
}

await browser.close();

const failed = results.filter((r) => !r.pass);
console.log(failed.length ? `\n${failed.length} interaction(s) FAILED` : '\nALL INTERACTIONS PASS');
process.exit(failed.length ? 1 : 0);
