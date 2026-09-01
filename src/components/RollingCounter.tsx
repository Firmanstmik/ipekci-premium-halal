import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface Props {
  value: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}

const COUNT_EASE = [0.33, 1, 0.68, 1] as const;

/** Renders the final value immediately; subtle reveal on scroll — never flashes 0. */
export function RollingCounter({
  value,
  suffix = "",
  decimals = 0,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  const formatted = value.toLocaleString("nl-NL", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <motion.span
      ref={ref}
      className="tabular-nums"
      initial={false}
      animate={inView && !reduceMotion ? { opacity: [0.88, 1], y: [3, 0] } : undefined}
      transition={{ duration: 0.55, ease: COUNT_EASE }}
    >
      {formatted}
      {suffix}
    </motion.span>
  );
}
