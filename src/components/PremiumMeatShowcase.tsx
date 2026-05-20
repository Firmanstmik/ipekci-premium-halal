import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Beef,
  CalendarDays,
  Flame,
  MousePointerClick,
  ShieldCheck,
  Sparkles,
  Truck,
  UtensilsCrossed,
} from "lucide-react";
import cowImg from "@/assets/cow-hero.jpg";
import ribeyeImg from "@/assets/cut-ribeye.jpg";
import tenderloinImg from "@/assets/cut-tenderloin.jpg";
import sirloinImg from "@/assets/cut-sirloin.jpg";
import brisketImg from "@/assets/cut-brisket.jpg";
import chuckImg from "@/assets/cut-chuck.jpg";
import rumpImg from "@/assets/cut-rump.jpg";
import shortloinImg from "@/assets/cut-shortloin.jpg";
import roundImg from "@/assets/cut-round.jpg";
import flankImg from "@/assets/cut-flank.jpg";
import plateImg from "@/assets/cut-plate.jpg";
import shankImg from "@/assets/cut-shank.jpg";
import neckImg from "@/assets/cut-neck.jpg";

type Cut = {
  id: string;
  label: string;
  name: string;
  description: string;
  chef: string;
  image: string;
  cx: number;
  cy: number;
  region: string;
  number: number;
  labelSize?: number;
  specs: { icon: string; label: string; value: string }[];
};

const CUTS: Cut[] = [
  {
    id: "neck",
    label: "NEK",
    name: "Neck",
    description:
      "Smaakvolle, bindweefselrijke snede. Perfect voor lange braadtijden en rijke bouillon.",
    chef: "Chef's tip: laat 6 uur sudderen voor diepe umami.",
    image: neckImg,
    number: 1,
    cx: 70,
    cy: 44,
    region: "M62,37.5 C65,38 67,39 69,41 C71,43 73,42 75,39 L75,50 L62,50 Z",
    specs: [
      { icon: "tender", label: "Malsheid", value: "Slow cooked" },
      { icon: "flavor", label: "Smaak", value: "Diep" },
      { icon: "prep", label: "Bereiding", value: "Slow, Bouillon" },
      { icon: "fresh", label: "Beschikbaarheid", value: "Altijd vers" },
    ],
  },
  {
    id: "chuck",
    label: "SCHOUDER",
    name: "Chuck",
    description:
      "Rijke smaak met mooie marmering. Voor pot roast, stoof, cross rib en perfecte ground beef.",
    chef: "Chef's tip: laag-en-langzaam 4-6 uur voor vorkmals resultaat.",
    image: chuckImg,
    number: 2,
    cx: 57,
    cy: 43,
    region: "M52,37 C55,36.8 58,37 62,37.5 L62,50 L52,50 Z",
    specs: [
      { icon: "tender", label: "Malsheid", value: "Goed" },
      { icon: "flavor", label: "Smaak", value: "Intens" },
      { icon: "prep", label: "Bereiding", value: "Slow, Oven" },
      { icon: "fresh", label: "Beschikbaarheid", value: "Altijd vers" },
    ],
  },
  {
    id: "ribeye",
    label: "RIB EYE",
    name: "Rib",
    description:
      "Mals, sappig en vol van smaak met rijke marmering. Voor rib roast, rib steaks en rib eye.",
    chef: "Chef's tip: omgekeerd garen in de oven, afbakken op de grill.",
    image: ribeyeImg,
    number: 3,
    cx: 47,
    cy: 43,
    region: "M42,37.5 C44,37 47,37 49,37 C50.5,37 52,37 52,37 L52,50 L42,50 Z",
    specs: [
      { icon: "tender", label: "Malsheid", value: "Uitstekend" },
      { icon: "flavor", label: "Smaak", value: "Rijk & vol" },
      { icon: "prep", label: "Bereiding", value: "Grill, Pan, Oven" },
      { icon: "fresh", label: "Beschikbaarheid", value: "Altijd vers" },
    ],
  },
  {
    id: "shortloin",
    label: "DUNNE LENDE",
    name: "Short Loin",
    description:
      "Premium lendestuk. Bron van T-bone, porterhouse, club steak en striploin.",
    chef: "Chef's tip: laat op kamertemperatuur komen voor het grillen.",
    image: shortloinImg,
    number: 4,
    cx: 37,
    cy: 43,
    region: "M32,37.5 C34,37.3 37,37.3 40,37.3 C41,37.3 42,37.4 42,37.5 L42,50 L32,50 Z",
    specs: [
      { icon: "tender", label: "Malsheid", value: "Uitstekend" },
      { icon: "flavor", label: "Smaak", value: "Verfijnd & vol" },
      { icon: "prep", label: "Bereiding", value: "Grill, Pan" },
      { icon: "fresh", label: "Beschikbaarheid", value: "Altijd vers" },
    ],
  },
  {
    id: "sirloin",
    label: "ENTRECOTE",
    name: "Sirloin",
    description:
      "Krachtige bite met fijne marmering. Ideaal voor de klassieke biefstuk en T-bone.",
    chef: "Chef's tip: 2 minuten per zijde op hoog vuur, dan rust onder folie.",
    image: sirloinImg,
    number: 5,
    cx: 27,
    cy: 43,
    region: "M22,37 C24,37 27,37 30,37.2 C31,37.3 32,37.4 32,37.5 L32,50 L22,50 Z",
    specs: [
      { icon: "tender", label: "Malsheid", value: "Zeer goed" },
      { icon: "flavor", label: "Smaak", value: "Vol & krachtig" },
      { icon: "prep", label: "Bereiding", value: "Grill, Pan" },
      { icon: "fresh", label: "Beschikbaarheid", value: "Altijd vers" },
    ],
  },
  {
    id: "rump",
    label: "STAARTSTUK",
    name: "Rump",
    description:
      "Smaakvolle bovenkant van de achterbout. Pot roast, stoof of klassieke biefstuk.",
    chef: "Chef's tip: laat lang rusten na het bakken voor sappige plakken.",
    image: rumpImg,
    number: 6,
    cx: 17,
    cy: 43,
    region: "M12,40 C13,38.5 15,37.5 18,37 C20,36.8 22,37 22,37 L22,50 L12,50 Z",
    specs: [
      { icon: "tender", label: "Malsheid", value: "Goed" },
      { icon: "flavor", label: "Smaak", value: "Vol" },
      { icon: "prep", label: "Bereiding", value: "Roast, Pan" },
      { icon: "fresh", label: "Beschikbaarheid", value: "Altijd vers" },
    ],
  },
  {
    id: "round",
    label: "ACHTERBOUT",
    name: "Round",
    description:
      "Magere, krachtige snede van de achterbout. Ideaal voor stoofschotels, rosbief en dunne plakken.",
    chef: "Chef's tip: marineer en gril snel op hoog vuur voor maximale malsheid.",
    image: roundImg,
    number: 7,
    cx: 17,
    cy: 58,
    region: "M12,50 L22,50 L22,62 C21,64.5 18,66 15,65.5 C13.5,65.2 12.5,63 12,60 Z",
    specs: [
      { icon: "tender", label: "Malsheid", value: "Gemiddeld" },
      { icon: "flavor", label: "Smaak", value: "Robuust" },
      { icon: "prep", label: "Bereiding", value: "Roast, Stoof" },
      { icon: "fresh", label: "Beschikbaarheid", value: "Altijd vers" },
    ],
  },
  {
    id: "flank",
    label: "VANG",
    name: "Flank",
    description:
      "Karakteristieke nerfstructuur. Voor flank steak, London broil en stir-fry.",
    chef: "Chef's tip: snij altijd dwars op de vezel voor optimale malsheid.",
    image: flankImg,
    number: 8,
    cx: 29,
    cy: 58,
    region: "M22,50 L37,50 L37,67.5 C33,68.5 28,68 24,67 C23,66.7 22,65 22,62 Z",
    specs: [
      { icon: "tender", label: "Malsheid", value: "Stevig" },
      { icon: "flavor", label: "Smaak", value: "Krachtig" },
      { icon: "prep", label: "Bereiding", value: "Grill, Wok" },
      { icon: "fresh", label: "Beschikbaarheid", value: "Altijd vers" },
    ],
  },
  {
    id: "plate",
    label: "NAVEL",
    name: "Plate",
    description:
      "Rijk gemarmerde buikplaat. Bron van short ribs, skirt steak en stew.",
    chef: "Chef's tip: low & slow BBQ voor authentieke smoke ring.",
    image: plateImg,
    number: 9,
    cx: 45,
    cy: 58,
    region: "M37,50 L53,50 L53,66.5 C48,68 42,68 38,67.7 C37.3,67.6 37,67.5 37,67.5 Z",
    specs: [
      { icon: "tender", label: "Malsheid", value: "Slow cooked" },
      { icon: "flavor", label: "Smaak", value: "Vet & rijk" },
      { icon: "prep", label: "Bereiding", value: "BBQ, Slow" },
      { icon: "fresh", label: "Beschikbaarheid", value: "Altijd vers" },
    ],
  },
  {
    id: "brisket",
    label: "BORSTSTUK",
    name: "Brisket",
    description:
      "Robuust en smaakvol. De favoriet voor pulled beef, corned beef en BBQ.",
    chef: "Chef's tip: 12 uur smoken op 110C tot 96C kerntemperatuur.",
    image: brisketImg,
    number: 10,
    cx: 64,
    cy: 57,
    region: "M53,50 L70,50 C71,53 70.5,57 68,60 C64,63 58,65 53,66.5 Z",
    specs: [
      { icon: "tender", label: "Malsheid", value: "Slow cooked" },
      { icon: "flavor", label: "Smaak", value: "Diep & rokerig" },
      { icon: "prep", label: "Bereiding", value: "Slow, BBQ" },
      { icon: "fresh", label: "Beschikbaarheid", value: "Altijd vers" },
    ],
  },
  {
    id: "tenderloin",
    label: "OSSENHAAS",
    name: "Tenderloin",
    description:
      "Zeer malse premium snede. Ideaal voor tournedos, medaillons en verfijnde bereidingen.",
    chef: "Chef's tip: kort en heet bakken, daarna ruim laten rusten.",
    image: tenderloinImg,
    number: 11,
    cx: 38,
    cy: 53,
    labelSize: 1.45,
    region: "M31,50 L43,50 L42,57 L32,57 Z",
    specs: [
      { icon: "tender", label: "Malsheid", value: "Botermals" },
      { icon: "flavor", label: "Smaak", value: "Elegant" },
      { icon: "prep", label: "Bereiding", value: "Pan, Oven" },
      { icon: "fresh", label: "Beschikbaarheid", value: "Altijd vers" },
    ],
  },
  {
    id: "shank",
    label: "SCHENKEL",
    name: "Shank",
    description:
      "Krachtige onderpoot met veel collageen. Uitstekend voor osso buco en diepe bouillons.",
    chef: "Chef's tip: langzaam garen tot het vlees vanzelf loskomt.",
    image: shankImg,
    number: 12,
    cx: 63,
    cy: 69,
    labelSize: 1.3,
    region: "M61,60 L66,60 L66,75 L61,75 Z",
    specs: [
      { icon: "tender", label: "Malsheid", value: "Slow cooked" },
      { icon: "flavor", label: "Smaak", value: "Krachtig" },
      { icon: "prep", label: "Bereiding", value: "Stoof, Fond" },
      { icon: "fresh", label: "Beschikbaarheid", value: "Altijd vers" },
    ],
  },
];

const PREMIUM_IDS = new Set(["ribeye", "sirloin", "shortloin", "rump"]);

const specIcon = (k: string) => {
  switch (k) {
    case "tender":
      return Sparkles;
    case "flavor":
      return Flame;
    case "prep":
      return UtensilsCrossed;
    default:
      return CalendarDays;
  }
};

const TRUST = [
  {
    icon: Award,
    label: "HALAL & BETROUWBAAR",
    title: "100% Halal gecertificeerd",
    desc: "Al ons vlees voldoet aan de hoogste islamitische normen en waarden.",
  },
  {
    icon: Beef,
    label: "PREMIUM KWALITEIT",
    title: "Geselecteerd & gecontroleerd",
    desc: "Alleen het beste vlees, zorgvuldig geselecteerd door onze experts.",
  },
  {
    icon: Truck,
    label: "SNEL & BETROUWBAAR",
    title: "Snelle levering",
    desc: "Dagelijks vers geleverd door heel Nederland en daarbuiten.",
  },
  {
    icon: ShieldCheck,
    label: "VOLLEDIGE TRACEERBAARHEID",
    title: "Van boer tot klant",
    desc: "Volledige controle over kwaliteit, herkomst en verwerking.",
  },
];

export function PremiumMeatShowcase() {
  const [activeId, setActiveId] = useState<string>("ribeye");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const active = CUTS.find((c) => c.id === activeId)!;
  const focusedId = hoveredId ?? activeId;

  return (
    <section className="relative overflow-hidden bg-cinematic">
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,oklch(0.55_0.22_28/0.08),transparent_60%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.82_0.13_78/0.08),transparent_70%)] blur-3xl" />

      <div className="relative mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="max-w-2xl"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-blood/70" />
            <span className="text-xs font-medium uppercase tracking-[0.32em] text-blood">
              Ons vlees. Onze kwaliteit.
            </span>
          </div>
          <h2 className="font-display text-5xl leading-[1.05] text-foreground md:text-7xl">
            Ontdek ons <span className="italic text-gold">rundvlees</span>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
            Klik op een deel van het rund om meer te ontdekken over onze premium halal
            rundvlees snijstukken.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:mt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative"
          >
            <div className="relative aspect-[5/4] w-full overflow-hidden rounded-2xl">
              <div className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.78_0.12_75/0.12),transparent_65%)] blur-2xl" />
              <img
                src={cowImg}
                alt="Premium rund visualisatie"
                className="absolute inset-0 h-full w-full object-cover opacity-95"
                loading="lazy"
                width={1024}
                height={1024}
              />
              <div className="pointer-events-none absolute inset-0 bg-charcoal-2/30 transition-opacity duration-700" />

              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
              >
                <defs>
                  <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="0.4" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {CUTS.map((c) => {
                  const isFocus = c.id === focusedId;
                  const dim = focusedId && !isFocus;
                  return (
                    <path
                      key={`fill-${c.id}`}
                      d={c.region}
                      fill={isFocus ? "oklch(1 0 0 / 0.10)" : "oklch(1 0 0 / 0.02)"}
                      stroke="oklch(0.96 0.02 80 / 0.85)"
                      strokeWidth={isFocus ? 0.45 : 0.22}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      filter={isFocus ? "url(#goldGlow)" : undefined}
                      style={{
                        opacity: dim ? 0.45 : 1,
                        transition:
                          "opacity 500ms ease, stroke-width 500ms ease, fill 500ms ease, filter 500ms ease",
                        cursor: "pointer",
                      }}
                      onClick={() => setActiveId(c.id)}
                      onMouseEnter={() => setHoveredId(c.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    />
                  );
                })}

                {CUTS.map((c) => (
                  <text
                    key={`label-${c.id}`}
                    x={c.cx}
                    y={c.cy + 0.6}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={c.labelSize ?? 1.9}
                    fontFamily="Inter, sans-serif"
                    fontWeight={600}
                    fill="oklch(0.97 0.01 80 / 0.92)"
                    style={{
                      pointerEvents: "none",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      paintOrder: "stroke",
                      stroke: "oklch(0 0 0 / 0.55)",
                      strokeWidth: 0.18,
                    }}
                  >
                    {c.name}
                  </text>
                ))}
              </svg>

              {CUTS.map((c) => {
                const isActive = c.id === activeId;
                const isHover = c.id === hoveredId;
                const isPremium = PREMIUM_IDS.has(c.id);
                const lifted = isActive || isHover;

                return (
                  <button
                    key={c.id}
                    onClick={() => setActiveId(c.id)}
                    onMouseEnter={() => setHoveredId(c.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{ left: `${c.cx}%`, top: `${c.cy}%` }}
                    className="group absolute -translate-x-1/2 -translate-y-1/2"
                    aria-label={c.name}
                  >
                    <div
                      className={`absolute inset-0 rounded-full blur-lg transition-all duration-500 ${
                        isActive || isHover ? "scale-150 opacity-100" : "opacity-60"
                      } ${isPremium ? "bg-blood/40" : "bg-blood/30"}`}
                    />
                    <div
                      className={`relative grid place-items-center rounded-full border text-[10px] font-bold transition-all duration-500 ${
                        isPremium ? "h-8 w-8" : "h-7 w-7"
                      } ${
                        lifted
                          ? "scale-110 border-gold bg-charcoal-2 text-gold shadow-glow-gold"
                          : "border-gold/70 bg-charcoal-2/80 text-gold animate-pulse-glow"
                      }`}
                    >
                      {c.number}
                      {lifted && <div className="absolute -inset-1 rounded-full border border-gold/60" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
              <MousePointerClick className="h-4 w-4 text-gold" />
              <span>Klik op een snijstuk</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative"
          >
            <div className="glass-panel relative overflow-hidden rounded-2xl shadow-luxury">
              <div className="pointer-events-none absolute -right-20 -top-20 z-10 h-60 w-60 rounded-full bg-[radial-gradient(circle,oklch(0.82_0.13_78/0.18),transparent_70%)] blur-2xl" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <motion.img
                      key={active.image}
                      src={active.image}
                      alt={active.name}
                      initial={{ scale: 1.06 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                      width={1024}
                      height={640}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-2 via-charcoal-2/40 to-transparent" />
                    <div className="absolute left-6 top-6 flex items-center gap-3 md:left-8 md:top-8">
                      <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/50 bg-charcoal-2/70 text-gold backdrop-blur">
                        <Beef className="h-4 w-4" />
                      </span>
                      <span className="rounded-full border border-gold/30 bg-charcoal-2/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.32em] text-blood backdrop-blur">
                        {active.label}
                      </span>
                    </div>
                  </div>

                  <div className="p-8 md:p-10">
                    <h3 className="font-display text-4xl text-foreground md:text-5xl">
                      {active.name}
                    </h3>
                    <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                      {active.description}
                    </p>

                    <div className="mt-5 flex items-start gap-3 rounded-xl border border-gold/20 bg-blood/5 p-4">
                      <UtensilsCrossed className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      <p className="text-xs italic leading-relaxed text-foreground/80 md:text-sm">
                        {active.chef}
                      </p>
                    </div>

                    <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

                    <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
                      {active.specs.map((s) => {
                        const Icon = specIcon(s.icon);
                        return (
                          <div key={s.label} className="text-center">
                            <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full border border-gold/30 text-gold transition-colors">
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="text-xs font-medium text-foreground/90">{s.label}</div>
                            <div className="mt-1 text-[11px] text-muted-foreground">{s.value}</div>
                          </div>
                        );
                      })}
                    </div>

                    <button className="group mt-9 flex w-full items-center justify-center gap-3 rounded-full border border-gold/40 bg-transparent py-4 text-sm font-medium uppercase tracking-[0.22em] text-gold transition-all duration-500 hover:border-gold hover:bg-gold/5 hover:shadow-glow-gold">
                      Bekijk producten
                      <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {TRUST.map((t, i) => {
            const Icon = t.icon;
            return (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="glass-panel group rounded-xl p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-glow-gold"
              >
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-full border border-gold/30 bg-blood/5 text-gold transition-colors group-hover:border-gold/60">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-blood">
                  {t.label}
                </div>
                <h4 className="mt-2 font-display text-xl text-foreground">{t.title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
