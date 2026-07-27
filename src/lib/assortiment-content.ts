import heroDoner from "@/assets/ayat/hero-doner.jpg";
import heroShoarma from "@/assets/ayat/hero-shoarma.jpg";
import heroGevogelte from "@/assets/ayat/hero-gevogelte.jpg";
import heroVleessoorten from "@/assets/ayat/hero-vleessoorten.jpg";
import heroDonerBak from "@/assets/ayat/hero-doner-bak.jpg";
import heroShoarmaBak from "@/assets/ayat/hero-shoarma-bak.jpg";
import heroBackdrop from "@/assets/ayat/hero-backdrop.jpeg";
import productDoner from "@/assets/ayat/product-doner.jpg";
import productShoarma from "@/assets/ayat/product-shoarma.jpg";
import productGevogelte from "@/assets/ayat/product-gevogelte.jpg";
import productVleessoorten from "@/assets/ayat/product-vleessoorten.jpg";
import productDiepvries from "@/assets/ayat/product-diepvries.jpg";
import productTurksePizza from "@/assets/ayat/product-turkse-pizza.jpg";
import productGegrild from "@/assets/ayat/product-gegrild.jpg";
import productDurum from "@/assets/ayat/product-durum.jpg";
import stickerAyam from "@/assets/stiker-ayam.svg";
import { PRODUCT_CATEGORIES, type ProductCategorySlug } from "@/lib/producten-content";
import stickerKambing from "@/assets/stiker-kambing.svg";
import stickerSapi from "@/assets/stiker-sapi.svg";

/** Site content max width — tighter = more premium / editorial */
export const SITE_CONTENT_MAX = "max-w-[1200px]" as const;

export type ProductenMegaItem = {
  id: string;
  label: string;
  eyebrow: string;
  description: string;
  image: string;
  previewImage: string;
  stickerSrc: string;
  href: string;
};

/**
 * Full Producten mega menu.
 *
 * Derived from PRODUCT_CATEGORIES (src/lib/producten-content.ts) so the navbar,
 * the mobile drawer and the footer can never drift from the real catalogue —
 * and so every item links to its own category page instead of the index.
 * The sticker artwork stays here: it is nav chrome, not catalogue data.
 */
const MEGA_STICKERS: Record<ProductCategorySlug, string> = {
  doner: stickerKambing,
  shoarma: stickerSapi,
  gevogelte: stickerAyam,
  vleessoorten: stickerSapi,
  diepvriesproducten: stickerSapi,
  "turkse-pizza": stickerKambing,
  "gegrilde-producten": stickerSapi,
  "tortilla-durum": stickerKambing,
};

export const PRODUCTEN_MEGA_ITEMS: readonly ProductenMegaItem[] = PRODUCT_CATEGORIES.map(
  (category) => ({
    id: category.slug,
    label: category.label,
    eyebrow: category.eyebrow,
    description: category.summary,
    image: category.cardImage,
    previewImage: category.heroImage,
    stickerSrc: MEGA_STICKERS[category.slug],
    href: `/producten/${category.slug}`,
  }),
);

export const ASSORTIMENT_MEGA_MENU = {
  eyebrow: "Onze producten",
  title: "Producten",
  subtitle:
    "Hoogwaardige en exclusieve Halal vleesproducten voor restaurants, supermarkten en retail.",
  ctaLabel: "Bekijken",
  allProductsLabel: "Alle producten",
  allProductsHref: "/producten",
  allProductsPreviewImage: heroBackdrop,
} as const;
