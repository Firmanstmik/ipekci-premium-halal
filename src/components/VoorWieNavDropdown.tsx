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
  VOOR_WIE_MEGA_MENU,
  VOOR_WIE_SEGMENTS,
  type VoorWieSegment,
} from "@/lib/voor-wie-content";
import { DS_EASE } from "@/lib/design-system";

const GOLD = "rgba(226,192,141,";
const STICKER_FILTER =
  "sepia(1) saturate(520%) hue-rotate(352deg) brightness(0.66) contrast(1.12)";

export function VoorWieNavDropdown({
  active,
  open,
  onOpenChange,
}: {
  active: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [hovered, setHovered] = useState<VoorWieSegment>(VOOR_WIE_SEGMENTS[0]);

  useEffect(() => {
    if (open) setHovered(VOOR_WIE_SEGMENTS[0]);
  }, [open]);

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
          <span className="relative z-10">Voor wie</span>
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
          <div className="p-6">
            <div className="flex items-center justify-between gap-6">
              <div>
                <div className="text-[12px] font-medium tracking-[0.10em] text-foreground/55">
                  {VOOR_WIE_MEGA_MENU.eyebrow}
                </div>
                <div className="mt-2 font-display text-2xl text-foreground">
                  {VOOR_WIE_MEGA_MENU.title}.
                </div>
              </div>
              <div className="hidden h-px flex-1 bg-gradient-to-r from-white/0 via-white/10 to-white/0 lg:block" />
            </div>

            <div className="mt-6 grid gap-2">
              {VOOR_WIE_SEGMENTS.map((item) => {
                const isHovered = hovered.id === item.id;
                return (
                  <DropdownMenuItem key={item.href} asChild className="p-0 focus:bg-transparent">
                    <a
                      href={item.href}
                      onMouseEnter={() => setHovered(item)}
                      className={`group flex items-start gap-4 rounded-xl border px-4 py-3 transition-all duration-300 ${
                        isHovered
                          ? "border-white/14 bg-white/[0.06]"
                          : "border-transparent bg-transparent hover:border-white/10 hover:bg-white/[0.04]"
                      }`}
                    >
                      <span
                        className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border shadow-[0_18px_50px_-30px_rgba(0,0,0,0.9)] transition-colors duration-300 ${
                          isHovered
                            ? "border-primary/30 bg-primary/10"
                            : "border-white/10 bg-white/[0.03]"
                        }`}
                      >
                        <img
                          src={item.stickerSrc}
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
                          <span
                            className={`text-[12px] font-medium tracking-[0.06em] transition-colors duration-300 ${
                              isHovered
                                ? "text-foreground"
                                : "text-foreground/85 group-hover:text-foreground"
                            }`}
                          >
                            {item.label}
                          </span>
                          <ArrowUpRight
                            size={14}
                            className={`shrink-0 transition-all duration-300 ${
                              isHovered
                                ? "translate-x-0.5 -translate-y-0.5 text-primary"
                                : "text-foreground/45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                            }`}
                          />
                        </span>
                        <span className="mt-1 block text-xs leading-relaxed text-foreground/55">
                          {item.description}
                        </span>
                      </span>
                    </a>
                  </DropdownMenuItem>
                );
              })}
            </div>
          </div>

          <div className="relative border-l border-white/10 bg-white/[0.02] p-6">
            <div className="text-[12px] font-medium tracking-[0.10em] text-foreground/55">
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
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/65" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.08, ease: DS_EASE }}
                        className="font-display text-2xl text-white"
                      >
                        {hovered.label}
                      </motion.div>
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.14, ease: DS_EASE }}
                        className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/72"
                      >
                        {hovered.eyebrow}
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.2, ease: DS_EASE }}
                        className="mt-4"
                      >
                        <a
                          href={hovered.href}
                          className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/95 px-4 py-2.5 text-[12px] font-semibold tracking-[0.06em] text-[#111] transition-all duration-300 hover:bg-white"
                        >
                          {VOOR_WIE_MEGA_MENU.ctaLabel}
                          <ArrowUpRight size={14} className="text-primary" />
                        </a>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <a
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/55 transition-colors hover:text-primary"
            >
              Word klant
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
