import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Award,
  ClipboardCheck,
  Clock,
  Gem,
  Package,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Truck,
} from "lucide-react";
import type { OnsVerhaalHighlight } from "@/lib/ons-verhaal-content";
import { ONS_VERHAAL_HIGHLIGHTS } from "@/lib/ons-verhaal-content";
import { DS_EASE_REVEAL } from "@/lib/design-system";

const LUXURY_SHELL = "rounded-[1.35rem_0.85rem_1.5rem_0.95rem] sm:rounded-[1.5rem_0.95rem_1.65rem_1.05rem]";
const PILL_ICONS: Record<string, typeof ShieldCheck> = {
  halal: ShieldCheck,
  nvwa: Gem,
  levering: Truck,
  controle: ClipboardCheck,
  koel: Snowflake,
  veilig: Package,
  tijd: Clock,
  ecc: Award,
};

function HighlightCard({
  item,
  index,
  reduceMotion,
}: {
  item: OnsVerhaalHighlight;
  index: number;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: 0.85, delay: index * 0.08, ease: DS_EASE_REVEAL }}
      className={`group relative min-h-[280px] overflow-hidden border border-[rgba(226,192,141,0.32)] bg-[#0a0a0a] shadow-[0_24px_70px_-32px_rgba(0,0,0,0.65)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[rgba(226,192,141,0.55)] hover:shadow-[0_32px_90px_-28px_rgba(0,0,0,0.75)] sm:min-h-[300px] ${LUXURY_SHELL}`}
    >
      <img
        src={item.image}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.35s] ease-[cubic-bezier(.22,.61,.36,1)] group-hover:scale-[1.05]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.15)_0%,rgba(8,8,8,0.35)_42%,rgba(8,8,8,0.92)_78%,#0a0a0a_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_18%_0%,rgba(226,192,141,0.08),transparent_55%)]" />

      <span className="absolute left-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-[rgba(226,192,141,0.45)] bg-black/50 font-display text-[11px] tabular-nums tracking-[0.12em] text-white/90 backdrop-blur-sm">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative flex h-full min-h-[280px] flex-col justify-end p-5 sm:min-h-[300px] sm:p-6">
        <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[rgba(226,192,141,0.9)]">
          {item.eyebrow}
        </p>
        <h3 className="mt-2 font-display text-[clamp(1.35rem,2.8vw,1.75rem)] font-semibold leading-tight text-white">
          {item.titlePrefix}{" "}
          <span className="italic text-[rgba(226,192,141,0.95)]">{item.titleAccent}</span>
        </h3>
        <p className="mt-2 line-clamp-2 max-w-[95%] text-[12px] leading-[1.65] text-white/58 sm:text-[13px]">
          {item.description}
        </p>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
          <ul className="flex flex-wrap gap-x-3 gap-y-2 sm:gap-x-4">
            {item.pills.map((pill) => {
              const Icon = PILL_ICONS[pill.id] ?? ShieldCheck;
              return (
                <li key={pill.id} className="flex items-center gap-2">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-[rgba(226,192,141,0.28)] bg-black/35 text-[rgba(226,192,141,0.88)]">
                    <Icon size={13} strokeWidth={1.5} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[8px] font-semibold uppercase tracking-[0.14em] text-[rgba(226,192,141,0.88)]">
                      {pill.title}
                    </span>
                    <span className="block text-[9px] text-white/42">{pill.subtitle}</span>
                  </span>
                </li>
              );
            })}
          </ul>

          <Link
            to={item.href}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[rgba(226,192,141,0.45)] bg-black/40 text-[rgba(226,192,141,0.92)] backdrop-blur-sm transition-all duration-300 hover:border-[rgba(226,192,141,0.75)] hover:bg-[rgba(226,192,141,0.12)] hover:text-white"
            aria-label={`Lees meer over ${item.titlePrefix} ${item.titleAccent}`}
          >
            <ArrowUpRight size={16} strokeWidth={1.75} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

function HighlightAppCard({ item, index }: { item: OnsVerhaalHighlight; index: number }) {
  return (
    <li className="ons-highlights-app__card">
      <div className="ons-highlights-app__card-media">
        <img src={item.image} alt="" aria-hidden loading="lazy" decoding="async" />
        <div className="ons-highlights-app__card-scrim" aria-hidden />
        <span className="ons-highlights-app__card-num" aria-hidden>
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="ons-highlights-app__card-body">
        <p className="ons-highlights-app__card-eyebrow">{item.eyebrow}</p>
        <h3 className="ons-highlights-app__card-title">
          {item.titlePrefix}{" "}
          <span className="italic text-[rgba(226,192,141,0.95)]">{item.titleAccent}</span>
        </h3>
        <p className="ons-highlights-app__card-text">{item.description}</p>

        <ul className="ons-highlights-app__pills">
          {item.pills.map((pill) => {
            const Icon = PILL_ICONS[pill.id] ?? ShieldCheck;
            return (
              <li key={pill.id} className="ons-highlights-app__pill">
                <span className="ons-highlights-app__pill-icon" aria-hidden>
                  <Icon size={12} strokeWidth={1.5} />
                </span>
                <span className="ons-highlights-app__pill-copy">
                  <span className="ons-highlights-app__pill-title">{pill.title}</span>
                  <span className="ons-highlights-app__pill-sub">{pill.subtitle}</span>
                </span>
              </li>
            );
          })}
        </ul>

        <Link to={item.href} className="ons-highlights-app__link">
          Lees meer
          <ArrowUpRight size={14} strokeWidth={1.75} />
        </Link>
      </div>
    </li>
  );
}

export function OnsVerhaalHighlightsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-label="Waarom Ayat Food" className="relative isolate overflow-hidden bg-[#050505] py-14 grain sm:py-16 lg:py-20">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(179,18,23,0.08),transparent_58%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(226,192,141,0.3),transparent)]" />
      </div>

      <div className="ipek-container relative">
        {/* Mobile luxury app */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.95, ease: DS_EASE_REVEAL }}
          className="ons-highlights-app lg:hidden"
        >
          <div className="ons-highlights-app__header">
            <span className="ons-highlights-app__eyebrow">
              <Sparkles size={14} strokeWidth={1.75} aria-hidden />
              Waarom Ayat Food
            </span>
            <p className="ons-highlights-app__lede mt-4">
              Premium kwaliteit, strikte controle en betrouwbare levering — elke dag opnieuw.
            </p>
          </div>

          <ul className="ons-highlights-app__track" aria-label="Waarom Ayat Food">
            {ONS_VERHAAL_HIGHLIGHTS.map((item, i) => (
              <HighlightAppCard key={item.id} item={item} index={i} />
            ))}
          </ul>
        </motion.div>

        {/* Desktop grid */}
        <div className="hidden lg:block">
          <span
            aria-hidden
            className="pointer-events-none absolute -right-2 top-0 hidden select-none font-display text-[clamp(5rem,12vw,8rem)] font-semibold leading-none tracking-[-0.06em] text-white/[0.03] lg:block"
          >
            05
          </span>

          <div className="ons-highlights__track grid gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-5">
            {ONS_VERHAAL_HIGHLIGHTS.map((item, i) => (
              <HighlightCard key={item.id} item={item} index={i} reduceMotion={reduceMotion} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
