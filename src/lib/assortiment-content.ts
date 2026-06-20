import assortmentLamsvleesImage from "@/assets/Ons assortiment - dombaa.avif";
import assortmentRundvleesImage from "@/assets/Ons assortiment - sapi.avif";
import assortmentKipImage from "@/assets/Ons assortiment - ayam.avif";
import productenImage from "@/assets/producten.avif";
import assortimentLamsvleesHeroImage from "@/assets/assortiment-lamsvlees.webp";
import assortimentRundvleesHeroImage from "@/assets/Assortiment-rundvlees.webp";
import assortimentKipHeroImage from "@/assets/assortiment-Kip.webp";

const STICKER_LAMS =
  "https://www.ipekcislachterij.nl/wp-content/uploads/2025/11/sticker_lamsvlees.svg";
const STICKER_RUND =
  "https://www.ipekcislachterij.nl/wp-content/uploads/2025/11/sticker_rundvlees.svg";
const STICKER_KIP =
  "https://www.ipekcislachterij.nl/wp-content/uploads/2025/11/sticker_gevogelte.svg";

const CDN = "https://www.ipekcislachterij.nl/wp-content/uploads";

export type AssortimentCategory = {
  id: "lamsvlees" | "rundvlees" | "kip" | "eindproducten";
  label: string;
  eyebrow: string;
  description: string;
  image: string;
  heroImage: string;
  /** Mega-menu hover preview — official ipekcislachterij.nl imagery */
  previewImage: string;
  stickerSrc: string;
  href: string;
  highlights: readonly string[];
};

/** Official copy & imagery aligned with ipekcislachterij.nl assortiment mega menu */
export const ASSORTIMENT_CATEGORIES: readonly AssortimentCategory[] = [
  {
    id: "lamsvlees",
    label: "Lamsvlees",
    eyebrow: "Lamsvlees overzicht",
    description:
      "Premium Nederlandse lammeren, onbedwelmd halalgeslacht in ons eigen slachthuis. Leverbaar als complete karkassen of versgesneden delen voor iedere klantvraag.",
    image: assortmentLamsvleesImage,
    heroImage: assortimentLamsvleesHeroImage,
    previewImage: `${CDN}/2026/03/Lamsvlees-overzicht.webp`,
    stickerSrc: STICKER_LAMS,
    href: "/assortiment/lamsvlees",
    highlights: [
      "Schouder met bot",
      "Lamsrack",
      "Lamscotelet",
      "Lamsentrecote",
      "Lamsshoarma",
    ],
  },
  {
    id: "rundvlees",
    label: "Rundvlees",
    eyebrow: "Ipekci rundvlees",
    description:
      "Ons rundvlees komt van Nederlandse runderen en vaste partners. Altijd halalgeslacht en leverbaar als ribeye, entrecote, gehakt en andere veelgevraagde delen.",
    image: assortmentRundvleesImage,
    heroImage: assortimentRundvleesHeroImage,
    previewImage: `${CDN}/2026/01/Ipekci-rundvlees.webp`,
    stickerSrc: STICKER_RUND,
    href: "/assortiment/rundvlees",
    highlights: [
      "Rib eye",
      "Entrecote",
      "Brisket",
      "Ossenhaas",
      "Hamburger",
    ],
  },
  {
    id: "kip",
    label: "Kip",
    eyebrow: "Menu kip",
    description:
      "Op aanvraag van bestaande klanten leveren wij ook halalgeslachte kip. Premium kwaliteit uit Nederland en beschikbaar in alle standaarddelen.",
    image: assortmentKipImage,
    heroImage: assortimentKipHeroImage,
    previewImage: `${CDN}/2025/12/Menu-kip.webp`,
    stickerSrc: STICKER_KIP,
    href: "/assortiment/kip",
    highlights: [
      "Kip Shoarma",
      "Kip Burger",
      "Kip Merquez",
      "Kip döner",
      "Kalkoen shoarma",
    ],
  },
  {
    id: "eindproducten",
    label: "Eindproducten",
    eyebrow: "Altijd dezelfde smaak en kwaliteit",
    description:
      "Onze eindproducten worden gemaakt van ons eigen halalvlees. Kebabstaafjes, hamburgers, kipburgers en meer voor supermarkten, slagerijen en restaurants.",
    image: productenImage,
    heroImage: productenImage,
    previewImage: `${CDN}/2025/11/Altijd-dezelfde-smaak-en-kwaliteit.webp`,
    stickerSrc: STICKER_RUND,
    href: "/assortiment/eindproducten",
    highlights: [
      "Runder Merquez",
      "Lamsshoarma",
      "Adana Kebab",
      "Sucuk",
      "Yaprak döner",
    ],
  },
] as const;

export const ASSORTIMENT_MEGA_MENU = {
  eyebrow: "Ons assortiment",
  title: "Slacht van Ipekçi",
  subtitle:
    "Premium Nederlands halalvlees en eindproducten, van eigen slachthuis naar uw bedrijf.",
  ctaLabel: "Bekijk assortiment",
  allProductsLabel: "Alle producten",
  allProductsHref: "/assortiment",
  allProductsPreviewImage: `${CDN}/2025/12/Ook-klant-worden.webp`,
} as const;
