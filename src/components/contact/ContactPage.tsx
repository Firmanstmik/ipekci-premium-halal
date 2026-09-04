import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Clock3,
  LockKeyhole,
  Mail,
  MapPin,
  NotebookPen,
  Phone,
  SendHorizonal,
  UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  ProductCinematicHero,
  ProductTrustRibbon,
} from "@/components/producten/ProductPrimitives";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/sonner";
import { BRAND } from "@/lib/brand";
import { DS_EASE, DS_EASE_REVEAL } from "@/lib/design-system";
import {
  CONTACT_DETAILS,
  CONTACT_DETAILS_SECTION,
  CONTACT_FORM_SECTION,
  CONTACT_HERO,
  CONTACT_HERO_IMAGE,
  CONTACT_PARTNER,
  CONTACT_QUICK_ACTIONS,
  CONTACT_REASSURANCE,
  CONTACT_TRUST,
  type ContactDetail,
} from "@/lib/contact-content";
import { toast } from "sonner";
import { ContactMobileStickyBar } from "@/components/contact/ContactMobileStickyBar";

const DETAILS_ANCHOR = "bereikbaarheid";
const FORM_ANCHOR = "contact-form";

const contactSchema = z.object({
  name: z.string().min(2, "Vul uw volledige naam in"),
  email: z.string().email("Vul een geldig e-mailadres in"),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(10, "Uw bericht moet minimaal 10 tekens bevatten"),
  privacy: z.boolean().refine((v) => v === true, {
    message: "U moet akkoord gaan met de privacy policy",
  }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

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

function detailCtaLabel(id: string) {
  switch (id) {
    case "adres":
      return "Route";
    case "telefoon":
      return "Bel nu";
    case "email":
      return "Stuur mail";
    default:
      return "Open";
  }
}

function DetailCard({ item, index }: { item: ContactDetail; index: number }) {
  const Icon = item.icon;
  const Wrapper = item.href ? "a" : "article";
  const linkProps = item.href
    ? {
        href: item.href,
        target: item.href.startsWith("http") ? "_blank" : undefined,
        rel: "noopener noreferrer",
      }
    : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: 0.85, delay: index * 0.08, ease: DS_EASE_REVEAL }}
    >
      <Wrapper {...linkProps} className="vac-premium-card ct-detail-card group relative flex h-full flex-col">
        <span className="vac-premium-card__ribbon" aria-hidden>
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="vac-premium-card__icon">
          <Icon size={22} strokeWidth={1.5} aria-hidden />
        </div>
        <p className="vac-premium-card__dept">{item.label}</p>
        <h3 className="vac-premium-card__title">{item.primary}</h3>
        {item.secondary ? <p className="vac-premium-card__summary">{item.secondary}</p> : null}
        {item.href ? (
          <div className="vac-premium-card__foot mt-auto">
            <span className="ct-detail-cta pointer-events-none">
              {detailCtaLabel(item.id)}
              <ArrowUpRight size={14} className="ct-detail-cta__arrow" aria-hidden />
            </span>
          </div>
        ) : null}
      </Wrapper>
    </motion.div>
  );
}

function IconField({
  icon: Icon,
  children,
  top = false,
}: {
  icon: LucideIcon;
  children: React.ReactNode;
  top?: boolean;
}) {
  return (
    <span className={`vac-premium-field__control${top ? " vac-premium-field__control--area" : ""}`}>
      <Icon
        size={16}
        aria-hidden
        className={`vac-premium-field__icon${top ? " vac-premium-field__icon--area" : ""}`}
      />
      {children}
    </span>
  );
}

function ContactFormPanel() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      message: "",
      privacy: false,
    },
  });

  function onSubmit(values: ContactFormValues) {
    setSubmitted(true);
    toast.success("Bericht ontvangen", {
      description: "Wij nemen zo spoedig mogelijk contact met u op.",
    });
    form.reset();
    void values;
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: DS_EASE }}
        className="vac-premium-form flex min-h-[420px] flex-col items-center justify-center px-6 py-12 text-center"
      >
        <div className="grid h-16 w-16 place-items-center rounded-full border border-[rgba(198,160,98,0.35)] bg-[rgba(198,160,98,0.1)] text-[rgba(226,192,141,0.95)]">
          <CheckCircle2 size={28} />
        </div>
        <h3 className="mt-8 font-display text-3xl text-white">Bedankt voor uw bericht</h3>
        <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/62">
          Wij nemen zo spoedig mogelijk contact met u op. Voor dringende vragen kunt u ons direct
          bellen.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-[rgba(226,192,141,0.95)] transition-colors hover:text-white"
        >
          Nieuw bericht versturen
        </button>
      </motion.div>
    );
  }

  return (
    <Form {...form}>
      <form
        id={FORM_ANCHOR}
        onSubmit={form.handleSubmit(onSubmit)}
        className="vac-premium-form"
        noValidate
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h2 className="vac-premium-form__title">{CONTACT_FORM_SECTION.formTitle}</h2>
          <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(198,160,98,0.28)] bg-white/[0.04] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70">
            <Clock3 size={12} className="text-[rgba(226,192,141,0.95)]" />
            {CONTACT_FORM_SECTION.eta}
          </span>
        </div>

        <div className="vac-premium-form__grid">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="vac-premium-field">
                <FormLabel className="vac-premium-field__label">Uw naam</FormLabel>
                <FormControl>
                  <IconField icon={UserRound}>
                    <Input
                      {...field}
                      placeholder="Vul uw naam in"
                      className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
                    />
                  </IconField>
                </FormControl>
                <FormMessage className="text-[#e8a0a0]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="vac-premium-field">
                <FormLabel className="vac-premium-field__label">E-mail adres</FormLabel>
                <FormControl>
                  <IconField icon={Mail}>
                    <Input
                      {...field}
                      type="email"
                      placeholder="uw@bedrijf.nl"
                      className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
                    />
                  </IconField>
                </FormControl>
                <FormMessage className="text-[#e8a0a0]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem className="vac-premium-field">
                <FormLabel className="vac-premium-field__label">Bedrijf</FormLabel>
                <FormControl>
                  <IconField icon={Building2}>
                    <Input
                      {...field}
                      placeholder="Naam van uw bedrijf"
                      className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
                    />
                  </IconField>
                </FormControl>
                <FormMessage className="text-[#e8a0a0]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="vac-premium-field">
                <FormLabel className="vac-premium-field__label">Telefoonnummer</FormLabel>
                <FormControl>
                  <IconField icon={Phone}>
                    <Input
                      {...field}
                      placeholder="Uw telefoonnummer"
                      className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
                    />
                  </IconField>
                </FormControl>
                <FormMessage className="text-[#e8a0a0]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="vac-premium-field vac-premium-field--full">
                <FormLabel className="vac-premium-field__label">Bericht</FormLabel>
                <FormControl>
                  <IconField icon={NotebookPen} top>
                    <Textarea
                      {...field}
                      placeholder="Typ hier uw bericht..."
                      className="min-h-[120px] resize-none border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
                    />
                  </IconField>
                </FormControl>
                <FormMessage className="text-[#e8a0a0]" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="privacy"
          render={({ field }) => (
            <FormItem className="mt-4">
              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-0.5 border-white/25 data-[state=checked]:border-[#B31217] data-[state=checked]:bg-[#B31217]"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="cursor-pointer text-[13px] font-normal leading-6 text-white/70">
                    Ik ga akkoord met de{" "}
                    <a
                      href="/contact"
                      className="text-[rgba(226,192,141,0.95)] underline underline-offset-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      privacy policy
                    </a>
                  </FormLabel>
                  <FormMessage className="text-[#e8a0a0]" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <button type="submit" className="vac-premium-form__submit" disabled={form.formState.isSubmitting}>
          <SendHorizonal size={16} aria-hidden />
          Verstuur bericht
        </button>

        <p className="vac-premium-form__privacy">
          <LockKeyhole size={13} aria-hidden />
          {CONTACT_FORM_SECTION.privacyNote}
        </p>
      </form>
    </Form>
  );
}

function SidePanel() {
  const rows = [
    {
      icon: MapPin,
      label: BRAND.name,
      value: BRAND.addressFull,
      href: CONTACT_DETAILS[0].href,
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
      icon: Clock3,
      label: "Openingstijden",
      value: BRAND.hours,
    },
  ] as const;

  return (
    <div className="vac-premium-contact">
      <p className="vac-premium-contact__eyebrow">{CONTACT_FORM_SECTION.eyebrow}</p>
      <h2 className="vac-premium-contact__title">{CONTACT_FORM_SECTION.title}</h2>
      <p className="vac-premium-contact__lede">{CONTACT_FORM_SECTION.lede}</p>

      <ul className="vac-premium-contact__rows">
        {rows.map((row) => {
          const Icon = row.icon;
          const inner = (
            <>
              <span className="vac-premium-contact__icon">
                <Icon size={16} aria-hidden />
              </span>
              <span>
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

      <ul className="ct-reassure mt-8 space-y-3">
        {CONTACT_REASSURANCE.map((item) => {
          const Icon = item.icon;
          return (
            <li
              key={item.title}
              className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3.5"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[rgba(198,160,98,0.28)] bg-[rgba(198,160,98,0.1)] text-[rgba(226,192,141,0.95)]">
                <Icon size={16} strokeWidth={1.75} aria-hidden />
              </span>
              <span>
                <span className="block text-[13px] font-semibold text-white/90">{item.title}</span>
                <span className="mt-0.5 block text-[12.5px] leading-relaxed text-white/55">
                  {item.text}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function ContactPage() {
  return (
    <div className="contact-page contact-page--premium">
      <Toaster position="top-center" richColors theme="dark" />

      <ProductCinematicHero
        image={CONTACT_HERO_IMAGE}
        eyebrow={CONTACT_HERO.eyebrow}
        title={CONTACT_HERO.title}
        lede={CONTACT_HERO.lede}
        breadcrumb={[{ label: CONTACT_HERO.breadcrumb }]}
        badge={CONTACT_HERO.badge}
        meta={CONTACT_HERO.stats}
      >
        <a
          href={`#${FORM_ANCHOR}`}
          className="ipek-btn-premium group px-7 py-3.5 text-[11px] tracking-[0.2em] sm:px-9 sm:py-4 sm:text-[12px]"
        >
          <span className="relative z-[1] inline-flex items-center gap-2.5">
            {CONTACT_HERO.ctaPrimary}
            <ArrowUpRight
              size={15}
              className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </a>
        <a
          href={`tel:${BRAND.phoneTel}`}
          className="inline-flex items-center gap-2.5 rounded-2xl border border-white/14 bg-white/[0.05] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/82 backdrop-blur-md transition-all duration-300 hover:border-[rgba(226,192,141,0.4)] hover:bg-white/[0.09] hover:text-white sm:px-7 sm:py-4"
        >
          {CONTACT_HERO.ctaSecondary}
          <Phone size={14} />
        </a>
      </ProductCinematicHero>

      <div className="pr-intro-stack relative z-[1]">
        <section
          id={DETAILS_ANCHOR}
          className="vac-premium-listings grain overflow-visible"
          aria-labelledby="contact-details-heading"
        >
          <div className="vac-premium-listings__ambient" aria-hidden />
          <div className="vac-premium-listings__inner ipek-container">
            <Reveal className="vac-premium-listings__head">
              <p className="vac-premium-listings__eyebrow">{CONTACT_DETAILS_SECTION.eyebrow}</p>
              <h2 id="contact-details-heading" className="vac-premium-listings__title">
                {CONTACT_DETAILS_SECTION.title}
              </h2>
              <p className="vac-premium-listings__lede">{CONTACT_DETAILS_SECTION.lede}</p>
            </Reveal>

            <div className="vac-premium-listings__grid ct-details-grid">
              {CONTACT_DETAILS.map((item, i) => (
                <DetailCard key={item.id} item={item} index={i} />
              ))}
            </div>

            <Reveal className="mt-8 flex flex-wrap justify-center gap-3" delay={0.08}>
              {CONTACT_QUICK_ACTIONS.map((action) => {
                const Icon = action.icon;
                const isPrimary = "primary" in action && action.primary;
                return (
                  <a
                    key={action.label}
                    href={action.href}
                    target={action.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className={
                      isPrimary
                        ? "ipek-btn-premium inline-flex min-h-[48px] items-center gap-2 px-6 text-[11px] tracking-[0.16em]"
                        : "inline-flex min-h-[48px] items-center gap-2 rounded-2xl border border-[#e8e4de] bg-white px-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#555] shadow-sm transition hover:border-[rgba(179,18,23,0.25)] hover:text-[#111]"
                    }
                  >
                    <span className="relative z-[1] inline-flex items-center gap-2">
                      <Icon size={14} className={isPrimary ? "text-white" : "text-[#B31217]"} />
                      {action.label}
                    </span>
                  </a>
                );
              })}
            </Reveal>
          </div>
        </section>

        <div className="relative z-30 -mt-10 px-4 sm:-mt-14 lg:-mt-16">
          <ProductTrustRibbon />
        </div>
      </div>

      <section
        className="vac-premium-apply grain pt-16 lg:pt-24"
        aria-labelledby="contact-form-heading"
      >
        <div className="vac-premium-apply__media" aria-hidden>
          <img src={CONTACT_HERO_IMAGE} alt="" loading="lazy" decoding="async" />
          <div className="vac-premium-apply__media-scrim" />
        </div>

        <div className="vac-premium-apply__inner ipek-container">
          <div className="vac-premium-apply__grid">
            <Reveal className="vac-premium-apply__form-col">
              <h2 id="contact-form-heading" className="sr-only">
                {CONTACT_FORM_SECTION.title}
              </h2>
              <ContactFormPanel />
            </Reveal>
            <Reveal className="vac-premium-apply__contact-col" delay={0.1}>
              <SidePanel />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="ct-partner grain relative overflow-hidden bg-gradient-to-b from-[#FBF8F3] via-[#f7f2ea] to-[#ECE5DA] py-16 sm:py-20 lg:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-[rgba(255,200,160,0.22)] blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-[rgba(179,18,23,0.06)] blur-3xl"
        />
        <div className="relative ipek-container grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#B31217]">
              {CONTACT_PARTNER.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,3.5vw,3.1rem)] leading-[1.05] text-[#141414]">
              {CONTACT_PARTNER.title}
            </h2>
            <p className="mt-5 max-w-[52ch] text-[15px] leading-[1.85] text-[#555]">
              {CONTACT_PARTNER.text}
            </p>
            <a
              href={`#${FORM_ANCHOR}`}
              className="ipek-btn-premium mt-8 inline-flex min-h-[48px] items-center gap-2 px-7 text-[11px] tracking-[0.18em]"
            >
              <span className="relative z-[1] inline-flex items-center gap-2">
                {CONTACT_PARTNER.cta}
                <ArrowUpRight size={14} />
              </span>
            </a>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={0.08}>
            <div className="relative overflow-hidden rounded-[28px] border border-[#e8e4de] shadow-[0_32px_90px_-44px_rgba(0,0,0,0.2)] lg:rounded-[32px]">
              <img
                src={CONTACT_HERO_IMAGE}
                alt="Ayat Food Vleesgroothandel in Watergang"
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/85 via-[#0a0a0a]/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[rgba(240,226,202,0.95)]">
                  Ayat Food Vleesgroothandel
                </p>
                <p className="mt-2 font-display text-2xl leading-tight text-white">
                  Persoonlijk contact, professionele service
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="relative ipek-container mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CONTACT_TRUST.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-start gap-3 rounded-2xl border border-[#ebe7e1] bg-white/80 px-4 py-4"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[rgba(179,18,23,0.12)] bg-[rgba(179,18,23,0.06)] text-[#B31217]">
                  <Icon size={17} strokeWidth={1.7} aria-hidden />
                </span>
                <span>
                  <span className="block text-[13.5px] font-medium text-[#141414]">{item.title}</span>
                  <span className="mt-0.5 block text-[12.5px] leading-relaxed text-[#666]">
                    {item.description}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <ContactMobileStickyBar />
    </div>
  );
}
