import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Truck, Warehouse, Ship, Zap, Package, Shield } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { SectionHeader } from "@/components/SectionHeader";
import { MagneticButton } from "@/components/MagneticButton";
import ftlImg from "@/assets/service-ftl.jpg";
import ltlImg from "@/assets/service-ltl.jpg";
import intermodalImg from "@/assets/service-intermodal.jpg";
import fleetImg from "@/assets/fleet-aerial.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Diensten — Nordlink" },
      {
        name: "description",
        content:
          "Wegtransport, warehousing, intermodaal en express koerier — premium logistieke diensten door heel Europa.",
      },
      { property: "og:title", content: "Diensten — Nordlink Logistiek" },
      { property: "og:image", content: fleetImg },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    n: "01",
    icon: Truck,
    title: "Full Truck Load (FTL)",
    text: "Toegewijde trailers, één klant, één route. Voor industriële en high-value zendingen.",
    image: ftlImg,
    features: ["Direct deur-tot-deur", "Realtime GPS", "Verzekerde lading"],
  },
  {
    n: "02",
    icon: Warehouse,
    title: "Warehousing & Distributie",
    text: "Geavanceerde magazijnnetwerken met realtime voorraadbeheer en orderverwerking.",
    image: ltlImg,
    features: ["WMS integratie", "EU dekking", "Cross-docking"],
  },
  {
    n: "03",
    icon: Ship,
    title: "Intermodaal Transport",
    text: "Naadloze combinatie van weg, rail en zee — geoptimaliseerd voor kosten én CO₂.",
    image: intermodalImg,
    features: ["Multimodale planning", "Douane afhandeling", "Lagere CO₂"],
  },
  {
    n: "04",
    icon: Zap,
    title: "Express Koerier",
    text: "Tijdkritisch transport binnen 4 uur, 24/7 beschikbaar in de Benelux en Duitsland.",
    image: ftlImg,
    features: ["Same-day", "24/7 dispatch", "Direct contact"],
  },
  {
    n: "05",
    icon: Package,
    title: "ADR & Special Cargo",
    text: "Gecertificeerd transport van gevaarlijke stoffen, farma en high-tech apparatuur.",
    image: ltlImg,
    features: ["ADR & GDP", "Temperatuur controle", "High security"],
  },
  {
    n: "06",
    icon: Shield,
    title: "Supply Chain Consulting",
    text: "Strategisch advies om uw end-to-end supply chain te optimaliseren en te schalen.",
    image: intermodalImg,
    features: ["Netwerkdesign", "Cost analytics", "Sustainability"],
  },
];

function ServicesPage() {
  return (
    <SiteLayout>
      {/* Header */}
      <section className="relative overflow-hidden border-b border-white/5 bg-background px-6 pb-24 pt-44 lg:px-10 lg:pt-52">
        <div className="mx-auto max-w-[1480px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-12 md:grid-cols-12"
          >
            <div className="md:col-span-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
                (Diensten — 06)
              </p>
              <h1 className="mt-6 font-display text-5xl text-foreground md:text-7xl lg:text-8xl text-balance">
                Een complete logistieke <span className="text-gradient-orange">infrastructuur</span>.
              </h1>
            </div>
            <div className="md:col-span-7 md:flex md:items-end md:justify-end">
              <p className="max-w-md text-base leading-relaxed text-muted-foreground">
                Van losse zendingen tot volledig uitbestede supply chains — Nordlink levert
                gespecialiseerde oplossingen die schaalbaar, traceerbaar en verantwoord zijn.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service grid — alternating editorial */}
      <section className="bg-background px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1480px] space-y-32 lg:space-y-40">
          {services.map((s, i) => {
            const Icon = s.icon;
            const reverse = i % 2 === 1;
            return (
              <motion.article
                key={s.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className={`grid gap-12 md:grid-cols-12 md:items-center ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}
              >
                <div className="md:col-span-7">
                  <div className="group relative aspect-[16/10] overflow-hidden rounded-sm">
                    <img
                      src={s.image}
                      alt={s.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
                    <div className="absolute left-6 top-6 rounded-sm border border-white/15 bg-background/40 px-3 py-1.5 backdrop-blur">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-foreground">
                        {s.n} / 06
                      </span>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-5">
                  <Icon className="text-primary" size={28} />
                  <h2 className="mt-6 font-display text-4xl text-foreground md:text-5xl text-balance">
                    {s.title}
                  </h2>
                  <p className="mt-5 text-base leading-relaxed text-muted-foreground">{s.text}</p>
                  <ul className="mt-8 divide-y divide-white/5 border-y border-white/5">
                    {s.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center justify-between py-4 text-sm text-foreground/90"
                      >
                        <span>{f}</span>
                        <span className="text-primary">+</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5 bg-surface px-6 py-32 lg:px-10">
        <div className="mx-auto flex max-w-[1480px] flex-col items-center text-center">
          <SectionHeader
            eyebrow="Maatwerk"
            title="Niet gevonden wat u zoekt?"
            description="We bouwen graag een oplossing op maat. Laat onze experts uw uitdaging analyseren."
            align="center"
          />
          <div className="mt-10">
            <MagneticButton href="/contact">
              Neem contact op
              <ArrowUpRight size={14} />
            </MagneticButton>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
