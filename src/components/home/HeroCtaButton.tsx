import { Link } from "@tanstack/react-router";
import { ArrowRight } from "iconsax-react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type { ReactNode } from "react";

const MEAT_STICKER_FILTER =
  "sepia(1) saturate(480%) hue-rotate(352deg) brightness(0.72) contrast(1.1) drop-shadow(0 6px 14px rgba(194,139,82,0.28))";

type HeroCtaButtonProps = {
  to: string;
  variant: "primary" | "ghost";
  children: ReactNode;
};

export function HeroCtaButton({ to, variant, children }: HeroCtaButtonProps) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const spotlight = useMotionTemplate`radial-gradient(120px 80px at ${mx}% ${my}%, rgba(255,255,255,0.22), transparent 70%)`;

  const isPrimary = variant === "primary";

  return (
    <motion.div
      className="relative"
      whileHover={{ y: -2 }}
      whileTap={{ y: 0, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 420, damping: 26 }}
    >
      <Link
        to={to}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          mx.set(((e.clientX - rect.left) / rect.width) * 100);
          my.set(((e.clientY - rect.top) / rect.height) * 100);
        }}
        onMouseLeave={() => {
          mx.set(50);
          my.set(50);
        }}
        className={`hero-cta group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-[10px] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] ${
          isPrimary ? "hero-cta--primary text-[var(--primary-foreground)]" : "hero-cta--ghost text-foreground/92"
        }`}
      >
        <span className="hero-cta-wipe" aria-hidden />

        {isPrimary ? (
          <>
            <span className="hero-cta-border-glow" aria-hidden />
            <motion.span
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: spotlight }}
              aria-hidden
            />
            <span className="hero-cta-shine" aria-hidden />
          </>
        ) : (
          <>
            <span className="hero-cta-ghost-ring" aria-hidden />
            <motion.span
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: spotlight }}
              aria-hidden
            />
          </>
        )}

        <span className="relative z-10 flex items-center gap-2">{children}</span>

        <ArrowRight
          size={16}
          variant="Linear"
          color="currentColor"
          className={`relative z-10 transition-transform duration-500 group-hover:translate-x-1.5 ${
            isPrimary ? "group-hover:text-[#da292a]" : "text-foreground/50 group-hover:text-[#da292a]"
          }`}
        />
      </Link>
    </motion.div>
  );
}

export { MEAT_STICKER_FILTER };
