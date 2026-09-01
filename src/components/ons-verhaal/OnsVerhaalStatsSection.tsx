import { motion, useReducedMotion } from "framer-motion";
import { Award, Clock, Gem, Headphones, ShieldCheck, Users, Weight } from "lucide-react";
import { AyatSectionBadge } from "@/components/home/AyatSectionBadge";
import { RollingCounter } from "@/components/RollingCounter";
import { ONS_VERHAAL_STATS } from "@/lib/ons-verhaal-content";
import { DS_EASE_REVEAL } from "@/lib/design-system";

const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;
const LUXURY_SHELL = "rounded-[1.65rem_0.95rem_1.85rem_1.05rem] sm:rounded-[1.85rem_1rem_2rem_1.15rem]";
const STAT_ICONS = [Award, Weight, Users, Users] as const;
const TRUST_ICONS = [ShieldCheck, Gem, Clock, Headphones] as const;

function StatCard({
  stat,
  index,
  reduceMotion,
}: {
  stat: (typeof ONS_VERHAAL_STATS.items)[number];
  index: number;
  reduceMotion: boolean | null;
}) {
  const Icon = STAT_ICONS[index] ?? Award;
  const accentGlow = index < 2;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: 0.9, delay: index * 0.09, ease: DS_EASE_REVEAL }}
      className={`group relative flex min-h-[220px] flex-col overflow-hidden border border-white/[0.08] bg-[linear-gradient(165deg,rgba(18,18,18,0.88)_0%,rgba(10,10,10,0.78)_100%)] p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-[rgba(226,192,141,0.28)] sm:min-h-[240px] sm:p-7 ${LUXURY_SHELL}`}
      aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[rgba(218,41,42,0.75)] to-transparent ${
          accentGlow ? "opacity-100" : "opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        }`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-4 bottom-0 h-8 bg-[radial-gradient(ellipse_80%_100%_at_50%_100%,rgba(218,41,42,0.22),transparent_70%)] blur-md ${
          accentGlow ? "opacity-100" : "opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        }`}
      />

      <div className="relative flex items-start justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/38">
          {String(index + 1).padStart(2, "0")} —{" "}
          <span className="text-white/72">
            {stat.value}
            {stat.suffix}
          </span>
        </p>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[rgba(226,192,141,0.28)] bg-[rgba(226,192,141,0.08)] text-[rgba(226,192,141,0.92)]">
          <Icon size={16} strokeWidth={1.5} />
        </span>
      </div>

      <p className="relative mt-5 flex items-baseline font-display text-[clamp(2.2rem,4.5vw,3rem)] font-semibold leading-none tracking-[-0.04em] text-[#F8F4EE]">
        <RollingCounter value={stat.value} />
        <span className="text-[#DA292A]">{stat.suffix}</span>
      </p>

      <p className="relative mt-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[rgba(226,192,141,0.88)]">
        {stat.label}
      </p>
      <p className="relative mt-2 text-[12px] leading-[1.65] text-white/52 sm:text-[13px]">{stat.description}</p>
    </motion.article>
  );
}

function StatAppCard({
  stat,
  index,
}: {
  stat: (typeof ONS_VERHAAL_STATS.items)[number];
  index: number;
}) {
  const Icon = STAT_ICONS[index] ?? Award;

  return (
    <li className="ons-stats-app__card">
      <div className="ons-stats-app__card-top">
        <p className="ons-stats-app__card-index">
          {String(index + 1).padStart(2, "0")}
        </p>
        <span className="ons-stats-app__card-icon" aria-hidden>
          <Icon size={16} strokeWidth={1.5} />
        </span>
      </div>
      <p className="ons-stats-app__card-value">
        <RollingCounter value={stat.value} />
        <span className="text-[#DA292A]">{stat.suffix}</span>
      </p>
      <p className="ons-stats-app__card-label">{stat.label}</p>
      <p className="ons-stats-app__card-text">{stat.description}</p>
    </li>
  );
}

function StatTrustAppItem({
  item,
  index,
}: {
  item: (typeof ONS_VERHAAL_STATS.trust.items)[number];
  index: number;
}) {
  const Icon = TRUST_ICONS[index] ?? ShieldCheck;

  return (
    <li className="ons-stats-app__trust-item">
      <span className="ons-stats-app__trust-icon" aria-hidden>
        <Icon size={15} strokeWidth={1.5} />
      </span>
      <p className="ons-stats-app__trust-title">{item.title}</p>
      <p className="ons-stats-app__trust-text">{item.description}</p>
    </li>
  );
}

export function OnsVerhaalStatsSection() {
  const reduceMotion = useReducedMotion();
  const { items, trust, heroImage, lede } = ONS_VERHAAL_STATS;

  return (
    <section
      aria-labelledby="ons-verhaal-stats-heading"
      className="ons-verhaal-stats relative isolate overflow-hidden bg-[#080808] grain"
    >
      {/* ── Mobile luxury app ── */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8%" }}
        transition={{ duration: 0.95, ease: DS_EASE_REVEAL }}
        className="ons-stats-app ipek-container relative z-10 py-14 lg:hidden"
      >
        <div className="ons-stats-app__sheet">
          <AyatSectionBadge kicker={ONS_VERHAAL_STATS.eyebrow} title="Ayat Food" tone="dark" />

          <h2
            id="ons-verhaal-stats-heading"
            className="ons-stats-app__title mt-5 font-display font-semibold leading-[1.06] tracking-[-0.03em] text-white"
          >
            {ONS_VERHAAL_STATS.titlePrefix}{" "}
            <span className="italic text-[rgba(226,192,141,0.95)]">{ONS_VERHAAL_STATS.titleAccent}</span>
          </h2>

          <p className="ons-stats-app__lede mt-4">{lede}</p>
        </div>

        <div className="ons-stats-app__hero">
          <img
            src={heroImage}
            alt="Ayat Food statistieken"
            loading="lazy"
            decoding="async"
            className="ons-stats-app__hero-img"
          />
          <div className="ons-stats-app__hero-scrim" aria-hidden />
        </div>

        <ul className="ons-stats-app__cards" aria-label="Statistieken">
          {items.map((stat, i) => (
            <StatAppCard key={stat.id} stat={stat} index={i} />
          ))}
        </ul>

        <ul className="ons-stats-app__trust" aria-label="Kwaliteitsgaranties">
          {trust.items.map((item, i) => (
            <StatTrustAppItem key={item.id} item={item} index={i} />
          ))}
        </ul>
      </motion.div>

      {/* ── Desktop cinematic ── */}
      <div className="relative hidden lg:block">
        <motion.div
          aria-hidden
          initial={reduceMotion ? false : { opacity: 0, scale: 1.03 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 1.2, ease: DS_EASE_REVEAL }}
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-full min-h-[720px] sm:min-h-[780px] lg:min-h-[820px]"
        >
          <div className="absolute inset-y-0 left-[20%] right-[calc(50%-50vw)] sm:left-[28%] lg:left-[38%] xl:left-[40%]">
            <img
              src={heroImage}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-[center_45%]"
              style={{ filter: "brightness(0.72) contrast(1.08) saturate(1.05)" }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#080808_0%,rgba(8,8,8,0.94)_18%,rgba(8,8,8,0.55)_38%,rgba(8,8,8,0.15)_58%,transparent_72%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_72%_45%,rgba(218,41,42,0.12),transparent_62%)]" />
            <div className="absolute inset-x-0 bottom-0 h-[50%] bg-[linear-gradient(to_top,#080808_0%,#080808_20%,rgba(8,8,8,0.92)_38%,rgba(8,8,8,0.45)_58%,transparent_82%)]" />
          </div>
        </motion.div>

        {!reduceMotion && (
          <>
            <div className="speerpunten-mist speerpunten-mist--a pointer-events-none absolute inset-0 z-[1]" aria-hidden />
            <div className="speerpunten-mist speerpunten-mist--b pointer-events-none absolute inset-0 z-[1]" aria-hidden />
          </>
        )}

        <span
          aria-hidden
          className="pointer-events-none absolute right-[5%] top-[14%] z-[2] hidden select-none font-display text-[clamp(7rem,16vw,11rem)] font-semibold leading-none tracking-[-0.06em] text-white/[0.035] lg:block xl:right-[8%]"
        >
          04
        </span>

        <p
          aria-hidden
          className="pointer-events-none absolute right-3 top-1/2 z-[2] hidden -translate-y-1/2 select-none text-[9px] font-semibold uppercase tracking-[0.32em] text-white/20 [writing-mode:vertical-rl] lg:block"
        >
          Ons verhaal
        </p>

        <div className="ipek-container relative z-10 pt-14 sm:pt-20 lg:pt-24">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 1, ease: DS_EASE_REVEAL }}
            className="max-w-xl lg:max-w-lg"
          >
            <AyatSectionBadge kicker={ONS_VERHAAL_STATS.eyebrow} title="Ayat Food" tone="dark" />

            <h2 className="mt-7 font-display text-[clamp(2.2rem,4.8vw,3.45rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white">
              {ONS_VERHAAL_STATS.titlePrefix}{" "}
              <span className="italic text-[rgba(226,192,141,0.95)]">{ONS_VERHAAL_STATS.titleAccent}</span>
            </h2>

            <div className="mt-5 flex items-center gap-3" aria-hidden>
              <span className="h-px w-10 bg-[linear-gradient(90deg,rgba(226,192,141,0.9),transparent)]" />
              <span className="h-1.5 w-1.5 rotate-45 border border-[rgba(226,192,141,0.55)] bg-[rgba(226,192,141,0.2)]" />
            </div>

            <p className="mt-5 max-w-md text-[14px] leading-[1.85] text-white/58 sm:text-[15px]">{lede}</p>
          </motion.div>

          <div aria-hidden className="ons-stats__spacer h-[220px] sm:h-[240px] lg:h-[260px]" />
        </div>

        <div className="ons-stats__cards-wrap ipek-container relative z-20 -mt-[220px] sm:-mt-[240px] lg:-mt-[260px]">
          <div className="ons-stats__cards grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {items.map((stat, i) => (
              <StatCard key={stat.id} stat={stat} index={i} reduceMotion={reduceMotion} />
            ))}
          </div>
        </div>

        <div className="relative z-10 border-t border-white/[0.06] bg-[#080808] pt-8 sm:pt-10 pb-14 sm:pb-20 lg:pb-24">
          <div className="ipek-container">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6%" }}
              transition={{ duration: 0.9, delay: 0.08, ease: LUXURY_EASE }}
              className="ons-stats__trust grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
            >
              {trust.items.map((item, i) => {
                const Icon = TRUST_ICONS[i] ?? ShieldCheck;
                return (
                  <div key={item.id} className="flex items-start gap-3 sm:gap-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[rgba(226,192,141,0.22)] bg-white/[0.04] text-[rgba(226,192,141,0.88)]">
                      <Icon size={16} strokeWidth={1.5} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[rgba(226,192,141,0.92)]">
                        {item.title}
                      </p>
                      <p className="mt-1 text-[12px] leading-snug text-white/48 sm:text-[13px]">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(226,192,141,0.35),transparent)]"
      />
    </section>
  );
}
