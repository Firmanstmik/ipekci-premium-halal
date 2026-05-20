import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Props {
  value: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}

export function RollingCounter({ value, suffix = "", decimals = 0, duration = 2.4 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(spring, (latest) =>
    latest.toLocaleString("nl-NL", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }),
  );
  const [text, setText] = useState("0");

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, value, mv]);

  useEffect(() => display.on("change", (v) => setText(v)), [display]);

  return (
    <span ref={ref} className="tabular-nums">
      {text}
      {suffix}
    </span>
  );
}
