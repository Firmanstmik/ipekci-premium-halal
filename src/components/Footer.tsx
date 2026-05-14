import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-background">
      {/* Massive wordmark backdrop */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-10 select-none text-center">
        <div className="font-display text-[clamp(8rem,22vw,22rem)] font-bold leading-none tracking-tight text-foreground/[0.04]">
          NORDLINK
        </div>
      </div>

      <div className="relative mx-auto max-w-[1480px] px-6 pt-24 pb-10 lg:px-10">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
              Klaar om te verzenden?
            </p>
            <h3 className="mt-4 font-display text-4xl text-foreground md:text-6xl">
              Laten we uw <br /> logistiek vereenvoudigen.
            </h3>
            <Link
              to="/contact"
              className="group mt-8 inline-flex items-center gap-3 border-b border-primary pb-1 text-sm font-medium uppercase tracking-[0.2em] text-foreground transition-colors hover:text-primary"
            >
              Plan een gesprek
              <ArrowUpRight
                size={16}
                className="text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-10 md:col-span-7 md:grid-cols-3">
            <div>
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Diensten
              </h4>
              <ul className="mt-5 space-y-3 text-sm text-foreground/80">
                <li><Link to="/services" className="hover:text-primary">Wegtransport</Link></li>
                <li><Link to="/services" className="hover:text-primary">Warehousing</Link></li>
                <li><Link to="/services" className="hover:text-primary">Intermodaal</Link></li>
                <li><Link to="/services" className="hover:text-primary">Express koerier</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Bedrijf
              </h4>
              <ul className="mt-5 space-y-3 text-sm text-foreground/80">
                <li><Link to="/about" className="hover:text-primary">Over Nordlink</Link></li>
                <li><Link to="/about" className="hover:text-primary">Duurzaamheid</Link></li>
                <li><Link to="/contact" className="hover:text-primary">Carrières</Link></li>
                <li><Link to="/contact" className="hover:text-primary">Pers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Hoofdkantoor
              </h4>
              <address className="mt-5 space-y-2 text-sm not-italic text-foreground/80">
                <p>Waalhaven Z.z. 19<br />3088 HH Rotterdam</p>
                <p className="pt-2">+31 (0)10 244 18 00</p>
                <p>contact@nordlink.nl</p>
              </address>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-white/5 pt-8 md:flex-row md:items-center">
          <Logo />
          <div className="flex flex-wrap items-center gap-6 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <span>© {new Date().getFullYear()} Nordlink B.V.</span>
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Voorwaarden</a>
            <a href="#" className="hover:text-foreground">KvK 12345678</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
