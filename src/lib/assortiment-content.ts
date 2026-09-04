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
import productTurksePizza from "@/assets/ayat/product-turkse-pizza.jpg";
import productGegrild from "@/assets/ayat/product-gegrild.jpg";
import productDurum from "@/assets/ayat/product-durum.jpg";
import { PRODUCT_CATEGORIES } from "@/lib/producten-content";

/** Site content max width — tighter = more premium / editorial */
export const SITE_CONTENT_MAX = "max-w-[1200px]" as const;

export type ProductenMegaItem = {
  id: string;
  label: string;
  eyebrow: string;
  description: string;
  image: string;
  previewImage: string;
  href: string;
};

/**
 * Full Producten mega menu.
 *
 * Derived from PRODUCT_CATEGORIES (src/lib/producten-content.ts) so the navbar,
 * the mobile drawer and the footer can never drift from the real catalogue —
 * and so every item links to its own category page instead of the index.
 */
export const PRODUCTEN_MEGA_ITEMS: readonly ProductenMegaItem[] = PRODUCT_CATEGORIES.map(
  (category) => ({
    id: category.slug,
    label: category.label,
    eyebrow: category.eyebrow,
    description: category.summary,
    image: category.cardImage,
    previewImage: category.heroImage,
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
