# Premium UI — Component Reference

## ProductIntroSection stack structure

```tsx
<div className="pr-intro-stack relative z-[1]">
  <section className="pr-intro-premium overflow-visible bg-gradient-to-b ...">
    {/* content grid */}
  </section>
  <div className="relative z-30 -mt-10 px-4 sm:-mt-14 lg:-mt-16">
    <ProductTrustRibbon />
  </div>
</div>
```

## ProductCinematicHero badges

1. Bordered bestseller chip: Crown + "Bestseller" (red) | "Ayat Food" (white)
2. Category eyebrow in red caps (`category.eyebrow`)
3. Halal pill with red dot

## Common mistakes

| Mistake | Fix |
|---------|-----|
| Ribbon clipped | Remove `overflow-hidden` from intro; use flow + negative margin |
| Abrupt cream→black cut | Ribbon bridges sections; add `pt-*` on dark section |
| Flat cream bg | Use gradient + peach blur orbs |
| Split hero instead of cinematic | Use full-bleed bg image, text overlay left |
| Extra gallery images | Keep official ayatfood.nl image count |

## UI/UX Pro Max domains

```bash
python ~/.claude/skills/ui-ux-pro-max/scripts/search.py "glassmorphism dark luxury" --domain style
python ~/.claude/skills/ui-ux-pro-max/scripts/search.py "animation accessibility" --domain ux
```
