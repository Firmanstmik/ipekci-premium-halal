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

  const variantCls = variant === "primary" ? "ipek-btn-primary" : "ipek-btn-ghost";

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
      className={`min-w-0 w-full sm:inline-block sm:w-auto ${className}`}
    >
      {href ? (
        <a href={href} className={`ipek-btn group w-full sm:w-auto ${variantCls}`}>
          {inner}
        </a>
      ) : (
        <button type="button" onClick={onClick} className={`ipek-btn group ${variantCls}`}>
          {inner}
        </button>
      )}
    </motion.div>
  );
}
