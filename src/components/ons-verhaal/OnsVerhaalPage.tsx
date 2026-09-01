import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronRight } from "lucide-react";
import { AssortimentKlantCta } from "@/components/assortiment/AssortimentKlantCta";
import { OnsVerhaalMobileStickyBar } from "@/components/ons-verhaal/OnsVerhaalMobileStickyBar";
import { OnsVerhaalAssortimentSection } from "@/components/ons-verhaal/OnsVerhaalAssortimentSection";
import { OnsVerhaalCareersSection } from "@/components/ons-verhaal/OnsVerhaalCareersSection";
import { OnsVerhaalHalalSection } from "@/components/ons-verhaal/OnsVerhaalHalalSection";
import { OnsVerhaalHighlightsSection } from "@/components/ons-verhaal/OnsVerhaalHighlightsSection";
import { OnsVerhaalServiceSection } from "@/components/ons-verhaal/OnsVerhaalServiceSection";
import { OnsVerhaalStatsSection } from "@/components/ons-verhaal/OnsVerhaalStatsSection";
import { OnsVerhaalWorkflowSection } from "@/components/ons-verhaal/OnsVerhaalWorkflowSection";
import { RollingCounter } from "@/components/RollingCounter";
import {
  GLASS_DARK,
  LUXURY_EASE,
  LUXURY_SHELL,
} from "@/components/ons-verhaal/ons-verhaal-premium-ui";
import {
  ONS_VERHAAL_HERO,
  ONS_VERHAAL_HERO_FALLBACK,
  ONS_VERHAAL_STATS,
} from "@/lib/ons-verhaal-content";
import { DS_EASE, DS_EASE_REVEAL } from "@/lib/design-system";

export function OnsVerhaalPage() {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroContentY = useTransform(heroProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(heroProgress, [0, 0.75], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.08]);

  const titleWords = ONS_VERHAAL_HERO.title.split(" ");
  const heroStat = ONS_VERHAAL_STATS.items[0];

  return (
    <div className="ons-verhaal-page">
      {/* 00 — Hero (app sheet on mobile) */}
      <section
        ref={heroRef}
        className="pr-cinematic-hero ons-verhaal-hero relative isolate min-h-[min(92vh,900px)] overflow-hidden bg-[#030303] grain"
      >
        <div className="pr-cinematic-hero__stage">
          <motion.div className="pr-cinematic-hero__media" style={{ scale: reduceMotion ? 1 : heroScale }}>
            <motion.img
              src={ONS_VERHAAL_HERO_FALLBACK}
              alt=""
              aria-hidden
              className="pr-cinematic-hero__img h-full w-full object-cover object-[68%_center] sm:object-[72%_center]"
              style={{ filter: "brightness(0.42) contrast(1.1) saturate(1.06)" }}
              initial={reduceMotion ? false : { scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.6, ease: DS_EASE_REVEAL }}
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </motion.div>

          <div aria-hidden className="pr-cinematic-hero__grades pointer-events-none">
            <div className="pr-cinematic-hero__grade pr-cinematic-hero__grade--scrim" />
            <div className="pr-cinematic-hero__grade pr-cinematic-hero__grade--warm" />
            <div className="pr-cinematic-hero__grade pr-cinematic-hero__grade--bottom" />
            <div className="pr-cinematic-hero__grade pr-cinematic-hero__grade--vignette" />
          </div>
        </div>

        <motion.div
          style={{ y: reduceMotion ? 0 : heroContentY, opacity: reduceMotion ? 1 : heroOpacity }}
          className="pr-cinematic-hero__shell relative mx-auto flex min-h-[min(92vh,900px)] ipek-container flex-col justify-end pb-0 pt-28 sm:pt-32 lg:pt-36"
        >
          <div className="flex flex-col gap-8 pb-8 lg:flex-row lg:items-end lg:justify-between lg:pb-12">
            <div className="pr-cinematic-hero__copy max-w-4xl">
            <span className="pr-cinematic-hero__handle" aria-hidden />

            <motion.nav
              aria-label="Breadcrumb"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: DS_EASE }}
              className="pr-cinematic-hero__crumb flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-white/42"
            >
              <Link to="/" className="transition-colors hover:text-[rgba(226,192,141,0.95)]">
                Home
              </Link>
              <ChevronRight size={12} className="shrink-0 text-white/22" />
              <span className="truncate text-white/80">{ONS_VERHAAL_HERO.breadcrumb}</span>
            </motion.nav>

            <div className="pr-cinematic-hero__badges mt-6 flex items-center gap-2.5 sm:mt-8">
              <span className="pr-cinematic-hero__badge inline-flex shrink-0 items-center gap-2 rounded-md border border-[rgba(218,41,42,0.55)] bg-black/35 px-3 py-1.5 backdrop-blur-sm">
                <span className="text-[9px] font-bold uppercase tracking-[0.26em] text-[#DA292A]">Ayat Food</span>
              </span>
              <span className="pr-cinematic-hero__badge shrink-0 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#DA292A]">
                {ONS_VERHAAL_HERO.eyebrow}
              </span>
            </div>

            <h1 className="pr-cinematic-hero__title ons-verhaal-hero__title mt-5 font-display text-[clamp(2.5rem,5.6vw,4.8rem)] leading-[1.02] text-white sm:mt-7">
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55, ease: DS_EASE }}
              className="ons-verhaal-hero__lede mt-4 space-y-4 text-[15px] leading-[1.85] text-white/72 sm:mt-7 md:text-[17px]"
            >
              {ONS_VERHAAL_HERO.paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.65, ease: LUXURY_EASE }}
              className={`ons-verhaal-hero__stat mt-7 inline-flex min-w-[180px] flex-col border border-white/12 p-5 sm:hidden ${LUXURY_SHELL} ${GLASS_DARK}`}
            >
              <p className="text-[9px] font-semibold uppercase tracking-[0.26em] text-white/50">{heroStat.label}</p>
              <p className="mt-2 flex items-baseline font-display text-[2.35rem] font-semibold leading-none tracking-[-0.04em] text-white">
                <RollingCounter value={heroStat.value} />
                <span className="text-[#DA292A]">{heroStat.suffix}</span>
              </p>
            </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 28, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 1, delay: 0.65, ease: LUXURY_EASE }}
              className={`ons-verhaal-hero__stat-desktop hidden shrink-0 border border-white/12 p-6 sm:block sm:min-w-[220px] ${LUXURY_SHELL} ${GLASS_DARK}`}
            >
              <p className="text-[9px] font-semibold uppercase tracking-[0.26em] text-white/50">{heroStat.label}</p>
              <p className="mt-3 flex items-baseline font-display text-[3rem] font-semibold leading-none tracking-[-0.04em] text-white">
                <RollingCounter value={heroStat.value} />
                <span className="text-[#DA292A]">{heroStat.suffix}</span>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 01 — 24/7 service */}
      <OnsVerhaalServiceSection />

      {/* 02 — Halal en kwaliteit */}
      <OnsVerhaalHalalSection />

      {/* 03 — Hoe vlees te bestellen */}
      <OnsVerhaalWorkflowSection />

      {/* 04 — Statistieken */}
      <OnsVerhaalStatsSection />

      {/* 05 — Value cards */}
      <OnsVerhaalHighlightsSection />

      {/* 06 — Assortiment */}
      <OnsVerhaalAssortimentSection />

      {/* 07 — Vacatures */}
      <OnsVerhaalCareersSection />

      <AssortimentKlantCta />

      <OnsVerhaalMobileStickyBar />
    </div>
  );
}
