import heroDoner from "@/assets/ayat/hero-doner.jpg";
import heroShoarma from "@/assets/ayat/hero-shoarma.jpg";
import heroGevogelte from "@/assets/ayat/hero-gevogelte.jpg";
import heroVleessoorten from "@/assets/ayat/hero-vleessoorten.jpg";
import heroProcessing from "@/assets/ayat/hero-processing.jpg";
import heroBackdrop from "@/assets/ayat/hero-backdrop.jpeg";
import heroSlide1 from "@/assets/ayat/hero-slide-1-premium.jpg";
import heroSlide3 from "@/assets/ayat/hero-slide-3-premium.jpg";

/** AI-upgraded + official Ayat Food hero backgrounds (modern slide) */
export const HERO_BG_SLIDES = [
  {
    id: "gourmet",
    image: heroSlide1,
    objectPosition: "72% 48%",
    label: "Premium Halal",
  },
  {
    id: "signature",
    image: heroBackdrop,
    objectPosition: "70% 45%",
    label: "Signature producten",
  },
  {
    id: "fresh",
    image: heroSlide3,
    objectPosition: "58% 40%",
    label: "Verse kwaliteit",
  },
] as const;

/** @deprecated Prefer HERO_BG_SLIDES — kept for legacy imports */
export const AYAT_HERO_IMAGE = heroSlide1;

export type HeroShowcaseSlide = {
  id: string;
  label: string;
  title: string;
  image: string;
  objectPosition?: string;
  sticker: string;
};

/** Official Ayat Food product photography */
export const HERO_SHOWCASE_SLIDES: readonly HeroShowcaseSlide[] = [
  {
    id: "doner",
    label: "Döner",
    title: "Halal döner kebab met passie",
    image: heroDoner,
    objectPosition: "50% 40%",
    sticker: heroDoner,
  },
  {
    id: "shoarma",
    label: "Shoarma",
    title: "Rund, kip, lam of mix",
    image: heroShoarma,
    objectPosition: "50% 35%",
    sticker: heroShoarma,
  },
  {
    id: "gevogelte",
    label: "Gevogelte",
    title: "Heerlijke kipproducten",
    image: heroGevogelte,
    objectPosition: "50% 40%",
    sticker: heroGevogelte,
  },
  {
    id: "vleessoorten",
    label: "Vleessoorten",
    title: "Premium rundvlees",
    image: heroVleessoorten,
    objectPosition: "50% 40%",
    sticker: heroVleessoorten,
  },
  {
    id: "productie",
    label: "Productie",
    title: "Hoogwaardige Halal verwerking",
    image: heroProcessing,
    objectPosition: "50% 35%",
    sticker: heroProcessing,
  },
] as const;

export const HERO_TRUST_ITEMS = [
  {
    title: "100% Halal",
    subtitle: "Onder toezicht van ECC Halal",
  },
  {
    title: "NVWA Normen",
    subtitle: "Volgens Nederlandse voedselveiligheid",
  },
  {
    title: "Snelle Levering",
    subtitle: "Modern wagenpark, betrouwbaar",
  },
  {
    title: "Hoge Kwaliteit",
    subtitle: "Exclusieve Halal producten",
  },
] as const;

export const HERO_SHOWCASE_AUTOPLAY_MS = 5200;
export const HERO_BG_AUTOPLAY_MS = 6500;

/** @deprecated Use AYAT_HERO_IMAGE */
export const IPEKCI_HERO_IMAGE = AYAT_HERO_IMAGE;
