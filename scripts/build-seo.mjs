/**
 * Post-build SEO / social pass.
 *
 * The app is a client-side SPA, so the meta the router sets at runtime never
 * reaches a crawler — WhatsApp, Facebook, LinkedIn, Slack and Googlebot's
 * first pass all read the raw HTML. Without this step every shared URL shows
 * the same homepage title and no image.
 *
 * For each route this writes a real HTML file that is byte-identical to the
 * SPA shell except for the <head>, so runtime behaviour is unchanged while
 * crawlers get accurate per-page metadata. Also emits robots.txt + sitemap.xml.
 *
 * Run automatically via `npm run build`. Override the origin when the client
 * moves to their own domain:
 *
 *   SITE_URL=https://ayatfood.nl npm run build
 */
import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const SITE = (process.env.SITE_URL || "https://ayatfood.vercel.app").replace(/\/$/, "");

/** Verified business details — mirrors src/lib/brand.ts. */
const BRAND = {
  name: "Ayat Food",
  legalName: "Ayat Food Vleesgroothandel",
  email: "info@ayatfood.nl",
  phone: "+31203345115",
  street: "De Dollard 3",
  postalCode: "1454 AT",
  city: "Watergang",
  country: "NL",
  facebook: "https://www.facebook.com/ayatvleesgroothandel/",
  instagram: "https://www.instagram.com/ayat_food_bv/",
};

const CATEGORIES = [
  [
    "doner",
    "Döner",
    "Kombidöner, kipdöner, gehaktdöner en kalfsdöner — verschillende soorten en smaken döner kebab.",
  ],
  [
    "shoarma",
    "Shoarma",
    "Kalkoen-, kip-, mix- en kalfsshoarma, authentiek gekruid en klaar om te bereiden.",
  ],
  [
    "gevogelte",
    "Gevogelte",
    "Negen kip- en kalkoenproducten uit eigen productie: filet, dij, blokjes, vleugels en nuggets.",
  ],
  [
    "vleessoorten",
    "Vleessoorten",
    "Rundergehakt, kalfsspareribs, hamburger, Adana köfte en köfte.",
  ],
  [
    "diepvriesproducten",
    "Diepvriesproducten",
    "Vers ingevroren gegrilde kip- en gehaktdöner in 1 kg en 2,5 kg verpakking.",
  ],
  [
    "turkse-pizza",
    "Turkse pizza",
    "Lahmacun — flinterdun deeg met gekruid gehakt. Wij leveren alle ingrediënten.",
  ],
  [
    "gegrilde-producten",
    "Gegrilde producten",
    "Voorgegaarde en gegrilde kip- en gehaktdöner, vers of bevroren leverbaar.",
  ],
  ["tortilla-durum", "Tortilla Dürüm", "Dun, flexibel platbrood als basis voor wraps en dürüm."],
];

/** route path -> title / description / og card / breadcrumb trail */
const ROUTES = [
  {
    url: "/",
    file: "index.html",
    title: "Ayat Food — Premium Halal Vleesgroothandel",
    description:
      "Hoogwaardige Halal vleesproducten: döner, shoarma, gevogelte en vleessoorten. 100% Halal, volgens NVWA-normen. Snelle levering voor horeca, retail en supermarkten.",
    og: "home",
    crumbs: [],
  },
  {
    url: "/producten",
    file: "producten.html",
    title: "Producten — Ayat Food Vleesgroothandel",
    description:
      "Het volledige Halal assortiment: döner, shoarma, gevogelte, vleessoorten, diepvriesproducten, Turkse pizza, gegrilde producten en tortilla dürüm — 34 producten onder ECC Halal-toezicht.",
    og: "producten",
    crumbs: [["Producten", "/producten"]],
  },
  ...CATEGORIES.map(([slug, label, description]) => ({
    url: `/producten/${slug}`,
    file: path.join("producten", `${slug}.html`),
    title: `${label} — Producten | Ayat Food`,
    description,
    og: slug,
    crumbs: [
      ["Producten", "/producten"],
      [label, `/producten/${slug}`],
    ],
  })),
  {
    url: "/ons-verhaal",
    file: "ons-verhaal.html",
    title: "Over ons — Ayat Food Vleesgroothandel",
    description:
      "Ayat Food Vleesgroothandel is het adres voor Halal döner kebab producten. 24/7 service, een modern wagenpark, NVWA-normen en ECC Halal-toezicht.",
    og: "ons-verhaal",
    crumbs: [["Over ons", "/ons-verhaal"]],
  },
  {
    url: "/vacatures",
    file: "vacatures.html",
    title: "Vacatures — Ayat Food Vleesgroothandel",
    description:
      "Ben je op zoek naar een uitdagende baan in het hoogstaande vleessegment? Bekijk de openstaande vacatures van Ayat Food in Watergang.",
    og: "vacatures",
    crumbs: [["Vacatures", "/vacatures"]],
  },
  {
    url: "/contact",
    file: "contact.html",
    title: "Contact — Ayat Food Vleesgroothandel",
    description:
      "Neem contact op met Ayat Food Vleesgroothandel in Watergang. De Dollard 3, 1454 AT · +31 (0) 20 334 5115 · info@ayatfood.nl.",
    og: "contact",
    crumbs: [["Contact", "/contact"]],
  },
  {
    url: "/voor-wie",
    file: "voor-wie.html",
    title: "Voor wie — Ayat Food Vleesgroothandel",
    description:
      "Halal vleesproducten voor slagerijen, groothandels, supermarkten en restaurants — met snelle levering en persoonlijke begeleiding.",
    og: "voor-wie",
    crumbs: [["Voor wie", "/voor-wie"]],
  },
];

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/* ── Structured data ─────────────────────────────────────────── */

const organization = {
  "@type": "Organization",
  "@id": `${SITE}/#organization`,
  name: BRAND.legalName,
  alternateName: BRAND.name,
  url: `${SITE}/`,
  logo: { "@type": "ImageObject", url: `${SITE}/ayat-logo.png` },
  email: BRAND.email,
  telephone: BRAND.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: BRAND.street,
    postalCode: BRAND.postalCode,
    addressLocality: BRAND.city,
    addressCountry: BRAND.country,
  },
  sameAs: [BRAND.facebook, BRAND.instagram],
};

/** A food wholesaler with a physical address — LocalBusiness is the right fit. */
const localBusiness = {
  "@type": "LocalBusiness",
  "@id": `${SITE}/#localbusiness`,
  name: BRAND.legalName,
  image: `${SITE}/og/home.jpg`,
  url: `${SITE}/`,
  email: BRAND.email,
  telephone: BRAND.phone,
  priceRange: "$$",
  address: organization.address,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "07:30",
      closes: "18:00",
    },
  ],
  sameAs: organization.sameAs,
};

const website = {
  "@type": "WebSite",
  "@id": `${SITE}/#website`,
  url: `${SITE}/`,
  name: BRAND.name,
  inLanguage: "nl-NL",
  publisher: { "@id": `${SITE}/#organization` },
};

function breadcrumbs(route) {
  if (!route.crumbs.length) return null;
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      ...route.crumbs.map(([name, url], i) => ({
        "@type": "ListItem",
        position: i + 2,
        name,
        item: `${SITE}${url}`,
      })),
    ],
  };
}

function graphFor(route) {
  const nodes = [organization, website];
  if (route.url === "/") nodes.push(localBusiness);
  const bc = breadcrumbs(route);
  if (bc) nodes.push(bc);
  if (route.url === "/producten") {
    nodes.push({
      "@type": "ItemList",
      name: "Productcategorieën",
      itemListElement: CATEGORIES.map(([slug, label], i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: label,
        url: `${SITE}/producten/${slug}`,
      })),
    });
  }
  return { "@context": "https://schema.org", "@graph": nodes };
}

/* ── Head block ──────────────────────────────────────────────── */

function head(route) {
  const url = `${SITE}${route.url}`;
  const img = `${SITE}/og/${route.og}.jpg`;
  const ld = JSON.stringify(graphFor(route)).replace(/</g, "\\u003c");

  return `
    <title>${esc(route.title)}</title>
    <meta name="description" content="${esc(route.description)}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:site_name" content="${esc(BRAND.name)}" />
    <meta property="og:locale" content="nl_NL" />
    <meta property="og:type" content="${route.url === "/" ? "website" : "article"}" />
    <meta property="og:title" content="${esc(route.title)}" />
    <meta property="og:description" content="${esc(route.description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${img}" />
    <meta property="og:image:secure_url" content="${img}" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${esc(route.title)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(route.title)}" />
    <meta name="twitter:description" content="${esc(route.description)}" />
    <meta name="twitter:image" content="${img}" />
    <script type="application/ld+json">${ld}</script>
  `.trim();
}

/* ── Emit ────────────────────────────────────────────────────── */

const shell = await fs.readFile(path.join(DIST, "index.html"), "utf8");
const START = "<!--seo:start-->";
const END = "<!--seo:end-->";
if (!shell.includes(START) || !shell.includes(END)) {
  throw new Error("SEO markers missing from dist/index.html — did index.html change?");
}
const before = shell.slice(0, shell.indexOf(START) + START.length);
const after = shell.slice(shell.indexOf(END));

for (const route of ROUTES) {
  const out = path.join(DIST, route.file);
  await fs.mkdir(path.dirname(out), { recursive: true });
  await fs.writeFile(out, `${before}\n${head(route)}\n    ${after}`, "utf8");
}

/* robots.txt */
await fs.writeFile(
  path.join(DIST, "robots.txt"),
  ["User-agent: *", "Allow: /", "", `Sitemap: ${SITE}/sitemap.xml`, ""].join("\n"),
  "utf8",
);

/* sitemap.xml — homepage first, then the catalogue, then the rest */
const today = new Date().toISOString().slice(0, 10);
const priority = (u) =>
  u === "/" ? "1.0" : u === "/producten" ? "0.9" : u.startsWith("/producten/") ? "0.8" : "0.7";
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...ROUTES.map((r) =>
    [
      "  <url>",
      `    <loc>${SITE}${r.url}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      `    <changefreq>${r.url === "/" ? "weekly" : "monthly"}</changefreq>`,
      `    <priority>${priority(r.url)}</priority>`,
      "  </url>",
    ].join("\n"),
  ),
  "</urlset>",
  "",
].join("\n");
await fs.writeFile(path.join(DIST, "sitemap.xml"), sitemap, "utf8");

console.log(`SEO: ${ROUTES.length} routes, robots.txt + sitemap.xml  (origin ${SITE})`);
