# Ipekçi — React → WordPress Migration Status

_Source of truth: the working tree (`ipekci-theme/` is intentionally untracked — git holds only the React `src/` reference)._
_Live WP: staging wp-admin — URL and credentials are kept out of this repo (it is public). Export `WP_BASE`, `WP_USER` and `WP_PASS` before running anything in `scripts/`. Deploy = rebuild `ipekci-theme.zip` → upload via Appearance → Themes. React reference dev server: http://localhost:3000._

Last updated: 2026-08-31 (Over ons premium redesign deployed to staging)

## Phase 12 — Over ons premium redesign (2026-08-31) — ✅ DEPLOYED TO STAGING

Ported the React premium `/ons-verhaal` redesign (9 movements + shared Klant CTA) to `ipekci-theme-v2` on **https://ipekcislachterij.localclicks.nl**.

### Section map (React → WordPress)

| # | React component | WP template part |
|---|-----------------|------------------|
| 00 | Hero + glass stat card | `template-parts/ons-verhaal/section-hero.php` |
| 01 | OnsVerhaalServiceSection | `section-service.php` |
| 02 | OnsVerhaalHalalSection | `section-halal.php` |
| 03 | OnsVerhaalWorkflowSection | `section-workflow.php` |
| 04 | OnsVerhaalStatsSection | `section-stats.php` |
| 05 | OnsVerhaalHighlightsSection (2×2) | `section-highlights.php` |
| 06 | Assortiment inline | `section-assortiment.php` (CMS-driven) |
| 07 | Careers inline | `section-careers.php` |
| — | AssortimentKlantCta | `template-parts/shared/klant-cta.php` |

### New / updated theme files

- `inc/ons-verhaal-data.php` — mirrors `src/lib/ons-verhaal-content.ts`
- `templates/page-ons-verhaal.php` — thin assembler
- `assets/css/ons-verhaal-premium.css` + `ons-verhaal-premium-b.css` (split deploy; host truncates large single-file uploads)
- `assets/css/pages.css` — Klant CTA premium styles
- 14 new images under `assets/images/ayat/` (hero, workflow steps, highlights, stats kebab, etc.)
- LCP preload → `over-ons-hero-contact.jpg` (`inc/enqueue.php`)

### Deploy method

`deploy-new-file.mjs` for new paths, `deploy-files.mjs` for edits, `deploy-binaries.mjs` for images, `purge-full.mjs` after each batch.

### Parity QA (`full-parity-audit.mjs --pages over-ons`)

| Viewport | Diff | Status |
|----------|------|--------|
| 768 | 1.2% | ✅ pass |
| 1920 | 2.2% | borderline (navbar/render delta) |
| 1440 | 3.5% | needs fine-tune |
| 390 | 6.0% | improved from 14% (mobile hero title fix) |

Content parity (`compare-react-wp.mjs`): page height ±0%, 20/21 headings match; h1 spacing normalization only.

---

## 🚀 Deployment Status (2026-08-05)
- **Target:** `https://ipekcislachterij.localclicks.nl`
- **Method:** Automated Playwright browser automation (`scripts/deploy-zip.mjs` & `scripts/deploy-zip-clean.mjs`)
- **Status:** **✅ SUCCESS (Deployed as `ipekci-theme-v2`)**
- **Resolution:** Instead of falling back to FTP, we optimized the theme payload. We aggressively compressed the massive unoptimized `webp`/`jpg` files in the `ayat` directory (saving 40.5MB), removed the unused 21MB local CDN fallback cache, and removed the unused 13MB legacy Ipekçi brand videos. This reduced the package from 89.2MB down to an ultra-light **16.3MB**. 
- **Bypassing Server Limits:** To circumvent the server's refusal to overwrite existing directories, the top-level folder inside the ZIP was renamed to `ipekci-theme-v2`. The ZIP was successfully uploaded, installed, and activated via WP Admin.
- **QA Verification:** Verified the live site (bypassing LiteSpeed Cache via `?bust=1`). All new Ayat branding, SEO metadata, the new `/vacatures/` page, and the intentional 301 redirects for the old `/assortiment/` URLs are perfectly live and functioning!

## Live deployment (React)

**https://ayatfood.vercel.app** — Vercel project `ayatfood`, connected to this
GitHub repo, so **`git push` to `main` is the deploy**. No CLI step needed.

### The alias trap this cost us three deploys — don't reintroduce it
Renaming a Vercel project does **not** rename its auto-generated domain. After
`ipekci-premium-halal` → `ayatfood`, the project still owned
`ipekci-premium-halal.vercel.app`, so `ayatfood.vercel.app` was only ever a
**manual alias** created with `vercel alias set`. Manual aliases are pinned to
one deployment and do **not** follow production — every push silently left the
live URL on the previous build.

Fixed by registering it as a real **project domain**:
```
POST /v10/projects/ayatfood/domains  {"name":"ayatfood.vercel.app"}
DELETE /v9/projects/ayatfood/domains/ipekci-premium-halal.vercel.app
```
Verified: a fresh deployment now reports `▲ Aliased https://ayatfood.vercel.app`
on its own. If the live URL ever goes stale again, check
`GET /v9/projects/ayatfood/domains` first — a manual alias has crept back in.

### Other deployment notes
- `.vercelignore` is required. Without it the CLI falls back to `.gitignore`,
  which does not exclude `ipekci-theme/` or its 85 MB zip; the upload hits
  ~230 MB and aborts.
- `ayatfood.ukonnect.nl` is attached and verified but **not resolving**:
  `ukonnect.nl` runs on Cloudflare nameservers, so it needs an
  `A ayatfood → 76.76.21.21` record (proxy **DNS only**, not orange-cloud, or
  Vercel cannot issue the certificate).


## Phase 11 — WP mirror of the Ayat rebrand (2026-08-04) — ✅ BUILT & VERIFIED LOCALLY · ⏳ NOT DEPLOYED

Closes the WordPress side of Phases 8–10. **Resumed after a power-loss interruption:** an earlier
session (2026-08-02 → 08-04 05:33, undocumented because the write to this file never happened) had
already mirrored most of it — see "Recovered from the interrupted session" below. Work resumed at the
one surface it never reached, the homepage hero, plus the supporting layers that hero depended on.
Nothing already migrated was rebuilt.

### Recovered from the interrupted session (verified present, not re-done)
`inc/producten-data.php` (the 8-category / 34-product Ayat catalogue) · `inc/products.php` +
`inc/category-cms.php` (products CMS rebuilt on it) · `inc/assortiment-data.php` (legacy reader now
*derived* from the catalogue, so the mega menu could not drift) · `templates/page-producten.php` +
`assets/css/producten.css` (the `/producten` and `/producten/{category}` views) · `inc/routing.php`
(Ayat routes, `/assortiment` → `/producten` 301s) · `assets/css/tokens.css` +
`assets/css/design-system.css` (the Phase 10 design system) · `template-parts/navbar.php` +
`inc/menus.php` + `inc/navbar-data.php` (mega menu and menus on the 8 real categories) ·
`template-parts/shared/ayat-badge.php` · and 5 of the 8 homepage sections
(speerpunten, storytelling→Over ons, assortiment, voor-wie, eindproducten). All 52 PHP files linted
clean, so the interruption left no half-written file.

### Completed this session
- **Dual CTA Mobile Pattern** (`template-parts/home/section-hero.php`, `templates/page-contact.php`, `templates/page-vacatures.php`, `templates/page-voor-wie.php`, `404.php`, `template-parts/home/section-eindproducten.php`, `assets/css/vacatures.css`, `assets/css/voor-wie.css`, `assets/css/home.css`, `assets/css/pages.css`, `assets/css/producten.css`) — Fully ported the `.ipek-dual-cta` responsive component logic. Replaced all vertically stacked double buttons with the app-like 50/50 mobile layout. Mobile-specific labels (`-mob` vs `-desk`) now swap elegantly at the `639px` breakpoint to keep touch targets generous and layout compact.
- **Over Ons / Storytelling Redesign** (`template-parts/home/section-storytelling.php`, `assets/css/home.css`, `assets/js/home.js`) — Upgraded the mobile layout to match the new React bento grid. The section no longer uses a two-column setup on mobile; instead, the feature cards stack vertically with hidden `rule` and `link` elements on small screens. The `initStorytelling` JS function and tilt logic were pruned since the DOM target no longer exists.
- **Homepage hero** (`template-parts/home/section-hero.php`) — the last surface still on Ipekçi.
  Replaced the 6.7 MB brand-video hero with the Ayat three-still **background slider** mirroring
  `HERO_BG_SLIDES`: crossfade + Ken-Burns drift on a 6.5s cycle, a `role="tablist"` strip that both
  reports and sets position (hidden <640px, matching React's `hidden sm:flex`). Origin badge now
  carries the Ayat mark + brand seal; headline "Premium Halal / vleesgroothandel"; CTAs
  → `/producten` and `/contact`; 4 trust chips; showcase card rebuilt on the 5 Ayat products
  (Döner, Shoarma, Gevogelte, Vleessoorten, Productie) with `data-sticker` per slide so PHP stays the
  single source of slide order. **The first still is now the LCP element itself** rather than a
  poster something heavier paints over. All existing class names, scrims, animations and the
  reduced-motion gating were kept, so the layout is unchanged.
- **Customizer defaults** (`inc/homepage-options.php`) — *this was a live rendering bug.*
  `ipekci_hp_trust_pillars()` overlays the Customizer values onto the array in the section template,
  so the Ayat pillar copy that landed on 07-24 was being **overridden by the Ipekçi defaults** on any
  install that had not hand-edited them. Rebranded the hero, badge, pillar and trust-heading defaults
  to match `enterprise-trust-content.ts` / `home-hero-content.ts`. Hero media controls became the
  three background slides; two new pillar icons (`badge-check`, `heart-handshake`) added to
  `ipekci_trust_icon()` so the icon set matches React. The dead "Storytelling" panel was removed —
  its section was replaced by Over ons, so every one of its controls silently changed nothing.
- **Design system** (`assets/css/design-system.css`) — `.ipek-dual-cta` had only been ported as a
  desktop flex row, losing React's **mobile 50/50 grid**. Ported the full contract (grid → flex at
  640px, button sizing at 639/359px); `.ipekci-hero__cta-row` now owns only rhythm and animation.
- **SEO** (`inc/seo.php`) — the per-category branch was still keyed to the retired `/assortiment`
  slug, so **all eight `/producten/{category}` pages inherited the index's title and description**
  and competed with it in search. Rebuilt on `ipekci_producten_category()`. Front-page title,
  description, logo and LocalBusiness description rebranded; the Ipekçi Harderwijk **GeoCoordinates
  node was dropped rather than guessed** (React publishes none, and a wrong pin is worse than no pin).
  The 14 branded share cards from `scripts/build-og-cards.mjs` now ship with the theme
  (`assets/images/og/`), resolved by a new `ipekci_seo_card()` — the 8 catalogue slugs match the card
  filenames exactly, verified by a test rather than assumed.
- **LCP preloads** (`inc/enqueue.php`) — `ipekci_lcp_images()` still preloaded Ipekçi CDN assets and
  branched on `/assortiment`. Rebuilt on the Ayat routes, resolving each interior hero from the same
  data its template renders from. The CDN **preconnect was removed**: nothing requests that origin
  any more, so it cost a DNS lookup and TLS handshake per page load and advertised the former brand's
  domain while doing it.
- **Contact + Voor wie + footer** — `page-contact.php` still served both its photographs from the
  Ipekçi CDN, said "Harderwijk" in four places, and linked its privacy checkbox to
  `ipekcislachterij.nl`. Rebranded against `contact-content.ts` / `CONTACT_PARTNER`. The footer's
  "Certificaten" image (also Ipekçi-hosted) became React's three "Waarden" chips.
  **The theme now requests nothing from ipekcislachterij.nl.**
- **Verified:** all 52 PHP files `php -l` clean; all 5 JS files `node --check` clean; all 13 CSS files
  brace-balanced. New offline harnesses (they stub WordPress, so they need no install):
  `scripts/verify-hero-render.php` renders the hero and asserts 25 invariants — one `<h1>`, 3 slides /
  3 tabs / 5 showcase images / 5 thumbs / 4 chips / 2 CTAs, exactly one active slide, slide 0 eager +
  `fetchpriority="high"`, every `<img>` with `alt` (18/18), no `<video>`, no Ipekçi string anywhere —
  **25/25 pass**. `scripts/verify-seo-cards.php` resolves all 6 route + 8 category cards, checks the
  traversal guard, and asserts the catalogue slugs equal the card filenames — **0 failures**.
  `ipekci-theme.zip` rebuilt with Python: 295 files, 89.2 MB, 0 backslash entries, CRC OK.
- **Not yet done:** deploy. Upload `ipekci-theme.zip`, then LiteSpeed Purge All **and** purge-by-URL
  for `/`, `/producten/` (+ the 8 categories), `/ons-verhaal/`, `/vacatures/`, `/contact/`,
  `/voor-wie/`, and confirm anonymously (see [[litespeed-purge-gotcha]]). Live Playwright QA against
  React at 1920/1440/1280/768/390 has **not** been run — the harnesses above verify markup, not pixels.
- **Known leftover:** `initStorytelling()` in `assets/js/home.js` still targets `#ipekci-story`, which
  no longer exists since the Over ons section replaced it. It no-ops behind its own guard, so it is
  dead weight rather than a defect; left in place because removing it also means retiring the
  `.ipekci-story-tilt*` CSS, which deserves its own pass.

## Phase 9 — Product experience (2026-07-27) — ✅ REACT COMPLETE · ✅ WP MIRROR COMPLETE (Phase 11)
Rebuilt the catalogue around Ayat Food's own hierarchy. Content scraped and verified from `ayatfood.nl/producten/` + its eight category pages: **8 categories, 34 products**, every name/description/intro verbatim. The official category pages carry **no product photography** (variants are a text accordion), so product cards are spec-forward and photography lives in the hero + gallery — nothing is presented as a photo of a variant we don't have.
- **The bug this phase fixes:** four of the eight mega-menu categories (Diepvries, Turkse pizza, Gegrild, Tortilla Dürüm) linked to the generic `/assortiment` index, and the other four to legacy Ipekçi slugs (`lamsvlees`/`rundvlees`/`kip`/`eindproducten`). All eight now resolve to their own page.
- **Routes:** new `/producten` + `/producten/{slug}` for the eight official slugs. `/assortiment` and `/assortiment/{old-slug}` became `beforeLoad` redirects (old slug → the Ayat category it was actually showing; anything else → the index), so no bookmark dead-ends.
- **Data:** `src/lib/producten-content.ts` is the single source. Packaging (`1 kg`, `Zak van 2,5 kg`, `10 kg`, `30 stuks`), state (`Vers`/`Bevroren`) and variant notes are parsed from the officially published product names only. The mega menu, footer and Over ons strips are now *derived* from it, so navigation can never drift from the catalogue again.
- **Design:** new `lux-*` primitive layer in `styles.css` — button states (hover/focus-visible/active/disabled/loading with spinner), `lux-card` (lift + 0.45° rotation + image zoom + masked border glow + sheen + CTA reveal + numeral→arrow swap), `lux-spec`, `lux-shot` gallery, `lux-ambient` section lighting, `lux-chip`, `lux-crumb`. All transform/opacity only; every rule is disabled under `prefers-reduced-motion`.
- **Verified:** all 9 routes render with exactly one `<h1>`, 0 broken images, 0 missing `alt`, 0 console errors, no placeholder/Ipekçi text. Responsive **ALL PASS** at 1920/1440/1280/768/390. Full internal-link sweep across 7 pages: every product link resolves directly (zero `/assortiment` links remain in the DOM). `tsc` and `vite build` clean.
- **Removed:** the orphaned Ipekçi catalogue (`AssortimentCatalogPage.tsx`, `assortiment-products.ts` with its 44 lamb/beef cuts on the ipekcislachterij CDN, `PremiumMeatShowcase_old.tsx`, `resizable-navbar*`).
- **Mirrored in WordPress (Phase 11):** `/producten` + `/producten/{category}` templates, the products CMS rebuilt around the eight real categories, and the `/assortiment` 301s all landed. `inc/assortiment-data.php` now *derives* the legacy reader shape from the Ayat catalogue, so the mega menu, the Over ons strips and the SEO meta could not drift. Still undeployed.

Last updated before that: 2026-07-27 (Phase 8 — Over ons rebranded to Ayat Food + new Vacatures page; built locally, **not yet deployed**)

## Phase 8 — Over ons + Vacatures (2026-07-27) — ✅ BUILT & VERIFIED LOCALLY · ⏳ NOT DEPLOYED
Continues the Ayat Food rebrand from the finished homepage into the supporting pages. Content source of truth: https://ayatfood.nl/over-ons/ and /vacatures/ — every claim (24/7 service, modern wagenpark, NVWA-normen, ECC Halal, the four-step bestelproces, the counters 10+/751+/989/6, and the three vacancies with their werkzaamheden) is published there. Nothing invented. Layout, grid, spacing, animations and components are unchanged; only content, imagery and business identity moved.
- **Navigation** — `Vacatures` added between Producten and Contact, matching ayatfood.nl's hierarchy (Home · Over ons · Producten · Vacatures · Contact). Desktop navbar, mobile drawer (also reordered to that hierarchy) and the footer Menu column. WP: added to `ipekci_default_primary_items()` **and** a one-time, option-guarded `ipekci_maybe_add_vacatures_menu_item()` that inserts it before Contact in an already-created Hoofdmenu (skips if the menu already links to /vacatures, so it can't duplicate an editor's item).
- **Over ons** (`/ons-verhaal`) — fully rebranded. Hero swapped from the Ipekçi brand-movie to a still Ayat photograph (Ken-Burns on load, so the poster IS the LCP element and nothing competes for bandwidth). 8 highlight cards → the official service claims + value propositions. Halal split → "Halal en kwaliteit". History split → the company introduction. Werkwijze → the official **four-step** bestelproces (grid 3→4 cols, connector re-spanned). **New statistics band** ("We zijn klaar om perfectie te dienen") with the four official counters. Eindproducten strip → the eight Ayat productgroepen. Careers block now links to `/vacatures`. Shared "Ook klant worden?" CTA rebranded (it renders on Over ons, Assortiment and Voor wie).
- **Vacatures** (`/vacatures`, new) — built from our own premium components, not a copy of the original page: dark cinematic hero (breadcrumb, word-reveal h1, dual CTA, 3 stat chips) → "Werken bij Ayat Food" split → three job cards (numeral, afdeling, icon, Werkzaamheden, Vereisten chips only when the listing states one) → dark sollicitatie panel (3 steps + business contact card) → open-sollicitatie CTA. Applications use a **pre-filled mailto** rather than a form that posts nowhere.
- **CMS** — new `ipekci_vacature` CPT (`inc/vacatures.php`), same pattern as Voor Wie: `public=false` (no unreviewed detail routes), meta box (Afdeling, Korte omschrijving, Werkzaamheden, Vereisten, Icoon), `menu_order` ordering with append-on-create, admin list ordered by Volgorde, and an option-guarded one-time import of the three official vacancies that refuses to overwrite existing entries. `ipekci_vacatures()` returns a fixed shape with a hardcoded fallback, and derives the editorial numerals from render order so a reorder can't desync them. Customizer "Bedrijfsgegevens" defaults rebranded to Ayat's real details — the Vacatures page reads contact info from there, so it can never disagree with the footer or Contact page.
- **Verified** (React, localhost:3001) at 1920/1440/1280/768/390 across `/`, `/ons-verhaal`, `/vacatures`: `scrollWidth === clientWidth` everywhere (0 horizontal overflow), exactly one `<h1>` per page, every `<img>` has `alt`, 0 broken images, 0 console errors. `tsc --noEmit` clean for all Phase-8 files; `vite build` green. All 8 touched PHP files pass `php -l`. `ipekci-theme.zip` rebuilt with Python (forward-slash entries, 265 files).
- **Deploy still to do:** upload `ipekci-theme.zip`, then LiteSpeed Purge All **and** purge-by-URL for `/`, `/ons-verhaal/`, `/vacatures/` (see [[litespeed-purge-gotcha]]), and confirm anonymously. First admin request after deploy runs the vacancy import + the menu-item upgrade.
- **Known follow-up:** the Over ons hero reuses `hero-slide-1-premium.jpg` (~2.1 MB) as an eager LCP image — it's cached from the homepage slider, but an optimized derivative would be better (`scripts/optimize-hero-images.py`).


## Phase 5 — Product Category CMS + CMS coverage review (2026-07-15) — ✅ COMPLETE & DEPLOYED
Lead-architect pass over what remained hardcoded, keeping only high-value conversions. The one genuine gap: Phase 3 created the `ipekci_product_cat` taxonomy for grouping products, but each category's **presentation** (eyebrow, description, preview photo, badge sticker) stayed hardcoded in `ipekci_assortiment_categories()` — and that drives the navbar assortiment mega-menu, the `/assortiment/{category}` page hero, and the category SEO meta. Closed it as native **term meta** on the taxonomy the team already manages.
- **`inc/category-cms.php`** (new) — registers 4 term-meta fields on `ipekci_product_cat` (eyebrow, description, preview image, sticker) and renders them on the Add/Edit Category screens. Images use the native Media Library via `wp.media` (a hidden attachment-ID input + thumbnail + choose/remove buttons; inline script enqueued only on the term screens). Saves on `created_/edited_ipekci_product_cat`, capability-gated on `manage_categories`, nonce-checked on edit.
- **Reader** (`inc/assortiment-data.php`) — the hardcoded body became `ipekci_assortiment_categories_hardcoded()`; `ipekci_assortiment_categories()` now merges term meta over it, keeping the exact shape (`id,label,eyebrow,description,preview,sticker,href`) so the mega-menu, category pages and SEO were **not touched**. Each field falls back to its hardcoded value → an untouched category is byte-identical. Label reads the term name (so a rename propagates); `ipekci_category_labels()` also reads term names for the product-card badges. Self-contained on core term functions, so it's deploy-safe regardless of whether the admin module is loaded.
- **Verified:** category edit screen exposes all 4 fields + 2 media pickers. Editing rundvlees' eyebrow + description + preview image updated **both** the `/assortiment/rundvlees/` hero AND the navbar mega-menu (image served from `/wp-content/uploads/`); clearing the fields restored the hardcoded defaults byte-for-byte. Regression: all 5 assortiment routes still 44/44 (11/20/5/8), 0 broken, 0 console errors, 0 PHP notices. Deployed (`deploy-new-file.mjs` + `deploy-files.mjs`), LiteSpeed purged, all live files byte-identical, `ipekci-theme.zip` rebuilt. New script: `verify-category-cms.mjs`.

### CMS coverage after Phase 5 — deliberately left as code (low value / correctly static)
Reviewed the rest and left it hardcoded on purpose (per "don't convert what should stay static"):
- **Footer** — all business details (address, phone, e-mail, hours, socials, copyright, about text) are already editable via the Customizer "Bedrijfsgegevens" panel (`inc/theme-options.php`); footer columns are native WP menus (`inc/menus.php`). Nothing high-value left. Verified: no stale hardcoded phone/e-mail/address literals in `footer.php`.
- **Contact** — business details + lead-recipient e-mail are dynamic (`ipekci_option`); the reassurance/detail-card marketing copy is low-churn brand text.
- **Homepage remaining sections** — the primary messaging (hero, 4 badges, 6 trust pillars + images, storytelling) is already editable (Phase 2). The meat-showcase is a fixed beef-anatomy diagram (educational, static). The assortiment/eindproducten/voor-wie homepage-section **headlines** are design-integrated brand copy, low churn — left as code rather than clutter the Customizer.
- **Homepage Voor Wie rail** — its own separate hardcoded array (`title/text/icon`, local images); distinct from the Phase 4 CPT, left per the "don't touch homepage sections" scope.

## Phase 4 — Voor Wie CMS (2026-07-15) — ✅ COMPLETE & DEPLOYED

## Phase 4 — Voor Wie CMS (2026-07-15) — ✅ COMPLETE & DEPLOYED
The four customer segments (Slagerijen, Groothandels, Supermarkten, Restaurants) were a hardcoded PHP array in `inc/navbar-data.php`; every copy/photo/order edit meant touching PHP. wp-admin is now the source of truth. Same proven pattern as Phase 3: a CPT, a reader that preserves the exact return shape, templates untouched.
- **CPT `ipekci_voorwie`** (`inc/voor-wie.php`) — `public=false` (no own front end: `/voor-wie/{slug}` is served by the existing virtual routing, so enabling it would publish duplicate routes), `show_ui=true`, supports title/thumbnail/page-attributes. Menu "Voor wie" (groups icon). Each segment = one entry (no taxonomy: a segment IS the editable unit).
- **Meta box "Klantgroep-details"** — Slug (editable → real `post_name`), Eyebrow, Korte omschrijving, Lange omschrijving, Voordelen (one per line), CTA-tekst, CTA-URL, Sticker-URL. Title = label, featured image = hero+card photo, Volgorde = menu_order, Concept/Gepubliceerd = status. Short/long description are plain-text meta (not excerpt/block editor) so `esc_html()` output stays byte-identical — block markup would visibly corrupt it.
- **Reader contract preserved:** `ipekci_voorwie_segments()` now queries the CPT and returns the exact shape (`id, label, eyebrow, description, long_description, preview, image, sticker, href, benefits[]`, + additive `cta_text/cta_url`), so `templates/page-voor-wie.php`, the navbar mega-menu (`template-parts/navbar.php`), `inc/routing.php` and `inc/seo.php` were **not touched**. The old hardcoded array became `ipekci_voorwie_segments_hardcoded()` — it seeds the import and is the per-field fallback so a half-filled or empty CPT never blanks the section. New entries get `menu_order = max+1` (append, don't reshuffle).
- **CMS-driven routing (key fix):** the `/voor-wie/{segment}` rewrite pattern was hardcoded to the original four slugs, so an editor-created segment would 404. It's now built from the published CPT slugs via `ipekci_voorwie_slugs()` (a direct `$wpdb` query, so it doesn't depend on CPT-registration order at `init`); the existing `ipekci_maybe_flush_virtual_routes()` (init@99) auto-flushes when the pattern changes. Verified live: creating a segment made its detail page route 200, deleting it made the slug 404. Current 4 slugs produce a pattern byte-identical to the old hardcoded one, so existing routes were unaffected by the change.
- **Deploy-order safety:** the three files are interdependent (voor-wie.php needs `_hardcoded`; new navbar-data.php needs voor-wie.php's reader). Added a guarded fallback `ipekci_voorwie_segments()` in navbar-data.php so every intermediate deploy state has a working reader and WP's loopback check never reverts a file. Deployed new file via `deploy-new-file.mjs`, edits via `deploy-files.mjs`, all verified byte-identical.
- **Media:** the import copied the 4 segment photos from `assets/images/cdn/` into the Media Library (reusing Phase 3's `ipekci_import_product_image`), each parented to its segment (`ipekci_attach_voorwie_thumbnail` + an `added/updated_post_meta` `_thumbnail_id` hook), so the [[featured-image-unattached-trap]] can't bite here either. Every segment image on every surface now serves from `/wp-content/uploads/`.
- **Verified:** admin has "Voor wie" with 4 entries. Full CRUD through the real wp-admin UI: upload image → create segment (slug/eyebrow/desc/benefits/CTA + featured image, published) → live: 5th overview card + 6th tab + detail page routes 200 → edit title + swap image + change CTA (CTA persisted in admin) → live: title/image updated → delete → live: back to 4 cards / 5 tabs, deleted slug 404s. Regression sweep (anonymous): homepage + `/voor-wie/` + all 4 segments = 200, one h1 each, 0 PHP notices, 0 console errors, 0 broken images, images from Media Library; navbar mega-menu 4 items from uploads. Responsive 1440/768/390: overview grid 2/2/1 columns, 0 h-overflow. LiteSpeed purged (all + by-URL; note the server-level cache above LSCache needs a beat to propagate — anonymous re-read confirmed). `ipekci-theme.zip` rebuilt in sync. Test data + orphan uploads reverted; 4 entries, 26 media (22 + 4), 0 detached.
- **CTA fields note:** `cta_text/cta_url` are stored and round-trip in admin but the approved design has no per-segment CTA element (the buttons hardcode "Word klant"→/contact), so they are intentionally not rendered — kept as future-ready metadata rather than altering the pixel-perfect frontend.
- **Out of scope (deferred):** the homepage Voor Wie section (`template-parts/home/section-voor-wie.php`) keeps its own separate hardcoded array (different shape: `title/text/icon`, local `segments/` images) per the "don't touch homepage sections yet" instruction; and the page-level mega-menu copy (`ipekci_voorwie_mega_menu()`: "Onze klanten", subtitle, page eyebrow/description) stays hardcoded — nav/section chrome, not per-segment data.
- **New scripts:** `verify-voorwie-cms.mjs`, `verify-voorwie-crud.mjs`, `verify-voorwie-routes.mjs`.

## Phase 3 — Products CMS (2026-07-15) — ✅ COMPLETE & DEPLOYED

## Phase 3 — Products CMS (2026-07-15) — ✅ COMPLETE & DEPLOYED
The catalogue was two PHP arrays in `inc/assortiment-data.php` (44 titles + a title→CDN-image map); every edit meant touching PHP. wp-admin is now the source of truth. **Resumed after a power-loss interruption:** the code (`inc/products.php`) was fully written locally but never deployed — `products.php` was absent on the server and `assortiment-data.php`/`functions.php` still held their pre-CMS versions. Only the remaining deploy + verify work was done; nothing was rebuilt.
- **CPT `ipekci_product`** — `public=false` (no product detail page: the approved design has none, so no unreviewed front-end routes are published), `show_ui=true`, supports title/editor/excerpt/thumbnail/page-attributes. Menu "Producten" (carrot icon).
- **Taxonomy `ipekci_product_cat`** — 4 categories (Lamsvlees 11, Rundvlees 20, Kip 5, Eindproducten 8 = 44).
- **Meta box "Productdetails"** — Badge, Gewicht, Kwaliteitsnotities, Bereidingsadvies, Galerij. Order = Paginakenmerken → Volgorde. Category + featured image via the core boxes.
- **Reader contract preserved:** `ipekci_cms_products()` returns the exact shape the old array did (`title, category, image`), so `templates/page-assortiment.php` and `page-ons-verhaal.php` were **not touched** — the highest-risk surface is the one left unchanged. Falls back to `ipekci_hardcoded_products()` if the CPT is ever empty, so a failed import can't blank the shop. Uncategorised products are skipped (they'd break the label/sticker lookups). New products get `menu_order = max+1` so adding one appends to the grid instead of reshuffling the approved order.
- **One-time import** (`admin_init` + `after_switch_theme`, option-guarded): created 4 categories + 44 products, and imported 22 distinct photos (21 + placeholder) from the theme's shipped `assets/images/cdn/` into the Media Library — no network fetch. All 44 cards now serve from `/wp-content/uploads/`.
- **⚠️ Featured-image "unattached" trap (fixed):** `set_post_thumbnail()` writes `_thumbnail_id` but leaves the attachment's `post_parent = 0`, so WP lists product photos as "Unattached" — a Media Library bulk-delete of unattached files silently nukes live shop imagery (this actually happened once during QA and was recovered). Fix: `ipekci_attach_product_thumbnail()` + an `added/updated_post_meta` hook on `_thumbnail_id` parent every product image to its product (covers import, repair, AND the editor's own media modal), plus `ipekci_repair_product_thumbnails()` (option-guarded, self-healing: re-imports any missing thumbnail, re-parents the rest). Media map self-heals because `ipekci_import_product_image()` re-imports when a mapped attachment id no longer exists.
- **Verified:** admin has Producten + Categorieën; 44 products / 4 categories / 22 media (0 detached — all parented). Full CRUD through the real wp-admin UI: upload image → create product (Kip, appends last, 45 total) → edit title + swap image → confirmed each live anonymously (post-purge) → deleted product + upload → catalogue back to exactly 44. All 5 assortiment routes + the ons-verhaal curated strip + homepage eindproducten: correct counts, 0 broken, 0 console errors, no PHP notices, images from Media Library. Responsive 1440/768/390: 4/2/1 columns, 0 h-overflow. Deployed via Theme File Editor (`deploy-new-file.mjs` for the new include, `deploy-files.mjs` for the two edits), LiteSpeed purged (all + by-URL), `ipekci-theme.zip` rebuilt in sync, all live files verified byte-identical to local.
- **New scripts:** `verify-products-cms.mjs`, `verify-catalog-routes.mjs`, `verify-products-crud.mjs`, `verify-responsive-catalog.mjs`, `cleanup-qa-products.mjs`, `cleanup-qa-uploads.mjs`, `media-state.mjs`.
- **Remaining CMS phases (not started):** the catalogue *category* content (`ipekci_assortiment_categories()`), the *voor-wie* segment content, homepage sections, and navbar/footer menus are still PHP/Customizer-managed, not a CPT — future phases if the client wants them editable.

## Mobile-Premium pass 4 — section rhythm (2026-07-12)

## Mobile-Premium pass 4 — section rhythm (2026-07-12)
Deep 390px audit found the dominant remaining "desktop-adapted-to-mobile" smell: **every section shipped desktop-scale vertical padding on phones**, giving oversized empty blocks and a heavy scroll. Standardised a single premium mobile rhythm (~56px) across the whole site. **All changes gated `@media (max-width:639px)` — desktop verified unchanged at 1440px (trust 144, meat 112, story 120, eind 144 = original values).** Homepage page-height dropped 14313→13970px; scroll now reads like a native app.
- **Homepage** (`home.css`, new block at EOF): trust 96→56, meat inner 80→56, story 88→56, assortiment 80→56, voor-wie 88→56, eindproducten 112→64px.
- **Interior pages:** contact hero top 144→88 + partner CTA 96→56 (`contact.css`); every `.ipekci-ov-section` 96→56 (`ons-verhaal.css`); `.ipekci-as-products` 80→56 (`assortiment.css`); `.ipekci-vw-groups` 80→56 (`voor-wie.css`); shared `.ipekci-klant` "Word klant" band 96→56 (`pages.css`).
- Interior dark heroes (ons-verhaal/assortiment/voor-wie) kept their immersive `88vh` — intentional, reads premium.
- **Deployed** all 6 CSS files via the Theme File Editor append method (see gotcha below), LiteSpeed Purge All, `ipekci-theme.zip` rebuilt in sync. Verified live at 390px (contact/ons-verhaal/assortiment all premium, 0 horizontal overflow) + 1440px (desktop identical).
- **Marker gotcha:** the "skip if already deployed" check must use a string unique to the *appended block* (e.g. a comment phrase), NOT a CSS selector the file already contains — using `.ipekci-as-products`/`.ipekci-vw-groups` as markers caused false skips; re-ran with `80px -> ~56px.`.

## Mobile-Premium pass 3 — hero redesign (2026-07-12)

## Mobile-Premium pass 3 — hero redesign (2026-07-12)
Full Playwright mobile audit (390px, live) → the **hero** was the one real problem; every other homepage section (trust, meat, story, assortiment, voor-wie, eind, footer) audited already-premium on mobile and was left untouched. Root cause: `.ipekci-hero__inner` was locked to `height/max-height:100svh`, so the stacked showcase card overflowed the hero box (clipped ~180px) and the scroll cue overlapped it. Files: `assets/css/home.css` (new phone/tablet block at EOF, ~line 6281), `assets/css/navbar.css` (mobile block). **All changes gated `@media (max-width:1023px)` / `(max-width:639px)` — desktop (≥1024px) verified pixel-identical at 1440px.**
- **Un-locked hero height** (`≤1023px`): `inner` height auto + `min-height:100svh`, grid flows from top (`align-items:start`) so the showcase card is always fully in flow — never clipped. Card bottom now ~857px on a real 844px phone (fold), i.e. effectively fully visible, inviting scroll.
- **Horizontal CTAs** (`≤639px`): `[Ontdek ons verhaal] [Bekijk assortiment]` side by side (`flex:1`, 163px each, 48px tall, arrows dropped) — was two full-width stacked buttons eating ~100px.
- **Trust badges** → balanced **2×2 glass grid**, 8px labels (every label fits one line), compact padding.
- **Compact origin badge** (68→50px), **trimmed navbar** (66→60px: 0.5rem pad + 34px logo), **scroll cue hidden** on phones (redundant + was overlapping), showcase card radius 26→22px.
- **Consistent spacing scale** (padding-top 4.5rem, headline/lede/cta/trust/grid rhythm) pulls the card above the fold.
- **Deploy method (NEW, fast + non-disruptive):** pushed the two CSS files via **WordPress Theme File Editor** POST (authenticated in-browser `fetch` to `theme-editor.php` with the live form's nonce) instead of the 32 MB zip re-upload. home.css: appended the ~3.6 KB mobile block to the deployed file (deployed base was a strict prefix — no block yet). navbar.css: string-replaced the 3 values in the `max-width:639px` block. WP's loopback fatal-error check only runs for `.php` files, so CSS edits write with zero revert risk and no site downtime. Then LiteSpeed **Purge All** (incl. CSS/JS + UCSS bundles). Verified live at 390px + 1440px, 0 console errors.

## Mobile-Premium pass 2 (2026-07-11)
Audited the live mobile site (390px) with Playwright, then shipped phone-scoped refinements (desktop unchanged — gated behind `@media (max-width:639px)` / `(hover:none)` or the drawer's own class). Files: `assets/css/navbar.css`, `template-parts/navbar.php`, `assets/css/main.css`, `template-parts/home/section-premium-meat-showcase.php`.
- **App-like navbar height** — phones now ~66px (was ~85px): tighter `.ipekci-nav__mobile` padding + 38px logo. Frees hero real estate; verified 65px live.
- **Active-location in the drawer** — the current page's item shows a glowing gold marker + gold text (direct links via `is-active`, and the Assortiment/Voor-wie accordions via a new `$is_active` arg on `ipekci_render_nav_mobile_section`). Verified: "Voor wie" gold on `/voor-wie`.
- **Device-adaptive microcopy** — the meat-showcase "Beweeg over" (hover) instructions now swap to "Tik op" (tap) on touch, via a reusable `.ipekci-hover-copy`/`.ipekci-tap-copy` pair toggled by `@media (hover:none)`. Hotspots already handle `click`, so touch was functional; only the wording was desktop-centric.
- **Verification note:** `(hover:none)`-gated features (tap copy, the earlier tap feedback) can't be observed by viewport-resizing desktop Chromium (it reports `hover:hover`, `maxTouchPoints:0`); confirmed instead that the rules are deployed and correct, and that desktop still shows the hover copy. They activate on real phones.
- Deploy note: the host was severely degraded this session — the 32 MB upload truncated/stalled 3× before succeeding; local zip validated each time (CRC ok, forward-slash, style.css present).

## Polish & QA pass (2026-07-11)
Audited the live site at 390/768/1440 with Playwright, then shipped a **desktop-safe** polish layer (all changes gated behind `@media (hover:none)` / `≥1024px` or purely additive, so the verified desktop design is pixel-identical — confirmed post-deploy). All in `assets/css/main.css` (§7 polish layer), `assets/js/navbar.js` (`initMobileBar`), `footer.php`, `template-parts/home/section-hero.php`.
- **Premium mobile sticky action bar** — glass pill (`Bel direct` + `Word klant`), safe-area inset, reveals after the hero and auto-hides over the footer (IntersectionObserver) so it never covers the footer CTAs. Hidden ≥1024px.
- **Touch tap feedback** — buttons dip-scale, cards soften on `:active` (coarse pointers only). The site was hover-only; touch users now get native-app press feedback.
- **`-webkit-tap-highlight-color: transparent`** — removes the grey/blue mobile tap flash.
- **Global `:focus-visible`** brand-gold keyboard focus ring (was sparse).
- **Touch targets** — mobile nav toggle 36→44px; meat-showcase hotspots given a `-12px` invisible hit area (WCAG 2.5.5).
- **Smooth in-page anchor scrolling** + `scroll-padding-top:96px` (navbar offset); respects reduced-motion.
- **Perf** — hero video `preload="auto"` → `"metadata"` (it's JS-played, so `auto` eagerly downloaded ~MBs for nothing); verified the hero still autoplays (`readyState 4`, advancing).
- Verified live: 0 console errors, hero plays, mobile bar reveal/hide correct, nav toggle 44px, desktop unchanged.

## 🎉 Migration complete
Every React route is now migrated, deployed and Playwright-verified pixel-faithful on WordPress: homepage (7 sections), site-wide footer + navbar, and all interior pages — `/ons-verhaal`, `/contact`, `/assortiment` (+ 4 categories), `/voor-wie` (+ 4 segments). No remaining React routes.

## Full-project audit (2026-07-11)
Swept all 13 live routes (logged-in, cache-bypassed): **every route 200, zero PHP warnings/notices/deprecated/fatals, 0 console errors, 0 broken images, exactly one `<h1>` each, every `<img>` has `alt`, skip-link + `<main>` + `<nav>` landmarks present.** Two defects found and fixed in `inc/template-functions.php`, redeployed and re-verified live:
1. **Homepage `<title>` was "WordPress"** (static front page had no post title) → now `Ipekçi Slachterij — Groots in premium halalvlees` via `pre_get_document_title`, plus meta description + og:title/description/image/type mirroring the React `/` head (`ipekci_front_page_meta`).
2. **`<html lang="en-US">` on Dutch content** (WCAG 3.1.1 fail) → forced to `nl-NL` on the front end via a `language_attributes` filter (matches React `<html lang="nl">`; admin locale untouched).

## Workflow per surface
Analyze → Implement → Refine → Build zip → Deploy → Playwright verify → Compare with React → Fix diffs → repeat until production quality.

## Homepage — ✅ COMPLETE & DEPLOYED
All 7 sections registered in `ipekci_register_home_sections()`, React DOM order:
`hero` → `enterprise-trust` → `premium-meat-showcase` → `storytelling` → `assortiment` → `voor-wie` → `eindproducten`.
Deployed, LiteSpeed purged, Playwright-compared against React — pixel-faithful (2026-07-09).

## Footer (site-wide) — ✅ COMPLETE & DEPLOYED
`footer.php` mirrors React `src/components/Footer.tsx` (brand col + Assortiment/Voor-wie sitemap + contact block + legal bar), styled in `main.css` (`.ipekci-footer*`), icons via `ipekci_page_icon()`. Deployed 2026-07-10 ~23:30. Playwright-verified pixel-faithful at 1440px (WP 805px vs React 801px). Adding the footer resolved the old ons-verhaal ~706px page-height gap.

## Interior pages
Virtual-page system: `inc/routing.php` maps `/{slug}` → `templates/page-{slug}.php`, registered in `ipekci_virtual_pages()`.

| React route | Component | WP status |
|---|---|---|
| `/ons-verhaal` | OnsVerhaalPage (8 movements) | ✅ **COMPLETE & VERIFIED** — desktop 8/8 sections pixel-exact (8361 vs 8324); mobile 8/8 exact after fixing `.ipekci-ov-products` grid (base 1-col, 640→2, 768→3, 1024→4, 1280→7 to match Tailwind `sm/md/lg/xl`); footer present |
| `/contact` | ContactPage | ✅ **COMPLETE & VERIFIED** — `templates/page-contact.php` + `assets/css/contact.css` + `initContactForm()` in `pages.js`. Two movements: light hero (backdrop, breadcrumb, animated title with italic-red "ons", badges, 3 reassurance cards, 3 quick-action buttons, 4 detail cards, premium message-form panel) → 4-item trust bar → "Uw partner in premium halalvlees" split CTA. Deployed 2026-07-11, LiteSpeed purged. Playwright-verified pixel-faithful desktop (WP 3276px vs React 3256px) + mobile 390px; form client-side validation (exact zod messages), success-panel swap, toast + reset all working. Form is client-side only, faithful to React (no network submit) — **follow-up: wire to email/WPForms for production leads.** |
| `/assortiment` + `/assortiment/$category` | AssortimentCatalogPage (all + lamsvlees/rundvlees/kip/eindproducten) | ✅ **COMPLETE & VERIFIED** — `templates/page-assortiment.php` (one template serves all 5 views via the `ipekci_category` query var) + `assets/css/assortiment.css` + `initTiltCards()` in `pages.js`. Nested routes via generic `subroutes` in `ipekci_virtual_pages()` (reusable for voor-wie); `assortiment` added to `ipekci_dark_hero_pages` so the navbar floats over the dark hero; category-aware `<title>`/meta. Three movements: dark parallax hero (breadcrumb, word-reveal title, live product count, "Bekijk collectie") → Productoverzicht (category tabs with active pill, section header, 3D-tilt product-card grid) → shared `klant-cta`. Deployed 2026-07-11, purged. Playwright-verified pixel-faithful vs React desktop + mobile (grid 1-col base → sm2/lg3/xl4). All 5 routes 200 with correct counts (all 44, lamsvlees 11, rundvlees 20, kip 5, eindproducten 8), category filtering, active tab, eyebrow. 0 console errors. Placeholder images on some rundvlees/kip/eindproducten items are faithful to the React source (same `PLACEHOLDER`). |
| `/voor-wie` + `/voor-wie/$segment` | VoorWieCatalogPage (all + slagerijen/groothandels/supermarkten/restaurants) | ✅ **COMPLETE & VERIFIED** — `templates/page-voor-wie.php` (one template serves all 5 views via `ipekci_segment` query var) + `assets/css/voor-wie.css`. Segment data extended in `inc/navbar-data.php` (`ipekci_voorwie_segments()` gained `long_description`/`benefits`/`image`; `ipekci_voorwie_mega_menu()` gained page fields). Nested route via the generic `subroutes`; `voor-wie` added to dark-hero pages; segment-aware title/meta. "all" view → 2-col dark segment-card grid (spinning 100%-HALAL ring badge, corner accents, index watermark, gold CTA); segment view → sticky split detail showcase (copy + 4 benefits + 3D-tilt image card with `initTiltCards()`) + "Ontdek ook" strip of the other 3 segments; both share dark hero + `klant-cta`. Deployed 2026-07-11 (upload truncated once, succeeded on retry), purged. Playwright-verified pixel-faithful vs React desktop + mobile (grids/split stack to 1-col). All 5 routes 200 with correct titles/eyebrows/active tab; each segment has 4 benefits + 3 Ontdek-ook cards + "Oplossingen voor {segment}" heading. 0 console errors, no broken images. |

## Deployment state
- `ipekci-theme.zip` last built 2026-07-11 (32.5 MB, 110 entries) and deployed; ipekci-theme active & reachable. All routes 200: `/`, `/ons-verhaal/`, `/contact/`, `/assortiment/` (+4 categories), `/voor-wie/` (+4 segments).
- **Zip-build gotcha (cost real time this session):** PowerShell `Compress-Archive` AND .NET `ZipFile.CreateFromDirectory` on Windows PowerShell 5.1 (.NET Framework) write ZIP entries with **backslash** separators, so PHP's unzip flattens them and WP rejects the theme with _"missing the style.css stylesheet."_ **Fix: build the zip with Python** (`zipfile`, always forward slashes):
  ```bash
  python -c "import zipfile,os; z=zipfile.ZipFile('ipekci-theme.zip','w',zipfile.ZIP_DEFLATED,compresslevel=6);\
  [z.write(os.path.join(dp,f), os.path.join(dp,f).replace(os.sep,'/')) for dp,_,fs in os.walk('ipekci-theme') for f in fs]; z.close()"
  ```
  Verify with `unzip -l ipekci-theme.zip | head` — entries must read `ipekci-theme/style.css` (forward slash).
- Deploy flow: activate a default theme (Twenty Twenty-Five) → delete ipekci-theme (delete URL from `window._wpThemeSettings`, decode `&amp;`→`&`, navigate directly to skip the JS confirm) → theme-install.php → Upload Theme → Install Now → activate ipekci-theme (auto-flushes rewrite rules via `after_switch_theme`) → LiteSpeed Purge All (`?LSCWP_CTRL=purge&LSCWP_NONCE=…&litespeed_type=purge_all`). Logged-in admin bypasses LiteSpeed for verification.
- Host is flaky over HTTP/2/QUIC — the 32 MB upload can stall; **retry the Install Now step** (the same-size POST succeeded on retry this session). Verify visually in Playwright, not curl.
- React reference dev server runs on **http://localhost:3000** (not 5173 — vite config overrides the port).

## Next recommended milestone
All React routes are migrated. Remaining is **polish / hardening**, not new pages:
1. **Wire the contact form** to email/WPForms (currently client-side only, faithful to React — see `/contact` row).
2. **Self-host fonts** (`assets/fonts/`) to drop the 3 render-blocking CDN font requests (tracked in README).
3. **Lighthouse pass** on each page (LCP/CLS), and consider lazy-defer the homepage brand videos (24 MB) — biggest payload.
4. **Cross-browser + real-device** spot check (Safari `mask-composite`, backdrop-filter fallbacks).
5. Optional: fill the remaining product placeholder images once the client supplies them (kept faithful to React `PLACEHOLDER` for now).
