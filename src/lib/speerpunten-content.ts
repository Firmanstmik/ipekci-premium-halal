import type { ProductCategorySlug } from "@/lib/producten-content";
import speerpuntenBg from "@/assets/ayat/speerpunten-background.jpg";
import productDoner from "@/assets/ayat/product-doner.jpg";
import productGevogelte from "@/assets/ayat/product-gevogelte.jpg";
import productVleessoorten from "@/assets/ayat/product-vleessoorten.jpg";

/**
 * Onze speerpunten — verified from https://ayatfood.nl/
 * Progress metrics + category teasers + passion CTA as published on the homepage.
 * Background: https://ayatfood.nl/wp-content/uploads/2024/04/background.jpg
 */

export type SpeerpuntMetric = {
  id: string;
  label: string;
  value: number;
};

export type SpeerpuntCard = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  /** Producten route param (`/producten/$category`) */
  category: ProductCategorySlug;
  image: string;
};

export const SPEERPUNTEN_COPY = {
  kicker: "Ayat Food",
  badgeTitle: "Speerpunten",
  title: "Onze speerpunten",
  lede: "Ons bedrijf legt de nadruk op drie belangrijke speerpunten: snelheid, kwaliteit en klantgerichtheid.",
  /** Official ayatfood.nl speerpunten section background */
  backgroundImage: speerpuntenBg,
  passion: {
    kicker: "En dat proef je",
    title: "Döner kebab met passie",
    lede: "Ayat Food Vleesgroothandel is het adres waar de afnemers en kebab-liefhebbers Halal en gezonde döner kebab producten kunnen afnemen.",
    cta: "Offerte aanvragen",
    href: "/contact" as const,
  },
} as const;

/** Six metrics in display order (left column then right, matching ayatfood.nl). */
export const SPEERPUNTEN_METRICS: readonly SpeerpuntMetric[] = [
  { id: "levertijd", label: "Snelle levertijd", value: 94 },
  { id: "kwaliteit", label: "Hoge kwaliteit", value: 98 },
  { id: "halal", label: "100% halal", value: 100 },
  { id: "klant", label: "Klant staat centraal", value: 100 },
  { id: "hygiene", label: "Hoge hygiene", value: 99 },
  { id: "service", label: "Hoge service", value: 92 },
] as const;

/** Three category teasers under the metrics (ayatfood.nl homepage). */
export const SPEERPUNTEN_CARDS: readonly SpeerpuntCard[] = [
  {
    id: "doner",
    title: "Döner",
    subtitle: "De beste van smaak",
    description: "Bekijk ons aanbod aan Döner...",
    category: "doner",
    image: productDoner,
  },
  {
    id: "gevogelte",
    title: "Gevogelte",
    subtitle: "Heerlijk smaakvol",
    description: "Bekijk ons aanbod aan gevogelte...",
    category: "gevogelte",
    image: productGevogelte,
  },
  {
    id: "vleessoorten",
    title: "Vleessoorten",
    subtitle: "Top vlees",
    description: "Bekijk ons aanbod aan vlees...",
    category: "vleessoorten",
    image: productVleessoorten,
  },
] as const;
