import { Link, useLocation } from "@tanstack/react-router";
import { Fragment, useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Gem,
  Mail,
  Phone,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DS_EASE } from "@/lib/design-system";
import { AssortimentMobileLinks } from "@/components/AssortimentMegaMenu";
import { AssortimentNavDropdown } from "@/components/AssortimentNavDropdown";
import { VoorWieMobileLinks } from "@/components/VoorWieMobileLinks";
import { VoorWieNavDropdown } from "@/components/VoorWieNavDropdown";

/* ── Constants ─────────────────────────────────────────────── */

const LOGO_URL = "https://www.ipekcislachterij.nl/wp-content/uploads/2025/11/logo_footer.webp";
const HERO_WIDE = "https://www.ipekcislachterij.nl/wp-content/uploads/2025/12/Ook-klant-worden.webp";
const STICKER_LAMS = "https://www.ipekcislachterij.nl/wp-content/uploads/2025/11/sticker_lamsvlees.svg";
const STICKER_RUND = "https://www.ipekcislachterij.nl/wp-content/uploads/2025/11/sticker_rundvlees.svg";
const STICKER_KIP = "https://www.ipekcislachterij.nl/wp-content/uploads/2025/11/sticker_gevogelte.svg";
const GOLD = "rgba(226,192,141,";

/* ── Original info items (unchanged) ───────────────────────── */

const infoItems = [
  { label: "Halal gecertificeerd", Icon: ShieldCheck },
  { label: "Premium Nederlandse kwaliteit", Icon: Gem },
  { label: "Snelle levering", Icon: Truck },
] as const;

/* ── Sticker filter ─────────────────────────────────────────── */

const STICKER_FILTER = "sepia(1) saturate(520%) hue-rotate(352deg) brightness(0.66) contrast(1.12)";

/* ── Logo ───────────────────────────────────────────────────── */

const OFFICIAL_LOGO_URL = "/ipekci-official-logo.svg";

function NavLogo({ scrolled = false }: { scrolled?: boolean }) {
  return (
    <Link
      to="/"
      aria-label="Ipekçi Slachterij"
      className="relative z-20 flex shrink-0 items-center py-1 transition-opacity duration-200 hover:opacity-85"
    >
      {scrolled ? (
        <img
          src={OFFICIAL_LOGO_URL}
          alt="Ipekçi Slachterij"
          className="h-[36px] w-auto select-none sm:h-[48px]"
          width={226}
          height={70}
          loading="eager"
          decoding="async"
        />
      ) : (
        <img
          src={LOGO_URL}
          alt="Ipekçi Slachterij"
          className="h-[44px] w-auto select-none sm:h-[58px]"
          loading="eager"
          decoding="async"
          style={{
            filter:
              "drop-shadow(0 8px 24px rgba(0,0,0,0.28)) drop-shadow(0 0 12px rgba(179,18,23,0.10))",
          }}
        />
      )}
    </Link>
  );
}

/* ── Top info bar ───────────────────────────────────────────── */

const LIGHT_TOP_NAV_PATHS = ["/contact"] as const;
const TOP_BAR_ICON_RED = "#B31217";

function TopInfoBar({ visible, light = false }: { visible: boolean; light?: boolean }) {
  if (!visible) return null;

  const textClass = light ? "text-[#666]" : "text-white/62";
  const hoverClass = light ? "hover:text-[#111]" : "hover:text-white/88";

  return (
    <div className="relative hidden lg:block">
      <div className="mx-auto flex h-[38px] max-w-[1520px] items-center justify-end px-5 sm:px-8 lg:px-10 xl:px-12">
        <div className={`flex items-center text-[13px] font-[500] tracking-[0.05em] ${textClass}`}>

          {/* Trust indicators */}
          {infoItems.map(({ label, Icon }, i) => (
            <Fragment key={label}>
              {i > 0 && (
                <span
                  className="mx-[15px] h-[14px] w-px shrink-0"
                  style={{ background: light ? "rgba(179,18,23,0.12)" : `${GOLD}0.15)` }}
                  aria-hidden
                />
              )}
              <span className="flex items-center gap-2">
                <Icon size={13} className="shrink-0" style={{ color: TOP_BAR_ICON_RED }} />
                <span>{label}</span>
              </span>
            </Fragment>
          ))}

          {/* Wider separator before contact block */}
          <span
            className="mx-[19px] h-[14px] w-px shrink-0"
            style={{ background: light ? "rgba(179,18,23,0.14)" : `${GOLD}0.18)` }}
            aria-hidden
          />

          {/* Email */}
          <a
            href="mailto:info@ipekcislachterij.nl"
            className={`flex items-center gap-2 transition-colors duration-200 ${hoverClass}`}
          >
            <Mail size={13} className="shrink-0" style={{ color: TOP_BAR_ICON_RED }} />
            info@ipekcislachterij.nl
          </a>

          {/* Dot between email and phone */}
          <span
            className="mx-[11px] h-[5px] w-[5px] shrink-0 rounded-full"
            style={{ background: light ? "rgba(179,18,23,0.22)" : `${GOLD}0.28)` }}
            aria-hidden
          />

          {/* Phone */}
          <a
            href="tel:+31627273763"
            className={`flex items-center gap-2 transition-colors duration-200 ${hoverClass}`}
          >
            <Phone size={13} className="shrink-0" style={{ color: TOP_BAR_ICON_RED }} />
            +31 6 272 737 63
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
      className={`group relative inline-flex items-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-b from-[#B11217] to-[#7E080C] px-7 py-[13px] text-[12px] font-semibold tracking-[0.06em] text-[#F5F1EB] transition-[filter,transform] duration-300 hover:brightness-105 hover:-translate-y-px active:brightness-95 active:scale-[0.99] ${className}`}
    >
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)" }}
        aria-hidden
      />
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(520px 240px at 30% 20%, rgba(245,241,235,0.18) 0%, transparent 62%)" }}
        aria-hidden
      />
      <span className="relative">Contact opnemen</span>
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
      className={`group relative inline-flex items-center px-7 py-4 text-[13px] font-medium tracking-[0.08em] transition-colors duration-200 ${
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
          className="absolute inset-x-7 -bottom-px h-px"
          style={{
            background: scrolled
              ? "linear-gradient(90deg, transparent, rgba(179,18,23,0.85), transparent)"
              : `linear-gradient(90deg, transparent, ${GOLD}0.85), transparent)`,
          }}
          aria-hidden
        />
      ) : (
        <span
          className="absolute inset-x-7 -bottom-px h-px origin-left scale-x-0 transition-transform duration-[360ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100"
          style={{ background: scrolled ? "rgba(179,18,23,0.72)" : `${GOLD}0.72)` }}
          aria-hidden
        />
      )}
    </Link>
  );
}

/* ── Disabled nav link (original behavior) ──────────────────── */

function NavLinkDisabled({ label }: { label: string }) {
  return (
    <button
      type="button"
      aria-disabled="true"
      className="relative cursor-default px-7 py-4 text-[13px] font-medium tracking-[0.08em] text-white/38"
    >
      {label}
    </button>
  );
}

/* ── Desktop dropdown ───────────────────────────────────────── */

type DropdownItem = {
  to: string;
  label: string;
  description: string;
  iconSrc: string;
};

function NavDropdown({
  label,
  items,
  active,
  open,
  onOpenChange,
  panelTitle,
  panelSubtitle,
  featuredText,
  featuredCta,
  featuredCtaHref,
}: {
  label: string;
  items: readonly DropdownItem[];
  active: boolean;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  panelTitle: string;
  panelSubtitle: string;
  featuredText: string;
  featuredCta: string;
  featuredCtaHref: string;
}) {
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange} modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          onMouseEnter={() => onOpenChange(true)}
          className={`group relative inline-flex items-center gap-1.5 bg-transparent px-7 py-4 text-[13px] font-medium tracking-[0.08em] outline-none transition-colors duration-200 focus:outline-none focus-visible:ring-0 ${
            open || active ? "text-white" : "text-white/82 hover:text-white"
          }`}
        >
          <span className="relative z-10">{label}</span>
          <motion.span
            className="relative z-10"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.26, ease: DS_EASE }}
          >
            <ChevronDown size={13} className="text-white/50" />
          </motion.span>
          <span
            className={`absolute inset-x-7 -bottom-px h-px transition-transform duration-[360ms] ease-[cubic-bezier(.22,1,.36,1)] ${
              open || active
                ? "scale-x-100"
                : "origin-left scale-x-0 group-hover:scale-x-100"
            }`}
            style={{ background: `${GOLD}0.72)` }}
            aria-hidden
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="center"
        sideOffset={12}
        onMouseEnter={() => onOpenChange(true)}
        onMouseLeave={() => onOpenChange(false)}
        className="mt-2 w-[860px] overflow-hidden rounded-2xl border border-white/10 bg-background/70 p-0 text-foreground shadow-[0_30px_90px_-40px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
      >
        <div className="grid grid-cols-[1.1fr_0.9fr]">
          {/* Left panel */}
          <div className="p-6">
            <div className="flex items-center justify-between gap-6">
              <div>
                <div className="text-[12px] font-medium tracking-[0.10em] text-foreground/55">
                  {panelTitle}
                </div>
                <div className="mt-2 font-display text-2xl text-foreground">
                  {panelSubtitle}
                </div>
              </div>
              <div className="hidden h-px flex-1 bg-gradient-to-r from-white/0 via-white/10 to-white/0 lg:block" />
            </div>

            <div className="mt-6 grid gap-2">
              {items.map((item) => (
                <DropdownMenuItem key={item.to} asChild className="p-0 focus:bg-transparent">
                  <a
                    href={item.to}
                    className="group flex items-start gap-4 rounded-xl border border-transparent bg-transparent px-4 py-3 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04]"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03] shadow-[0_18px_50px_-30px_rgba(0,0,0,0.9)]">
                      <img
                        src={item.iconSrc}
                        alt=""
                        aria-hidden
                        className="h-5 w-5 opacity-90"
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        style={{ filter: STICKER_FILTER }}
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-4">
                        <span className="text-[12px] font-medium tracking-[0.06em] text-foreground/85 transition-colors duration-300 group-hover:text-foreground">
                          {item.label}
                        </span>
                        <ArrowUpRight
                          size={14}
                          className="shrink-0 text-foreground/45 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                        />
                      </span>
                      <span className="mt-1 block text-xs leading-relaxed text-foreground/55">
                        {item.description}
                      </span>
                    </span>
                  </a>
                </DropdownMenuItem>
              ))}
            </div>
          </div>

          {/* Right featured image */}
          <div className="relative border-l border-white/10 bg-white/[0.02] p-6">
            <div className="text-[12px] font-medium tracking-[0.10em] text-foreground/55">
              Uitgelicht
            </div>
            <div className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={HERO_WIDE}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/60" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="text-[12px] font-medium tracking-[0.06em] text-foreground/85">
                    Ipekçi Slachterij
                  </div>
                  <div className="mt-2 text-sm leading-relaxed text-foreground/65">
                    {featuredText}
                  </div>
                  <div className="mt-4">
                    <a
                      href={featuredCtaHref}
                      className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-black/35 px-4 py-2 text-[12px] font-medium tracking-[0.06em] text-foreground/85 transition-colors hover:border-white/25 hover:bg-black/55"
                    >
                      {featuredCta}
                      <ArrowUpRight size={14} className="text-primary" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
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
      className={`relative grid h-9 w-9 place-items-center transition-colors ${
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
            <div className="absolute -right-28 top-40 h-[520px] w-[520px] rounded-full bg-[rgba(179,18,23,0.16)] blur-[170px]" />
          </div>

          {/* content */}
          <motion.div
            initial={{ y: 10, filter: "blur(10px)" }}
            animate={{ y: 0, filter: "blur(0px)" }}
            exit={{ y: 10, filter: "blur(10px)" }}
            transition={{ type: "spring", stiffness: 260, damping: 32 }}
            className="relative z-10 flex h-full w-full flex-col overflow-y-auto px-6 pb-10 pt-10 sm:px-8"
          >
            {/* header */}
            <div className="flex items-center justify-between pb-8">
              <Link to="/" onClick={onClose} aria-label="Ipekçi Slachterij">
                <img
                  src={LOGO_URL}
                  alt="Ipekçi Slachterij"
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
                Ipekçi Slachterij
              </div>
              <div className="mt-3 font-display text-2xl tracking-[-0.03em] text-white">
                Premium halalvlees voor B2B.
              </div>
            </div>

            {/* original accordion structure */}
            <nav className="flex w-full flex-col">
              <Link
                to="/"
                onClick={onClose}
                className="flex items-center justify-between border-b border-white/[0.08] py-5 text-[15px] font-medium tracking-[0.04em] text-white/85 transition-colors hover:text-white"
              >
                <span>Home</span>
                <ArrowUpRight size={14} className="text-white/35" />
              </Link>

              <Accordion type="multiple" className="w-full">
                <AccordionItem value="assortiment" className="border-white/[0.05]">
                  <AccordionTrigger className="px-0 text-base font-medium tracking-[0.06em] text-white/85 hover:no-underline">
                    Assortiment
                  </AccordionTrigger>
                  <AccordionContent className="px-0">
                    <AssortimentMobileLinks onNavigate={onClose} />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="voorwie" className="border-white/[0.05]">
                  <AccordionTrigger className="px-0 text-base font-medium tracking-[0.06em] text-white/85 hover:no-underline">
                    Voor wie
                  </AccordionTrigger>
                  <AccordionContent className="px-0">
                    <VoorWieMobileLinks onNavigate={onClose} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* disabled links — original behavior */}
              {[
                { to: "/ons-verhaal", label: "Ons verhaal" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={onClose}
                  className="flex items-center justify-between border-b border-white/[0.08] py-5 text-[15px] font-medium tracking-[0.04em] text-white/85 transition-colors hover:text-white last:border-0"
                >
                  <span>{l.label}</span>
                  <ArrowUpRight size={14} className="text-white/35" />
                </Link>
              ))}
            </nav>

            {/* bottom CTAs */}
            <div className="mt-7 w-full">
              <MainCTA className="w-full justify-center" onClick={onClose} />
              <a
                href="tel:+31627273763"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3 text-[12px] font-medium tracking-[0.06em] text-white/75 transition-colors hover:bg-white/[0.06] hover:text-white/90"
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
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
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
        <div className="mx-auto hidden h-[88px] max-w-[1520px] items-center justify-between gap-6 px-5 sm:px-8 lg:flex lg:px-10 xl:px-12">
          <NavLogo scrolled={navSolid} />

          <div className="flex items-center gap-0.5 xl:gap-1">
            <NavLink to="/" label="Home" active={isActive("/")} scrolled={navSolid} />
            <AssortimentNavDropdown
              active={isActive("/assortiment")}
              open={openDropdown === "Assortiment"}
              onOpenChange={(v) => setOpenDropdown(v ? "Assortiment" : null)}
              scrolled={navSolid}
            />
            <VoorWieNavDropdown
              active={isActive("/voor-wie")}
              open={openDropdown === "Voor wie"}
              onOpenChange={(v) => setOpenDropdown(v ? "Voor wie" : null)}
              scrolled={navSolid}
            />
            <NavLink to="/ons-verhaal" label="Ons verhaal" active={isActive("/ons-verhaal")} scrolled={navSolid} />
            <NavLink to="/contact" label="Contact" active={isActive("/contact")} scrolled={navSolid} />
            <div className={`ml-3 pl-3 xl:ml-4 xl:pl-4 border-l ${navSolid ? "border-black/10" : "border-white/10"}`}>
              <MainCTA />
            </div>
          </div>
        </div>

        {/* Mobile header */}
        <div className="flex items-center justify-between px-5 py-4 sm:px-8 lg:hidden">
          <NavLogo scrolled={navSolid} />
          <MobileToggle isOpen={mobileOpen} onClick={() => setMobileOpen((v) => !v)} scrolled={navSolid} />
        </div>
      </motion.div>

      {/* Mobile drawer */}
      <MobileDrawer isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </div>
  );
}
