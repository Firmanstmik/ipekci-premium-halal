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
import overOnsHero from "@/assets/ayat/over-ons-hero-contact.jpg";
import overOnsBackground from "@/assets/ayat/over-ons-background.jpg";
import overOnsRawMeat from "@/assets/ayat/over-ons-raw-meat.png";
import workflowHeroMeat from "@/assets/ayat/workflow-hero-meat.webp";
import workflowStepZoek from "@/assets/ayat/workflow-step-zoek.webp";
import workflowStepBestel from "@/assets/ayat/workflow-step-bestel.webp";
import workflowStepBezorgen from "@/assets/ayat/workflow-step-bezorgen.webp";
import workflowStepGeniet from "@/assets/ayat/workflow-step-geniet.webp";
import statsHeroKebab from "@/assets/ayat/stats-hero-kebab.webp";
import overOnsLevertijd from "@/assets/ayat/over-ons-levertijd.jpg";
import heroVlees from "@/assets/ayat/hero-vlees.jpg";
import heroProcessing from "@/assets/ayat/hero-processing.jpg";
import bgDiepvries from "@/assets/ayat/product-bg-diepvriesproducten.jpg";
import highlightVerzending from "@/assets/ayat/highlight-verzending.png";
import highlightBesteVlees from "@/assets/ayat/highlight-beste-vlees.webp";
import highlightKwaliteit from "@/assets/ayat/highlight-kwaliteit.webp";
import highlightVerzending from "@/assets/ayat/highlight-verzending.webp";
import highlightHalal from "@/assets/ayat/highlight-halal.webp";
import halalCertSeal from "@/assets/trust/trust-halal-certificaat.webp";
import contactHero from "@/assets/ayat/hero-vlees.jpg";

export const ONS_VERHAAL_HERO_FALLBACK = overOnsHero;
export const ONS_VERHAAL_SECTION_BACKGROUND = overOnsBackground;
export const ONS_VERHAAL_HALAL_IMAGE = overOnsRawMeat;
export const ONS_VERHAAL_HALAL_NORMEN_IMAGE = overOnsLevertijd;
export const ONS_VERHAAL_SERVICE_IMAGE = overOnsLevertijd;
export const ONS_VERHAAL_CAREERS_IMAGE = overOnsHero;

/** Hero — copy from https://ayatfood.nl/over-ons/ */
export const ONS_VERHAAL_HERO = {
  eyebrow: "Over ons",
  title: "Ayat Food Vleesgroothandel",
  paragraphs: [
    "Wij produceren verschillende soorten en smaken döner kebab producten en ondersteunen onze klanten bij het ontwikkelen van nieuwe smaken.",
    "Ayat Food Vleesgroothandel is het adres waar de afnemers en kebab-liefhebbers Halal en gezonde döner kebab producten kunnen vinden.",
  ],
  breadcrumb: "Over ons",
} as const;

export type OnsVerhaalHighlightPill = {
  id: string;
  title: string;
  subtitle: string;
};

export type OnsVerhaalHighlight = {
  id: string;
  eyebrow: string;
  titlePrefix: string;
  titleAccent: string;
  description: string;
  image: string;
  pills: readonly OnsVerhaalHighlightPill[];
  href: string;
};

/** 24/7 service + wagenpark — https://ayatfood.nl/over-ons/ */
export const ONS_VERHAAL_SERVICE = {
  title: "24/7 service",
  titleAccent: "24/7",
  titleRest: "service",
  /** Derived from official copy: "worden uw bestellingen op tijd geleverd" */
  tagline: "Uw bestellingen op tijd geleverd",
  paragraphs: [
    "Onze medewerkers en bezorgers staan 24/7 klaar om uw vragen te beantwoorden en uw bestellingen op tijd te leveren. Bij Ayat Food Vleesgroothandel worden uw bestellingen op tijd geleverd.",
    "Door ons moderne wagenpark zijn wij in staat u een snelle en betrouwbare leveringen te garanderen.",
  ],
  pillars: [
    {
      id: "halal",
      title: "100% Halal",
      description:
        "Al onze producten zijn onder strikte toezicht van de European Certification Centre for Halal (ECC Halal).",
    },
    {
      id: "nvwa",
      title: "NVWA-normen",
      description:
        "Wij werken volledig volgens de normen en standaarden van de Nederlandse Voedsel- en Warenautoriteit (NVWA).",
    },
    {
      id: "levering",
      title: "Snelle levering",
      description:
        "Door ons moderne wagenpark zijn wij in staat u een snelle en betrouwbare leveringen te garanderen.",
    },
  ],
  wagenpark: {
    title: "Modern wagenpark",
    description:
      "Door ons moderne wagenpark zijn wij in staat u een snelle en betrouwbare leveringen te garanderen.",
    thumbnails: [bgDiepvries, heroProcessing, highlightVerzending] as const,
  },
  ctas: {
    primary: { label: "Bekijk onze producten", to: "/producten" as const },
    secondary: { label: "Neem contact op", to: "/contact" as const },
  },
} as const;

/** Four value cards at the bottom of https://ayatfood.nl/over-ons/ */
export const ONS_VERHAAL_HIGHLIGHTS: readonly OnsVerhaalHighlight[] = [
  {
    id: "beste-vlees",
    eyebrow: "Premium kwaliteit",
    titlePrefix: "Beste",
    titleAccent: "vlees",
    description: "Wij leveren altijd het beste van het beste vlees.",
    image: highlightBesteVlees,
    pills: [
      { id: "halal", title: "100% Halal", subtitle: "Strikte richtlijnen" },
      { id: "nvwa", title: "NVWA-normen", subtitle: "Gecertificeerd" },
      { id: "levering", title: "Snelle levering", subtitle: "Op tijd geleverd" },
    ],
    href: "/producten",
  },
  {
    id: "controle",
    eyebrow: "Kwaliteits controle",
    titlePrefix: "Kwaliteits",
    titleAccent: "controle",
    description: "Onze controle op onze producten is zeer hoog!",
    image: highlightKwaliteit,
    pills: [
      { id: "controle", title: "Strikte controle", subtitle: "Elke batch" },
      { id: "halal", title: "100% Halal", subtitle: "ECC Halal" },
    ],
    href: "/producten",
  },
  {
    id: "verzendservice",
    eyebrow: "Verzendservice",
    titlePrefix: "Verzend",
    titleAccent: "service",
    description: "Bestelling worden met zorg ingepakt en bezorgd.",
    image: highlightVerzending,
    pills: [
      { id: "koel", title: "Koel transport", subtitle: "Gekoeld" },
      { id: "veilig", title: "Veilig verpakt", subtitle: "Met zorg" },
      { id: "tijd", title: "Op tijd", subtitle: "Betrouwbaar" },
    ],
    href: "/contact",
  },
  {
    id: "halal",
    eyebrow: "100% halal",
    titlePrefix: "100%",
    titleAccent: "halal",
    description:
      "Al onze producten zijn onder strikte toezicht van de European Certification Centre for Halal (ECC Halal).",
    image: highlightHalal,
    pills: [
      { id: "ecc", title: "ECC Halal", subtitle: "Gecertificeerd" },
      { id: "halal", title: "100% Halal", subtitle: "Strikte richtlijnen" },
    ],
    href: "/producten",
  },
] as const;

/** "Halal en kwaliteit" — https://ayatfood.nl/over-ons/ */
export const ONS_VERHAAL_HALAL = {
  eyebrow: "Halal en kwaliteit",
  titlePrefix: "Halal en",
  titleAccent: "kwaliteit",
  paragraphs: [
    "Halal en kwaliteit zijn twee belangrijke kernbegrippen binnen Ayat Food Vleesgroothandel. Wij werken volledig volgens de normen en standaarden van de Nederlandse Voedsel- en Warenautoriteit (NVWA). Daarnaast zijn al onze producten onder een strikte toezicht van de European Certification Centre for Halal (ECC Halal).",
  ],
  quote:
    "Halal en kwaliteit zijn twee belangrijke kernbegrippen binnen Ayat Food Vleesgroothandel.",
  pillars: [
    {
      id: "halal",
      title: "100% Halal",
      description: "Al onze producten zijn onder strikte toezicht van ECC Halal.",
    },
    {
      id: "nvwa",
      title: "NVWA-normen",
      description: "Volgens normen en standaarden van de NVWA.",
    },
    {
      id: "ecc",
      title: "ECC Halal",
      description: "European Certification Centre for Halal.",
    },
    {
      id: "kwaliteit",
      title: "Kwaliteits controle",
      description: "Onze controle op onze producten is zeer hoog!",
    },
  ],
  certification: {
    label: "European Certification Centre for Halal (ECC Halal)",
    text: "Al onze producten zijn onder strikte toezicht van de European Certification Centre for Halal (ECC Halal).",
    seal: halalCertSeal,
  },
} as const;

/** "Hoe vlees te bestellen" — https://ayatfood.nl/over-ons/ */
export const ONS_VERHAAL_WORKFLOW = {
  eyebrow: "Hoe we werken",
  title: "Hoe vlees te bestellen",
  lede:
    "Wij hebben het bestelproces eenvoudig en efficiënt gemaakt. Zo weet je altijd waar je aan toe bent.",
  heroImage: workflowHeroMeat,
  steps: [
    {
      n: "Stap 1",
      title: "Zoek jouw vlees",
      text: "Bekijk ons assortiment en vind het vlees dat bij jouw keuken past.",
      image: workflowStepZoek,
    },
    {
      n: "Stap 2",
      title: "Bestel je vlees",
      text: "Plaats je bestelling per mail of telefoon. Wij bevestigen snel en duidelijk.",
      image: workflowStepBestel,
    },
    {
      n: "Stap 3",
      title: "Wij bezorgen",
      text: "Na ontvangst en verpakken van je bestelling bezorgen wij deze op tijd en gekoeld.",
      image: workflowStepBezorgen,
    },
    {
      n: "Stap 4",
      title: "Geniet van je vlees",
      text: "Controleer je bestelling bij ontvangst en geniet van onze mooie producten.",
      image: workflowStepGeniet,
    },
  ],
  trust: {
    title: "Kwaliteit & betrouwbaarheid in elke stap",
    description: "Van selectie tot levering, wij staan voor halal kwaliteit en service.",
    items: [
      {
        id: "halal",
        title: "100% Halal",
        description: "Strikte richtlijnen",
      },
      {
        id: "nvwa",
        title: "NVWA-normen",
        description: "Gecertificeerde productie",
      },
      {
        id: "levering",
        title: "Snelle levering",
        description: "Op tijd en gekoeld",
      },
      {
        id: "contact",
        title: "Persoonlijk contact",
        description: "Wij denken met je mee",
      },
    ],
  },
} as const;

export type OnsVerhaalStat = {
  id: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
};

/** "We zijn klaar om perfectie te dienen" — official counters from ayatfood.nl/over-ons */
export const ONS_VERHAAL_STATS = {
  eyebrow: "Wij zijn er voor u",
  titlePrefix: "We zijn klaar om",
  titleAccent: "perfectie te dienen",
  lede:
    "Met jarenlange ervaring, een gepassioneerd team en de hoogste standaarden leveren wij halal vlees van topkwaliteit — elke dag opnieuw.",
  heroImage: statsHeroKebab,
  backgroundImage: overOnsBackground,
  items: [
    {
      id: "ervaring",
      value: 10,
      suffix: "+",
      label: "jaar ervaring",
      description: "Een decennium aan expertise in halal vlees en service.",
    },
    {
      id: "kilos",
      value: 751,
      suffix: "+",
      label: "verkochte kilo's",
      description: "Dagelijks vertrouwen honderden klanten op onze kwaliteit.",
    },
    {
      id: "klanten",
      value: 989,
      suffix: "",
      label: "tevreden klanten",
      description: "Relaties gebouwd op vertrouwen, kwaliteit en consistentie.",
    },
    {
      id: "team",
      value: 6,
      suffix: "",
      label: "teamleden",
      description: "Een hecht team van specialisten met passie voor perfectie.",
    },
  ] as const satisfies readonly OnsVerhaalStat[],
  trust: {
    items: [
      { id: "halal", title: "100% Halal", description: "Strikte richtlijnen" },
      { id: "nvwa", title: "NVWA-normen", description: "Gecertificeerde productie" },
      { id: "levering", title: "Snelle levering", description: "Op tijd en gekoeld" },
      { id: "contact", title: "Persoonlijk contact", description: "Wij denken met je mee" },
    ],
  },
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
