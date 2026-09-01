import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ArrowUpRight,
  Gem,
  Handshake,
  Headphones,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import klantHeroKebab from "@/assets/ayat/stats-hero-kebab.png";
import { DualCtaRow } from "@/components/ui/DualCtaRow";
import { DS_EASE, DS_EASE_REVEAL } from "@/lib/design-system";

const TRUST_PILLARS = [
  { id: "halal", icon: ShieldCheck, title: "100% Halal", subtitle: "Strikte richtlijnen" },
  { id: "nvwa", icon: Gem, title: "NVWA-normen", subtitle: "Gecertificeerde productie" },
  { id: "levering", icon: Truck, title: "Snelle levering", subtitle: "Op tijd en gekoeld" },
  { id: "contact", icon: Headphones, title: "Persoonlijk contact", subtitle: "Wij denken met je mee" },
] as const;

const LUXURY_SHELL = "rounded-[1.35rem_0.85rem_1.5rem_0.95rem] sm:rounded-[1.5rem_0.95rem_1.65rem_1.05rem]";

function KlantTrustAppItem({
  pillar,
}: {
  pillar: (typeof TRUST_PILLARS)[number];
}) {
  const Icon = pillar.icon;

  return (
    <li className="ons-klant-cta-app__pillar">
      <span className="ons-klant-cta-app__pillar-icon" aria-hidden>
        <Icon size={17} strokeWidth={1.65} />
      </span>
      <p className="ons-klant-cta-app__pillar-title">{pillar.title}</p>
      <p className="ons-klant-cta-app__pillar-sub">{pillar.subtitle}</p>
    </li>
  );
}

export function AssortimentKlantCta() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const decorY = useTransform(scrollYProgress, [0, 1], [30, -24]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="klant-cta-heading"
      className="relative overflow-hidden bg-[#FAF8F5] py-14 grain sm:py-16 lg:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_0%_50%,rgba(226,192,141,0.16),transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_100%_20%,rgba(177,18,23,0.05),transparent_50%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(177,18,23,0.16)] to-transparent"
      />

      <motion.div
        style={{ y: reduceMotion ? 0 : decorY }}
        aria-hidden
        className="pointer-events-none absolute right-[6%] top-[10%] hidden h-56 w-56 rounded-full border border-dashed border-[rgba(226,192,141,0.28)] opacity-70 lg:block"
      />
      <motion.div
        style={{ y: reduceMotion ? 0 : decorY }}
        aria-hidden
        className="pointer-events-none absolute right-[10%] top-[14%] hidden h-36 w-36 rounded-full border border-[rgba(226,192,141,0.18)] opacity-50 lg:block"
      />
      <motion.div
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 52, repeat: Infinity, ease: "linear" }}
        aria-hidden
        className="pointer-events-none absolute bottom-[14%] left-[4%] hidden h-28 w-28 rounded-full border border-dashed border-[rgba(177,18,23,0.12)] lg:block"
      />

      <div className="relative ipek-container">
        {/* Mobile luxury app */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.95, ease: DS_EASE_REVEAL }}
          className="ons-klant-cta-app lg:hidden"
        >
          <div className="ons-klant-cta-app__sheet">
            <span className="ons-klant-cta-app__eyebrow">
              <Handshake size={14} strokeWidth={1.75} aria-hidden />
              Ook klant worden?
            </span>

            <h2
              id="klant-cta-heading"
              className="ons-klant-cta-app__title mt-4 font-display font-semibold leading-[1.02] tracking-[-0.03em] text-[#C6A062]"
            >
              Ayat Food Vleesgroothandel
            </h2>

            <p className="ons-klant-cta-app__lede mt-4">
              Kies voor de zekerheid van een Halal vleesgroothandel die werkt volgens NVWA-normen en
              onder toezicht van ECC Halal. Snelle levering via ons moderne wagenpark en 24/7 service.
            </p>
          </div>

          <ul className="ons-klant-cta-app__pillars" aria-label="Waarom Ayat Food">
            {TRUST_PILLARS.map((pillar) => (
              <KlantTrustAppItem key={pillar.id} pillar={pillar} />
            ))}
          </ul>

          <div className="ons-klant-cta-app__b2b">
            <div className="ons-klant-cta-app__b2b-media">
              <img
                src={klantHeroKebab}
                alt="Halal producten van Ayat Food"
                loading="lazy"
                decoding="async"
              />
              <div className="ons-klant-cta-app__b2b-scrim" aria-hidden />
            </div>

            <div className="ons-klant-cta-app__b2b-body">
              <span className="ons-klant-cta-app__b2b-badge">
                <ShieldCheck size={11} strokeWidth={1.75} aria-hidden />
                B2B partnership
              </span>
              <h3 className="ons-klant-cta-app__b2b-title">
                Halal producten,{" "}
                <span className="italic text-[rgba(226,192,141,0.95)]">op tijd geleverd</span>
              </h3>
              <p className="ons-klant-cta-app__b2b-text">
                Hoogwaardige Halal producten, op tijd geleverd aan uw bedrijf.
              </p>
            </div>
          </div>

          <Link to="/contact" className="ons-klant-cta-app__cta">
            Word klant bij Ayat Food
            <ArrowUpRight size={14} strokeWidth={1.75} />
          </Link>
        </motion.div>

        {/* Desktop layout */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:items-center lg:gap-14 xl:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -36, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: DS_EASE_REVEAL }}
            className="lg:col-span-7"
          >
            <p className="inline-flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#B11217]">
              <span className="grid h-7 w-7 place-items-center rounded-lg border border-[rgba(177,18,23,0.18)] bg-white/60 text-[#B11217]">
                <Handshake size={14} strokeWidth={1.75} />
              </span>
              Ook klant worden?
            </p>

            <h2 className="mt-6 font-display text-[clamp(2.25rem,4.8vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[#C6A062]">
              Ayat Food Vleesgroothandel
            </h2>

            <div className="mt-5 flex items-center gap-3" aria-hidden>
              <span className="h-px w-12 bg-[linear-gradient(90deg,rgba(198,160,98,0.85),transparent)]" />
              <Sparkles size={12} className="text-[rgba(198,160,98,0.75)]" strokeWidth={1.5} />
              <span className="h-px flex-1 max-w-[120px] bg-[linear-gradient(90deg,transparent,rgba(198,160,98,0.45))]" />
            </div>

            <p className="mt-6 max-w-xl text-[15px] leading-[1.85] text-[#141414]/68 sm:text-[16px]">
              Kies voor de zekerheid van een Halal vleesgroothandel die werkt volgens NVWA-normen en
              onder toezicht van ECC Halal. Snelle levering via ons moderne wagenpark en 24/7
              service.
            </p>

            <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 sm:gap-x-3">
              {TRUST_PILLARS.map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <motion.li
                    key={pillar.id}
                    initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-8%" }}
                    transition={{ duration: 0.7, delay: i * 0.06, ease: DS_EASE }}
                    className="min-w-0 text-center sm:text-left"
                  >
                    <div className="mx-auto grid h-10 w-10 place-items-center rounded-xl border border-[rgba(198,160,98,0.28)] bg-white/70 text-[rgba(198,160,98,0.92)] shadow-[0_8px_24px_-12px_rgba(198,160,98,0.35)] sm:mx-0">
                      <Icon size={18} strokeWidth={1.65} />
                    </div>
                    <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#C6A062] sm:text-[10px] sm:tracking-[0.2em]">
                      {pillar.title}
                    </p>
                    <p className="mt-1 text-[10px] leading-snug text-[#141414]/48 sm:text-[11px]">
                      {pillar.subtitle}
                    </p>
                  </motion.li>
                );
              })}
            </ul>

            <DualCtaRow wide className="mt-10">
              <Link
                to="/contact"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[#DA292A] px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white shadow-[0_16px_40px_-12px_rgba(218,41,42,0.5)] transition-transform duration-300 hover:scale-[1.02] sm:text-[11px] sm:tracking-[0.22em]"
              >
                <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.14),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative">Word klant bij Ayat Food</span>
                <ArrowUpRight size={14} className="relative transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/contact"
                className="ipek-dual-cta__secondary ipek-dual-cta__secondary--light inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#141414]/50 transition-colors hover:text-[#B11217]"
              >
                Neem contact op
                <ArrowUpRight size={14} />
              </Link>
            </DualCtaRow>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, delay: 0.08, ease: DS_EASE_REVEAL }}
            className="flex justify-center lg:col-span-5 lg:justify-end"
          >
            <div className="group relative w-full max-w-[400px]">
              <div
                className={`overflow-hidden border border-[rgba(198,160,98,0.22)] bg-white shadow-[0_32px_80px_-32px_rgba(17,17,17,0.22)] transition-shadow duration-500 hover:shadow-[0_40px_100px_-28px_rgba(17,17,17,0.28)] ${LUXURY_SHELL}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={klantHeroKebab}
                    alt="Halal producten van Ayat Food"
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1512]/40 via-transparent to-transparent" />
                </div>

                <div className="relative bg-[linear-gradient(165deg,#1f1915_0%,#141010_100%)] px-6 py-7 sm:px-7 sm:py-8">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(226,192,141,0.35),transparent)]"
                  />

                  <p className="inline-flex items-center gap-2 rounded-full border border-[rgba(226,192,141,0.28)] bg-[rgba(226,192,141,0.08)] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-[rgba(226,192,141,0.92)]">
                    <ShieldCheck size={11} strokeWidth={1.75} />
                    B2B partnership
                  </p>

                  <h3 className="mt-4 font-display text-[clamp(1.35rem,2.5vw,1.65rem)] font-semibold leading-snug text-white">
                    Halal producten,{" "}
                    <span className="italic text-[rgba(226,192,141,0.95)]">op tijd geleverd</span>
                  </h3>

                  <p className="mt-3 text-[13px] leading-relaxed text-white/58">
                    Hoogwaardige Halal producten, op tijd geleverd aan uw bedrijf.
                  </p>

                  <Link
                    to="/contact"
                    className="ipek-btn-wipe ipek-btn-wipe--light group mt-5 inline-flex items-center gap-2 px-5 py-2.5 text-[10px] tracking-[0.18em]"
                  >
                    Klant worden
                    <ArrowUpRight
                      size={13}
                      className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </div>
              </div>

              <div
                aria-hidden
                className="absolute -bottom-4 left-[10%] right-[10%] h-7 rounded-[50%] bg-[#141414]/10 blur-xl transition-all duration-500 group-hover:bg-[#141414]/14"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
