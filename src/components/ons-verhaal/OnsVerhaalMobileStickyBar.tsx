import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Package } from "lucide-react";
import { useEffect, useState } from "react";

export function OnsVerhaalMobileStickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.45);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("ons-verhaal-bar-visible", visible);
    return () => document.body.classList.remove("ons-verhaal-bar-visible");
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="pr-mobile-action-bar fixed inset-x-0 bottom-0 z-50 md:hidden" role="region" aria-label="Snelle acties">
      <div className="pr-mobile-action-bar__inner mx-auto max-w-lg">
        <Link
          to="/producten"
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.06] px-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/88"
        >
          <Package size={14} className="shrink-0 text-[#C6A062]" aria-hidden />
          Producten
        </Link>
        <Link
          to="/contact"
          className="ipek-btn-premium inline-flex min-h-[44px] items-center justify-center gap-2 px-3 text-[9px] tracking-[0.16em]"
        >
          <span className="relative z-[1] inline-flex items-center gap-1.5">
            Contact
            <ArrowUpRight size={13} className="ipek-btn-premium__arrow shrink-0" />
          </span>
        </Link>
      </div>
    </div>
  );
}
