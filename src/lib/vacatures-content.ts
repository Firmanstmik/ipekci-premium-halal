/**
 * Vacatures — content verified from https://ayatfood.nl/vacatures/
 *
 * The three open positions, their departments, their werkzaamheden and the
 * "ervaring is een vereiste" requirement are taken verbatim from the official
 * site. The application flow and contact details mirror ayatfood.nl.
 * Presentation uses our own premium design system — the original page design
 * is deliberately not copied.
 */

import type { LucideIcon } from "lucide-react";
import { Boxes, Headset, ShoppingBag } from "lucide-react";
import { BRAND } from "@/lib/brand";
import heroVacatures from "@/assets/ayat/hero-processing.jpg";
import introImage from "@/assets/ayat/hero-coldstorage.jpg";

export const VACATURES_HERO_IMAGE = heroVacatures;
export const VACATURES_INTRO_IMAGE = introImage;

export const VACATURES_HERO = {
  breadcrumb: "Vacatures",
  eyebrow: "Werk & inkomen",
  title: "De leukste banen voor jou",
  lede: "Ben je op zoek naar een uitdagende baan in het hoogstaande vleessegment? Bekijk de openstaande vacatures van Ayat Food.",
  ctaPrimary: "Bekijk vacatures",
  ctaSecondary: "Direct solliciteren",
  stats: [
    { value: "3", label: "Open posities" },
    { value: "6", label: "Teamleden" },
    { value: "Watergang", label: "Standplaats" },
  ],
} as const;

/** Why work here — built only on facts published by Ayat Food */
export const VACATURES_INTRO = {
  kicker: "Werken bij",
  badgeTitle: "Ayat Food",
  title: "Een hecht team achter elk product",
  paragraphs: [
    "Ayat Food Vleesgroothandel is het adres waar afnemers en kebab-liefhebbers Halal en gezonde döner kebab producten vinden. Wij produceren verschillende soorten en smaken döner kebab producten en ondersteunen onze klanten bij het ontwikkelen van nieuwe smaken.",
    "Ons team van zes collega's staat 24/7 klaar om vragen te beantwoorden en bestellingen op tijd te leveren. Van het magazijn tot de verkoop: iedereen draagt bij aan hetzelfde doel — hoogwaardige Halal producten, met zorg ingepakt en betrouwbaar bezorgd.",
  ],
  highlights: [
    {
      title: "100% Halal",
      text: "Al onze producten staan onder strikte toezicht van ECC Halal.",
    },
    {
      title: "NVWA-normen",
      text: "Wij werken volledig volgens de normen en standaarden van de NVWA.",
    },
    {
      title: "Modern wagenpark",
      text: "Snelle en betrouwbare levering door heel Nederland.",
    },
    {
      title: "24/7 service",
      text: "Korte lijnen en collega's die voor elkaar klaarstaan.",
    },
  ],
} as const;

export type Vacature = {
  id: string;
  /** Editorial numeral shown on the card */
  index: string;
  /** Afdeling, as listed on ayatfood.nl */
  department: string;
  title: string;
  summary: string;
  icon: LucideIcon;
  /** Verbatim taken from the official vacancy list */
  responsibilities: readonly string[];
  /** Only rendered when the official listing states one */
  requirements?: readonly string[];
};

export const VACATURES: readonly Vacature[] = [
  {
    id: "magazijn-medewerker",
    index: "01",
    department: "Productie",
    title: "Magazijn medewerker",
    summary: "Meehelpen in het magazijn.",
    icon: Boxes,
    responsibilities: [
      "Binnenkomst goederen",
      "Voorraad bewaking",
      "Orderpicken",
      "Verpakken en versturen",
    ],
  },
  {
    id: "verkoper-1",
    index: "02",
    department: "Inkoop",
    title: "Verkoper 1",
    summary: "Verkopen van ons assortiment.",
    icon: Headset,
    responsibilities: [
      "Adviseren van klanten",
      "Telefonisch/mail contact",
      "Administratieve taken",
    ],
    requirements: ["Ervaring is een vereiste"],
  },
  {
    id: "verkoper-2",
    index: "03",
    department: "Inpakken",
    title: "Verkoper 2",
    summary: "Verkopen van ons assortiment.",
    icon: ShoppingBag,
    responsibilities: [
      "Adviseren van klanten",
      "Telefonisch/mail contact",
      "Administratieve taken",
    ],
    requirements: ["Ervaring is een vereiste"],
  },
] as const;

/** Builds the pre-filled sollicitatie-mail for a given vacancy. */
export function sollicitatieMailto(vacatureTitle?: string) {
  const subject = vacatureTitle
    ? `Sollicitatie — ${vacatureTitle}`
    : "Open sollicitatie — Ayat Food";
  const body = [
    vacatureTitle
      ? `Beste Ayat Food,\n\nGraag solliciteer ik op de vacature ${vacatureTitle}.`
      : "Beste Ayat Food,\n\nGraag stel ik mij voor met een open sollicitatie.",
    "",
    "Naam:",
    "Telefoonnummer:",
    "Motivatie:",
    "",
    "(Vergeet niet je cv als bijlage toe te voegen.)",
  ].join("\n");

  return `mailto:${BRAND.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const VACATURES_SOLLICITEREN = {
  eyebrow: "Solliciteren",
  title: "Reageer op onze vacatures",
  lede: "Reageren op onze vacatures is eenvoudig en snel. Na ontvangst van jouw sollicitatie reageren wij binnen een aantal werkdagen.",
  steps: [
    {
      n: "01",
      title: "Stuur je sollicitatie",
      text: "Mail je naam, telefoonnummer, motivatie en cv naar ons — vermeld de vacature waarop je reageert.",
    },
    {
      n: "02",
      title: "Wij reageren snel",
      text: "Na ontvangst van jouw sollicitatie reageren wij binnen een aantal werkdagen.",
    },
    {
      n: "03",
      title: "Kennismaken",
      text: "Bij een match nodigen we je uit op De Dollard 3 in Watergang voor een kennismaking.",
    },
  ],
  ctaLabel: "Solliciteer via e-mail",
  callLabel: "Bel direct",
} as const;

export const VACATURES_CLOSING = {
  eyebrow: "Geen passende vacature?",
  title: "Stuur ons een open sollicitatie",
  text: "Ons team groeit mee met onze klanten. Stel jezelf voor en vertel waar jouw kracht ligt — we nemen contact op zodra er een passende rol vrijkomt.",
  ctaLabel: "Open sollicitatie sturen",
} as const;
