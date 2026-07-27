import { Link } from "@tanstack/react-router";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { AssortimentKlantCta } from "@/components/assortiment/AssortimentKlantCta";
import { AyatSectionBadge } from "@/components/home/AyatSectionBadge";
import { MagneticButton } from "@/components/MagneticButton";
import { RollingCounter } from "@/components/RollingCounter";
import type { ProductenMegaItem } from "@/lib/assortiment-content";
import {
  ONS_VERHAAL_ASSORTIMENT,
  ONS_VERHAAL_CAREERS,
  ONS_VERHAAL_CAREERS_IMAGE,
  ONS_VERHAAL_HALAL,
  ONS_VERHAAL_HALAL_IMAGE,
  ONS_VERHAAL_HALAL_NORMEN_IMAGE,
  ONS_VERHAAL_HERO,
  ONS_VERHAAL_HERO_FALLBACK,
  ONS_VERHAAL_HIGHLIGHTS,
  ONS_VERHAAL_INTRO,
  ONS_VERHAAL_INTRO_IMAGE,
  ONS_VERHAAL_PRODUCTGROEPEN,
  ONS_VERHAAL_STATS,
  ONS_VERHAAL_WORKFLOW,
} from "@/lib/ons-verhaal-content";
import { DS_EASE, DS_EASE_REVEAL } from "@/lib/design-system";
import backgroundWhite1 from "@/assets/background-white1.webp";
import backgroundWhite3 from "@/assets/background-white3.webp";

function SectionBackdrop({
  src,
  y,
}: {
  src: string;
  y?: ReturnType<typeof useTransform<number, string>>;
}) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={y !== undefined ? { y } : undefined}
    >
      <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
    </motion.div>
  );
}

function PremiumLinkButton({
  to,
  href,
  children,
}: {
  to?: string;
  href?: string;
  children: React.ReactNode;
}) {
  const className =
    "group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl border border-[rgba(198,160,98,0.45)] bg-transparent px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#555] transition-[color,border-color] duration-700 hover:border-[rgba(198,160,98,0.75)] hover:text-[#111]";
  const inner = (
    <>
      <span className="pointer-events-none absolute inset-0 -translate-x-[110%] bg-[rgba(226,192,141,0.92)] transition-transform duration-700 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:translate-x-0" />
      <span className="relative">{children}</span>
      <ArrowUpRight size={13} className="relative transition-transform duration-500 group-hover:translate-x-0.5" />
    </>
  );
  if (to) {
    return (
      <Link to={to} className={className}>
        {inner}
      </Link>
    );
  }
  return (
    <a href={href} className={className}>
      {inner}
    </a>
  );
}

function ScrollLine() {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 1.2, ease: DS_EASE }}
      className="h-px w-full origin-left bg-gradient-to-r from-transparent via-[rgba(226,192,141,0.55)] to-transparent"
      aria-hidden
    />
  );
}

function TiltImage({
  src,
  alt,
  className = "",
  aspect = "aspect-[4/5]",
}: {
  src: string;
  alt: string;
  className?: string;
  aspect?: string;
}) {
  return (
    <div className={`group relative ${className}`}>
      <div className="relative overflow-hidden rounded-[32px] border border-[rgba(198,160,98,0.28)] bg-white shadow-[0_32px_90px_-44px_rgba(0,0,0,0.14),0_0_0_1px_rgba(0,0,0,0.04)] transition-all duration-700 hover:border-[rgba(198,160,98,0.48)] hover:shadow-[0_44px_110px_-40px_rgba(0,0,0,0.2)]">
        <span
          aria-hidden
          className="pointer-events-none absolute left-4 top-4 z-20 h-8 w-8 border-l border-t border-[rgba(198,160,98,0.45)] opacity-70 transition-all duration-700 group-hover:left-5 group-hover:top-5 group-hover:opacity-100"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-4 right-4 z-20 h-8 w-8 border-b border-r border-[rgba(198,160,98,0.45)] opacity-70 transition-all duration-700 group-hover:bottom-5 group-hover:right-5 group-hover:opacity-100"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-[linear-gradient(90deg,transparent,rgba(198,160,98,0.5),transparent)]"
        />
        <div className={`relative overflow-hidden ${aspect}`}>
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition-transform duration-[1.35s] ease-[cubic-bezier(.22,.61,.36,1)] group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/35 via-transparent to-transparent" />
        </div>
      </div>
    </div>
  );
}

function HighlightCard({
  item,
  index,
}: {
  item: (typeof ONS_VERHAAL_HIGHLIGHTS)[number];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: 0.85, delay: index * 0.05, ease: DS_EASE_REVEAL }}
      className="group relative overflow-hidden rounded-[28px] border border-black/[0.08] bg-[#0a0a0a] shadow-[0_28px_80px_-44px_rgba(0,0,0,0.45)] transition-all duration-700 hover:-translate-y-1.5 hover:border-[rgba(198,160,98,0.38)] hover:shadow-[0_40px_100px_-40px_rgba(0,0,0,0.55)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={item.image}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-[1.35s] ease-[cubic-bezier(.22,.61,.36,1)] group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(198,160,98,0.45)] to-transparent" />
      </div>
      <div className="p-6">
        <h3 className="font-display text-xl text-white transition-colors group-hover:text-[rgba(226,192,141,0.95)]">
          {item.title}
        </h3>
        <p className="mt-3 text-[13px] leading-relaxed text-white/68">{item.description}</p>
      </div>
    </motion.article>
  );
}

function ProductMiniCard({ product, index }: { product: ProductenMegaItem; index: number }) {
  return (
    <motion.a
      href={product.href}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-4%" }}
      transition={{ duration: 0.7, delay: index * 0.04, ease: DS_EASE }}
      className="group relative block overflow-hidden rounded-[20px] border border-black/[0.08] bg-white shadow-[0_20px_60px_-36px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1 hover:border-[rgba(198,160,98,0.32)] hover:shadow-[0_28px_70px_-32px_rgba(0,0,0,0.18)]"
    >
      <div className="relative aspect-square overflow-hidden bg-[linear-gradient(180deg,#FFFFFF_0%,#F5F0E8_100%)]">
        <img
          src={product.image}
          alt={product.label}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.05]"
        />
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(179,18,23,0.15),transparent)]" />
      </div>
      <div className="flex items-start justify-between gap-3 p-4">
        <div className="min-w-0">
          <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#B31217]/80">
            {product.eyebrow}
          </p>
          <p className="mt-1.5 font-display text-lg leading-tight text-[#1c1c1c]">
            {product.label}
          </p>
        </div>
        <img src={product.stickerSrc} alt="" aria-hidden className="h-7 w-7 shrink-0 opacity-80" />
      </div>
    </motion.a>
  );
}

/** One official statistic — counts up once, in view. */
function StatCard({
  stat,
  index,
}: {
  stat: (typeof ONS_VERHAAL_STATS.items)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: 0.85, delay: index * 0.09, ease: DS_EASE_REVEAL }}
      className="group relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[linear-gradient(165deg,rgba(255,255,255,0.06)_0%,rgba(10,10,10,0.32)_55%,rgba(26,8,8,0.42)_100%)] p-7 backdrop-blur-[6px] transition-all duration-700 hover:-translate-y-1 hover:border-[rgba(226,192,141,0.32)] lg:p-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(226,192,141,0.4),transparent)]"
      />
      <p className="flex items-baseline font-display text-[clamp(2.4rem,4.4vw,3.2rem)] font-semibold leading-none tracking-[-0.04em] text-[#F8F4EE]">
        <RollingCounter value={stat.value} />
        <span className="text-[#DA292A]">{stat.suffix}</span>
      </p>
      <div
        aria-hidden
        className="mt-5 h-px w-12 bg-[linear-gradient(90deg,rgba(226,192,141,0.9),transparent)]"
      />
      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/62">
        {stat.label}
      </p>
    </motion.div>
  );
}

export function OnsVerhaalPage() {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroContentY = useTransform(heroProgress, [0, 1], [0, 90]);
  const heroOpacity = useTransform(heroProgress, [0, 0.75], [1, 0]);

  const { scrollYProgress: gridProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(gridProgress, [0, 1], ["-6%", "6%"]);

  const titleWords = ONS_VERHAAL_HERO.title.split(" ");

  return (
    <>
      <section
        ref={heroRef}
        className="relative min-h-[88vh] overflow-hidden bg-[#030303] grain"
      >
        <div className="absolute inset-0">
          <motion.img
            src={ONS_VERHAAL_HERO_FALLBACK}
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

        <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/55 via-[#030303]/25 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_75%_15%,rgba(226,192,141,0.14),transparent_50%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-[#030303] via-[#030303]/82 to-transparent" />

        <motion.div
          style={{ y: reduceMotion ? 0 : heroContentY, opacity: reduceMotion ? 1 : heroOpacity }}
          className="relative mx-auto flex min-h-[88vh] max-w-[1200px] flex-col justify-end px-6 pb-20 pt-40 lg:px-10 lg:pb-24 lg:pt-48"
        >
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: DS_EASE }}
            className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-white/42"
          >
            <Link to="/" className="transition-colors hover:text-[rgba(226,192,141,0.95)]">
              Home
            </Link>
            <ChevronRight size={12} className="text-white/22" />
            <span className="text-white/80">{ONS_VERHAAL_HERO.breadcrumb}</span>
          </motion.nav>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 0.15, ease: DS_EASE }}
            className="mt-10 h-px w-24 origin-left bg-gradient-to-r from-[rgba(226,192,141,0.9)] to-transparent"
            aria-hidden
          />

          <p className="mt-8 ipek-label ipek-heading-label text-[10px] tracking-[0.32em]">
            {ONS_VERHAAL_HERO.eyebrow}
          </p>

          <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.5rem,5.4vw,4.6rem)] leading-[1.02] text-white">
            {titleWords.map((word, i) => (
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
            {ONS_VERHAAL_HERO.lede}
          </motion.p>
        </motion.div>
      </section>

      <section className="relative isolate overflow-hidden px-6 py-24 lg:px-10 lg:py-32">
        <SectionBackdrop src={backgroundWhite1} />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(198,160,98,0.42),transparent)]"
        />
        <div className="relative mx-auto max-w-[1200px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.9, ease: DS_EASE }}
            className="max-w-2xl"
          >
            <AyatSectionBadge kicker="Waarom Ayat Food" title="Onze speerpunten" />
            <h2 className="mt-5 font-display text-[clamp(2rem,3.5vw,3rem)] text-[#1c1c1c]">
              Een premium standaard in elke stap
            </h2>
          </motion.div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {ONS_VERHAAL_HIGHLIGHTS.map((item, i) => (
              <HighlightCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden px-6 py-24 lg:px-10 lg:py-36">
        <SectionBackdrop src={backgroundWhite3} />
        <div className="relative mx-auto max-w-[1200px]">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 1, ease: DS_EASE_REVEAL }}
              className="lg:col-span-5"
            >
              <p className="ipek-label ipek-heading-label text-[10px] tracking-[0.28em]">
                {ONS_VERHAAL_HALAL.eyebrow}
              </p>
              <h2 className="mt-5 font-display text-[clamp(2.2rem,3.5vw,3.2rem)] text-[#1c1c1c]">
                {ONS_VERHAAL_HALAL.title}
              </h2>
              <div className="mt-8 space-y-5">
                {ONS_VERHAAL_HALAL.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)} className="text-[15px] leading-[1.85] text-[#5a5a5a]">
                    {p}
                  </p>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                {ONS_VERHAAL_HALAL.badges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-2 rounded-full border border-[rgba(198,160,98,0.28)] bg-white/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#666] shadow-sm"
                  >
                    <span className="h-1 w-1 rounded-full bg-[#B31217]" />
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 1.1, delay: 0.08, ease: DS_EASE_REVEAL }}
              className="lg:col-span-7"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <TiltImage src={ONS_VERHAAL_HALAL_IMAGE} alt="Halal certificaat" aspect="aspect-[4/5]" />
                <TiltImage
                  src={ONS_VERHAAL_HALAL_NORMEN_IMAGE}
                  alt="Islamitische normen en waarden"
                  aspect="aspect-[4/5]"
                  className="sm:mt-10"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden px-6 py-24 lg:px-10 lg:py-36">
        <SectionBackdrop src={backgroundWhite1} />
        <div className="relative mx-auto max-w-[1200px]">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: 48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 1, ease: DS_EASE_REVEAL }}
              className="lg:col-span-6 lg:order-2"
            >
              <TiltImage
                src={ONS_VERHAAL_INTRO_IMAGE}
                alt={ONS_VERHAAL_INTRO.title}
                aspect="aspect-[5/4]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 1, ease: DS_EASE_REVEAL }}
              className="lg:col-span-6 lg:sticky lg:top-32 lg:order-1"
            >
              <p className="ipek-label ipek-heading-label text-[10px] tracking-[0.28em]">
                {ONS_VERHAAL_INTRO.eyebrow}
              </p>
              <h2 className="mt-5 font-display text-[clamp(2.2rem,3.5vw,3.2rem)] text-[#1c1c1c]">
                {ONS_VERHAAL_INTRO.title}
              </h2>
              <div className="mt-8 space-y-5">
                {ONS_VERHAAL_INTRO.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)} className="text-[15px] leading-[1.85] text-[#5a5a5a]">
                    {p}
                  </p>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                {ONS_VERHAAL_INTRO.badges.map((badge) => (
                  <span
                    key={badge}
                    className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#999]"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden px-6 py-24 lg:px-10 lg:py-36">
        <SectionBackdrop src={backgroundWhite3} />
        <div className="relative mx-auto max-w-[1200px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.9, ease: DS_EASE }}
            className="max-w-3xl"
          >
            <p className="ipek-label ipek-heading-label text-[10px] tracking-[0.28em]">
              {ONS_VERHAAL_WORKFLOW.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,3.5vw,3rem)] text-[#1c1c1c]">
              {ONS_VERHAAL_WORKFLOW.title}
            </h2>
          </motion.div>

          <div className="relative mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div
              aria-hidden
              className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[52px] hidden h-px bg-gradient-to-r from-transparent via-[rgba(198,160,98,0.35)] to-transparent lg:block"
            />
            {ONS_VERHAAL_WORKFLOW.steps.map((step, i) => (
              <motion.article
                key={step.n}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-6%" }}
                transition={{ duration: 0.85, delay: i * 0.1, ease: DS_EASE_REVEAL }}
                className="group relative rounded-[28px] border border-black/[0.08] bg-white/90 p-8 shadow-[0_24px_70px_-40px_rgba(0,0,0,0.12)] transition-all duration-700 hover:-translate-y-1 hover:border-[rgba(198,160,98,0.32)] hover:shadow-[0_32px_90px_-36px_rgba(0,0,0,0.16)] lg:p-7 xl:p-8"
              >
                <div className="flex items-center gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-[rgba(198,160,98,0.35)] bg-[rgba(198,160,98,0.1)] font-display text-lg text-[rgba(179,18,23,0.9)]">
                    {i + 1}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#999]">
                    {step.n}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-[1.4rem] leading-tight text-[#1c1c1c] lg:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-4 text-[14px] leading-[1.8] text-[#5a5a5a]">{step.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Statistieken — "We zijn klaar om perfectie te dienen" */}
      <section className="relative isolate overflow-hidden bg-[#070707] px-6 py-24 grain lg:px-10 lg:py-32">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <img
            src={ONS_VERHAAL_STATS.backgroundImage}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-black/[0.74]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_78%_60%_at_20%_0%,rgba(179,18,23,0.2),transparent_58%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_58%_at_50%_45%,transparent_10%,rgba(0,0,0,0.5)_78%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(226,192,141,0.4),transparent)]" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(226,192,141,0.28),transparent)]" />
        </div>

        <div className="relative mx-auto max-w-[1200px]">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.95, ease: DS_EASE }}
              className="lg:col-span-7"
            >
              <AyatSectionBadge
                kicker={ONS_VERHAAL_STATS.eyebrow}
                title="Ayat Food"
                tone="dark"
              />
              <h2 className="mt-5 font-display text-[clamp(2rem,3.5vw,3rem)] leading-[1.12] text-[#F8F4EE]">
                {ONS_VERHAAL_STATS.title}
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.9, delay: 0.14, ease: DS_EASE }}
              className="lg:col-span-5"
            >
              <p className="max-w-[42ch] text-[15px] leading-[1.8] text-white/70 lg:ml-auto lg:text-right">
                {ONS_VERHAAL_STATS.lede}
              </p>
            </motion.div>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {ONS_VERHAAL_STATS.items.map((stat, i) => (
              <StatCard key={stat.id} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section
        ref={gridRef}
        className="relative isolate overflow-hidden px-6 py-24 lg:px-10 lg:py-36"
      >
        <SectionBackdrop src={backgroundWhite3} y={reduceMotion ? undefined : bgY} />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-[linear-gradient(90deg,transparent,rgba(198,160,98,0.42),transparent)]"
        />

        <div className="relative mx-auto max-w-[1200px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="ipek-label ipek-heading-label text-[10px] tracking-[0.28em]">
                Ons assortiment
              </p>
              <h2 className="mt-4 font-display text-[clamp(2rem,3.5vw,3rem)] text-[#1c1c1c]">
                Producten van Ayat Food
              </h2>
            </div>
            <PremiumLinkButton to="/producten">Bekijk assortiment</PremiumLinkButton>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {ONS_VERHAAL_ASSORTIMENT.map((cat, i) => (
              <motion.a
                key={cat.id}
                href={cat.href}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-6%" }}
                transition={{ duration: 0.85, delay: i * 0.08, ease: DS_EASE_REVEAL }}
                className="group relative overflow-hidden rounded-[28px] border border-black/[0.08] bg-[#0a0a0a] shadow-[0_28px_80px_-44px_rgba(0,0,0,0.45)] transition-all duration-700 hover:-translate-y-1.5 hover:border-[rgba(198,160,98,0.38)] hover:shadow-[0_40px_100px_-40px_rgba(0,0,0,0.55)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={cat.previewImage}
                    alt={cat.label}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-[1.35s] ease-[cubic-bezier(.22,.61,.36,1)] group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
                </div>
                <div className="flex items-start justify-between gap-4 p-7">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[rgba(198,160,98,0.88)]">
                      {cat.eyebrow}
                    </p>
                    <h3 className="mt-2 font-display text-2xl text-white">{cat.label}</h3>
                    <p className="mt-3 text-[13px] leading-relaxed text-white/68">{cat.description}</p>
                  </div>
                  <img src={cat.stickerSrc} alt="" aria-hidden className="h-9 w-9 shrink-0 opacity-80" />
                </div>
                <span className="group/btn relative mx-7 mb-7 inline-flex items-center gap-2 overflow-hidden rounded-xl border border-[rgba(198,160,98,0.45)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[rgba(198,160,98,0.92)] transition-colors duration-700 group-hover:border-[rgba(198,160,98,0.75)] group-hover:text-[#0a0a0a]">
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[rgba(226,192,141,0.95)] transition-transform duration-700 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:translate-x-0" />
                  <span className="relative">Lees meer</span>
                  <ArrowUpRight size={12} className="relative transition-transform duration-500 group-hover:translate-x-0.5" />
                </span>
              </motion.a>
            ))}
          </div>

          <ScrollLine />

          <div className="mt-20 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="ipek-label ipek-heading-label text-[10px] tracking-[0.28em]">
                Productgroepen
              </p>
              <h2 className="mt-4 font-display text-[clamp(2rem,3.5vw,3rem)] text-[#1c1c1c]">
                Het volledige aanbod
              </h2>
              <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-[#5a5a5a]">
                Van döner en shoarma tot gevogelte, vleessoorten, diepvriesproducten, Turkse pizza,
                gegrilde producten en tortilla durum — Halal geproduceerd voor restaurants,
                supermarkten en retail.
              </p>
            </div>
            <PremiumLinkButton to="/producten">Alle producten</PremiumLinkButton>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {ONS_VERHAAL_PRODUCTGROEPEN.map((product, i) => (
              <ProductMiniCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden px-6 py-24 lg:px-10 lg:py-32">
        <SectionBackdrop src={backgroundWhite1} />
        <div className="relative mx-auto max-w-[1200px]">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 1, ease: DS_EASE_REVEAL }}
              className="lg:col-span-5"
            >
              <p className="ipek-label ipek-heading-label text-[10px] tracking-[0.28em]">
                {ONS_VERHAAL_CAREERS.eyebrow}
              </p>
              <h2 className="mt-5 font-display text-[clamp(2rem,3.5vw,3rem)] text-[#1c1c1c]">
                {ONS_VERHAAL_CAREERS.title}
              </h2>
              <p className="mt-6 text-[15px] leading-[1.85] text-[#5a5a5a]">{ONS_VERHAAL_CAREERS.text}</p>
              <p className="mt-6 font-display text-xl text-[#333]">
                Verwelkomen we ook jou binnenkort?
              </p>
              <div className="mt-10">
                <MagneticButton href={ONS_VERHAAL_CAREERS.ctaTo}>
                  {ONS_VERHAAL_CAREERS.cta}
                  <ArrowUpRight size={14} />
                </MagneticButton>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 1.1, delay: 0.08, ease: DS_EASE_REVEAL }}
              className="lg:col-span-7"
            >
              <TiltImage
                src={ONS_VERHAAL_CAREERS_IMAGE}
                alt="Werken bij Ayat Food"
                aspect="aspect-[16/10]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <AssortimentKlantCta />
    </>
  );
}
