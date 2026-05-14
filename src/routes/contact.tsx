import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, Mail, Phone, MapPin, Clock } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { MagneticButton } from "@/components/MagneticButton";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Nordlink" },
      {
        name: "description",
        content:
          "Neem contact op met Nordlink voor offertes, samenwerkingen of carrièremogelijkheden. Reactie binnen 4 uur.",
      },
      { property: "og:title", content: "Contact — Nordlink Logistiek" },
    ],
  }),
  component: ContactPage,
});

const channels = [
  { icon: Mail, label: "E-mail", value: "contact@nordlink.nl", href: "mailto:contact@nordlink.nl" },
  { icon: Phone, label: "Telefoon", value: "+31 (0)10 244 18 00", href: "tel:+31102441800" },
  { icon: MapPin, label: "Hoofdkantoor", value: "Waalhaven Z.z. 19, Rotterdam", href: "#" },
  { icon: Clock, label: "Bereikbaar", value: "Ma–Vr 07:00 – 19:00 · 24/7 dispatch", href: "#" },
];

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <SiteLayout>
      {/* Header */}
      <section className="border-b border-white/5 bg-background px-6 pb-20 pt-44 lg:px-10 lg:pt-52">
        <div className="mx-auto max-w-[1480px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
              Contact
            </p>
            <h1 className="mt-6 max-w-5xl font-display text-5xl text-foreground md:text-7xl lg:text-8xl text-balance">
              Laten we uw <span className="text-gradient-orange">volgende</span> zending plannen.
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Form + channels */}
      <section className="bg-background px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-[1480px] gap-16 lg:grid-cols-12">
          {/* Channels */}
          <div className="lg:col-span-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
              Direct contact
            </p>
            <h2 className="mt-5 font-display text-3xl text-foreground md:text-4xl">
              Onze accountmanagers staan klaar.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Reactie binnen 4 uur op werkdagen. Voor tijdkritische vracht is onze 24/7 dispatch
              altijd bereikbaar.
            </p>

            <ul className="mt-12 divide-y divide-white/5 border-y border-white/5">
              {channels.map((c) => {
                const Icon = c.icon;
                return (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      className="group flex items-center justify-between gap-6 py-6 transition-colors hover:text-primary"
                    >
                      <div className="flex items-center gap-5">
                        <Icon className="text-primary" size={20} />
                        <div>
                          <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                            {c.label}
                          </div>
                          <div className="mt-1 text-base text-foreground">{c.value}</div>
                        </div>
                      </div>
                      <ArrowUpRight
                        size={18}
                        className="text-foreground/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="rounded-sm border border-white/10 bg-surface p-8 md:p-12 lg:p-14">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-12 text-center"
                >
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary/15">
                    <ArrowUpRight className="text-primary" size={28} />
                  </div>
                  <h3 className="mt-8 font-display text-3xl text-foreground">Bedankt.</h3>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Uw aanvraag is ontvangen. Een accountmanager neemt binnen 4 uur contact met u
                    op.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                >
                  <div className="grid gap-6 md:grid-cols-2">
                    <Field label="Naam" name="name" required />
                    <Field label="Bedrijf" name="company" />
                    <Field label="E-mail" name="email" type="email" required />
                    <Field label="Telefoon" name="phone" type="tel" />
                  </div>
                  <div className="mt-6">
                    <Field label="Type dienst" name="service" />
                  </div>
                  <div className="mt-6">
                    <label className="block text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                      Bericht
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      className="mt-3 w-full resize-none border-b border-white/15 bg-transparent pb-3 pt-2 text-base text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
                      placeholder="Vertel ons over uw routes, volumes en deadlines..."
                    />
                  </div>
                  <div className="mt-10 flex items-center justify-between gap-6">
                    <p className="text-xs text-muted-foreground">
                      Door te verzenden gaat u akkoord met onze{" "}
                      <a href="#" className="underline hover:text-primary">
                        privacy­voorwaarden
                      </a>
                      .
                    </p>
                    <MagneticButton onClick={() => {}}>
                      Verzend
                      <ArrowUpRight size={14} />
                    </MagneticButton>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
        {label}
        {required && <span className="text-primary"> *</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-3 w-full border-b border-white/15 bg-transparent pb-3 pt-2 text-base text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
      />
    </div>
  );
}
