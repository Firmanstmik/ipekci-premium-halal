/**
 * Vacatures — content verified from https://ayatfood.nl/vacatures/
 *
 * Copy, vacancy titles, departments and werkzaamheden match the official page.
 * Presentation follows the premium mockup: cream listings + dark sollicitatie split.
 */

import type { LucideIcon } from "lucide-react";
import { Boxes, Headset, ShoppingBag } from "lucide-react";
import { BRAND } from "@/lib/brand";
/** Official hero — ayatfood.nl/vacatures (Elementor section 90830af) */
import heroImage from "@/assets/ayat/vacatures-hero.jpg";
/** Official apply backdrop — ayatfood.nl/vacatures (Elementor section 50dde1c1) */
import applyBackdrop from "@/assets/ayat/vacatures-apply.jpg";

export const VACATURES_HERO_IMAGE = heroImage;
export const VACATURES_APPLY_IMAGE = applyBackdrop;

/** Cinematic hero — mirrors Producten page pattern + official vacatures assets */
export const VACATURES_HERO = {
  breadcrumb: "Vacatures",
  eyebrow: "Werk & inkomen",
  title: "Vacatures",
  lede: "Ben je op zoek naar een uitdagende baan in het hoogstaande vleessegment? Bekijk de openstaande vacatures van Ayat Food.",
  ctaPrimary: "Bekijk vacatures",
  ctaSecondary: "Direct solliciteren",
  badge: "100% Halal · Watergang",
  stats: [
    { value: "3", label: "Open posities" },
    { value: "6", label: "Teamleden" },
    { value: "Watergang", label: "Standplaats" },
  ],
} as const;

export const VACATURES_PAGE = {
  breadcrumb: "Vacatures",
  eyebrow: "Werk & inkomen",
  title: "De leukste banen voor jou",
  lede: "Ben je op zoek naar een uitdagende baan in het hoogstaande vleessegment? Bekijk de openstaande vacatures van Ayat Food.",
} as const;

export type Vacature = {
  id: string;
  index: string;
  department: string;
  title: string;
  summary: string;
  icon: LucideIcon;
  responsibilities: readonly string[];
};

/** Three open positions — verbatim from ayatfood.nl/vacatures/ */
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
      "Ervaring is een vereiste",
    ],
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
      "Ervaring is een vereiste",
    ],
  },
] as const;

export const VACATURES_FORM = {
  title: "Solliciteren",
  submitLabel: "Verzenden",
  privacyNote: "Je gegevens worden vertrouwelijk behandeld",
  fields: {
    name: "Je naam",
    email: "Je email",
    cv: "CV upload",
    motivation: "Je motivatie",
    vacancy: "Vacature",
  },
} as const;

export const VACATURES_SOLLICITEREN = {
  eyebrow: "Reageer vandaag nog",
  title: "Reageer op onze vacatures",
  lede: "Reageren op onze vacatures is eenvoudig en snel. Na ontvangst van jouw sollicitatie reageren wij binnen een aantal werkdagen.",
  contactHeading: BRAND.name,
} as const;

/** Mobile apply flow — matches Over Ons app-sheet step carousels */
export const VACATURES_APPLY_STEPS = [
  {
    num: "01",
    title: "Kies een vacature",
    text: "Bekijk de openstaande posities en selecteer de rol die bij je past.",
  },
  {
    num: "02",
    title: "Vul je gegevens in",
    text: "Naam, e-mail en motivatie — voeg je CV toe in de e-mail na verzenden.",
  },
  {
    num: "03",
    title: "Wij reageren snel",
    text: "Na ontvangst van jouw sollicitatie reageren wij binnen een aantal werkdagen.",
  },
] as const;

/** Pre-filled sollicitatie mail — CV must be attached manually in the mail client. */
export function sollicitatieMailto(options?: {
  vacatureTitle?: string;
  name?: string;
  email?: string;
  motivation?: string;
}) {
  const { vacatureTitle, name, email, motivation } = options ?? {};
  const subject = vacatureTitle
    ? `Sollicitatie: ${vacatureTitle}`
    : "Sollicitatie bij Ayat Food";

  const body = [
    "Beste Ayat Food,",
    "",
    vacatureTitle ? `Ik solliciteer op de vacature: ${vacatureTitle}.` : "Ik solliciteer bij Ayat Food.",
    "",
    name ? `Naam: ${name}` : "Naam:",
    email ? `E-mail: ${email}` : "E-mail:",
    "",
    "Motivatie:",
    motivation?.trim() || "",
    "",
    "(Voeg uw CV toe als bijlage in uw e-mailprogramma.)",
  ].join("\n");

  return `mailto:${BRAND.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
