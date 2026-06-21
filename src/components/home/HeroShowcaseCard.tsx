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
import {
  HERO_SHOWCASE_AUTOPLAY_MS,
  HERO_SHOWCASE_SLIDES,
} from "@/lib/home-hero-content";

const SLIDE_STICKER_KEY: Record<string, string> = {
  lam: "lamsvlees",
  rund: "rundvlees",
  kip: "kip",
  slachterij: "lamsvlees",
  producten: "rundvlees",
};

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
      initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.48, duration: 1, ease: DS_EASE }}
      className="relative mx-auto w-full max-w-[460px] lg:max-w-[520px] xl:max-w-[540px]"
    >
      <div
        className="pointer-events-none absolute -inset-4 rounded-[28px] bg-[radial-gradient(circle,rgba(179,18,23,0.1),transparent_72%)]"
        aria-hidden
      />

      <motion.div
        ref={cardRef}
        onPointerMove={handleMove}
        onPointerLeave={reset}
        className="group relative overflow-visible rounded-[26px] border border-white/[0.1] bg-[linear-gradient(165deg,rgba(14,14,14,0.82)_0%,rgba(6,6,6,0.72)_100%)] shadow-[0_32px_90px_-40px_rgba(0,0,0,0.92)] backdrop-blur-2xl transition-shadow duration-500 hover:shadow-[0_36px_96px_-36px_rgba(226,192,141,0.14)]"
      >
        <span
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(226,192,141,0.75)] to-transparent"
          aria-hidden
        />

        {!reduceMotion ? (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[26px] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            style={{ background: glare }}
            aria-hidden
          />
        ) : null}

        <div className="relative px-4 pb-3.5 pt-4 sm:px-5 sm:pt-5">
          <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--primary)] sm:text-[10.5px]">
            <Verify size={13} variant="Bold" color="currentColor" />
            Assortiment Ipekçi
          </p>
          <p className="mt-1.5 font-display text-[1.1rem] font-medium leading-[1.2] tracking-[-0.02em] text-white/95 sm:text-[1.18rem]">
            Premium halalvlees van Nederlandse bodem
          </p>
        </div>

        <div className="relative mx-3.5 mb-3 sm:mx-4 sm:mb-3.5">
          <div className="relative overflow-visible rounded-[16px] border border-white/[0.09] bg-black/40 p-1">
            <div className="group/if relative h-[188px] rounded-[12px] sm:h-[204px]">
              <div className="absolute inset-0 overflow-hidden rounded-[12px]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={slide.image}
                    src={slide.image}
                    alt={slide.title}
                    loading="eager"
                    decoding="async"
                    initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
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
                <ImageFrameOverlay variant="halo" className="rounded-[12px]" />

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
                <HalalStamp
                  compact
                  activeKey={SLIDE_STICKER_KEY[slide.id] ?? "lamsvlees"}
                />
              </div>
            </div>
          </div>

          <div className="mt-2.5 grid grid-cols-5 gap-1">
            {HERO_SHOWCASE_SLIDES.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(i)}
                onMouseEnter={() => onSelect(i)}
                aria-label={`Bekijk ${item.label}`}
                aria-pressed={i === active}
                className={`group/thumb relative overflow-hidden rounded-[10px] border transition-all duration-400 ${
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
                    i === active
                      ? "bg-[var(--primary)]/90 text-white"
                      : "bg-black/65 text-white/65"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-white/[0.07] px-4 py-2 sm:px-5">
          <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-white/38">
            Vers uit onze slachterij
          </span>
          <div className="flex items-center gap-2.5">
            <span className="font-display text-[10px] tabular-nums tracking-[0.14em] text-[var(--gold-champagne)]/88">
              {String(active + 1).padStart(2, "0")} / {String(HERO_SHOWCASE_SLIDES.length).padStart(2, "0")}
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
                  transition={{ duration: HERO_SHOWCASE_AUTOPLAY_MS / 1000, ease: "linear" }}
                />
              </motion.span>
            ) : null}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
