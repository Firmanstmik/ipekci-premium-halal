import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { ASSORTIMENT_MEGA_MENU, PRODUCTEN_MEGA_ITEMS } from "@/lib/assortiment-content";

/** Mobile accordion rows — full Ayat Food producten list */
export function AssortimentMobileLinks({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="flex flex-col gap-2.5 pb-2">
      {PRODUCTEN_MEGA_ITEMS.map((item) => (
        <a
          key={item.id}
          href={item.href}
          onClick={onNavigate}
          className="assortiment-mobile-link group flex gap-3.5 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3 transition-colors active:scale-[0.99] hover:border-white/14 hover:bg-white/[0.05]"
        >
          <div className="relative h-[64px] w-[64px] shrink-0 overflow-hidden rounded-xl">
            <img
              src={item.image}
              alt=""
              aria-hidden
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-black/25" />
          </div>
          <div className="min-w-0 flex-1 py-0.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[14px] font-medium tracking-[0.03em] text-white/90">
                {item.label}
              </span>
              <ArrowUpRight
                size={14}
                className="shrink-0 text-white/35 transition-colors group-hover:text-primary"
              />
            </div>
            <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-white/48">
              {item.description}
            </p>
          </div>
        </a>
      ))}

      <Link
        to={ASSORTIMENT_MEGA_MENU.allProductsHref}
        onClick={onNavigate}
        className="mt-1 inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/75 transition-colors hover:bg-white/[0.06] hover:text-white"
      >
        {ASSORTIMENT_MEGA_MENU.allProductsLabel}
        <ArrowUpRight size={14} className="text-primary" />
      </Link>
    </div>
  );
}
