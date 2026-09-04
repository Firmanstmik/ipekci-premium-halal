import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { Verify } from "iconsax-react";
import { useCallback, useRef } from "react";
import { HalalStamp } from "@/components/home/HalalStamp";
import { ImageFrameOverlay } from "@/components/ui/premium-frame";
import { DS_EASE } from "@/lib/design-system";
import { HERO_SHOWCASE_AUTOPLAY_MS, HERO_SHOWCASE_SLIDES } from "@/lib/home-hero-content";

/** Soft asymmetric shell — not a plain rectangle */
const SHELL = "rounded-[2.4rem_1.15rem_2.65rem_1.45rem] sm:rounded-[2.75rem_1.35rem_3rem_1.65rem]";

export function HeroShowcaseCard({
  active,
  paused,
  onSelect,
  reduceMotion,
}: {
  active: number;
  paused: boolean;
  onSelect: (i: number) => void;
  reduceMotion: boolean | null;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const glareX = useTransform(px, [0, 1], ["8%", "92%"]);
  const glareY = useTransform(py, [0, 1], ["8%", "92%"]);
  const glare = useMotionTemplate`radial-gradient(360px 280px at ${glareX} ${glareY}, rgba(226,192,141,0.14), transparent 65%)`;
  const tiltX = useTransform(py, [0, 1], [3.2, -3.2]);
  const tiltY = useTransform(px, [0, 1], [-4.5, 4.5]);

  const slide = HERO_SHOWCASE_SLIDES[active];

  const handleMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reduceMotion) return;
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      px.set((e.clientX - rect.left) / rect.width);
      py.set((e.clientY - rect.top) / rect.height);
    },
    [px, py, reduceMotion],
  );

  const reset = useCallback(() => {
    px.set(0.5);
    py.set(0.5);
  }, [px, py]);

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 36,
              rotate: 2.5,
              scale: 0.94,
              filter: "blur(10px)",
            }
      }
      animate={{
        opacity: 1,
        y: 0,
        rotate: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      transition={{ delay: 0.42, duration: 1.15, ease: DS_EASE }}
      className="relative mx-auto w-full max-w-[440px] lg:max-w-[500px] xl:max-w-[520px]"
      style={{ perspective: 1200 }}
    >
      {/* Floating orbit ring */}
      <motion.div
        aria-hidden
        className={`pointer-events-none absolute -inset-5 border border-[rgba(226,192,141,0.18)] ${SHELL}`}
        initial={reduceMotion ? false : { opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 1.1, ease: DS_EASE }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-8 rounded-[3rem] border border-dashed border-white/[0.07]"
        initial={reduceMotion ? false : { opacity: 0, rotate: -4 }}
        animate={reduceMotion ? { opacity: 0.7 } : { opacity: 0.7, rotate: 0 }}
        transition={{ delay: 0.85, duration: 1.2, ease: DS_EASE }}
      />

      {/* Soft glow blobs */}
      <div
        className="pointer-events-none absolute -left-6 top-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(218,41,42,0.22),transparent_70%)] blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-4 bottom-8 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(226,192,141,0.16),transparent_72%)] blur-2xl"
        aria-hidden
      />

      <motion.div
        ref={cardRef}
        onPointerMove={handleMove}
        onPointerLeave={reset}
        style={
          reduceMotion
            ? undefined
            : { rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }
        }
        className={`group relative overflow-visible border border-white/[0.12] bg-[linear-gradient(158deg,rgba(18,14,14,0.88)_0%,rgba(6,6,6,0.72)_55%,rgba(12,8,8,0.78)_100%)] shadow-[0_40px_100px_-48px_rgba(0,0,0,0.95)] backdrop-blur-2xl transition-shadow duration-500 hover:shadow-[0_42px_110px_-40px_rgba(226,192,141,0.16)] ${SHELL}`}
      >
        <span
          className="pointer-events-none absolute inset-x-[12%] top-0 h-px bg-gradient-to-r from-transparent via-[rgba(226,192,141,0.8)] to-transparent"
          aria-hidden
        />
        <span
          className="pointer-events-none absolute inset-y-[18%] left-0 w-px bg-gradient-to-b from-transparent via-[rgba(218,41,42,0.45)] to-transparent"
          aria-hidden
        />

        {!reduceMotion ? (
          <motion.div
            className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 ${SHELL}`}
            style={{ background: glare }}
            aria-hidden
          />
        ) : null}

        <div className="relative px-4 pb-3.5 pt-4 sm:px-5 sm:pt-5">
          <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--primary)] sm:text-[10.5px]">
            <Verify size={13} variant="Bold" color="currentColor" />
            Producten Ayat Food
          </p>
          <p className="mt-1.5 font-display text-[1.1rem] font-medium leading-[1.2] tracking-[-0.02em] text-white/95 sm:text-[1.18rem]">
            Hoogwaardige Halal vleesproducten
          </p>
        </div>

        <div className="relative mx-3.5 mb-3 sm:mx-4 sm:mb-3.5">
          <div className="relative overflow-visible rounded-[1.35rem_0.85rem_1.55rem_1rem] border border-white/[0.09] bg-black/40 p-1">
            <div className="group/if relative h-[188px] rounded-[1.15rem_0.7rem_1.35rem_0.85rem] sm:h-[204px]">
              <div className="absolute inset-0 overflow-hidden rounded-[1.15rem_0.7rem_1.35rem_0.85rem]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={slide.image}
                    src={slide.image}
                    alt={slide.title}
                    loading="eager"
                    decoding="async"
                    initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      opacity: { duration: 0.55, ease: DS_EASE },
                      scale: { duration: 8, ease: "easeOut" },
                    }}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: slide.objectPosition ?? "50% 35%" }}
                  />
                </AnimatePresence>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/12 to-black/15" />
                <ImageFrameOverlay
                  variant="halo"
                  className="rounded-[1.15rem_0.7rem_1.35rem_0.85rem]"
                />

                <div className="absolute inset-x-3 bottom-3 z-10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={slide.id}
                      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.35, ease: DS_EASE }}
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[rgba(226,192,141,0.92)]">
                        {slide.label}
                      </p>
                      <p className="mt-0.5 font-display text-[16px] font-medium leading-tight text-white sm:text-[17px]">
                        {slide.title}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="pointer-events-none absolute right-0.5 top-0.5 z-20 sm:right-1 sm:top-1">
                <HalalStamp compact />
              </div>
            </div>
          </div>

          <div className="mt-2.5 grid grid-cols-5 gap-1.5">
            {HERO_SHOWCASE_SLIDES.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(i)}
                onMouseEnter={() => onSelect(i)}
                aria-label={`Bekijk ${item.label}`}
                aria-pressed={i === active}
                className={`group/thumb relative overflow-hidden rounded-[0.85rem_0.45rem_0.95rem_0.55rem] border transition-all duration-400 ${
                  i === active
                    ? "border-[rgba(226,192,141,0.55)] shadow-[0_0_0_1px_rgba(226,192,141,0.2)]"
                    : "border-white/8 opacity-55 hover:border-white/22 hover:opacity-90"
                }`}
              >
                <div className="aspect-[5/4]">
                  <img
                    src={item.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover/thumb:scale-105"
                    style={{ objectPosition: item.objectPosition ?? "center" }}
                  />
                </div>
                <span
                  className={`absolute inset-x-0 bottom-0 py-0.5 text-center font-display text-[7px] tabular-nums tracking-[0.08em] ${
                    i === active ? "bg-[var(--primary)]/90 text-white" : "bg-black/65 text-white/65"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-white/[0.07] px-4 py-2.5 sm:px-5">
          <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-white/38">
            100% Halal · NVWA
          </span>
          <div className="flex items-center gap-2.5">
            <span className="font-display text-[10px] tabular-nums tracking-[0.14em] text-[var(--gold-champagne)]/88">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(HERO_SHOWCASE_SLIDES.length).padStart(2, "0")}
            </span>
            {!reduceMotion && !paused ? (
              <motion.span
                key={`showcase-progress-${active}`}
                className="h-[2px] w-14 overflow-hidden rounded-full bg-white/10"
                aria-hidden
              >
                <motion.span
                  className="block h-full origin-left bg-gradient-to-r from-[var(--gold-champagne)] to-[var(--primary)]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: HERO_SHOWCASE_AUTOPLAY_MS / 1000,
                    ease: "linear",
                  }}
                />
              </motion.span>
            ) : null}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
