import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Briefcase } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";
import {
  CinematicImage,
  EditorialHeader,
  GLASS_PANEL,
  LUXURY_SHELL,
  PremiumSectionShell,
} from "@/components/ons-verhaal/ons-verhaal-premium-ui";
import {
  ONS_VERHAAL_CAREERS,
  ONS_VERHAAL_CAREERS_IMAGE,
  ONS_VERHAAL_SECTION_BACKGROUND,
} from "@/lib/ons-verhaal-content";
import { DS_EASE_REVEAL } from "@/lib/design-system";

export function OnsVerhaalCareersSection() {
  const reduceMotion = useReducedMotion();

  return (
    <PremiumSectionShell index="07" backgroundSrc={ONS_VERHAAL_SECTION_BACKGROUND} parallax>
      {/* Mobile luxury app */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8%" }}
        transition={{ duration: 0.95, ease: DS_EASE_REVEAL }}
        className="ons-careers-app lg:hidden"
        aria-labelledby="ons-careers-app-heading"
      >
        <div className="ons-careers-app__sheet">
          <span className="ons-careers-app__eyebrow">
            <Briefcase size={14} strokeWidth={1.75} aria-hidden />
            {ONS_VERHAAL_CAREERS.eyebrow}
          </span>

          <h2
            id="ons-careers-app-heading"
            className="ons-careers-app__title mt-4 font-display font-semibold leading-[1.05] tracking-[-0.03em] text-[#141414]"
          >
            {ONS_VERHAAL_CAREERS.title}
          </h2>

          <p className="ons-careers-app__lede mt-4">{ONS_VERHAAL_CAREERS.text}</p>
        </div>

        <div className="ons-careers-app__hero">
          <img
            src={ONS_VERHAAL_CAREERS_IMAGE}
            alt="Werken bij Ayat Food"
            loading="lazy"
            decoding="async"
            className="ons-careers-app__hero-img"
          />
          <div className="ons-careers-app__hero-scrim" aria-hidden />
        </div>

        <div className="ons-careers-app__quote">
          <p className="ons-careers-app__quote-text">Verwelkomen we ook jou binnenkort?</p>
          <p className="ons-careers-app__quote-sub">
            Hecht team · Halal vleessegment · Magazijn, verkoop &amp; klantadvies
          </p>
        </div>

        <Link to={ONS_VERHAAL_CAREERS.ctaTo} className="ons-careers-app__cta">
          {ONS_VERHAAL_CAREERS.cta}
          <ArrowUpRight size={14} strokeWidth={1.75} />
        </Link>
      </motion.div>

      {/* Desktop editorial */}
      <div className="hidden lg:block">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -44 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 1.05, ease: DS_EASE_REVEAL }}
            className={`p-8 sm:p-10 lg:col-span-5 ${LUXURY_SHELL} ${GLASS_PANEL}`}
          >
            <EditorialHeader
              kicker={ONS_VERHAAL_CAREERS.eyebrow}
              badgeTitle="Vacatures"
              title={ONS_VERHAAL_CAREERS.title}
            />
            <p className="mt-8 text-[15px] leading-[1.9] text-[#141414]/64">{ONS_VERHAAL_CAREERS.text}</p>
            <p className="mt-6 font-display text-xl text-[#141414]/80">
              Verwelkomen we ook jou binnenkort?
            </p>
            <div className="mt-10">
              <MagneticButton href={ONS_VERHAAL_CAREERS.ctaTo}>
                {ONS_VERHAAL_CAREERS.cta}
                <ArrowUpRight size={14} />
              </MagneticButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 1.1, delay: 0.08, ease: DS_EASE_REVEAL }}
            className="lg:col-span-7"
          >
            <CinematicImage
              src={ONS_VERHAAL_CAREERS_IMAGE}
              alt="Werken bij Ayat Food"
              aspect="aspect-[16/10]"
              frame="halo"
            />
          </motion.div>
        </div>
      </div>
    </PremiumSectionShell>
  );
}
