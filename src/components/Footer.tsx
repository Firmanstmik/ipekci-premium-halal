import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";

const IPEKCI_LOGO_URL =
  "https://www.ipekcislachterij.nl/wp-content/uploads/2025/11/logo_footer.webp";
const HALAL_BADGE_URL =
  "https://www.ipekcislachterij.nl/wp-content/uploads/2026/03/Halal-Logo-e1774341202273.webp";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-background">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-primary/18 blur-3xl" />
        <div className="absolute -bottom-44 -right-44 h-96 w-96 rounded-full bg-[color-mix(in_oklab,var(--accent)_20%,transparent)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_400px_at_50%_0%,rgba(255,255,255,0.06)_0%,transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-[1480px] px-6 py-20 lg:px-10 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-4">
              <img src={IPEKCI_LOGO_URL} alt="Ipekçi Slachterij" className="h-12 w-auto" />
              <div>
                <div className="font-display text-xl text-foreground">Ipekçi Slachterij</div>
                <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.3em] text-foreground/55">
                  Premium halalvlees
                </div>
              </div>
            </div>

            <p className="mt-6 max-w-md text-sm leading-relaxed text-foreground/70">
              Premium Nederlands halalvlees en eindproducten — geproduceerd met zorg, hygiëne en
              respect voor halal slachtprincipes.
            </p>

            <Link
              to="/contact"
              className="group mt-10 inline-flex items-center gap-3 border-b border-primary pb-1 text-sm font-medium uppercase tracking-[0.2em] text-foreground transition-colors hover:text-primary"
            >
              Word klant
              <ArrowUpRight
                size={16}
                className="text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-2">
            <div>
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Assortiment
              </h4>
              <ul className="mt-5 space-y-3">
                {[
                  { to: "/assortiment#lamsvlees", label: "Lamsvlees" },
                  { to: "/assortiment#rundvlees", label: "Rundvlees" },
                  { to: "/assortiment#kip", label: "Kip" },
                  { to: "/assortiment#eindproducten", label: "Eindproducten" },
                ].map((l) => (
                  <li key={l.to}>
                    <a
                      href={l.to}
                      className="group inline-flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-primary"
                    >
                      <span className="text-primary">›</span>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Voor wie
              </h4>
              <ul className="mt-5 space-y-3">
                {[
                  { to: "/#slagerijen", label: "Slagerijen" },
                  { to: "/#groothandels", label: "Groothandels" },
                  { to: "/#supermarkten", label: "Supermarkten" },
                  { to: "/#restaurants", label: "Restaurants" },
                ].map((l, idx) => (
                  <li key={`${l.label}-${idx}`}>
                    <a
                      href={l.to}
                      className="group inline-flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-primary"
                    >
                      <span className="text-primary">›</span>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Contact
            </h4>

            <address className="mt-5 space-y-4 not-italic">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-primary" />
                <div className="text-sm text-foreground/80">
                  <p>Buys Ballotstraat 7</p>
                  <p>3846 BG Harderwijk</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-primary" />
                <a
                  href="tel:+31627273763"
                  className="text-sm text-foreground/80 transition-colors hover:text-primary"
                >
                  06 - 272 737 63
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-primary" />
                <a
                  href="mailto:info@ipekcislachterij.nl"
                  className="text-sm text-foreground/80 transition-colors hover:text-primary"
                >
                  info@ipekcislachterij.nl
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Clock size={18} className="mt-0.5 shrink-0 text-primary" />
                <div className="text-sm text-foreground/80">
                  <p>Ma–Vr 08:00 – 17:00</p>
                  <p>Za 08:00 – 14:00 · Zo gesloten</p>
                </div>
              </div>
            </address>

            <div className="mt-8 flex items-center gap-5">
              <a
                href="http://maps.google.com/maps?q=loc:52.3606892,5.6383247"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-white/10 bg-white/[0.03] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/85 transition-colors hover:border-white/20 hover:bg-white/[0.06]"
              >
                Route
                <ArrowUpRight size={14} className="text-primary" />
              </a>
            </div>

            <div className="mt-10">
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Certificaten
              </h4>
              <div className="mt-4 flex items-center gap-3">
                <img
                  src={HALAL_BADGE_URL}
                  alt="Halal"
                  className="h-12 w-auto opacity-90"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-white/5 pt-8 md:flex-row md:items-center">
          <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            © {new Date().getFullYear()} Ipekci Slachterij Harderwijk
          </div>
          <div className="flex flex-wrap items-center gap-6 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <a href="/#quality" className="transition-colors hover:text-foreground">
              Halal & kwaliteit
            </a>
            <a href="/#products" className="transition-colors hover:text-foreground">
              Producten
            </a>
            <a href="/assortiment" className="transition-colors hover:text-foreground">
              Assortiment
            </a>
            <a href="/contact" className="transition-colors hover:text-foreground">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
