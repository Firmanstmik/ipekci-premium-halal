import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { ArrowUpRight, Check, ChevronRight, Clock, Crown, Gem, Headphones, Shield } from "lucide-react";
import {
  ProductCatalogList,
  ProductRegistrationCta,
  ProductStarRating,
} from "@/components/producten/ProductOfficialSections";
import { AyatSectionBadge } from "@/components/home/AyatSectionBadge";
import { DualCtaRow } from "@/components/ui/DualCtaRow";
import { BRAND } from "@/lib/brand";
import { DS_EASE, DS_EASE_REVEAL } from "@/lib/design-system";
import {
  PRODUCT_ASSURANCES,
  PRODUCT_AUDIENCES,
  PRODUCT_CERTIFICATION,
  PRODUCT_HELP_CTA,
  PRODUCT_ORDER_STEPS,
  PRODUCT_TRUST_BAR,
  type ProductCategory,
} from "@/lib/producten-content";
import productenSfeer from "@/assets/ayat/producten-sfeer.jpg";

/* ── Motion helpers ─────────────────────────────────────────── */

/** Section-level reveal. One wrapper, used everywhere, so timing never drifts. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.9, delay: reduceMotion ? 0 : delay, ease: DS_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Buttons ────────────────────────────────────────────────── */

type LuxButtonProps = {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
};

/** Quiet luxury button — hairline outline that fills with brand gold. */
export function LuxLinkButton({
  to,
  href,
  children,
  className = "",
  tone = "light",
}: LuxButtonProps & { to?: string; href?: string }) {
  const cls = `lux-btn ${tone === "dark" ? "lux-btn--dark" : ""} ${className}`;
  const inner = (
    <>
      <span className="relative">{children}</span>
      <ArrowUpRight size={13} className="lux-btn__arrow relative shrink-0" />
    </>
  );

  if (to) {
    return (
      <Link to={to} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <a href={href} className={cls}>
      {inner}
    </a>
  );
}

/** Solid brand button — the primary catalogue action. */
export function PrimaryLinkButton({
  to,
  href,
  children,
  className = "",
}: LuxButtonProps & { to?: string; href?: string }) {
  const cls = `ipek-btn-premium group px-7 py-3.5 text-[11px] tracking-[0.2em] sm:px-9 sm:py-4 sm:text-[12px] ${className}`;
  const inner = (
    <span className="relative z-[1] inline-flex items-center gap-2.5">
      {children}
      <ArrowUpRight size={15} className="ipek-btn-premium__arrow shrink-0" />
    </span>
  );

  if (to) {
    return (
      <Link to={to} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <a href={href} className={cls}>
      {inner}
    </a>
  );
}

/* ── Hero ───────────────────────────────────────────────────── */

/**
 * Cinematic catalogue hero.
 * A still photograph on a slow scale-in, four stacked gradients for depth,
 * a floating certification badge and a headline that reveals word by word.
 */
export function ProductHero({
  image,
  eyebrow,
  title,
  lede,
  breadcrumb,
  badge,
  meta,
  children,
}: {
  image: string;
  eyebrow: string;
  title: string;
  lede: string;
  /** Trail after Home — the last entry renders as the current page. */
  breadcrumb: readonly { label: string; to?: string }[];
  badge?: string;
  meta?: readonly { value: string; label: string }[];
  children?: ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const words = title.split(" ");

  return (
    <section ref={ref} className="product-hero-mobile relative min-h-[88vh] overflow-hidden bg-[#030303] grain">
      <div className="absolute inset-0">
        <motion.img
          src={image}
          alt=""
          aria-hidden
          className="h-full w-full object-cover"
          style={{ filter: "brightness(0.36) contrast(1.08) saturate(1.05)" }}
          initial={reduceMotion ? false : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: DS_EASE_REVEAL }}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </div>

      {/* Layered grade — top scrim, warm key light, brand wash, bottom fade */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/58 via-[#030303]/24 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_78%_12%,rgba(255,241,222,0.12),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_18%_8%,rgba(179,18,23,0.16),transparent_55%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#030303] via-[#030303]/84 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_78%_72%_at_50%_46%,transparent_36%,rgba(0,0,0,0.42)_100%)]" />
      </div>

      <motion.div
        style={{ y: reduceMotion ? 0 : contentY, opacity: reduceMotion ? 1 : opacity }}
        className="product-hero-mobile__inner relative mx-auto flex min-h-[88vh] ipek-container flex-col justify-end pb-20 pt-36 sm:pt-40 lg:px-10 lg:pb-24 lg:pt-48"
      >
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: DS_EASE }}
          className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-white/42"
        >
          <Link to="/" className="lux-crumb transition-colors hover:text-[rgba(226,192,141,0.95)]">
            Home
          </Link>
          {breadcrumb.map((crumb, i) => {
            const isLast = i === breadcrumb.length - 1;
            return (
              <span key={crumb.label} className="flex items-center gap-2">
                <ChevronRight size={12} className="text-white/22" />
                {isLast || !crumb.to ? (
                  <span className="text-white/80">{crumb.label}</span>
                ) : (
                  <Link
                    to={crumb.to}
                    className="lux-crumb transition-colors hover:text-[rgba(226,192,141,0.95)]"
                  >
                    {crumb.label}
                  </Link>
                )}
              </span>
            );
          })}
        </motion.nav>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, delay: 0.15, ease: DS_EASE }}
          className="mt-10 h-px w-24 origin-left bg-gradient-to-r from-[rgba(226,192,141,0.9)] to-transparent"
          aria-hidden
        />

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <p className="ipek-label ipek-heading-label text-[10px] tracking-[0.32em]">{eyebrow}</p>
          {badge && (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: DS_EASE }}
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(226,192,141,0.34)] bg-black/40 px-3.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-[rgba(240,226,202,0.95)] backdrop-blur-md"
            >
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#DA292A]" />
              {badge}
            </motion.span>
          )}
        </div>

        <h1 className="product-hero-mobile__title mt-5 max-w-4xl font-display text-[clamp(2.6rem,5.6vw,4.8rem)] leading-[1.02] text-white">
          {words.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              initial={{ opacity: 0, y: 48, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.2 + i * 0.07, ease: DS_EASE_REVEAL }}
              className="mr-[0.22em] inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: DS_EASE }}
          className="mt-7 max-w-2xl text-base leading-[1.85] text-white/72 md:text-[17px]"
        >
          {lede}
        </motion.p>

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.68, ease: DS_EASE }}
            className="mt-10"
          >
            <DualCtaRow wide>{children}</DualCtaRow>
          </motion.div>
        )}

        {meta && meta.length > 0 && (
          <motion.dl
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8, ease: DS_EASE }}
            className="mt-12 grid max-w-xl grid-cols-3 gap-3 border-t border-white/[0.09] pt-7 sm:gap-6"
          >
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="sr-only">{m.label}</dt>
                <dd className="font-display text-[1.35rem] leading-none tracking-[-0.03em] text-white sm:text-[1.6rem]">
                  {m.value}
                </dd>
                <p className="mt-2.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/45 sm:text-[10px]">
                  {m.label}
                </p>
              </div>
            ))}
          </motion.dl>
        )}
      </motion.div>
    </section>
  );
}

const TRUST_BAR_ICONS = {
  halal: Shield,
  nvwa: Gem,
  levering: Clock,
  contact: Headphones,
} as const;

/**
 * Cinematic catalogue hero — full-bleed photograph, copy overlay left,
 * stats rail with vertical dividers. Matches premium producten mockup.
 */
export function ProductCinematicHero({
  image,
  eyebrow,
  title,
  lede,
  breadcrumb,
  badge = "100% Halal · ECC Halal",
  meta,
  children,
}: {
  image: string;
  eyebrow: string;
  title: string;
  lede: string;
  breadcrumb: readonly { label: string; to?: string }[];
  badge?: string;
  meta?: readonly { value: string; label: string }[];
  children?: ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="pr-cinematic-hero relative isolate min-h-[min(92vh,900px)] overflow-hidden bg-[#030303] grain">
      <div className="pr-cinematic-hero__stage">
        <div className="pr-cinematic-hero__media">
          <motion.img
            src={image}
            alt=""
            aria-hidden
            className="pr-cinematic-hero__img h-full w-full object-cover object-[72%_center] sm:object-[78%_center] lg:object-[82%_center]"
            style={{ filter: "brightness(0.52) contrast(1.06) saturate(1.08)" }}
            initial={reduceMotion ? false : { scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.2, ease: DS_EASE_REVEAL }}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>

        <div aria-hidden className="pr-cinematic-hero__grades pointer-events-none">
          <div className="pr-cinematic-hero__grade pr-cinematic-hero__grade--scrim" />
          <div className="pr-cinematic-hero__grade pr-cinematic-hero__grade--warm" />
          <div className="pr-cinematic-hero__grade pr-cinematic-hero__grade--bottom" />
          <div className="pr-cinematic-hero__grade pr-cinematic-hero__grade--vignette" />
        </div>
      </div>

      <div className="pr-cinematic-hero__shell relative mx-auto flex min-h-[min(92vh,900px)] ipek-container flex-col justify-end pb-0 pt-28 sm:pt-32 lg:pt-36">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, ease: DS_EASE_REVEAL }}
          className="pr-cinematic-hero__copy max-w-2xl pb-10 lg:pb-12"
        >
          <span className="pr-cinematic-hero__handle" aria-hidden />

          <nav
            aria-label="Breadcrumb"
            className="pr-cinematic-hero__crumb flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-white/38"
          >
            <Link to="/" className="lux-crumb transition-colors hover:text-[rgba(226,192,141,0.95)]">
              Home
            </Link>
            {breadcrumb.map((crumb, i) => {
              const isLast = i === breadcrumb.length - 1;
              return (
                <span key={crumb.label} className="flex min-w-0 items-center gap-2">
                  <ChevronRight size={12} className="shrink-0 text-white/18" />
                  {isLast || !crumb.to ? (
                    <span className="truncate text-white/72">{crumb.label}</span>
                  ) : (
                    <Link
                      to={crumb.to}
                      className="lux-crumb truncate transition-colors hover:text-[rgba(226,192,141,0.95)]"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </span>
              );
            })}
          </nav>

          <div className="pr-cinematic-hero__badges mt-6 flex items-center gap-2.5 sm:mt-8 sm:flex-wrap sm:gap-x-4 sm:gap-y-3">
            <span className="pr-cinematic-hero__badge pr-cinematic-hero__badge--bestseller inline-flex shrink-0 items-center gap-2 rounded-md border border-[rgba(218,41,42,0.55)] bg-black/35 px-3 py-1.5 backdrop-blur-sm">
              <Crown size={13} className="shrink-0 text-[#DA292A]" strokeWidth={2} aria-hidden />
              <span className="text-[9px] font-bold uppercase tracking-[0.26em] text-[#DA292A]">
                Bestseller
              </span>
              <span aria-hidden className="hidden h-3 w-px bg-white/18 sm:block" />
              <span className="hidden text-[9px] font-semibold uppercase tracking-[0.22em] text-white/88 sm:inline">
                Ayat Food
              </span>
            </span>
            <span className="pr-cinematic-hero__badge pr-cinematic-hero__badge--eyebrow shrink-0 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#DA292A]">
              {eyebrow}
            </span>
            <span className="pr-cinematic-hero__badge pr-cinematic-hero__badge--halal inline-flex shrink-0 items-center gap-2 rounded-full border border-[rgba(226,192,141,0.32)] bg-black/40 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[rgba(240,226,202,0.95)] backdrop-blur-md">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#DA292A]" />
              <span className="sm:hidden">100% Halal</span>
              <span className="hidden sm:inline">{badge}</span>
            </span>
          </div>

          <h1 className="pr-cinematic-hero__title mt-5 font-display text-[clamp(3rem,7vw,5.5rem)] leading-[0.98] tracking-[-0.04em] text-white sm:mt-7">
            {title}
          </h1>

          <p className="pr-cinematic-hero__lede mt-4 max-w-xl text-[15px] leading-[1.85] text-white/66 sm:mt-6 md:text-base">
            {lede}
          </p>

          {children && (
            <div className="pr-cinematic-hero__actions mt-7 sm:mt-9">
              <DualCtaRow wide>{children}</DualCtaRow>
            </div>
          )}
        </motion.div>

        {meta && meta.length > 0 && (
          <motion.dl
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: DS_EASE }}
            className="pr-cinematic-hero__stats grid grid-cols-3 divide-x divide-white/[0.1] border-t border-white/[0.1]"
          >
            {meta.map((m) => (
              <div key={m.label} className="px-3 py-4 first:pl-0 last:pr-0 sm:px-8 sm:py-6">
                <dt className="sr-only">{m.label}</dt>
                <dd className="font-display text-[clamp(1.25rem,2.5vw,1.65rem)] leading-none tracking-[-0.03em] text-white">
                  {m.value}
                </dd>
                <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.24em] text-white/40 sm:mt-2.5 sm:text-[10px]">
                  {m.label}
                </p>
              </div>
            ))}
          </motion.dl>
        )}
      </div>
    </section>
  );
}

/** Floating capsule trust ribbon — sits on section boundary. */
export function ProductTrustRibbon({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pr-trust-ribbon relative overflow-hidden rounded-[1.25rem] border border-white/[0.12] bg-[#080808] shadow-[0_32px_100px_-24px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-xl lg:rounded-[999px] ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(198,160,98,0.35),transparent)]"
      />
      <div className="relative grid divide-y divide-white/[0.07] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
        {PRODUCT_TRUST_BAR.map((item, i) => {
          const Icon = TRUST_BAR_ICONS[item.id];
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: DS_EASE_REVEAL }}
              className="flex items-center gap-4 px-6 py-6 sm:px-7 lg:px-8 lg:py-7"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[rgba(198,160,98,0.42)] bg-[linear-gradient(145deg,rgba(198,160,98,0.14),rgba(198,160,98,0.04))] text-[rgba(226,192,141,0.98)] shadow-[0_0_24px_-8px_rgba(198,160,98,0.45)]">
                <Icon size={18} strokeWidth={1.75} />
              </span>
              <div className="min-w-0">
                <p className="font-display text-[1rem] leading-tight text-white sm:text-[1.08rem]">
                  {item.title}
                </p>
                <p className="mt-1.5 text-[11px] leading-snug text-white/50">{item.subtitle}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/** Cream intro + editorial photo + floating trust ribbon. */
export function ProductIntroSection({
  category,
  packagingFormats,
  states,
}: {
  category: ProductCategory;
  packagingFormats: readonly string[];
  states: readonly string[];
}) {
  return (
    <div className="pr-intro-stack relative z-[1]">
      <section className="pr-intro-premium relative overflow-visible bg-gradient-to-b from-[#FBF8F3] via-[#F5F0E8] to-[#ECE5DA] pt-16 sm:pt-20 lg:pt-24">
        {/* Soft peach ambient glows — mockup depth */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[10%] top-[8%] h-[48%] w-[42%] rounded-full bg-[radial-gradient(ellipse,rgba(255,200,160,0.22)_0%,transparent_68%)] blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-[8%] top-[22%] h-[40%] w-[36%] rounded-full bg-[radial-gradient(ellipse,rgba(255,180,140,0.16)_0%,transparent_70%)] blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[12%] left-[18%] h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(179,18,23,0.07),transparent_70%)] blur-xl"
        />

        <div className="relative ipek-container pb-20 sm:pb-24 lg:pb-28">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-20">
            <Reveal>
              <p className="ipek-label ipek-heading-label text-[10px] tracking-[0.3em]">
                Beste producten
              </p>
              <h2 className="mt-4 font-display text-[clamp(2.2rem,4vw,3.35rem)] leading-[1.06] tracking-[-0.03em] text-[#141414]">
                {category.label}
              </h2>
              <div
                aria-hidden
                className="mt-5 h-px w-20 bg-[linear-gradient(90deg,rgba(179,18,23,0.55),transparent)]"
              />
              <div className="mt-8 space-y-5">
                {category.intro.map((p, i) => (
                  <p key={i} className="max-w-[52ch] text-[15px] leading-[1.92] text-[#454545]">
                    {p}
                  </p>
                ))}
              </div>

              {(packagingFormats.length > 0 || states.length > 0) && (
                <div className="mt-9 border-t border-[#141414]/08 pt-7">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#141414]/42">
                    Verpakking &amp; levering
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {[...packagingFormats, ...states].map((label) => (
                      <li
                        key={label}
                        className="rounded-full border border-[#141414]/10 bg-white/70 px-3.5 py-1.5 text-[10px] font-medium text-[#141414]/75 shadow-sm"
                      >
                        {label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <ProductRegistrationCta className="mt-11" />
            </Reveal>

            <Reveal delay={0.1}>
              <ProductCatalogList id="assortiment" products={category.products} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Trust ribbon — document flow (never clip with overflow-hidden) */}
      <div className="relative z-30 -mt-10 px-4 sm:-mt-14 sm:px-6 lg:-mt-16">
        <div className="mx-auto max-w-[min(100%,960px)]">
          <ProductTrustRibbon />
        </div>
      </div>
    </div>
  );
}

/** Standalone trust bar (index page). */
export function ProductTrustBar() {
  return (
    <section className="relative z-10 -mt-6 px-4 sm:px-6">
      <div className="mx-auto max-w-[min(100%,920px)]">
        <ProductTrustRibbon />
      </div>
    </section>
  );
}

/* ── Index page header (text-only — matches official /producten/) ── */

/**
 * Light catalogue header without a hero photograph.
 * The official index publishes only a title and breadcrumb above the cards.
 */
export function ProductPageHeader({
  title,
  breadcrumb,
  lede,
  image,
}: {
  title: string;
  breadcrumb: readonly { label: string; to?: string }[];
  lede?: string;
  image?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (image) {
    return (
      <section className="pr-cinematic-hero pr-index-hero relative isolate min-h-[min(92vh,900px)] overflow-hidden bg-[#030303] grain">
        <div className="pr-cinematic-hero__stage">
          <div className="pr-cinematic-hero__media">
            <motion.img
              src={image}
              alt=""
              aria-hidden
              className="pr-cinematic-hero__img h-full w-full object-cover object-[68%_center] sm:object-[72%_center]"
              style={{ filter: "brightness(0.48) contrast(1.06) saturate(1.08)" }}
              initial={reduceMotion ? false : { scale: 1.06 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.2, ease: DS_EASE_REVEAL }}
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>
          <div aria-hidden className="pr-cinematic-hero__grades pointer-events-none">
            <div className="pr-cinematic-hero__grade pr-cinematic-hero__grade--scrim" />
            <div className="pr-cinematic-hero__grade pr-cinematic-hero__grade--warm" />
            <div className="pr-cinematic-hero__grade pr-cinematic-hero__grade--bottom" />
            <div className="pr-cinematic-hero__grade pr-cinematic-hero__grade--vignette" />
          </div>
        </div>

        <div className="pr-cinematic-hero__shell relative mx-auto flex min-h-[min(92vh,900px)] ipek-container flex-col justify-end pb-0 pt-28 sm:pt-32 lg:pt-36">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease: DS_EASE_REVEAL }}
            className="pr-cinematic-hero__copy max-w-2xl pb-10 lg:pb-12"
          >
            <span className="pr-cinematic-hero__handle" aria-hidden />

            <nav
              aria-label="Breadcrumb"
              className="pr-cinematic-hero__crumb flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-white/38"
            >
              <Link to="/" className="lux-crumb transition-colors hover:text-[rgba(226,192,141,0.95)]">
                Home
              </Link>
              {breadcrumb.map((crumb, i) => {
                const isLast = i === breadcrumb.length - 1;
                return (
                  <span key={crumb.label} className="flex min-w-0 items-center gap-2">
                    <ChevronRight size={12} className="shrink-0 text-white/18" />
                    {isLast || !crumb.to ? (
                      <span className="truncate text-white/72">{crumb.label}</span>
                    ) : (
                      <Link
                        to={crumb.to}
                        className="lux-crumb truncate transition-colors hover:text-[rgba(226,192,141,0.95)]"
                      >
                        {crumb.label}
                      </Link>
                    )}
                  </span>
                );
              })}
            </nav>

            <div className="pr-cinematic-hero__badges mt-6 flex items-center gap-2.5 sm:mt-8">
              <span className="pr-cinematic-hero__badge pr-cinematic-hero__badge--bestseller inline-flex shrink-0 items-center gap-2 rounded-md border border-[rgba(218,41,42,0.55)] bg-black/35 px-3 py-1.5 backdrop-blur-sm">
                <Crown size={13} className="shrink-0 text-[#DA292A]" strokeWidth={2} aria-hidden />
                <span className="text-[9px] font-bold uppercase tracking-[0.26em] text-[#DA292A]">
                  Assortiment
                </span>
                <span aria-hidden className="hidden h-3 w-px bg-white/18 sm:block" />
                <span className="hidden text-[9px] font-semibold uppercase tracking-[0.22em] text-white/88 sm:inline">
                  Ayat Food
                </span>
              </span>
              <span className="pr-cinematic-hero__badge pr-cinematic-hero__badge--eyebrow shrink-0 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#DA292A]">
                Halal groothandel
              </span>
            </div>

            <h1 className="pr-cinematic-hero__title mt-5 font-display text-[clamp(3rem,7vw,5.5rem)] leading-[0.98] tracking-[-0.04em] text-white sm:mt-7">
              {title}
            </h1>

            {lede && (
              <p className="pr-cinematic-hero__lede mt-4 max-w-xl text-[15px] leading-[1.85] text-white/66 sm:mt-6">
                {lede}
              </p>
            )}
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="pr-index-hero pr-index-hero--text relative isolate overflow-hidden bg-[#030303] grain pt-28 sm:pt-32 lg:pt-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_78%_12%,rgba(255,241,222,0.06),transparent_58%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_18%_8%,rgba(179,18,23,0.12),transparent_55%)]"
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-white/[0.08]" />

      <div className="relative ipek-container pb-14 sm:pb-16 lg:pb-20">
        <motion.nav
          aria-label="Breadcrumb"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: DS_EASE }}
          className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-white/38"
        >
          <Link to="/" className="lux-crumb transition-colors hover:text-[rgba(226,192,141,0.95)]">
            Home
          </Link>
          {breadcrumb.map((crumb, i) => {
            const isLast = i === breadcrumb.length - 1;
            return (
              <span key={crumb.label} className="flex items-center gap-2">
                <ChevronRight size={12} className="text-white/18" />
                {isLast || !crumb.to ? (
                  <span className="text-white/72">{crumb.label}</span>
                ) : (
                  <Link
                    to={crumb.to}
                    className="lux-crumb transition-colors hover:text-[rgba(226,192,141,0.95)]"
                  >
                    {crumb.label}
                  </Link>
                )}
              </span>
            );
          })}
        </motion.nav>

        <div className="mt-8 inline-flex items-center gap-2.5 rounded-md border border-[rgba(218,41,42,0.55)] bg-black/35 px-3 py-1.5 backdrop-blur-sm">
          <Crown size={13} className="shrink-0 text-[#DA292A]" strokeWidth={2} aria-hidden />
          <span className="text-[9px] font-bold uppercase tracking-[0.26em] text-[#DA292A]">
            Assortiment
          </span>
          <span aria-hidden className="h-3 w-px bg-white/18" />
          <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/88">
            Ayat Food
          </span>
        </div>

        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.08, ease: DS_EASE_REVEAL }}
          className="mt-6 max-w-3xl font-display text-[clamp(2.8rem,6vw,4.5rem)] leading-[1.02] tracking-[-0.04em] text-white"
        >
          {title}
        </motion.h1>

        {lede && (
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.16, ease: DS_EASE }}
            className="mt-6 max-w-2xl text-[15px] leading-[1.85] text-white/58"
          >
            {lede}
          </motion.p>
        )}
      </div>
    </section>
  );
}

/* ── Category card ──────────────────────────────────────────── */

/** The catalogue card — lift, rotate, zoom, glow, sheen and a CTA reveal. */
export function CategoryCard({
  category,
  index,
  count,
}: {
  category: ProductCategory;
  index: number;
  count?: number;
}) {
  const productCount = count ?? category.products.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: 0.85, delay: (index % 4) * 0.08, ease: DS_EASE_REVEAL }}
    >
      <Link
        to="/producten/$category"
        params={{ category: category.slug }}
        className="lux-card group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-black/[0.08] bg-[#0a0a0a] shadow-[0_30px_84px_-46px_rgba(0,0,0,0.5)]"
      >
        <span aria-hidden className="lux-card__glow" />
        <span aria-hidden className="lux-card__sheen" />

        <div className="lux-card__media relative aspect-[16/11] overflow-hidden">
          <img
            src={category.cardImage}
            alt={category.label}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/28 to-transparent"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(198,160,98,0.5),transparent)]"
          />

          {/* Index numeral that flips to an arrow on hover */}
          <span className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-white/12 bg-black/40 backdrop-blur-md">
            <span
              aria-hidden
              className="lux-card__index absolute font-display text-[11px] font-semibold tabular-nums tracking-[0.14em] text-white/70"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <ArrowUpRight
              size={14}
              aria-hidden
              className="lux-card__index-arrow absolute text-[rgba(240,226,202,0.95)]"
            />
          </span>
        </div>

        <div className="relative flex flex-1 flex-col p-7">
          <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[rgba(198,160,98,0.9)]">
            {category.eyebrow}
          </p>
          <h3 className="mt-2.5 font-display text-2xl leading-tight text-white transition-colors duration-500 group-hover:text-[rgba(240,226,202,0.98)]">
            {category.label}
          </h3>
          <p className="mt-3 text-[13px] leading-relaxed text-white/66">{category.summary}</p>
          <ProductStarRating className="mt-4" />

          <div className="mt-auto flex items-center justify-between gap-4 pt-7">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
              {productCount} {productCount === 1 ? "product" : "producten"}
            </span>
            <span className="lux-card__cta inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[rgba(240,226,202,0.95)]">
              Bekijken
              <ArrowUpRight size={13} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ── Spotlight (index — three official meat photographs) ──────── */

/** "Speciale aanbiedingen" — three-up grid matching ayatfood.nl/producten/. */
export function ProductSpotlight({
  eyebrow,
  title,
  lede,
  items,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  items: readonly { src: string; label: string }[];
}) {
  return (
    <div>
      <Reveal className="max-w-2xl">
        <p className="ipek-label ipek-heading-label text-[10px] tracking-[0.28em]">{eyebrow}</p>
        <h2 className="mt-4 font-display text-[clamp(2rem,3.5vw,3rem)] leading-[1.12] text-[#1c1c1c]">
          {title}
        </h2>
        <p className="mt-5 text-[15px] leading-[1.85] text-[#5a5a5a]">{lede}</p>
      </Reveal>

      <div className="mt-14 app-hscroll-track pr-spotlight__track grid gap-5 sm:grid-cols-3 lg:gap-6">
        {items.map((item, i) => (
          <motion.figure
            key={item.label}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-6%" }}
            transition={{ duration: 0.85, delay: i * 0.1, ease: DS_EASE_REVEAL }}
            className="group relative overflow-hidden rounded-[24px] border border-black/[0.08] bg-[#0a0a0a] shadow-[0_30px_80px_-46px_rgba(0,0,0,0.38)]"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={item.src}
                alt={item.label}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/88 via-[#0a0a0a]/12 to-transparent"
              />
            </div>
            <figcaption className="absolute inset-x-0 bottom-0 p-6">
              <h3 className="font-display text-xl leading-tight text-white">{item.label}</h3>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  );
}

/* ── Quality assurances ─────────────────────────────────────── */

export function ProductAssurances() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      {PRODUCT_ASSURANCES.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-6%" }}
          transition={{ duration: 0.8, delay: i * 0.08, ease: DS_EASE_REVEAL }}
          className="lux-spec relative overflow-hidden rounded-[22px] border border-black/[0.07] bg-white/85 p-6 shadow-[0_22px_60px_-44px_rgba(0,0,0,0.2)] backdrop-blur-sm"
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-[rgba(179,18,23,0.14)] bg-[linear-gradient(145deg,rgba(179,18,23,0.07),rgba(255,255,255,0.9))] text-[#B31217]">
            <Check size={16} strokeWidth={2.2} />
          </span>
          <h3 className="mt-5 font-display text-[1.2rem] leading-tight text-[#141414]">
            {item.title}
          </h3>
          <div
            aria-hidden
            className="lux-spec__rule mt-3.5 h-px w-full bg-[linear-gradient(90deg,rgba(179,18,23,0.32),rgba(20,20,20,0.08)_40%,transparent)]"
          />
          <p className="mt-3.5 text-[13px] leading-[1.7] text-[#141414]/64">{item.text}</p>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Certification + audiences ──────────────────────────────── */

export function ProductCertification({ image }: { image: string }) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
      <Reveal className="lg:col-span-6">
        <AyatSectionBadge kicker={PRODUCT_CERTIFICATION.eyebrow} title="Ayat Food" />
        <h2 className="mt-5 font-display text-[clamp(2rem,3.4vw,2.85rem)] leading-[1.12] text-[#1c1c1c]">
          {PRODUCT_CERTIFICATION.title}
        </h2>
        <div
          aria-hidden
          className="mt-4 h-px w-24 bg-[linear-gradient(90deg,rgba(200,164,107,0.95),rgba(179,18,23,0.35),transparent)]"
        />
        <div className="mt-8 space-y-5">
          {PRODUCT_CERTIFICATION.paragraphs.map((p, i) => (
            <p key={i} className="text-[15px] leading-[1.85] text-[#5a5a5a]">
              {p}
            </p>
          ))}
        </div>

        <ul className="mt-9 flex flex-wrap gap-2.5">
          {PRODUCT_CERTIFICATION.badges.map((badge) => (
            <li
              key={badge}
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(198,160,98,0.3)] bg-white/85 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#666] shadow-sm"
            >
              <span aria-hidden className="h-1 w-1 rounded-full bg-[#B31217]" />
              {badge}
            </li>
          ))}
        </ul>

        <div className="mt-10 border-t border-black/[0.07] pt-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#141414]/45">
            Wij leveren aan
          </p>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {PRODUCT_AUDIENCES.map((a) => (
              <li
                key={a.id}
                className="rounded-full border border-black/[0.08] bg-white px-4 py-2 text-[11px] font-medium tracking-[0.02em] text-[#141414]/78"
              >
                {a.label}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal className="lg:col-span-6" delay={0.1}>
        <div className="lux-shot group relative overflow-hidden rounded-[30px] border border-[rgba(198,160,98,0.28)] bg-[#0a0a0a] shadow-[0_38px_100px_-48px_rgba(0,0,0,0.34)]">
          <span
            aria-hidden
            className="pointer-events-none absolute left-5 top-5 z-20 h-8 w-8 border-l border-t border-[rgba(226,192,141,0.45)]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-5 right-5 z-20 h-8 w-8 border-b border-r border-[rgba(226,192,141,0.45)]"
          />
          <div className="aspect-[4/3]">
            <img
              src={image}
              alt="Halal productie onder NVWA-normen en ECC Halal-toezicht"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[#050505]/72 via-transparent to-transparent"
          />
        </div>
      </Reveal>
    </div>
  );
}

/* ── Ordering process ───────────────────────────────────────── */

export function ProductOrderSteps() {
  return (
    <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div
        aria-hidden
        className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[34px] hidden h-px bg-gradient-to-r from-transparent via-[rgba(226,192,141,0.32)] to-transparent lg:block"
      />
      {PRODUCT_ORDER_STEPS.map((step, i) => (
        <motion.div
          key={step.n}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-6%" }}
          transition={{ duration: 0.85, delay: i * 0.09, ease: DS_EASE_REVEAL }}
          className="lux-spec relative overflow-hidden rounded-[22px] border border-white/[0.08] bg-[linear-gradient(165deg,rgba(255,255,255,0.06)_0%,rgba(10,10,10,0.3)_60%,rgba(26,8,8,0.36)_100%)] p-6 backdrop-blur-[6px]"
        >
          <span className="grid h-[68px] w-[68px] place-items-center rounded-full border border-[rgba(226,192,141,0.3)] bg-white/[0.05] font-display text-[15px] tabular-nums text-[rgba(240,226,202,0.95)]">
            {step.n}
          </span>
          <h3 className="mt-6 font-display text-[1.25rem] leading-tight text-[#F8F4EE]">
            {step.title}
          </h3>
          <p className="mt-2.5 text-[13.5px] leading-[1.75] text-white/62">{step.text}</p>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Closing contact CTA ────────────────────────────────────── */

export function ProductHelpCta({ image = productenSfeer }: { image?: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-[#070707] ipek-section grain">
      <div aria-hidden className="lux-ambient lux-ambient--dark" />
      <div aria-hidden className="lux-hairline top-0" />

      <div className="relative ipek-container">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0a0a0a] shadow-[0_40px_100px_-48px_rgba(0,0,0,0.75)]">
              <div className="aspect-[4/5] sm:aspect-[5/6]">
                <img
                  src={image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[#070707]/70 via-transparent to-transparent"
              />
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <div className="lg:pl-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[rgba(226,192,141,0.92)]">
                {PRODUCT_HELP_CTA.eyebrow}
              </p>
              <h2 className="mt-5 max-w-[16ch] font-display text-[clamp(2rem,3.5vw,3.2rem)] leading-[1.12] text-[#F8F4EE]">
                {PRODUCT_HELP_CTA.title}
              </h2>
              <div
                aria-hidden
                className="mt-7 h-px w-24 bg-[linear-gradient(90deg,rgba(226,192,141,0.42),transparent)]"
              />
              <p className="mt-7 max-w-[48ch] text-[15px] leading-[1.8] text-white/68">
                {PRODUCT_HELP_CTA.text}
              </p>

              <DualCtaRow wide className="mt-10">
                <PrimaryLinkButton to="/contact">
                  <span className="hidden sm:inline">{PRODUCT_HELP_CTA.cta}</span>
                  <span className="sm:hidden">Contact</span>
                </PrimaryLinkButton>
                <LuxLinkButton href={`tel:${BRAND.phoneTel}`} tone="dark">
                  <span className="hidden sm:inline">{BRAND.phoneDisplay}</span>
                  <span className="sm:hidden">Bellen</span>
                </LuxLinkButton>
              </DualCtaRow>

              <p className="mt-8 text-[11px] uppercase tracking-[0.22em] text-white/32">
                {BRAND.hours} · {BRAND.addressFull}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
