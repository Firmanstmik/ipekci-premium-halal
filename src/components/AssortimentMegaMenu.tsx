import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import {
  ASSORTIMENT_CATEGORIES,
  ASSORTIMENT_MEGA_MENU,
} from "@/lib/assortiment-content";

/** Mobile accordion rows — image + copy from official assortiment menu */
export function AssortimentMobileLinks({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="flex flex-col gap-3 pb-2">
      {ASSORTIMENT_CATEGORIES.map((item) => (
        <a
          key={item.id}
          href={item.href}
          onClick={onNavigate}
          className="group flex gap-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3 transition-colors hover:border-white/14 hover:bg-white/[0.05]"
        >
          <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl">
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
              <span className="text-[15px] font-medium tracking-[0.03em] text-white/88">
                {item.label}
              </span>
              <ArrowUpRight
                size={14}
                className="shrink-0 text-white/35 transition-colors group-hover:text-[rgba(226,192,141,0.9)]"
              />
            </div>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/48">
              {item.description}
            </p>
            <span className="mt-2 inline-flex text-[9px] font-semibold uppercase tracking-[0.2em] text-[rgba(226,192,141,0.8)]">
              {ASSORTIMENT_MEGA_MENU.ctaLabel}
            </span>
          </div>
        </a>
      ))}

      <Link
        to={ASSORTIMENT_MEGA_MENU.allProductsHref}
        onClick={onNavigate}
        className="mt-1 inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/75 transition-colors hover:bg-white/[0.06] hover:text-white"
      >
        {ASSORTIMENT_MEGA_MENU.allProductsLabel}
        <ArrowUpRight size={14} className="text-[rgba(226,192,141,0.9)]" />
      </Link>
    </div>
  );
}
