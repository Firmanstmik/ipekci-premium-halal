import segmentSlagerijen from "@/assets/ayat/ayat-segment-slagerijen.webp";
import segmentGroothandels from "@/assets/ayat/ayat-segment-groothandels.webp";
import segmentSupermarkten from "@/assets/ayat/ayat-segment-supermarkten.webp";
import segmentRestaurants from "@/assets/ayat/ayat-segment-restaurants.webp";

export type VoorWieSegmentId = "slagerijen" | "groothandels" | "supermarkten" | "restaurants";

export type VoorWieSegment = {
  id: VoorWieSegmentId;
  label: string;
  eyebrow: string;
  description: string;
  longDescription: string;
  image: string;
  previewImage: string;
  href: string;
  benefits: readonly string[];
};

/**
 * Industries We Serve — copy grounded in https://ayatfood.nl/
 * (afnemers, horeca/restaurants testimonials, snelle levering, klant centraal,
 * ECC Halal, NVWA, eigen productie van döner/shoarma/gevogelte e.d.)
 * Route IDs preserved for CMS /voor-wie/{slug} parity.
 */
export const VOOR_WIE_SEGMENTS: readonly VoorWieSegment[] = [
  {
    id: "slagerijen",
    label: "Slagerijen",
    eyebrow: "Partnerschap voor de toonbank",
    description:
      "Premium Halal producten voor een betrouwbare toonbank, met snelle levering en consistente kwaliteit.",
    longDescription:
      "Slagerijen werken met Ayat Food als betrouwbare Halal-partner: hoogwaardige vleesproducten, zorgvuldig verwerkt en verpakt, met snelle levering via ons moderne wagenpark. Wij helpen u bij het kiezen van de juiste producten, altijd onder toezicht van ECC Halal en volgens NVWA-normen.",
    image: segmentSlagerijen,
    previewImage: segmentSlagerijen,
    href: "/voor-wie/slagerijen",
    benefits: [
      "Snelle & betrouwbare levering",
      "Consistente Halal-kwaliteit",
      "ECC Halal & NVWA-normen",
      "Persoonlijke productadvies",
    ],
  },
  {
    id: "groothandels",
    label: "Groothandels",
    eyebrow: "Stabiele B2B-aanvoer",
    description:
      "Stabiele volumes en betrouwbare logistiek, rechtstreeks vanuit onze productie in Watergang.",
    longDescription:
      "Als vleesgroothandel begrijpen wij de eisen van groothandelspartners. Reken op stabiele aanvoer van hoogwaardige Halal producten, waaronder döner, shoarma, gevogelte en diepvries, met punctuele levering en vaste afspraken, zodat u uw klanten efficiënt kunt bedienen.",
    image: segmentGroothandels,
    previewImage: segmentGroothandels,
    href: "/voor-wie/groothandels",
    benefits: [
      "Stabiele volumeleveringen",
      "Direct uit eigen productie",
      "Modern koeltransport",
      "Vaste B2B-afspraken",
    ],
  },
  {
    id: "supermarkten",
    label: "Supermarkten",
    eyebrow: "Retail-klaar assortiment",
    description: "Vers en diepvries Halal producten, zorgvuldig verpakt en klaar voor de schappen.",
    longDescription:
      "Voor supermarkten leveren wij Halal vleesproducten die geschikt zijn voor vers én diepvries. Producten worden zorgvuldig verwerkt, verpakt en op temperatuur gehouden, zodat versheid en smaak behouden blijven tot in uw schappen. Betrouwbare levering, constante kwaliteit.",
    image: segmentSupermarkten,
    previewImage: segmentSupermarkten,
    href: "/voor-wie/supermarkten",
    benefits: [
      "Vers én diepvries",
      "Zorgvuldig verpakt",
      "Consistente kwaliteit",
      "Betrouwbare levertijden",
    ],
  },
  {
    id: "restaurants",
    label: "Restaurants",
    eyebrow: "Voor de professionele keuken",
    description:
      "Halal döner, shoarma en meer: vers, goed verpakt en afgestemd op de horecakeuken.",
    longDescription:
      "Restaurants en chefs in de horeca vertrouwen op Ayat Food voor Halal producten van consistente kwaliteit. Van döner en shoarma tot gevogelte: altijd vers, goed verpakt en op tijd geleverd. Wij helpen u bij productkeuze en het ontwikkelen van nieuwe smaken, zodat uw keuken kan blijven excelleren.",
    image: segmentRestaurants,
    previewImage: segmentRestaurants,
    href: "/voor-wie/restaurants",
    benefits: [
      "Döner, shoarma & gevogelte",
      "Punctuele leveringen",
      "Hulp bij productkeuze",
      "100% Halal (ECC Halal)",
    ],
  },
] as const;

export const VOOR_WIE_MEGA_MENU = {
  eyebrow: "Voor wie",
  title: "Onze partners",
  subtitle:
    "Betrouwbare Halal-levering voor professionele foodbedrijven, met focus op kwaliteit, snelheid en samenwerking.",
  ctaLabel: "Lees meer",
  overviewHref: "/voor-wie",
  featuredImage: segmentRestaurants,
  pageEyebrow: "Industries we serve",
  pageTitle: "Voor wie wij werken",
  pageDescription:
    "Ayat Food is een vertrouwde Halal vleesgroothandel voor restaurants, horeca en professionele foodbedrijven in Nederland, met snelle levering, ECC Halal-borging en persoonlijke begeleiding.",
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

export const VOOR_WIE_PAGE = {
  eyebrow: "Voor wie",
  title: "Halal partner voor professionals",
  intro:
    "Ayat Food levert premium Halal vleesproducten aan professionele foodbedrijven, van restaurants en horeca tot retailpartners, met focus op kwaliteit, betrouwbare levering en klantgerichtheid.",
} as const;

/** Homepage section intro — Industries We Serve */
export const VOOR_WIE_HOME = {
  kicker: "Partners",
  title: "Voor wie wij werken",
  headline: "Vertrouwde Halal-partner voor professionals",
  lede: "Ayat Food is de betrouwbare leverancier voor professionele foodbedrijven in Nederland. Wij ondersteunen restaurants, horeca en retailpartners met premium Halal producten, snelle levering en persoonlijke begeleiding.",
} as const;
