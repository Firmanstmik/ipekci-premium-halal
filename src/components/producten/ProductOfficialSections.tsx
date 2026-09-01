import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, ChevronDown, Package, Snowflake, Star, Tag } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { RollingCounter } from "@/components/RollingCounter";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DualCtaRow } from "@/components/ui/DualCtaRow";
import { DS_EASE_REVEAL } from "@/lib/design-system";
import {
  PRODUCT_ASSURANCES,
  PRODUCT_REGISTRATION,
  PRODUCT_STATS,
  PRODUCTEN_RATING,
  type Product,
} from "@/lib/producten-content";

/* ── Star rating (official 4.5) ─────────────────────────────── */

function LuxLinkButtonInline({
  to,
  children,
  dark = false,
}: {
  to: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`lux-btn inline-flex min-h-[44px] items-center gap-2 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em]${dark ? " lux-btn--dark" : ""}`}
    >
      <span className="relative">{children}</span>
      <ArrowUpRight size={13} className="lux-btn__arrow relative shrink-0" />
    </Link>
  );
}

export function ProductStarRating({ className = "" }: { className?: string }) {
  const full = Math.floor(PRODUCTEN_RATING.score);
  const half = PRODUCTEN_RATING.score - full >= 0.5;

  return (
    <div className={`inline-flex flex-wrap items-center gap-2.5 ${className}`}>
      <span className="flex items-center gap-0.5" aria-hidden>
        {Array.from({ length: PRODUCTEN_RATING.max }).map((_, i) => {
          const filled = i < full || (i === full && half);
          return (
            <Star
              key={i}
              size={13}
              className={filled ? "fill-[#DA292A] text-[#DA292A]" : "fill-white/10 text-white/20"}
              strokeWidth={1.5}
            />
          );
        })}
      </span>
      <span className="text-[11px] font-medium tracking-[0.06em] text-white/55">
        {PRODUCTEN_RATING.label}
      </span>
    </div>
  );
}

export function ProductStarRatingLight({ className = "" }: { className?: string }) {
  const full = Math.floor(PRODUCTEN_RATING.score);
  const half = PRODUCTEN_RATING.score - full >= 0.5;

  return (
    <div className={`inline-flex flex-wrap items-center gap-2.5 ${className}`}>
      <span className="flex items-center gap-0.5" aria-hidden>
        {Array.from({ length: PRODUCTEN_RATING.max }).map((_, i) => {
          const filled = i < full || (i === full && half);
          return (
            <Star
              key={i}
              size={13}
              className={filled ? "fill-[#DA292A] text-[#DA292A]" : "fill-[#141414]/08 text-[#141414]/15"}
              strokeWidth={1.5}
            />
          );
        })}
      </span>
      <span className="text-[11px] font-medium tracking-[0.06em] text-[#141414]/55">
        {PRODUCTEN_RATING.label}
      </span>
    </div>
  );
}

/* ── Registration modal (official B2B gate) ─────────────────── */

export function ProductRegistrationModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  function handleClose(next: boolean) {
    if (!next) setSubmitted(false);
    onOpenChange(next);
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg overflow-hidden rounded-[24px] border border-black/[0.08] bg-[#FAFAF8] p-0 shadow-[0_40px_100px_-32px_rgba(0,0,0,0.45)]">
        <div className="border-b border-black/[0.06] px-7 py-6 sm:px-8 sm:py-7">
          <DialogHeader className="space-y-3 text-left">
            <DialogTitle className="font-display text-[clamp(1.75rem,3vw,2.25rem)] leading-tight text-[#141414]">
              {PRODUCT_REGISTRATION.title}
            </DialogTitle>
            <DialogDescription className="text-[14px] leading-[1.75] text-[#5a5a5a]">
              {PRODUCT_REGISTRATION.lede}
            </DialogDescription>
          </DialogHeader>
        </div>

        {submitted ? (
          <div className="space-y-5 px-7 py-8 sm:px-8">
            <p className="text-[15px] leading-[1.8] text-[#454545]">{PRODUCT_REGISTRATION.success}</p>
            <Link
              to="/contact"
              className="lux-btn inline-flex min-h-[44px] items-center gap-2 rounded-full px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em]"
              onClick={() => handleClose(false)}
            >
              Naar contact
              <ArrowUpRight size={13} />
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-0 px-7 py-6 sm:px-8 sm:py-7">
            <div className="grid gap-5 sm:grid-cols-2">
              {PRODUCT_REGISTRATION.fields.map((field) => (
                <label
                  key={field.id}
                  className={`block ${field.fullWidth ? "sm:col-span-2" : ""}`}
                >
                  <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#141414]/45">
                    {field.label}
                  </span>
                  <input
                    type={field.type}
                    name={field.id}
                    required={field.required}
                    className="w-full border-0 border-b border-[#141414]/15 bg-transparent pb-2.5 text-[15px] text-[#141414] outline-none transition-colors focus:border-[#B31217]/55"
                  />
                </label>
              ))}
            </div>
            <div className="flex justify-end pt-6">
              <button
                type="submit"
                className="ipek-btn-premium min-h-[44px] px-8 py-3.5 text-[11px] tracking-[0.2em]"
              >
                <span className="relative z-[1]">{PRODUCT_REGISTRATION.cta}</span>
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function ProductRegistrationCta({
  className = "",
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const [open, setOpen] = useState(false);
  const isDark = tone === "dark";

  return (
    <div className={className}>
      <DualCtaRow wide className="flex-wrap">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="ipek-btn-premium min-h-[44px] px-7 py-3.5 text-[11px] tracking-[0.2em] sm:px-9 sm:py-4 sm:text-[12px]"
        >
          <span className="relative z-[1] inline-flex items-center gap-2.5">
            {PRODUCT_REGISTRATION.cta}
            <ArrowUpRight size={15} className="ipek-btn-premium__arrow shrink-0" />
          </span>
        </button>
        <LuxLinkButtonInline to="/contact" dark={isDark}>
          {PRODUCT_REGISTRATION.quoteCta}
        </LuxLinkButtonInline>
      </DualCtaRow>
      <p
        className={`mt-4 inline-flex items-center gap-2 text-[12px] leading-relaxed ${
          isDark ? "text-white/58" : "text-[#141414]/50"
        }`}
      >
        <Check size={14} className={`shrink-0 ${isDark ? "text-[#C6A062]" : "text-[#B31217]/70"}`} aria-hidden />
        {PRODUCT_REGISTRATION.pricingNote}
      </p>
      <ProductRegistrationModal open={open} onOpenChange={setOpen} />
    </div>
  );
}

/* ── Official product catalog list (category pages) ─────────── */

function ProductCatalogRow({ product, index }: { product: Product; index: number }) {
  const [open, setOpen] = useState(false);
  const chips = [
    product.packaging && { icon: Package, label: product.packaging },
    product.state && { icon: Snowflake, label: product.state },
    product.variantNote && { icon: Tag, label: product.variantNote },
  ].filter(Boolean) as { icon: typeof Package; label: string }[];

  const hasBody = product.paragraphs.length > 0 || chips.length > 0;

  return (
    <motion.li
      initial={{ opacity: 0, x: 12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-4%" }}
      transition={{ duration: 0.65, delay: (index % 6) * 0.05, ease: DS_EASE_REVEAL }}
      className="group"
    >
      <div className="overflow-hidden rounded-[18px] border border-[#141414]/08 bg-white/80 shadow-[0_16px_48px_-32px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-all duration-300 hover:border-[#B31217]/20 hover:bg-white hover:shadow-[0_24px_60px_-28px_rgba(179,18,23,0.15)]">
        {hasBody ? (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex w-full min-h-[44px] items-center gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
            aria-expanded={open}
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[linear-gradient(145deg,#B31217,#DA292A)] text-white shadow-[0_8px_24px_-8px_rgba(179,18,23,0.55)]">
              <ArrowUpRight size={14} className={`transition-transform duration-300 ${open ? "rotate-90" : ""}`} />
            </span>
            <span className="flex-1 font-display text-[1.05rem] leading-snug text-[#141414] sm:text-[1.12rem]">
              {product.name}
            </span>
            <ChevronDown
              size={16}
              className={`shrink-0 text-[#141414]/35 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            />
          </button>
        ) : (
          <div className="flex min-h-[44px] items-center gap-4 px-5 py-4 sm:px-6 sm:py-5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[linear-gradient(145deg,#B31217,#DA292A)] text-white shadow-[0_8px_24px_-8px_rgba(179,18,23,0.55)]">
              <ArrowUpRight size={14} />
            </span>
            <span className="font-display text-[1.05rem] leading-snug text-[#141414] sm:text-[1.12rem]">
              {product.name}
            </span>
          </div>
        )}

        {open && hasBody && (
          <div className="border-t border-[#141414]/06 px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
            {product.paragraphs.length > 0 ? (
              <div className="space-y-3">
                {product.paragraphs.map((p, i) => (
                  <p key={i} className="text-[13.5px] leading-[1.75] text-[#5a5a5a]">
                    {p}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-[13.5px] leading-[1.75] text-[#141414]/45">
                Op aanvraag leverbaar. Neem contact op voor specificaties en hoeveelheden.
              </p>
            )}
            {chips.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {chips.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#141414]/10 bg-[#F8F4EE] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#141414]/65"
                  >
                    <Icon size={11} className="text-[#B31217]" />
                    {label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </motion.li>
  );
}

export function ProductCatalogList({
  products,
  id,
}: {
  products: readonly Product[];
  id?: string;
}) {
  return (
    <div id={id} className="relative">
      <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#141414]/42">
        {products.length} {products.length === 1 ? "product" : "producten"}
      </p>
      <ul className="space-y-3">
        {products.map((product, i) => (
          <ProductCatalogRow key={product.id} product={product} index={i} />
        ))}
      </ul>
    </div>
  );
}

/* ── Stats rail (official counters) ─────────────────────────── */

export function ProductStatsRail() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-[#F8F4EE] ipek-section">
      <div aria-hidden className="lux-hairline top-0 opacity-30" />
      <div className="relative ipek-container">
        <div className="pr-stats-rail__track grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {PRODUCT_STATS.items.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: DS_EASE_REVEAL }}
              className="relative overflow-hidden rounded-[22px] border border-[#141414]/08 bg-white/90 p-6 text-center shadow-[0_20px_60px_-40px_rgba(0,0,0,0.2)] backdrop-blur-sm sm:p-7"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(198,160,98,0.45),transparent)]"
              />
              <p className="font-display text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-none tracking-[-0.04em] text-[#141414]/75">
                <RollingCounter value={stat.value} />
                <span className="text-[#DA292A]">{stat.suffix}</span>
              </p>
              <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#141414]/45">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Quality assurances (index — official four cards) ───────── */

export function ProductAssurancesSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#030303] ipek-section grain">
      <div aria-hidden className="lux-ambient lux-ambient--dark" />
      <div aria-hidden className="lux-hairline top-0 opacity-20" />

      <div className="relative ipek-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.9, ease: DS_EASE_REVEAL }}
          className="max-w-2xl"
        >
          <p className="ipek-label ipek-heading-label text-[10px] tracking-[0.28em] text-[#DA292A]">
            Kwaliteitsgarantie
          </p>
          <h2 className="mt-4 font-display text-[clamp(2rem,3.5vw,3rem)] leading-[1.12] text-white">
            Waarom afnemers voor ons kiezen
          </h2>
        </motion.div>

        <div className="app-hscroll-track pr-assurances__track mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {PRODUCT_ASSURANCES.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6%" }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: DS_EASE_REVEAL }}
              className="lux-spec relative overflow-hidden rounded-[22px] border border-white/[0.08] bg-[linear-gradient(165deg,rgba(255,255,255,0.05)_0%,rgba(10,10,10,0.85)_100%)] p-6 backdrop-blur-sm lg:p-7"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-[rgba(179,18,23,0.25)] bg-[rgba(179,18,23,0.1)] font-display text-[11px] font-semibold text-[#DA292A]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 font-display text-[1.2rem] leading-tight text-white">{item.title}</h3>
              <div
                aria-hidden
                className="mt-3.5 h-px w-full bg-[linear-gradient(90deg,rgba(179,18,23,0.34),rgba(255,255,255,0.08)_40%,transparent)]"
              />
              <p className="mt-3.5 text-[13px] leading-[1.7] text-white/58">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
