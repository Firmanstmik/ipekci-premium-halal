import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { SectionHeader } from "@/components/SectionHeader";
import { MagneticButton } from "@/components/MagneticButton";
import opsImg from "@/assets/about-operations.jpg";
import fleetImg from "@/assets/fleet-aerial.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Over Nordlink — 27 jaar Europese logistiek" },
      {
        name: "description",
        content:
          "Sinds 1998 levert Nordlink premium logistieke oplossingen voor enterprise klanten in heel Europa.",
      },
      { property: "og:title", content: "Over Nordlink" },
      { property: "og:image", content: opsImg },
    ],
  }),
  component: AboutPage,
});

const timeline = [
  { year: "1998", title: "Oprichting in Rotterdam", text: "Vandermeer & Zonen begint met 4 trucks vanuit Waalhaven." },
  { year: "2007", title: "Uitbreiding Benelux", text: "Eerste hubs in Antwerpen en Eindhoven openen." },
  { year: "2014", title: "Rebrand naar Nordlink", text: "Volledige modernisering: nieuwe vloot, naam en operatie." },
  { year: "2019", title: "ISO 9001 & GDP", text: "Certificering voor farma en high-value vracht." },
  { year: "2023", title: "Groene Vloot", text: "Eerste 80 HVO en 20 elektrische trucks in dienst." },
  { year: "2026", title: "27 jaar precisie", text: "12M+ zendingen, 31 landen, 1.100+ professionals." },
];

const values = [
  {
    n: "01",
    title: "Operationele Excellentie",
    text: "Elke seconde telt. We meten, optimaliseren en verbeteren elke beweging in onze keten.",
  },
  {
    n: "02",
    title: "Radicale Transparantie",
    text: "Realtime tracking, eerlijke communicatie en geen verborgen kosten. Ooit.",
  },
  {
    n: "03",
    title: "Duurzame Schaal",
    text: "We groeien verantwoord. -68% CO₂ tegen 2030 en 100% groene energie in onze hubs.",
  },
];

function AboutPage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          src={opsImg}
          alt="Nordlink controlecentrum bij nacht"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
        <div className="relative mx-auto flex h-full max-w-[1480px] flex-col justify-end px-6 pb-20 lg:px-10 lg:pb-28">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary"
          >
            Over ons — Sinds 1998
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-5xl font-display text-5xl text-foreground md:text-7xl lg:text-8xl text-balance"
          >
            Een familiebedrijf met <span className="text-gradient-orange">Europese</span> ambitie.
          </motion.h1>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="bg-background px-6 py-32 lg:px-10 lg:py-40">
        <div className="mx-auto grid max-w-[1480px] gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
              (Onze missie)
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-8"
          >
            <p className="font-display text-3xl leading-[1.2] text-foreground/90 md:text-5xl lg:text-6xl text-balance">
              Wij geloven dat logistiek <span className="text-primary">onzichtbaar</span> moet zijn.
              Geen vertragingen, geen verrassingen — alleen vracht die op tijd, intact en
              verantwoord aankomt.
            </p>
          </motion.div>
        </div>
      </section>

      {/* VALUES */}
      <section className="border-y border-white/5 bg-surface px-6 py-32 lg:px-10">
        <div className="mx-auto max-w-[1480px]">
          <SectionHeader eyebrow="Kernwaarden" title="Drie principes. Geen compromis." />
          <div className="mt-20 grid gap-px bg-white/5 md:grid-cols-3">
            {values.map((v, i) => (
              <motion.div
                key={v.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="group bg-surface p-10 transition-colors duration-500 hover:bg-surface-elevated lg:p-14"
              >
                <div className="font-display text-xs font-medium tracking-[0.3em] text-primary">
                  {v.n}
                </div>
                <h3 className="mt-8 font-display text-3xl text-foreground md:text-4xl">{v.title}</h3>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
                <ArrowUpRight
                  size={20}
                  className="mt-10 text-foreground/30 transition-all duration-300 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="bg-background px-6 py-32 lg:px-10 lg:py-40">
        <div className="mx-auto max-w-[1480px]">
          <SectionHeader eyebrow="Tijdlijn" title="27 jaar in beweging." />
          <div className="mt-20 grid gap-12 md:grid-cols-2">
            {timeline.map((t, i) => (
              <motion.div
                key={t.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: (i % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="border-t border-white/10 pt-8"
              >
                <div className="flex items-baseline gap-6">
                  <div className="font-display text-4xl text-primary md:text-5xl">{t.year}</div>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                <h3 className="mt-6 font-display text-2xl text-foreground md:text-3xl">
                  {t.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FLEET BANNER */}
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <img
          src={fleetImg}
          alt="Nordlink vloot"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/40" />
        <div className="relative mx-auto flex h-full max-w-[1480px] items-center px-6 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
              Vandaag
            </p>
            <h2 className="mt-5 font-display text-4xl text-foreground md:text-6xl text-balance">
              420 trucks. 12 hubs. Eén netwerk.
            </h2>
            <div className="mt-10">
              <MagneticButton href="/contact">
                Werk met ons
                <ArrowUpRight size={14} />
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
