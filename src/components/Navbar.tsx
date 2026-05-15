import { Link, useLocation } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Navbar as NavbarRoot,
  NavBody,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";

/* ── route-aware nav items ─────────────────────────────────────── */
const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Diensten" },
  { to: "/about", label: "Over ons" },
  { to: "/contact", label: "Contact" },
] as const;

/* ─────────────────────────────────────────────────────────────────
   PremiumCTA  — magnetic shimmer button
   ─────────────────────────────────────────────────────────────── */
function PremiumCTA({
  onClick,
  className = "",
}: {
  onClick?: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  /* magnetic tracking */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 400, damping: 28 });
  const y = useSpring(rawY, { stiffness: 400, damping: 28 });

  /* shimmer position */
  const shimmerX = useMotionValue(-100);
  const shimmerOpacity = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = e.clientX - rect.left - rect.width / 2;
    const cy = e.clientY - rect.top - rect.height / 2;
    rawX.set(cx * 0.18);
    rawY.set(cy * 0.18);
    shimmerX.set(((e.clientX - rect.left) / rect.width) * 100 - 50);
  }

  function handleMouseEnter() {
    shimmerOpacity.set(1);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
    shimmerOpacity.set(0);
  }

  /* glow color based on motion */
  const glowOpacity = useTransform(
    [x, y],
    ([lx, ly]) => Math.min(Math.sqrt((lx as number) ** 2 + (ly as number) ** 2) / 12, 1) * 0.7 + 0.3,
  );

  return (
    <motion.a
      ref={ref as React.RefObject<HTMLAnchorElement>}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      href="/contact"
      className={`group relative inline-flex cursor-pointer select-none items-center gap-2 overflow-hidden rounded-sm bg-primary px-4 py-1.5 sm:px-5 sm:py-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-foreground no-underline font-[Manrope] ${className}`}
      whileTap={{ scale: 0.96 }}
    >
      {/* ── ambient glow layer ── */}
      <motion.span
        style={{ opacity: glowOpacity }}
        className="pointer-events-none absolute -inset-1 rounded-sm bg-primary blur-xl"
        aria-hidden
      />

      {/* ── border shimmer trace ── */}
      <motion.span
        style={{ opacity: shimmerOpacity }}
        className="pointer-events-none absolute inset-0 rounded-sm"
        aria-hidden
      >
        <span
          className="absolute inset-0 rounded-sm"
          style={{
            background:
              "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.18) 50%, transparent 80%)",
            backgroundSize: "200% 100%",
            animation: "none",
          }}
        />
      </motion.span>

      {/* ── diagonal shimmer sweep ── */}
      <motion.span
        className="pointer-events-none absolute inset-0 -skew-x-[20deg] translate-x-[-120%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-none"
        style={{ opacity: shimmerOpacity }}
        variants={{}}
        whileHover={{ translateX: "220%" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      />

      {/* ── top edge highlight ── */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" aria-hidden />

      {/* ── content ── */}
      <span className="relative z-10">Offerte Aanvragen</span>
      <motion.span
        className="relative z-10"
        whileHover={{ x: 2, y: -2 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <ArrowUpRight size={13} strokeWidth={2.5} />
      </motion.span>
    </motion.a>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Navbar
   ─────────────────────────────────────────────────────────────── */
export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <NavbarRoot>
      {/* ── Desktop ────────────────────────────────── */}
      <NavBody>
        {/* Logo */}
        <NavbarLogo />

        {/* Center links */}
        <div className="absolute inset-0 hidden flex-1 items-center justify-center gap-0.5 lg:flex">
          {links.map((l) => {
            const isActive =
              l.to === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(l.to);

            return (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className={`group relative px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-200 ${
                  isActive
                    ? "text-foreground"
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                {/* hover bg pill */}
                <span className="absolute inset-0 scale-95 rounded-full bg-white/[0.07] opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100" />

                {/* orange underline (inactive hover) */}
                {!isActive && (
                  <span className="absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-primary transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" />
                )}

                {/* active orange dot */}
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-0.5 mx-auto h-0.5 w-4 rounded-full bg-primary" />
                )}

                <span className="relative z-10">{l.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Right CTA */}
        <PremiumCTA />
      </NavBody>

      {/* ── Mobile ─────────────────────────────────── */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((v) => !v)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {/* Mobile nav links */}
          <nav className="flex w-full flex-col">
            {links.map((l, i) => {
              const isActive =
                l.to === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(l.to);

              return (
                <Link
                  key={l.to}
                  to={l.to}
                  activeOptions={{ exact: l.to === "/" }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between border-b border-white/[0.05] px-1 py-4 text-sm uppercase tracking-[0.15em] last:border-0 transition-colors duration-200 ${
                    isActive
                      ? "text-primary"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <span>{l.label}</span>
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile CTA */}
          <div className="w-full pt-1">
            <PremiumCTA
              className="w-full justify-center"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          </div>
        </MobileNavMenu>
      </MobileNav>
    </NavbarRoot>
  );
}
