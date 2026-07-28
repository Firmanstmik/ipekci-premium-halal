import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Award, Buildings, ShieldTick, TruckTick } from "iconsax-react";
import { useEffect, useRef, useState } from "react";
import { HeroCtaButton } from "@/components/home/HeroCtaButton";
import { HeroMeatScrollCue } from "@/components/home/HeroMeatScrollCue";
import { HeroOriginBadge } from "@/components/home/HeroOriginBadge";
import { HeroShowcaseCard } from "@/components/home/HeroShowcaseCard";
import { DS_DURATION, DS_EASE } from "@/lib/design-system";
import {
  HERO_BG_AUTOPLAY_MS,
  HERO_BG_SLIDES,
  HERO_SHOWCASE_AUTOPLAY_MS,
  HERO_SHOWCASE_SLIDES,
  HERO_TRUST_ITEMS,
} from "@/lib/home-hero-content";

const TRUST_ICONS = [ShieldTick, Award, Buildings, TruckTick] as const;

export function HomeHeroSection() {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const [bgActive, setBgActive] = useState(0);
  const [showcaseActive, setShowcaseActive] = useState(0);
  const [showcasePaused, setShowcasePaused] = useState(false);
  const [entered, setEntered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setEntered(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const t = window.setInterval(() => {
      setBgActive((i) => (i + 1) % HERO_BG_SLIDES.length);
    }, HERO_BG_AUTOPLAY_MS);
    return () => window.clearInterval(t);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion || showcasePaused) return;
    const t = window.setInterval(() => {
      setShowcaseActive((i) => (i + 1) % HERO_SHOWCASE_SLIDES.length);
    }, HERO_SHOWCASE_AUTOPLAY_MS);
    return () => window.clearInterval(t);
  }, [reduceMotion, showcasePaused]);

  return (
    <section
      ref={heroRef}
      data-story-chapter="introduction"
      aria-label="Introductie"
      className="relative min-h-[100svh] w-full overflow-hidden bg-background grain lg:h-[100svh] lg:max-h-[100svh]"
    >
      {/* Modern full-bleed background slider */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" aria-hidden>
          {HERO_BG_SLIDES.map((slide, i) => {
            const active = i === bgActive;
            return (
              <motion.div
                key={slide.id}
                className="absolute inset-0"
                initial={false}
                animate={{
                  opacity: active ? 1 : 0,
                  scale: active ? (reduceMotion ? 1 : 1.045) : 1.02,
                }}
                transition={{
                  opacity: { duration: reduceMotion ? 0.35 : 1.15, ease: DS_EASE },
                  scale: {
                    duration: active && !reduceMotion ? HERO_BG_AUTOPLAY_MS / 1000 : 1.15,
                    ease: active ? "linear" : DS_EASE,
                  },
                }}
                style={{ zIndex: active ? 2 : 1, pointerEvents: "none" }}
              >
                <img
                  src={slide.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{
                    objectPosition: slide.objectPosition,
                    filter: "brightness(1.02) contrast(1.04) saturate(1.08)",
                  }}
                  decoding="async"
                />
              </motion.div>
            );
          })}

          <div className="absolute inset-0 z-[3] bg-gradient-to-b from-background/22 via-transparent to-background/35" />
          <div className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-32 bg-gradient-to-b from-black/38 via-black/08 to-transparent" />
          <div className="absolute inset-0 z-[3] bg-[linear-gradient(to_right,rgba(6,6,6,0.55)_0%,rgba(6,6,6,0.22)_38%,rgba(6,6,6,0.04)_62%,transparent_100%)]" />
          <div className="absolute inset-0 z-[3] bg-[radial-gradient(720px_480px_at_18%_8%,rgba(226,192,141,0.04)_0%,transparent_70%)]" />
        </div>

        <div
          className="absolute bottom-7 left-1/2 z-30 hidden -translate-x-1/2 items-center gap-2.5 sm:flex"
          role="tablist"
          aria-label="Hero achtergrond"
        >
          {HERO_BG_SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={i === bgActive}
              aria-label={`Achtergrond ${slide.label}`}
              onClick={() => setBgActive(i)}
              className="group relative h-[2px] w-10 overflow-hidden rounded-full bg-white/15 transition-opacity hover:opacity-100"
            >
              {i === bgActive && !reduceMotion ? (
                <motion.span
                  key={`bg-progress-${slide.id}-${bgActive}`}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[var(--gold-champagne)] to-[var(--primary)]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: HERO_BG_AUTOPLAY_MS / 1000,
                    ease: "linear",
                  }}
                />
              ) : (
                <span
                  className={`absolute inset-y-0 left-0 ${
                    i === bgActive ? "w-full bg-[var(--gold-champagne)]" : "w-0"
                  }`}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_30%_40%,rgba(0,0,0,0.22),transparent_62%)]"
        initial={reduceMotion ? false : { opacity: 0.7 }}
        animate={{ opacity: entered ? 0.2 : 0.7 }}
        transition={{ duration: 1.4, ease: DS_EASE }}
      />

      <motion.div
        style={{ opacity: heroOpacity }}
        className="ipek-container relative z-10 flex h-[100svh] max-h-[100svh] min-h-0 flex-col pb-4 pt-[8.5rem] sm:pt-[9rem] lg:pb-5 lg:pt-[10rem] xl:pt-[10.25rem]"
      >
        <motion.div
          className="grid min-h-0 flex-1 items-center gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-12 xl:gap-16"
          initial={
            reduceMotion ? false : { opacity: 0, clipPath: "inset(10% 8% 14% 8% round 32px)" }
          }
          animate={entered ? { opacity: 1, clipPath: "inset(0% 0% 0% 0% round 0px)" } : undefined}
          transition={{ duration: 1.2, ease: DS_EASE }}
        >
          <div className="relative z-20 min-w-0 overflow-visible lg:pr-6 xl:pr-10">
            <span
              className="pointer-events-none absolute -left-4 top-2 hidden h-28 w-px bg-gradient-to-b from-transparent via-[rgba(226,192,141,0.45)] to-transparent lg:block"
              aria-hidden
            />

            <HeroOriginBadge reduceMotion={reduceMotion} />

            <motion.h1 className="mt-5 overflow-visible font-display text-[clamp(2.35rem,4.8vw,3.85rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-foreground">
              <motion.span
                initial={
                  reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22, filter: "blur(8px)" }
                }
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.22, duration: DS_DURATION.reveal, ease: DS_EASE }}
                className="block"
              >
                Premium Halal
              </motion.span>
              <motion.span
                initial={
                  reduceMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 28, clipPath: "inset(0 100% 0 0)" }
                }
                animate={{ opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)" }}
                transition={{ delay: 0.38, duration: 1.05, ease: DS_EASE }}
                className="mt-1.5 block overflow-visible ipek-hero-halalvlees"
              >
                vleesgroothandel
              </motion.span>
            </motion.h1>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.58, duration: 0.85, ease: DS_EASE }}
              className="mt-5 max-w-[34rem] text-[14px] leading-[1.72] text-foreground/64 sm:text-[15px]"
            >
              Ayat Food is gespecialiseerd in het produceren van hoogwaardige Halal producten. Wij
              leveren aan restaurants, supermarkten en retail. 100% Halal, volgens NVWA-normen, met
              snelle en betrouwbare levering.
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72, duration: 0.8, ease: DS_EASE }}
              className="relative z-30 mt-5 flex flex-wrap items-center gap-2.5 sm:gap-3"
            >
              <HeroCtaButton to="/producten" variant="primary">
                Bekijk Producten
              </HeroCtaButton>
              <HeroCtaButton to="/contact" variant="ghost">
                Vraag Offerte Aan
              </HeroCtaButton>
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.86, duration: 0.75, ease: DS_EASE }}
              className="mt-4 flex flex-wrap gap-2 sm:mt-5"
            >
              {HERO_TRUST_ITEMS.map((item, i) => {
                const Icon = TRUST_ICONS[i];
                return (
                  <motion.div
                    key={item.title}
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + i * 0.06, duration: 0.55, ease: DS_EASE }}
                    className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-black/30 px-2.5 py-1 backdrop-blur-sm"
                  >
                    <Icon size={12} variant="Linear" color="var(--primary)" />
                    <span className="text-[8px] font-semibold uppercase tracking-[0.1em] text-foreground/68">
                      {item.title}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          <div
            className="relative z-10 lg:justify-self-end lg:pl-4"
            onMouseEnter={() => setShowcasePaused(true)}
            onMouseLeave={() => setShowcasePaused(false)}
          >
            <HeroShowcaseCard
              active={showcaseActive}
              paused={showcasePaused}
              onSelect={setShowcaseActive}
              reduceMotion={reduceMotion}
            />
          </div>
        </motion.div>

        <HeroMeatScrollCue />
      </motion.div>
    </section>
  );
}
