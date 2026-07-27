import { Link } from "@tanstack/react-router";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useId, useRef } from "react";
import { ArrowDown, ArrowUpRight, Check, ChevronRight } from "lucide-react";
import { AssortimentKlantCta } from "@/components/assortiment/AssortimentKlantCta";
import { MagneticButton } from "@/components/MagneticButton";
import {
  VOOR_WIE_MEGA_MENU,
  VOOR_WIE_SEGMENTS,
  type VoorWieSegment,
  type VoorWieSegmentId,
} from "@/lib/voor-wie-content";
import { DS_EASE, DS_EASE_REVEAL } from "@/lib/design-system";
import backgroundWhite3 from "@/assets/background-white3.webp";

const gridContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};

const gridItem = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: DS_EASE_REVEAL },
  },
};

function SegmentTabs({ active }: { active: VoorWieSegmentId | "all" }) {
  const tabs: { id: VoorWieSegmentId | "all"; label: string }[] = [
    { id: "all", label: "Alle klanten" },
    ...VOOR_WIE_SEGMENTS.map((s) => ({ id: s.id, label: s.label })),
  ];

  return (
    <div className="flex flex-wrap gap-2.5">
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        const linkClass = `relative inline-flex items-center gap-2 rounded-full border px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] transition-all duration-500 ${
          isActive
            ? "border-[rgba(226,192,141,0.45)] text-[#111]"
            : "border-black/10 bg-white/70 text-[#555] backdrop-blur-md hover:border-[rgba(198,160,98,0.45)] hover:text-[#111]"
        }`;

        const inner = (
          <>
            {isActive ? (
              <motion.span
                layoutId="voorwie-tab-pill"
                className="absolute inset-0 rounded-full bg-white"
                transition={{ type: "spring", stiffness: 400, damping: 34 }}
                aria-hidden
              />
            ) : null}
            <span className="relative z-10">{tab.label}</span>
          </>
        );

        if (tab.id === "all") {
          return (
            <Link key={tab.id} to="/voor-wie" className={linkClass}>
              {inner}
            </Link>
          );
        }

        return (
          <Link
            key={tab.id}
            to="/voor-wie/$segment"
            params={{ segment: tab.id }}
            className={linkClass}
          >
            {inner}
          </Link>
        );
      })}
    </div>
  );
}

function SegmentDetailShowcase({ segment }: { segment: VoorWieSegment }) {
  const imageRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-5, 5]), { stiffness: 160, damping: 26 });
  const rotateX = useSpring(useTransform(my, [0, 1], [4, -4]), { stiffness: 160, damping: 26 });
  const glareX = useTransform(mx, (v) => `${v * 100}%`);
  const glareY = useTransform(my, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(600px 400px at ${glareX} ${glareY}, rgba(255,255,255,0.18) 0%, transparent 58%)`;

  const others = VOOR_WIE_SEGMENTS.filter((s) => s.id !== segment.id);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!imageRef.current) return;
    const r = imageRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }

  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <div className="mt-12">
      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 1, ease: DS_EASE_REVEAL }}
          className="lg:col-span-5 lg:sticky lg:top-32"
        >
          <p className="ipek-label ipek-heading-label text-[10px] tracking-[0.32em]">
            {segment.eyebrow}
          </p>
          <h2 className="mt-5 font-display text-[clamp(2.4rem,4vw,3.5rem)] leading-[1.02] text-[#1c1c1c]">
            {segment.label}
          </h2>
          <p className="mt-6 text-base leading-[1.85] text-[#5a5a5a] md:text-[17px]">
            {segment.longDescription}
          </p>

          <ul className="mt-10 space-y-4">
            {segment.benefits.map((b, i) => (
              <motion.li
                key={b}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: DS_EASE }}
                className="flex items-center gap-3.5 border-b border-black/[0.08] pb-4 last:border-0"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[rgba(198,160,98,0.28)] bg-[rgba(198,160,98,0.08)]">
                  <Check size={14} className="text-[rgba(179,18,23,0.9)]" />
                </span>
                <span className="text-[14px] tracking-[0.01em] text-[#444]">{b}</span>
              </motion.li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton href="/contact">
              Word klant
              <ArrowUpRight size={14} />
            </MagneticButton>
            <Link
              to="/producten"
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#777] transition-colors hover:text-[rgba(179,18,23,0.9)]"
            >
              Bekijk assortiment
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 48, scale: 0.96 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 1.1, delay: 0.1, ease: DS_EASE_REVEAL }}
          className="lg:col-span-7"
          style={{ perspective: 1400 }}
        >
          <div
            ref={imageRef}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="group relative"
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative overflow-hidden rounded-[32px] border border-white/12 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9)]"
            >
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: glare }}
              />
              <div className="relative aspect-[4/3] overflow-hidden lg:aspect-[5/4]">
                <img
                  src={segment.image}
                  alt={segment.label}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[rgba(226,192,141,0.06)]" />
              </div>
              <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 p-7 sm:p-9">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[rgba(226,192,141,0.9)]">
                    Ayat Food
                  </p>
                  <p className="mt-2 font-display text-2xl text-white md:text-3xl">
                    Premium B2B partner
                  </p>
                </div>
                <img
                  src={segment.stickerSrc}
                  alt=""
                  aria-hidden
                  className="h-10 w-10 opacity-80"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-px rounded-[32px] opacity-50"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(226,192,141,0.4) 0%, transparent 45%, rgba(177,18,23,0.15) 100%)",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "exclude",
                  padding: "1px",
                }}
              />
            </motion.div>
            <div
              aria-hidden
              className="absolute -bottom-6 left-[10%] right-[10%] h-14 rounded-[50%] bg-black/40 blur-2xl transition-opacity duration-500 group-hover:opacity-90"
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: 0.9, ease: DS_EASE }}
        className="mt-20"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#999]">
              Meer klantgroepen
            </p>
            <h3 className="mt-3 font-display text-2xl text-[#1c1c1c]">Ontdek ook</h3>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {others.map((other, i) => (
            <motion.a
              key={other.id}
              href={other.href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: DS_EASE }}
              className="group relative overflow-hidden rounded-[24px] border border-black/[0.08] bg-[#0c0c0c] shadow-[0_24px_70px_-40px_rgba(0,0,0,0.45)] transition-all duration-700 hover:-translate-y-1.5 hover:border-[rgba(198,160,98,0.35)] hover:shadow-[0_36px_90px_-36px_rgba(0,0,0,0.55)]"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={other.image}
                  alt={other.label}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
              </div>
              <div className="p-5">
                <p className="font-display text-xl text-white transition-colors group-hover:text-[rgba(226,192,141,0.95)]">
                  {other.label}
                </p>
                <span className="group/btn relative mt-4 inline-flex items-center gap-2 overflow-hidden rounded-xl border border-[rgba(198,160,98,0.45)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[rgba(198,160,98,0.92)] transition-colors duration-700 group-hover:border-[rgba(198,160,98,0.75)] group-hover:text-[#0a0a0a]">
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[rgba(226,192,141,0.95)] transition-transform duration-700 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:translate-x-0" />
                  <span className="relative">Lees meer</span>
                  <ArrowUpRight
                    size={12}
                    className="relative transition-transform duration-500 group-hover:translate-x-0.5"
                  />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function SegmentCard({ segment, index }: { segment: VoorWieSegment; index: number }) {
  const badgeId = useId();
  const pathId = `voorwie-segment-badge-${badgeId}`;
  const indexLabel = String(index + 1).padStart(2, "0");

  return (
    <motion.article variants={gridItem} className="group relative">
      <Link
        to="/voor-wie/$segment"
        params={{ segment: segment.id }}
        className="relative block overflow-hidden rounded-[32px] border border-black/[0.08] bg-[#0a0a0a] shadow-[0_28px_80px_-44px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.04)] transition-all duration-700 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:-translate-y-2 group-hover:border-[rgba(198,160,98,0.42)] group-hover:shadow-[0_48px_120px_-48px_rgba(0,0,0,0.62),0_0_0_1px_rgba(198,160,98,0.18)]"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute left-5 top-5 z-20 h-9 w-9 border-l border-t border-[rgba(198,160,98,0.4)] opacity-50 transition-all duration-700 group-hover:left-6 group-hover:top-6 group-hover:opacity-100"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-5 right-5 z-20 h-9 w-9 border-b border-r border-[rgba(198,160,98,0.4)] opacity-50 transition-all duration-700 group-hover:bottom-6 group-hover:right-6 group-hover:opacity-100"
        />

        <span
          aria-hidden
          className="pointer-events-none absolute right-6 top-3 z-10 select-none font-display text-[4.25rem] font-semibold leading-none tracking-[-0.06em] text-white/[0.05] transition-colors duration-700 group-hover:text-[rgba(198,160,98,0.12)]"
        >
          {indexLabel}
        </span>

        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={segment.image}
            alt={segment.label}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition-transform duration-[1.35s] ease-[cubic-bezier(.22,.61,.36,1)] group-hover:scale-[1.05]"
            style={{ filter: "brightness(0.9) contrast(1.06) saturate(1.04)" }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_50%_38%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.22)_52%,rgba(0,0,0,0.82)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />

          <div className="pointer-events-none absolute right-5 top-5 grid h-[74px] w-[74px] place-items-center rounded-full border border-[rgba(198,160,98,0.28)] bg-black/40 backdrop-blur-[2px] transition-colors duration-700 group-hover:border-[rgba(198,160,98,0.5)]">
            <svg
              viewBox="0 0 112 112"
              className="absolute inset-0 h-full w-full spin-ring"
              aria-hidden="true"
            >
              <defs>
                <path id={pathId} d="M56,56 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" />
              </defs>
              <text
                fill="rgba(198,160,98,0.82)"
                fontSize="7.1"
                fontWeight="700"
                letterSpacing="0.26em"
                textAnchor="middle"
              >
                <textPath href={`#${pathId}`} startOffset="50%">
                  100% HALAL • PUUR &amp; VERS • 100% HALAL • PUUR &amp; VERS
                </textPath>
              </text>
            </svg>
            <img
              src={segment.stickerSrc}
              alt=""
              aria-hidden
              className="relative h-[26px] w-[26px] opacity-90"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="relative border-t border-white/[0.08] p-6 sm:p-7">
          <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[rgba(198,160,98,0.88)]">
            {segment.eyebrow}
          </p>
          <h3 className="mt-2 font-display text-[clamp(1.75rem,2.8vw,2.35rem)] font-medium leading-[1.02] tracking-[-0.03em] text-white">
            {segment.label}
          </h3>
          <p className="mt-3 text-sm leading-[1.75] text-white/72 transition-colors duration-700 group-hover:text-white/88">
            {segment.description}
          </p>

          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {segment.benefits.slice(0, 2).map((b) => (
              <li key={b} className="flex items-center gap-2 text-[11px] text-white/62">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[rgba(198,160,98,0.2)] bg-[rgba(198,160,98,0.1)]">
                  <Check size={10} className="text-[rgba(198,160,98,0.95)]" />
                </span>
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-7">
            <span className="group/btn relative inline-flex items-center gap-3 overflow-hidden rounded-2xl border border-[rgba(198,160,98,0.55)] bg-transparent px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[rgba(198,160,98,0.95)] transition-[color,border-color] duration-700 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:border-[rgba(198,160,98,0.9)] group-hover:text-[#0a0a0a]">
              <span className="pointer-events-none absolute inset-0 -translate-x-[110%] bg-[rgba(226,192,141,0.95)] transition-transform duration-700 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:translate-x-0" />
              <span className="relative">{VOOR_WIE_MEGA_MENU.ctaLabel}</span>
              <ArrowUpRight
                size={13}
                className="relative transition-transform duration-[600ms] ease-[cubic-bezier(.22,.61,.36,1)] group-hover:translate-x-1"
              />
            </span>
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[32px] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(135deg, rgba(198,160,98,0.08) 0%, transparent 42%, rgba(179,18,23,0.05) 100%)",
          }}
        />
      </Link>
    </motion.article>
  );
}

export function VoorWieCatalogPage({ activeSegment }: { activeSegment: VoorWieSegmentId | "all" }) {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLElement>(null);

  const segmentMeta =
    activeSegment === "all" ? null : VOOR_WIE_SEGMENTS.find((s) => s.id === activeSegment);

  const segments =
    activeSegment === "all"
      ? VOOR_WIE_SEGMENTS
      : VOOR_WIE_SEGMENTS.filter((s) => s.id === activeSegment);

  const pageTitle =
    activeSegment === "all" ? VOOR_WIE_MEGA_MENU.pageTitle : (segmentMeta?.label ?? "Voor wie");

  const pageDescription =
    activeSegment === "all" ? VOOR_WIE_MEGA_MENU.pageDescription : segmentMeta?.longDescription;

  const heroImage =
    activeSegment === "all"
      ? VOOR_WIE_MEGA_MENU.featuredImage
      : (segmentMeta?.previewImage ?? segmentMeta?.image);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(heroProgress, [0, 1], ["0%", "28%"]);
  const heroContentY = useTransform(heroProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(heroProgress, [0, 0.75], [1, 0]);

  const { scrollYProgress: gridProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(gridProgress, [0, 1], ["-8%", "8%"]);

  const titleWords = pageTitle.split(" ");

  return (
    <>
      <section ref={heroRef} className="relative min-h-[88vh] overflow-hidden bg-[#030303] grain">
        <AnimatePresence mode="wait">
          <motion.div
            key={heroImage}
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.25, ease: DS_EASE }}
            className="absolute inset-0"
            style={{ y: reduceMotion ? 0 : heroImageY }}
          >
            <motion.img
              src={heroImage}
              alt=""
              aria-hidden
              className="h-[115%] w-full object-cover"
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
              animate={reduceMotion ? undefined : { scale: [1, 1.08] }}
              transition={{ duration: 22, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
              style={{ filter: "brightness(0.4) contrast(1.1) saturate(1.05)" }}
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/55 via-[#030303]/25 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_75%_15%,rgba(226,192,141,0.14),transparent_50%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-[#030303] via-[#030303]/82 to-transparent" />

        <motion.div
          style={{ y: reduceMotion ? 0 : heroContentY, opacity: reduceMotion ? 1 : heroOpacity }}
          className="relative mx-auto flex min-h-[88vh] ipek-container flex-col justify-end px-6 pb-20 pt-40 lg:px-10 lg:pb-24 lg:pt-48"
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
            {activeSegment === "all" ? (
              <span className="text-white/80">Voor wie</span>
            ) : (
              <>
                <Link
                  to="/voor-wie"
                  className="transition-colors hover:text-[rgba(226,192,141,0.95)]"
                >
                  Voor wie
                </Link>
                <ChevronRight size={12} className="text-white/22" />
                <span className="text-white/80">{pageTitle}</span>
              </>
            )}
          </motion.nav>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 0.15, ease: DS_EASE }}
            className="mt-10 h-px w-24 origin-left bg-gradient-to-r from-[rgba(226,192,141,0.9)] to-transparent"
            aria-hidden
          />

          <div className="mt-8 max-w-4xl">
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0.34em" }}
              transition={{ duration: 1, delay: 0.2, ease: DS_EASE }}
              className="ipek-label ipek-heading-label text-[10px]"
            >
              {activeSegment === "all"
                ? VOOR_WIE_MEGA_MENU.pageEyebrow
                : (segmentMeta?.eyebrow ?? "Klantgroep")}
            </motion.p>

            <h1 className="mt-6 overflow-hidden font-display text-[clamp(2.8rem,7vw,5.2rem)] leading-[0.95] text-white">
              {titleWords.map((word, i) => (
                <span key={`${word}-${i}`} className="mr-[0.28em] inline-block overflow-hidden">
                  <motion.span
                    initial={{ y: "110%", rotateX: 40 }}
                    animate={{ y: 0, rotateX: 0 }}
                    transition={{
                      duration: 1,
                      delay: 0.28 + i * 0.09,
                      ease: DS_EASE_REVEAL,
                    }}
                    className="inline-block origin-bottom"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            {pageDescription ? (
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.55, ease: DS_EASE }}
                className="mt-8 max-w-2xl text-base leading-[1.8] text-white/72 md:text-lg"
              >
                {pageDescription}
              </motion.p>
            ) : null}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.68, ease: DS_EASE }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <a
                href="#klantgroepen"
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(226,192,141,0.35)] bg-[rgba(226,192,141,0.08)] px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[rgba(226,192,141,0.95)] transition-colors hover:bg-[rgba(226,192,141,0.14)]"
              >
                Ontdek klantgroepen
                <ArrowDown size={14} />
              </a>
              <MagneticButton href="/contact">
                Word klant
                <ArrowUpRight size={14} />
              </MagneticButton>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section
        id="klantgroepen"
        ref={gridRef}
        className="relative z-10 overflow-hidden ipek-section"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-[linear-gradient(90deg,transparent,rgba(198,160,98,0.42),transparent)]"
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ y: reduceMotion ? 0 : bgY }}
        >
          <img
            src={backgroundWhite3}
            alt=""
            className="h-full w-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
        </motion.div>

        <div className="relative ipek-container">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease: DS_EASE_REVEAL }}
          >
            <SegmentTabs active={activeSegment} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.85, delay: 0.1, ease: DS_EASE }}
            className="mt-14"
          >
            <p className="ipek-label ipek-heading-label text-[10px] tracking-[0.32em]">
              Klantgroepen
            </p>
            <h2 className="mt-4 font-display text-3xl text-[#1c1c1c] md:text-4xl">
              {activeSegment === "all"
                ? "Halal partner voor elke professional"
                : `Oplossingen voor ${segmentMeta?.label?.toLowerCase()}`}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#5a5a5a] md:text-base">
              {VOOR_WIE_MEGA_MENU.subtitle}
            </p>
          </motion.div>

          <motion.div
            key={activeSegment}
            variants={activeSegment === "all" ? gridContainer : undefined}
            initial={activeSegment === "all" ? "hidden" : false}
            whileInView={activeSegment === "all" ? "visible" : undefined}
            viewport={{ once: true, margin: "-5%" }}
            className={activeSegment === "all" ? "mt-12 grid gap-8 md:grid-cols-2" : undefined}
          >
            {activeSegment === "all" ? (
              segments.map((segment, index) => (
                <SegmentCard key={segment.id} segment={segment} index={index} />
              ))
            ) : segmentMeta ? (
              <SegmentDetailShowcase segment={segmentMeta} />
            ) : null}
          </motion.div>
        </div>
      </section>

      <AssortimentKlantCta />
    </>
  );
}
