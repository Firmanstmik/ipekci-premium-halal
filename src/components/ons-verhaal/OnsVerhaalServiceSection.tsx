import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Award, Clock, Phone, ShieldCheck, Truck } from "lucide-react";
import { AyatSectionBadge } from "@/components/home/AyatSectionBadge";
import { DualCtaRow } from "@/components/ui/DualCtaRow";
import { ImageFrameOverlay } from "@/components/ui/premium-frame";
import { ONS_VERHAAL_SERVICE, ONS_VERHAAL_SERVICE_IMAGE } from "@/lib/ons-verhaal-content";
import { DS_EASE_REVEAL } from "@/lib/design-system";

const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;
const PILLAR_ICONS = [ShieldCheck, Award, Truck] as const;

function ServicePillarCard({
  pillar,
  index,
}: {
  pillar: (typeof ONS_VERHAAL_SERVICE.pillars)[number];
  index: number;
}) {
  const Icon = PILLAR_ICONS[index] ?? ShieldCheck;

  return (
    <li className="ons-service-app__pillar">
      <span className="ons-service-app__pillar-icon" aria-hidden>
        <Icon size={17} strokeWidth={1.65} />
      </span>
      <p className="ons-service-app__pillar-title">{pillar.title}</p>
      <p className="ons-service-app__pillar-text">{pillar.description}</p>
    </li>
  );
}

export function OnsVerhaalServiceSection() {
  const reduceMotion = useReducedMotion();
  const { pillars, wagenpark, ctas } = ONS_VERHAAL_SERVICE;

  return (
    <section
      aria-labelledby="ons-verhaal-service-heading"
      className="ons-verhaal-service relative isolate overflow-hidden bg-[#080808] py-14 grain sm:py-20 lg:py-24"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_15%_0%,rgba(179,18,23,0.14),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_85%_100%,rgba(226,192,141,0.08),transparent_55%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(226,192,141,0.35),transparent)]" />
      </div>

      <div className="relative ipek-container">
        {/* ── Mobile luxury app modules ── */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.95, ease: DS_EASE_REVEAL }}
          className="ons-service-app lg:hidden"
        >
          <div className="ons-service-app__sheet">
            <AyatSectionBadge kicker="Over ons" title="Ayat Food" tone="dark" />

            <h2
              id="ons-verhaal-service-heading"
              className="ons-service-app__title mt-5 font-display font-semibold leading-[1.02] tracking-[-0.03em]"
            >
              <span className="text-[#DA292A]">{ONS_VERHAAL_SERVICE.titleAccent}</span>{" "}
              <span className="text-white">{ONS_VERHAAL_SERVICE.titleRest}</span>
            </h2>

            <p className="ons-service-app__tagline mt-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[rgba(226,192,141,0.9)]">
              {ONS_VERHAAL_SERVICE.tagline}
            </p>
          </div>

          <div className="ons-service-app__lead">
            <span className="ons-service-app__lead-icon" aria-hidden>
              <Clock size={20} strokeWidth={1.75} />
            </span>
            <p>{ONS_VERHAAL_SERVICE.paragraphs[0]}</p>
          </div>

          <ul className="ons-service-app__pillars" aria-label="Service voordelen">
            {pillars.map((pillar, i) => (
              <ServicePillarCard key={pillar.id} pillar={pillar} index={i} />
            ))}
          </ul>

          <div className="ons-service-app__media">
            <img
              src={ONS_VERHAAL_SERVICE_IMAGE}
              alt="Ayat Food vleesgroothandel — 24/7 service"
              loading="lazy"
              decoding="async"
              className="ons-service-app__media-img"
            />
            <div className="ons-service-app__media-scrim" aria-hidden />
            <ImageFrameOverlay variant="aurora" />

            <div className="ons-service-app__wagenpark">
              <div className="ons-service-app__wagenpark-thumbs">
                {wagenpark.thumbnails.map((thumb, i) => (
                  <div key={i} className="ons-service-app__wagenpark-thumb">
                    <img src={thumb} alt="" aria-hidden loading="lazy" decoding="async" />
                  </div>
                ))}
              </div>
              <div className="min-w-0 flex-1">
                <p className="ons-service-app__wagenpark-label">{wagenpark.title}</p>
                <p className="ons-service-app__wagenpark-text">{wagenpark.description}</p>
              </div>
              <span className="ons-service-app__wagenpark-badge" aria-hidden>
                <Truck size={15} strokeWidth={1.75} />
              </span>
            </div>
          </div>

          <div className="ons-service-app__actions">
            <DualCtaRow wide>
              <Link
                to={ctas.primary.to}
                className="ipek-btn-premium inline-flex min-h-[44px] items-center justify-center gap-2 px-5 text-[10px] tracking-[0.18em]"
              >
                <span className="relative z-[1] inline-flex items-center gap-2">
                  {ctas.primary.label}
                  <ArrowUpRight size={14} className="ipek-btn-premium__arrow shrink-0" />
                </span>
              </Link>
              <Link
                to={ctas.secondary.to}
                className="lux-btn lux-btn--dark inline-flex min-h-[44px] items-center justify-center gap-2 px-5 text-[10px] font-semibold uppercase tracking-[0.16em]"
              >
                <Phone size={14} className="relative shrink-0" strokeWidth={1.75} />
                <span className="relative">{ctas.secondary.label}</span>
              </Link>
            </DualCtaRow>
          </div>
        </motion.div>

        {/* ── Desktop panel ── */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 1.05, ease: DS_EASE_REVEAL }}
          className="ons-verhaal-service__panel hidden overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[linear-gradient(145deg,#121212_0%,#0a0a0a_48%,#141010_100%)] shadow-[0_48px_120px_-48px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.06)] lg:block"
        >
          <div className="grid lg:grid-cols-2">
            <div className="relative flex flex-col justify-center p-8 sm:p-10 lg:p-12 xl:p-14">
              <div
                aria-hidden
                className="pointer-events-none absolute -left-16 top-0 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(179,18,23,0.12),transparent_68%)] blur-3xl"
              />

              <AyatSectionBadge kicker="Over ons" title="Ayat Food" tone="dark" />

              <h2 className="mt-6 font-display text-[clamp(2.75rem,5.5vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
                <span className="text-[#DA292A]">{ONS_VERHAAL_SERVICE.titleAccent}</span>{" "}
                <span className="text-white">{ONS_VERHAAL_SERVICE.titleRest}</span>
              </h2>

              <div className="mt-5 flex items-center gap-4">
                <span
                  aria-hidden
                  className="h-px flex-1 max-w-[72px] bg-[linear-gradient(90deg,rgba(226,192,141,0.85),transparent)]"
                />
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[rgba(226,192,141,0.88)]">
                  {ONS_VERHAAL_SERVICE.tagline}
                </p>
                <span
                  aria-hidden
                  className="hidden h-px flex-1 bg-[linear-gradient(90deg,transparent,rgba(226,192,141,0.45))] sm:block"
                />
              </div>

              <div className="mt-8 flex gap-4 sm:gap-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#DA292A] text-white shadow-[0_12px_32px_-12px_rgba(218,41,42,0.65)]">
                  <Clock size={22} strokeWidth={1.75} />
                </span>
                <p className="text-[15px] leading-[1.85] text-white/72 sm:text-[16px]">
                  {ONS_VERHAAL_SERVICE.paragraphs[0]}
                </p>
              </div>

              <ul className="mt-10 grid gap-6 sm:grid-cols-3 sm:gap-4">
                {pillars.map((pillar, i) => {
                  const Icon = PILLAR_ICONS[i] ?? ShieldCheck;
                  return (
                    <li key={pillar.id} className="min-w-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(226,192,141,0.22)] bg-[rgba(226,192,141,0.08)] text-[rgba(226,192,141,0.95)]">
                        <Icon size={18} strokeWidth={1.65} />
                      </div>
                      <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/92">
                        {pillar.title}
                      </p>
                      <p className="mt-2 text-[12px] leading-[1.65] text-white/48">{pillar.description}</p>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  to={ctas.primary.to}
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#DA292A] px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_16px_40px_-12px_rgba(218,41,42,0.55)] transition-transform duration-300 hover:scale-[1.02]"
                >
                  <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.12),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="relative">{ctas.primary.label}</span>
                  <ArrowUpRight size={14} className="relative transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to={ctas.secondary.to}
                  className="group inline-flex items-center justify-center gap-2.5 rounded-xl border border-white/14 bg-white/[0.04] px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/88 backdrop-blur-sm transition-all duration-300 hover:border-white/24 hover:bg-white/[0.08]"
                >
                  <Phone size={14} className="text-[#DA292A]" strokeWidth={1.75} />
                  {ctas.secondary.label}
                </Link>
              </div>
            </div>

            <div className="ons-verhaal-service__media relative min-h-[560px]">
              <div className="absolute inset-0">
                <img
                  src={ONS_VERHAAL_SERVICE_IMAGE}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/25 to-transparent lg:via-transparent lg:to-[#0a0a0a]/35" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-transparent to-[#0a0a0a]/20" />
                <ImageFrameOverlay variant="aurora" />
              </div>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-6%" }}
                transition={{ duration: 0.95, delay: 0.15, ease: LUXURY_EASE }}
                className="absolute inset-x-8 bottom-8"
              >
                <div className="flex items-center gap-5 rounded-2xl border border-white/12 bg-[rgba(8,8,8,0.72)] p-4 backdrop-blur-xl">
                  <div className="flex shrink-0 gap-2">
                    {wagenpark.thumbnails.map((thumb, i) => (
                      <div key={i} className="h-16 w-16 overflow-hidden rounded-xl border border-white/10">
                        <img src={thumb} alt="" aria-hidden loading="lazy" decoding="async" className="h-full w-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[rgba(226,192,141,0.92)]">
                      {wagenpark.title}
                    </p>
                    <p className="mt-1 text-[13px] leading-snug text-white/62">{wagenpark.description}</p>
                  </div>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[rgba(226,192,141,0.35)] bg-[rgba(226,192,141,0.1)] text-[rgba(226,192,141,0.95)]">
                    <Truck size={16} strokeWidth={1.75} />
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
