import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Award,
  CalendarDays,
  HeartHandshake,
  MousePointerClick,
  ShieldCheck,
  Sparkles,
  Truck,
  UtensilsCrossed,
} from "lucide-react";
import { AyatSectionBadge } from "@/components/home/AyatSectionBadge";
import { DS_EASE } from "@/lib/design-system";
import { CardFrameOverlay, ImageFrameOverlay } from "@/components/ui/premium-frame";
import {
  PRODUCT_EXPLORER_COPY,
  PRODUCT_EXPLORER_ITEMS,
  PRODUCT_EXPLORER_ORDER,
  PRODUCT_EXPLORER_STAGE_ASPECT,
  PRODUCT_EXPLORER_STAGE_IMAGE,
  PRODUCT_EXPLORER_TRUST,
  computeExplorerCallout,
  type ExplorerProduct,
} from "@/lib/product-explorer-content";

const SHOWCASE_INTERVAL_MS = 5500;
const CUT_TRANSITION = { duration: 0.45, ease: DS_EASE } as const;

const TRUST_ICONS = {
  award: Award,
  shield: ShieldCheck,
  truck: Truck,
  heart: HeartHandshake,
} as const;

const specIcon = (k: string) => {
  switch (k) {
    case "halal":
      return ShieldCheck;
    case "quality":
      return Sparkles;
    case "use":
      return UtensilsCrossed;
    default:
      return CalendarDays;
  }
};

export function PremiumMeatShowcase() {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string>(PRODUCT_EXPLORER_ITEMS[0].id);
  const [autoMode, setAutoMode] = useState(false);
  const showcaseIndexRef = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInViewRef = useRef(false);

  const stopAutoMode = useCallback(() => {
    setAutoMode(false);
  }, []);

  const selectCut = useCallback(
    (id: string) => {
      stopAutoMode();
      setActiveId(id);
    },
    [stopAutoMode],
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
      },
      { threshold: 0.25 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!autoMode || reduceMotion) return;

    const advance = () => {
      if (!isInViewRef.current) return;
      showcaseIndexRef.current =
        (showcaseIndexRef.current + 1) % PRODUCT_EXPLORER_ORDER.length;
      setActiveId(PRODUCT_EXPLORER_ORDER[showcaseIndexRef.current]);
    };

    const timer = window.setInterval(advance, SHOWCASE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [autoMode, reduceMotion]);

  const active =
    PRODUCT_EXPLORER_ITEMS.find((c) => c.id === activeId) ?? PRODUCT_EXPLORER_ITEMS[0];
  const isFeatured = Boolean(active.featured);
  const focusedId = activeId;
  const callout = computeExplorerCallout(
    active.cx,
    active.cy,
    active.callout.width ?? 148,
  );
  const calloutPath = callout.path;
  const calloutAnchorX = callout.endX;
  const calloutAnchorY = callout.endY;
  const mobileCalloutWidth = callout.mobileWidth;

  const handleMouseMove = () => {
    stopAutoMode();
  };

  const handleMouseLeave = () => {};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const cowVariants = {
    hidden: { opacity: 0, scale: 1.04, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 1.2, ease: DS_EASE },
    },
  };

  const panelVariants = {
    hidden: { opacity: 0, x: 35, y: 0 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 1.0, ease: DS_EASE },
    },
  };

  const hotspotVariants = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: DS_EASE },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="meat-explorer"
      data-story-chapter="expertise"
      aria-labelledby="meat-explorer-heading"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onPointerDown={stopAutoMode}
      onKeyDown={stopAutoMode}
      className="story-surface-light relative overflow-hidden bg-[#FAF8F5]"
    >
      <div className="pointer-events-none absolute inset-0 z-0 grain opacity-40" />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(226,192,141,0.12) 0%, transparent 55%)",
        }}
      />
      <div className="pointer-events-none absolute -left-32 top-20 z-0 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(226,192,141,0.16),transparent_68%)]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 z-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(177,18,23,0.07),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-px bg-gradient-to-r from-transparent via-[rgba(200,164,107,0.4)] to-transparent" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 pb-14 pt-16 md:pb-16 md:pt-20 lg:px-10 lg:pb-20 lg:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: DS_EASE }}
          className="max-w-2xl"
        >
          <AyatSectionBadge
            kicker="Assortiment"
            title="Ons assortiment"
            className="mb-5"
          />
          <h2
            id="meat-explorer-heading"
            className="ipek-h2 text-[#141414]"
          >
            {PRODUCT_EXPLORER_COPY.headingLine}{" "}
            <span className="ipek-heading-accent">
              {PRODUCT_EXPLORER_COPY.headingAccent}
            </span>
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[#141414]/78 md:text-base">
            <span className="hidden [@media(hover:hover)]:inline">
              {PRODUCT_EXPLORER_COPY.introHover}
            </span>
            <span className="[@media(hover:hover)]:hidden">
              {PRODUCT_EXPLORER_COPY.introTap}
            </span>
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-10 grid grid-cols-1 gap-8 lg:mt-12 lg:grid-cols-[1.42fr_0.58fr] lg:items-start lg:gap-8 xl:gap-10"
        >
          <motion.div variants={cowVariants}>
            <div className={`group/if relative isolate ${PRODUCT_EXPLORER_STAGE_ASPECT} w-full overflow-hidden rounded-[28px] border border-black/[0.08] bg-white shadow-[0_32px_90px_-50px_rgba(0,0,0,0.18)] transition-shadow duration-500 hover:shadow-[0_40px_100px_-48px_rgba(179,18,23,0.12)] [contain:paint]`}>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_40%,rgba(226,192,141,0.08),transparent_60%)]" />
              <img
                src={PRODUCT_EXPLORER_STAGE_IMAGE}
                alt={PRODUCT_EXPLORER_COPY.stageAlt}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                width={1024}
                height={1024}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35" />
              <ImageFrameOverlay variant="reticle" className="rounded-[28px]" />

              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 z-10 h-full w-full"
              >
                <defs>
                  <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="0.55" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="lineGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="0.35" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <linearGradient id="calloutStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="oklch(0.68 0.1 75 / 0.35)" />
                    <stop offset="45%" stopColor="oklch(0.82 0.13 78 / 0.85)" />
                    <stop offset="100%" stopColor="oklch(0.88 0.11 82 / 1)" />
                  </linearGradient>
                  <linearGradient id="calloutGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="oklch(0.82 0.13 78 / 0.05)" />
                    <stop offset="50%" stopColor="oklch(0.82 0.13 78 / 0.28)" />
                    <stop offset="100%" stopColor="oklch(0.82 0.13 78 / 0.08)" />
                  </linearGradient>
                </defs>

                {PRODUCT_EXPLORER_ITEMS.map((c) => {
                  const isActive = c.id === activeId;
                  const isFocus = isActive;
                  const dim = focusedId && !isFocus;
                  return (
                    <g key={c.id}>
                      <motion.path
                        d={c.region}
                        fill="oklch(0.82 0.13 78)"
                        stroke="oklch(0.96 0.02 80 / 0.14)"
                        strokeWidth={0.18}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        className="cursor-pointer"
                        initial={false}
                        animate={{
                          fillOpacity: isActive ? 0.14 : 0,
                          strokeOpacity: isActive ? 0.45 : 0.12,
                          opacity: dim ? 0.32 : 1,
                        }}
                        transition={{ duration: 0.62, ease: DS_EASE }}
                        onClick={() => selectCut(c.id)}
                        onMouseEnter={() => selectCut(c.id)}
                      />

                      <AnimatePresence>
                        {isActive && (
                          <motion.path
                            key={`glow-${c.id}`}
                            d={c.region}
                            fill="url(#calloutGlow)"
                            stroke="none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.65, ease: DS_EASE }}
                            style={{ pointerEvents: "none", filter: "url(#goldGlow)" }}
                          />
                        )}
                      </AnimatePresence>

                      <AnimatePresence>
                        {isFocus && (
                          <motion.path
                            key={`trail-${c.id}-${isActive}`}
                            d={c.region}
                            fill="none"
                            stroke={
                              isActive
                                ? "oklch(0.82 0.13 78 / 0.9)"
                                : "oklch(0.82 0.13 78 / 0.55)"
                            }
                            strokeWidth={isActive ? 0.38 : 0.28}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={CUT_TRANSITION}
                            style={{ pointerEvents: "none" }}
                          />
                        )}
                      </AnimatePresence>
                    </g>
                  );
                })}

                <AnimatePresence mode="wait">
                  <>
                    <motion.path
                      key={`callout-line-glow-${active.id}`}
                      d={calloutPath}
                      fill="none"
                      stroke="url(#calloutGlow)"
                      strokeWidth="0.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.85 }}
                      exit={{ opacity: 0 }}
                      transition={CUT_TRANSITION}
                      style={{ pointerEvents: "none" }}
                    />
                    <motion.path
                      key={`callout-line-${active.id}`}
                      d={calloutPath}
                      fill="none"
                      stroke="url(#calloutStroke)"
                      strokeWidth="0.14"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={CUT_TRANSITION}
                      style={{ pointerEvents: "none" }}
                    />
                    <motion.circle
                      key={`callout-start-node-${active.id}`}
                      cx={active.cx}
                      cy={active.cy}
                      r="0.45"
                      fill="oklch(0.82 0.13 78)"
                      stroke="oklch(0.1 0.006 30)"
                      strokeWidth="0.12"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={CUT_TRANSITION}
                      style={{ pointerEvents: "none" }}
                    />
                    <motion.circle
                      key={`callout-end-node-${active.id}`}
                      cx={calloutAnchorX}
                      cy={calloutAnchorY}
                      r="0.45"
                      fill="oklch(0.82 0.13 78)"
                      stroke="oklch(0.1 0.006 30)"
                      strokeWidth="0.12"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={CUT_TRANSITION}
                      style={{ pointerEvents: "none" }}
                    />
                  </>
                </AnimatePresence>
              </svg>

              <AnimatePresence mode="wait">
                <div
                  style={{
                    left: `${callout.x}%`,
                    top: `${callout.y}%`,
                    width: `${callout.width}px`,
                    transform: callout.transform,
                  }}
                  className="pointer-events-none absolute z-20 hidden md:block"
                >
                  <motion.div
                    key={`callout-box-${active.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={CUT_TRANSITION}
                    className="relative overflow-hidden rounded-[14px] border border-[rgba(200,164,107,0.35)] bg-white/95 px-3.5 py-2.5 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.15)] backdrop-blur-md"
                  >
                    <div className="relative min-w-0">
                      <motion.div
                        initial={{ opacity: 0, y: 3 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -3 }}
                        transition={{ duration: 0.25 }}
                        className="text-[6px] font-semibold uppercase tracking-[0.25em] text-[#B31217]"
                      >
                        {PRODUCT_EXPLORER_COPY.calloutEyebrow}
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.3, delay: 0.04 }}
                        className="mt-0.5 font-display text-[15px] font-semibold leading-[0.95] text-[#141414]"
                      >
                        {active.label}
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -3 }}
                        transition={{ duration: 0.3, delay: 0.08 }}
                        className="mt-1 flex items-center gap-1.5 text-[6.5px] font-semibold uppercase tracking-[0.18em] text-[#141414]/72"
                      >
                        <span className="h-px w-3 bg-gold/30" />
                        <span className="truncate">{active.name}</span>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <div
                  style={{
                    left: `${callout.x}%`,
                    top: `${callout.y}%`,
                    width: `${mobileCalloutWidth}px`,
                    transform: callout.transform,
                  }}
                  className="pointer-events-none absolute z-20 md:hidden"
                >
                  <motion.div
                    key={`mobile-callout-${active.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={CUT_TRANSITION}
                    className="relative overflow-hidden rounded-[10px] border border-[rgba(200,164,107,0.3)] bg-white/95 px-2.5 py-1.5 shadow-[0_10px_24px_-12px_rgba(0,0,0,0.12)] backdrop-blur-md"
                  >
                    <div className="relative min-w-0">
                      <div className="text-[5px] font-semibold uppercase tracking-[0.2em] text-[#B31217]">
                        {PRODUCT_EXPLORER_COPY.calloutEyebrow}
                      </div>
                      <div className="mt-0.5 font-display text-[12px] font-semibold leading-[0.9] text-[#141414]">
                        {active.label}
                      </div>
                      <div className="mt-0.5 flex items-center gap-1 text-[5px] font-semibold uppercase tracking-[0.15em] text-[#141414]/72">
                        <span className="h-px w-2 bg-gold/30" />
                        <span className="truncate">{active.name}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </AnimatePresence>

              {PRODUCT_EXPLORER_ITEMS.map((c) => {
                const isActive = c.id === activeId;

                return (
                  <motion.button
                    key={c.id}
                    variants={hotspotVariants}
                    onClick={() => selectCut(c.id)}
                    onMouseEnter={() => selectCut(c.id)}
                    onFocus={() => selectCut(c.id)}
                    style={{ left: `${c.cx}%`, top: `${c.cy}%` }}
                    className="group absolute z-30 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    aria-label={c.name}
                    whileTap={{ scale: 0.92 }}
                  >
                    <div className="relative flex items-center justify-center">
                      <motion.span
                        className="absolute inset-0 rounded-full border"
                        initial={false}
                        animate={{
                          scale: isActive ? 2.1 : 1,
                          opacity: isActive ? 0.85 : 0,
                          borderColor: "oklch(0.82 0.13 78 / 0.35)",
                          backgroundColor: "oklch(0.82 0.13 78 / 0.08)",
                        }}
                        transition={CUT_TRANSITION}
                      />

                      <motion.div
                        className={`relative flex items-center justify-center rounded-full ${
                          isActive
                            ? "h-8 w-8 border-2 border-[#B31217] bg-white shadow-[0_0_0_4px_rgba(179,18,23,0.15)] md:h-9 md:w-9"
                            : "h-6 w-6 border border-[rgba(200,164,107,0.45)] bg-white/90 shadow-sm backdrop-blur md:h-7 md:w-7"
                        }`}
                        animate={{
                          scale: isActive ? 1.08 : 1,
                        }}
                        transition={CUT_TRANSITION}
                      >
                        <div
                          className={`absolute rounded-full transition-all duration-500 ${
                            isActive
                              ? "inset-[3px] border border-gold/35 bg-gold/10"
                              : "inset-[2px] border border-transparent bg-transparent"
                          }`}
                        />

                        <motion.span
                          className={`relative font-sans text-[8px] font-semibold tracking-tight md:text-[9.5px] ${
                            isActive ? "text-[#B31217]" : "text-[#141414]/75"
                          }`}
                        >
                          {String(c.number).padStart(2, "0")}
                        </motion.span>
                      </motion.div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#141414]/68">
              <MousePointerClick className="h-4 w-4 text-[#B31217]" />
              <span className="hidden [@media(hover:hover)]:inline">
                {PRODUCT_EXPLORER_COPY.hintHover}
              </span>
              <span className="[@media(hover:hover)]:hidden">
                {PRODUCT_EXPLORER_COPY.hintTap}
              </span>
            </div>
          </motion.div>

          <motion.div variants={panelVariants} className="relative isolate lg:max-w-none [contain:paint]">
            <div className="relative flex flex-col overflow-hidden rounded-[22px] border border-black/[0.08] bg-white shadow-[0_28px_70px_-46px_rgba(0,0,0,0.2)] transition-shadow duration-500 hover:shadow-[0_34px_80px_-42px_rgba(179,18,23,0.14)]">
              <div className="relative min-h-0 flex-1 overflow-hidden">
                <div className="group/if relative aspect-[16/11] overflow-hidden sm:aspect-[5/3]">
                  <AnimatePresence initial={false} mode="wait">
                    <motion.img
                      key={active.id}
                      src={active.image}
                      alt={active.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={CUT_TRANSITION}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                      width={1024}
                      height={768}
                    />
                  </AnimatePresence>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/95 via-[#0a0a0a]/4 to-[#0a0a0a]/08" />
                  <ImageFrameOverlay variant="prism" />
                  <div className="absolute left-4 top-4 z-10">
                    <span className="inline-flex rounded-full border border-white/25 bg-black/45 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.2em] text-white shadow-sm backdrop-blur-md">
                      {isFeatured
                        ? PRODUCT_EXPLORER_COPY.badgeFeatured
                        : PRODUCT_EXPLORER_COPY.badgeHalal}
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 z-10 p-4 md:p-5">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`info-${active.id}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={CUT_TRANSITION}
                      >
                        <span className="text-[8px] font-semibold uppercase tracking-[0.26em] text-[var(--gold-champagne)]">
                          {active.label}
                        </span>
                        <h3 className="mt-1 font-display text-[1.35rem] font-semibold leading-[1.05] tracking-[-0.03em] text-white md:text-[1.5rem]">
                          {active.name}
                        </h3>
                        <p className="mt-1.5 line-clamp-3 text-[12px] leading-relaxed text-white/88 md:text-[13px]">
                          {active.description}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <div className="relative border-t border-black/[0.06] bg-[linear-gradient(180deg,#fff_0%,#faf8f5_100%)] p-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`specs-${active.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: DS_EASE }}
                    className="grid grid-cols-2 gap-2"
                  >
                    {active.specs.map((s) => {
                      const Icon = specIcon(s.icon);
                      return (
                        <div
                          key={s.label}
                          className="group/spec relative overflow-hidden rounded-[14px] border border-[rgba(179,18,23,0.1)] bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(250,248,245,0.9))] px-3 py-2.5 shadow-[0_10px_28px_-22px_rgba(179,18,23,0.28)] transition-colors duration-300 hover:border-[rgba(179,18,23,0.28)]"
                        >
                          <span
                            aria-hidden
                            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(200,164,107,0.55)] to-transparent"
                          />
                          <div className="flex items-center gap-2.5">
                            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] border border-[rgba(179,18,23,0.22)] bg-[linear-gradient(145deg,rgba(179,18,23,0.12),#fff)] text-[#B31217] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                              <Icon className="h-3.5 w-3.5" strokeWidth={1.85} />
                            </span>
                            <span className="min-w-0">
                              <span className="block text-[8px] font-semibold uppercase tracking-[0.16em] text-[#B31217]">
                                {s.label}
                              </span>
                              <span className="mt-0.5 block truncate font-display text-[12.5px] font-semibold leading-tight tracking-[-0.02em] text-[#141414]">
                                {s.value}
                              </span>
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`chef-${active.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={CUT_TRANSITION}
                    className="relative mt-3 overflow-hidden rounded-[14px] border border-[rgba(179,18,23,0.14)] bg-[linear-gradient(135deg,rgba(179,18,23,0.06)_0%,rgba(255,255,255,0.95)_42%,rgba(250,248,245,0.9)_100%)] px-3.5 py-3"
                  >
                    <span
                      aria-hidden
                      className="absolute bottom-3 left-0 top-3 w-[3px] rounded-full bg-gradient-to-b from-[#B31217] via-[rgba(200,164,107,0.85)] to-transparent"
                    />
                    <div className="pl-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#B31217]">
                          {PRODUCT_EXPLORER_COPY.usageLabel}
                        </span>
                        <span className="h-px flex-1 bg-gradient-to-r from-[rgba(179,18,23,0.25)] to-transparent" />
                      </div>
                      <p className="mt-1.5 font-display text-[13px] font-medium leading-snug tracking-[-0.015em] text-[#141414]/88">
                        {active.bestFor}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <a href={active.href} className="ipek-btn-premium group mt-3.5 w-full py-3.5 text-[11px]">
                  <span>{PRODUCT_EXPLORER_COPY.ctaLabel}</span>
                  <ArrowRight className="ipek-btn-premium__arrow h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-8 border-t border-[rgba(200,164,107,0.22)] pt-8 md:mt-10 md:pt-9">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#B31217]">
                Waarom Ayat Food
              </p>
              <p className="mt-1 font-display text-[1.05rem] font-semibold tracking-[-0.02em] text-[#141414] md:text-[1.15rem]">
                Vertrouwen in elke levering
              </p>
            </div>
            <span
              aria-hidden
              className="hidden h-px flex-1 max-w-[220px] bg-gradient-to-r from-[rgba(200,164,107,0.45)] to-transparent sm:block"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {PRODUCT_EXPLORER_TRUST.map((t, i) => {
              const Icon = TRUST_ICONS[t.icon];
              return (
                <motion.article
                  key={t.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="group/if relative flex flex-col overflow-hidden rounded-[20px] border border-[rgba(179,18,23,0.12)] bg-white shadow-[0_18px_44px_-30px_rgba(0,0,0,0.28)] transition-all duration-500 hover:-translate-y-1 hover:border-[rgba(179,18,23,0.28)] hover:shadow-[0_28px_56px_-32px_rgba(179,18,23,0.28)]"
                >
                  <CardFrameOverlay variant="pulse" />

                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={t.image}
                      alt={t.imageAlt}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/if:scale-[1.06]"
                      loading="lazy"
                      decoding="async"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.08)_0%,rgba(10,10,10,0.18)_42%,rgba(10,10,10,0.72)_100%)]"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.45)] to-transparent"
                    />
                    <div className="absolute bottom-3 left-3 grid h-10 w-10 place-items-center rounded-[12px] border border-white/70 bg-white text-[#B31217] shadow-[0_10px_24px_-12px_rgba(0,0,0,0.55)]">
                      <Icon className="h-4 w-4" strokeWidth={1.85} />
                    </div>
                    <span className="absolute bottom-3.5 right-3 text-[8px] font-semibold uppercase tracking-[0.2em] text-white/90">
                      {t.label}
                    </span>
                  </div>

                  <div className="relative z-[1] flex flex-1 flex-col px-4 pb-4 pt-3.5">
                    <h4 className="font-display text-[1.05rem] font-semibold leading-snug tracking-[-0.02em] text-[#141414]">
                      {t.title}
                    </h4>
                    <p className="mt-2 text-[13px] leading-[1.65] text-[#2a2a2a]">
                      {t.desc}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Kept for typing convenience if needed by consumers */
export type { ExplorerProduct };
