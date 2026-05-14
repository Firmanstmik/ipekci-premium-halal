import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-6 max-w-sm text-sm text-muted-foreground">
              Nationwide freight and logistics solutions engineered for reliability,
              speed, and transparency at every mile.
            </p>
          </div>
          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-foreground">
              Company
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground">About</Link></li>
              <li><Link to="/services" className="hover:text-foreground">Services</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-foreground">
              Contact
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>1-800-VECTOR-1</li>
              <li>hello@vectortransit.com</li>
              <li>Chicago, IL</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Vector Transit. All rights reserved.</p>
          <p>Built for shippers who don't compromise.</p>
        </div>
      </div>
    </footer>
  );
}
