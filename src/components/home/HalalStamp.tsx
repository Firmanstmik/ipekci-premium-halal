import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useMemo, useState } from "react";
import { DS_EASE } from "@/lib/design-system";

import stickerAyam from "@/assets/stiker-ayam.svg";
import stickerKambing from "@/assets/stiker-kambing.svg";
import stickerSapi from "@/assets/stiker-sapi.svg";

const STICKER_FILTER =
  "sepia(1) saturate(520%) hue-rotate(352deg) brightness(0.66) contrast(1.12) drop-shadow(0 8px 18px rgba(218,41,42,0.28))";

const STICKER_KEYS = ["lamsvlees", "rundvlees", "kip"] as const;

const STICKER_SRC: Record<(typeof STICKER_KEYS)[number], string> = {
  lamsvlees: stickerKambing,
  rundvlees: stickerSapi,
  kip: stickerAyam,
};

export function HalalStamp({
  className = "",
  activeKey,
  compact = false,
}: {
  className?: string;
  activeKey?: string;
  compact?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const pathId = useId().replace(/:/g, "");
  const icons = useMemo(() => STICKER_KEYS.map((key) => ({ key, src: STICKER_SRC[key] })), []);

  const [shownIdx, setShownIdx] = useState(0);
  const [incomingIdx, setIncomingIdx] = useState<number | null>(null);
  const [loaded, setLoaded] = useState<Record<string, true>>({});
  const [failed, setFailed] = useState<Record<string, true>>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    icons.forEach((icon) => {
      const img = new Image();
      img.onload = () => setLoaded((prev) => ({ ...prev, [icon.key]: true }));
      img.onerror = () => setFailed((prev) => ({ ...prev, [icon.key]: true }));
      img.src = icon.src;
    });
  }, [icons]);

  useEffect(() => {
    if (!activeKey) return;
    const idx = icons.findIndex((i) => i.key === activeKey);
    if (idx >= 0) {
      setShownIdx(idx);
      setIncomingIdx(null);
    }
  }, [activeKey, icons]);

  useEffect(() => {
    if (reduceMotion || activeKey) return;
    if (incomingIdx !== null) return;

    const current = icons[shownIdx] ?? icons[0];
    const ok = icons.filter((i) => !failed[i.key] && loaded[i.key]);
    if (!current || ok.length < 2) return;

    const t = window.setTimeout(() => {
      let nextIdx = (shownIdx + 1) % icons.length;
      for (let i = 0; i < icons.length; i += 1) {
        const candidate = icons[nextIdx];
        if (candidate && !failed[candidate.key] && loaded[candidate.key]) break;
        nextIdx = (nextIdx + 1) % icons.length;
      }
      if (nextIdx !== shownIdx) setIncomingIdx(nextIdx);
    }, 1200);
    return () => window.clearTimeout(t);
  }, [activeKey, failed, incomingIdx, loaded, reduceMotion, shownIdx, icons]);

  const shown = icons[shownIdx] ?? icons[0];
  const incoming = incomingIdx !== null ? (icons[incomingIdx] ?? null) : null;
  const size = compact
    ? "h-[5.25rem] w-[5.25rem] sm:h-[5.75rem] sm:w-[5.75rem]"
    : "h-36 w-36 sm:h-40 sm:w-40";
  const iconSize = compact
    ? "h-[2.1rem] w-[2.1rem] sm:h-[2.35rem] sm:w-[2.35rem]"
    : "h-[64px] w-[64px] sm:h-[72px] sm:w-[72px]";

  return (
    <div
      className={`relative grid place-items-center rounded-full bg-transparent ${size} ${className}`}
    >
      <svg viewBox="0 0 112 112" className="absolute inset-0 h-full w-full spin-ring" aria-hidden>
        <defs>
          <path id={pathId} d="M56,56 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" />
        </defs>
        <text
          fill="rgba(245,241,235,0.72)"
          fontSize={compact ? "6.4" : "7.2"}
          fontWeight="700"
          letterSpacing="0.24em"
          textAnchor="middle"
        >
          <textPath href={`#${pathId}`} startOffset="50%">
            PREMIUM HALAL · 100% HALAL · AYAT FOOD · NVWA ·
          </textPath>
        </text>
      </svg>

      <div aria-hidden className={`relative ${iconSize}`}>
        <motion.img
          key={`shown-${shown?.key}`}
          src={shown?.src}
          alt=""
          className="absolute inset-0 h-full w-full opacity-90"
          loading="eager"
          decoding="async"
          referrerPolicy="no-referrer"
          style={{ filter: STICKER_FILTER }}
          initial={false}
          animate={incoming ? { x: -8, opacity: 0 } : { x: 0, opacity: 0.9 }}
          transition={{ duration: 0.55, ease: DS_EASE }}
        />

        <AnimatePresence>
          {incoming ? (
            <motion.img
              key={`incoming-${incoming.key}`}
              src={incoming.src}
              alt=""
              className="absolute inset-0 h-full w-full opacity-90"
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
              style={{ filter: STICKER_FILTER }}
              initial={{ x: 8, opacity: 0 }}
              animate={{ x: 0, opacity: 0.9 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: DS_EASE }}
              onError={() => {
                setFailed((prev) => ({ ...prev, [incoming.key]: true }));
                setIncomingIdx(null);
              }}
              onAnimationComplete={() => {
                if (incomingIdx !== null) setShownIdx(incomingIdx);
                setIncomingIdx(null);
              }}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
