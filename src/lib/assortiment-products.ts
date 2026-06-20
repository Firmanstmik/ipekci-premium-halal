export type AssortimentCategoryId = "lamsvlees" | "rundvlees" | "kip" | "eindproducten";

export type AssortimentProduct = {
  id: string;
  title: string;
  category: AssortimentCategoryId;
  image: string;
};

const CDN = "https://www.ipekcislachterij.nl/wp-content/uploads";
const PLACEHOLDER = `${CDN}/2025/12/placeholder.webp`;

/** Official product images scraped from ipekcislachterij.nl/assortiment */
const PRODUCT_IMAGES: Record<string, string> = {
  "Schouder met bot": `${CDN}/2025/12/Lamsschouder-met-bot.png`,
  "Lamsbout met bot": `${CDN}/2025/12/Lamsbout-met-bot.png`,
  Lamsrack: `${CDN}/2025/12/Lamsrack.png`,
  Lamsschenkel: `${CDN}/2025/12/Lamsschenkel.png`,
  Lamsnek: `${CDN}/2025/12/Lamsnek.png`,
  Lamshaas: `${CDN}/2025/12/Lamshaas.png`,
  Lamsentrecote: `${CDN}/2025/12/Lamsentricote.png`,
  "Lamsbout zonder bot": `${CDN}/2025/12/Lamsbout-zonder-bot.png`,
  "Schouder zonder bot": `${CDN}/2025/12/Lamsschouder-zonder-bot.png`,
  Lamsrib: `${CDN}/2025/12/Lamsrib.png`,
  Lamscotelet: `${CDN}/2025/12/Lamscotelet-lamsvlees.png`,
  Lamsshoarma: `${CDN}/2025/12/Lamsshoarma.png`,
  "Hele karkas": PLACEHOLDER,
  "Rib eye": `${CDN}/2025/12/Rib-eye.png`,
  Ribeye: `${CDN}/2025/12/Rib-eye.png`,
  Entrecote: PLACEHOLDER,
  "Ossenhaas (Tenderloin)": PLACEHOLDER,
  Brisket: PLACEHOLDER,
  Bloemstuk: PLACEHOLDER,
  "Bavette (flap steak)": PLACEHOLDER,
  "Picanha (staartstuk)": PLACEHOLDER,
  "Diamond steak": PLACEHOLDER,
  Kogelbiefstuk: PLACEHOLDER,
  "Deksel bovenbil": PLACEHOLDER,
  Bovenbil: PLACEHOLDER,
  Plattebil: PLACEHOLDER,
  Achtermuis: PLACEHOLDER,
  Riblappen: PLACEHOLDER,
  Sukadelappen: PLACEHOLDER,
  Runderlappen: PLACEHOLDER,
  Runderstaart: PLACEHOLDER,
  Rundersnippers: PLACEHOLDER,
  "Short ribs": `${CDN}/2025/12/shortribs.png`,
  Shortribs: `${CDN}/2025/12/shortribs.png`,
  "Kip Shoarma": PLACEHOLDER,
  "Kalkoen shoarma": `${CDN}/2025/12/Kalkoensshoarma.png`,
  "Kip Burger": `${CDN}/2025/12/Kip-burger.png`,
  "Kip Merquez": `${CDN}/2025/12/Kip-Merquez-1.png`,
  "Kip döner": PLACEHOLDER,
  "Runder Merquez": `${CDN}/2025/12/Runder-Merquez.png`,
  "Yaprak döner": PLACEHOLDER,
  "Kalfs döner": PLACEHOLDER,
  Pastirma: PLACEHOLDER,
  Sucuk: `${CDN}/2025/12/Turkse-Worst-Sucuk.png`,
  Hamburger: `${CDN}/2025/12/Hamburger.png`,
  "Adana Kebab": `${CDN}/2025/11/Adana-Kebab.png`,
};

function slugify(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function product(
  title: string,
  category: AssortimentCategoryId,
  image?: string,
): AssortimentProduct {
  return {
    id: slugify(title),
    title,
    category,
    image: image ?? PRODUCT_IMAGES[title] ?? PLACEHOLDER,
  };
}

/** Full catalog aligned with ipekcislachterij.nl/assortiment */
export const ASSORTIMENT_PRODUCTS: readonly AssortimentProduct[] = [
  product("Schouder met bot", "lamsvlees"),
  product("Lamsbout met bot", "lamsvlees"),
  product("Lamsrack", "lamsvlees"),
  product("Lamsschenkel", "lamsvlees"),
  product("Lamsnek", "lamsvlees"),
  product("Lamshaas", "lamsvlees"),
  product("Lamsentrecote", "lamsvlees"),
  product("Lamsbout zonder bot", "lamsvlees"),
  product("Schouder zonder bot", "lamsvlees"),
  product("Lamsrib", "lamsvlees"),
  product("Lamscotelet", "lamsvlees"),

  product("Hele karkas", "rundvlees"),
  product("Rib eye", "rundvlees"),
  product("Entrecote", "rundvlees"),
  product("Ossenhaas (Tenderloin)", "rundvlees"),
  product("Brisket", "rundvlees"),
  product("Bloemstuk", "rundvlees"),
  product("Bavette (flap steak)", "rundvlees"),
  product("Picanha (staartstuk)", "rundvlees"),
  product("Diamond steak", "rundvlees"),
  product("Kogelbiefstuk", "rundvlees"),
  product("Deksel bovenbil", "rundvlees"),
  product("Bovenbil", "rundvlees"),
  product("Plattebil", "rundvlees"),
  product("Achtermuis", "rundvlees"),
  product("Riblappen", "rundvlees"),
  product("Sukadelappen", "rundvlees"),
  product("Runderlappen", "rundvlees"),
  product("Runderstaart", "rundvlees"),
  product("Rundersnippers", "rundvlees"),
  product("Short ribs", "rundvlees"),

  product("Kip Shoarma", "kip"),
  product("Kalkoen shoarma", "kip"),
  product("Kip Burger", "kip"),
  product("Kip Merquez", "kip"),
  product("Kip döner", "kip"),

  product("Runder Merquez", "eindproducten"),
  product("Lamsshoarma", "eindproducten"),
  product("Yaprak döner", "eindproducten"),
  product("Kalfs döner", "eindproducten"),
  product("Pastirma", "eindproducten"),
  product("Sucuk", "eindproducten"),
  product("Hamburger", "eindproducten"),
  product("Adana Kebab", "eindproducten"),
] as const;

export const ASSORTIMENT_CATEGORY_IDS = [
  "lamsvlees",
  "rundvlees",
  "kip",
  "eindproducten",
] as const satisfies readonly AssortimentCategoryId[];

export function isAssortimentCategoryId(value: string): value is AssortimentCategoryId {
  return (ASSORTIMENT_CATEGORY_IDS as readonly string[]).includes(value);
}

export function getProductsByCategory(category: AssortimentCategoryId) {
  return ASSORTIMENT_PRODUCTS.filter((p) => p.category === category);
}

export function getCategoryHref(category: AssortimentCategoryId | "all") {
  return category === "all" ? "/assortiment" : `/assortiment/${category}`;
}

/** Red category icons — same as original product cards */
export const CATEGORY_STICKERS: Record<AssortimentCategoryId, string> = {
  lamsvlees: `${CDN}/2025/11/categorie_lamsvlees-icon.svg`,
  rundvlees: `${CDN}/2025/11/categorie_rundvlees_icon.svg`,
  kip: `${CDN}/2025/11/categorie_gevogelte_icon.svg`,
  eindproducten: `${CDN}/2025/11/categorie_rundvlees_icon.svg`,
};

export const CATEGORY_LABELS: Record<AssortimentCategoryId, string> = {
  lamsvlees: "Lamsvlees",
  rundvlees: "Rundvlees",
  kip: "Kip",
  eindproducten: "Eindproducten",
};
