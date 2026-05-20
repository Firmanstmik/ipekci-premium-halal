import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "ghost";
}

export function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  variant = "primary",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = e.clientX - rect.left - rect.width / 2;
    const my = e.clientY - rect.top - rect.height / 2;
    x.set(mx * 0.25);
    y.set(my * 0.25);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const baseCls =
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:shadow-[0_0_40px_-8px_color-mix(in_oklab,var(--primary)_70%,transparent)]"
      : "border border-white/15 bg-white/[0.03] text-foreground hover:bg-white/[0.07]";

  const inner = (
    <motion.span style={{ x: sx, y: sy }} className="inline-flex items-center gap-2.5">
      {children}
    </motion.span>
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`inline-block ${className}`}
    >
      {href ? (
        <a
          href={href}
          className={`group inline-flex items-center justify-center rounded-[18px] px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] transition-all duration-300 ${baseCls}`}
        >
          {inner}
        </a>
      ) : (
        <button
          onClick={onClick}
          className={`group inline-flex items-center justify-center rounded-[18px] px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] transition-all duration-300 ${baseCls}`}
        >
          {inner}
        </button>
      )}
    </motion.div>
  );
}
