/**
 * Over ons — content verified from https://ayatfood.nl/over-ons/
 *
 * Every claim below (24/7 service, modern wagenpark, NVWA-normen, ECC Halal,
 * the four-step bestelproces, the value propositions and the statistics) is
 * taken from the official Ayat Food website. No company history or business
 * claim is invented here.
 *
 * Imagery: Ayat Food photography shipped in `@/assets/ayat/`.
 */

import { PRODUCTEN_MEGA_ITEMS } from "@/lib/assortiment-content";
import heroOverOns from "@/assets/ayat/hero-slide-1-premium.jpg";
import heroProcessing from "@/assets/ayat/hero-processing.jpg";
import coldStorage from "@/assets/ayat/hero-coldstorage.jpg";
import storyPrimary from "@/assets/ayat/story-primary-ayat.webp";
import storySecondary from "@/assets/ayat/story-secondary-ayat.webp";
import storyTertiary from "@/assets/ayat/story-tertiary-ayat.webp";
import trustHalal from "@/assets/ayat/trust-pillar-halal.webp";
import trustNvwa from "@/assets/ayat/trust-pillar-nvwa.webp";
import trustKwaliteit from "@/assets/ayat/trust-pillar-kwaliteit.webp";
import trustLevering from "@/assets/ayat/trust-pillar-levering.webp";
import trustKlant from "@/assets/ayat/trust-pillar-klant.webp";
import trustProductie from "@/assets/ayat/trust-pillar-productie.webp";
import contactHero from "@/assets/ayat/hero-vlees.jpg";
import statsBackground from "@/assets/ayat/speerpunten-background.jpg";

export const ONS_VERHAAL_HERO_FALLBACK = heroOverOns;
export const ONS_VERHAAL_HALAL_IMAGE = trustHalal;
export const ONS_VERHAAL_HALAL_NORMEN_IMAGE = storyTertiary;
export const ONS_VERHAAL_INTRO_IMAGE = storyPrimary;
export const ONS_VERHAAL_CAREERS_IMAGE = heroProcessing;

/** Hero — official positioning line from ayatfood.nl/over-ons */
export const ONS_VERHAAL_HERO = {
  eyebrow: "Over ons · Watergang",
  /** Split across words for the staggered reveal */
  title: "Ayat Food Vleesgroothandel",
  lede: "Het adres waar afnemers en kebab-liefhebbers Halal en gezonde döner kebab producten vinden. Wij produceren verschillende soorten en smaken döner kebab producten en ondersteunen onze klanten bij het ontwikkelen van nieuwe smaken.",
  breadcrumb: "Over ons",
} as const;

export type OnsVerhaalHighlight = {
  id: string;
  title: string;
  description: string;
  image: string;
};

/** Official service claims & value propositions from ayatfood.nl/over-ons */
export const ONS_VERHAAL_HIGHLIGHTS: readonly OnsVerhaalHighlight[] = [
  {
    id: "service",
    title: "24/7 service",
    description:
      "Onze medewerkers en bezorgers staan 24/7 klaar om uw vragen te beantwoorden en uw bestellingen op tijd te leveren.",
    image: trustKlant,
  },
  {
    id: "wagenpark",
    title: "Modern wagenpark",
    description:
      "Door ons moderne wagenpark zijn wij in staat u een snelle en betrouwbare levering te garanderen.",
    image: trustLevering,
  },
  {
    id: "nvwa",
    title: "NVWA-normen",
    description:
      "Wij werken volledig volgens de normen en standaarden van de Nederlandse Voedsel- en Warenautoriteit (NVWA).",
    image: trustNvwa,
  },
  {
    id: "ecc-halal",
    title: "100% halal",
    description:
      "Al onze producten zijn onder strikte toezicht van de European Certification Centre for Halal (ECC Halal).",
    image: trustHalal,
  },
  {
    id: "beste-vlees",
    title: "Beste vlees",
    description: "Wij leveren altijd het beste van het beste vlees.",
    image: trustKwaliteit,
  },
  {
    id: "controle",
    title: "Kwaliteitscontrole",
    description: "Onze controle op onze producten is zeer hoog.",
    image: trustProductie,
  },
  {
    id: "verzendservice",
    title: "Verzendservice",
    description: "Bestellingen worden met zorg ingepakt en bezorgd.",
    image: coldStorage,
  },
  {
    id: "smaken",
    title: "Nieuwe smaken",
    description:
      "Wij ondersteunen onze klanten bij het ontwikkelen van nieuwe smaken binnen ons döner kebab assortiment.",
    image: storySecondary,
  },
] as const;

/** "Halal en kwaliteit" — verbatim positioning from ayatfood.nl/over-ons */
export const ONS_VERHAAL_HALAL = {
  eyebrow: "Halal en kwaliteit",
  title: "Twee kernbegrippen",
  paragraphs: [
    "Halal en kwaliteit zijn twee belangrijke kernbegrippen binnen Ayat Food Vleesgroothandel. Wij werken volledig volgens de normen en standaarden van de Nederlandse Voedsel- en Warenautoriteit (NVWA).",
    "Daarnaast zijn al onze producten onder een strikte toezicht van de European Certification Centre for Halal (ECC Halal). Zo weet u zeker dat elk product dat onze deur verlaat voldoet aan de eisen die u en uw klanten daaraan stellen.",
    "Ons succesgeheim ligt in de ambitie om onze afnemers Halal, hoogwaardige en exclusieve producten aan te bieden. Onze controle op die producten is zeer hoog.",
  ],
  badges: ["NVWA-normen", "ECC Halal", "Strikte controle", "100% Halal"],
} as const;

/** Company introduction — official Ayat Food positioning */
export const ONS_VERHAAL_INTRO = {
  eyebrow: "Ayat Food Vleesgroothandel",
  title: "Het adres voor Halal döner kebab",
  paragraphs: [
    "Ayat Food Vleesgroothandel is het adres waar de afnemers en kebab-liefhebbers Halal en gezonde döner kebab producten kunnen vinden. Wij produceren verschillende soorten en smaken döner kebab producten en ondersteunen onze klanten bij het ontwikkelen van nieuwe smaken.",
    "Onze medewerkers en bezorgers staan 24/7 klaar om uw vragen te beantwoorden en uw bestellingen op tijd te leveren. Bij Ayat Food Vleesgroothandel worden uw bestellingen op tijd geleverd.",
    "Door ons moderne wagenpark zijn wij in staat u een snelle en betrouwbare levering te garanderen aan restaurants, supermarkten, slagerijen en groothandels door heel Nederland.",
  ],
  badges: ["Watergang", "Vleesgroothandel", "24/7 service"],
} as const;

/** "Hoe vlees te bestellen" — the official four-step ordering process */
export const ONS_VERHAAL_WORKFLOW = {
  eyebrow: "Hoe we werken",
  title: "Hoe vlees te bestellen",
  steps: [
    {
      n: "Stap 1",
      title: "Zoek jouw vlees",
      text: "Bekijk ons assortiment: döner, shoarma, gevogelte, vleessoorten, diepvriesproducten, Turkse pizza, gegrilde producten en tortilla durum.",
    },
    {
      n: "Stap 2",
      title: "Bestel je vlees",
      text: "Plaats je bestelling per mail of telefoon. Onze medewerkers denken met je mee over hoeveelheden, smaken en verpakking.",
    },
    {
      n: "Stap 3",
      title: "Wij bezorgen",
      text: "Na ontvangst en verpakken van je bestelling bezorgen wij deze, snel en betrouwbaar dankzij ons moderne wagenpark.",
    },
    {
      n: "Stap 4",
      title: "Geniet van je vlees",
      text: "Controleer je bestelling bij ontvangst en geniet van onze mooie producten.",
    },
  ],
} as const;

export type OnsVerhaalStat = {
  id: string;
  value: number;
  suffix: string;
  label: string;
};

/** "We zijn klaar om perfectie te dienen" — official counters from ayatfood.nl/over-ons */
export const ONS_VERHAAL_STATS = {
  eyebrow: "Wij zijn er voor u",
  title: "We zijn klaar om perfectie te dienen",
  lede: "Jaren ervaring in het hoogstaande vleessegment, vertaald naar producten en service waar onze afnemers dagelijks op bouwen.",
  backgroundImage: statsBackground,
  items: [
    { id: "ervaring", value: 10, suffix: "+", label: "jaar ervaring" },
    { id: "kilos", value: 751, suffix: "+", label: "verkochte kilo's" },
    { id: "klanten", value: 989, suffix: "", label: "tevreden klanten" },
    { id: "team", value: 6, suffix: "", label: "teamleden" },
  ] as const satisfies readonly OnsVerhaalStat[],
} as const;

/** The three lead categories shown on Over ons (Döner, Shoarma, Gevogelte) */
export const ONS_VERHAAL_ASSORTIMENT = PRODUCTEN_MEGA_ITEMS.slice(0, 3);

/** Full official product range — the eight Ayat Food product groups */
export const ONS_VERHAAL_PRODUCTGROEPEN = PRODUCTEN_MEGA_ITEMS;

/** Careers teaser — links through to the Vacatures page */
export const ONS_VERHAAL_CAREERS = {
  eyebrow: "Werken bij Ayat Food",
  title: "De leukste banen voor jou",
  text: "Ben je op zoek naar een uitdagende baan in het hoogstaande vleessegment? Bij Ayat Food werk je in een hecht team van zes collega's dat elke dag samen hetzelfde doel nastreeft: hoogwaardige Halal producten leveren aan onze afnemers. Van magazijn en orderpicking tot verkoop en klantadvies. Bekijk de openstaande vacatures van Ayat Food.",
  cta: "Bekijk onze vacatures",
  ctaTo: "/vacatures" as const,
} as const;

export const CONTACT_PARTNER = {
  eyebrow: "Samen groeien in vertrouwen",
  title: "Uw partner in premium Halal vlees",
  text: "Ayat Food gelooft in langdurige samenwerkingen. Onze medewerkers en bezorgers staan 24/7 klaar om uw vragen te beantwoorden en uw bestellingen op tijd te leveren. Met een modern wagenpark, strikte kwaliteitscontrole en ECC Halal-toezicht bouwen we samen aan een relatie waarin u altijd op ons kunt rekenen.",
  cta: "Word ook klant",
} as const;

export const CONTACT_HERO_IMAGE = contactHero;
