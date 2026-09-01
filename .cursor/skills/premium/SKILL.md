---
name: premium
description: >-
  Upgrade Ayat Food pages to premium culinary UI using UI/UX Pro Max design
  intelligence, brand tokens, and established React/WP component patterns.
  Use when the user invokes /premium, asks for premium/luxury UI, says a section
  looks cheap or clipped, or wants producten/hero/intro sections elevated.
---

# /premium — Ayat Food Premium UI

Elevate pages to match premium food-wholesale mockups: cinematic dark heroes, cream editorial intros, floating trust ribbons, gold accents, generous spacing.

## Step 1 — Design system (required)

Run UI/UX Pro Max before coding:

```bash
python ~/.claude/skills/ui-ux-pro-max/scripts/search.py "halal food wholesale premium dark luxury culinary" --design-system -p "Ayat Food" -f markdown
```

On Windows use `python` instead of `python3`. Apply: dark + gold accent, serif display headings, 150–300ms motion, no emoji icons.

## Step 2 — Brand tokens (Ayat Food)

| Token | Value | Use |
|-------|-------|-----|
| Ink | `#030303` / `#141414` | Dark sections, body on light |
| Cream | `#FBF8F3` → `#ECE5DA` gradient | Intro / editorial sections |
| Brand red | `#B31217` / `#DA292A` | Labels, CTAs, accents |
| Gold | `rgba(198,160,98,0.9)` | Icons, borders, hairlines |
| Display | `font-display` | Headlines (Playfair-style) |

Reuse existing primitives — do not reinvent:
- `ProductCinematicHero` — full-bleed hero, stats rail with vertical dividers
- `ProductIntroSection` — cream split + trust ribbon stack
- `ProductTrustRibbon` — floating capsule USP bar
- `LuxLinkButton` / `PrimaryLinkButton` / `ipek-btn-premium`

Source of truth: `src/components/producten/ProductPrimitives.tsx`

## Step 3 — Layout rules (anti-clip)

**Never clip floating elements:**
- Do NOT put trust ribbons inside `overflow-hidden` parents with `absolute translate-y-1/2`
- Use `pr-intro-stack` wrapper: cream section (`overflow-visible`) + ribbon in document flow with negative margin (`-mt-10 lg:-mt-16`)
- Dark section below needs `pt-16 lg:pt-24` to clear ribbon overlap

**Premium spacing:**
- Section padding: `pt-16 sm:pt-20 lg:pt-24` minimum
- Touch targets: `min-h-[44px]` on all CTAs
- Line length: intro body `max-w-[52ch]`

**Visual depth:**
- Cream sections: peach radial glows (`rgba(255,200,160,0.22)` blur-3xl)
- Photos: `rounded-[28px] lg:rounded-[32px]`, gold corner brackets, soft shadow
- Trust ribbon: `lg:rounded-[999px]`, gold icon rings, inset top hairline

## Step 4 — Image parity (producten)

Match [ayatfood.nl](https://ayatfood.nl/producten/) image count — do not add extra photos:
- Index: text header, 1 image per category card, 3 spotlight images
- Category: 1 hero + 1 intro card image + shared cert photo
- No 3-up gallery beside intro

Assets: `src/assets/ayat/` (official downloads via `node scripts/download-ayat-producten.mjs`)

## Step 5 — Implementation checklist

```
- [ ] UI/UX Pro Max design-system query run
- [ ] No overflow-hidden on sections with floating ribbons
- [ ] Trust ribbon fully visible (not cut off at section edge)
- [ ] Cream gradient + ambient glows on intro
- [ ] Stats rail uses vertical dividers in hero
- [ ] prefers-reduced-motion respected (Framer `useReducedMotion`)
- [ ] Mobile: hero min-height `min(78svh,680px)`, ribbon `rounded-[1.25rem]`
- [ ] Build passes: npm run build
```

## Step 6 — Sync WordPress (if staging)

Deploy template + CSS when PHP mirror exists:
- `ipekci-theme/templates/page-producten.php`
- `ipekci-theme/assets/css/producten.css`
- `node scripts/deploy-files.mjs ...` then purge cache

## Reference

Detailed component notes: [reference.md](reference.md)
