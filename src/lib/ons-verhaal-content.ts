import islamitischeNormenImage from "@/assets/Islamitische-normen-en-waarden.webp";
import { ASSORTIMENT_CATEGORIES } from "@/lib/assortiment-content";

const CDN = "https://www.ipekcislachterij.nl/wp-content/uploads";

export const ONS_VERHAAL_HERO_VIDEO = `${CDN}/2026/04/04_Ipekci_Brandmovie_1.mp4`;
export const ONS_VERHAAL_HERO_FALLBACK = `${CDN}/2025/12/over-ons-40-jaar-ervaring.webp`;
export const ONS_VERHAAL_HALAL_IMAGE = `${CDN}/2025/12/halal-certificaat.webp`;
export const ONS_VERHAAL_HISTORY_IMAGE = `${CDN}/2025/12/Onze-geschiedenis.webp`;
export const ONS_VERHAAL_CAREERS_IMAGE = `${CDN}/2025/12/werken-bij-ipekci.webp`;
export const ONS_VERHAAL_HALAL_NORMEN_IMAGE = islamitischeNormenImage;

export type OnsVerhaalHighlight = {
  id: string;
  title: string;
  description: string;
  image: string;
};

/** Official highlight stats from ipekcislachterij.nl/ons-verhaal */
export const ONS_VERHAAL_HIGHLIGHTS: readonly OnsVerhaalHighlight[] = [
  {
    id: "ervaring",
    title: ">40 jaar ervaring",
    description: "De halalvleessector zit ons in het bloed. Al jaren specialiseren wij ons in halalslacht.",
    image: `${CDN}/2025/12/over-ons-40-jaar-ervaring.webp`,
  },
  {
    id: "halal",
    title: "100% halal",
    description: "Ipekçi beschikt over een officiële NVWA-erkenning voor onbedwelmd slachten.",
    image: `${CDN}/2025/12/100-proces-halal.webp`,
  },
  {
    id: "slacht",
    title: "Wekelijks verse slacht",
    description: "Wekelijks slachten we grote hoeveelheden lammeren in ons eigen halalslachthuis.",
    image: `${CDN}/2025/12/2-5-duizend-dieren-pw.webp`,
  },
  {
    id: "kwaliteit",
    title: "Premium kwaliteit",
    description: "Wij slachten onze eigen lammeren van de hoogste Nederlandse kwaliteit.",
    image: `${CDN}/2025/12/premium-kwaliteit.webp`,
  },
  {
    id: "rundvlees",
    title: "Halalrundvlees",
    description: "Elke week zetten we, naast lamsvlees, ook een grote hoeveelheid halalrundvlees af.",
    image: `${CDN}/2025/12/50-duizen-kilo-rundvlees-per-week.webp`,
  },
  {
    id: "service",
    title: "Persoonlijke service",
    description: "Snel bestellen, direct contact met medewerkers en levering binnen 24 uur.",
    image: `${CDN}/2025/12/Persoonlijke-service.webp`,
  },
  {
    id: "transport",
    title: ">20 eigen wagens en chauffeurs",
    description: "Eigen koeltransport met vaste routes door heel Nederland.",
    image: `${CDN}/2025/12/20-plus-wagens-en-chauffeurs.webp`,
  },
  {
    id: "eindproducten",
    title: "Eindproducten van eigen vlees",
    description: "Onze eindproducten worden door ons zelf gemaakt, volledig van ons eigen halalvlees.",
    image: `${CDN}/2025/12/eindproducten-van-eigen-vlees.webp`,
  },
] as const;

export const ONS_VERHAAL_HALAL = {
  eyebrow: "Onbedwelmde slacht-erkenning",
  title: "100% halalvlees",
  paragraphs: [
    "Ipekçi Slachterij opereert als een door de Nederlandse Voedsel- en Warenautoriteit (NVWA) erkend slachthuis en waarborgt volledige naleving van alle geldende Nederlandse wet- en regelgeving, inclusief strikte hygiëne-, kwaliteits- en controlevoorschriften. Jaarlijks ondergaan wij audits op onze halal slachtwijze en operationele processen. Binnen onze organisatie worden alle slacht- en verwerkingshandelingen uitgevoerd in volledige overeenstemming met halalrichtlijnen, met focus op zorg, respect en vakmanschap.",
    "Wat Ipekçi onderscheidt binnen de Nederlandse markt, is dat ons bedrijf wordt geleid door praktiserende moslims. In een sector waar dit zeldzaam is, vormt dit de kern van onze werkwijze. Halal is voor ons geen formaliteit, maar een diepgewortelde verantwoordelijkheid.",
    "Door continue controle en jarenlange expertise garanderen wij een betrouwbare, transparante en hoogwaardige halalverwerking van uw vlees.",
  ],
  badges: ["NVWA erkend", "Halalrichtlijnen", "Hygiëne & controle", "Jaarlijkse audits"],
} as const;

export const ONS_VERHAAL_HISTORY = {
  eyebrow: "Onze geschiedenis",
  title: "Ontstaan van Ipekçi",
  paragraphs: [
    "De basis van Ipekçi ligt in de kennis en ervaring van een islamitische familie die al generaties lang actief is in de vleessector. Oprichter Mehmet groeide op in Turkije en leerde het slachtvak van jongs af aan binnen de familie, waar deze kennis van grootvader op vader en vervolgens op hem werd doorgegeven.",
    "Na zijn komst naar Nederland heeft hij jarenlang ervaring opgedaan binnen de vleessector, waar hij zich het Nederlandse slachtproces, de kwaliteitsnormen en de geldende regelgeving volledig eigen maakte. Met de combinatie van traditionele kennis en een moderne werkwijze legde hij een sterke basis voor de toekomst.",
    "Gedreven door vakmanschap en overtuiging besloot hij samen met zijn zoon Abdulrahim en neef Ridvan een eigen halalslachthuis op te richten. Wat begon als een familie-initiatief, is uitgegroeid tot een professioneel en betrouwbaar bedrijf dat bekendstaat om kwaliteit, zorgvuldigheid en toewijding binnen de halalvleesmarkt.",
  ],
  badges: ["Familiebedrijf", "Sinds 2012", "Harderwijk"],
} as const;

export const ONS_VERHAAL_WORKFLOW = {
  eyebrow: "Werkwijze",
  title: "Halalslacht volgens islamitische normen en waarden",
  steps: [
    {
      n: "Stap 1",
      title: "Het halalslachtproces",
      text: "Alle dieren worden gecontroleerd op gezondheid, welzijn en geschiktheid voor halalslacht. De slacht wordt uitgevoerd door gecertificeerde medewerkers. Daarna worden de dieren onthuid, uitgespoeld, gekeurd door de NVWA en gewogen.",
    },
    {
      n: "Stap 2",
      title: "Voorbereiding op de bestelling",
      text: "Na de slacht worden de karkassen gekoeld en door ons team versneden voor levering. Of het nu gaat om volledige lammeren, specifieke delen of eindproducten: alles wordt op maat voorbereid.",
    },
    {
      n: "Stap 3",
      title: "Eigen transport",
      text: "Dankzij onze eigen chauffeurs en vaste routes garanderen wij gekoelde en nauwkeurige levering. Vier dagen per week leveren we door heel Nederland, altijd volgens afspraak en afgestemd op de wensen van onze klanten.",
    },
  ],
} as const;

/** Lamsvlees, rundvlees, kip — as shown on original ons-verhaal page */
export const ONS_VERHAAL_ASSORTIMENT = ASSORTIMENT_CATEGORIES.filter(
  (c) => c.id !== "eindproducten",
);

export const ONS_VERHAAL_FEATURED_PRODUCTS = [
  "Runder Merquez",
  "Rib eye",
  "Kip Shoarma",
  "Kalkoen shoarma",
  "Lamsshoarma",
  "Yaprak döner",
  "Kalfs döner",
  "Pastirma",
  "Sucuk",
  "Kip Burger",
  "Hamburger",
  "Kip Merquez",
  "Adana Kebab",
  "Kip döner",
] as const;

export const ONS_VERHAAL_CAREERS = {
  eyebrow: "Werken bij Ipekçi?",
  title: "Sluit je aan bij ons familiebedrijf",
  text: "Werken bij Ipekçi betekent deel uitmaken van een hecht familiebedrijf waar collega's vaak jarenlang blijven. Veel medewerkers werken hier sinds de oprichting, omdat we waarde hechten aan een warme, persoonlijke en betrokken sfeer. Iedereen draagt bij aan hetzelfde doel: kwalitatief hoogwaardig halalvlees leveren aan onze klanten. Er zijn volop doorgroeimogelijkheden en het tonen van initiatief wordt altijd gewaardeerd. Zo bouwen we samen aan een team waar iedereen zich thuis voelt.",
  cta: "Neem contact met ons op",
} as const;

export const CONTACT_PARTNER = {
  eyebrow: "Samen groeien in vertrouwen",
  title: "Uw partner in premium halalvlees",
  text: "Ipekçi gelooft in langdurige samenwerkingen. Veel van onze klanten en medewerkers zijn al jaren aan ons verbonden, omdat we kiezen voor persoonlijke aandacht en korte lijnen. Met duidelijke afspraken, betrouwbare leveringen en betrokken service bouwen we samen aan een relatie waarin u altijd op ons kunt rekenen.",
  cta: "Word ook klant",
} as const;

export const CONTACT_HERO_IMAGE = `${CDN}/2026/03/Contact-Ipekci.webp`;
