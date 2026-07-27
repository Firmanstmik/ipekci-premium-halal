import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { ArrowUpRight, Check, ChevronRight } from "lucide-react";
import { AyatSectionBadge } from "@/components/home/AyatSectionBadge";
import { BRAND } from "@/lib/brand";
import { DS_EASE, DS_EASE_REVEAL } from "@/lib/design-system";
import {
  PRODUCT_ASSURANCES,
  PRODUCT_AUDIENCES,
  PRODUCT_CERTIFICATION,
  PRODUCT_HELP_CTA,
  PRODUCT_ORDER_STEPS,
  type ProductCategory,
  type ProductGalleryItem,
} from "@/lib/producten-content";

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
    <section ref={ref} className="relative min-h-[88vh] overflow-hidden bg-[#030303] grain">
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
        className="relative mx-auto flex min-h-[88vh] ipek-container flex-col justify-end px-6 pb-20 pt-40 lg:px-10 lg:pb-24 lg:pt-48"
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

        <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.6rem,5.6vw,4.8rem)] leading-[1.02] text-white">
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
            className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            {children}
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

/* ── Gallery ────────────────────────────────────────────────── */

/**
 * Editorial gallery — an asymmetric three-up where the first shot spans two
 * rows. Captions describe the photograph, never a product specification.
 */
export function ProductGallery({ items }: { items: readonly ProductGalleryItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:grid-rows-2 lg:h-full lg:gap-5">
      {items.map((item, i) => (
        <motion.figure
          key={item.src}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-6%" }}
          transition={{ duration: 0.9, delay: i * 0.1, ease: DS_EASE_REVEAL }}
          className={`lux-shot group relative overflow-hidden rounded-[24px] border border-black/[0.08] bg-[#0a0a0a] shadow-[0_30px_80px_-46px_rgba(0,0,0,0.42)] ${
            i === 0 ? "sm:row-span-2" : ""
          }`}
        >
          {/* Aspect-locked on small screens; on desktop the shots stretch so
              the gallery column matches the intro copy beside it. */}
          <div
            className={
              i === 0 ? "aspect-[4/5] sm:h-full" : "aspect-[16/10] lg:aspect-auto lg:h-full"
            }
          >
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[#050505]/88 via-[#050505]/12 to-transparent"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute left-4 top-4 h-7 w-7 border-l border-t border-[rgba(226,192,141,0.4)]"
          />
          <figcaption className="lux-shot__caption absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <p className="font-display text-[13.5px] italic leading-snug text-[rgba(240,226,202,0.94)] sm:text-[15px]">
              {item.caption}
            </p>
          </figcaption>
        </motion.figure>
      ))}
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

export function ProductHelpCta() {
  return (
    <section className="relative isolate overflow-hidden bg-[#070707] ipek-section grain">
      <div aria-hidden className="lux-ambient lux-ambient--dark" />
      <div aria-hidden className="lux-hairline top-0" />
      <div aria-hidden className="lux-hairline bottom-0 opacity-60" />

      <div className="relative ipek-container">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[rgba(226,192,141,0.92)]">
              {PRODUCT_HELP_CTA.eyebrow}
            </p>
            <h2 className="mt-5 max-w-[18ch] font-display text-[clamp(1.9rem,3.3vw,2.9rem)] leading-[1.12] text-[#F8F4EE]">
              {PRODUCT_HELP_CTA.title}
            </h2>
            <div
              aria-hidden
              className="mt-7 h-px w-[min(360px,62%)] bg-[linear-gradient(90deg,transparent,rgba(226,192,141,0.42),transparent)]"
            />
            <p className="mt-7 max-w-[54ch] text-[15px] leading-[1.8] text-white/68">
              {PRODUCT_HELP_CTA.text}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <PrimaryLinkButton to="/contact">{PRODUCT_HELP_CTA.cta}</PrimaryLinkButton>
              <LuxLinkButton href={`tel:${BRAND.phoneTel}`} tone="dark">
                {BRAND.phoneDisplay}
              </LuxLinkButton>
            </div>

            <p className="mt-8 text-[11px] uppercase tracking-[0.22em] text-white/32">
              {BRAND.hours} · {BRAND.addressFull}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
