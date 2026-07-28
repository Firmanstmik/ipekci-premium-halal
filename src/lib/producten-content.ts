/**
 * Producten — the complete Ayat Food catalogue.
 *
 * Content source of truth: https://ayatfood.nl/producten/ and its eight category
 * pages. Category slugs, titles, intro copy, every product name and every product
 * description below are taken verbatim from those pages. Packaging, state (vers /
 * bevroren) and variant notes are parsed from the officially published product
 * names — nothing is inferred beyond what the name itself states.
 *
 * The official category pages carry NO product photography (the variants are a
 * text accordion), so product cards here are deliberately spec-forward and the
 * photography lives in the category hero and gallery, using Ayat's own imagery.
 * Nothing is presented as a photo of a specific variant that we do not have.
 *
 * Cross-category duplicates are intentional and faithful: the four frozen grilled
 * döners are published under BOTH Diepvriesproducten and Gegrilde producten.
 */

import heroDoner from "@/assets/ayat/hero-doner.jpg";
import heroDonerBak from "@/assets/ayat/hero-doner-bak.jpg";
import heroShoarma from "@/assets/ayat/hero-shoarma.jpg";
import heroShoarmaBak from "@/assets/ayat/hero-shoarma-bak.jpg";
import heroGevogelte from "@/assets/ayat/hero-gevogelte.jpg";
import heroVleessoorten from "@/assets/ayat/hero-vleessoorten.jpg";
import heroVlees from "@/assets/ayat/hero-vlees.jpg";
import heroColdStorage from "@/assets/ayat/hero-coldstorage.jpg";
import heroProcessing from "@/assets/ayat/hero-processing.jpg";
import heroHome1 from "@/assets/ayat/hero-home1.jpg";
import heroHome2 from "@/assets/ayat/hero-home2.jpg";
import heroSlide1 from "@/assets/ayat/hero-slide-1-premium.jpg";
import heroSlide2 from "@/assets/ayat/hero-slide-2-premium.jpg";
import heroSlide3 from "@/assets/ayat/hero-slide-3-premium.jpg";
import heroBackdrop from "@/assets/ayat/hero-backdrop.jpeg";
import explorerStage from "@/assets/ayat/explorer-stage.webp";
import explorerDoner from "@/assets/ayat/explorer-doner.webp";
import explorerShoarma from "@/assets/ayat/explorer-shoarma.webp";
import explorerGevogelte from "@/assets/ayat/explorer-gevogelte.webp";
import explorerVleessoorten from "@/assets/ayat/explorer-vleessoorten.webp";
import explorerDiepvries from "@/assets/ayat/explorer-diepvries.webp";
import explorerTurksePizza from "@/assets/ayat/explorer-turkse-pizza.webp";
import explorerGegrild from "@/assets/ayat/explorer-gegrild.webp";
import explorerDurum from "@/assets/ayat/explorer-durum.webp";
import productDoner from "@/assets/ayat/product-doner.jpg";
import productShoarma from "@/assets/ayat/product-shoarma.jpg";
import productGevogelte from "@/assets/ayat/product-gevogelte.jpg";
import productVleessoorten from "@/assets/ayat/product-vleessoorten.jpg";
import productDiepvries from "@/assets/ayat/product-diepvries.jpg";
import productTurksePizza from "@/assets/ayat/product-turkse-pizza.jpg";
import productGegrild from "@/assets/ayat/product-gegrild.jpg";
import productDurum from "@/assets/ayat/product-durum.jpg";
import eindAdana from "@/assets/ayat/ayat-eind-adana.webp";
import eindHamburger from "@/assets/ayat/ayat-eind-hamburger.webp";
import eindKipburger from "@/assets/ayat/ayat-eind-kipburger.webp";
import eindMerquez from "@/assets/ayat/ayat-eind-merquez.webp";
import eindKipMerquez from "@/assets/ayat/ayat-eind-kip-merquez.webp";
import eindSucuk from "@/assets/ayat/ayat-eind-sucuk.webp";

/* ── Types ──────────────────────────────────────────────────── */

/** The eight official category slugs, exactly as ayatfood.nl publishes them. */
export type ProductCategorySlug =
  | "doner"
  | "shoarma"
  | "gevogelte"
  | "vleessoorten"
  | "diepvriesproducten"
  | "turkse-pizza"
  | "gegrilde-producten"
  | "tortilla-durum";

export type Product = {
  id: string;
  /** Product name exactly as published on ayatfood.nl */
  name: string;
  /** Official description, verbatim. Empty when the site publishes none. */
  paragraphs: readonly string[];
  /** Only when the official name states it (e.g. "(1kg)", "(30stuks)"). */
  packaging?: string;
  /** Only when the official name states it: "Vers" or "Bevroren". */
  state?: "Vers" | "Bevroren";
  /** Variant qualifier published in the name, e.g. "spiez", "popolocco". */
  variantNote?: string;
};

export type ProductGalleryItem = {
  src: string;
  alt: string;
  /** Editorial caption — describes the photograph, never a product claim. */
  caption: string;
};

export type ProductCategory = {
  slug: ProductCategorySlug;
  /** Card + page title, as published */
  label: string;
  /** Short breadcrumb label used on the official site (e.g. "Diepvries") */
  breadcrumbLabel: string;
  /** Short editorial kicker for the card and hero */
  eyebrow: string;
  /** One-line description as published on /producten/ */
  summary: string;
  /** Full intro copy, verbatim from the category page */
  intro: readonly string[];
  heroImage: string;
  cardImage: string;
  gallery: readonly ProductGalleryItem[];
  products: readonly Product[];
};

/* ── Catalogue ──────────────────────────────────────────────── */

export const PRODUCT_CATEGORIES: readonly ProductCategory[] = [
  {
    slug: "doner",
    label: "Döner",
    breadcrumbLabel: "Döner",
    eyebrow: "De beste van smaak",
    summary: "Wij produceren verschillende soorten en smaken döner kebab producten.",
    intro: [
      "De meest voorkomende kebabsoort staat bij ons bekend als ‘döner kebab’. Het woord ‘döner’ is in feite niet meer dan een verduidelijking van de bakwijze. Net als ‘çevirme’ betekent ‘döner’ namelijk ook ‘draaiend’, wat wijst op de gekende verticale spies.",
      "De oorspronkelijke döner bestaat uit een staaf die afwisselend belegd was met laagjes gekruid vlees en vet. Precies dit vet zorgt ervoor dat het vlees krokant geroosterd wordt. Na het roosteren worden met een scherp mes laagjes afgesneden van de lap samengesteld vlees.",
      "Buiten de kruiding en de geografische oorsprong, is er in wezen dan ook weinig verschil tussen ‘kebab’, ‘döner kebab’ en ‘shoarma’ zoals die bij ons beschikbaar zijn in de pita-, kebab- en snackbars.",
    ],
    heroImage: heroDoner,
    cardImage: productDoner,
    gallery: [
      {
        src: explorerDoner,
        alt: "Döner kebab aan de verticale spies",
        caption: "De verticale spies, laagje voor laagje geroosterd.",
      },
      {
        src: heroDonerBak,
        alt: "Gesneden döner in een bak",
        caption: "Vers gesneden, direct verpakt voor levering.",
      },
      {
        src: heroSlide1,
        alt: "Döner geserveerd in pitabrood",
        caption: "Van onze spies naar uw toonbank.",
      },
    ],
    products: [
      {
        id: "kombidoner",
        name: "Kombidöner",
        paragraphs: [
          "De door ons ontwikkelde Kombidöner bestaat uit geselecteerd kalfs- en kalkoenvlees, dat afwisselend in dun gesneden plakjes op elkaar wordt gelegd. Het kruidenmengsel is speciaal aangepast aan deze “combinatie” van kalfs- en kalkoenvlees, zodat het een onmiskenbaar goede smaak heeft.",
        ],
      },
      {
        id: "kipdoner",
        name: "Kipdöner",
        paragraphs: [
          "De kipdoner bestaat uit stukjes kip die van de dij worden gesneden. Ideaal gekruid krijgt de kipdöner zijn onmiskenbaar hartige smaak.",
        ],
      },
      {
        id: "gehaktdoner",
        name: "Gehaktdöner",
        paragraphs: [
          "Bij deze rotisserie worden vleespasteitjes, die bestaan uit kalfsgehakt en vleesplakken, afwisselend aan een spies gestoken. Dit is de meeste populaire döner in Nederland.",
        ],
      },
      {
        id: "kalfsdoner",
        name: "Kalfsdöner",
        paragraphs: [
          "De kalfsdoner bestaat uit puur kalfsvlees dat in dunne plakjes wordt gesneden. Na het kruidenproces met geselecteerde natuurlijke kruiden, worden de plakjes op maat gesneden en op de spies gelegd. Puur genieten!",
        ],
      },
    ],
  },

  {
    slug: "shoarma",
    label: "Shoarma",
    breadcrumbLabel: "Shoarma",
    eyebrow: "Rund, kip, lam of mix",
    summary:
      "De benaming ‘kebab’ betekent in het Turks zoveel als ‘gebakken vlees’. In de praktijk is het vaak een mix.",
    intro: [
      "De eerste verwarring die we uitklaren is die tussen kebab en shoarma. De benaming ‘kebab‘ betekent in het Turks zoveel als ‘gebakken vlees‘. Het vlees dat bij ‘kebab’ gebakken wordt kan zowel lamsvlees, kip, kalkoen als kalfsvlees zijn. In de praktijk is het vaak een mix.",
      "Het woord ‘shoarma‘ is dan weer een Arabisch afleiding van het Turkse woord ‘çevirme’, wat ‘draaien‘ betekent. Onder het Ottomaans imperium heeft de Turkse eetcultuur zich namelijk over het hele Midden-Oosten verspreid en aangepast aan de plaatselijke keuken. In Israël en Libanon kon de bereiding van het gemarineerd vlees op veel bijval rekenen, maar dan met lokale kruiding en onder de benaming ‘shoarma’.",
    ],
    heroImage: heroShoarma,
    cardImage: productShoarma,
    gallery: [
      {
        src: explorerShoarma,
        alt: "Shoarma aan de spies",
        caption: "Gemarineerd, gestapeld, draaiend gegaard.",
      },
      {
        src: heroShoarmaBak,
        alt: "Gesneden shoarma in een bak",
        caption: "Op maat gesneden voor de professionele keuken.",
      },
      {
        src: heroSlide2,
        alt: "Shoarma geserveerd met verse groenten",
        caption: "Klaar voor wrap, broodje of schotel.",
      },
    ],
    products: [
      {
        id: "kalkoen-shoarma",
        name: "Kalkoen Shoarma",
        paragraphs: [
          "Kalkoen shoarma: een heerlijke twist op traditionele shoarma, gemaakt met malse stukjes kalkoenvlees, perfect gekruid en snel gebakken. Geniet van deze smaakvolle en gezonde optie voor een snelle maaltijd!",
        ],
      },
      {
        id: "kip-shoarma",
        name: "Kip Shoarma",
        paragraphs: [
          "Kip shoarma: sappige stukjes gekruide kip, klaar om te grillen of te bakken. Snel, lekker en perfect voor een snelle maaltijd!",
        ],
      },
      {
        id: "mix-shoarma",
        name: "Mix Shoarma (Lams/Kalkoen)",
        variantNote: "Lams / Kalkoen",
        paragraphs: [
          "Mix Shoarma, een verrukkelijke combinatie van mals lamsvlees en sappige kalkoen, perfect gekruid met authentieke kruiden en specerijen. Geniet van de unieke smaak en textuur van deze mix in wraps, broodjes of als hoofdgerecht. Een smaakvolle keuze voor liefhebbers van shoarma!",
        ],
      },
      {
        id: "kalfs-shoarma",
        name: "Kalfs Shoarma",
        paragraphs: [
          "Kalfsshoarma: mals en smaakvol kalfsvlees, subtiel gekruid met specerijen zoals komijn, paprika en knoflook. Een heerlijke en verfijnde variant op traditionele shoarma, perfect voor een luxe en toch snel te bereiden maaltijd. Laat je verrassen door de delicate smaak van kalfsshoarma!",
        ],
      },
    ],
  },

  {
    slug: "gevogelte",
    label: "Gevogelte",
    breadcrumbLabel: "Gevogelte",
    eyebrow: "Heerlijk smaakvol",
    summary: "Dankzij onze eigen productie, bieden wij u de heerlijkste gevogelte.",
    intro: [
      "Gevogelte verwijst naar een brede categorie van vogels die worden gekweekt en geconsumeerd voor voedsel, zoals kippen, kalkoenen, eenden en ganzen. Deze vogels worden wereldwijd op grote schaal gehouden voor hun vlees en eieren.",
      "Kip is het meest populaire gevogelte en wordt in veel verschillende gerechten gebruikt. Het vlees van kippen is mager, sappig en veelzijdig, waardoor het een favoriete keuze is in diverse culinaire tradities.",
      "Gevogelte biedt verschillende voedingsvoordelen. Het is over het algemeen mager vlees met een hoog eiwitgehalte. Het bevat ook belangrijke voedingsstoffen zoals vitamine B12, ijzer en zink. Het is echter belangrijk om gevogelte op de juiste manier te bereiden en te hanteren om voedselveiligheid te waarborgen, zoals het grondig koken van vlees om bacteriën te doden.",
    ],
    heroImage: heroGevogelte,
    cardImage: productGevogelte,
    gallery: [
      {
        src: explorerGevogelte,
        alt: "Gevogelte assortiment",
        caption: "Kip en kalkoen: mager, mals en veelzijdig.",
      },
      {
        src: heroHome2,
        alt: "Gemarineerde kipreepjes",
        caption: "Gemarineerd volgens ons eigen kruidenmengsel.",
      },
      { src: eindKipburger, alt: "Kipburger", caption: "Eigen productie, consistente kwaliteit." },
    ],
    products: [
      {
        id: "kip-doner-spies",
        name: "Kip Döner(spiez)",
        variantNote: "Spies",
        paragraphs: [
          "Kip döner, ook bekend als kip aan het spit of kipspies, is een populaire en smaakvolle optie in de mediterrane keuken. Malse stukjes kip worden gemarineerd in kruiden zoals oregano, paprika, knoflook en komijn, en vervolgens aan een verticaal spit gegrild tot perfectie. Het resultaat is sappig en vol van smaak. Geniet van kip döner in een pita broodje, wrap of salade voor een heerlijke en snelle maaltijd!",
        ],
      },
      {
        id: "kipfile",
        name: "Kipfile",
        paragraphs: [
          "Kipfilet is mager, mals en veelzijdig. Het is een favoriet stukje vlees dat gemakkelijk te bereiden is. Of je het nu grilt, bakt, roerbakt of in de oven bereidt, kipfilet is altijd een gezonde keuze. Voeg je favoriete kruiden en specerijen toe voor een smakelijke maaltijd boordevol eiwitten. Perfect voor wraps, salades, pasta's of gewoon als hoofdgerecht met groenten.",
        ],
      },
      {
        id: "kipdij",
        name: "Kipdij",
        paragraphs: [
          "Kipdij is een heerlijk mals en smaakvol stukje vlees, afkomstig van de dijen van de kip. Het bevat iets meer vet dan kipfilet, wat zorgt voor extra sappigheid en smaak tijdens het koken. Kipdij is perfect voor het grillen, bakken of roerbakken, en het blijft lekker mals. Probeer kipdij in roerbakgerechten, curry's of op de barbecue voor een smakelijke maaltijd!",
        ],
      },
      {
        id: "kipfile-blokjes-gemarineerd",
        name: "Kipfilé blokjes gemarineerd",
        variantNote: "Gemarineerd",
        paragraphs: [
          "Gemarineerde kipfiletblokjes zijn een heerlijke en snelle optie voor een smaakvolle maaltijd. Deze malse stukjes kip zijn al gemarineerd in een smakelijke mix van kruiden en specerijen, waardoor ze klaar zijn om te bakken, grillen of roerbakken. Geniet van de sappige en goed gekruide kipblokjes in wraps, salades, pasta's of gewoon op zichzelf. Een eenvoudige en smaakvolle keuze voor elke gelegenheid!",
        ],
      },
      {
        id: "kip-vleugels-10kg",
        name: "Kip Vleugels (10kg)",
        packaging: "10 kg",
        paragraphs: [
          "Onze verpakking van 10 kg kippenvleugels biedt een royale hoeveelheid van dit populaire gevogelte. Deze vleugels zijn perfect voor grote bijeenkomsten, evenementen of voor wie graag een voorraadje in de vriezer heeft. Kippenvleugels zijn veelzijdig en kunnen op verschillende manieren worden bereid, zoals bakken, grillen of frituren. Geniet van heerlijke kippenvleugels als snack, bijgerecht of als hoofdgerecht. Met deze ruime verpakking ben je altijd goed voorzien!",
        ],
      },
      {
        id: "kipfile-blokjes-zonder-kruiden",
        name: "Kipfilé blokjes (zonder kruiden)",
        variantNote: "Zonder kruiden",
        paragraphs: [
          "Kipfiletblokjes zonder kruiden zijn een veelzijdig ingrediënt dat je zelf kunt kruiden en bereiden naar jouw smaak. Deze malse stukjes kip zijn perfect voor allerlei gerechten, zoals roerbakgerechten, pasta's, curry's, salades of wraps. Doordat ze ongekruid zijn, kun je zelf experimenteren met kruiden en specerijen om de smaak precies aan te passen aan je eigen voorkeur. Kipfiletblokjes zijn snel en gemakkelijk te bereiden, waardoor ze ideaal zijn voor een snelle en smakelijke maaltijd!",
        ],
      },
      {
        id: "kip-nuggets",
        name: "Kip Nuggets",
        paragraphs: [
          "Kipnuggets zijn kleine stukjes kipfilet, gepaneerd en voorgebakken voor een knapperige buitenkant en malse binnenkant. Deze populaire snack is geliefd bij zowel kinderen als volwassenen. Kipnuggets kunnen worden gebakken in de oven, gefrituurd of airfryer voor een heerlijke en krokante textuur. Serveer ze als snack, bijgerecht of als onderdeel van een maaltijd met frietjes en dipsaus.",
        ],
      },
      {
        id: "kalkoen-dijen-filet",
        name: "Kalkoen dijen filet",
        paragraphs: [
          "Kalkoendijfilet is een smaakvol en mager stukje vlees, afkomstig van de dijen van de kalkoen. Deze filets zijn sappig en veelzijdig, ideaal voor verschillende kookmethoden zoals bakken, grillen, roosteren of stoven.",
        ],
      },
      {
        id: "kalkoen-shaslick",
        name: "Kalkoen Shaslick",
        paragraphs: [
          "Kalkoen shaslicks zijn heerlijke spiesjes gemaakt van malse stukjes kalkoenvlees, afgewisseld met groenten zoals paprika, ui en champignons. Deze shaslicks zijn perfect gemarineerd voor een rijke smaak.",
        ],
      },
    ],
  },

  {
    slug: "vleessoorten",
    label: "Vleessoorten",
    breadcrumbLabel: "Vleessoorten",
    eyebrow: "Top vlees",
    summary: "Een breed assortiment aan vleessoorten daar staan wij om bekend.",
    intro: [
      "Er zijn talloze vleessoorten die wereldwijd worden geconsumeerd en een integraal onderdeel vormen van verschillende culinaire tradities en eetgewoonten. Vlees is een belangrijke bron van eiwitten, vitamines en mineralen en biedt een breed scala aan smaken, texturen en bereidingsmethoden.",
      "Van sappige steaks tot smaakvol gevogelte en smeltende lamsschotels, vlees biedt een overvloed aan mogelijkheden om heerlijke maaltijden te bereiden.",
      "Het is echter belangrijk om bij de consumptie van vlees rekening te houden met aspecten zoals dierenwelzijn, duurzaamheid en persoonlijke dieetvoorkeuren. Laten we duiken in de diverse wereld van vleessoorten en ontdekken welke culinaire avonturen er te beleven zijn.",
    ],
    heroImage: heroVleessoorten,
    cardImage: productVleessoorten,
    gallery: [
      {
        src: explorerVleessoorten,
        alt: "Assortiment vleessoorten",
        caption: "Geselecteerd op versheid, textuur en marmering.",
      },
      {
        src: heroVlees,
        alt: "Rundvlees op een snijplank",
        caption: "Zorgvuldig versneden in eigen productie.",
      },
      { src: eindHamburger, alt: "Hamburgers", caption: "Van gehakt tot köfte en burger." },
    ],
    products: [
      {
        id: "gehakt-runder",
        name: "Gehakt (runder)",
        paragraphs: [
          "Rundergehakt is gemalen rundvlees en een populaire keuze voor veel gerechten. Het wordt vaak gebruikt in klassieke gerechten zoals gehaktballen, hamburgers, bolognesesaus, chili con carne en meer. Rundergehakt is magerder dan gehakt van andere vleessoorten, wat het een gezonde optie maakt voor veel recepten.",
          "Het kan worden gekruid met verschillende kruiden en specerijen, zoals knoflook, ui, paprikapoeder, oregano en peper, om smaak toe te voegen aan je gerechten. Rundergehakt is veelzijdig en kan worden gebruikt voor zowel alledaagse maaltijden als speciale gelegenheden.",
        ],
      },
      {
        id: "kalf-spareribs",
        name: "Kalf Spareribs",
        paragraphs: [
          "Kalf spareribs zijn een heerlijke delicatesse, afkomstig van jonge kalfjes. Deze spareribs zijn kleiner en malser dan varkensspareribs, met een milde en delicate smaak. Kalf spareribs kunnen worden gemarineerd en langzaam gegaard of gegrild tot ze mals en sappig zijn. Ze zijn perfect voor liefhebbers van ribgerechten die op zoek zijn naar een zachtere en verfijndere smaak.",
        ],
      },
      {
        id: "hamburger",
        name: "Hamburger",
        paragraphs: [
          "Hamburgers zijn klassieke en geliefde gerechten bestaande uit een sappige vleesschijf, meestal van rundvlees, op een zacht broodje. Deze iconische maaltijd kan worden gepersonaliseerd met verschillende toppings zoals kaas, sla, tomaat, augurk, uien en sauzen. Met hun heerlijke smaak en veelzijdigheid zijn hamburgers een favoriete keuze voor zowel volwassenen als kinderen wereldwijd.",
        ],
      },
      {
        id: "adana-kofte",
        name: "Adana Kófte",
        paragraphs: [
          "Adana köfte is een populaire Turkse vleesschotel, gemaakt van gekruid gehakt van lamsvlees of rundvlees, vaak gemengd met ui, knoflook, rode peper en kruiden zoals komijn en paprikapoeder. Dit smakelijke gehaktmengsel wordt vervolgens gevormd tot langwerpige worstjes en gegrild op een spies of platte grill. Adana köfte staat bekend om zijn robuuste smaken en sappige textuur.",
        ],
      },
      {
        id: "kofte",
        name: "Köfte",
        paragraphs: [
          "Köfte is een traditioneel gerecht uit de Turkse keuken en bestaat uit gekruid gehakt, meestal van rundvlees of lamsvlees, dat tot balletjes of worstjes wordt gevormd en gegrild, gebakken of geroosterd. De gehaktballen worden op smaak gebracht met kruiden zoals komijn, paprikapoeder, knoflook, ui, peterselie en peper.",
          "Köfte kan op verschillende manieren worden geserveerd: als hoofdgerecht met rijst, groenten en salade, als onderdeel van een mezze-plank met andere kleine hapjes, of als streetfood op een broodje met groenten en saus.",
        ],
      },
    ],
  },

  {
    slug: "diepvriesproducten",
    label: "Diepvriesproducten",
    breadcrumbLabel: "Diepvries",
    eyebrow: "Vers ingevroren",
    summary:
      "Producten vers ingevroren zodat deze een latere periode alsnog vers gebruikt kunnen worden.",
    intro: [
      "De diepvriesmethode wordt gebruikt om vleesproducten te bewaren en hun versheid en kwaliteit te behouden. Door vlees snel in te vriezen, worden de groei van bacteriën vertraagd en enzymatische reacties geminimaliseerd, waardoor het vlees langer houdbaar blijft.",
      "Bovendien bieden diepvriesvleesproducten gemak en flexibiliteit. Ze zijn vaak voorgesneden, gemarineerd of voorgekookt, waardoor de bereidingstijd wordt verkort. Dit maakt ze ideaal voor drukke dagen of wanneer er snel een maaltijd op tafel moet staan.",
      "Een van de voordelen van diepvriesproducten van vlees is hun langere houdbaarheid. Dit stelt consumenten in staat om vlees in bulk te kopen en op te slaan voor langere periodes, waardoor verspilling wordt verminderd.",
    ],
    heroImage: heroColdStorage,
    cardImage: productDiepvries,
    gallery: [
      {
        src: explorerDiepvries,
        alt: "Diepvriesproducten",
        caption: "Snel ingevroren op het hoogtepunt van versheid.",
      },
      {
        src: heroProcessing,
        alt: "Verwerking en verpakking",
        caption: "Met zorg ingepakt voor de vriesketen.",
      },
      {
        src: heroHome1,
        alt: "Gekoelde opslag",
        caption: "Op temperatuur gehouden tot aan uw deur.",
      },
    ],
    products: [
      {
        id: "gegrilde-kipdoner-bevroren-1kg",
        name: "Gegrilde Kipdoner Bevroren (1kg)",
        packaging: "1 kg",
        state: "Bevroren",
        paragraphs: [
          "Onze bevroren gegrilde kipdöner van 1 kg is een handige en smaakvolle optie voor maaltijden thuis. Deze kipdöner is al voorgegaard en gegrild, waardoor het gemakkelijk is om snel een heerlijke maaltijd te bereiden. Je kunt de bevroren kipdöner eenvoudig opwarmen in de oven, in een pan of zelfs in de magnetron.",
          "Serveer de gegrilde kipdöner met pitabroodjes, salade, tomaten, ui en een saus naar keuze voor een smakelijke en authentieke döner-ervaring thuis.",
        ],
      },
      {
        id: "gegrilde-kipdoner-bevroren-25kg",
        name: "Gegrilde Kipdoner Bevroren (2,5kg)",
        packaging: "Zak van 2,5 kg",
        state: "Bevroren",
        paragraphs: [],
      },
      {
        id: "gegrilde-gehaktdoner-bevroren-1kg",
        name: "Gegrilde Gehaktdoner Bevroren (1kg)",
        packaging: "1 kg",
        state: "Bevroren",
        paragraphs: [
          "Onze bevroren gegrilde gehakt-döner van 1 kg is een handige keuze voor een smakelijke maaltijd thuis. Deze gehakt-döner is al voorgegaard en gegrild, waardoor het gemakkelijk is om snel een heerlijke maaltijd te bereiden.",
          "Je kunt de bevroren gehakt-döner eenvoudig opwarmen in de oven, in een pan of zelfs in de magnetron. Serveer de gegrilde gehakt-döner met pitabroodjes, salade, tomaten, ui en een saus naar keuze.",
        ],
      },
      {
        id: "gegrilde-gehaktdoner-bevroren-25kg",
        name: "Gegrilde Gehaktdoner Bevroren (2,5kg)",
        packaging: "Zak van 2,5 kg",
        state: "Bevroren",
        paragraphs: [],
      },
    ],
  },

  {
    slug: "turkse-pizza",
    label: "Turkse pizza",
    breadcrumbLabel: "Turkse pizza",
    eyebrow: "Alle ingrediënten",
    summary: "De lekkerste Turkse pizza's, wij leveren alle ingrediënten.",
    intro: [
      "Turkse pizza, ook wel bekend als “Lahmacun,” is een smaakvol gerecht dat zijn oorsprong vindt in de Turkse keuken. Het is een dunne, ronde deegbasis bedekt met een heerlijke mix van gekruid gehakt, groenten en kruiden.",
      "Dit geliefde gerecht wordt vaak gegeten als een snelle en smakelijke maaltijd, zowel als streetfood als in restaurants. Het is ook gebruikelijk om Turkse pizza te beleggen met verse groenten, zoals tomaten, komkommers en sla, en vervolgens op te rollen als een wrap.",
      "De basis van Turkse pizza is een flinterdun uitgerold deeg, dat vervolgens wordt besmeerd met een smaakvolle tomatensaus. Daarbovenop komt een vulling van gekruid en fijngehakt vlees, meestal lam of rund, dat wordt vermengd met verse kruiden zoals peterselie, munt en ui. Het resultaat is een geurige en hartige topping boordevol smaak.",
    ],
    heroImage: productTurksePizza,
    cardImage: productTurksePizza,
    gallery: [
      {
        src: explorerTurksePizza,
        alt: "Turkse pizza (lahmacun)",
        caption: "Flinterdun deeg, hartige topping.",
      },
      {
        src: heroSlide3,
        alt: "Turkse pizza met verse groenten",
        caption: "Opgerold als wrap of plat geserveerd.",
      },
      { src: eindAdana, alt: "Gekruid gehakt", caption: "Gekruid gehakt van lam of rund." },
    ],
    products: [
      {
        id: "turkse-pizza-30stuks",
        name: "Turkse pizza (30stuks)",
        packaging: "30 stuks",
        paragraphs: [],
      },
    ],
  },

  {
    slug: "gegrilde-producten",
    label: "Gegrilde producten",
    breadcrumbLabel: "Gegrild",
    eyebrow: "Direct leverbaar",
    summary: "Heerlijk gegrilde producten, direct leverbaar en vol van smaak.",
    intro: [
      "Gegrilde vlees- en kipproducten bieden een heerlijke en smaakvolle manier om van malse stukjes vlees en sappige kip te genieten. Door het grillen worden de natuurlijke smaken geïntensiveerd en ontstaat er een heerlijk rokerig aroma.",
      "Het grillen van vlees en kip voegt een unieke smaakdimensie toe aan het gerecht. Het brengt de natuurlijke smaken naar voren en zorgt voor een heerlijke textuur.",
      "Het grillen van vlees en kip is een populaire kookmethode die over de hele wereld wordt gebruikt. Het kan worden gedaan op een barbecue, grillpan, grillplaat of zelfs in de oven. Het resultaat is een sappig en mals stuk vlees of kip met een mooie bruine kleur en kenmerkende grillstrepen.",
    ],
    heroImage: productGegrild,
    cardImage: productGegrild,
    gallery: [
      {
        src: explorerGegrild,
        alt: "Gegrilde producten",
        caption: "Voorgegaard en gegrild, direct leverbaar.",
      },
      { src: eindMerquez, alt: "Merquez worstjes", caption: "Rokerig aroma, sappige textuur." },
      { src: eindSucuk, alt: "Sucuk", caption: "Klaar om op te warmen en te serveren." },
    ],
    products: [
      {
        id: "gegrilde-kipdoner-bevroren-1kg",
        name: "Gegrilde Kipdoner Bevroren (1kg)",
        packaging: "1 kg",
        state: "Bevroren",
        paragraphs: [
          "Onze bevroren gegrilde kipdöner van 1 kg is een handige en smaakvolle optie voor maaltijden thuis. Deze kipdöner is al voorgegaard en gegrild, waardoor het gemakkelijk is om snel een heerlijke maaltijd te bereiden. Je kunt de bevroren kipdöner eenvoudig opwarmen in de oven, in een pan of zelfs in de magnetron.",
          "Serveer de gegrilde kipdöner met pitabroodjes, salade, tomaten, ui en een saus naar keuze voor een smakelijke en authentieke döner-ervaring thuis.",
        ],
      },
      {
        id: "gegrilde-kipdoner-bevroren-25kg",
        name: "Gegrilde Kipdoner Bevroren (2,5kg)",
        packaging: "Zak van 2,5 kg",
        state: "Bevroren",
        paragraphs: [],
      },
      {
        id: "gegrilde-gehaktdoner-bevroren-1kg",
        name: "Gegrilde Gehaktdoner Bevroren (1kg)",
        packaging: "1 kg",
        state: "Bevroren",
        paragraphs: [
          "Onze bevroren gegrilde gehakt-döner van 1 kg is een handige keuze voor een smakelijke maaltijd thuis. Deze gehakt-döner is al voorgegaard en gegrild, waardoor het gemakkelijk is om snel een heerlijke maaltijd te bereiden.",
          "Je kunt de bevroren gehakt-döner eenvoudig opwarmen in de oven, in een pan of zelfs in de magnetron. Serveer de gegrilde gehakt-döner met pitabroodjes, salade, tomaten, ui en een saus naar keuze.",
        ],
      },
      {
        id: "gegrilde-gehaktdoner-bevroren-25kg",
        name: "Gegrilde Gehaktdoner Bevroren (2,5kg)",
        packaging: "Zak van 2,5 kg",
        state: "Bevroren",
        paragraphs: [],
      },
      {
        id: "gegrilde-kipdoner-vers-1kg",
        name: "Gegrilde Kipdoner Vers (1Kg)",
        packaging: "1 kg",
        state: "Vers",
        paragraphs: [
          "Onze verse gegrilde kipdöner van 1 kg is een heerlijke en gemakkelijke optie voor een snelle maaltijd. Deze kipdöner is al gegrild en klaar om te worden verwarmd en geserveerd.",
          "Je kunt de verse gegrilde kipdöner eenvoudig opwarmen in de oven, in een pan of zelfs op de barbecue. Serveer de sappige kipdöner met pitabroodjes, verse groenten, knoflooksaus of een andere favoriete saus voor een smakelijke maaltijd.",
        ],
      },
      {
        id: "gegrilde-gehaktdoner-vers-1kg",
        name: "Gegrilde Gehaktdoner Vers (1Kg)",
        packaging: "1 kg",
        state: "Vers",
        paragraphs: [
          "Onze verse gegrilde gehakt-döner van 1 kg is een heerlijke en veelzijdige keuze voor een snelle en smakelijke maaltijd. Deze gehakt-döner is al gegrild en klaar om te worden verwarmd en geserveerd.",
          "Je kunt de verse gegrilde gehakt-döner eenvoudig opwarmen in de oven, in een pan of zelfs op de barbecue. Serveer de sappige gehakt-döner met pitabroodjes, salade, tomaten, ui en een saus naar keuze voor een authentieke döner-ervaring.",
        ],
      },
    ],
  },

  {
    slug: "tortilla-durum",
    label: "Tortilla Durum",
    breadcrumbLabel: "Tortilla",
    eyebrow: "Dürüm döner",
    summary:
      "Een lekkere dürüm-döner, wie kent het tegenwoordig niet? Dürüm betekent letterlijk 'opgerold' in het Turks.",
    intro: [
      "Tortilla Durum is een heerlijk en veelzijdig gerecht dat zijn oorsprong vindt in de Mexicaanse keuken. Het is een wrap gemaakt van dun en flexibel platbrood, meestal gemaakt van tarwebloem of maïsmeel. Tortilla Durum wordt vaak gebruikt als basis voor verschillende vullingen, waaronder vlees, groenten, bonen, kaas en sauzen.",
      "De Tortilla Durum wordt traditioneel bereid door het deeg te kneden en dun uit te rollen tot een cirkelvormige vorm. Vervolgens wordt het gebakken op een hete kookplaat, genaamd een comal, of gegrild tot het licht geblakerd is en een zachte, maar stevige textuur heeft.",
      "Tortilla Durum is geliefd over de hele wereld vanwege zijn heerlijke smaak en veelzijdigheid. Het biedt een geweldige manier om verschillende smaken en texturen samen te brengen in één hap.",
    ],
    heroImage: productDurum,
    cardImage: productDurum,
    gallery: [
      {
        src: explorerDurum,
        alt: "Tortilla dürüm",
        caption: "Dun, flexibel platbrood. Letterlijk ‘opgerold’.",
      },
      {
        src: heroDonerBak,
        alt: "Vulling voor de dürüm",
        caption: "Elke vulling uit ons assortiment past erin.",
      },
      {
        src: eindKipMerquez,
        alt: "Kip merquez",
        caption: "Van klassieke döner tot pittige merquez.",
      },
    ],
    products: [
      {
        id: "tortilla-durum-popolocco",
        name: "Tortilla Durum (popolocco)",
        variantNote: "Popolocco",
        paragraphs: [],
      },
    ],
  },
] as const;

/* ── Derived helpers ────────────────────────────────────────── */

export const PRODUCT_CATEGORY_SLUGS = PRODUCT_CATEGORIES.map((c) => c.slug);

export function getProductCategory(slug: string): ProductCategory | undefined {
  return PRODUCT_CATEGORIES.find((c) => c.slug === slug);
}

export function isProductCategorySlug(slug: string): slug is ProductCategorySlug {
  return PRODUCT_CATEGORIES.some((c) => c.slug === slug);
}

/** Total number of published products across the catalogue. */
export const TOTAL_PRODUCT_COUNT = PRODUCT_CATEGORIES.reduce((n, c) => n + c.products.length, 0);

/* ── Page chrome (verified copy reused across the catalogue) ── */

export const PRODUCTEN_INDEX = {
  eyebrow: "Onze producten",
  breadcrumb: "Producten",
  title: "Het volledige assortiment",
  lede: "Ons assortiment omvat een breed scala aan vleesproducten. We selecteren zorgvuldig elk stuk vlees op basis van versheid, textuur, marmering en smaak, om ervoor te zorgen dat onze klanten een ongeëvenaarde culinaire ervaring beleven.",
  heroImage: explorerStage,
  /** Second lede, published under "Aanbevolen voor jou" */
  quality:
    "Om de hoogste kwaliteit te garanderen, werken we volgens strenge kwaliteitscontroleprocedures gedurende het hele leveringsproces. Ons vlees wordt zorgvuldig verwerkt, verpakt en op de juiste temperatuur gehouden om de versheid te behouden en de smaak te optimaliseren.",
  backdrop: heroBackdrop,
} as const;

/** The four official quality assurances published across the product pages. */
export const PRODUCT_ASSURANCES = [
  {
    id: "beste-vlees",
    title: "Beste vlees",
    text: "Wij leveren altijd het beste van het beste vlees.",
  },
  {
    id: "kwaliteitscontrole",
    title: "Kwaliteits controle",
    text: "Onze controle op onze producten is zeer hoog!",
  },
  {
    id: "verzendservice",
    title: "Verzendservice",
    text: "Bestelling worden met zorg ingepakt en bezorgd.",
  },
  {
    id: "halal",
    title: "100% halal",
    text: "Al onze producten zijn onder strikte toezicht van de European Certification Centre for Halal (ECC Halal).",
  },
] as const;

/** Certification block — NVWA + ECC Halal, as published on /over-ons. */
export const PRODUCT_CERTIFICATION = {
  eyebrow: "Halal en kwaliteit",
  title: "Onder toezicht, van productie tot levering",
  paragraphs: [
    "Wij werken volledig volgens de normen en standaarden van de Nederlandse Voedsel- en Warenautoriteit (NVWA). Daarnaast zijn al onze producten onder een strikte toezicht van de European Certification Centre for Halal (ECC Halal).",
    "Ons vlees wordt zorgvuldig verwerkt, verpakt en op de juiste temperatuur gehouden om de versheid te behouden en de smaak te optimaliseren.",
  ],
  badges: ["NVWA-normen", "ECC Halal", "Strikte controle", "100% Halal"],
} as const;

/** Who we deliver to — the four customer groups published across the site. */
export const PRODUCT_AUDIENCES = [
  { id: "restaurants", label: "Restaurants" },
  { id: "supermarkten", label: "Supermarkten" },
  { id: "slagerijen", label: "Slagerijen" },
  { id: "groothandels", label: "Groothandels" },
] as const;

/** The official four-step ordering process (also on /over-ons). */
export const PRODUCT_ORDER_STEPS = [
  {
    n: "01",
    title: "Zoek jouw vlees",
    text: "Bekijk ons assortiment en kies de producten die bij uw zaak passen.",
  },
  {
    n: "02",
    title: "Bestel je vlees",
    text: "Plaats je bestelling per mail of telefoon.",
  },
  {
    n: "03",
    title: "Wij bezorgen",
    text: "Na ontvangst en verpakken van je bestelling bezorgen wij deze.",
  },
  {
    n: "04",
    title: "Geniet van je vlees",
    text: "Controleer je bestelling bij ontvangst en geniet van onze mooie producten.",
  },
] as const;

/** Closing contact CTA — verbatim from the category pages. */
export const PRODUCT_HELP_CTA = {
  eyebrow: "Vragen?",
  title: "Heeft u hulp nodig?",
  text: "Wij produceren verschillende soorten en smaken vlees producten en ondersteunen u daar graag bij!",
  cta: "Neem contact met ons op",
} as const;

/** Quote CTA shown beside the variant list. */
export const PRODUCT_QUOTE_CTA = {
  eyebrow: "Beste producten",
  title: "Offerte aanvragen",
  text: "Vraag vrijblijvend een offerte aan voor dit assortiment. Wij denken met u mee over hoeveelheden, smaken en verpakking.",
  cta: "Offerte aanvragen",
} as const;
