import { Link, useLocation } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { ArrowUpRight, ChevronDown, Phone } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const STICKER_LAMS = "https://www.ipekcislachterij.nl/wp-content/uploads/2025/11/sticker_lamsvlees.svg";
const STICKER_RUND = "https://www.ipekcislachterij.nl/wp-content/uploads/2025/11/sticker_rundvlees.svg";
const STICKER_KIP = "https://www.ipekcislachterij.nl/wp-content/uploads/2025/11/sticker_gevogelte.svg";
const HERO_WIDE_IMAGE =
  "https://www.ipekcislachterij.nl/wp-content/uploads/2025/12/Ook-klant-worden.webp";

const assortment = [
  { to: "/assortiment#lamsvlees", label: "Lamsvlees" },
  { to: "/assortiment#rundvlees", label: "Rundvlees" },
  { to: "/assortiment#kip", label: "Kip" },
  { to: "/assortiment#eindproducten", label: "Eindproducten" },
] as const;

const segments = [
  { to: "/#slagerijen", label: "Slagerijen" },
  { to: "/#groothandels", label: "Groothandels" },
  { to: "/#supermarkten", label: "Supermarkten" },
  { to: "/#restaurants", label: "Restaurants" },
] as const;

/* ─────────────────────────────────────────────────────────────────
   PhoneCTA  — magnetic shimmer button
   ─────────────────────────────────────────────────────────────── */
function PhoneCTA({
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
      href="tel:+31627273763"
      className={`group relative inline-flex cursor-pointer select-none items-center gap-2 overflow-hidden rounded-sm bg-primary px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-primary-foreground no-underline sm:px-5 sm:py-2 sm:text-[11px] ${className}`}
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
      <Phone size={14} className="relative z-10" />
      <span className="relative z-10">06 - 272 737 63</span>
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
          <NavDropdown
            label="Assortiment"
            items={assortment}
            active={location.pathname.startsWith("/assortiment")}
          />
          <NavDropdown
            label="Voor wie"
            items={segments}
            active={location.hash?.length ? location.hash !== "" : false}
          />
          <NavLink
            to="/ons-verhaal"
            label="Ons verhaal"
            active={location.pathname.startsWith("/ons-verhaal")}
          />
          <NavLink to="/contact" label="Contact" active={location.pathname.startsWith("/contact")} />
        </div>

        {/* Right CTA */}
        <PhoneCTA />
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
          <nav className="flex w-full flex-col">
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="assortiment" className="border-white/[0.05]">
                <AccordionTrigger className="px-1 text-sm uppercase tracking-[0.15em] text-foreground/80 hover:no-underline">
                  Assortiment
                </AccordionTrigger>
                <AccordionContent className="px-1">
                  <div className="flex flex-col">
                    {assortment.map((l, i) => (
                      <a
                        key={l.to}
                        href={l.to}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between border-b border-white/[0.05] py-4 text-sm uppercase tracking-[0.15em] text-foreground/70 transition-colors duration-200 hover:text-foreground"
                        style={{ animationDelay: `${i * 40}ms` }}
                      >
                        <span>{l.label}</span>
                        <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                      </a>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="voorwie" className="border-white/[0.05]">
                <AccordionTrigger className="px-1 text-sm uppercase tracking-[0.15em] text-foreground/80 hover:no-underline">
                  Voor wie
                </AccordionTrigger>
                <AccordionContent className="px-1">
                  <div className="flex flex-col">
                    {segments.map((l, i) => (
                      <a
                        key={l.to}
                        href={l.to}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between border-b border-white/[0.05] py-4 text-sm uppercase tracking-[0.15em] text-foreground/70 transition-colors duration-200 hover:text-foreground"
                        style={{ animationDelay: `${i * 40}ms` }}
                      >
                        <span>{l.label}</span>
                        <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                      </a>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {[
              { to: "/ons-verhaal", label: "Ons verhaal" },
              { to: "/contact", label: "Contact" },
            ].map((l, i) => {
              const isActive = location.pathname.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between border-b border-white/[0.05] px-1 py-4 text-sm uppercase tracking-[0.15em] last:border-0 transition-colors duration-200 ${
                    isActive ? "text-primary" : "text-foreground/70 hover:text-foreground"
                  }`}
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <span>{l.label}</span>
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                </Link>
              );
            })}
          </nav>

          {/* Mobile CTA */}
          <div className="w-full pt-1">
            <PhoneCTA
              className="w-full justify-center"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          </div>
        </MobileNavMenu>
      </MobileNav>
    </NavbarRoot>
  );
}

function NavLink({ to, label, active }: { to: string; label: string; active: boolean }) {
  return (
    <Link
      to={to}
      activeOptions={{ exact: to === "/" }}
      className={`group relative px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-200 ${
        active ? "text-foreground" : "text-foreground/60 hover:text-foreground"
      }`}
    >
      <span className="absolute inset-0 scale-95 rounded-full bg-white/[0.07] opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100" />
      {!active && (
        <span className="absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-primary transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" />
      )}
      {active && <span className="absolute inset-x-0 -bottom-0.5 mx-auto h-0.5 w-4 rounded-full bg-primary" />}
      <span className="relative z-10">{label}</span>
    </Link>
  );
}

function NavDropdown({
  label,
  items,
  active,
}: {
  label: string;
  items: readonly { to: string; label: string }[];
  active: boolean;
}) {
  const isAssortiment = label === "Assortiment";
  const isVoorWie = label === "Voor wie";

  const richItems = items.map((item) => {
    if (isAssortiment) {
      if (item.label === "Lamsvlees") {
        return {
          ...item,
          description:
            "Premium Nederlandse lammeren, onbedwelmd halalgeslacht in ons eigen slachthuis.",
          iconSrc: STICKER_LAMS,
        };
      }
      if (item.label === "Rundvlees") {
        return {
          ...item,
          description: "Nederlands rundvlees van vaste partners. Altijd halalgeslacht en constant geleverd.",
          iconSrc: STICKER_RUND,
        };
      }
      if (item.label === "Kip") {
        return {
          ...item,
          description: "Op aanvraag leveren wij ook halalgeslachte kip uit Nederland, in standaarddelen.",
          iconSrc: STICKER_KIP,
        };
      }
      return {
        ...item,
        description: "Eindproducten gemaakt van ons eigen halalvlees — premium kwaliteit voor verkoop en bereiding.",
        iconSrc: "https://www.ipekcislachterij.nl/wp-content/uploads/2025/11/sticker_rundvlees.svg",
      };
    }

    if (isVoorWie) {
      if (item.label === "Slagerijen") {
        return {
          ...item,
          description: "Dagelijks vers halalvlees van hoge Nederlandse kwaliteit, snel geleverd.",
          iconSrc: STICKER_LAMS,
        };
      }
      if (item.label === "Groothandels") {
        return {
          ...item,
          description: "Stabiele aanvoer in grotere volumes, direct uit ons eigen slachthuis.",
          iconSrc: STICKER_RUND,
        };
      }
      if (item.label === "Supermarkten") {
        return {
          ...item,
          description: "Halalvlees en eindproducten voor vers & diepvries, direct verkoopklaar.",
          iconSrc: STICKER_RUND,
        };
      }
      return {
        ...item,
        description: "Geselecteerde delen en grillproducten, afgestemd op menukaart en keuken.",
        iconSrc: STICKER_KIP,
      };
    }

    return { ...item, description: "", iconSrc: STICKER_RUND };
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={`group relative inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium tracking-wide outline-none transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/20 data-[state=open]:text-foreground ${
            active ? "text-foreground" : "text-foreground/60 hover:text-foreground"
          }`}
        >
          <span className="absolute inset-0 scale-95 rounded-full bg-white/[0.07] opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 data-[state=open]:scale-100 data-[state=open]:opacity-100" />
          <span className="relative z-10">{label}</span>
          <ChevronDown
            size={14}
            className="relative z-10 text-foreground/60 transition-transform duration-300 group-hover:text-foreground/80 data-[state=open]:rotate-180 data-[state=open]:text-foreground/80"
          />
          <span className="absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-primary transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        sideOffset={14}
        className={`mt-3 overflow-hidden rounded-2xl border border-white/10 bg-background/70 p-0 text-foreground shadow-[0_30px_90px_-40px_rgba(0,0,0,0.85)] backdrop-blur-2xl ${
          isAssortiment || isVoorWie ? "w-[860px]" : "w-56 p-2 rounded-sm"
        }`}
      >
        {isAssortiment || isVoorWie ? (
          <div className="grid grid-cols-[1.1fr_0.9fr]">
            <div className="p-6">
              <div className="flex items-center justify-between gap-6">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground/55">
                    {isAssortiment ? "Assortiment" : "Voor wie"}
                  </div>
                  <div className="mt-2 font-display text-2xl text-foreground">
                    {isAssortiment ? "Onze productcategorieën." : "Onze klanten."}
                  </div>
                </div>
                <div className="hidden h-px flex-1 bg-gradient-to-r from-white/0 via-white/10 to-white/0 lg:block" />
              </div>

              <div className="mt-6 grid gap-2">
                {richItems.map((item) => (
                  <DropdownMenuItem key={item.to} asChild className="p-0 focus:bg-transparent">
                    <a
                      href={item.to}
                      className="group flex items-start gap-4 rounded-xl border border-transparent bg-transparent px-4 py-3 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04]"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03] shadow-[0_18px_50px_-30px_rgba(0,0,0,0.9)]">
                        <img
                          src={(item as typeof richItems[number]).iconSrc}
                          alt=""
                          aria-hidden
                          className="h-5 w-5 opacity-90"
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          style={{
                            filter:
                              "sepia(1) saturate(520%) hue-rotate(352deg) brightness(0.66) contrast(1.12)",
                          }}
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center justify-between gap-4">
                          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/85 transition-colors duration-300 group-hover:text-foreground">
                            {item.label}
                          </span>
                          <ArrowUpRight
                            size={14}
                            className="shrink-0 text-foreground/45 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                          />
                        </span>
                        <span className="mt-1 block text-xs leading-relaxed text-foreground/55">
                          {(item as typeof richItems[number]).description}
                        </span>
                      </span>
                    </a>
                  </DropdownMenuItem>
                ))}
              </div>
            </div>

            <div className="relative border-l border-white/10 bg-white/[0.02] p-6">
              <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground/55">
                Uitgelicht
              </div>
              <div className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={HERO_WIDE_IMAGE}
                    alt=""
                    aria-hidden
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/60" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/85">
                      Ipekçi Slachterij
                    </div>
                    <div className="mt-2 text-sm leading-relaxed text-foreground/65">
                      {isAssortiment
                        ? "Bekijk het complete assortiment: lamsvlees, rundvlees, kip (op aanvraag) en eindproducten."
                        : "Levering op afspraak, vaste lijnen en constante kwaliteit voor uw bedrijf."}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <a
                        href={isAssortiment ? "/assortiment" : "/contact"}
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/85 transition-colors hover:border-white/25 hover:bg-black/55"
                      >
                        {isAssortiment ? "Alle producten" : "Word klant"}
                        <ArrowUpRight size={14} className="text-primary" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          items.map((item) => (
            <DropdownMenuItem
              key={item.to}
              asChild
              className="cursor-pointer rounded-sm px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/85 focus:bg-white/[0.06] focus:text-foreground"
            >
              <a href={item.to} className="flex items-center justify-between">
                <span>{item.label}</span>
                <ArrowUpRight size={14} className="text-primary" />
              </a>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
