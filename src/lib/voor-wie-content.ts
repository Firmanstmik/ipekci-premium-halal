const CDN = "https://www.ipekcislachterij.nl/wp-content/uploads";

const STICKER_LAMS = `${CDN}/2025/11/sticker_lamsvlees.svg`;
const STICKER_RUND = `${CDN}/2025/11/sticker_rundvlees.svg`;
const STICKER_KIP = `${CDN}/2025/11/sticker_gevogelte.svg`;

export type VoorWieSegmentId = "slagerijen" | "groothandels" | "supermarkten" | "restaurants";

export type VoorWieSegment = {
  id: VoorWieSegmentId;
  label: string;
  eyebrow: string;
  description: string;
  longDescription: string;
  image: string;
  previewImage: string;
  stickerSrc: string;
  href: string;
  benefits: readonly string[];
};

/** Official copy from ipekcislachterij.nl */
export const VOOR_WIE_SEGMENTS: readonly VoorWieSegment[] = [
  {
    id: "slagerijen",
    label: "Slagerijen",
    eyebrow: "Voor wie slagerijen",
    description:
      "Dagelijks vers halalvlees van hoge Nederlandse kwaliteit, snel geleverd.",
    longDescription:
      "Onze slagerijen ontvangen dagelijks vers halalvlees van de hoogste Nederlandse kwaliteit. Van complete lammeren tot versgesneden delen, altijd snel geleverd en volledig volgens islamitische normen en waarden.",
    image: `${CDN}/2025/11/Voor-wie-slagerijen.webp`,
    previewImage: `${CDN}/2025/11/Voor-wie-slagerijen.webp`,
    stickerSrc: STICKER_LAMS,
    href: "/voor-wie/slagerijen",
    benefits: [
      "Dagelijks vers geleverd",
      "Complete lammeren en delen",
      "Halal volgens islamitische normen",
      "Eigen slachthuis in Harderwijk",
    ],
  },
  {
    id: "groothandels",
    label: "Groothandels",
    eyebrow: "Voor wie groothandels",
    description:
      "Stabiele aanvoer in grotere volumes, direct uit ons eigen slachthuis.",
    longDescription:
      "Groothandels kunnen rekenen op een stabiele aanvoer van Nederlands halalvlees, direct uit ons eigen slachthuis. Ontvang grote aantallen op vaste momenten, zodat uw klantenbestand altijd efficiënt bediend wordt.",
    image: `${CDN}/2025/11/Voor-wie-groothandels.webp`,
    previewImage: `${CDN}/2025/11/Voor-wie-groothandels.webp`,
    stickerSrc: STICKER_RUND,
    href: "/voor-wie/groothandels",
    benefits: [
      "Stabiele wekelijkse aanvoer",
      "Grote volumes op vaste momenten",
      "Direct uit eigen slachthuis",
      "Efficiënte B2B logistiek",
    ],
  },
  {
    id: "supermarkten",
    label: "Supermarkten",
    eyebrow: "Ipekci voor supermarkten",
    description:
      "Halalvlees en eindproducten voor vers en diepvries, direct verkoopklaar.",
    longDescription:
      "Aan supermarkten leveren we halalvlees én eindproducten die geschikt zijn voor zowel de versafdeling als de diepvries. Een breed assortiment dat direct verkoopklaar is en aansluit op de vraag van uw klanten.",
    image: `${CDN}/2025/11/Ipekci-voor-supermarkten.webp`,
    previewImage: `${CDN}/2025/11/Ipekci-voor-supermarkten.webp`,
    stickerSrc: STICKER_RUND,
    href: "/voor-wie/supermarkten",
    benefits: [
      "Versafdeling en diepvries",
      "Breed assortiment eindproducten",
      "Direct verkoopklaar",
      "Consistente premium kwaliteit",
    ],
  },
  {
    id: "restaurants",
    label: "Restaurants",
    eyebrow: "Voor restaurants",
    description:
      "Geselecteerde delen en grillproducten, afgestemd op menukaart en keuken.",
    longDescription:
      "Voor restaurants leveren we geselecteerde delen zoals koteletten, gehakt en grillproducten, precies afgestemd op uw menukaart. Altijd halal, vers en klaar voor directe bereiding in de keuken.",
    image: `${CDN}/2025/11/Voor-restaurants.webp`,
    previewImage: `${CDN}/2025/11/Voor-restaurants.webp`,
    stickerSrc: STICKER_KIP,
    href: "/voor-wie/restaurants",
    benefits: [
      "Delen op maat van uw menu",
      "Grillproducten en gehakt",
      "Vers en direct bereidbaar",
      "Halal gecertificeerd",
    ],
  },
] as const;

export const VOOR_WIE_MEGA_MENU = {
  eyebrow: "Voor wie",
  title: "Onze klanten",
  subtitle:
    "Levering op afspraak, vaste lijnen en constante kwaliteit voor uw bedrijf.",
  ctaLabel: "Lees meer",
  overviewHref: "/voor-wie",
  featuredImage: `${CDN}/2025/12/Ook-klant-worden.webp`,
  pageEyebrow: "Halalvlees voor verkoop en bereiding",
  pageTitle: "Onze klanten",
  pageDescription:
    "Ipekçi levert premium halalvlees en eindproducten aan slagerijen, groothandels, supermarkten en restaurants in heel Nederland. Met eigen slachthuis, koeltransport en persoonlijke service.",
} as const;

export const VOOR_WIE_SEGMENT_IDS = [
  "slagerijen",
  "groothandels",
  "supermarkten",
  "restaurants",
] as const satisfies readonly VoorWieSegmentId[];

export function isVoorWieSegmentId(value: string): value is VoorWieSegmentId {
  return (VOOR_WIE_SEGMENT_IDS as readonly string[]).includes(value);
}

export function getSegmentHref(id: VoorWieSegmentId | "all") {
  return id === "all" ? "/voor-wie" : `/voor-wie/${id}`;
}
