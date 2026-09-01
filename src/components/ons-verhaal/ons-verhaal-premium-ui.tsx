import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { AyatSectionBadge } from "@/components/home/AyatSectionBadge";
import { ImageFrameOverlay } from "@/components/ui/premium-frame";
import { DS_EASE, DS_EASE_REVEAL } from "@/lib/design-system";

export const LUXURY_SHELL =
  "rounded-[1.65rem_0.95rem_1.85rem_1.05rem] sm:rounded-[1.85rem_1rem_2rem_1.15rem]";
export const GLASS_PANEL =
  "border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.88)_0%,rgba(250,248,245,0.62)_100%)] shadow-[0_32px_90px_-44px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-xl";
export const GLASS_DARK =
  "border border-white/[0.1] bg-[linear-gradient(165deg,rgba(255,255,255,0.09)_0%,rgba(8,8,8,0.72)_48%,rgba(20,6,6,0.82)_100%)] shadow-[0_40px_100px_-48px_rgba(0,0,0,0.55)] backdrop-blur-xl";
export const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

export function SectionWatermark({ index }: { index: string }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute -right-2 top-2 select-none font-display text-[clamp(5rem,14vw,9rem)] font-semibold leading-none tracking-[-0.06em] text-[#141414]/[0.035] sm:right-4 sm:top-0"
    >
      {index}
    </span>
  );
}

export function SectionWatermarkDark({ index }: { index: string }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute -right-2 top-2 select-none font-display text-[clamp(5rem,14vw,9rem)] font-semibold leading-none tracking-[-0.06em] text-white/[0.04] sm:right-4 sm:top-0"
    >
      {index}
    </span>
  );
}

export function PremiumSectionBackdrop({
  src,
  y,
  tone = "light",
}: {
  src: string;
  y?: MotionValue<string>;
  tone?: "light" | "dark";
}) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={y !== undefined ? { y } : undefined}
    >
      <img
        src={src}
        alt=""
        className={`h-full w-full object-cover ${tone === "light" ? "opacity-[0.2]" : "opacity-[0.32]"}`}
        loading="lazy"
        decoding="async"
      />
      {tone === "light" ? (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,248,245,0.95)_0%,rgba(250,248,245,0.9)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_12%_0%,rgba(226,192,141,0.14),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_40%_at_92%_100%,rgba(179,18,23,0.06),transparent_50%)]" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-black/[0.78]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_78%_60%_at_18%_0%,rgba(179,18,23,0.18),transparent_58%)]" />
        </>
      )}
    </motion.div>
  );
}

export function PremiumSectionShell({
  index,
  tone = "light",
  backgroundSrc,
  parallax = false,
  className = "",
  children,
}: {
  index: string;
  tone?: "light" | "dark";
  backgroundSrc?: string;
  parallax?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const softX = useSpring(pointerX, { stiffness: 38, damping: 24, mass: 0.5 });
  const softY = useSpring(pointerY, { stiffness: 38, damping: 24, mass: 0.5 });
  const lightX = useTransform(softX, [-0.5, 0.5], ["-2%", "2%"]);
  const lightY = useTransform(softY, [-0.5, 0.5], ["-1.5%", "1.5%"]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["0%", "0%"] : ["-4%", "4%"],
  );

  const handlePointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    if (reduceMotion || !sectionRef.current || !parallax) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = sectionRef.current.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative isolate overflow-hidden ipek-section grain ${tone === "dark" ? "bg-[#070707] text-[#F8F4EE]" : ""} ${className}`}
    >
      {backgroundSrc ? (
        <PremiumSectionBackdrop src={backgroundSrc} y={parallax ? bgY : undefined} tone={tone} />
      ) : null}

      {parallax && !reduceMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ x: lightX, y: lightY }}
        >
          <div className="absolute -left-16 top-10 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(226,192,141,0.12),transparent_68%)] blur-3xl" />
          <div className="absolute -right-10 bottom-8 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(179,18,23,0.1),transparent_70%)] blur-3xl" />
        </motion.div>
      )}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(198,160,98,0.42),transparent)]"
      />

      <div className="relative ipek-container">
        {tone === "dark" ? <SectionWatermarkDark index={index} /> : <SectionWatermark index={index} />}
        {children}
      </div>
    </section>
  );
}

export function EditorialHeader({
  kicker,
  badgeTitle,
  title,
  tone = "light",
  delay = 0,
}: {
  kicker: string;
  badgeTitle: string;
  title: string;
  tone?: "light" | "dark";
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.95, delay, ease: LUXURY_EASE }}
      className="max-w-3xl"
    >
      <AyatSectionBadge kicker={kicker} title={badgeTitle} tone={tone === "dark" ? "dark" : "light"} />
      <h2 className={`mt-5 ipek-h2 ${tone === "dark" ? "text-[#F8F4EE]" : "text-[#141414]"}`}>{title}</h2>
      <motion.div
        aria-hidden
        className="mt-5 h-px w-28 origin-left bg-[linear-gradient(90deg,rgba(200,164,107,0.95),rgba(179,18,23,0.35),transparent)]"
        initial={reduceMotion ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-8%" }}
        transition={{ duration: 1.1, delay: delay + 0.12, ease: DS_EASE }}
      />
    </motion.div>
  );
}

export function CinematicImage({
  src,
  alt,
  className = "",
  aspect = "aspect-[4/5]",
  frame = "halo" as const,
  label,
}: {
  src: string;
  alt: string;
  className?: string;
  aspect?: string;
  frame?: "halo" | "aurora" | "prism" | "orbit";
  label?: string;
}) {
  return (
    <div className={`group/if relative ${className}`}>
      <div
        className={`relative overflow-hidden ${LUXURY_SHELL} border border-[rgba(198,160,98,0.3)] bg-[#080808] shadow-[0_36px_100px_-44px_rgba(0,0,0,0.22)] transition-all duration-700 hover:border-[rgba(198,160,98,0.5)] hover:shadow-[0_48px_120px_-40px_rgba(0,0,0,0.28)]`}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -left-5 top-10 z-20 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(179,18,23,0.16),transparent_70%)] blur-2xl"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-4 bottom-12 z-20 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(226,192,141,0.24),transparent_72%)] blur-2xl"
        />
        <div className={`relative overflow-hidden ${aspect}`}>
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition-transform duration-[1.45s] ease-[cubic-bezier(.22,.61,.36,1)] group-hover/if:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/55 via-transparent to-transparent" />
          <ImageFrameOverlay variant={frame} className={LUXURY_SHELL} />
          {label ? (
            <div className="absolute inset-x-4 bottom-4 z-20 sm:inset-x-5 sm:bottom-5">
              <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/12 bg-black/45 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/85 backdrop-blur-md">
                {label}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function HalalCollage({
  primarySrc,
  secondarySrc,
  primaryAlt,
  secondaryAlt,
}: {
  primarySrc: string;
  secondarySrc: string;
  primaryAlt: string;
  secondaryAlt: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <div className="relative min-h-[420px] sm:min-h-[480px]">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 36, rotate: -1.5 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, margin: "-8%" }}
        transition={{ duration: 1.05, ease: DS_EASE_REVEAL }}
        className="relative z-10 w-[78%] sm:w-[72%]"
      >
        <CinematicImage src={primarySrc} alt={primaryAlt} aspect="aspect-[4/5]" frame="aurora" />
      </motion.div>
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 48, rotate: 2 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, margin: "-8%" }}
        transition={{ duration: 1.1, delay: 0.1, ease: DS_EASE_REVEAL }}
        className="absolute right-0 top-[18%] z-20 w-[58%] sm:top-[14%] sm:w-[52%]"
      >
        <CinematicImage src={secondarySrc} alt={secondaryAlt} aspect="aspect-[4/5]" frame="prism" />
      </motion.div>
    </div>
  );
}
