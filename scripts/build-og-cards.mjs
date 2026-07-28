/**
 * Generates the 1200x630 Open Graph share cards.
 *
 * Rendered with Playwright rather than drawn programmatically so the cards use
 * the site's real typefaces (Playfair Display + Outfit) and real photography —
 * a hand-drawn card would not match the brand.
 *
 * Output: public/og/{slug}.jpg, JPEG q82. WhatsApp is the strictest consumer:
 * it wants an absolute URL, and it silently drops images that are too heavy,
 * so every card is checked against a 300 KB budget.
 *
 *   node scripts/build-og-cards.mjs
 */
import { chromium } from "playwright";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs/promises";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ASSETS = path.join(ROOT, "src", "assets", "ayat");
const OUT = path.join(ROOT, "public", "og");
const SIZE = { width: 1200, height: 630 };
const MAX_KB = 300;

const asset = (f) => pathToFileURL(path.join(ASSETS, f)).href;

/** eyebrow / title / blurb / background — one card per shareable route. */
const CARDS = [
  {
    slug: "home",
    eyebrow: "Vleesgroothandel · Watergang",
    title: "Premium Halal vleesproducten",
    blurb: "Döner, shoarma, gevogelte en vleessoorten voor horeca, retail en supermarkten.",
    bg: "hero-slide-1-premium.jpg",
  },
  {
    slug: "producten",
    eyebrow: "Assortiment",
    title: "Acht categorieën, één standaard",
    blurb: "34 Halal producten onder NVWA-normen en ECC Halal-toezicht.",
    bg: "explorer-stage.webp",
  },
  {
    slug: "doner",
    eyebrow: "Producten",
    title: "Döner",
    blurb: "Kombidöner, kipdöner, gehaktdöner en kalfsdöner.",
    bg: "explorer-doner.webp",
  },
  {
    slug: "shoarma",
    eyebrow: "Producten",
    title: "Shoarma",
    blurb: "Kalkoen, kip, mix en kalfsshoarma, authentiek gekruid.",
    bg: "explorer-shoarma.webp",
  },
  {
    slug: "gevogelte",
    eyebrow: "Producten",
    title: "Gevogelte",
    blurb: "Negen kip- en kalkoenproducten uit eigen productie.",
    bg: "explorer-gevogelte.webp",
  },
  {
    slug: "vleessoorten",
    eyebrow: "Producten",
    title: "Vleessoorten",
    blurb: "Gehakt, spareribs, hamburger, köfte en Adana köfte.",
    bg: "explorer-vleessoorten.webp",
  },
  {
    slug: "diepvriesproducten",
    eyebrow: "Producten",
    title: "Diepvriesproducten",
    blurb: "Vers ingevroren, langer houdbaar, direct inzetbaar.",
    bg: "explorer-diepvries.webp",
  },
  {
    slug: "turkse-pizza",
    eyebrow: "Producten",
    title: "Turkse pizza",
    blurb: "Lahmacun. Wij leveren alle ingrediënten.",
    bg: "explorer-turkse-pizza.webp",
  },
  {
    slug: "gegrilde-producten",
    eyebrow: "Producten",
    title: "Gegrilde producten",
    blurb: "Voorgegaard en gegrild, vers of bevroren leverbaar.",
    bg: "explorer-gegrild.webp",
  },
  {
    slug: "tortilla-durum",
    eyebrow: "Producten",
    title: "Tortilla Dürüm",
    blurb: "Dun, flexibel platbrood. Letterlijk ‘opgerold’.",
    bg: "explorer-durum.webp",
  },
  {
    slug: "ons-verhaal",
    eyebrow: "Over ons",
    title: "Ayat Food Vleesgroothandel",
    blurb: "24/7 service, een modern wagenpark en strikte kwaliteitscontrole.",
    bg: "story-primary-ayat.webp",
  },
  {
    slug: "vacatures",
    eyebrow: "Werk & inkomen",
    title: "De leukste banen voor jou",
    blurb: "Bekijk de openstaande vacatures van Ayat Food in Watergang.",
    bg: "hero-processing.jpg",
  },
  {
    slug: "contact",
    eyebrow: "Contact",
    title: "Uw partner in premium Halal vlees",
    blurb: "De Dollard 3, 1454 AT Watergang · +31 (0) 20 334 5115",
    bg: "hero-vlees.jpg",
  },
  {
    slug: "voor-wie",
    eyebrow: "Onze klanten",
    title: "Voor restaurants, retail en groothandel",
    blurb: "Slagerijen, groothandels, supermarkten en restaurants.",
    bg: "ayat-segment-restaurants.webp",
  },
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const html = (c) => `<!doctype html>
<html lang="nl"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Outfit:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:${SIZE.width}px;height:${SIZE.height}px;overflow:hidden;background:#050505;
       font-family:'Outfit',system-ui,sans-serif;position:relative}
  .bg{position:absolute;inset:0}
  .bg img{width:100%;height:100%;object-fit:cover;filter:brightness(.62) contrast(1.05) saturate(1.08)}
  /* Layered grade: bottom scrim carries the copy, brand wash on the left,
     warm key light top-right — same treatment as the site's heroes. */
  .grade{position:absolute;inset:0}
  .g1{background:linear-gradient(105deg,rgba(4,4,4,.96) 0%,rgba(4,4,4,.88) 34%,rgba(4,4,4,.42) 58%,rgba(4,4,4,.12) 78%,transparent 100%)}
  .g2{background:radial-gradient(ellipse 68% 58% at 2% 96%,rgba(179,18,23,.30),transparent 60%)}
  .g3{background:radial-gradient(ellipse 60% 52% at 92% 4%,rgba(255,241,222,.14),transparent 60%)}
  .g4{background:linear-gradient(to top,rgba(4,4,4,.72),transparent 26%)}
  .edge{position:absolute;inset-inline:0;top:0;height:3px;
        background:linear-gradient(90deg,transparent,rgba(226,192,141,.85),rgba(218,41,42,.9),transparent)}
  .wrap{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:space-between;padding:64px 72px}
  .top{display:flex;align-items:center;justify-content:space-between;gap:24px}
  .logo{height:86px;width:auto;filter:drop-shadow(0 10px 30px rgba(0,0,0,.6))}
  .halal{display:inline-flex;align-items:center;gap:12px;border:1px solid rgba(226,192,141,.42);
         background:rgba(6,6,6,.52);border-radius:999px;padding:12px 22px;
         font-size:15px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;
         color:rgba(240,226,202,.96)}
  .halal i{width:9px;height:9px;border-radius:999px;background:#da292a;display:block}
  .eyebrow{font-size:17px;font-weight:600;letter-spacing:.3em;text-transform:uppercase;color:#f0785a}
  .rule{width:96px;height:2px;margin:18px 0 20px;
        background:linear-gradient(90deg,rgba(226,192,141,.95),rgba(218,41,42,.5),transparent)}
  h1{font-family:'Playfair Display',Georgia,serif;font-weight:600;color:#fff;
     font-size:${c.title.length > 26 ? 62 : 78}px;line-height:1.04;letter-spacing:-.025em;
     max-width:15ch;text-shadow:0 16px 44px rgba(0,0,0,.6)}
  p{margin-top:20px;font-size:24px;line-height:1.5;color:rgba(255,255,255,.8);max-width:44ch}
  .foot{display:flex;align-items:center;gap:20px;font-size:16px;letter-spacing:.16em;
        text-transform:uppercase;color:rgba(255,255,255,.62);font-weight:500}
  .foot b{color:#fff;font-weight:600;letter-spacing:.1em}
  .dot{width:4px;height:4px;border-radius:999px;background:rgba(226,192,141,.7)}
</style></head>
<body>
  <div class="bg"><img src="${asset(c.bg)}" alt=""></div>
  <div class="grade g1"></div><div class="grade g2"></div>
  <div class="grade g3"></div><div class="grade g4"></div>
  <div class="edge"></div>
  <div class="wrap">
    <div class="top">
      <img class="logo" src="${asset("logo-transparent.png")}" alt="">
      <span class="halal"><i></i>100% Halal · ECC Halal</span>
    </div>
    <div>
      <div class="eyebrow">${esc(c.eyebrow)}</div>
      <div class="rule"></div>
      <h1>${esc(c.title)}</h1>
      <p>${esc(c.blurb)}</p>
    </div>
    <div class="foot">
      <b>Ayat Food</b><span class="dot"></span>
      <span>NVWA-normen</span><span class="dot"></span>
      <span>Snelle levering</span><span class="dot"></span>
      <span>Watergang</span>
    </div>
  </div>
</body></html>`;

await fs.mkdir(OUT, { recursive: true });
// The card HTML is written next to the assets and opened over file://.
// page.setContent() gives the document an about:blank origin, from which the
// browser refuses to load file:// subresources — the photos and logo silently
// came out blank. Navigating to a real file:// document fixes that.
const TMP = path.join(ROOT, ".og-build");
await fs.mkdir(TMP, { recursive: true });

const browser = await chromium.launch({ args: ["--allow-file-access-from-files"] });
const page = await browser.newPage({ viewport: SIZE, deviceScaleFactor: 1 });

let worst = 0;
for (const card of CARDS) {
  const tmpFile = path.join(TMP, `${card.slug}.html`);
  await fs.writeFile(tmpFile, html(card), "utf8");
  await page.goto(pathToFileURL(tmpFile).href, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  // fail loudly rather than shipping a card with a missing photo
  const broken = await page.evaluate(
    () => [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).length,
  );
  if (broken) throw new Error(`${card.slug}: ${broken} image(s) failed to load`);
  await page.waitForTimeout(180);
  const file = path.join(OUT, `${card.slug}.jpg`);
  await page.screenshot({ path: file, type: "jpeg", quality: 82 });
  const kb = (await fs.stat(file)).size / 1024;
  worst = Math.max(worst, kb);
  console.log(
    `  ${kb > MAX_KB ? "OVER" : " ok "} ${String(Math.round(kb)).padStart(4)} KB  og/${card.slug}.jpg`,
  );
}
await browser.close();
await fs.rm(TMP, { recursive: true, force: true });

console.log(`\n${CARDS.length} cards, largest ${Math.round(worst)} KB (budget ${MAX_KB} KB)`);
if (worst > MAX_KB) {
  console.error("A card exceeds the WhatsApp budget. Lower the JPEG quality.");
  process.exit(1);
}
