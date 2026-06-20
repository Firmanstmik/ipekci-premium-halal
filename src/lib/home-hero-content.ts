import heroKip from "@/assets/hero/hero-kip.webp";
import heroLam from "@/assets/hero/hero-lam.webp";
import heroProducten from "@/assets/hero/hero-producten.webp";
import heroRund from "@/assets/hero/hero-rund.webp";
import heroSlachterij from "@/assets/hero/hero-slachterij.webp";

const CDN = "https://www.ipekcislachterij.nl/wp-content/uploads/2025/11";

export const IPEKCI_HERO_IMAGE =
  "https://www.ipekcislachterij.nl/wp-content/uploads/2025/12/Ook-klant-worden.webp";

export type HeroShowcaseSlide = {
  id: string;
  label: string;
  title: string;
  image: string;
  objectPosition?: string;
  sticker: string;
};

/** Official Ipekçi photography — assortiment & slachterij */
export const HERO_SHOWCASE_SLIDES: readonly HeroShowcaseSlide[] = [
  {
    id: "lam",
    label: "Lamsvlees",
    title: "Nederlandse lammeren van topkwaliteit",
    image: heroLam,
    objectPosition: "50% 32%",
    sticker: `${CDN}/sticker_lamsvlees.svg`,
  },
  {
    id: "rund",
    label: "Rundvlees",
    title: "Premium halal rundvlees",
    image: heroRund,
    objectPosition: "52% 28%",
    sticker: `${CDN}/sticker_rundvlees.svg`,
  },
  {
    id: "kip",
    label: "Gevogelte",
    title: "Verse kip & kalkoen",
    image: heroKip,
    objectPosition: "50% 24%",
    sticker: `${CDN}/sticker_gevogelte.svg`,
  },
  {
    id: "slachterij",
    label: "Eigen slachterij",
    title: "Volledige regie over elke stap",
    image: heroSlachterij,
    objectPosition: "50% 40%",
    sticker: `${CDN}/sticker_lamsvlees.svg`,
  },
  {
    id: "producten",
    label: "Eindproducten",
    title: "Gemaakt van eigen halalvlees",
    image: heroProducten,
    objectPosition: "50% 45%",
    sticker: `${CDN}/sticker_rundvlees.svg`,
  },
] as const;

export const HERO_TRUST_ITEMS = [
  {
    title: "Halal gecertificeerd",
    subtitle: "100% volgens islamitische normen",
  },
  {
    title: "Nederlandse kwaliteit",
    subtitle: "Premium vlees van Nederlandse bodem",
  },
  {
    title: "Eigen slachterij",
    subtitle: "Volledige controle over kwaliteit",
  },
  {
    title: "Snelle levering",
    subtitle: "Eigen gekoeld transport",
  },
] as const;

export const HERO_SHOWCASE_AUTOPLAY_MS = 5200;
