import { Link, useLocation } from "@tanstack/react-router";
import { Fragment, useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowRight, ArrowUpRight, Gem, Mail, Phone, ShieldCheck, Truck } from "lucide-react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AssortimentMobileLinks } from "@/components/AssortimentMegaMenu";
import { AssortimentNavDropdown } from "@/components/AssortimentNavDropdown";
import { BRAND } from "@/lib/brand";
import ayatLogo from "@/assets/ayat/logo-transparent.png";

/* ── Constants ─────────────────────────────────────────────── */

const LOGO_URL = ayatLogo;
const GOLD = "rgba(240,215,168,";
const RED = "rgba(218,41,42,";
const RED_SOLID = "#da292a";

/* ── Original info items (unchanged) ───────────────────────── */

const infoItems = [
  { label: "100% Halal", Icon: ShieldCheck },
  { label: "NVWA Normen", Icon: Gem },
  { label: "Snelle Levering", Icon: Truck },
] as const;

/* ── Logo ───────────────────────────────────────────────────── */

function NavLogo({ scrolled = false }: { scrolled?: boolean }) {
  return (
    <Link
      to="/"
      aria-label="Ayat Food"
      className="relative z-20 flex shrink-0 items-center py-1 transition-opacity duration-200 hover:opacity-90"
    >
      <img
        src={LOGO_URL}
        alt="Ayat Food"
        className={`w-auto select-none ${scrolled ? "h-[58px] sm:h-[72px]" : "h-[68px] sm:h-[88px]"}`}
        width={280}
        height={112}
        loading="eager"
        decoding="async"
        style={
          scrolled
            ? undefined
            : {
                filter:
                  "drop-shadow(0 10px 28px rgba(0,0,0,0.45)) drop-shadow(0 0 18px rgba(218,41,42,0.22))",
              }
        }
      />
    </Link>
  );
}

/* ── Top info bar ───────────────────────────────────────────── */

const LIGHT_TOP_NAV_PATHS = ["/contact"] as const;
const TOP_BAR_ICON = RED_SOLID;

function TopInfoBar({ visible, light = false }: { visible: boolean; light?: boolean }) {
  if (!visible) return null;

  const textClass = light ? "text-[#666]" : "text-white/62";
  const hoverClass = light ? "hover:text-[#111]" : "hover:text-white/88";

  return (
    <div className="relative hidden lg:block">
      <div className="ipek-container flex h-[38px] items-center justify-end">
        <div className={`flex items-center text-[13px] font-[500] tracking-[0.05em] ${textClass}`}>
          {/* Trust indicators */}
          {infoItems.map(({ label, Icon }, i) => (
            <Fragment key={label}>
              {i > 0 && (
                <span
                  className="mx-[15px] h-[14px] w-px shrink-0"
                  style={{ background: light ? `${RED}0.18)` : `${GOLD}0.15)` }}
                  aria-hidden
                />
              )}
              <span className="flex items-center gap-2">
                <Icon size={13} className="shrink-0" style={{ color: TOP_BAR_ICON }} />
                <span>{label}</span>
              </span>
            </Fragment>
          ))}

          {/* Wider separator before contact block */}
          <span
            className="mx-[19px] h-[14px] w-px shrink-0"
            style={{ background: light ? `${RED}0.2)` : `${GOLD}0.18)` }}
            aria-hidden
          />

          {/* Email */}
          <a
            href={`mailto:${BRAND.email}`}
            className={`flex items-center gap-2 transition-colors duration-200 ${hoverClass}`}
          >
            <Mail size={13} className="shrink-0" style={{ color: TOP_BAR_ICON }} />
            {BRAND.email}
          </a>

          {/* Dot between email and phone */}
          <span
            className="mx-[11px] h-[5px] w-[5px] shrink-0 rounded-full"
            style={{ background: light ? `${RED}0.28)` : `${GOLD}0.28)` }}
            aria-hidden
          />

          {/* Phone */}
          <a
            href={`tel:${BRAND.phoneTel}`}
            className={`flex items-center gap-2 transition-colors duration-200 ${hoverClass}`}
          >
            <Phone size={13} className="shrink-0" style={{ color: TOP_BAR_ICON }} />
            {BRAND.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
}

/* ── CTA — original text "Contact opnemen" ──────────────────── */

function MainCTA({ onClick, className = "" }: { onClick?: () => void; className?: string }) {
  return (
    <Link
      to="/contact"
      onClick={onClick}
      className={`group relative inline-flex min-h-12 items-center gap-2.5 overflow-hidden rounded-2xl border border-[#da292a]/80 bg-[#da292a] px-7 py-[13px] text-[12px] font-semibold tracking-[0.08em] text-white shadow-[0_12px_36px_-16px_rgba(218,41,42,0.7)] transition-all duration-300 active:scale-[0.98] hover:-translate-y-px hover:border-white hover:bg-white hover:text-[#da292a] hover:shadow-[0_16px_40px_-16px_rgba(255,255,255,0.35)] ${className}`}
    >
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-70 group-hover:opacity-0"
        style={{
          background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)",
        }}
        aria-hidden
      />
      <span className="relative">Offerte aanvragen</span>
      <ArrowRight
        size={14}
        className="relative transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1"
      />
    </Link>
  );
}

/* ── Desktop nav link ───────────────────────────────────────── */

function NavLink({
  to,
  label,
  active,
  scrolled = false,
}: {
  to: string;
  label: string;
  active: boolean;
  scrolled?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`group relative inline-flex items-center px-5 py-4 text-[13px] font-medium tracking-[0.08em] transition-colors duration-200 xl:px-6 ${
        scrolled
          ? active
            ? "text-[#141414]"
            : "text-[#141414]/72 hover:text-[#141414]"
          : active
            ? "text-white"
            : "text-white/82 hover:text-white"
      }`}
    >
      <span className="relative z-10">{label}</span>
      {active ? (
        <span
          className="absolute inset-x-5 -bottom-px h-px xl:inset-x-6"
          style={{
            background: scrolled
              ? `linear-gradient(90deg, transparent, ${RED}0.85), transparent)`
              : `linear-gradient(90deg, transparent, ${GOLD}0.85), transparent)`,
          }}
          aria-hidden
        />
      ) : (
        <span
          className="absolute inset-x-5 -bottom-px h-px origin-left scale-x-0 transition-transform duration-[360ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100 xl:inset-x-6"
          style={{ background: scrolled ? `${RED}0.72)` : `${GOLD}0.72)` }}
          aria-hidden
        />
      )}
    </Link>
  );
}

/* ── Mobile toggle ──────────────────────────────────────────── */

function MobileToggle({
  isOpen,
  onClick,
  scrolled = false,
}: {
  isOpen: boolean;
  onClick: () => void;
  scrolled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? "Sluit menu" : "Open menu"}
      aria-expanded={isOpen}
      className={`relative grid min-h-12 min-w-12 place-items-center rounded-xl transition-colors active:scale-[0.96] ${
        scrolled
          ? "text-[#141414]/88 hover:text-[#141414]"
          : "text-foreground/88 hover:text-foreground"
      }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isOpen ? (
          <motion.span
            key="close"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <IconX size={20} />
          </motion.span>
        ) : (
          <motion.span
            key="open"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <IconMenu2 size={20} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

/* ── Mobile drawer ──────────────────────────────────────────── */

function MobileDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="fixed inset-0 z-[80] flex w-full flex-col lg:hidden"
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-[#050505]/80 backdrop-blur-2xl"
            onClick={onClose}
            aria-hidden
          />

          {/* ambient light */}
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute -left-28 -top-28 h-[420px] w-[420px] rounded-full bg-[rgba(226,192,141,0.14)] blur-[140px]" />
            <div className="absolute -right-28 top-40 h-[520px] w-[520px] rounded-full bg-[rgba(218,41,42,0.22)] blur-[170px]" />
          </div>

          {/* content */}
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="nav-mobile-drawer relative z-10 flex h-full w-full flex-col overflow-y-auto overscroll-contain pb-10 pt-10 sm:px-8"
          >
            {/* header */}
            <div className="flex items-center justify-between pb-8">
              <Link to="/" onClick={onClose} aria-label="Ayat Food">
                <img
                  src={LOGO_URL}
                  alt="Ayat Food"
                  className="h-9 w-auto select-none"
                  loading="eager"
                  decoding="async"
                />
              </Link>
              <button
                onClick={onClose}
                aria-label="Sluit menu"
                className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-foreground transition-colors hover:bg-white/[0.06]"
              >
                <IconX size={18} />
              </button>
            </div>

            {/* brand heading */}
            <div className="mb-6">
              <div className="text-[12px] font-medium tracking-[0.10em] text-[rgba(226,192,141,0.75)]">
                Ayat Food
              </div>
              <div className="mt-3 font-display text-2xl tracking-[-0.03em] text-white">
                Premium Halal vleesgroothandel.
              </div>
            </div>

            {/* Mirrors the official hierarchy: Home · Over ons · Producten · Vacatures · Contact */}
            <nav className="flex w-full flex-col">
              {[
                { to: "/", label: "Home" },
                { to: "/ons-verhaal", label: "Over Ons" },
              ].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={onClose}
                  className="nav-mobile-link flex items-center justify-between border-b border-white/[0.08] text-[15px] font-medium tracking-[0.04em] text-white/85 transition-colors active:bg-white/[0.04] hover:text-white"
                >
                  <span>{l.label}</span>
                  <ArrowUpRight size={14} className="text-white/35" />
                </Link>
              ))}

              <Accordion type="multiple" className="w-full">
                <AccordionItem value="producten" className="border-white/[0.05]">
                  <AccordionTrigger className="px-0 text-base font-medium tracking-[0.06em] text-white/85 hover:no-underline">
                    Producten
                  </AccordionTrigger>
                  <AccordionContent className="px-0">
                    <AssortimentMobileLinks onNavigate={onClose} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {[
                { to: "/vacatures", label: "Vacatures" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={onClose}
                  className="nav-mobile-link flex items-center justify-between border-b border-white/[0.08] text-[15px] font-medium tracking-[0.04em] text-white/85 transition-colors active:bg-white/[0.04] hover:text-white last:border-0"
                >
                  <span>{l.label}</span>
                  <ArrowUpRight size={14} className="text-white/35" />
                </Link>
              ))}
            </nav>

            {/* bottom CTAs */}
            <div className="mt-7 w-full">
              <MainCTA className="nav-mobile-cta w-full justify-center" onClick={onClose} />
              <a
                href={`tel:${BRAND.phoneTel}`}
                className="nav-mobile-cta mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3 text-[12px] font-medium tracking-[0.06em] text-white/75 transition-colors active:scale-[0.98] hover:bg-white/[0.06] hover:text-white/90"
              >
                <Phone size={14} style={{ color: `${GOLD}0.90)` }} />
                <span>Bel direct</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Main export ────────────────────────────────────────────── */

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [infoVisible, setInfoVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  useMotionValueEvent(scrollY, "change", (current) => {
    setScrolled(current > 80);
    setInfoVisible(current < 55);
  });

  useEffect(() => {
    const current = scrollY.get();
    setScrolled(current > 80);
    setInfoVisible(current < 55);
  }, [scrollY]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prevOverflow = document.body.style.overflow;
    const prevPadding = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadding;
    };
  }, [mobileOpen]);

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const isLightTopPage = LIGHT_TOP_NAV_PATHS.some((path) => location.pathname.startsWith(path));
  const navSolid = scrolled || isLightTopPage;

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      {/* Shared hero-integrated atmosphere — one continuous scrim behind BOTH the
          top bar and the navbar, so they read as a single overlay (no band, no divider).
          Fades out on scroll where the navbar takes over its own glass surface. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 hidden h-[150px] lg:block"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.40) 0%, rgba(0,0,0,0.22) 42%, rgba(0,0,0,0.08) 75%, transparent 100%)",
          opacity: navSolid ? 0 : 1,
          transition: "opacity 0.5s cubic-bezier(0.16,1,0.3,1)",
        }}
        aria-hidden
      />

      {/* Top info bar — slides away on scroll */}
      <TopInfoBar visible={infoVisible} light={navSolid} />

      {/* Main navbar */}
      <motion.div
        animate={{
          backgroundColor: navSolid ? "#ffffff" : "rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
        style={{
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
          borderBottomColor: navSolid ? "rgba(0,0,0,0.08)" : "rgba(226,192,141,0)",
          boxShadow: navSolid ? "0 8px 32px -12px rgba(0,0,0,0.10)" : "none",
          transition:
            "background-color 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Desktop — logo left, nav + CTA grouped right */}
        <div className="ipek-container hidden h-[88px] items-center justify-between gap-6 lg:flex">
          <NavLogo scrolled={navSolid} />

          <div className="flex items-center gap-0.5 xl:gap-1">
            <NavLink to="/" label="Home" active={isActive("/")} scrolled={navSolid} />
            <NavLink
              to="/ons-verhaal"
              label="Over Ons"
              active={isActive("/ons-verhaal")}
              scrolled={navSolid}
            />
            <AssortimentNavDropdown
              active={isActive("/producten")}
              open={openDropdown === "Producten"}
              onOpenChange={(v) => setOpenDropdown(v ? "Producten" : null)}
              scrolled={navSolid}
            />
            <NavLink
              to="/vacatures"
              label="Vacatures"
              active={isActive("/vacatures")}
              scrolled={navSolid}
            />
            <NavLink
              to="/contact"
              label="Contact"
              active={isActive("/contact")}
              scrolled={navSolid}
            />
            <div
              className={`ml-3 pl-3 xl:ml-4 xl:pl-4 border-l ${navSolid ? "border-black/10" : "border-white/10"}`}
            >
              <MainCTA />
            </div>
          </div>
        </div>

        {/* Mobile header */}
        <div className="ipek-container flex items-center justify-between py-4 lg:hidden">
          <NavLogo scrolled={navSolid} />
          <MobileToggle
            isOpen={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            scrolled={navSolid}
          />
        </div>
      </motion.div>

      {/* Mobile drawer */}
      <MobileDrawer isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </div>
  );
}
