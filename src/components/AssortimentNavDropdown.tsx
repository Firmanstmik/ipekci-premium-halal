import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ASSORTIMENT_MEGA_MENU,
  PRODUCTEN_MEGA_ITEMS,
  type ProductenMegaItem,
} from "@/lib/assortiment-content";
import { DS_EASE } from "@/lib/design-system";

const GOLD = "rgba(240,215,168,";
const STICKER_FILTER = "sepia(1) saturate(520%) hue-rotate(352deg) brightness(0.66) contrast(1.12)";
const RED = "rgba(218,41,42,";

export function AssortimentNavDropdown({
  active,
  open,
  onOpenChange,
  scrolled = false,
}: {
  active: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scrolled?: boolean;
}) {
  const [hovered, setHovered] = useState<ProductenMegaItem>(PRODUCTEN_MEGA_ITEMS[0]);

  useEffect(() => {
    if (open) setHovered(PRODUCTEN_MEGA_ITEMS[0]);
  }, [open]);

  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange} modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          onMouseEnter={() => onOpenChange(true)}
          className={`group relative inline-flex items-center gap-1.5 bg-transparent px-5 py-4 text-[13px] font-medium tracking-[0.08em] outline-none transition-colors duration-200 focus:outline-none focus-visible:ring-0 xl:px-6 ${
            scrolled
              ? open || active
                ? "text-[#141414]"
                : "text-[#141414]/72 hover:text-[#141414]"
              : open || active
                ? "text-white"
                : "text-white/82 hover:text-white"
          }`}
        >
          <span className="relative z-10">Producten</span>
          <motion.span
            className="relative z-10"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.26, ease: DS_EASE }}
          >
            <ChevronDown size={13} className={scrolled ? "text-[#141414]/45" : "text-white/50"} />
          </motion.span>
          <span
            className={`absolute inset-x-5 -bottom-px h-px transition-transform duration-[360ms] ease-[cubic-bezier(.22,1,.36,1)] xl:inset-x-6 ${
              open || active ? "scale-x-100" : "origin-left scale-x-0 group-hover:scale-x-100"
            }`}
            style={{ background: scrolled ? `${RED}0.85)` : `${GOLD}0.72)` }}
            aria-hidden
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="center"
        sideOffset={12}
        onMouseEnter={() => onOpenChange(true)}
        onMouseLeave={() => onOpenChange(false)}
        className="mt-2 w-[min(920px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-white/10 bg-background/80 p-0 text-foreground shadow-[0_30px_90px_-40px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.9fr]">
          <div className="p-5 sm:p-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/90">
                  {ASSORTIMENT_MEGA_MENU.eyebrow}
                </div>
                <div className="mt-1.5 font-display text-[1.65rem] leading-none tracking-[-0.02em] text-foreground">
                  {ASSORTIMENT_MEGA_MENU.title}
                </div>
                <p className="mt-2 max-w-md text-[12px] leading-relaxed text-foreground/55">
                  {ASSORTIMENT_MEGA_MENU.subtitle}
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-1.5 sm:grid-cols-2">
              {PRODUCTEN_MEGA_ITEMS.map((item) => {
                const isHovered = hovered.id === item.id;
                return (
                  <DropdownMenuItem key={item.id} asChild className="p-0 focus:bg-transparent">
                    <a
                      href={item.href}
                      onMouseEnter={() => setHovered(item)}
                      className={`group flex items-start gap-3 rounded-xl border px-3 py-2.5 transition-all duration-300 ${
                        isHovered
                          ? "border-primary/25 bg-primary/[0.08]"
                          : "border-transparent bg-transparent hover:border-white/10 hover:bg-white/[0.04]"
                      }`}
                    >
                      <span
                        className={`grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-lg border transition-colors duration-300 ${
                          isHovered
                            ? "border-primary/35 bg-primary/15"
                            : "border-white/10 bg-white/[0.03]"
                        }`}
                      >
                        <img
                          src={item.image}
                          alt=""
                          aria-hidden
                          className="h-full w-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center justify-between gap-2">
                          <span
                            className={`text-[12px] font-semibold tracking-[0.04em] transition-colors duration-300 ${
                              isHovered
                                ? "text-foreground"
                                : "text-foreground/88 group-hover:text-foreground"
                            }`}
                          >
                            {item.label}
                          </span>
                          <ArrowUpRight
                            size={13}
                            className={`shrink-0 transition-all duration-300 ${
                              isHovered
                                ? "translate-x-0.5 -translate-y-0.5 text-primary"
                                : "text-foreground/40 group-hover:text-primary"
                            }`}
                          />
                        </span>
                        <span className="mt-0.5 block line-clamp-2 text-[11px] leading-snug text-foreground/50">
                          {item.description}
                        </span>
                      </span>
                    </a>
                  </DropdownMenuItem>
                );
              })}
            </div>
          </div>

          <div className="relative hidden border-l border-white/10 bg-white/[0.02] p-5 sm:p-6 lg:block">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/50">
              Uitgelicht
            </div>
            <div className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
              <div className="relative aspect-[4/3] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={hovered.id}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.45, ease: DS_EASE }}
                    className="absolute inset-0"
                  >
                    <img
                      src={hovered.previewImage}
                      alt=""
                      aria-hidden
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/20 to-black/75" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.06, ease: DS_EASE }}
                        className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary"
                      >
                        {hovered.eyebrow}
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.1, ease: DS_EASE }}
                        className="mt-1 font-display text-2xl text-white"
                      >
                        {hovered.label}
                      </motion.div>
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.14, ease: DS_EASE }}
                        className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/72"
                      >
                        {hovered.description}
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.2, ease: DS_EASE }}
                        className="mt-4"
                      >
                        <a
                          href={hovered.href}
                          className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#111] transition-all duration-300 hover:bg-[#da292a] hover:text-white"
                        >
                          {ASSORTIMENT_MEGA_MENU.ctaLabel}
                          <ArrowUpRight size={14} />
                        </a>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <a
              href={ASSORTIMENT_MEGA_MENU.allProductsHref}
              className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/55 transition-colors hover:text-primary"
            >
              {ASSORTIMENT_MEGA_MENU.allProductsLabel}
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
