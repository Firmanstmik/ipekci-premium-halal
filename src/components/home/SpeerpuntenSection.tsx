import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import { Link } from "@tanstack/react-router";
import { AyatSectionBadge } from "@/components/home/AyatSectionBadge";
import {
  SPEERPUNTEN_CARDS,
  SPEERPUNTEN_COPY,
  SPEERPUNTEN_METRICS,
  type SpeerpuntMetric,
} from "@/lib/speerpunten-content";

/** Luxury ease — slow settle, never mechanical */
const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;
const LUXURY_BAR_EASE = [0.33, 1, 0.68, 1] as const;

function SpeerpuntBar({
  metric,
  index,
  active,
}: {
  metric: SpeerpuntMetric;
  index: number;
  active: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const progress = useMotionValue(0);
  const width = useTransform(progress, (v) => `${v}%`);
  const display = useTransform(progress, (v) => `${Math.round(v)}%`);

  useEffect(() => {
    if (!active) {
      progress.set(0);
      return;
    }
    if (reduceMotion) {
      progress.set(metric.value);
      return;
    }
    const controls = animate(progress, metric.value, {
      duration: 1.65,
      delay: 0.42 + index * 0.09,
      ease: LUXURY_BAR_EASE,
    });
    return () => controls.stop();
  }, [active, index, metric.value, progress, reduceMotion]);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={active ? { opacity: 1, y: 0 } : undefined}
      transition={{
        duration: 0.85,
        delay: reduceMotion ? 0 : 0.38 + index * 0.07,
        ease: LUXURY_EASE,
      }}
      className="group"
      style={{ willChange: reduceMotion ? undefined : "opacity, transform" }}
    >
      <div className="mb-3 flex items-end justify-between gap-4">
        <span className="text-[13px] font-medium tracking-[0.02em] text-[#F5F2ED]/94 sm:text-[15px]">
          {metric.label}
        </span>
        <motion.span className="font-display text-[15px] font-semibold tabular-nums tracking-[0.06em] text-[#F8F4EE] sm:text-base">
          {display}
        </motion.span>
      </div>
      <div className="relative h-[2.5px] overflow-hidden rounded-full bg-white/[0.12]">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-[linear-gradient(90deg,#9A1014_0%,#DA292A_50%,#E85A5C_100%)] shadow-[0_0_14px_-2px_rgba(218,41,42,0.55)]"
          style={{ width, willChange: "width" }}
        />
      </div>
    </motion.div>
  );
}

export function SpeerpuntenSection() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-14% 0px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* Scroll parallax — almost imperceptible */
  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["0%", "0%"] : ["-1.8%", "1.8%"],
  );
  const bgScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1.03, 1.03] : [1.045, 1.015],
  );

  /* Pointer parallax on light layers only */
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const softX = useSpring(pointerX, { stiffness: 36, damping: 22, mass: 0.45 });
  const softY = useSpring(pointerY, { stiffness: 36, damping: 22, mass: 0.45 });
  const lightX = useTransform(softX, [-0.5, 0.5], ["-2.2%", "2.2%"]);
  const lightY = useTransform(softY, [-0.5, 0.5], ["-1.6%", "1.6%"]);
  const glowX = useTransform(softX, [-0.5, 0.5], ["2%", "-2%"]);
  const glowY = useTransform(softY, [-0.5, 0.5], ["1.4%", "-1.4%"]);

  const handlePointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    if (reduceMotion || !sectionRef.current) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = sectionRef.current.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const leftMetrics = SPEERPUNTEN_METRICS.slice(0, 3);
  const rightMetrics = SPEERPUNTEN_METRICS.slice(3);
  const passion = SPEERPUNTEN_COPY.passion;

  return (
    <section
      ref={sectionRef}
      id="speerpunten"
      data-story-chapter="speerpunten"
      aria-labelledby="speerpunten-heading"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="story-section story-section--visual relative isolate overflow-hidden py-24 text-[#F5F2ED] lg:py-32"
    >
      {/* Atmosphere — existing bg + layered cinematic depth */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <motion.img
          src={SPEERPUNTEN_COPY.backgroundImage}
          alt=""
          className="absolute inset-0 h-[112%] w-full object-cover object-[50%_0%]"
          loading="lazy"
          decoding="async"
          style={{ y: bgY, scale: bgScale, willChange: reduceMotion ? undefined : "transform" }}
        />

        <div className="absolute inset-0 bg-black/[0.70]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_72%_58%_at_50%_40%,transparent_8%,rgba(0,0,0,0.42)_72%,rgba(0,0,0,0.72)_100%)]" />

        <motion.div
          className="absolute inset-0 bg-[radial-gradient(780px_480px_at_18%_16%,rgba(255,248,240,0.07)_0%,transparent_58%)]"
          style={reduceMotion ? undefined : { x: lightX, y: lightY }}
        />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(820px_500px_at_78%_74%,rgba(179,18,23,0.14)_0%,transparent_56%)]"
          style={reduceMotion ? undefined : { x: glowX, y: glowY }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_50%_at_50%_100%,rgba(0,0,0,0.45)_0%,transparent_60%)]" />

        {!reduceMotion && (
          <>
            <div className="speerpunten-mist speerpunten-mist--a absolute inset-0" />
            <div className="speerpunten-mist speerpunten-mist--b absolute inset-0" />
          </>
        )}

        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(226,192,141,0.38),transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="relative z-10 w-full ipek-container">
        {/* Header — badge + heading first, lede second */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <motion.div
            className="lg:col-span-7"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.95, delay: 0.04, ease: LUXURY_EASE }}
          >
            <AyatSectionBadge
              kicker={SPEERPUNTEN_COPY.kicker}
              title={SPEERPUNTEN_COPY.badgeTitle}
              tone="dark"
            />
            <h2
              id="speerpunten-heading"
              className="ipek-h2 mt-5 text-[#F8F4EE] drop-shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
            >
              {SPEERPUNTEN_COPY.title}
            </h2>
          </motion.div>
          <motion.div
            className="lg:col-span-5"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.9, delay: 0.18, ease: LUXURY_EASE }}
          >
            <p className="max-w-[42ch] text-[15px] leading-[1.8] text-[rgba(245,242,237,0.78)] lg:ml-auto lg:text-right">
              {SPEERPUNTEN_COPY.lede}
            </p>
          </motion.div>
        </div>

        {/* Progress metrics */}
        <div className="mt-14 grid gap-x-14 gap-y-10 sm:mt-16 lg:mt-20 lg:grid-cols-2 lg:gap-x-20 lg:gap-y-12">
          <div className="space-y-9 lg:space-y-10">
            {leftMetrics.map((metric, i) => (
              <SpeerpuntBar key={metric.id} metric={metric} index={i} active={isInView} />
            ))}
          </div>
          <div className="space-y-9 lg:space-y-10">
            {rightMetrics.map((metric, i) => (
              <SpeerpuntBar key={metric.id} metric={metric} index={i + 3} active={isInView} />
            ))}
          </div>
        </div>

        {/* Category cards — staggered after bars */}
        <div className="mt-16 grid gap-4 sm:mt-20 sm:grid-cols-3 sm:gap-5 lg:mt-24 lg:gap-6">
          {SPEERPUNTEN_CARDS.map((card, index) => (
            <motion.article
              key={card.id}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: 0.9,
                delay: reduceMotion ? 0 : 0.88 + index * 0.12,
                ease: LUXURY_EASE,
              }}
              className="speerpunten-card group relative overflow-hidden rounded-[18px] border border-white/[0.1] bg-[linear-gradient(165deg,rgba(255,255,255,0.075)_0%,rgba(12,12,12,0.32)_48%,rgba(0,0,0,0.38)_100%)] shadow-[0_28px_70px_-44px_rgba(0,0,0,0.88),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-[8px]"
              style={{ willChange: reduceMotion ? undefined : "transform, opacity" }}
            >
              <Link
                to="/producten/$category"
                params={{ category: card.category }}
                className="relative block p-6 sm:p-7 lg:p-8"
              >
                <div
                  aria-hidden
                  className="speerpunten-card__media pointer-events-none absolute inset-0"
                >
                  <img
                    src={card.image}
                    alt=""
                    className="speerpunten-card__img h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/97 via-[#060606]/78 to-[#060606]/42" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_20%,rgba(255,255,255,0.06),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                <div className="relative">
                  <div className="speerpunten-card__rule mb-5 h-px w-10 bg-[linear-gradient(90deg,#B31217,transparent)]" />
                  <h3 className="font-display text-[1.9rem] font-semibold leading-[1.02] tracking-[-0.03em] text-[#F8F4EE] sm:text-[2.1rem]">
                    {card.title}
                  </h3>
                  <p className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#E02A2E]">
                    {card.subtitle}
                  </p>
                  <p className="mt-4 max-w-[28ch] text-[13px] leading-relaxed text-[rgba(245,242,237,0.66)] sm:text-[14px]">
                    {card.description}
                  </p>
                  <span className="speerpunten-card__cta mt-7 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#E02A2E]">
                    Bekijken
                    <ArrowRight size={14} className="speerpunten-card__arrow" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Passion CTA — last in the reveal sequence */}
        <div className="relative mt-20 border-t border-white/[0.08] pt-16 sm:mt-24 sm:pt-20 lg:mt-28 lg:pt-24">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(420px,70%)] -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(226,192,141,0.45),transparent)]"
          />

          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <motion.div
              className="lg:col-span-7"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: 0.9,
                delay: reduceMotion ? 0 : 1.28,
                ease: LUXURY_EASE,
              }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#E02A2E]">
                {passion.kicker}
              </p>
              <h3
                id="speerpunten-passion-heading"
                className="ipek-h2 mt-4 max-w-[16ch] text-[#F8F4EE] drop-shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
              >
                {passion.title}
              </h3>
            </motion.div>
            <motion.div
              className="lg:col-span-5"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: 0.85,
                delay: reduceMotion ? 0 : 1.38,
                ease: LUXURY_EASE,
              }}
            >
              <p className="max-w-[42ch] text-[15px] leading-[1.8] text-[rgba(245,242,237,0.76)] lg:ml-auto lg:text-right">
                {passion.lede}
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{
              duration: 0.85,
              delay: reduceMotion ? 0 : 1.52,
              ease: LUXURY_EASE,
            }}
            className="mt-10 flex justify-center sm:mt-12"
          >
            <Link
              to={passion.href}
              className="ipek-btn-premium group px-8 py-4 text-[12px] tracking-[0.22em] sm:px-10 sm:py-[1.05rem]"
            >
              <span className="relative z-[1] inline-flex items-center gap-2.5">
                {passion.cta}
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
