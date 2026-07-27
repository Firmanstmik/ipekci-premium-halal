import type { LucideIcon } from "lucide-react";
import {
  Award,
  BadgeCheck,
  Factory,
  HeartHandshake,
  ShieldCheck,
  Truck,
} from "lucide-react";
import imgHalal from "@/assets/ayat/trust-pillar-halal.webp";
import imgNvwa from "@/assets/ayat/trust-pillar-nvwa.webp";
import imgKwaliteit from "@/assets/ayat/trust-pillar-kwaliteit.webp";
import imgLevering from "@/assets/ayat/trust-pillar-levering.webp";
import imgKlant from "@/assets/ayat/trust-pillar-klant.webp";
import imgProductie from "@/assets/ayat/trust-pillar-productie.webp";

export type EnterprisePillar = {
  id: string;
  title: string;
  kicker: string;
  text: string;
  icon: LucideIcon;
  image: string;
};

/**
 * Trust pillars — verified from https://ayatfood.nl/ and /over-ons/
 * Speerpunten: snelheid, kwaliteit, klantgerichtheid + Halal / NVWA / eigen productie.
 * Images: premium Ayat Food product photography style (ayatfood.nl/producten),
 * food-forward close-ups — not industrial slaughterhouse aesthetics.
 */
export const ENTERPRISE_TRUST_PILLARS: readonly EnterprisePillar[] = [
  {
    id: "halal",
    title: "100% Halal",
    kicker: "ECC Halal toezicht",
    text: "Al onze producten staan onder strikte toezicht van het European Certification Centre for Halal (ECC Halal).",
    icon: ShieldCheck,
    image: imgHalal,
  },
  {
    id: "nvwa",
    title: "NVWA-normen",
    kicker: "Voedselveiligheid voorop",
    text: "Wij werken volledig volgens de normen en standaarden van de Nederlandse Voedsel- en Warenautoriteit (NVWA).",
    icon: Award,
    image: imgNvwa,
  },
  {
    id: "kwaliteit",
    title: "Hoge kwaliteit",
    kicker: "Exclusieve producten",
    text: "Ons succesgeheim: Halal, hoogwaardige en exclusieve producten voor restaurants, supermarkten en retail.",
    icon: BadgeCheck,
    image: imgKwaliteit,
  },
  {
    id: "levering",
    title: "Snelle levering",
    kicker: "Modern wagenpark",
    text: "Dankzij ons moderne wagenpark garanderen wij een snelle en betrouwbare levering — punctueel en zorgvuldig.",
    icon: Truck,
    image: imgLevering,
  },
  {
    id: "klant",
    title: "Klant centraal",
    kicker: "Persoonlijke begeleiding",
    text: "Wij helpen onze klanten met het kiezen van de juiste vleesproducten en het ontwikkelen van nieuwe smaken.",
    icon: HeartHandshake,
    image: imgKlant,
  },
  {
    id: "productie",
    title: "Eigen productie",
    kicker: "Van smaak tot levering",
    text: "Dankzij onze eigen productie bieden wij hoogwaardige Halal vleesproducten — van döner en shoarma tot gevogelte.",
    icon: Factory,
    image: imgProductie,
  },
] as const;

export const ENTERPRISE_TRUST_BADGES = [
  "ECC Halal",
  "NVWA-normen",
  "Watergang",
] as const;

export const ENTERPRISE_AUTOPLAY_MS = 5600;

export const ENTERPRISE_TRUST_COPY = {
  badgeKicker: "Vertrouwen",
  badgeTitle: "Waarom Ayat Food",
  headingLine1: "De betrouwbaarheid van een",
  headingAccent: "premium Halal-partner.",
  pillarsTitle: "Zes pijlers van vertrouwen",
  pillarsIntro:
    "Snelheid, kwaliteit en klantgerichtheid — klik een pijler om te ontdekken.",
} as const;
