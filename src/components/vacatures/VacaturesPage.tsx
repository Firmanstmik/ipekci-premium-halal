import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Check, ChevronRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { AyatSectionBadge } from "@/components/home/AyatSectionBadge";
import { MagneticButton } from "@/components/MagneticButton";
import { BRAND } from "@/lib/brand";
import { DS_EASE, DS_EASE_REVEAL } from "@/lib/design-system";
import {
  VACATURES,
  VACATURES_CLOSING,
  VACATURES_HERO,
  VACATURES_HERO_IMAGE,
  VACATURES_INTRO,
  VACATURES_INTRO_IMAGE,
  VACATURES_SOLLICITEREN,
  sollicitatieMailto,
  type Vacature,
} from "@/lib/vacatures-content";
import backgroundWhite1 from "@/assets/background-white1.webp";
import backgroundWhite3 from "@/assets/background-white3.webp";

const VACATURES_ANCHOR = "openstaande-vacatures";
const SOLLICITEREN_ANCHOR = "solliciteren";

function SectionBackdrop({ src }: { src: string }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <img
        src={src}
        alt=""
        className="h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

/** Shared reveal wrapper — matches the site-wide section rhythm. */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.9, delay: reduceMotion ? 0 : delay, ease: DS_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Vacaturekaart ───────────────────────────────────────────── */

function VacatureCard({ vacature, index }: { vacature: Vacature; index: number }) {
  const Icon = vacature.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: 0.85, delay: index * 0.09, ease: DS_EASE_REVEAL }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-black/[0.08] bg-white/92 p-7 shadow-[0_24px_70px_-40px_rgba(0,0,0,0.14)] backdrop-blur-sm transition-all duration-700 hover:-translate-y-1.5 hover:border-[rgba(198,160,98,0.34)] hover:shadow-[0_36px_96px_-38px_rgba(0,0,0,0.2)] lg:p-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(179,18,23,0.5),transparent)] opacity-70 transition-opacity duration-700 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute right-6 top-6 font-display text-[11px] font-semibold tabular-nums tracking-[0.22em] text-[#141414]/22"
      >
        {vacature.index}
      </span>

      <div className="flex items-start gap-5">
        <span className="grid h-[3.75rem] w-[3.75rem] shrink-0 place-items-center rounded-2xl border border-[rgba(179,18,23,0.14)] bg-[linear-gradient(145deg,rgba(179,18,23,0.07),rgba(255,255,255,0.92))] text-[#B31217] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] transition-transform duration-700 group-hover:scale-[1.04]">
          <Icon size={26} strokeWidth={1.5} />
        </span>
        {/* min-height keeps the hairline below aligned across cards even when a
            job title wraps to two lines. */}
        <div className="min-w-0 pt-1 md:min-h-[7.25rem]">
          <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#B31217]">
            {vacature.department}
          </p>
          <h3 className="mt-2 pr-8 font-display text-[1.5rem] leading-tight tracking-[-0.02em] text-[#141414]">
            {vacature.title}
          </h3>
          <p className="mt-2.5 text-[14px] leading-[1.7] text-[#141414]/64">{vacature.summary}</p>
        </div>
      </div>

      <div
        aria-hidden
        className="mt-6 h-px w-full bg-[linear-gradient(90deg,rgba(179,18,23,0.28),rgba(20,20,20,0.08)_38%,transparent)]"
      />

      <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#141414]/45">
        Werkzaamheden
      </p>
      <ul className="mt-4 space-y-3">
        {vacature.responsibilities.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-[14px] leading-[1.6] text-[#141414]/78"
          >
            <span className="mt-[3px] grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-[rgba(179,18,23,0.09)] text-[#B31217]">
              <Check size={11} strokeWidth={2.6} />
            </span>
            {item}
          </li>
        ))}
      </ul>

      {vacature.requirements && (
        <>
          <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#141414]/45">
            Vereisten
          </p>
          <ul className="mt-3.5 flex flex-wrap gap-2">
            {vacature.requirements.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(179,18,23,0.2)] bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#B31217] shadow-[0_8px_20px_-16px_rgba(179,18,23,0.65)]"
              >
                <span aria-hidden className="h-1 w-1 rounded-full bg-[#B31217]" />
                {item}
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="mt-auto pt-8">
        <a
          href={sollicitatieMailto(vacature.title)}
          className="ipek-btn-wipe ipek-btn-wipe--primary group/btn w-full justify-center px-5 py-3 text-[10px] tracking-[0.2em]"
        >
          Solliciteren
          <ArrowUpRight
            size={13}
            className="transition-transform duration-500 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
          />
        </a>
      </div>
    </motion.article>
  );
}

/* ── Contactregel in het sollicitatiepaneel ──────────────────── */

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/[0.09] bg-white/[0.05] text-[rgba(226,192,141,0.9)]">
        <Icon size={15} />
      </span>
      <span className="min-w-0">
        <span className="block text-[9px] font-semibold uppercase tracking-[0.24em] text-white/40">
          {label}
        </span>
        <span className="mt-1 block text-[14px] leading-[1.6] text-white/86">{value}</span>
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className="flex items-start gap-3.5 rounded-xl p-1 transition-colors duration-300 hover:text-white"
      >
        {content}
      </a>
    );
  }
  return <div className="flex items-start gap-3.5 p-1">{content}</div>;
}

/* ── Pagina ──────────────────────────────────────────────────── */

export function VacaturesPage() {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroContentY = useTransform(heroProgress, [0, 1], [0, 90]);
  const heroOpacity = useTransform(heroProgress, [0, 0.75], [1, 0]);

  const titleWords = VACATURES_HERO.title.split(" ");

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[88vh] overflow-hidden bg-[#030303] grain">
        <div className="absolute inset-0">
          <motion.img
            src={VACATURES_HERO_IMAGE}
            alt=""
            aria-hidden
            className="h-full w-full object-cover"
            style={{ filter: "brightness(0.34) contrast(1.08) saturate(1.04)" }}
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
            <span className="text-white/80">{VACATURES_HERO.breadcrumb}</span>
          </motion.nav>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 0.15, ease: DS_EASE }}
            className="mt-10 h-px w-24 origin-left bg-gradient-to-r from-[rgba(226,192,141,0.9)] to-transparent"
            aria-hidden
          />

          <p className="mt-8 ipek-label ipek-heading-label text-[10px] tracking-[0.32em]">
            {VACATURES_HERO.eyebrow}
          </p>

          <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.6rem,5.6vw,4.8rem)] leading-[1.02] text-white">
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
            {VACATURES_HERO.lede}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.68, ease: DS_EASE }}
            className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <a
              href={`#${VACATURES_ANCHOR}`}
              className="ipek-btn-premium group px-7 py-3.5 text-[11px] tracking-[0.2em] sm:px-9 sm:py-4 sm:text-[12px]"
            >
              <span className="relative z-[1] inline-flex items-center gap-2.5">
                {VACATURES_HERO.ctaPrimary}
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </a>
            <a
              href={`#${SOLLICITEREN_ANCHOR}`}
              className="inline-flex items-center gap-2.5 rounded-2xl border border-white/14 bg-white/[0.05] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/82 backdrop-blur-md transition-all duration-300 hover:border-[rgba(226,192,141,0.4)] hover:bg-white/[0.09] hover:text-white sm:px-7 sm:py-4"
            >
              {VACATURES_HERO.ctaSecondary}
              <ArrowUpRight size={14} />
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8, ease: DS_EASE }}
            className="mt-12 grid max-w-xl grid-cols-3 gap-3 border-t border-white/[0.09] pt-7 sm:gap-6"
          >
            {VACATURES_HERO.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-[1.35rem] leading-none tracking-[-0.03em] text-white sm:text-[1.6rem]">
                  {stat.value}
                </dd>
                <p className="mt-2.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/45 sm:text-[10px]">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </section>

      {/* ── Werken bij Ayat Food ───────────────────────────── */}
      <section className="relative isolate overflow-hidden px-6 py-24 lg:px-10 lg:py-32">
        <SectionBackdrop src={backgroundWhite1} />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(198,160,98,0.42),transparent)]"
        />

        <div className="relative mx-auto max-w-[1200px]">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6">
              <AyatSectionBadge
                kicker={VACATURES_INTRO.kicker}
                title={VACATURES_INTRO.badgeTitle}
              />
              <h2 className="mt-5 font-display text-[clamp(2rem,3.5vw,3rem)] leading-[1.12] text-[#1c1c1c]">
                {VACATURES_INTRO.title}
              </h2>
              <div className="mt-4 h-px w-24 bg-[linear-gradient(90deg,rgba(200,164,107,0.95),rgba(179,18,23,0.35),transparent)]" />
              <div className="mt-8 space-y-5">
                {VACATURES_INTRO.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)} className="text-[15px] leading-[1.85] text-[#5a5a5a]">
                    {p}
                  </p>
                ))}
              </div>

              <ul className="mt-10 grid gap-4 sm:grid-cols-2">
                {VACATURES_INTRO.highlights.map((item, i) => (
                  <motion.li
                    key={item.title}
                    initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-6%" }}
                    transition={{ duration: 0.7, delay: 0.08 + i * 0.07, ease: DS_EASE_REVEAL }}
                    className="rounded-2xl border border-black/[0.07] bg-white/85 p-5 shadow-[0_18px_48px_-38px_rgba(0,0,0,0.2)]"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        aria-hidden
                        className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#B31217] text-white"
                      >
                        <Check size={11} strokeWidth={2.6} />
                      </span>
                      <p className="font-display text-[15px] tracking-[-0.01em] text-[#141414]">
                        {item.title}
                      </p>
                    </div>
                    <p className="mt-2.5 text-[13px] leading-[1.65] text-[#141414]/62">
                      {item.text}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="lg:col-span-6" delay={0.1}>
              <div className="group relative">
                <div className="relative overflow-hidden rounded-[32px] border border-[rgba(198,160,98,0.28)] bg-white shadow-[0_32px_90px_-44px_rgba(0,0,0,0.16),0_0_0_1px_rgba(0,0,0,0.04)] transition-all duration-700 hover:border-[rgba(198,160,98,0.48)] hover:shadow-[0_44px_110px_-40px_rgba(0,0,0,0.22)]">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-4 top-4 z-20 h-8 w-8 border-l border-t border-[rgba(198,160,98,0.45)] opacity-70 transition-all duration-700 group-hover:left-5 group-hover:top-5 group-hover:opacity-100"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute bottom-4 right-4 z-20 h-8 w-8 border-b border-r border-[rgba(198,160,98,0.45)] opacity-70 transition-all duration-700 group-hover:bottom-5 group-hover:right-5 group-hover:opacity-100"
                  />
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={VACATURES_INTRO_IMAGE}
                      alt="Werken bij Ayat Food Vleesgroothandel"
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-[1.35s] ease-[cubic-bezier(.22,.61,.36,1)] group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/70 via-[#0a0a0a]/12 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.26em] text-[rgba(226,192,141,0.92)]">
                        {BRAND.addressFull}
                      </p>
                      <p className="mt-2 font-display text-xl leading-snug text-white">
                        Halal vleesgroothandel in Watergang
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Openstaande vacatures ──────────────────────────── */}
      <section
        id={VACATURES_ANCHOR}
        className="relative isolate overflow-hidden px-6 py-24 lg:px-10 lg:py-36"
      >
        <SectionBackdrop src={backgroundWhite3} />
        <div className="relative mx-auto max-w-[1200px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <p className="ipek-label ipek-heading-label text-[10px] tracking-[0.28em]">
                Openstaande vacatures
              </p>
              <h2 className="mt-4 font-display text-[clamp(2rem,3.5vw,3rem)] text-[#1c1c1c]">
                Onze open posities
              </h2>
              <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-[#5a5a5a]">
                Drie functies, één team. Bekijk waar jouw ervaring het beste tot zijn recht komt en
                solliciteer direct.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <a
                href={`#${SOLLICITEREN_ANCHOR}`}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl border border-[rgba(198,160,98,0.45)] bg-transparent px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#555] transition-[color,border-color] duration-700 hover:border-[rgba(198,160,98,0.75)] hover:text-[#111]"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-[110%] bg-[rgba(226,192,141,0.92)] transition-transform duration-700 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:translate-x-0" />
                <span className="relative">Hoe solliciteren werkt</span>
                <ArrowUpRight
                  size={13}
                  className="relative transition-transform duration-500 group-hover:translate-x-0.5"
                />
              </a>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {VACATURES.map((vacature, i) => (
              <VacatureCard key={vacature.id} vacature={vacature} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Solliciteren ───────────────────────────────────── */}
      <section
        id={SOLLICITEREN_ANCHOR}
        className="relative isolate overflow-hidden bg-[#070707] px-6 py-24 grain lg:px-10 lg:py-32"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_78%_60%_at_18%_0%,rgba(179,18,23,0.2),transparent_58%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_88%_80%,rgba(226,192,141,0.1),transparent_60%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(226,192,141,0.4),transparent)]" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(226,192,141,0.24),transparent)]" />
        </div>

        <div className="relative mx-auto max-w-[1200px]">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <Reveal className="lg:col-span-7">
              <AyatSectionBadge
                kicker={VACATURES_SOLLICITEREN.eyebrow}
                title="Ayat Food"
                tone="dark"
              />
              <h2 className="mt-5 font-display text-[clamp(2rem,3.5vw,3rem)] leading-[1.12] text-[#F8F4EE]">
                {VACATURES_SOLLICITEREN.title}
              </h2>
            </Reveal>
            <Reveal className="lg:col-span-5" delay={0.12}>
              <p className="max-w-[42ch] text-[15px] leading-[1.8] text-white/70 lg:ml-auto lg:text-right">
                {VACATURES_SOLLICITEREN.lede}
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-5 lg:mt-16 lg:grid-cols-12 lg:gap-6">
            {/* Stappen */}
            <div className="grid gap-5 sm:grid-cols-3 lg:col-span-7 lg:grid-cols-1">
              {VACATURES_SOLLICITEREN.steps.map((step, i) => (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-6%" }}
                  transition={{ duration: 0.8, delay: i * 0.09, ease: DS_EASE_REVEAL }}
                  className="group relative overflow-hidden rounded-[22px] border border-white/[0.08] bg-[linear-gradient(165deg,rgba(255,255,255,0.06)_0%,rgba(10,10,10,0.3)_60%,rgba(26,8,8,0.36)_100%)] p-6 backdrop-blur-[6px] transition-all duration-700 hover:border-[rgba(226,192,141,0.3)] lg:flex lg:items-start lg:gap-6 lg:p-7"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[rgba(226,192,141,0.32)] bg-white/[0.05] font-display text-[15px] tabular-nums text-[rgba(240,226,202,0.95)]">
                    {step.n}
                  </span>
                  <div className="mt-5 lg:mt-0">
                    <h3 className="font-display text-[1.25rem] leading-tight text-[#F8F4EE]">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 text-[13.5px] leading-[1.75] text-white/64">{step.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contactkaart */}
            <Reveal className="lg:col-span-5" delay={0.14}>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[24px] border border-white/[0.09] bg-[linear-gradient(165deg,#141414_0%,#0a0a0a_55%,#1a0808_100%)] p-7 shadow-[0_32px_80px_-40px_rgba(0,0,0,0.6)] lg:p-8">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(179,18,23,0.24),transparent_70%)]"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(226,192,141,0.42),transparent)]"
                />

                <p className="relative text-[10px] font-semibold uppercase tracking-[0.28em] text-[rgba(226,192,141,0.9)]">
                  {BRAND.name}
                </p>
                <p className="relative mt-3 font-display text-[1.35rem] leading-snug tracking-[-0.02em] text-white">
                  Stuur je sollicitatie naar ons toe
                </p>

                <div className="relative mt-7 space-y-3.5 border-t border-white/[0.07] pt-7">
                  <ContactRow
                    icon={Mail}
                    label="E-mail"
                    value={BRAND.email}
                    href={`mailto:${BRAND.email}`}
                  />
                  <ContactRow
                    icon={Phone}
                    label="Telefoon"
                    value={BRAND.phoneDisplay}
                    href={`tel:${BRAND.phoneTel}`}
                  />
                  <ContactRow icon={MapPin} label="Adres" value={BRAND.addressFull} />
                  <ContactRow icon={Clock} label="Openingstijden" value={BRAND.hours} />
                </div>

                <div className="relative mt-auto flex flex-wrap gap-3 pt-8">
                  <a
                    href={sollicitatieMailto()}
                    className="ipek-btn-premium group flex-1 justify-center px-6 py-3.5 text-[11px] tracking-[0.18em]"
                  >
                    <span className="relative z-[1] inline-flex items-center gap-2.5">
                      {VACATURES_SOLLICITEREN.ctaLabel}
                      <ArrowUpRight
                        size={14}
                        className="transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </a>
                  <a
                    href={`tel:${BRAND.phoneTel}`}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/[0.04] px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/78 transition-colors duration-300 hover:bg-white/[0.08] hover:text-white"
                  >
                    <Phone size={14} className="text-[rgba(226,192,141,0.9)]" />
                    {VACATURES_SOLLICITEREN.callLabel}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Open sollicitatie ──────────────────────────────── */}
      <section className="relative isolate overflow-hidden px-6 py-24 lg:px-10 lg:py-28">
        <SectionBackdrop src={backgroundWhite1} />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(198,160,98,0.42),transparent)]"
        />
        <div className="relative mx-auto max-w-[1200px]">
          <Reveal>
            <div className="flex flex-col items-center text-center">
              <p className="ipek-label ipek-heading-label text-[10px] tracking-[0.3em]">
                {VACATURES_CLOSING.eyebrow}
              </p>
              <h2 className="mt-5 max-w-[20ch] font-display text-[clamp(1.9rem,3.2vw,2.75rem)] leading-[1.14] text-[#1c1c1c]">
                {VACATURES_CLOSING.title}
              </h2>
              <div
                aria-hidden
                className="mt-7 h-px w-[min(360px,62%)] bg-[linear-gradient(90deg,transparent,rgba(179,18,23,0.32),transparent)]"
              />
              <p className="mt-7 max-w-[52ch] text-[15px] leading-[1.8] text-[#5a5a5a]">
                {VACATURES_CLOSING.text}
              </p>
              <div className="mt-10">
                <MagneticButton href={sollicitatieMailto()}>
                  {VACATURES_CLOSING.ctaLabel}
                  <ArrowUpRight size={14} />
                </MagneticButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
