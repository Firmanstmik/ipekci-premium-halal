import { motion, useReducedMotion } from "framer-motion";
import { Award, ClipboardCheck, Quote, ShieldCheck, Sparkles } from "lucide-react";
import { ImageFrameOverlay } from "@/components/ui/premium-frame";
import {
  ONS_VERHAAL_HALAL,
  ONS_VERHAAL_HALAL_IMAGE,
  ONS_VERHAAL_HALAL_NORMEN_IMAGE,
} from "@/lib/ons-verhaal-content";
import { DS_EASE_REVEAL } from "@/lib/design-system";

const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;
const PILLAR_ICONS = [ShieldCheck, Award, Sparkles, ClipboardCheck] as const;
const LUXURY_SHELL = "rounded-[1.65rem_0.95rem_1.85rem_1.05rem] sm:rounded-[1.85rem_1rem_2rem_1.15rem]";

function HalalPillarCard({
  pillar,
  index,
}: {
  pillar: (typeof ONS_VERHAAL_HALAL.pillars)[number];
  index: number;
}) {
  const Icon = PILLAR_ICONS[index] ?? ShieldCheck;

  return (
    <li className="ons-halal-app__pillar">
      <span className="ons-halal-app__pillar-icon" aria-hidden>
        <Icon size={18} strokeWidth={1.55} />
      </span>
      <p className="ons-halal-app__pillar-title">{pillar.title}</p>
      <p className="ons-halal-app__pillar-text">{pillar.description}</p>
    </li>
  );
}

export function OnsVerhaalHalalSection() {
  const reduceMotion = useReducedMotion();
  const { pillars, certification } = ONS_VERHAAL_HALAL;

  return (
    <section
      aria-labelledby="ons-verhaal-halal-heading"
      className="ons-verhaal-halal relative isolate overflow-hidden bg-[#FAF8F5] py-14 grain sm:py-20 lg:py-24"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(226,192,141,0.16),transparent_68%)]" />
        <div className="absolute -right-16 top-1/4 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(179,18,23,0.06),transparent_72%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(200,164,107,0.35),transparent)]" />
      </div>

      <div className="relative ipek-container">
        {/* ── Mobile luxury app ── */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.95, ease: DS_EASE_REVEAL }}
          className="ons-halal-app lg:hidden"
        >
          <div className="ons-halal-app__header">
            <span className="ons-halal-app__eyebrow">
              <ShieldCheck size={14} strokeWidth={1.75} aria-hidden />
              {ONS_VERHAAL_HALAL.eyebrow}
            </span>

            <h2
              id="ons-verhaal-halal-heading"
              className="ons-halal-app__title mt-5 font-display font-semibold leading-[1.05] tracking-[-0.03em] text-[#141414]"
            >
              {ONS_VERHAAL_HALAL.titlePrefix}{" "}
              <span className="italic text-[#DA292A]">{ONS_VERHAAL_HALAL.titleAccent}</span>
            </h2>

            <p className="ons-halal-app__lede mt-4 text-[14px] leading-[1.72] text-[#141414]/62">
              {ONS_VERHAAL_HALAL.paragraphs[0]}
            </p>
          </div>

          <ul className="ons-halal-app__pillars" aria-label="Halal en kwaliteit">
            {pillars.map((pillar, i) => (
              <HalalPillarCard key={pillar.id} pillar={pillar} index={i} />
            ))}
          </ul>

          <div className="ons-halal-app__cert">
            <div className="ons-halal-app__cert-seal">
              <img src={certification.seal} alt="" aria-hidden />
            </div>
            <div className="ons-halal-app__cert-copy">
              <p className="ons-halal-app__cert-label">{certification.label}</p>
              <p className="ons-halal-app__cert-text">{certification.text}</p>
            </div>
          </div>

          <div className="ons-halal-app__visual">
            <div className="ons-halal-app__plate">
              <img
                src={ONS_VERHAAL_HALAL_IMAGE}
                alt="Halal vlees bij Ayat Food"
                loading="lazy"
                decoding="async"
              />
              <div className="ons-halal-app__plate-scrim" aria-hidden />
              <ImageFrameOverlay variant="orbit" className="rounded-[22px]" />
            </div>

            <div className="ons-halal-app__quote">
              <div className="ons-halal-app__quote-media">
                <img
                  src={ONS_VERHAAL_HALAL_NORMEN_IMAGE}
                  alt="Ayat Food vleesgroothandel"
                  loading="lazy"
                  decoding="async"
                />
                <div className="ons-halal-app__quote-scrim" aria-hidden />
              </div>
              <div className="ons-halal-app__quote-body">
                <Quote size={22} className="text-[#DA292A]/75" strokeWidth={1.25} aria-hidden />
                <p className="ons-halal-app__quote-text">&ldquo;{ONS_VERHAAL_HALAL.quote}&rdquo;</p>
                <p className="ons-halal-app__quote-by">— Ayat Food</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Desktop layout ── */}
        <div className="hidden items-center gap-12 lg:grid lg:grid-cols-12 lg:gap-10 xl:gap-14">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 1.05, ease: DS_EASE_REVEAL }}
            className="lg:col-span-5 xl:col-span-5"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(179,18,23,0.14)] bg-[rgba(179,18,23,0.06)] px-3.5 py-1.5">
              <ShieldCheck size={14} className="text-[#DA292A]" strokeWidth={1.75} />
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#DA292A]">
                {ONS_VERHAAL_HALAL.eyebrow}
              </span>
            </span>

            <h2 className="mt-6 font-display text-[clamp(2.5rem,5.2vw,3.85rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[#141414]">
              {ONS_VERHAAL_HALAL.titlePrefix}{" "}
              <span className="italic text-[#DA292A]">{ONS_VERHAAL_HALAL.titleAccent}</span>
            </h2>

            <p className="mt-6 max-w-xl text-[15px] leading-[1.9] text-[#141414]/64 sm:text-[16px]">
              {ONS_VERHAAL_HALAL.paragraphs[0]}
            </p>

            <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 xl:grid-cols-4">
              {pillars.map((pillar, i) => {
                const Icon = PILLAR_ICONS[i] ?? ShieldCheck;
                return (
                  <li key={pillar.id} className="min-w-0">
                    <div className="flex h-9 w-9 items-center justify-center text-[#DA292A]">
                      <Icon size={22} strokeWidth={1.5} />
                    </div>
                    <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#141414]/88">
                      {pillar.title}
                    </p>
                    <p className="mt-1.5 text-[11px] leading-[1.55] text-[#141414]/48">{pillar.description}</p>
                  </li>
                );
              })}
            </ul>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6%" }}
              transition={{ duration: 0.95, delay: 0.12, ease: LUXURY_EASE }}
              className={`mt-10 flex flex-col gap-4 overflow-hidden border border-black/[0.08] bg-[linear-gradient(135deg,#121212_0%,#0a0a0a_100%)] p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-5 ${LUXURY_SHELL}`}
            >
              <div className="flex shrink-0 items-center gap-3">
                <img
                  src={certification.seal}
                  alt=""
                  aria-hidden
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-[rgba(226,192,141,0.35)]"
                />
                <p className="max-w-[140px] text-[10px] font-semibold uppercase leading-snug tracking-[0.16em] text-[rgba(226,192,141,0.92)]">
                  {certification.label}
                </p>
              </div>
              <p className="flex-1 text-[12px] leading-[1.65] text-white/58 sm:text-[13px]">{certification.text}</p>
              <p
                aria-hidden
                className="hidden shrink-0 font-display text-2xl italic text-[rgba(226,192,141,0.55)] sm:block"
              >
                Ayat Food
              </p>
            </motion.div>
          </motion.div>

          <div className="relative lg:col-span-7 xl:col-span-7">
            <span
              aria-hidden
              className="pointer-events-none absolute -right-2 top-0 select-none font-display text-[clamp(6rem,16vw,10rem)] font-semibold leading-none tracking-[-0.06em] text-[#141414]/[0.045] sm:right-4"
            >
              02
            </span>

            <div className="relative mx-auto min-h-[520px] max-w-none">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 1.1, ease: DS_EASE_REVEAL }}
                className="absolute left-0 top-12 z-10 aspect-square w-[68%] max-w-[380px] overflow-hidden rounded-full border border-[rgba(198,160,98,0.22)] bg-[#0a0a0a] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.35)]"
              >
                <img
                  src={ONS_VERHAAL_HALAL_IMAGE}
                  alt="Halal vlees bij Ayat Food"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_42%,rgba(0,0,0,0.28)_100%)]" />
                <ImageFrameOverlay variant="orbit" className="rounded-full" />
              </motion.div>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 40, x: 24 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 1.05, delay: 0.1, ease: DS_EASE_REVEAL }}
                className={`absolute bottom-0 right-0 z-20 w-[52%] max-w-[320px] overflow-hidden border border-[rgba(198,160,98,0.32)] bg-[#0a0a0a] shadow-[0_36px_90px_-36px_rgba(0,0,0,0.45)] ${LUXURY_SHELL}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={ONS_VERHAAL_HALAL_NORMEN_IMAGE}
                    alt="Ayat Food vleesgroothandel"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                  <ImageFrameOverlay variant="halo" />
                </div>

                <div className="relative border-t border-white/[0.08] bg-[linear-gradient(180deg,#121212_0%,#0a0a0a_100%)] px-6 py-6">
                  <Quote size={28} className="text-[#DA292A]/75" strokeWidth={1.25} />
                  <p className="mt-3 font-display text-[1.15rem] italic leading-[1.55] text-white/88">
                    &ldquo;{ONS_VERHAAL_HALAL.quote}&rdquo;
                  </p>
                  <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#DA292A]/85">
                    — Ayat Food
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
