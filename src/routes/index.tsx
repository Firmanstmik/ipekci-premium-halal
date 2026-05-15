import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, ArrowRight, Truck, Zap, ShieldCheck, Leaf } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { ServiceCard } from "@/components/ServiceCard";
import { SectionHeader } from "@/components/SectionHeader";
import { MagneticButton } from "@/components/MagneticButton";
import { KineticHeading } from "@/components/KineticHeading";
import { RollingCounter } from "@/components/RollingCounter";
import { RouteNetwork } from "@/components/RouteNetwork";
import heroPosterPromax from "@/assets/poster-hero-section-promax.avif";
import heroVideoPromax from "@/assets/videos/video-hero-section-promax.webm";
import fleetImg from "@/assets/fleet-aerial.jpg";
import ftlImg from "@/assets/service-ftl.jpg";
import ltlImg from "@/assets/service-ltl.jpg";
import intermodalImg from "@/assets/service-intermodal.jpg";
import opsImg from "@/assets/about-operations.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ProMax Transport & Logistiek — Transport zonder grenzen" },
      {
        name: "description",
        content:
          "ProMax Transport & Logistiek levert Europees transport, logistiek en distributie met operationele zekerheid en professionele uitvoering.",
      },
      { property: "og:title", content: "ProMax Transport & Logistiek — Europees transport" },
      {
        property: "og:description",
        content:
          "Transport, logistiek en truckservice voor Europese vrachtoperaties — betrouwbaar, strak gepland en transparant opgevolgd.",
      },
      { property: "og:image", content: heroPosterPromax },
    ],
  }),
  component: HomePage,
});

const services = [
  {
    number: "01 / Wegtransport",
    title: "Full Truck Load",
    description:
      "Toegewijde trailers van deur tot deur — geen tussenstops, volledige zichtbaarheid.",
    image: ftlImg,
  },
  {
    number: "02 / Warehousing",
    title: "Opslag & Distributie",
    description: "Geavanceerde magazijnnetwerken met realtime voorraadbeheer en orderverwerking.",
    image: ltlImg,
  },
  {
    number: "03 / Intermodaal",
    title: "Multimodaal Vervoer",
    description: "Naadloze combinatie van weg, rail en zee — geoptimaliseerd voor kosten en CO₂.",
    image: intermodalImg,
  },
];

const partners = ["DSM", "ASML", "PHILIPS", "HEINEKEN", "ING", "AKZONOBEL", "SHELL", "RANDSTAD"];

function HomePage() {
  const [heroVideoReady, setHeroVideoReady] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const heroBlur = useTransform(scrollYProgress, [0, 1], ["0px", "8px"]);

  return (
    <SiteLayout>
      {/* HERO — Cinematic Video */}
      <section
        ref={heroRef}
        className="relative h-[100svh] min-h-[700px] w-full overflow-hidden bg-background grain"
      >
        <motion.div
          style={{
            y: heroY,
            scale: heroScale,
            filter: useTransform(heroBlur, (b) => `blur(${b})`),
          }}
          className="absolute inset-0"
        >
          {/* ── Poster (shown until video loads) ── */}
          <img
            src={heroPosterPromax}
            alt=""
            aria-hidden
            className="h-full w-full object-cover"
            style={{ filter: "brightness(1.32) contrast(1.06) saturate(1.15)" }}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          {/* ── Video ── */}
          <motion.video
            src={heroVideoPromax}
            poster={heroPosterPromax}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onCanPlay={() => setHeroVideoReady(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: heroVideoReady ? 1 : 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: "brightness(1.35) contrast(1.08) saturate(1.18)" }}
          />

          {/* ── Overlay layers ── */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/25 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/35" />

          {/* ── Warm volumetric spotlight (center-top) ── */}
          <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_50%_0%,rgba(255,255,255,0.12)_0%,transparent_70%)]" />

          {/* ── Orange radial accent ── */}
          <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_78%_55%,color-mix(in_oklab,var(--primary)_8%,transparent)_0%,transparent_60%)]" />

          {/* ── Subtle center brightener ── */}
          <div className="absolute inset-0 bg-[radial-gradient(800px_500px_at_50%_50%,rgba(255,255,255,0.06)_0%,transparent_65%)]" />

          {/* ── Volumetric orange floor glow ── */}
          <div className="absolute -bottom-40 left-1/3 h-[600px] w-[700px] rounded-full bg-primary/10 blur-[180px]" />
          {/* ── Top-right edge light ── */}
          <div className="absolute -top-20 right-0 h-[350px] w-[500px] rounded-full bg-primary/8 blur-[180px]" />
        </motion.div>

        {/* Top meta bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="absolute inset-x-0 top-24 z-10 mx-auto flex max-w-[1520px] items-center justify-between px-5 sm:px-8 lg:px-12"
        >
          <div className="hidden items-center gap-3 md:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-foreground/70">
              Live · Europese ritten in uitvoering
            </span>
          </div>
          <div className="hidden items-center gap-6 text-[10px] uppercase tracking-[0.32em] text-foreground/60 md:flex">
            <span>Benelux · Duitsland · Frankrijk</span>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 mx-auto flex h-full max-w-[1520px] flex-col justify-end px-5 pb-20 sm:px-8 sm:pb-24 lg:px-12 lg:pb-32"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.42em] text-primary"
          >
            ProMax Transport & Logistiek
          </motion.p>

          <KineticHeading
  delay={0.5}
  className="
    mt-5 sm:mt-6
    max-w-6xl
    font-display
    text-[clamp(2.8rem,6vw,7rem)]
    font-semibold
    leading-[0.95]
    tracking-[-0.04em]
    text-foreground
  "
  lines={[
    { text: "Transport" },
    { text: "zonder grenzen.", accent: true }
  ]}
/>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.9 }}
            className="mt-10 sm:mt-12 flex flex-col items-start gap-10 sm:gap-12 lg:flex-row lg:items-end lg:justify-between"
          >
            <div className="flex max-w-3xl flex-col items-start gap-6 sm:gap-8">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 rounded-sm bg-primary/90 px-5 sm:px-6 py-2.5 sm:py-3 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-foreground transition-all duration-300 hover:bg-primary hover:shadow-[0_0_30px_-10px_color-mix(in_oklab,var(--primary)_60%,transparent)] active:translate-y-px"
                >
                  Vraag Offerte Aan
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
                <Link
                  to="/services"
                  className="group inline-flex items-center gap-2 rounded-sm border border-white/20 bg-white/[0.02] px-5 sm:px-6 py-2.5 sm:py-3 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/90 transition-all duration-300 hover:border-white/32 hover:bg-white/[0.08]"
                >
                  Onze Diensten
                  <ArrowUpRight
                    size={14}
                    className="text-foreground/60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 sm:gap-x-6 gap-y-2.5 sm:gap-y-3 text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.3em] text-foreground/60">
                <span className="inline-flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  Rotterdam operations
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  Europese distributie
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  24/7 transport support
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  Fleet & truckservice
                </span>
              </div>
            </div>

            <div className="mt-6 lg:mt-0 max-w-xs sm:max-w-sm">
              <p className="text-xs sm:text-sm leading-relaxed text-foreground/72">
                Vanuit Rotterdam sturen we Europese ritten aan met strakke planning, heldere
                communicatie en professionele opvolging — van laden tot aflevering.
              </p>
              <div className="mt-5 sm:mt-6 h-px w-20 bg-primary/50" />
              <p className="mt-5 sm:mt-6 text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.3em] text-foreground/55">
                Internationale transportoplossingen · logistiek · distributie
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom telemetry strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="absolute inset-x-0 bottom-0 z-10 border-t border-white/5 bg-background/45 backdrop-blur-md"
        >
          <div className="mx-auto flex max-w-[1520px] items-center justify-between gap-4 sm:gap-6 px-5 sm:px-8 py-2.5 sm:py-3 text-[9px] sm:text-[10px] uppercase tracking-[0.32em] text-foreground/60 lg:px-12">
            <div className="flex items-center gap-4 sm:gap-6">
              <span className="text-primary/80">ProMax · EU Operations</span>
              <span className="hidden md:inline">Planning · Dispatch · Tracking</span>
            </div>
            <div className="hidden items-center gap-4 sm:gap-6 md:flex">
              <span>Transport</span>
              <span>Logistics</span>
              <span>Distribution</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Scroll</span>
              <span className="inline-block h-px w-6 sm:w-8 bg-foreground/30" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <section className="relative overflow-hidden border-y border-white/5 bg-background py-8">
        <div className="flex w-max marquee gap-16 whitespace-nowrap px-8">
          {[...partners, ...partners, ...partners].map((p, i) => (
            <span
              key={i}
              className="font-display text-2xl font-semibold tracking-[0.15em] text-foreground/30 hover:text-foreground/80 transition-colors md:text-4xl"
            >
              {p}
            </span>
          ))}
        </div>
      </section>

      {/* INTRO STATEMENT */}
      <section className="relative bg-background px-6 py-32 lg:px-10 lg:py-48">
        <div className="mx-auto max-w-[1480px]">
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
                (Manifest)
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-9"
            >
              <p className="font-display text-3xl leading-[1.15] text-foreground/90 md:text-5xl lg:text-6xl text-balance">
                Wij bewegen meer dan vracht. Wij bewegen{" "}
                <span className="text-primary">vertrouwen</span>,{" "}
                <span className="text-primary">precisie</span> en de Europese economie — kilometer
                voor kilometer, op tijd, elke keer.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="relative bg-surface px-6 py-32 lg:px-10 lg:py-40">
        <div className="mx-auto max-w-[1480px]">
          <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
            <SectionHeader
              eyebrow="Onze diensten"
              title="Geïntegreerde transportoplossingen."
              description="Van toegewijd wegtransport tot multimodale ketens — ons portfolio is gebouwd voor schaal én flexibiliteit."
            />
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-foreground hover:text-primary transition-colors"
            >
              Alle diensten
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          <div className="mt-20 grid gap-6 md:grid-cols-3" style={{ perspective: "1500px" }}>
            {services.map((s, i) => (
              <ServiceCard key={s.title} {...s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* FLEET PARALLAX SHOWCASE */}
      <ParallaxShowcase />

      {/* SIGNATURE — EUROPEAN ROUTE NETWORK */}
      <section className="relative overflow-hidden bg-background px-6 py-32 lg:px-10 lg:py-40">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[200px]" />
        </div>
        <div className="relative mx-auto max-w-[1480px]">
          <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-primary" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
                  Live netwerk
                </span>
              </div>
              <h2 className="mt-6 font-display text-4xl text-foreground md:text-5xl lg:text-6xl text-balance">
                Eén operatie.
                <br />
                <span className="text-gradient-orange italic font-light">31 landen.</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Een autonoom Europees corridornetwerk, aangedreven door 12 hubs en 420+ Euro 6
                voertuigen. Realtime gesynchroniseerd vanuit ons Rotterdam Control Tower.
              </p>
              <div className="mt-10 grid grid-cols-2 gap-6">
                {[
                  { k: "12", v: "Hubs" },
                  { k: "31", v: "Landen" },
                  { k: "420+", v: "Voertuigen" },
                  { k: "24/7", v: "Operationeel" },
                ].map((i) => (
                  <div key={i.v} className="border-l border-primary/30 pl-4">
                    <div className="font-display text-2xl text-foreground">{i.k}</div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      {i.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-8"
            >
              <div className="relative overflow-hidden rounded-sm border border-white/5 bg-surface/40 p-4 md:p-8">
                <div className="absolute left-4 top-4 z-10 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-foreground/60">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                  Live · EU Corridor View
                </div>
                <div className="absolute right-4 top-4 z-10 text-[10px] uppercase tracking-[0.25em] text-foreground/60">
                  v.2026.05
                </div>
                <RouteNetwork />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHY US — Bento */}
      <section className="relative bg-background px-6 py-32 lg:px-10 lg:py-40">
        <div className="mx-auto max-w-[1480px]">
          <SectionHeader
            eyebrow="Waarom Nordlink"
            title="Een bewezen standaard."
            description="Vier pijlers die elke zending van begin tot eind ondersteunen."
          />

          <div className="mt-20 grid auto-rows-[260px] gap-4 md:grid-cols-3">
            <BentoTile
              span="md:col-span-2"
              icon={<ShieldCheck size={24} />}
              title="ISO 9001 & GDP gecertificeerd"
              text="Volledig gecertificeerde processen voor industriële, farma en high-value vracht."
              footer="Audit score 98.4%"
            />
            <BentoTile
              icon={<Zap size={24} />}
              title="98.7% on-time"
              text="Realtime tracking en proactieve communicatie."
            />
            <BentoTile
              icon={<Leaf size={24} />}
              title="HVO & EV vloot"
              text="Een van de groenste vloten van de Benelux. -68% CO₂ tegen 2030."
            />
            <BentoTile
              span="md:col-span-2"
              icon={<Truck size={24} />}
              title="420+ Euro 6 trucks · 12 hubs"
              text="Een van de grootste private transportnetwerken in Noordwest-Europa, gerund door 1.100+ professionals."
              footer="Rotterdam · Antwerpen · Düsseldorf · Hamburg"
            />
          </div>
        </div>
      </section>

      {/* STATS COUNTER — Operational */}
      <section className="relative overflow-hidden border-y border-white/5 bg-surface px-6 py-24 lg:px-10">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative mx-auto grid max-w-[1480px] gap-12 md:grid-cols-4">
          {[
            { n: 27, suffix: "", l: "Jaar ervaring" },
            { n: 12.4, suffix: "M+", l: "Zendingen geleverd", decimals: 1 },
            { n: 420, suffix: "+", l: "Euro 6 trucks" },
            { n: 31, suffix: "", l: "Landen actief" },
          ].map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative border-l border-white/10 pl-6"
            >
              <span className="absolute -left-px top-0 h-8 w-px bg-primary" />
              <div className="font-display text-6xl font-semibold text-foreground md:text-7xl">
                <RollingCounter value={s.n} suffix={s.suffix} decimals={s.decimals ?? 0} />
              </div>
              <div className="mt-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                <span className="h-1 w-1 rounded-full bg-primary" />
                {s.l}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* OPERATIONS / ABOUT TEASER */}
      <section className="relative overflow-hidden bg-background px-6 py-32 lg:px-10 lg:py-40">
        <div className="mx-auto grid max-w-[1480px] gap-16 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] overflow-hidden rounded-sm"
          >
            <img
              src={opsImg}
              alt="Nordlink controlecentrum met live tracking schermen"
              loading="lazy"
              className="h-full w-full object-cover ken-burns"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-foreground/80">
              <span>Control Tower · Rotterdam</span>
              <span className="text-primary">24 / 7</span>
            </div>
          </motion.div>

          <div>
            <SectionHeader
              eyebrow="Over Nordlink"
              title="Gebouwd op precisie sinds 1998."
              description="Van een familiebedrijf in Rotterdam tot een Europese logistieke partner voor enterprise klanten — onze obsessie met operationele excellentie is nooit veranderd."
            />
            <div className="mt-10 grid grid-cols-2 gap-8">
              {[
                { k: "1.100+", v: "Professionals" },
                { k: "12", v: "Hubs in EU" },
                { k: "98.7%", v: "On-time rate" },
                { k: "AAA", v: "D&B kredietrating" },
              ].map((i) => (
                <div key={i.v}>
                  <div className="font-display text-3xl text-foreground">{i.k}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {i.v}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12">
              <Link
                to="/about"
                className="group inline-flex items-center gap-3 border-b border-primary pb-1 text-sm font-medium uppercase tracking-[0.2em] text-foreground transition-colors hover:text-primary"
              >
                Ontdek ons verhaal
                <ArrowRight
                  size={14}
                  className="text-primary transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-background px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-[1480px] overflow-hidden rounded-sm border border-primary/30 bg-gradient-to-br from-surface via-surface to-background">
          <div className="relative grid items-center gap-10 p-10 md:grid-cols-2 md:p-16 lg:p-24">
            <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />
            <div className="relative">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
                Volgende stap
              </p>
              <h2 className="mt-5 font-display text-4xl text-foreground md:text-6xl text-balance">
                Klaar om uw vracht in beweging te zetten?
              </h2>
            </div>
            <div className="relative flex flex-col items-start gap-6 md:items-end">
              <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-right">
                Onze accountmanagers reageren binnen 4 uur op elk verzoek. Vertel ons over uw
                routes, volumes en deadlines.
              </p>
              <MagneticButton href="/contact">
                Plan een gesprek
                <ArrowUpRight size={14} />
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function BentoTile({
  span = "",
  icon,
  title,
  text,
  footer,
}: {
  span?: string;
  icon: React.ReactNode;
  title: string;
  text: string;
  footer?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-sm border border-white/5 bg-surface p-8 transition-all duration-500 hover:border-primary/40 hover:bg-surface-elevated ${span}`}
    >
      <div className="flex items-start justify-between">
        <div className="text-primary">{icon}</div>
        <ArrowUpRight
          size={16}
          className="text-foreground/30 transition-all duration-300 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </div>
      <div>
        <h3 className="font-display text-2xl text-foreground md:text-3xl">{title}</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{text}</p>
        {footer && (
          <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-primary/80">{footer}</p>
        )}
      </div>
    </motion.div>
  );
}

function ParallaxShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.05, 1]);

  return (
    <section ref={ref} className="relative h-[80vh] min-h-[520px] overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={fleetImg}
          alt="Luchtfoto van Nordlink vloot bij Rotterdam distributiehub bij dageraad"
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
      </motion.div>
      <div className="relative mx-auto flex h-full max-w-[1480px] items-end px-6 pb-16 lg:px-10 lg:pb-24">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
            Onze vloot
          </p>
          <h2 className="mt-5 max-w-3xl font-display text-4xl text-foreground md:text-6xl lg:text-7xl text-balance">
            420 voertuigen. <br /> Eén belofte.
          </h2>
        </div>
      </div>
    </section>
  );
}
