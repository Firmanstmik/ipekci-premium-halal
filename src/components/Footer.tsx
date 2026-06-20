import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  ArrowUpRight,
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import footerBackground from "@/assets/background-footer.webp";
import ipekciLogo from "@/assets/logo-ipekci-new.webp";

const HALAL_BADGE_URL =
  "https://www.ipekcislachterij.nl/wp-content/uploads/2026/03/Halal-Logo-e1774341202273.webp";

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/ipekciharderwijk/",
    icon: Instagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/ipekcislachterijharderwijk/",
    icon: Facebook,
  },
] as const;

function FooterColumnTitle({ children }: { children: ReactNode }) {
  return (
    <div>
      <h4 className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#141414]/55">
        {children}
      </h4>
      <div className="mt-3 h-px w-8 bg-[linear-gradient(90deg,rgba(200,164,107,0.85),transparent)]" />
    </div>
  );
}

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat text-[#1A1A1A]"
      style={{ backgroundImage: `url(${footerBackground})` }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(200,164,107,0.45),transparent)]" />

      <div className="relative mx-auto max-w-[1480px] px-6 py-20 lg:px-10 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-12 xl:gap-14">
          <div className="lg:col-span-4">
            <img
              src={ipekciLogo}
              alt="Ipekçi Slachterij"
              className="h-14 w-auto sm:h-[4.25rem]"
              loading="lazy"
              decoding="async"
            />

            <p className="mt-7 max-w-md text-[15px] leading-[1.75] text-[#141414]/74">
              Premium Nederlands halalvlees en eindproducten — geproduceerd met zorg, hygiëne en
              respect voor halal slachtprincipes.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] font-medium uppercase tracking-[0.22em] text-[#141414]/50">
              {["Halal gecertificeerd", "Eigen slachterij", "Sinds 2012"].map((t, i) => (
                <span key={t} className="inline-flex items-center gap-3">
                  {i > 0 ? (
                    <span className="h-[3px] w-[3px] rotate-45 bg-[rgba(200,164,107,0.75)]" />
                  ) : null}
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-8">
              <FooterColumnTitle>Volg ons</FooterColumnTitle>
              <div className="mt-5 flex items-center gap-3">
                {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="group grid h-11 w-11 place-items-center rounded-xl border border-[#141414]/10 bg-white/90 text-[#141414]/65 shadow-[0_10px_28px_-18px_rgba(0,0,0,0.16)] transition-all duration-300 hover:border-[rgba(200,164,107,0.45)] hover:bg-white hover:text-primary hover:shadow-[0_14px_36px_-20px_rgba(0,0,0,0.2)]"
                  >
                    <Icon size={18} className="transition-transform duration-300 group-hover:scale-105" />
                  </a>
                ))}
              </div>
            </div>

            <Link
              to="/contact"
              className="group mt-10 inline-flex items-center gap-3 rounded-full border border-primary/20 bg-white/95 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#141414] shadow-[0_12px_32px_-22px_rgba(0,0,0,0.18)] transition-all duration-300 hover:border-primary/35 hover:bg-primary hover:text-white"
            >
              Word klant
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-2">
            <div>
              <FooterColumnTitle>Assortiment</FooterColumnTitle>
              <ul className="mt-6 space-y-3.5">
                {[
                  { to: "/assortiment/lamsvlees", label: "Lamsvlees" },
                  { to: "/assortiment/rundvlees", label: "Rundvlees" },
                  { to: "/assortiment/kip", label: "Kip" },
                  { to: "/assortiment/eindproducten", label: "Eindproducten" },
                ].map((l) => (
                  <li key={l.to}>
                    <a
                      href={l.to}
                      className="group inline-flex items-center gap-2.5 text-sm text-[#141414]/78 transition-colors hover:text-primary"
                    >
                      <span className="text-[rgba(200,164,107,0.9)] transition-colors group-hover:text-primary">
                        ›
                      </span>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <FooterColumnTitle>Voor wie</FooterColumnTitle>
              <ul className="mt-6 space-y-3.5">
                {[
                  { to: "/voor-wie/slagerijen", label: "Slagerijen" },
                  { to: "/voor-wie/groothandels", label: "Groothandels" },
                  { to: "/voor-wie/supermarkten", label: "Supermarkten" },
                  { to: "/voor-wie/restaurants", label: "Restaurants" },
                ].map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.to}
                      className="group inline-flex items-center gap-2.5 text-sm text-[#141414]/78 transition-colors hover:text-primary"
                    >
                      <span className="text-[rgba(200,164,107,0.9)] transition-colors group-hover:text-primary">
                        ›
                      </span>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <FooterColumnTitle>Contact</FooterColumnTitle>

            <address className="mt-6 space-y-4 not-italic">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[#141414]/8 bg-white/90 text-primary shadow-[0_8px_20px_-16px_rgba(0,0,0,0.14)]">
                  <MapPin size={16} />
                </span>
                <div className="text-sm leading-relaxed text-[#141414]/78">
                  <p>Buys Ballotstraat 7</p>
                  <p>3846 BG Harderwijk</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[#141414]/8 bg-white/90 text-primary shadow-[0_8px_20px_-16px_rgba(0,0,0,0.14)]">
                  <Phone size={16} />
                </span>
                <a
                  href="tel:+31627273763"
                  className="text-sm text-[#141414]/78 transition-colors hover:text-primary"
                >
                  06 - 272 737 63
                </a>
              </div>

              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[#141414]/8 bg-white/90 text-primary shadow-[0_8px_20px_-16px_rgba(0,0,0,0.14)]">
                  <Mail size={16} />
                </span>
                <a
                  href="mailto:info@ipekcislachterij.nl"
                  className="text-sm text-[#141414]/78 transition-colors hover:text-primary"
                >
                  info@ipekcislachterij.nl
                </a>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[#141414]/8 bg-white/90 text-primary shadow-[0_8px_20px_-16px_rgba(0,0,0,0.14)]">
                  <Clock size={16} />
                </span>
                <div className="text-sm leading-relaxed text-[#141414]/78">
                  <p>Ma–Vr 08:00 – 17:00</p>
                  <p>Za 08:00 – 14:00 · Zo gesloten</p>
                </div>
              </div>
            </address>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="http://maps.google.com/maps?q=loc:52.3606892,5.6383247"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#141414]/12 bg-white/95 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#141414]/85 shadow-[0_10px_28px_-20px_rgba(0,0,0,0.14)] transition-all duration-300 hover:border-primary/25 hover:text-primary"
              >
                Route
                <ArrowUpRight size={14} className="text-primary" />
              </a>
            </div>

            <div className="mt-10 rounded-[18px] border border-[#141414]/8 bg-white/80 p-4 shadow-[0_12px_32px_-24px_rgba(0,0,0,0.12)]">
              <FooterColumnTitle>Certificaten</FooterColumnTitle>
              <div className="mt-4 flex items-center gap-3">
                <img
                  src={HALAL_BADGE_URL}
                  alt="Halal"
                  className="h-12 w-auto"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-16 flex flex-col items-start justify-between gap-6 rounded-[18px] border border-[#141414]/8 bg-white/70 px-6 py-5 backdrop-blur-[2px] md:flex-row md:items-center lg:px-8">
          <div className="text-[11px] uppercase tracking-[0.2em] text-[#141414]/50">
            © {new Date().getFullYear()} Ipekci Slachterij Harderwijk
          </div>
          <div className="flex flex-wrap items-center gap-6 text-[11px] uppercase tracking-[0.2em] text-[#141414]/50">
            <a href="/#quality" className="transition-colors hover:text-primary">
              Halal & kwaliteit
            </a>
            <a href="/#products" className="transition-colors hover:text-primary">
              Producten
            </a>
            <a href="/assortiment" className="transition-colors hover:text-primary">
              Assortiment
            </a>
            <a href="/contact" className="transition-colors hover:text-primary">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
