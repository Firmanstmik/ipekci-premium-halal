import stageBackdrop from "@/assets/ayat/explorer-stage.webp";
import productDoner from "@/assets/ayat/explorer-doner.webp";
import productShoarma from "@/assets/ayat/explorer-shoarma.webp";
import productGevogelte from "@/assets/ayat/explorer-gevogelte.webp";
import productVleessoorten from "@/assets/ayat/explorer-vleessoorten.webp";
import productDiepvries from "@/assets/ayat/product-bg-diepvriesproducten.jpg";
import productTurksePizza from "@/assets/ayat/explorer-turkse-pizza.webp";
import productGegrild from "@/assets/ayat/explorer-gegrild.webp";
import productDurum from "@/assets/ayat/explorer-durum.webp";
import trustHalalImg from "@/assets/ayat/product-doner.jpg";
import trustQualityImg from "@/assets/ayat/hero-processing.jpg";
import trustDeliveryImg from "@/assets/ayat/highlight-verzending.png";
import trustServiceImg from "@/assets/ayat/product-shoarma.jpg";

/**
 * Premium Product Explorer — verified from https://ayatfood.nl/
 * Stage + product stills: AI-generated WebP assets composed for accurate hotspots.
 */

export type ExplorerProduct = {
  id: string;
  label: string;
  name: string;
  description: string;
  /** Short usage / positioning line (replaces former chef tip slot) */
  bestFor: string;
  image: string;
  href: string;
  cx: number;
  cy: number;
  region: string;
  number: number;
  /** Kept for CMS parity; runtime callout is computed toward stage center. */
  callout: {
    x: number;
    y: number;
    align: "left" | "right";
    width?: number;
  };
  specs: { icon: string; label: string; value: string }[];
  featured?: boolean;
};

export type ExplorerCalloutLayout = {
  x: number;
  y: number;
  endX: number;
  endY: number;
  path: string;
  transform: string;
  width: number;
  mobileWidth: number;
};

/** Soft elliptical hit-region around a hotspot (viewBox 0–100). */
function regionAt(cx: number, cy: number, rx = 6.4, ry = 5.8): string {
  return `M${cx - rx},${cy} a${rx},${ry} 0 1,0 ${rx * 2},0 a${rx},${ry} 0 1,0 ${-rx * 2},0`;
}

const STAGE_CENTER_X = 50;
const STAGE_CENTER_Y = 50;

/**
 * Straight leader + label toward the stage center so every hotspot
 * reads as a radial callout from the product into the middle.
 */
export function computeExplorerCallout(cx: number, cy: number, width = 148): ExplorerCalloutLayout {
  let dx = STAGE_CENTER_X - cx;
  let dy = STAGE_CENTER_Y - cy;
  let dist = Math.hypot(dx, dy);

  if (dist < 6) {
    dx = 0;
    dy = 1;
    dist = 1;
  }

  const ux = dx / dist;
  const uy = dy / dist;
  const fmt = (n: number) => Math.round(n * 100) / 100;

  // Place the label along the ray toward center (not past the midpoint).
  const travel = Math.min(19, Math.max(12.5, dist * 0.38));
  const rawX = cx + ux * travel;
  const rawY = cy + uy * travel;
  const x = fmt(Math.min(90, Math.max(10, rawX)));
  const y = fmt(Math.min(88, Math.max(10, rawY)));

  const verticalDominant = Math.abs(uy) > Math.abs(ux) * 1.1;
  let transform: string;
  if (verticalDominant) {
    // Hotspot above center → label below attachment; hotspot below → label above.
    transform = uy > 0 ? "translate(-50%, 10%)" : "translate(-50%, -110%)";
  } else {
    // Hotspot left of center → label to the right; hotspot right → label to the left.
    transform = ux > 0 ? "translate(8%, -50%)" : "translate(-108%, -50%)";
  }

  const mobileWidth = Math.max(92, Math.min(116, Math.round(width * 0.7)));

  return {
    x,
    y,
    endX: x,
    endY: y,
    path: `M ${fmt(cx)} ${fmt(cy)} L ${x} ${y}`,
    transform,
    width,
    mobileWidth,
  };
}

export const PRODUCT_EXPLORER_COPY = {
  eyebrow: "Ons assortiment. Onze kwaliteit.",
  headingLine: "Ontdek ons",
  headingAccent: "productassortiment",
  introHover:
    "Beweeg over een categorie om het premium Halal-assortiment van Ayat Food te verkennen.",
  introTap: "Tik op een categorie om het premium Halal-assortiment van Ayat Food te verkennen.",
  hintHover: "Beweeg over een categorie om te verkennen",
  hintTap: "Tik op een categorie om te verkennen",
  calloutEyebrow: "Geselecteerd",
  badgeFeatured: "Signature",
  badgeHalal: "100% Halal",
  usageLabel: "Voor uw keuken",
  ctaLabel: "Bekijk collectie",
  stageAlt: "Ayat Food premium Halal productassortiment",
} as const;

/**
 * Hotspot coordinates mapped to explorer-stage.webp zones:
 * 1 Döner spit TL · 2 Shoarma tray TC · 3 Gevogelte TR
 * 4 Vleessoorten ML · 5 Diepvries MR
 * 6 Turkse pizza BL · 7 Gegrild BC · 8 Dürüm BR
 */
export const PRODUCT_EXPLORER_ITEMS: readonly ExplorerProduct[] = [
  {
    id: "doner",
    label: "DÖNER",
    name: "Döner",
    description:
      "De meest voorkomende kebabsoort staat bij ons bekend als ‘döner kebab’, bereid op de gekende verticale spies, met passie voor smaak.",
    bestFor: "Kombidöner, kipdöner, gehaktdöner en kalfsdöner voor horeca en retail.",
    image: productDoner,
    href: "/producten/doner",
    number: 1,
    cx: 17,
    cy: 24,
    region: regionAt(17, 24, 6.8, 7.2),
    callout: { x: 6, y: 10, align: "left", width: 148 },
    featured: true,
    specs: [
      { icon: "halal", label: "Halal", value: "ECC Halal" },
      { icon: "quality", label: "Kwaliteit", value: "Eigen productie" },
      { icon: "use", label: "Gebruik", value: "Horeca & retail" },
      { icon: "fresh", label: "Levering", value: "Snel & betrouwbaar" },
    ],
  },
  {
    id: "shoarma",
    label: "SHOARMA",
    name: "Shoarma",
    description:
      "Verticaal opgestelde spit van rundvlees, kip, lamsvlees, kalkoen of mix, authentiek gekruid en klaar voor snelle bereiding.",
    bestFor: "Kalkoen-, kip-, mix- en kalfsshoarma voor wraps, broodjes en hot counters.",
    image: productShoarma,
    href: "/producten/shoarma",
    number: 2,
    cx: 48,
    cy: 26,
    region: regionAt(48, 26, 7.5, 5.6),
    callout: { x: 48, y: 9, align: "left", width: 148 },
    featured: true,
    specs: [
      { icon: "halal", label: "Halal", value: "ECC Halal" },
      { icon: "quality", label: "Kwaliteit", value: "Premium kruiding" },
      { icon: "use", label: "Gebruik", value: "Snack & horeca" },
      { icon: "fresh", label: "Levering", value: "Snel & betrouwbaar" },
    ],
  },
  {
    id: "gevogelte",
    label: "GEVOGELTE",
    name: "Gevogelte",
    description:
      "Dankzij onze eigen productie bieden wij u de heerlijkste kipproducten, smaakvol en breed inzetbaar.",
    bestFor: "Kipfilet, kipburgers, kip merquez en andere gevogelte voor professionele keukens.",
    image: productGevogelte,
    href: "/producten/gevogelte",
    number: 3,
    cx: 80,
    cy: 22,
    region: regionAt(80, 22, 7.2, 6.2),
    callout: { x: 94, y: 10, align: "right", width: 148 },
    featured: true,
    specs: [
      { icon: "halal", label: "Halal", value: "ECC Halal" },
      { icon: "quality", label: "Kwaliteit", value: "Eigen productie" },
      { icon: "use", label: "Gebruik", value: "Keuken & retail" },
      { icon: "fresh", label: "Levering", value: "Snel & betrouwbaar" },
    ],
  },
  {
    id: "vleessoorten",
    label: "VLEESSOORTEN",
    name: "Vleessoorten",
    description:
      "Een breed assortiment aan vleessoorten. Daar staan wij om bekend. Wij focussen op premium rundvleesproducten voor de professionele keuken.",
    bestFor: "Gehakt, hamburgers, spareribs, köfte en meer voor restaurants en retail.",
    image: productVleessoorten,
    href: "/producten/vleessoorten",
    number: 4,
    cx: 20,
    cy: 52,
    region: regionAt(20, 52, 7.0, 6.0),
    callout: { x: 6, y: 46, align: "left", width: 152 },
    featured: true,
    specs: [
      { icon: "halal", label: "Halal", value: "ECC Halal" },
      { icon: "quality", label: "Kwaliteit", value: "NVWA-normen" },
      { icon: "use", label: "Gebruik", value: "Steak & bereiding" },
      { icon: "fresh", label: "Levering", value: "Snel & betrouwbaar" },
    ],
  },
  {
    id: "diepvriesproducten",
    label: "DIEPVRIES",
    name: "Diepvriesproducten",
    description:
      "Producten vers ingevroren zodat deze een latere periode alsnog vers gebruikt kunnen worden. Praktisch voor voorraad en piekmomenten.",
    bestFor: "Stabiele voorraad voor groothandel, retail en foodservice.",
    image: productDiepvries,
    href: "/producten",
    number: 5,
    cx: 84,
    cy: 48,
    region: regionAt(84, 48, 6.8, 6.4),
    callout: { x: 94, y: 40, align: "right", width: 152 },
    specs: [
      { icon: "halal", label: "Halal", value: "ECC Halal" },
      { icon: "quality", label: "Kwaliteit", value: "Vers ingevroren" },
      { icon: "use", label: "Gebruik", value: "Voorraad & piek" },
      { icon: "fresh", label: "Levering", value: "Snel & betrouwbaar" },
    ],
  },
  {
    id: "turkse-pizza",
    label: "TURKSE PIZZA",
    name: "Turkse pizza",
    description:
      "De lekkerste Turkse pizza’s. Wij leveren alle ingrediënten voor een consistente, smaakvolle bereiding.",
    bestFor: "Snackbars, pizzeria’s en foodconcepts met Turkse specialiteiten.",
    image: productTurksePizza,
    href: "/producten",
    number: 6,
    cx: 22,
    cy: 80,
    region: regionAt(22, 80, 7.5, 6.0),
    callout: { x: 8, y: 92, align: "left", width: 148 },
    specs: [
      { icon: "halal", label: "Halal", value: "ECC Halal" },
      { icon: "quality", label: "Kwaliteit", value: "Compleet assortiment" },
      { icon: "use", label: "Gebruik", value: "Snack & takeaway" },
      { icon: "fresh", label: "Levering", value: "Snel & betrouwbaar" },
    ],
  },
  {
    id: "gegrilde-producten",
    label: "GEGRILD",
    name: "Gegrilde producten",
    description:
      "Heerlijk gegrilde producten, direct leverbaar en vol van smaak. Klaar voor snelle service.",
    bestFor: "Warm counters, catering en snelle bereiding in de horeca.",
    image: productGegrild,
    href: "/producten",
    number: 7,
    cx: 54,
    cy: 78,
    region: regionAt(54, 78, 8.0, 5.8),
    callout: { x: 54, y: 93, align: "left", width: 148 },
    specs: [
      { icon: "halal", label: "Halal", value: "ECC Halal" },
      { icon: "quality", label: "Kwaliteit", value: "Direct leverbaar" },
      { icon: "use", label: "Gebruik", value: "Snelle service" },
      { icon: "fresh", label: "Levering", value: "Snel & betrouwbaar" },
    ],
  },
  {
    id: "tortilla-durum",
    label: "DÜRÜM",
    name: "Tortilla Durum",
    description:
      "Een lekkere dürüm-döner. Dürüm betekent letterlijk ‘opgerold’ in het Turks, ideaal voor wraps en streetfood.",
    bestFor: "Dürüm, wraps en snelle streetfood-formules.",
    image: productDurum,
    href: "/producten",
    number: 8,
    cx: 82,
    cy: 74,
    region: regionAt(82, 74, 6.8, 5.8),
    callout: { x: 94, y: 88, align: "right", width: 148 },
    specs: [
      { icon: "halal", label: "Halal", value: "ECC Halal" },
      { icon: "quality", label: "Kwaliteit", value: "Streetfood ready" },
      { icon: "use", label: "Gebruik", value: "Wraps & dürüm" },
      { icon: "fresh", label: "Levering", value: "Snel & betrouwbaar" },
    ],
  },
] as const;

export const PRODUCT_EXPLORER_ORDER = PRODUCT_EXPLORER_ITEMS.map((p) => p.id);

export const PRODUCT_EXPLORER_STAGE_IMAGE = stageBackdrop;

/** Stage frame matches explorer-stage.webp (3:2) so hotspots stay pixel-accurate. */
export const PRODUCT_EXPLORER_STAGE_ASPECT = "aspect-[3/2]" as const;

export const PRODUCT_EXPLORER_TRUST = [
  {
    icon: "award" as const,
    label: "HALAL & BETROUWBAAR",
    title: "100% Halal gecertificeerd",
    desc: "Al onze producten staan onder strikte toezicht van het European Certification Centre for Halal (ECC Halal).",
    image: trustHalalImg,
    imageAlt: "Premium Halal döner van Ayat Food",
  },
  {
    icon: "shield" as const,
    label: "NVWA-NORMEN",
    title: "Hoge kwaliteit",
    desc: "Wij werken volledig volgens de normen en standaarden van de Nederlandse Voedsel- en Warenautoriteit (NVWA).",
    image: trustQualityImg,
    imageAlt: "Zorgvuldige productie en kwaliteitscontrole",
  },
  {
    icon: "truck" as const,
    label: "SNEL & BETROUWBAAR",
    title: "Snelle levertijd",
    desc: "Dankzij ons moderne wagenpark garanderen wij een snelle en betrouwbare levering.",
    image: trustDeliveryImg,
    imageAlt: "Gekoelde opslag voor betrouwbare levering",
  },
  {
    icon: "heart" as const,
    label: "KLANT CENTRAAL",
    title: "Persoonlijke begeleiding",
    desc: "Wij helpen klanten met het kiezen van de juiste producten en het ontwikkelen van nieuwe smaken.",
    image: trustServiceImg,
    imageAlt: "Premium shoarma klaar voor de professionele keuken",
  },
] as const;
