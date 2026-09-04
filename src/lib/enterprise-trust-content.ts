import type { LucideIcon } from "lucide-react";
import { Award, BadgeCheck, Factory, HeartHandshake, ShieldCheck, Truck } from "lucide-react";
import imgHalal from "@/assets/ayat/product-gevogelte.jpg";
import imgNvwa from "@/assets/ayat/raw-meat-1.jpg";
import imgKwaliteit from "@/assets/ayat/product-spotlight-marbled.jpg";
import imgLevering from "@/assets/ayat/highlight-verzending.png";
import imgKlant from "@/assets/ayat/ayat-segment-restaurants.webp";
import imgProductie from "@/assets/ayat/hero-processing.jpg";

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
 * Images: unbranded product photography only — real packaging has no Ayat Food logo.
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
    text: "Dankzij ons moderne wagenpark garanderen wij een snelle en betrouwbare levering, punctueel en zorgvuldig.",
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
    text: "Dankzij onze eigen productie bieden wij hoogwaardige Halal vleesproducten, van döner en shoarma tot gevogelte.",
    icon: Factory,
    image: imgProductie,
  },
] as const;

export const ENTERPRISE_TRUST_BADGES = ["ECC Halal", "NVWA-normen", "Watergang"] as const;

export const ENTERPRISE_AUTOPLAY_MS = 5600;

export const ENTERPRISE_TRUST_COPY = {
  badgeKicker: "Vertrouwen",
  badgeTitle: "Waarom Ayat Food",
  headingLine1: "De betrouwbaarheid van een",
  headingAccent: "premium Halal-partner.",
  pillarsTitle: "Zes pijlers van vertrouwen",
  pillarsIntro: "Snelheid, kwaliteit en klantgerichtheid. Klik een pijler om te ontdekken.",
} as const;
