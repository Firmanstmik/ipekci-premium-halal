"""Extract React over-ons + hero-cta CSS into WP design-system.css append file."""
from pathlib import Path

src = Path("src/styles.css").read_text(encoding="utf-8")
lines = src.splitlines()

def find(substr, start=0):
    for i, l in enumerate(lines):
        if i >= start and substr in l:
            return i
    raise SystemExit(f"not found: {substr!r}")

# Hero CTA interaction block
h0 = find("Hero CTA (premium hover")
h1 = find("Standalone wipe link", h0)

# Over Ons theater (interaction)
o0 = find("Over Ons — premium bento theater")
o1 = find(".hero-cta:focus-visible", o0)  # next section after over-ons reduced-motion

# Mobile over-ons inside a max-width media query
m0 = find("Over Ons — mobile")
# Walk forward until we hit a non-over-ons comment or closing that ends the block
m1 = m0 + 1
depth_note = 0
while m1 < len(lines) and m1 - m0 < 150:
    line = lines[m1]
    if "over-ons" not in line.lower() and line.strip().startswith("/*") and m1 > m0 + 15:
        break
    m1 += 1

layout = r'''
/* ==========================================================================
   Over Ons — layout (ported from React Tailwind classes on HomeOverOnsSection)
   React uses utility classes for the grid; WP markup needs equivalent CSS.
   ========================================================================== */

.over-ons-bento,
.ipekci-overons__bento {
	display: grid;
	margin-top: 2rem;
	gap: 0.75rem;
}

@media (min-width: 640px) {
	.over-ons-bento,
	.ipekci-overons__bento {
		margin-top: 3.5rem;
		gap: 1.25rem;
	}
}

@media (min-width: 1024px) {
	.over-ons-bento,
	.ipekci-overons__bento {
		grid-template-columns: repeat(12, minmax(0, 1fr));
		grid-template-rows: auto auto;
		gap: 1.25rem;
	}

	.ipekci-overons__bento-hero {
		grid-column: span 7 / span 7;
		grid-row: span 2 / span 2;
	}

	.over-ons-bento__icons {
		grid-column: span 5 / span 5;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.over-ons-bento__icons > .story-reveal {
		flex: 1 1 auto;
		display: flex;
	}

	.over-ons-bento__icons .over-ons-icon-card {
		flex: 1 1 auto;
		width: 100%;
	}
}

.over-ons-bento__icons {
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
}

@media (min-width: 640px) {
	.over-ons-bento__icons {
		gap: 1.25rem;
	}
}

/* Hero shell — radii + min-heights from React SHELL / min-h utilities */
.over-ons-hero,
.over-ons-bento__hero {
	position: relative;
	isolation: isolate;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	min-height: 260px;
	height: 100%;
	background: #0a0a0a;
	border-radius: 1.35rem 0.75rem 1.5rem 0.9rem;
	box-shadow: 0 40px 100px -48px rgba(0, 0, 0, 0.55);
}

@media (min-width: 640px) {
	.over-ons-hero,
	.over-ons-bento__hero {
		min-height: 420px;
		border-radius: 1.65rem 0.9rem 1.85rem 1.05rem;
	}
}

@media (min-width: 1024px) {
	.over-ons-hero,
	.over-ons-bento__hero {
		min-height: 520px;
	}
}

.over-ons-hero__media {
	position: absolute;
	inset: -6% 0 auto;
	height: 112%;
}

.over-ons-hero__media img,
.over-ons-hero__img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.over-ons-hero__shade {
	position: absolute;
	inset: 0;
	pointer-events: none;
}

.over-ons-hero__shade-base {
	position: absolute;
	inset: 0;
	background: linear-gradient(to top, rgba(4, 4, 4, 0.96), rgba(5, 5, 5, 0.42) 50%, rgba(5, 5, 5, 0.1));
}

.over-ons-hero__shade-key {
	position: absolute;
	inset: 0;
	background: radial-gradient(ellipse 58% 50% at 18% 6%, rgba(255, 241, 222, 0.13), transparent 62%);
}

.over-ons-hero__shade-wash {
	position: absolute;
	inset: 0;
	background: radial-gradient(ellipse 80% 60% at 20% 0%, rgba(179, 18, 23, 0.16), transparent 55%);
}

.over-ons-hero__shade-vig {
	position: absolute;
	inset: 0;
	background: radial-gradient(ellipse 78% 72% at 50% 46%, transparent 34%, rgba(0, 0, 0, 0.44) 100%);
}

.over-ons-hero__shade-line {
	position: absolute;
	inset-inline: 0;
	bottom: 0;
	height: 1px;
	background: linear-gradient(90deg, transparent, rgba(226, 192, 141, 0.32), transparent);
}

.over-ons-hero__lift,
.over-ons-hero__sheen {
	position: absolute;
	inset: 0;
}

.over-ons-hero__content {
	position: relative;
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: space-between;
	padding: 1.5rem;
}

@media (min-width: 640px) {
	.over-ons-hero__content {
		padding: 2rem;
	}
}

@media (min-width: 1024px) {
	.over-ons-hero__content {
		padding: 2.5rem;
	}
}

.over-ons-hero__top {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	gap: 1rem;
}

.over-ons-hero__index {
	font-family: var(--ipek-font-display, inherit);
	font-size: 11px;
	font-weight: 600;
	letter-spacing: 0.24em;
	color: rgba(255, 255, 255, 0.45);
	tabular-nums: true;
}

.over-ons-hero__live {
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
	border-radius: 9999px;
	border: 1px solid rgba(226, 192, 141, 0.34);
	background: rgba(0, 0, 0, 0.45);
	padding: 0.375rem 0.75rem;
	font-size: 9px;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.2em;
	color: rgba(240, 226, 202, 0.95);
	backdrop-filter: blur(12px);
}

.over-ons-hero__pulse {
	width: 6px;
	height: 6px;
	border-radius: 9999px;
	background: #da292a;
	flex-shrink: 0;
}

.over-ons-hero__bottom h3 {
	margin: 0;
	font-family: var(--ipek-font-display, inherit);
	font-size: clamp(1.35rem, 2vw, 1.85rem);
	font-weight: 600;
	color: #fff;
	letter-spacing: -0.02em;
}

.over-ons-hero__bottom p {
	margin: 0.5rem 0 0;
	max-width: 36ch;
	font-size: 13px;
	line-height: 1.65;
	color: rgba(255, 255, 255, 0.72);
}

.over-ons-hero__rule {
	margin-top: 1rem;
	height: 1px;
	width: 3rem;
	origin: left;
	background: linear-gradient(90deg, rgba(226, 192, 141, 0.85), transparent);
	transform-origin: left center;
}

.over-ons-hero__caption {
	margin-top: 0.75rem !important;
	font-size: 11px !important;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	color: rgba(240, 226, 202, 0.7) !important;
}

/* Feature cards — structural */
.over-ons-icon-card {
	position: relative;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	border-radius: 1.25rem;
	border: 1px solid rgba(0, 0, 0, 0.06);
	background: linear-gradient(165deg, #ffffff 0%, #faf8f5 100%);
	padding: 1rem;
	box-shadow: 0 28px 70px -48px rgba(0, 0, 0, 0.28);
	min-height: 0;
}

@media (min-width: 640px) {
	.over-ons-icon-card {
		padding: 1.75rem;
		min-height: 248px;
	}
}

.over-ons-icon-card__glow {
	pointer-events: none;
	position: absolute;
	right: -1.5rem;
	top: -1.5rem;
	height: 7rem;
	width: 7rem;
	border-radius: 9999px;
	background: radial-gradient(circle, rgba(179, 18, 23, 0.08), transparent 70%);
}

.over-ons-icon-card__edge {
	pointer-events: none;
	position: absolute;
	inset-inline: 0;
	top: 0;
	height: 1px;
	background: linear-gradient(90deg, transparent, rgba(179, 18, 23, 0.55), transparent);
}

.over-ons-icon-card__index {
	position: absolute;
	right: 1rem;
	top: 1rem;
	display: none;
	font-family: var(--ipek-font-display, inherit);
	font-size: 11px;
	font-weight: 600;
	letter-spacing: 0.22em;
	color: rgba(20, 20, 20, 0.25);
	tabular-nums: true;
}

@media (min-width: 640px) {
	.over-ons-icon-card__index {
		display: block;
		right: 1.5rem;
		top: 1.5rem;
	}
}

.over-ons-icon-card__row {
	position: relative;
	display: flex;
	min-width: 0;
	gap: 0.875rem;
}

@media (min-width: 640px) {
	.over-ons-icon-card__row {
		gap: 1.25rem;
	}
}

.over-ons-icon-card__tile {
	display: flex;
	height: 2.75rem;
	width: 2.75rem;
	flex-shrink: 0;
	align-items: center;
	justify-content: center;
	border-radius: 1rem;
	border: 1px solid rgba(179, 18, 23, 0.12);
	background: linear-gradient(145deg, rgba(179, 18, 23, 0.06), rgba(255, 255, 255, 0.9));
	box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

@media (min-width: 640px) {
	.over-ons-icon-card__tile {
		height: 4.5rem;
		width: 4.5rem;
		border-radius: 1rem;
	}
}

.over-ons-icon-card__icon {
	height: 2rem;
	width: 2rem;
	object-fit: contain;
}

@media (min-width: 640px) {
	.over-ons-icon-card__icon {
		height: 3rem;
		width: 3rem;
	}
}

.over-ons-icon-card__text {
	min-width: 0;
	flex: 1;
}

.over-ons-icon-card__text h3 {
	margin: 0;
	padding-right: 0;
	font-family: var(--ipek-font-display, inherit);
	font-size: 1.05rem;
	font-weight: 600;
	letter-spacing: -0.02em;
	color: #141414;
	line-height: 1.2;
}

@media (min-width: 640px) {
	.over-ons-icon-card__text h3 {
		padding-right: 2.25rem;
		font-size: 1.35rem;
	}
}

.over-ons-icon-card__text p {
	margin: 0.375rem 0 0;
	font-size: 12px;
	line-height: 1.55;
	color: rgba(20, 20, 20, 0.66);
}

@media (min-width: 640px) {
	.over-ons-icon-card__text p {
		margin-top: 0.625rem;
		font-size: 13px;
		line-height: 1.7;
	}
}

.over-ons-icon-card__rule {
	display: none;
	margin-top: 1.25rem;
	height: 1px;
	width: 100%;
	transform-origin: left center;
	background: linear-gradient(90deg, rgba(179, 18, 23, 0.34), rgba(20, 20, 20, 0.08) 38%, transparent);
}

@media (min-width: 640px) {
	.over-ons-icon-card__rule {
		display: block;
	}
}

.over-ons-icon-card__chips {
	position: relative;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 0.375rem;
	margin: 0.75rem 0 0;
	padding: 0;
	list-style: none;
}

@media (min-width: 640px) {
	.over-ons-icon-card__chips {
		margin-top: 1rem;
		gap: 0.5rem;
	}
}

.over-ons-chip {
	display: inline-flex;
	align-items: center;
	gap: 0.375rem;
	border-radius: 9999px;
	border: 1px solid rgba(20, 20, 20, 0.08);
	background: rgba(255, 255, 255, 0.85);
	padding: 0.25rem 0.625rem;
	font-size: 9px;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.2em;
	color: rgba(20, 20, 20, 0.62);
}

.over-ons-chip--cert {
	border-color: rgba(179, 18, 23, 0.22);
	background: #fff;
	color: #b31217;
	box-shadow: 0 8px 20px -16px rgba(179, 18, 23, 0.7);
}

.over-ons-chip__seal {
	height: 0.75rem;
	width: 0.75rem;
	object-fit: contain;
}

.over-ons-chip__dot {
	width: 4px;
	height: 4px;
	border-radius: 9999px;
	background: rgba(179, 18, 23, 0.55);
}

.over-ons-icon-card__footer {
	position: relative;
	margin-top: auto;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	gap: 0.75rem;
	padding-top: 1rem;
}

.over-ons-icon-card__link {
	display: inline-flex;
	align-items: center;
	gap: 0.375rem;
	font-size: 10px;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.18em;
	color: #b31217;
	text-decoration: none;
}

.over-ons-icon-card__note {
	font-size: 11px;
	color: rgba(20, 20, 20, 0.45);
}

/* Lower panel: story + proof */
.ipekci-overons__panel {
	display: grid;
	gap: 1.25rem;
	margin-top: 2rem;
}

@media (min-width: 1024px) {
	.ipekci-overons__panel {
		grid-template-columns: 1.35fr 1fr;
		gap: 1.5rem;
		margin-top: 3rem;
	}
}

.over-ons-story,
.over-ons-proof {
	position: relative;
	overflow: hidden;
	border-radius: 1.35rem;
	border: 1px solid rgba(0, 0, 0, 0.06);
	background: #fff;
	padding: 1.5rem;
	box-shadow: 0 28px 70px -48px rgba(0, 0, 0, 0.22);
}

@media (min-width: 640px) {
	.over-ons-story,
	.over-ons-proof {
		padding: 2rem;
	}
}

.over-ons-story__kicker,
.over-ons-story__customer-kicker {
	margin: 0;
	font-size: 10px;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.2em;
	color: #b31217;
}

.over-ons-story__text,
.over-ons-story__customer-text {
	margin: 0.75rem 0 0;
	font-size: 15px;
	line-height: 1.75;
	color: rgba(20, 20, 20, 0.72);
}

.over-ons-story__customer {
	margin-top: 1.5rem;
	padding-top: 1.25rem;
	border-top: 1px solid rgba(20, 20, 20, 0.08);
}

.over-ons-story__customer-meta {
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
	margin-top: 0.75rem;
	font-size: 12px;
	font-weight: 600;
	color: rgba(20, 20, 20, 0.55);
}

.over-ons-story__customer-seal {
	height: 1rem;
	width: 1rem;
	object-fit: contain;
}

.over-ons-proof__stat-num {
	display: block;
	font-family: var(--ipek-font-display, inherit);
	font-size: clamp(2.5rem, 4vw, 3.5rem);
	font-weight: 600;
	letter-spacing: -0.03em;
	color: #141414;
	line-height: 1;
}

.over-ons-proof__stat-label {
	display: block;
	margin-top: 0.35rem;
	font-size: 12px;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.16em;
	color: rgba(20, 20, 20, 0.5);
}

.over-ons-proof__stat-meta {
	margin: 0.75rem 0 0;
	font-size: 13px;
	line-height: 1.55;
	color: rgba(20, 20, 20, 0.62);
}

.over-ons-proof__checklist {
	margin: 1.25rem 0 0;
	padding: 0;
	list-style: none;
	display: grid;
	gap: 0.5rem;
}

.over-ons-check {
	display: flex;
	align-items: center;
	gap: 0.625rem;
	font-size: 13px;
	font-weight: 500;
	color: #141414;
}

.over-ons-check__mark {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 1.25rem;
	height: 1.25rem;
	border-radius: 9999px;
	background: rgba(179, 18, 23, 0.08);
	color: #b31217;
	flex-shrink: 0;
}

/* Dual CTA desk/mob label swap — matches React hidden sm:inline / sm:hidden */
.ipekci-hero__cta-label-mob,
.ipekci-eindproducten__cta-mob,
.ipekci-vac__cta-label-mob,
.ipekci-vw-hero__cta-label-mob,
.ipekci-404__cta-label-mob,
.ipekci-pr-only-narrow {
	display: none;
}

@media (max-width: 639px) {
	.ipekci-hero__cta-label-desk,
	.ipekci-eindproducten__cta-desk,
	.ipekci-vac__cta-label-desk,
	.ipekci-vw-hero__cta-label-desk,
	.ipekci-404__cta-label-desk,
	.ipekci-pr-only-wide {
		display: none;
	}

	.ipekci-hero__cta-label-mob,
	.ipekci-eindproducten__cta-mob,
	.ipekci-vac__cta-label-mob,
	.ipekci-vw-hero__cta-label-mob,
	.ipekci-404__cta-label-mob,
	.ipekci-pr-only-narrow {
		display: inline;
	}
}
'''

hero_css = "\n".join(lines[h0:h1])
over_css = "\n".join(lines[o0:o1])
mobile_css = "\n".join(lines[m0:m1])

# Strip Tailwind @apply-unrelated nesting: React CSS is inside @layer components { }
# Our extract may include leading whitespace; wrap in a plain block.

out = Path("ipekci-theme/assets/css/over-ons.css")
header = """/**
 * Over Ons + Hero CTA parity layer.
 * Ported from src/styles.css (React source of truth).
 * Do not redesign — keep in sync with HomeOverOnsSection / HeroCtaButton.
 */
"""
content = header + "\n" + layout + "\n\n" + hero_css + "\n\n" + over_css + "\n\n@media (max-width: 639px) {\n" + mobile_css + "\n}\n"

# Also alias dual-cta to .hero-cta
content += """
/* Dual CTA must size .hero-cta the same as legacy .ipekci-hero-cta */
@media (max-width: 639px) {
	.ipek-dual-cta .hero-cta {
		display: inline-flex;
		width: 100%;
		min-height: 2.75rem;
		padding: 0.5rem 0.375rem;
		font-size: 8px;
		letter-spacing: 0.08em;
		line-height: 1.25;
		gap: 0.25rem;
		justify-content: center;
		align-items: center;
		text-align: center;
		white-space: normal;
	}
	.ipek-dual-cta .hero-cta svg {
		width: 11px;
		height: 11px;
		flex-shrink: 0;
	}
}
@media (max-width: 359px) {
	.ipek-dual-cta .hero-cta {
		font-size: 7.5px;
		letter-spacing: 0.06em;
	}
}
"""

out.write_text(content, encoding="utf-8")
print(f"Wrote {out} ({out.stat().st_size/1024:.1f} KB)")
print(f"hero lines {h0}-{h1}, over-ons {o0}-{o1}, mobile {m0}-{m1}")
