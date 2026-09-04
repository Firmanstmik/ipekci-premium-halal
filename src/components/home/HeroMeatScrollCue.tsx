import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "iconsax-react";
import { useEffect, useState } from "react";
import { DS_EASE } from "@/lib/design-system";

const MEAT_CUES = [
  { id: "lam", label: "L" },
  { id: "rund", label: "R" },
  { id: "kip", label: "K" },
] as const;

export function HeroMeatScrollCue() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const t = window.setInterval(() => {
      setActive((i) => (i + 1) % MEAT_CUES.length);
    }, 2400);
    return () => window.clearInterval(t);
  }, [reduceMotion]);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.95, duration: 0.7, ease: DS_EASE }}
      className="hero-story-cue shrink-0"
      aria-hidden
    >
      <span className="hero-story-cue-label text-[8px] tracking-[0.28em]">Ontdek meer</span>

      <div className="flex items-center justify-center gap-3">
        {MEAT_CUES.map((cue, i) => {
          const isActive = i === active;
          return (
            <motion.span
              key={cue.id}
              animate={{
                scale: isActive ? 1 : 0.85,
                opacity: isActive ? 1 : 0.35,
              }}
              transition={{ duration: 0.45, ease: DS_EASE }}
              className={`grid h-4 w-4 place-items-center rounded-full border text-[8px] font-bold sm:h-[18px] sm:w-[18px] sm:text-[9px] ${
                isActive
                  ? "border-[rgba(218,41,42,0.55)] bg-[rgba(218,41,42,0.15)] text-[#DA292A]"
                  : "border-white/20 bg-white/5 text-white/45"
              }`}
            >
              {cue.label}
            </motion.span>
          );
        })}
      </div>

      <div className="mt-0.5 flex flex-col items-center">
        <span className="hero-story-cue-line !h-[1rem]" />
        <motion.span
          animate={reduceMotion ? {} : { y: [0, 3, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="text-[var(--gold-champagne)]/50"
        >
          <ArrowDown size={12} variant="Linear" color="currentColor" />
        </motion.span>
      </div>
    </motion.div>
  );
}
