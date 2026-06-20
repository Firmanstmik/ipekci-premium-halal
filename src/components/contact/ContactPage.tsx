import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  LockKeyhole,
  Mail,
  NotebookPen,
  Phone,
  SendHorizonal,
  UserRound,
} from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
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
import {
  CONTACT_DETAILS,
  CONTACT_HERO_IMAGE,
  CONTACT_PARTNER,
  CONTACT_QUICK_ACTIONS,
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
  "h-12 rounded-xl border-white/10 bg-white/[0.04] pl-11 text-[14px] text-white placeholder:text-white/30 transition-all duration-300 focus-visible:border-[rgba(226,192,141,0.45)] focus-visible:bg-white/[0.06] focus-visible:ring-0";

const textareaClass =
  "min-h-[128px] resize-none rounded-xl border-white/10 bg-white/[0.04] pl-11 pt-3.5 text-[14px] text-white placeholder:text-white/30 transition-all duration-300 focus-visible:border-[rgba(226,192,141,0.45)] focus-visible:bg-white/[0.06] focus-visible:ring-0";

function ContactBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#030303]" />
      <img
        src={CONTACT_HERO_IMAGE}
        alt=""
        aria-hidden
        loading="eager"
        decoding="async"
        referrerPolicy="no-referrer"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.14]"
        style={{ filter: "brightness(0.5) contrast(1.05) saturate(0.85)" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_15%_20%,rgba(226,192,141,0.1),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_85%_30%,rgba(177,18,23,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/60 via-[#030303]/88 to-[#030303]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#030303]/95 via-[#030303]/80 to-[#030303]/55" />
    </div>
  );
}

function DetailCard({ item, index }: { item: ContactDetail; index: number }) {
  const Icon = item.icon;
  const Wrapper = item.href ? "a" : "div";
  const linkProps = item.href
    ? { href: item.href, target: item.href.startsWith("http") ? "_blank" : undefined, rel: "noopener noreferrer" }
    : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.25 + index * 0.07, ease: DS_EASE_REVEAL }}
    >
      <Wrapper
        {...linkProps}
        className="group flex h-full flex-col rounded-[20px] border border-white/[0.08] bg-white/[0.03] p-5 transition-all duration-500 hover:border-[rgba(226,192,141,0.28)] hover:bg-white/[0.05]"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full border border-[rgba(226,192,141,0.22)] bg-[rgba(226,192,141,0.06)] text-[rgba(226,192,141,0.9)] transition-colors duration-500 group-hover:border-[rgba(226,192,141,0.4)]">
            <Icon size={17} strokeWidth={1.75} />
          </div>
          {item.href ? (
            <ArrowUpRight
              size={14}
              className="text-white/25 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[rgba(226,192,141,0.85)]"
            />
          ) : null}
        </div>
        <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/38">
          {item.label}
        </p>
        <p className="mt-2 font-display text-lg text-white transition-colors group-hover:text-[rgba(226,192,141,0.95)]">
          {item.primary}
        </p>
        {item.secondary ? (
          <p className="mt-1.5 text-[13px] leading-relaxed text-white/48">{item.secondary}</p>
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
        className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-white/35"
      />
      {children}
    </div>
  );
}

function IconTextarea({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <Icon
        size={16}
        strokeWidth={1.75}
        className="pointer-events-none absolute left-4 top-4 z-10 text-white/35"
      />
      {children}
    </div>
  );
}

function ContactFormPanel() {
  const [submitted, setSubmitted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-4, 4]), { stiffness: 140, damping: 28 });
  const rotateX = useSpring(useTransform(my, [0, 1], [3, -3]), { stiffness: 140, damping: 28 });
  const glareX = useTransform(mx, (v) => `${v * 100}%`);
  const glareY = useTransform(my, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(520px 360px at ${glareX} ${glareY}, rgba(255,255,255,0.1) 0%, transparent 58%)`;

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

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }

  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

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
        className="flex min-h-[520px] flex-col items-center justify-center rounded-[28px] border border-[rgba(226,192,141,0.22)] bg-white/[0.04] px-8 py-16 text-center backdrop-blur-xl"
      >
        <div className="grid h-16 w-16 place-items-center rounded-full border border-[rgba(226,192,141,0.3)] bg-[rgba(226,192,141,0.08)] text-[rgba(226,192,141,0.95)]">
          <CheckCircle2 size={28} />
        </div>
        <h3 className="mt-8 font-display text-3xl text-white">Bedankt voor uw bericht</h3>
        <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/55">
          Wij nemen zo spoedig mogelijk contact met u op. Voor dringende vragen kunt u ons direct
          bellen.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-[rgba(226,192,141,0.85)] transition-colors hover:text-white"
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
      style={{ perspective: 1200 }}
    >
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative"
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative overflow-hidden rounded-[28px] border border-white/12 bg-[#0a0a0a]/75 p-7 shadow-[0_40px_100px_-45px_rgba(0,0,0,0.95)] backdrop-blur-2xl md:p-9"
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: glare }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(226,192,141,0.45)] to-transparent"
          />

          <div className="relative">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[rgba(226,192,141,0.85)]">
              Stuur ons een bericht
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,2.5vw,2.4rem)] text-white">
              Wij nemen zo spoedig mogelijk contact op
            </h2>

            <Form {...form}>
              <form
                id="contact-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-8 space-y-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[12px] text-white/55">Uw naam</FormLabel>
                        <FormControl>
                          <IconField icon={UserRound}>
                            <Input
                              {...field}
                              placeholder="Vul uw naam in"
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[12px] text-white/55">E-mail adres</FormLabel>
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
                        <FormLabel className="text-[12px] text-white/55">Bedrijf</FormLabel>
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
                        <FormLabel className="text-[12px] text-white/55">Telefoonnummer</FormLabel>
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
                      <FormLabel className="text-[12px] text-white/55">Bericht</FormLabel>
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
                      <div className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-0.5 border-white/20 data-[state=checked]:border-[#B31217] data-[state=checked]:bg-[#B31217]"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="cursor-pointer text-[13px] font-normal leading-6 text-white/58">
                            Ik ga akkoord met de{" "}
                            <a
                              href="https://www.ipekcislachterij.nl/privacy-policy/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[rgba(226,192,141,0.9)] underline underline-offset-4 transition-colors hover:text-white"
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

                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="h-12 w-full rounded-xl bg-[#B31217] text-[12px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_20px_50px_-25px_rgba(177,18,23,0.8)] transition-all duration-500 hover:bg-[#C0181D] disabled:opacity-50"
                >
                  <SendHorizonal size={16} className="mr-2" />
                  Verstuur bericht
                </Button>

                <div className="flex items-start gap-2.5 text-[12px] leading-relaxed text-white/38">
                  <LockKeyhole size={13} className="mt-0.5 shrink-0 text-[rgba(226,192,141,0.7)]" />
                  <span>Uw gegevens worden vertrouwelijk behandeld en niet gedeeld met derden.</span>
                </div>
              </form>
            </Form>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function ContactPage() {
  const reduceMotion = useReducedMotion();
  const titleWords = ["Neem", "contact", "met", "ons", "op"];

  return (
    <SiteLayout>
      <Toaster position="top-center" richColors theme="dark" />

      <section className="relative overflow-hidden bg-[#030303] pt-36 text-white grain md:pt-40 lg:pt-[148px]">
        <ContactBackdrop />

        <div className="relative mx-auto max-w-[1480px] px-6 pb-20 lg:px-10 lg:pb-28">
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: DS_EASE }}
            className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-white/38"
          >
            <Link to="/" className="transition-colors hover:text-[rgba(226,192,141,0.9)]">
              Home
            </Link>
            <ChevronRight size={12} className="text-white/20" />
            <span className="text-white/72">Contact</span>
          </motion.nav>

          <div className="mt-14 grid items-start gap-14 lg:grid-cols-12 lg:gap-12 xl:gap-16">
            <div className="lg:col-span-5 xl:col-span-5">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.05, ease: DS_EASE }}
                className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[rgba(226,192,141,0.85)]"
              >
                Contact
              </motion.p>

              <h1 className="mt-5 max-w-xl font-display text-[clamp(2.6rem,5vw,4.2rem)] leading-[0.98] text-white">
                {titleWords.map((word, i) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 36, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.85, delay: 0.12 + i * 0.06, ease: DS_EASE_REVEAL }}
                    className={`mr-[0.2em] inline-block ${word === "ons" ? "italic text-[rgba(226,192,141,0.95)]" : ""}`}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: DS_EASE }}
                className="mt-6 max-w-md text-[15px] leading-[1.85] text-white/52"
              >
                Wij staan klaar om uw vragen te beantwoorden, advies te geven en samen te werken aan
                de beste halal oplossingen voor uw bedrijf.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.48, ease: DS_EASE }}
                className="mt-8 flex flex-wrap gap-3"
              >
                {CONTACT_QUICK_ACTIONS.map((action) => {
                  const Icon = action.icon;
                  return (
                    <a
                      key={action.label}
                      href={action.href}
                      target={action.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/62 transition-all duration-500 hover:border-[rgba(226,192,141,0.3)] hover:text-white"
                    >
                      <Icon size={14} className="text-[rgba(226,192,141,0.85)]" />
                      {action.label}
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

        <div className="relative border-t border-white/[0.06] bg-[#050505]/80 backdrop-blur-sm">
          <div className="mx-auto grid max-w-[1480px] gap-px bg-white/[0.04] px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-10">
            {CONTACT_TRUST.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-5%" }}
                  transition={{ duration: 0.7, delay: index * 0.06, ease: DS_EASE }}
                  className="flex items-start gap-4 bg-[#050505] px-0 py-7 lg:px-6"
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[rgba(226,192,141,0.22)] bg-[rgba(226,192,141,0.05)] text-[rgba(226,192,141,0.9)]">
                    <Icon size={18} strokeWidth={1.7} />
                  </div>
                  <div>
                    <p className="text-[14px] text-white">{item.title}</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-white/48">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#FAF8F5] px-6 py-24 grain lg:px-10 lg:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_0%_50%,rgba(226,192,141,0.12),transparent_55%)]"
        />
        <div className="relative mx-auto grid max-w-[1480px] items-center gap-12 lg:grid-cols-12 lg:gap-16">
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
              className="group mt-10 inline-flex items-center gap-3 rounded-full bg-[#B31217] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_20px_60px_-30px_rgba(177,18,23,0.75)] transition-all duration-500 hover:bg-[#C0181D]"
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
            <div className="relative overflow-hidden rounded-[24px] border border-[rgba(226,192,141,0.28)] shadow-[0_32px_80px_-40px_rgba(0,0,0,0.28)]">
              <img
                src={CONTACT_HERO_IMAGE}
                alt="Ipekçi Slachterij contact"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111]/30 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>
    </SiteLayout>
  );
}
