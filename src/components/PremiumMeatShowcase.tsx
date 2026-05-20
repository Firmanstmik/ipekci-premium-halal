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
  callout: {
    x: number;
    y: number;
    align: "left" | "right";
    width?: number;
  };
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
    callout: { x: 90, y: 16, align: "right", width: 150 },
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
    callout: { x: 66, y: 16, align: "left", width: 150 },
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
    callout: { x: 50, y: 14, align: "left", width: 146 },
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
    callout: { x: 33, y: 16, align: "left", width: 150 },
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
    callout: { x: 20, y: 16, align: "left", width: 150 },
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
    callout: { x: 8, y: 16, align: "left", width: 146 },
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
    callout: { x: 8, y: 78, align: "left", width: 146 },
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
    callout: { x: 22, y: 79, align: "left", width: 150 },
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
    callout: { x: 42, y: 79, align: "left", width: 150 },
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
    callout: { x: 69, y: 74, align: "left", width: 142 },
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
    callout: { x: 52, y: 73, align: "left", width: 156 },
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
    callout: { x: 70, y: 82, align: "left", width: 144 },
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
  const isTopCallout = active.number <= 6;
  const isRightLegCallout = active.id === "brisket" || active.id === "shank";
  const mobileCalloutWidth = Math.max(
    92,
    Math.min(116, Math.round((active.callout.width ?? 196) * 0.7)),
  );
  const calloutAnchorX = active.callout.align === "left" ? active.callout.x - 1.4 : active.callout.x + 1.4;
  const calloutDirection = active.callout.align === "left" ? 1 : -1;
  const calloutShoulderX = calloutAnchorX - calloutDirection * (isRightLegCallout ? 5 : 6.5);
  const calloutVerticalLift = isTopCallout ? -9.5 : isRightLegCallout ? 7.5 : 10.5;
  const calloutCurveY = active.cy + calloutVerticalLift;
  const calloutPath =
    active.id === "brisket"
      ? `M ${active.cx} ${active.cy} C ${active.cx + 2.2} ${active.cy + 4.2}, ${calloutAnchorX - 0.6} ${active.cy + 5.2}, ${calloutAnchorX - 0.6} ${active.callout.y - 2.4} L ${calloutAnchorX} ${active.callout.y}`
      : `M ${active.cx} ${active.cy} C ${active.cx} ${calloutCurveY}, ${calloutShoulderX} ${calloutCurveY}, ${calloutShoulderX} ${active.callout.y} L ${calloutAnchorX} ${active.callout.y}`;

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
                  <linearGradient id="calloutStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="oklch(0.82 0.13 78 / 0.18)" />
                    <stop offset="38%" stopColor="oklch(0.82 0.13 78 / 0.55)" />
                    <stop offset="100%" stopColor="oklch(0.82 0.13 78 / 0.98)" />
                  </linearGradient>
                  <filter id="calloutLineGlow" x="-80%" y="-80%" width="260%" height="260%">
                    <feGaussianBlur stdDeviation="0.75" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <radialGradient id="calloutNode" cx="50%" cy="50%" r="65%">
                    <stop offset="0%" stopColor="oklch(0.98 0.02 80 / 1)" />
                    <stop offset="55%" stopColor="oklch(0.82 0.13 78 / 0.98)" />
                    <stop offset="100%" stopColor="oklch(0.55 0.22 28 / 0.85)" />
                  </radialGradient>
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

                <defs>
                  <marker
                    id="calloutArrow"
                    markerWidth="8"
                    markerHeight="8"
                    refX="6.4"
                    refY="4"
                    orient="auto"
                    markerUnits="strokeWidth"
                  >
                    <path d="M0,0 L8,4 L0,8 z" fill="oklch(0.82 0.13 78 / 0.96)" />
                  </marker>
                </defs>

                <AnimatePresence mode="wait">
                  <>
                    <motion.path
                      key={`callout-line-glow-${active.id}`}
                      d={calloutPath}
                      fill="none"
                      stroke="oklch(0.82 0.13 78 / 0.18)"
                      strokeWidth="0.92"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ opacity: 0, pathLength: 0 }}
                      animate={{ opacity: 1, pathLength: 1 }}
                      exit={{ opacity: 0, pathLength: 0 }}
                      transition={{ duration: 0.72, ease: [0.2, 0.8, 0.2, 1] }}
                      style={{ pointerEvents: "none", filter: "url(#calloutLineGlow)" }}
                    />
                    <motion.path
                      key={`callout-line-${active.id}`}
                      d={calloutPath}
                      fill="none"
                      stroke="url(#calloutStroke)"
                      strokeWidth="0.22"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      markerEnd="url(#calloutArrow)"
                      initial={{ opacity: 0, pathLength: 0 }}
                      animate={{ opacity: 1, pathLength: 1 }}
                      exit={{ opacity: 0, pathLength: 0 }}
                      transition={{ duration: 0.72, delay: 0.04, ease: [0.2, 0.8, 0.2, 1] }}
                      style={{ pointerEvents: "none" }}
                    />
                    <motion.circle
                      key={`callout-node-${active.id}`}
                      cx={active.cx}
                      cy={active.cy}
                      r="0.8"
                      fill="url(#calloutNode)"
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.4 }}
                      transition={{ duration: 0.38, ease: [0.2, 0.8, 0.2, 1] }}
                      style={{ transformOrigin: `${active.cx}px ${active.cy}px`, pointerEvents: "none" }}
                    />
                  </>
                </AnimatePresence>
              </svg>

              <AnimatePresence mode="wait">
                <div
                  style={{
                    left: `${active.callout.x}%`,
                    top: `${active.callout.y}%`,
                    width: `${active.callout.width ?? 196}px`,
                    transform: active.callout.align === "left" ? "translate(0, -50%)" : "translate(-100%, -50%)",
                  }}
                  className="pointer-events-none absolute z-20 hidden md:block"
                >
                  <motion.div
                    key={`callout-box-${active.id}`}
                    initial={{
                      opacity: 0,
                      x: active.callout.align === "left" ? -16 : 16,
                      y: 8,
                      scale: 0.94,
                      rotate: active.callout.align === "left" ? -2.4 : 2.4,
                      filter: "blur(10px)",
                    }}
                    animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, filter: "blur(0px)" }}
                    exit={{
                      opacity: 0,
                      x: active.callout.align === "left" ? -10 : 10,
                      y: -6,
                      scale: 0.98,
                      rotate: active.callout.align === "left" ? -1.5 : 1.5,
                      filter: "blur(6px)",
                    }}
                    transition={{ duration: 0.62, ease: [0.16, 0.84, 0.24, 1] }}
                    className="group/callout relative overflow-hidden rounded-[20px] border border-gold/28 bg-[linear-gradient(145deg,rgba(16,16,16,0.92),rgba(28,20,16,0.82))] px-3.5 py-3 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.75),0_0_0_1px_rgba(200,164,107,0.12)] backdrop-blur-xl"
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(200,164,107,0.18),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(179,18,23,0.12),transparent_46%)]" />
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.34, delay: 0.1 }}
                      className="pointer-events-none absolute inset-x-5 top-0 h-px origin-left scale-x-70 bg-gradient-to-r from-gold/0 via-gold/65 to-gold/0 transition-transform duration-700 group-hover/callout:scale-x-100"
                    />
                    <div className="relative min-w-0">
                      <motion.div
                        initial={{ opacity: 0, y: 7 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.34, delay: 0.08 }}
                        className="text-[6.5px] font-semibold uppercase tracking-[0.24em] text-blood/90"
                      >
                        Premium selectie
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.42, delay: 0.12 }}
                        className="mt-1 font-display text-[17px] leading-[0.92] text-foreground"
                        style={{ textWrap: "balance" }}
                      >
                        {active.label}
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.36, delay: 0.16 }}
                        className="mt-1.5 flex items-center gap-2 text-[7px] uppercase tracking-[0.2em] text-gold/80"
                      >
                        <span className="h-px w-4 bg-gold/45" />
                        <span className="truncate">{active.name}</span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.1, 0.28, 0.12] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, delay: 0.14 }}
                        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_35%,rgba(200,164,107,0.08),transparent_42%)]"
                      />
                    </div>
                  </motion.div>
                </div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <div
                  style={{
                    left: `${active.callout.x}%`,
                    top: `${active.callout.y}%`,
                    width: `${mobileCalloutWidth}px`,
                    transform: active.callout.align === "left" ? "translate(0, -50%)" : "translate(-100%, -50%)",
                  }}
                  className="pointer-events-none absolute z-20 md:hidden"
                >
                  <motion.div
                    key={`mobile-callout-${active.id}`}
                    initial={{
                      opacity: 0,
                      x: active.callout.align === "left" ? -10 : 10,
                      y: 6,
                      scale: 0.94,
                      rotate: active.callout.align === "left" ? -1.4 : 1.4,
                      filter: "blur(8px)",
                    }}
                    animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, filter: "blur(0px)" }}
                    exit={{
                      opacity: 0,
                      x: active.callout.align === "left" ? -8 : 8,
                      y: -4,
                      scale: 0.98,
                      rotate: active.callout.align === "left" ? -1 : 1,
                      filter: "blur(5px)",
                    }}
                    transition={{ duration: 0.4, ease: [0.16, 0.84, 0.24, 1] }}
                    className="relative overflow-hidden rounded-[15px] border border-gold/24 bg-[linear-gradient(145deg,rgba(12,12,12,0.9),rgba(28,18,14,0.82))] px-2.5 py-2 shadow-[0_14px_28px_-20px_rgba(0,0,0,0.75),0_0_0_1px_rgba(200,164,107,0.08)] backdrop-blur-xl"
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(200,164,107,0.15),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(179,18,23,0.1),transparent_44%)]" />
                    <div className="relative min-w-0">
                      <div className="text-[5px] font-semibold uppercase tracking-[0.22em] text-blood/90">
                        Premium selectie
                      </div>
                      <div
                        className="mt-0.5 font-display text-[13px] leading-[0.9] text-foreground"
                        style={{ textWrap: "balance" }}
                      >
                        {active.label}
                      </div>
                      <div className="mt-1 flex items-center gap-1.5 text-[5.5px] uppercase tracking-[0.18em] text-gold/80">
                        <span className="h-px w-3 bg-gold/45" />
                        <span className="truncate">{active.name}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </AnimatePresence>

              {CUTS.map((c) => {
                const isActive = c.id === activeId;
                const isHover = c.id === hoveredId;
                const isPremium = PREMIUM_IDS.has(c.id);
                const lifted = isActive || isHover;

                return (
                  <motion.button
                    key={c.id}
                    onClick={() => setActiveId(c.id)}
                    onMouseEnter={() => setHoveredId(c.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{ left: `${c.cx}%`, top: `${c.cy}%` }}
                    className="group absolute -translate-x-1/2 -translate-y-1/2"
                    aria-label={c.name}
                    whileTap={{ scale: 0.92 }}
                  >
                    <div
                      className={`absolute inset-0 rounded-full blur-lg transition-all duration-500 ${
                        isActive || isHover ? "scale-150 opacity-100" : "opacity-60"
                      } ${isPremium ? "bg-blood/40" : "bg-blood/30"}`}
                    />
                    {isActive ? (
                      <motion.div
                        key={`burst-${activeId}`}
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1.95, opacity: [0, 0.6, 0] }}
                        transition={{ duration: 0.72, ease: [0.16, 0.84, 0.24, 1] }}
                        className="absolute inset-0 rounded-full border border-gold/55"
                      />
                    ) : null}
                    <div
                      className={`relative grid place-items-center rounded-full border text-[7.5px] font-bold transition-all duration-500 md:text-[9px] ${
                        isPremium ? "h-6.5 w-6.5 md:h-7 md:w-7" : "h-5.5 w-5.5 md:h-6 md:w-6"
                      } ${
                        lifted
                          ? "scale-110 border-gold bg-charcoal-2 text-gold shadow-glow-gold"
                          : "border-gold/70 bg-charcoal-2/80 text-gold animate-pulse-glow"
                      }`}
                    >
                      {c.number}
                      {lifted && <div className="absolute -inset-1 rounded-full border border-gold/60" />}
                    </div>
                  </motion.button>
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
