import iconHalal from "@/assets/ayat/over-ons-icon-halal.png";
import iconKwaliteit from "@/assets/ayat/over-ons-icon-kwaliteit.png";
import iconMessen from "@/assets/ayat/over-ons-icon-messen.png";
import levertijdImage from "@/assets/ayat/over-ons-levertijd.jpg";

/**
 * Home Over Ons — verified from https://ayatfood.nl/
 * Icons & levertijd photography sourced from ayatfood.nl media library.
 */

/** Routes the section is allowed to link to — keeps card links type-safe for the router. */
export type OverOnsLink = "/ons-verhaal" | "/producten" | "/contact";

export type OverOnsFeature = {
  id: string;
  /** Editorial index shown as a spec-sheet numeral (01 / 02 / 03) */
  index: string;
  title: string;
  text: string;
  image?: string;
  icon?: string;
  imageAlt?: string;
  /** Cinematic caption under the hero copy — frames the photo as a documented scene */
  caption?: string;
  /** Authority label (certifying body) surfaced as a badge */
  certification?: string;
  /** Full name of the certifying body — shown in the hero link-badge */
  certificationNote?: string;
  /** Short supporting metadata chips inside the card */
  meta?: readonly string[];
  /** Quiet secondary action anchored to the card footer */
  linkLabel?: string;
  linkTo?: OverOnsLink;
};

export const HOME_OVER_ONS = {
  kicker: "Over ons",
  badgeTitle: "Ayat Food",
  title: "Welkom bij Ayat Food",
  paragraphs: [
    "Kwaliteit is een kern begrip binnen Ayat Food Vleesgroothandel. Wij werken volledig volgens de normen en standaarden van de Nederlandse Voedsel- en Warenautoriteit (NVWA). Daarnaast zijn al onze producten onder strikte toezicht van de European Certification Centre for Halal (ECC Halal).",
    "Ons succesgeheim ligt in de ambitie om onze afnemers Halal, hoogwaardige en exclusieve producten aan te bieden.",
  ],
  /** Kicker above the closing story paragraph */
  storyKicker: "Ons succesgeheim",
  customerTitle: "Klant staat centraal",
  customerText:
    "Wij helpen onze klanten met het kiezen van de juiste vleesproducten en het ontwikkelen van nieuwe smaken.",
  /** Attribution under the customer promise — signs the statement */
  customerAttribution: "Ayat Food Vleesgroothandel",
  experience: {
    value: "10+",
    /** Split value so the numeral can count up while the suffix stays fixed */
    numeric: 10,
    suffix: "+",
    label: "jaar ervaring",
    /** Replaces the orphaned divider rule with real supporting context */
    meta: "Partner van slagerijen, groothandels, supermarkten en restaurants",
    icon: iconMessen,
  },
  checklist: ["100% Halal", "Punctuele Levertijd", "Hoge Kwaliteit", "Klant Staat Centraal"],
  ctaLabel: "Lees ons verhaal",
  ctaTo: "/ons-verhaal" as const,
  /** Microcopy above the closing CTA — gives the button a reason to exist */
  ctaNote: "Ontdek hoe wij kwaliteit, halal en levertijd elke dag waarmaken.",
  features: [
    {
      id: "levertijd",
      index: "01",
      title: "Snelle levertijd",
      text: "Dankzij ons moderne wagenpark zijn wij in staat een snelle en betrouwbare levering te garanderen.",
      image: levertijdImage,
      imageAlt: "Slager bereidt premium rundvlees voor snelle en zorgvuldige levering",
      caption: "Zorgvuldig versneden, betrouwbaar uitgeleverd.",
      meta: ["Modern wagenpark", "Betrouwbare levering"],
    },
    {
      id: "kwaliteit",
      index: "02",
      title: "Hoge Kwaliteit",
      text: "Wij werken volgens de normen en standaarden van de Nederlandse Voedsel- en Warenautoriteit (NVWA).",
      icon: iconKwaliteit,
      certification: "NVWA",
      certificationNote: "Nederlandse Voedsel- en Warenautoriteit",
      meta: ["NVWA-normen", "Hoogwaardige selectie"],
      linkLabel: "Onze standaarden",
      linkTo: "/ons-verhaal",
    },
    {
      id: "halal",
      index: "03",
      title: "100% Halal",
      text: "Al onze producten zijn onder strikte toezicht van de European Certification Centre for Halal (ECC Halal).",
      icon: iconHalal,
      certification: "ECC Halal",
      certificationNote: "European Certification Centre for Halal",
      meta: ["Strikt toezicht", "100% Halal"],
      linkLabel: "Onze certificering",
      linkTo: "/ons-verhaal",
    },
  ] as const satisfies readonly OverOnsFeature[],
} as const;

/** @deprecated Use HOME_OVER_ONS — kept for any lingering imports */
export const HOME_COMPANY_STORY = {
  eyebrow: HOME_OVER_ONS.kicker.toUpperCase(),
  titleLine1: "Welkom bij",
  titleLine2: "Ayat Food",
  body: HOME_OVER_ONS.paragraphs.join(" "),
  highlights: HOME_OVER_ONS.checklist,
  ctaLabel: HOME_OVER_ONS.ctaLabel,
  ctaTo: HOME_OVER_ONS.ctaTo,
  media: {
    primary: {
      src: levertijdImage,
      alt: "Premium Halal vlees van Ayat Food",
    },
    secondary: {
      src: iconKwaliteit,
      alt: "Hoge kwaliteit",
    },
    tertiary: {
      src: iconHalal,
      alt: "100% Halal",
    },
  },
} as const;
