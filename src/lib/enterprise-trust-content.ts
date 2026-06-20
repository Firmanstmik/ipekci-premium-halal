import type { LucideIcon } from "lucide-react";
import { Award, Factory, ScanLine, ShieldCheck, Snowflake, Truck } from "lucide-react";
import trustDistributieImage from "@/assets/trust/trust-distributie.webp";
import trustHalalImage from "@/assets/trust/trust-halal-certificaat.webp";
import trustKoelingImage from "@/assets/trust/trust-koeling.webp";
import trustKwaliteitImage from "@/assets/trust/trust-kwaliteit.webp";
import trustSlachterijImage from "@/assets/trust/trust-slachterij.webp";
import trustTraceerbaarheidImage from "@/assets/trust/trust-traceerbaarheid.webp";

export type EnterprisePillar = {
  id: string;
  title: string;
  kicker: string;
  text: string;
  icon: LucideIcon;
  image: string;
};

/** Brand photography sourced from Ipekçi official media & social channels */
export const ENTERPRISE_TRUST_PILLARS: readonly EnterprisePillar[] = [
  {
    id: "halal",
    title: "Halal gecertificeerd",
    kicker: "Onafhankelijk gecontroleerd",
    text: "Onafhankelijk gecertificeerd en onbedwelmd geslacht, volledig volgens islamitische normen.",
    icon: ShieldCheck,
    image: trustHalalImage,
  },
  {
    id: "slachterij",
    title: "Eigen slachterij",
    kicker: "Volledige regie",
    text: "Volledige regie over elke stap van het proces in onze eigen Nederlandse slachterij.",
    icon: Factory,
    image: trustSlachterijImage,
  },
  {
    id: "kwaliteit",
    title: "Nederlandse kwaliteit",
    kicker: "Van Nederlandse bodem",
    text: "Vlees van Nederlandse bodem, geselecteerd op constante kwaliteit en versheid.",
    icon: Award,
    image: trustKwaliteitImage,
  },
  {
    id: "koeling",
    title: "Gekoelde levering",
    kicker: "Ononderbroken koelketen",
    text: "Een onafgebroken gekoelde keten, van de slachterij tot aan uw deur.",
    icon: Snowflake,
    image: trustKoelingImage,
  },
  {
    id: "distributie",
    title: "Landelijke distributie",
    kicker: "Door heel Nederland",
    text: "Vaste leverlijnen en betrouwbare distributie door heel Nederland.",
    icon: Truck,
    image: trustDistributieImage,
  },
  {
    id: "traceerbaarheid",
    title: "Volledige traceerbaarheid",
    kicker: "Van begin tot eind",
    text: "Herkomst en verwerking van elk product blijven van begin tot eind herleidbaar.",
    icon: ScanLine,
    image: trustTraceerbaarheidImage,
  },
] as const;

export const ENTERPRISE_TRUST_BADGES = [
  "NVWA erkend",
  "Sinds 2012",
  "Harderwijk",
] as const;

export const ENTERPRISE_AUTOPLAY_MS = 5600;
