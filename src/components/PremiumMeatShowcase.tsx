import { useCallback, useEffect, useRef, useState } from "react";
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
import { DS_EASE } from "@/lib/design-system";
import { CardFrameOverlay, ImageFrameOverlay } from "@/components/ui/premium-frame";
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
  bestFor: string;
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

const SHOWCASE_ORDER = [
  "round",
  "sirloin",
  "ribeye",
  "tenderloin",
  "neck",
  "chuck",
  "shortloin",
  "rump",
  "flank",
  "plate",
  "brisket",
  "shank",
] as const;

const SHOWCASE_INTERVAL_MS = 3000;

const CUTS: Cut[] = [
  {
    id: "neck",
    label: "NEK",
    name: "Neck",
    description:
      "Smaakvolle, bindweefselrijke snede. Perfect voor lange braadtijden en rijke bouillon.",
    chef: "Chef's tip: laat 6 uur sudderen voor diepe umami.",
    bestFor: "Slow braising, rich broth, premium stews",
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
    bestFor: "Pot roast, slow braise, premium ground beef",
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
    bestFor: "Grill, reverse sear, premium carving",
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
    bestFor: "T-bone, porterhouse, high-heat grill",
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
    bestFor: "Classic steak, pan-sear, premium grill",
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
    bestFor: "Pot roast, pan-fry, slow oven",
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
    bestFor: "Slow roast, braise, premium carving",
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
    bestFor: "Grill, stir-fry, London broil",
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
    bestFor: "Short ribs, BBQ, slow smoke",
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
    bestFor: "Pulled beef, corned beef, low & slow BBQ",
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
    bestFor: "Tournedos, medaillons, refined pan-sear",
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
    bestFor: "Osso buco, rich fond, slow braise",
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

export function PremiumMeatShowcase() {
  const [activeId, setActiveId] = useState<string>("round");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [autoMode, setAutoMode] = useState(true);
  const showcaseIndexRef = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInViewRef = useRef(false);

  const stopAutoMode = useCallback(() => {
    setAutoMode(false);
  }, []);

  const selectCut = useCallback(
    (id: string) => {
      stopAutoMode();
      setActiveId(id);
      setHoveredId(null);
    },
    [stopAutoMode],
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
      },
      { threshold: 0.25 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!autoMode) return;

    const advance = () => {
      if (!isInViewRef.current) return;
      showcaseIndexRef.current =
        (showcaseIndexRef.current + 1) % SHOWCASE_ORDER.length;
      setActiveId(SHOWCASE_ORDER[showcaseIndexRef.current]);
    };

    const timer = window.setInterval(advance, SHOWCASE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [autoMode]);

  const active = CUTS.find((c) => c.id === activeId)!;
  const isPremiumCut = PREMIUM_IDS.has(active.id);
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0.5, y: 0.5 });
  };

  // Staggered variants for viewport entry (Client Wow Moment)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const cowVariants = {
    hidden: { opacity: 0, scale: 1.04, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 1.2, ease: DS_EASE },
    },
  };

  const panelVariants = {
    hidden: { opacity: 0, x: 35, y: 0 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 1.0, ease: DS_EASE },
    },
  };

  const hotspotVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 14 },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="meat-explorer"
      data-story-chapter="expertise"
      aria-labelledby="meat-explorer-heading"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onPointerDown={stopAutoMode}
      onKeyDown={stopAutoMode}
      className="story-surface-light relative overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 grain opacity-40" />
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(226,192,141,0.12) 0%, transparent 55%)`,
        }}
      />
      <div className="pointer-events-none absolute -left-32 top-20 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(226,192,141,0.14),transparent_68%)]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(177,18,23,0.05),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(200,164,107,0.4)] to-transparent" />

      <div className="relative mx-auto max-w-[1400px] px-6 py-20 md:py-28 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: DS_EASE }}
          className="max-w-2xl"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="h-2 w-2 rotate-45 bg-[#B31217]" aria-hidden />
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] ipek-heading-label">
              Ons vlees. Onze kwaliteit.
            </span>
          </div>
          <h2
            id="meat-explorer-heading"
            className="font-display text-[clamp(2.4rem,5vw,4rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-[#141414]"
          >
            Ontdek ons{" "}
            <span className="ipek-heading-accent">
              rundvlees
            </span>
          </h2>
          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-[#141414]/78 md:text-base">
            Klik op een deel van het rund om meer te ontdekken over onze premium halal
            rundvlees snijstukken.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-14 grid grid-cols-1 gap-10 lg:mt-20 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:gap-10"
        >
          {/* Cow Illustration (Left side) */}
          <motion.div
            variants={cowVariants}
            style={{
              transform: `perspective(1000px) rotateX(${(mousePos.y - 0.5) * -1.5}deg) rotateY(${(mousePos.x - 0.5) * 1.5}deg) translate3d(${(mousePos.x - 0.5) * 2}px, ${(mousePos.y - 0.5) * 2}px, 0)`,
              transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div className="group/if relative aspect-[5/4] w-full overflow-hidden rounded-[28px] border border-black/[0.08] bg-white shadow-[0_32px_90px_-50px_rgba(0,0,0,0.18)] transition-shadow duration-500 hover:shadow-[0_40px_100px_-48px_rgba(179,18,23,0.12)]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_40%,rgba(226,192,141,0.08),transparent_60%)]" />
              <img
                src={cowImg}
                alt="Premium rund visualisatie"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                width={1024}
                height={1024}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/30" />
              <ImageFrameOverlay variant="reticle" className="rounded-[28px]" />

              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full z-10"
              >
                <defs>
                  <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="0.55" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="lineGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="0.35" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <linearGradient id="calloutStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="oklch(0.68 0.1 75 / 0.35)" />
                    <stop offset="45%" stopColor="oklch(0.82 0.13 78 / 0.85)" />
                    <stop offset="100%" stopColor="oklch(0.88 0.11 82 / 1)" />
                  </linearGradient>
                  <linearGradient id="calloutGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="oklch(0.82 0.13 78 / 0.05)" />
                    <stop offset="50%" stopColor="oklch(0.82 0.13 78 / 0.28)" />
                    <stop offset="100%" stopColor="oklch(0.82 0.13 78 / 0.08)" />
                  </linearGradient>
                </defs>

                {/* Region Paths */}
                {CUTS.map((c) => {
                  const isActive = c.id === activeId;
                  const isHover = c.id === hoveredId;
                  const isFocus = isActive || isHover;
                  const dim = focusedId && !isFocus;
                  return (
                    <g key={c.id}>
                      <motion.path
                        d={c.region}
                        fill="oklch(0.82 0.13 78)"
                        stroke="oklch(0.96 0.02 80 / 0.14)"
                        strokeWidth={0.18}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        className="cursor-pointer"
                        initial={false}
                        animate={{
                          fillOpacity: isActive ? 0.1 : isHover ? 0.04 : 0,
                          strokeOpacity: isActive ? 0.38 : isHover ? 0.22 : 0.14,
                          opacity: dim ? 0.32 : 1,
                        }}
                        transition={{ duration: 0.62, ease: DS_EASE }}
                        onClick={() => selectCut(c.id)}
                        onMouseEnter={() => {
                          stopAutoMode();
                          setHoveredId(c.id);
                        }}
                        onMouseLeave={() => setHoveredId(null)}
                      />

                      {/* Inner gold glow spread */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.path
                            key={`glow-${c.id}`}
                            d={c.region}
                            fill="url(#calloutGlow)"
                            stroke="none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.65, ease: DS_EASE }}
                            style={{ pointerEvents: "none", filter: "url(#goldGlow)" }}
                          />
                        )}
                      </AnimatePresence>

                      {/* Active Region border draw */}
                      <AnimatePresence>
                        {isFocus && (
                          <motion.path
                            key={`trail-${c.id}-${isActive}`}
                            d={c.region}
                            fill="none"
                            stroke={isActive ? "oklch(0.82 0.13 78 / 0.9)" : "oklch(0.82 0.13 78 / 0.55)"}
                            strokeWidth={isActive ? 0.38 : 0.28}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            exit={{ opacity: 0, pathLength: 0 }}
                            transition={{ duration: isActive ? 0.65 : 0.45, ease: DS_EASE }}
                            style={{
                              pointerEvents: "none",
                              filter: "drop-shadow(0 0 2px oklch(0.82 0.13 78 / 0.35))",
                            }}
                          />
                        )}
                      </AnimatePresence>
                    </g>
                  );
                })}

                {/* Premium Connector Lines */}
                <AnimatePresence mode="wait">
                  <>
                    <motion.path
                      key={`callout-line-glow-${active.id}`}
                      d={calloutPath}
                      fill="none"
                      stroke="url(#calloutGlow)"
                      strokeWidth="0.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ opacity: 0, pathLength: 0 }}
                      animate={{ opacity: 0.85, pathLength: 1 }}
                      exit={{ opacity: 0, pathLength: 0 }}
                      transition={{ duration: 0.7, ease: DS_EASE }}
                      style={{ pointerEvents: "none", filter: "url(#lineGlow)" }}
                    />
                    <motion.path
                      key={`callout-line-${active.id}`}
                      d={calloutPath}
                      fill="none"
                      stroke="url(#calloutStroke)"
                      strokeWidth="0.14"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ opacity: 0, pathLength: 0 }}
                      animate={{ opacity: 1, pathLength: 1 }}
                      exit={{ opacity: 0, pathLength: 0 }}
                      transition={{ duration: 0.68, ease: DS_EASE, delay: 0.04 }}
                      style={{ pointerEvents: "none", filter: "url(#lineGlow)" }}
                    />
                    <motion.circle
                      key={`callout-start-node-${active.id}`}
                      cx={active.cx}
                      cy={active.cy}
                      r="0.45"
                      fill="oklch(0.82 0.13 78)"
                      stroke="oklch(0.1 0.006 30)"
                      strokeWidth="0.12"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 0.35, ease: DS_EASE }}
                      style={{ pointerEvents: "none" }}
                    />
                    <motion.circle
                      key={`callout-end-node-${active.id}`}
                      cx={calloutAnchorX}
                      cy={active.callout.y}
                      r="0.45"
                      fill="oklch(0.82 0.13 78)"
                      stroke="oklch(0.1 0.006 30)"
                      strokeWidth="0.12"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 0.35, delay: 0.12, ease: DS_EASE }}
                      style={{ pointerEvents: "none" }}
                    />
                  </>
                </AnimatePresence>
              </svg>

              {/* Desktop Floating Callout Box */}
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
                      x: active.callout.align === "left" ? -14 : 14,
                      y: 6,
                      scale: 0.95,
                      filter: "blur(6px)",
                    }}
                    animate={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
                    exit={{
                      opacity: 0,
                      x: active.callout.align === "left" ? -10 : 10,
                      y: -4,
                      scale: 0.97,
                      filter: "blur(4px)",
                    }}
                    transition={{ duration: 0.5, ease: DS_EASE }}
                    className="relative overflow-hidden rounded-[14px] border border-[rgba(200,164,107,0.35)] bg-white/95 px-3.5 py-2.5 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.15)] backdrop-blur-md"
                  >
                    <div className="relative min-w-0">
                      <motion.div
                        initial={{ opacity: 0, y: 3 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -3 }}
                        transition={{ duration: 0.25 }}
                        className="text-[6px] font-semibold uppercase tracking-[0.25em] text-[#B31217]"
                      >
                        Geselecteerd
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.3, delay: 0.04 }}
                        className="mt-0.5 font-display text-[15px] font-semibold leading-[0.95] text-[#141414]"
                      >
                        {active.label}
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -3 }}
                        transition={{ duration: 0.3, delay: 0.08 }}
                        className="mt-1 flex items-center gap-1.5 text-[6.5px] font-semibold uppercase tracking-[0.18em] text-[#141414]/72"
                      >
                        <span className="h-px w-3 bg-gold/30" />
                        <span className="truncate">{active.name}</span>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </AnimatePresence>

              {/* Mobile Floating Callout Box */}
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
                      x: active.callout.align === "left" ? -8 : 8,
                      y: 4,
                      scale: 0.95,
                    }}
                    animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    exit={{
                      opacity: 0,
                      x: active.callout.align === "left" ? -6 : 6,
                      y: -3,
                      scale: 0.97,
                    }}
                    transition={{ duration: 0.35, ease: DS_EASE }}
                    className="relative overflow-hidden rounded-[10px] border border-[rgba(200,164,107,0.3)] bg-white/95 px-2.5 py-1.5 shadow-[0_10px_24px_-12px_rgba(0,0,0,0.12)] backdrop-blur-md"
                  >
                    <div className="relative min-w-0">
                      <div className="text-[5px] font-semibold uppercase tracking-[0.2em] text-[#B31217]">
                        Geselecteerd
                      </div>
                      <div className="mt-0.5 font-display text-[12px] font-semibold leading-[0.9] text-[#141414]">
                        {active.label}
                      </div>
                      <div className="mt-0.5 flex items-center gap-1 text-[5px] font-semibold uppercase tracking-[0.15em] text-[#141414]/72">
                        <span className="h-px w-2 bg-gold/30" />
                        <span className="truncate">{active.name}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </AnimatePresence>

              {/* Hotspot Markers */}
              {CUTS.map((c) => {
                const isActive = c.id === activeId;
                const isHover = c.id === hoveredId;

                return (
                  <motion.button
                    key={c.id}
                    variants={hotspotVariants}
                    onClick={() => selectCut(c.id)}
                    onMouseEnter={() => {
                      stopAutoMode();
                      setHoveredId(c.id);
                    }}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{ left: `${c.cx}%`, top: `${c.cy}%` }}
                    className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30"
                    aria-label={c.name}
                    whileTap={{ scale: 0.92 }}
                  >
                    <div className="relative flex items-center justify-center">
                      <motion.span
                        className="absolute inset-0 rounded-full border"
                        initial={false}
                        animate={{
                          scale: isActive ? 2.4 : isHover ? 1.85 : 1,
                          opacity: isActive ? 0.9 : isHover ? 0.55 : 0,
                          borderColor: isActive
                            ? "oklch(0.82 0.13 78 / 0.35)"
                            : "oklch(0.82 0.13 78 / 0.2)",
                          backgroundColor: isActive
                            ? "oklch(0.82 0.13 78 / 0.08)"
                            : "oklch(0.82 0.13 78 / 0.04)",
                        }}
                        transition={{ type: "spring", stiffness: 280, damping: 22 }}
                      />

                      <motion.div
                        className={`relative flex items-center justify-center rounded-full ${
                          isActive
                            ? "h-8 w-8 md:h-9 md:w-9 border-2 border-[#B31217] bg-white shadow-[0_0_0_4px_rgba(179,18,23,0.15)]"
                            : "h-6 w-6 md:h-7 md:w-7 border border-[rgba(200,164,107,0.45)] bg-white/90 shadow-sm backdrop-blur"
                        } ${isActive ? "hotspot-active-pulse" : ""}`}
                        animate={{
                          scale: isActive ? 1.15 : isHover ? 1.06 : 1,
                        }}
                        transition={{ type: "spring", stiffness: 420, damping: 20 }}
                      >
                        <div
                          className={`absolute rounded-full transition-all duration-500 ${
                            isActive
                              ? "inset-[3px] border border-gold/35 bg-gold/10"
                              : "inset-[2px] border border-transparent bg-transparent"
                          }`}
                        />

                        <motion.span
                          key={isActive ? `active-${c.id}` : `idle-${c.id}`}
                          className={`relative text-[8px] md:text-[9.5px] font-sans font-semibold tracking-tight ${
                            isActive ? "text-[#B31217]" : "text-[#141414]/75"
                          }`}
                          initial={isActive ? { scale: 0.92, opacity: 0.7 } : false}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 24 }}
                        >
                          {String(c.number).padStart(2, "0")}
                        </motion.span>
                      </motion.div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-6 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#141414]/68">
              <MousePointerClick className="h-4 w-4 text-[#B31217]" />
              <span>{autoMode ? "Interactieve showroom — klik om te verkennen" : "Klik op een snijstuk"}</span>
            </div>
          </motion.div>

          {/* Detail Panel (Right side) — compact, aligned with hotspot card */}
          <motion.div
            variants={panelVariants}
            style={{
              transform: `perspective(1000px) rotateX(${(mousePos.y - 0.5) * -1.5}deg) rotateY(${(mousePos.x - 0.5) * 1.5}deg) translate3d(${(mousePos.x - 0.5) * -2}px, ${(mousePos.y - 0.5) * -2}px, 0)`,
              transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className="relative lg:max-w-none"
          >
            <div className="relative flex flex-col overflow-hidden rounded-[28px] border border-black/[0.08] bg-white shadow-[0_32px_90px_-50px_rgba(0,0,0,0.18)] transition-shadow duration-500 hover:shadow-[0_38px_96px_-46px_rgba(179,18,23,0.12)]">
              <div className="relative min-h-0 flex-1 overflow-hidden">
                <div className="group/if relative aspect-[4/3] overflow-hidden sm:aspect-[16/11]">
                  <AnimatePresence initial={false} mode="wait">
                    <motion.img
                      key={active.id}
                      src={active.image}
                      alt={active.name}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.65, ease: DS_EASE }}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                      width={1024}
                      height={768}
                    />
                  </AnimatePresence>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/95 via-[#0a0a0a]/45 to-[#0a0a0a]/10" />
                  <ImageFrameOverlay variant="prism" />
                  <div className="absolute left-5 top-5 z-10">
                    <span className="inline-flex rounded-full border border-white/25 bg-black/45 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-white shadow-sm backdrop-blur-md">
                      {isPremiumCut ? "Netherlands Premium" : "100% Halal"}
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 z-10 p-5 md:p-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`info-${active.id}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.45, ease: DS_EASE }}
                      >
                        <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[var(--gold-champagne)]">
                          {active.label}
                        </span>
                        <h3 className="mt-1.5 font-display text-[1.75rem] font-semibold leading-[0.98] tracking-[-0.04em] text-white md:text-[2rem]">
                          {active.name}
                        </h3>
                        <p className="mt-2 max-w-md text-[13px] leading-relaxed text-white/90 md:text-[14px]">
                          {active.description}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <div className="relative border-t border-black/[0.06] bg-[var(--ipek-surface-cream)] p-5 md:p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`specs-${active.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: DS_EASE }}
                    className="grid grid-cols-2 gap-2.5 sm:grid-cols-4"
                  >
                    {active.specs.map((s) => {
                      const Icon = specIcon(s.icon);
                      return (
                        <div
                          key={s.label}
                          className="rounded-xl border border-black/[0.06] bg-white px-2.5 py-3 text-center shadow-[0_8px_24px_-20px_rgba(0,0,0,0.12)]"
                        >
                          <div className="mx-auto grid h-7 w-7 place-items-center rounded-full border border-[rgba(179,18,23,0.22)] bg-[rgba(179,18,23,0.08)] text-[#B31217]">
                            <Icon className="h-3 w-3" />
                          </div>
                          <span className="mt-2 block text-[7px] uppercase tracking-[0.18em] text-[#141414]/58">
                            {s.label}
                          </span>
                          <span className="mt-0.5 block text-[10px] font-semibold text-[#141414]">
                            {s.value}
                          </span>
                        </div>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`chef-${active.id}`}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, delay: 0.04, ease: DS_EASE }}
                    className="mt-5 rounded-xl border border-black/[0.08] bg-white px-4 py-3.5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="h-px w-5 bg-[#B31217]/35" />
                      <span className="font-display text-sm font-semibold text-[#B31217]">
                        {isPremiumCut ? "Chef's Selection" : "Chef Recommendation"}
                      </span>
                    </div>
                    <p className="mt-2 pl-7 text-[14px] leading-snug text-[#141414]/82">
                      {active.bestFor}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <a
                  href="/assortiment/rundvlees"
                  className="ipek-btn-premium group mt-5 w-full py-4"
                >
                  <span>Bekijk collectie</span>
                  <ArrowRight className="ipek-btn-premium__arrow h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Trust points — tighter to explorer grid */}
      <div className="relative mx-auto max-w-[1400px] px-6 pb-24 lg:px-10 lg:pb-28">
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-10 lg:grid-cols-4">
          {TRUST.map((t, i) => {
            const Icon = t.icon;
            return (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
                className="group/if relative overflow-hidden rounded-[20px] border border-black/[0.06] bg-white p-5 shadow-[0_20px_50px_-40px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1 hover:border-[rgba(200,164,107,0.35)] hover:shadow-[0_28px_60px_-40px_rgba(0,0,0,0.15)]"
              >
                <CardFrameOverlay variant="pulse" />
                <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl border border-[rgba(179,18,23,0.22)] bg-[rgba(179,18,23,0.08)] text-[#B31217] transition-colors group-hover:border-[rgba(179,18,23,0.38)]">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#B31217]">
                  {t.label}
                </div>
                <h4 className="mt-1.5 font-display text-lg text-[#141414]">{t.title}</h4>
                <p className="mt-2 text-[13px] leading-relaxed text-[#141414]/72">{t.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
