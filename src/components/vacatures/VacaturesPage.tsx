import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useState } from "react";
import {
  ArrowUpRight,
  Briefcase,
  Check,
  Clock,
  Lock,
  Mail,
  MapPin,
  Paperclip,
  Pencil,
  Phone,
  Send,
  Upload,
  User,
} from "lucide-react";
import { BRAND } from "@/lib/brand";
import { DS_EASE, DS_EASE_REVEAL } from "@/lib/design-system";
import { ProductCinematicHero } from "@/components/producten/ProductPrimitives";
import {
  VACATURES,
  VACATURES_APPLY_IMAGE,
  VACATURES_APPLY_STEPS,
  VACATURES_FORM,
  VACATURES_HERO,
  VACATURES_HERO_IMAGE,
  VACATURES_PAGE,
  VACATURES_SOLLICITEREN,
  sollicitatieMailto,
  type Vacature,
} from "@/lib/vacatures-content";
import { VacaturesMobileStickyBar } from "@/components/vacatures/VacaturesMobileStickyBar";

const LISTINGS_ANCHOR = "openstaande-vacatures";
const SOLLICITEREN_ANCHOR = "solliciteren";

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.9, delay: reduceMotion ? 0 : delay, ease: DS_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function VacatureCard({
  vacature,
  index,
  onApply,
}: {
  vacature: Vacature;
  index: number;
  onApply: (title: string) => void;
}) {
  const Icon = vacature.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: 0.85, delay: index * 0.09, ease: DS_EASE_REVEAL }}
      className="vac-premium-card group relative flex h-full flex-col"
    >
      <span className="vac-premium-card__ribbon" aria-hidden>
        {vacature.index}
      </span>

      <div className="vac-premium-card__icon">
        <Icon size={22} strokeWidth={1.5} aria-hidden />
      </div>

      <p className="vac-premium-card__dept">{vacature.department}</p>
      <h3 className="vac-premium-card__title">{vacature.title}</h3>
      <p className="vac-premium-card__summary">{vacature.summary}</p>

      <ul className="vac-premium-card__tasks">
        {vacature.responsibilities.map((item) => (
          <li key={item}>
            <span className="vac-premium-card__check" aria-hidden>
              <Check size={11} strokeWidth={2.6} />
            </span>
            {item}
          </li>
        ))}
      </ul>

      <div className="vac-premium-card__foot">
        <button
          type="button"
          onClick={() => onApply(vacature.title)}
          className="vac-premium-card__cta group/btn"
        >
          Solliciteren
          <ArrowUpRight
            size={14}
            className="transition-transform duration-500 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
          />
        </button>
      </div>
    </motion.article>
  );
}

function VacatureAppCard({
  vacature,
  onApply,
}: {
  vacature: Vacature;
  onApply: (title: string) => void;
}) {
  return (
    <li className="vac-list-app__card">
      <span className="vac-list-app__card-index">{vacature.index}</span>
      <p className="vac-list-app__card-dept">{vacature.department}</p>
      <h3 className="vac-list-app__card-title">{vacature.title}</h3>
      <p className="vac-list-app__card-summary">{vacature.summary}</p>
      <ul className="vac-list-app__card-tasks">
        {vacature.responsibilities.slice(0, 3).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="vac-list-app__card-cta">
        <button
          type="button"
          onClick={() => onApply(vacature.title)}
          className="vac-premium-card__cta group/btn"
        >
          Solliciteren
          <ArrowUpRight size={14} />
        </button>
      </div>
    </li>
  );
}

function SollicitatieForm({
  selectedVacancy,
  onVacancyChange,
}: {
  selectedVacancy: string;
  onVacancyChange: (value: string) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [motivation, setMotivation] = useState("");
  const [cvName, setCvName] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const mailUrl = sollicitatieMailto({
      vacatureTitle: selectedVacancy || undefined,
      name: name.trim() || undefined,
      email: email.trim() || undefined,
      motivation: motivation.trim() || undefined,
    });
    window.location.href = mailUrl;
  };

  return (
    <form className="vac-premium-form" onSubmit={handleSubmit} noValidate>
      <h2 className="vac-premium-form__title">{VACATURES_FORM.title}</h2>

      <div className="vac-premium-form__grid">
        <label className="vac-premium-field">
          <span className="vac-premium-field__label">{VACATURES_FORM.fields.name}</span>
          <span className="vac-premium-field__control">
            <User size={16} aria-hidden className="vac-premium-field__icon" />
            <input
              type="text"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </span>
        </label>

        <label className="vac-premium-field">
          <span className="vac-premium-field__label">{VACATURES_FORM.fields.email}</span>
          <span className="vac-premium-field__control">
            <Mail size={16} aria-hidden className="vac-premium-field__icon" />
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </span>
        </label>

        <label className="vac-premium-field vac-premium-field--full">
          <span className="vac-premium-field__label">{VACATURES_FORM.fields.vacancy}</span>
          <span className="vac-premium-field__control">
            <Paperclip size={16} aria-hidden className="vac-premium-field__icon" />
            <select
              name="vacancy"
              value={selectedVacancy}
              onChange={(e) => onVacancyChange(e.target.value)}
            >
              <option value="">Kies een vacature (optioneel)</option>
              {VACATURES.map((v) => (
                <option key={v.id} value={v.title}>
                  {v.title}
                </option>
              ))}
            </select>
          </span>
        </label>

        <label className="vac-premium-field vac-premium-field--full">
          <span className="vac-premium-field__label">{VACATURES_FORM.fields.cv}</span>
          <span className="vac-premium-field__control vac-premium-field__control--file">
            <Upload size={16} aria-hidden className="vac-premium-field__icon" />
            <input
              type="file"
              name="cv"
              accept=".pdf,.doc,.docx,application/pdf,application/msword"
              onChange={(e) => setCvName(e.target.files?.[0]?.name ?? "")}
            />
            <span className="vac-premium-field__file-hint">
              {cvName || "PDF of Word — voeg toe in uw e-mail na verzenden"}
            </span>
          </span>
        </label>

        <label className="vac-premium-field vac-premium-field--full">
          <span className="vac-premium-field__label">{VACATURES_FORM.fields.motivation}</span>
          <span className="vac-premium-field__control vac-premium-field__control--area">
            <Pencil size={16} aria-hidden className="vac-premium-field__icon vac-premium-field__icon--area" />
            <textarea
              name="motivation"
              rows={4}
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              required
            />
          </span>
        </label>
      </div>

      <button type="submit" className="vac-premium-form__submit group">
        {VACATURES_FORM.submitLabel}
        <Send
          size={15}
          className="transition-transform duration-500 group-hover:translate-x-0.5"
        />
      </button>

      <p className="vac-premium-form__privacy">
        <Lock size={13} aria-hidden />
        {VACATURES_FORM.privacyNote}
      </p>
    </form>
  );
}

function ContactPanel() {
  const rows = [
    {
      icon: MapPin,
      label: BRAND.name,
      value: BRAND.addressFull,
    },
    {
      icon: Phone,
      label: "Telefoon",
      value: BRAND.phoneDisplay,
      href: `tel:${BRAND.phoneTel}`,
    },
    {
      icon: Mail,
      label: "E-mail",
      value: BRAND.email,
      href: `mailto:${BRAND.email}`,
    },
    {
      icon: Clock,
      label: "Openingstijden",
      value: BRAND.hours,
    },
  ] as const;

  return (
    <div className="vac-premium-contact">
      <p className="vac-premium-contact__eyebrow">{VACATURES_SOLLICITEREN.eyebrow}</p>
      <h2 className="vac-premium-contact__title">{VACATURES_SOLLICITEREN.title}</h2>
      <p className="vac-premium-contact__lede">{VACATURES_SOLLICITEREN.lede}</p>

      <ul className="vac-premium-contact__rows">
        {rows.map((row) => {
          const Icon = row.icon;
          const inner = (
            <>
              <span className="vac-premium-contact__icon">
                <Icon size={16} aria-hidden />
              </span>
              <span className="vac-premium-contact__body">
                <span className="vac-premium-contact__label">{row.label}</span>
                <span className="vac-premium-contact__value">{row.value}</span>
              </span>
            </>
          );

          return (
            <li key={row.label}>
              {"href" in row && row.href ? (
                <a href={row.href} className="vac-premium-contact__row">
                  {inner}
                </a>
              ) : (
                <div className="vac-premium-contact__row">{inner}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ContactAppPanel() {
  const rows = [
    {
      label: BRAND.name,
      value: BRAND.addressFull,
    },
    {
      label: "Telefoon",
      value: BRAND.phoneDisplay,
      href: `tel:${BRAND.phoneTel}`,
    },
    {
      label: "E-mail",
      value: BRAND.email,
      href: `mailto:${BRAND.email}`,
    },
    {
      label: "Openingstijden",
      value: BRAND.hours,
    },
  ] as const;

  return (
    <div className="vac-apply-app__contact">
      {rows.map((row) => {
        const body = (
          <>
            <span className="vac-apply-app__contact-label">{row.label}</span>
            <span className="vac-apply-app__contact-value">{row.value}</span>
          </>
        );
        return "href" in row && row.href ? (
          <a key={row.label} href={row.href} className="vac-apply-app__contact-row">
            <span>{body}</span>
          </a>
        ) : (
          <div key={row.label} className="vac-apply-app__contact-row">
            <span>{body}</span>
          </div>
        );
      })}
      <div className="vac-apply-app__actions">
        <a href={`tel:${BRAND.phoneTel}`} className="vac-closing-app__cta" style={{ fontSize: 9 }}>
          Bel nu
        </a>
        <a href={`mailto:${BRAND.email}`} className="vac-closing-app__cta" style={{ fontSize: 9 }}>
          Mail
        </a>
      </div>
    </div>
  );
}

export function VacaturesPage() {
  const [selectedVacancy, setSelectedVacancy] = useState("");
  const reduceMotion = useReducedMotion();

  const scrollToApply = useCallback((vacatureTitle: string) => {
    setSelectedVacancy(vacatureTitle);
    document.getElementById(SOLLICITEREN_ANCHOR)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="vacatures-page vacatures-page--premium">
      <ProductCinematicHero
        image={VACATURES_HERO_IMAGE}
        eyebrow={VACATURES_HERO.eyebrow}
        title={VACATURES_HERO.title}
        lede={VACATURES_HERO.lede}
        breadcrumb={[{ label: VACATURES_HERO.breadcrumb }]}
        badge={VACATURES_HERO.badge}
        meta={VACATURES_HERO.stats}
      >
        <a
          href={`#${LISTINGS_ANCHOR}`}
          className="ipek-btn-premium group px-7 py-3.5 text-[11px] tracking-[0.2em] sm:px-9 sm:py-4 sm:text-[12px]"
        >
          <span className="relative z-[1] inline-flex items-center gap-2.5">
            <span className="hidden sm:inline">{VACATURES_HERO.ctaPrimary}</span>
            <span className="sm:hidden">Vacatures</span>
            <ArrowUpRight
              size={15}
              className="transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </a>
        <a
          href={`#${SOLLICITEREN_ANCHOR}`}
          className="inline-flex items-center gap-2.5 rounded-2xl border border-white/14 bg-white/[0.05] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/82 backdrop-blur-md transition-all duration-300 hover:border-[rgba(226,192,141,0.4)] hover:bg-white/[0.09] hover:text-white sm:px-7 sm:py-4"
        >
          <span className="hidden sm:inline">{VACATURES_HERO.ctaSecondary}</span>
          <span className="sm:hidden">Solliciteer</span>
          <ArrowUpRight size={14} />
        </a>
      </ProductCinematicHero>

      {/* ── Listings (cream) ───────────────────────────────── */}
      <section
        id={LISTINGS_ANCHOR}
        className="vac-premium-listings grain"
        aria-labelledby="vacatures-listings-heading"
      >
        <div className="vac-premium-listings__ambient" aria-hidden />
        <div className="vac-premium-listings__inner ipek-container">
          {/* Mobile luxury app — Over Ons sheet language */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.95, ease: DS_EASE_REVEAL }}
            className="vac-list-app md:hidden"
            aria-labelledby="vacatures-listings-heading"
          >
            <div className="vac-list-app__sheet">
              <span className="vac-list-app__eyebrow">
                <Briefcase size={14} strokeWidth={1.75} aria-hidden />
                {VACATURES_PAGE.eyebrow}
              </span>
              <h2
                id="vacatures-listings-heading"
                className="vac-list-app__title mt-4 font-display font-semibold tracking-[-0.03em] text-[#141414]"
              >
                {VACATURES_PAGE.title}
              </h2>
              <p className="vac-list-app__lede mt-4">{VACATURES_PAGE.lede}</p>
              <span
                className="mt-5 block h-px w-28 origin-left bg-[rgba(198,160,98,0.55)]"
                aria-hidden
              />
            </div>

            <ul className="vac-list-app__track">
              {VACATURES.map((vacature) => (
                <VacatureAppCard
                  key={vacature.id}
                  vacature={vacature}
                  onApply={scrollToApply}
                />
              ))}
            </ul>
          </motion.div>

          {/* Desktop editorial */}
          <div className="hidden md:block">
            <Reveal className="vac-premium-listings__head">
              <p className="vac-premium-listings__eyebrow">{VACATURES_PAGE.eyebrow}</p>
              <h2 className="vac-premium-listings__title">{VACATURES_PAGE.title}</h2>
              <p className="vac-premium-listings__lede">{VACATURES_PAGE.lede}</p>
            </Reveal>

            <div className="vac-premium-listings__grid">
              {VACATURES.map((vacature, i) => (
                <VacatureCard
                  key={vacature.id}
                  vacature={vacature}
                  index={i}
                  onApply={scrollToApply}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Solliciteren (dark split) ──────────────────────── */}
      <section
        id={SOLLICITEREN_ANCHOR}
        className="vac-premium-apply grain"
        aria-labelledby="solliciteren-heading"
      >
        {/* Mobile luxury app */}
        <div className="ipek-container md:hidden">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.95, ease: DS_EASE_REVEAL }}
            className="vac-apply-app"
          >
            <div className="vac-apply-app__sheet">
              <p className="vac-apply-app__eyebrow">{VACATURES_SOLLICITEREN.eyebrow}</p>
              <h2 id="solliciteren-heading" className="vac-apply-app__title">
                {VACATURES_SOLLICITEREN.title}
              </h2>
              <p className="vac-apply-app__lede">{VACATURES_SOLLICITEREN.lede}</p>
            </div>

            <div className="vac-intro-app__hero">
              <img
                src={VACATURES_APPLY_IMAGE}
                alt=""
                loading="lazy"
                decoding="async"
                className="vac-intro-app__hero-img"
              />
              <div className="vac-intro-app__hero-scrim" aria-hidden />
              <div className="vac-intro-app__hero-caption">
                <p className="vac-intro-app__hero-eyebrow">Werken bij Ayat Food</p>
                <p className="vac-intro-app__hero-title">Magazijn · Verkoop · Klantadvies</p>
              </div>
            </div>

            <ul className="vac-apply-app__steps">
              {VACATURES_APPLY_STEPS.map((step) => (
                <li key={step.num} className="vac-apply-app__step">
                  <span className="vac-apply-app__step-num">{step.num}</span>
                  <p className="vac-apply-app__step-title">{step.title}</p>
                  <p className="vac-apply-app__step-text">{step.text}</p>
                </li>
              ))}
            </ul>

            <SollicitatieForm
              selectedVacancy={selectedVacancy}
              onVacancyChange={setSelectedVacancy}
            />

            <ContactAppPanel />
          </motion.div>
        </div>

        {/* Desktop editorial */}
        <div className="hidden md:block">
          <div className="vac-premium-apply__media" aria-hidden>
            <img src={VACATURES_APPLY_IMAGE} alt="" loading="lazy" decoding="async" />
            <div className="vac-premium-apply__media-scrim" />
          </div>

          <div className="vac-premium-apply__inner ipek-container">
            <div className="vac-premium-apply__grid">
              <Reveal className="vac-premium-apply__form-col">
                <SollicitatieForm
                  selectedVacancy={selectedVacancy}
                  onVacancyChange={setSelectedVacancy}
                />
              </Reveal>

              <Reveal className="vac-premium-apply__contact-col" delay={0.1}>
                <h2 className="sr-only">{VACATURES_SOLLICITEREN.title}</h2>
                <ContactPanel />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <VacaturesMobileStickyBar />
    </div>
  );
}
