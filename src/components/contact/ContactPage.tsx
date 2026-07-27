import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock3,
  LockKeyhole,
  Mail,
  NotebookPen,
  Phone,
  SendHorizonal,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SiteLayout } from "@/components/SiteLayout";
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
import { DS_EASE, DS_EASE_REVEAL } from "@/lib/design-system";
import backgroundWhite1 from "@/assets/background-white1.webp";
import backgroundWhite3 from "@/assets/background-white3.webp";
import {
  CONTACT_DETAILS,
  CONTACT_HERO_IMAGE,
  CONTACT_PARTNER,
  CONTACT_QUICK_ACTIONS,
  CONTACT_REASSURANCE,
  CONTACT_TRUST,
  type ContactDetail,
} from "@/lib/contact-content";
import { toast } from "sonner";

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

const fieldClass =
  "h-12 rounded-xl border border-[#e8e4de] bg-[#fcfbfa] pl-11 text-[14px] text-[#1c1c1c] transition-all duration-300 placeholder:text-[#b0aaa2] focus-visible:border-[rgba(179,18,23,0.35)] focus-visible:bg-white focus-visible:ring-0 focus-visible:shadow-[inset_0_0_0_1px_rgba(179,18,23,0.12)]";

const textareaClass =
  "min-h-[140px] resize-none rounded-xl border border-[#e8e4de] bg-[#fcfbfa] pl-11 pt-3.5 text-[14px] leading-[1.7] text-[#1c1c1c] transition-all duration-300 placeholder:text-[#b0aaa2] focus-visible:border-[rgba(179,18,23,0.35)] focus-visible:bg-white focus-visible:ring-0 focus-visible:shadow-[inset_0_0_0_1px_rgba(179,18,23,0.12)]";

function ContactBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <img
        src={backgroundWhite1}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        decoding="async"
      />
      <img
        src={CONTACT_HERO_IMAGE}
        alt=""
        aria-hidden
        loading="eager"
        decoding="async"
        referrerPolicy="no-referrer"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.11]"
        style={{ filter: "brightness(0.94) contrast(1.04) saturate(0.95)" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_12%_18%,rgba(179,18,23,0.06),transparent_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_88%_25%,rgba(226,192,141,0.12),transparent_55%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#f8f6f3] via-[#f8f6f3]/80 to-transparent" />
    </div>
  );
}

function ReassuranceStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.44, ease: DS_EASE }}
      className="mt-8 grid gap-3 sm:grid-cols-3"
    >
      {CONTACT_REASSURANCE.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={item.title}
            className="group flex items-start gap-3 rounded-2xl border border-[#ebe7e1] bg-white/85 px-4 py-4 shadow-[0_12px_40px_-32px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-all duration-500 hover:border-[rgba(179,18,23,0.2)] hover:shadow-[0_18px_48px_-28px_rgba(179,18,23,0.12)]"
          >
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[rgba(179,18,23,0.08)] text-[#B31217] transition-colors duration-500 group-hover:bg-[rgba(179,18,23,0.12)]">
              <Icon size={17} strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-[12px] font-semibold text-[#1c1c1c]">{item.title}</p>
              <p className="mt-1 text-[12px] leading-relaxed text-[#6f6a63]">{item.text}</p>
            </div>
            <span
              aria-hidden
              className="ml-auto hidden text-[10px] font-semibold tabular-nums text-[#e0dbd4] sm:block"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        );
      })}
    </motion.div>
  );
}

function DetailCard({ item, index }: { item: ContactDetail; index: number }) {
  const Icon = item.icon;
  const Wrapper = item.href ? "a" : "div";
  const linkProps = item.href
    ? {
        href: item.href,
        target: item.href.startsWith("http") ? "_blank" : undefined,
        rel: "noopener noreferrer",
      }
    : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.25 + index * 0.07, ease: DS_EASE_REVEAL }}
    >
      <Wrapper
        {...linkProps}
        className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-[#ebe7e1] bg-[linear-gradient(165deg,#ffffff_0%,#faf8f5_100%)] p-6 shadow-[0_18px_50px_-36px_rgba(0,0,0,0.14)] transition-all duration-500 hover:-translate-y-1 hover:border-[rgba(179,18,23,0.22)] hover:shadow-[0_28px_70px_-30px_rgba(179,18,23,0.14)]"
      >
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-[3px] bg-[linear-gradient(180deg,#B31217_0%,rgba(198,160,98,0.85)_100%)] opacity-80 transition-opacity duration-500 group-hover:opacity-100"
        />
        <span
          aria-hidden
          className="absolute right-5 top-5 text-[11px] font-semibold tabular-nums tracking-[0.12em] text-[#e5e0d8] transition-colors duration-500 group-hover:text-[rgba(179,18,23,0.35)]"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex items-center justify-between gap-3 pl-1 pr-8">
          <div className="grid h-11 w-11 place-items-center rounded-2xl border border-[rgba(179,18,23,0.12)] bg-[rgba(179,18,23,0.06)] text-[#B31217] shadow-[0_8px_24px_-16px_rgba(179,18,23,0.25)] transition-all duration-500 group-hover:border-[rgba(179,18,23,0.22)] group-hover:bg-[rgba(179,18,23,0.1)]">
            <Icon size={18} strokeWidth={1.75} />
          </div>
          {item.href ? (
            <ArrowUpRight
              size={14}
              className="text-[#c8c2b8] transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#B31217]"
            />
          ) : null}
        </div>
        <p className="mt-5 pl-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9a948c]">
          {item.label}
        </p>
        <p className="mt-2 pl-1 font-display text-[1.35rem] leading-tight text-[#1c1c1c] transition-colors duration-300 group-hover:text-[#B31217]">
          {item.primary}
        </p>
        {item.secondary ? (
          <p className="mt-2 pl-1 text-[13px] leading-relaxed text-[#6f6a63]">{item.secondary}</p>
        ) : null}
      </Wrapper>
    </motion.div>
  );
}

function IconField({
  icon: Icon,
  children,
  className = "",
}: {
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Icon
        size={16}
        strokeWidth={1.75}
        className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[rgba(179,18,23,0.45)]"
      />
      {children}
    </div>
  );
}

function IconTextarea({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <div className="relative">
      <Icon
        size={16}
        strokeWidth={1.75}
        className="pointer-events-none absolute left-4 top-4 z-10 text-[rgba(179,18,23,0.45)]"
      />
      {children}
    </div>
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
        className="flex min-h-[520px] flex-col items-center justify-center rounded-[32px] border border-[rgba(198,160,98,0.28)] bg-white px-8 py-16 text-center shadow-[0_32px_90px_-44px_rgba(0,0,0,0.14)]"
      >
        <div className="grid h-16 w-16 place-items-center rounded-full border border-[rgba(198,160,98,0.35)] bg-[rgba(198,160,98,0.1)] text-[rgba(179,18,23,0.9)]">
          <CheckCircle2 size={28} />
        </div>
        <h3 className="mt-8 font-display text-3xl text-[#1c1c1c]">Bedankt voor uw bericht</h3>
        <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-[#666]">
          Wij nemen zo spoedig mogelijk contact met u op. Voor dringende vragen kunt u ons direct
          bellen.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B31217] transition-colors hover:text-[#8e0e12]"
        >
          Nieuw bericht versturen
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, x: 20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 1, delay: 0.12, ease: DS_EASE_REVEAL }}
      className="lg:pl-4 xl:pl-8"
    >
      <div className="group relative overflow-hidden rounded-[32px] border border-[#e8e4de] bg-[linear-gradient(165deg,#ffffff_0%,#faf8f5_52%,#f3efe8_100%)] shadow-[0_40px_100px_-48px_rgba(0,0,0,0.22),0_0_0_1px_rgba(255,255,255,0.8)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-[4px] bg-[linear-gradient(180deg,#B31217_0%,rgba(198,160,98,0.9)_55%,rgba(198,160,98,0.35)_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(179,18,23,0.06)_0%,transparent_70%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(198,160,98,0.08)_0%,transparent_68%)]"
        />

        <div className="relative border-b border-[#ebe7e1]/80 px-7 py-8 md:px-9 md:py-9">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="ipek-label ipek-heading-label text-[10px] tracking-[0.28em]">
                Stuur ons een bericht
              </p>
              <h2 className="mt-3 max-w-md font-display text-[clamp(1.75rem,2.5vw,2.35rem)] leading-[1.02] text-[#1c1c1c]">
                Vertel ons over uw vraag of samenwerking
              </h2>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(198,160,98,0.28)] bg-white/90 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#666] shadow-sm">
              <Clock3 size={12} className="text-[#B31217]" />
              Reactie binnen 1 werkdag
            </span>
          </div>
          <p className="mt-4 max-w-lg text-[14px] leading-[1.75] text-[#6f6a63]">
            Vul het formulier in en ons team neemt persoonlijk contact met u op. Voor spoed kunt u
            ons ook direct bellen.
          </p>
        </div>

        <div className="relative px-7 py-8 md:px-9 md:py-9">
          <Form {...form}>
            <form id="contact-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[12px] font-medium text-[#5a554e]">
                        Uw naam
                      </FormLabel>
                      <FormControl>
                        <IconField icon={UserRound}>
                          <Input {...field} placeholder="Vul uw naam in" className={fieldClass} />
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
                    <FormItem>
                      <FormLabel className="text-[12px] font-medium text-[#5a554e]">
                        E-mail adres
                      </FormLabel>
                      <FormControl>
                        <IconField icon={Mail}>
                          <Input
                            {...field}
                            type="email"
                            placeholder="uw@bedrijf.nl"
                            className={fieldClass}
                          />
                        </IconField>
                      </FormControl>
                      <FormMessage className="text-[#e8a0a0]" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[12px] font-medium text-[#5a554e]">
                        Bedrijf
                      </FormLabel>
                      <FormControl>
                        <IconField icon={Building2}>
                          <Input
                            {...field}
                            placeholder="Naam van uw bedrijf"
                            className={fieldClass}
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
                    <FormItem>
                      <FormLabel className="text-[12px] font-medium text-[#5a554e]">
                        Telefoonnummer
                      </FormLabel>
                      <FormControl>
                        <IconField icon={Phone}>
                          <Input
                            {...field}
                            placeholder="Uw telefoonnummer"
                            className={fieldClass}
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
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[12px] font-medium text-[#5a554e]">
                      Bericht
                    </FormLabel>
                    <FormControl>
                      <IconTextarea icon={NotebookPen}>
                        <Textarea
                          {...field}
                          placeholder="Typ hier uw bericht..."
                          className={textareaClass}
                        />
                      </IconTextarea>
                    </FormControl>
                    <FormMessage className="text-[#e8a0a0]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="privacy"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-start gap-3 rounded-xl border border-[#ebe7e1] bg-white/80 px-4 py-3.5">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-0.5 border-[#ccc] data-[state=checked]:border-[#B31217] data-[state=checked]:bg-[#B31217]"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="cursor-pointer text-[13px] font-normal leading-6 text-[#555]">
                          Ik ga akkoord met de{" "}
                          <a
                            href="https://www.ipekcislachterij.nl/privacy-policy/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#B31217] underline underline-offset-4 transition-colors hover:text-[#8e0e12]"
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

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="group relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#B31217] text-[12px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_20px_50px_-25px_rgba(177,18,23,0.55)] transition-all duration-500 hover:bg-[#C0181D] hover:shadow-[0_24px_60px_-22px_rgba(177,18,23,0.65)] disabled:opacity-50"
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.14),transparent)] transition-transform duration-700 group-hover:translate-x-full" />
                  <SendHorizonal
                    size={16}
                    className="relative transition-transform duration-500 group-hover:translate-x-0.5"
                  />
                  <span className="relative">Verstuur bericht</span>
                </button>
              </div>

              <div className="flex flex-wrap items-start justify-between gap-4 border-t border-[#ebe7e1] pt-5">
                <div className="flex items-start gap-2.5 text-[12px] leading-relaxed text-[#8a847c]">
                  <LockKeyhole size={13} className="mt-0.5 shrink-0 text-[#B31217]" />
                  <span>
                    Uw gegevens worden vertrouwelijk behandeld en niet gedeeld met derden.
                  </span>
                </div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b0aaa2]">
                  Ipekçi B2B · Harderwijk
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </motion.div>
  );
}

export function ContactPage() {
  const reduceMotion = useReducedMotion();
  const titleWords = ["Neem", "contact", "met", "ons", "op"];

  return (
    <SiteLayout>
      <Toaster position="top-center" richColors theme="light" />

      <section className="relative overflow-hidden bg-[#f8f6f3] pt-36 text-[#1c1c1c] md:pt-40 lg:pt-[148px]">
        <ContactBackdrop />

        <div className="relative ipek-container px-6 pb-20 lg:px-10 lg:pb-28">
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: DS_EASE }}
            className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[#999]"
          >
            <Link to="/" className="transition-colors hover:text-[#B31217]">
              Home
            </Link>
            <ChevronRight size={12} className="text-[#ccc]" />
            <span className="text-[#444]">Contact</span>
          </motion.nav>

          <div className="mt-14 grid items-start gap-14 lg:grid-cols-12 lg:gap-12 xl:gap-16">
            <div className="lg:col-span-5 xl:col-span-5">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.05, ease: DS_EASE }}
                className="ipek-label ipek-heading-label text-[10px] tracking-[0.32em]"
              >
                Contact
              </motion.p>

              <h1 className="mt-5 max-w-xl font-display text-[clamp(2.6rem,5vw,4.2rem)] leading-[0.98] text-[#1c1c1c]">
                {titleWords.map((word, i) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 36, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.85, delay: 0.12 + i * 0.06, ease: DS_EASE_REVEAL }}
                    className={`mr-[0.2em] inline-block ${word === "ons" ? "italic text-[var(--primary)]" : ""}`}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: DS_EASE }}
                className="mt-6 max-w-md text-[15px] leading-[1.85] text-[#5a5a5a]"
              >
                Heeft u een vraag over levering, assortiment of samenwerking? Ons team staat
                persoonlijk voor u klaar — met korte lijnen en duidelijke afspraken.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.46, ease: DS_EASE }}
                className="mt-6 flex flex-wrap gap-2"
              >
                {["B2B partner", "Halal gecertificeerd", "Harderwijk"].map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center rounded-full border border-[rgba(179,18,23,0.14)] bg-white/90 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#666] shadow-sm"
                  >
                    <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#B31217]" aria-hidden />
                    {badge}
                  </span>
                ))}
              </motion.div>

              <ReassuranceStrip />

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.52, ease: DS_EASE }}
                className="mt-6 flex flex-wrap gap-3"
              >
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
                          ? "group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-[#B31217] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_16px_48px_-24px_rgba(177,18,23,0.55)] transition-all duration-500 hover:bg-[#C0181D] hover:shadow-[0_20px_56px_-22px_rgba(177,18,23,0.65)]"
                          : "inline-flex items-center gap-2.5 rounded-full border border-[#e8e4de] bg-white px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#555] shadow-sm transition-all duration-500 hover:border-[rgba(179,18,23,0.25)] hover:text-[#111] hover:shadow-md"
                      }
                    >
                      {isPrimary ? (
                        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)] transition-transform duration-700 group-hover:translate-x-full" />
                      ) : null}
                      <Icon
                        size={14}
                        className={`relative ${isPrimary ? "text-white" : "text-[#B31217]"}`}
                      />
                      <span className="relative">{action.label}</span>
                    </a>
                  );
                })}
              </motion.div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {CONTACT_DETAILS.map((item, i) => (
                  <DetailCard key={item.id} item={item} index={i} />
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 xl:col-span-7">
              <div className="mx-auto max-w-[620px] lg:ml-auto lg:mr-0">
                <ContactFormPanel />
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-4 border-t border-[#ebe7e1] bg-[linear-gradient(180deg,#ffffff_0%,#faf8f5_100%)]">
          <div className="mx-auto grid ipek-container gap-4 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:px-10 lg:py-12">
            {CONTACT_TRUST.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-5%" }}
                  transition={{ duration: 0.7, delay: index * 0.06, ease: DS_EASE }}
                  className="group relative flex items-start gap-4 overflow-hidden rounded-[20px] border border-[#ebe7e1] bg-white px-5 py-5 shadow-[0_14px_40px_-32px_rgba(0,0,0,0.14)] transition-all duration-500 hover:-translate-y-0.5 hover:border-[rgba(179,18,23,0.18)] hover:shadow-[0_20px_50px_-28px_rgba(179,18,23,0.1)]"
                >
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-[2px] bg-[#B31217] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[rgba(179,18,23,0.12)] bg-[rgba(179,18,23,0.06)] text-[#B31217] transition-colors duration-500 group-hover:bg-[rgba(179,18,23,0.1)]">
                    <Icon size={18} strokeWidth={1.7} />
                  </div>
                  <div>
                    <p className="text-[14px] font-medium text-[#1c1c1c]">{item.title}</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-[#666]">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden ipek-section">
        <img
          src={backgroundWhite3}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_0%_50%,rgba(226,192,141,0.08),transparent_55%)]"
        />
        <div className="relative mx-auto grid ipek-container items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.9, ease: DS_EASE }}
            className="lg:col-span-7"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#B31217]">
              {CONTACT_PARTNER.eyebrow}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,3.5vw,3.2rem)] leading-[1.02] text-[#111]">
              {CONTACT_PARTNER.title}
            </h2>
            <p className="mt-6 max-w-2xl text-[15px] leading-[1.85] text-[#555]">
              {CONTACT_PARTNER.text}
            </p>
            <a
              href="#contact-form"
              className="group relative mt-10 inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#B31217] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_20px_60px_-30px_rgba(177,18,23,0.55)] transition-all duration-500 hover:bg-[#C0181D] hover:shadow-[0_24px_70px_-28px_rgba(177,18,23,0.65)]"
            >
              {CONTACT_PARTNER.cta}
              <ArrowUpRight
                size={14}
                className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.9, delay: 0.08, ease: DS_EASE }}
            className="lg:col-span-5"
          >
            <div className="group relative overflow-hidden rounded-[32px] border border-[#e8e4de] bg-white shadow-[0_32px_90px_-44px_rgba(0,0,0,0.16)]">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[4px] bg-[linear-gradient(180deg,#B31217_0%,rgba(198,160,98,0.85)_100%)]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-[linear-gradient(90deg,transparent,rgba(179,18,23,0.2),transparent)]"
              />
              <img
                src={CONTACT_HERO_IMAGE}
                alt="Ipekçi Slachterij contact"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="aspect-[4/5] w-full object-cover transition-transform duration-[1.35s] ease-[cubic-bezier(.22,.61,.36,1)] group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/45 via-[#1a1a1a]/5 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 z-10 p-7 md:p-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/75">
                  Ipekçi Slachterij
                </p>
                <p className="mt-2 font-display text-2xl leading-tight text-white">
                  Persoonlijk contact, professionele service
                </p>
                <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-white/80">
                  Bezoek ons in Harderwijk of neem direct contact op — wij denken graag met u mee.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </SiteLayout>
  );
}
