import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Beef, Package, ShieldCheck, Truck } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { SectionHeader } from "@/components/SectionHeader";
import { MagneticButton } from "@/components/MagneticButton";

const heroImage =
  "https://www.ipekcislachterij.nl/wp-content/uploads/2025/12/Ook-klant-worden.webp";

const categories = [
  {
    id: "lamsvlees",
    n: "01",
    icon: Beef,
    title: "Lamsvlees",
    text: "Premium Nederlandse lammeren, onbedwelmd halalgeslacht in ons eigen slachthuis. Leverbaar als complete karkassen of versgesneden delen.",
  },
  {
    id: "rundvlees",
    n: "02",
    icon: Beef,
    title: "Rundvlees",
    text: "Ons rundvlees komt van Nederlandse runderen en vaste partners. Leverbaar als ribeye, entrecote, gehakt en andere veelgevraagde delen.",
  },
  {
    id: "kip",
    n: "03",
    icon: Package,
    title: "Kip",
    text: "Op aanvraag van bestaande klanten leveren wij ook halalgeslachte kip. Premium kwaliteit uit Nederland en beschikbaar in alle standaarddelen.",
  },
  {
    id: "eindproducten",
    n: "04",
    icon: ShieldCheck,
    title: "Eindproducten",
    text: "Gemaakt van ons eigen halalvlees: kebab, hamburgers, kipburgers en meer voor supermarkten, slagerijen en restaurants.",
  },
];

const highlights = [
  {
    title: "Rib eye",
    category: "Rundvlees",
    image: "https://www.ipekcislachterij.nl/wp-content/uploads/2025/12/Rib-eye.png",
  },
  {
    title: "Lamsshoarma",
    category: "Lamsvlees",
    image: "https://www.ipekcislachterij.nl/wp-content/uploads/2025/12/Lamsshoarma.png",
  },
  {
    title: "Hamburger",
    category: "Rundvlees",
    image: "https://www.ipekcislachterij.nl/wp-content/uploads/2025/12/Hamburger.png",
  },
  {
    title: "Kip Burger",
    category: "Kip",
    image: "https://www.ipekcislachterij.nl/wp-content/uploads/2025/12/Kip-burger.png",
  },
];

export const Route = createFileRoute("/assortiment")({
  head: () => ({
    meta: [
      { title: "Assortiment — Ipekçi Slachterij" },
      {
        name: "description",
        content:
          "Assortiment premium halalvlees: lamsvlees, rundvlees, kip (op aanvraag) en eindproducten voor B2B-klanten.",
      },
      { property: "og:title", content: "Assortiment — Ipekçi Slachterij" },
      { property: "og:image", content: heroImage },
    ],
  }),
  component: AssortmentPage,
});

const productLists = {
  lamsvlees: [
    "Schouder met bot",
    "Lamsbout met bot",
    "Lamsrack",
    "Lamsschenkel",
    "Lamsnek",
    "Lamshaas",
    "Lamsentrecote",
    "Lamsbout zonder bot",
    "Schouder zonder bot",
    "Lamsrib",
    "Lamscotelet",
  ],
  rundvlees: [
    "Rib eye",
    "Entrecote",
    "Brisket",
    "Bavette",
    "Picanha",
    "Ossenhaas",
    "Kogelbiefstuk",
    "Riblappen",
    "Sukadelappen",
    "Runderlappen",
    "Diamond steak",
    "Runderstaart",
    "Shortribs",
    "Hele karkas",
    "Rundersnippers",
  ],
  kip: ["Kip Shoarma", "Kip Burger", "Kip Merquez", "Kip döner", "Kalkoens-shoarma"],
  eindproducten: [
    "Runder Merquez",
    "Hamburger",
    "Adana Kebab",
    "Lamsshoarma",
    "Kalfs döner",
    "Yaprak döner",
    "Sucuk",
    "Pastirma",
  ],
} as const;

const productSections = [
  {
    id: "lamsvlees",
    title: "Lamsvlees",
    description: "Premium Nederlandse lammeren — als karkas of versgesneden delen.",
    items: productLists.lamsvlees,
  },
  {
    id: "rundvlees",
    title: "Rundvlees",
    description: "Nederlands rund, halalgeslacht — premium cuts en veelgevraagde delen.",
    items: productLists.rundvlees,
  },
  {
    id: "kip",
    title: "Kip",
    description: "Op aanvraag van bestaande klanten — halalgeslachte kip van premium kwaliteit.",
    items: productLists.kip,
  },
  {
    id: "eindproducten",
    title: "Eindproducten",
    description: "Gemaakt van ons eigen halalvlees — klaar voor verkoop of bereiding.",
    items: productLists.eindproducten,
  },
] as const;

function AssortmentPage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden border-b border-white/5 bg-background px-6 pb-24 pt-44 lg:px-10 lg:pt-52">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt=""
            aria-hidden
            className="h-full w-full object-cover"
            loading="eager"
            decoding="async"
            style={{ filter: "brightness(0.55) contrast(1.08) saturate(1.03)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/55 to-background" />
        </div>

        <div className="relative mx-auto max-w-[1480px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-12 md:grid-cols-12"
          >
            <div className="md:col-span-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
                (Assortiment)
              </p>
              <h1 className="mt-6 text-balance font-display text-5xl text-foreground md:text-7xl lg:text-8xl">
                Premium halalvlees en <span className="text-gradient-orange">eindproducten</span>.
              </h1>
            </div>
            <div className="md:col-span-6 md:flex md:items-end md:justify-end">
              <p className="max-w-md text-base leading-relaxed text-muted-foreground">
                Ons assortiment is gebouwd voor B2B: consistente kwaliteit, heldere afspraken en
                gekoelde levering via eigen transport.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-background px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1480px]">
          <SectionHeader
            eyebrow="Categorieën"
            title="Alles wat u nodig heeft voor verkoop en bereiding."
            description="Lamsvlees, rundvlees, kip (op aanvraag) en eindproducten — voorbereid voor uw keten."
          />

          <div className="mt-20 grid gap-4 md:grid-cols-2">
            {categories.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  id={c.id}
                  key={c.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.85, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative scroll-mt-28 overflow-hidden rounded-sm border border-white/5 bg-surface p-10 transition-all duration-500 hover:border-primary/35 hover:bg-surface-elevated"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  >
                    <div className="absolute -right-28 -top-28 h-72 w-72 rounded-full bg-primary/14 blur-[110px]" />
                  </div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <Icon size={26} className="text-primary" />
                      <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-foreground/55">
                        {c.n} / 04
                      </div>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="text-foreground/30 transition-all duration-300 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </div>
                  <h2 className="mt-8 text-balance font-display text-3xl text-foreground md:text-4xl">
                    {c.title}
                  </h2>
                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-background px-6 pb-28 lg:px-10 lg:pb-36">
        <div className="mx-auto max-w-[1480px]">
          <SectionHeader
            eyebrow="Alle producten"
            title="Overzicht per categorie."
            description="Een selectie die aansluit op slagerijen, groothandels, supermarkten en restaurants."
          />
          <div className="mt-16 grid gap-4 lg:grid-cols-2">
            {productSections.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-sm border border-white/5 bg-surface p-10"
              >
                <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60">
                  <div className="absolute -right-28 -top-28 h-72 w-72 rounded-full bg-primary/12 blur-[120px]" />
                  <div className="absolute -left-28 -bottom-28 h-72 w-72 rounded-full bg-[color-mix(in_oklab,var(--accent)_16%,transparent)] blur-[120px]" />
                </div>

                <div className="relative">
                  <div className="flex items-end justify-between gap-6">
                    <div>
                      <h2 className="font-display text-3xl text-foreground">{s.title}</h2>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {s.description}
                      </p>
                    </div>
                    <a
                      href={`#${s.id}`}
                      className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.25em] text-primary transition-colors hover:text-foreground"
                    >
                      Naar categorie
                    </a>
                  </div>

                  <div className="mt-10 h-px w-14 bg-primary/50" />

                  <ul className="mt-10 grid gap-x-10 gap-y-3 text-sm text-foreground/85 sm:grid-cols-2">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-surface px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1480px]">
          <SectionHeader
            eyebrow="Selectie"
            title="Een greep uit het assortiment."
            description="Vraag naar beschikbaarheid en specificaties. We stemmen graag af op uw volumes en wensen."
          />

          <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {highlights.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.75, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-sm border border-white/8 bg-background"
              >
                <div className="relative aspect-[16/12] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain p-6 transition-transform duration-[1400ms] group-hover:scale-[1.04]"
                    style={{ filter: "drop-shadow(0 22px 50px rgba(0,0,0,0.45))" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                </div>
                <div className="p-7">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
                    {p.category}
                  </div>
                  <h3 className="mt-4 font-display text-2xl text-foreground">{p.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background px-6 py-28 lg:px-10 lg:py-36">
        <div className="mx-auto grid max-w-[1480px] gap-16 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-sm border border-white/5 bg-surface p-10">
              <div className="flex items-start justify-between gap-8">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
                    Levering
                  </p>
                  <h2 className="mt-6 font-display text-4xl text-foreground md:text-5xl text-balance">
                    Eigen koeltransport, betrouwbare afspraken.
                  </h2>
                  <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                    We leveren gekoeld en zorgvuldig, afgestemd op uw planning en bestelmomenten.
                  </p>
                </div>
                <Truck size={28} className="shrink-0 text-primary" />
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-3 text-[10px] font-medium uppercase tracking-[0.3em] text-foreground/60">
                {["Gekoelde levering", "Korte lijnen", "B2B focus"].map((t) => (
                  <span key={t} className="inline-flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-primary" />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="B2B partnership"
              title="Klaar om klant te worden?"
              description="Vertel ons over uw volumes, gewenste producten en levermomenten. We nemen snel contact op."
            />
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <MagneticButton href="/contact">
                Word klant
                <ArrowUpRight size={14} />
              </MagneticButton>
              <Link
                to="/ons-verhaal"
                className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:text-primary"
              >
                Ons verhaal
                <ArrowUpRight size={16} className="text-primary" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
