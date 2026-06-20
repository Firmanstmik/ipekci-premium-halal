import type { Transition, Variants } from "framer-motion";

/** Reveal easing — calm cinematic ease-out for entrances (sections, cards, items) */
export const DS_EASE_REVEAL = [0.22, 0.61, 0.36, 1] as const;
export const DS_EASE_REVEAL_CSS = "cubic-bezier(0.22, 0.61, 0.36, 1)";

/** Interaction easing — snappier, for hover / UI feedback */
export const DS_EASE = [0.16, 1, 0.3, 1] as const;

/** CSS cubic-bezier string for transitions */
export const DS_EASE_CSS = "cubic-bezier(0.16, 1, 0.3, 1)";

export const DS_DURATION = {
  instant: 0.15,
  ui: 0.4, // fast interactions (0.3–0.4s)
  reveal: 0.7, // card / item reveals (medium)
  section: 0.9, // major section reveals (medium)
  slow: 0.9,
  cinematic: 1.2, // hero cinematic moments (1.1–1.4s)
} as const;

export const DS_STAGGER = 0.1; // 100ms — card / item stagger
export const DS_REVEAL_Y = 16; // card / item translateY
export const DS_REVEAL_Y_SECTION = 24; // major-section translateY

export const DS_VIEWPORT = { once: true, margin: "-10% 0px" } as const;
export const DS_VIEWPORT_TIGHT = { once: true, margin: "-8% 0px" } as const;

export function dsTransition(
  duration: number = DS_DURATION.reveal,
  delay = 0,
): Transition {
  return { duration, delay, ease: DS_EASE_REVEAL };
}

/** Card / item reveal transition — translateY(16), 0.7s */
export function dsRevealTransition(delay = 0): Transition {
  return dsTransition(DS_DURATION.reveal, delay);
}

/** Major-section reveal transition — translateY(24), 0.9s */
export function dsSectionTransition(delay = 0): Transition {
  return dsTransition(DS_DURATION.section, delay);
}

export const dsContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: DS_STAGGER, delayChildren: 0.06 },
  },
};

export const dsItemVariants: Variants = {
  hidden: { opacity: 0, y: DS_REVEAL_Y },
  visible: {
    opacity: 1,
    y: 0,
    transition: dsRevealTransition(),
  },
};

export const dsSectionVariants: Variants = {
  hidden: { opacity: 0, y: DS_REVEAL_Y_SECTION },
  visible: {
    opacity: 1,
    y: 0,
    transition: dsSectionTransition(),
  },
};

/** @deprecated Use dsContainerVariants */
export const storyContainerReveal = dsContainerVariants;

/** @deprecated Use dsItemVariants */
export const storyItemReveal = dsItemVariants;
