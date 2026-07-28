import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductenIndexPage } from "@/components/producten/ProductenIndexPage";
import { PRODUCTEN_INDEX, TOTAL_PRODUCT_COUNT } from "@/lib/producten-content";

const TITLE = "Producten | Ayat Food Vleesgroothandel";
const DESCRIPTION = `Het volledige Halal assortiment van Ayat Food: döner, shoarma, gevogelte, vleessoorten, diepvriesproducten, Turkse pizza, gegrilde producten en tortilla dürüm. In totaal ${TOTAL_PRODUCT_COUNT} producten onder ECC Halal-toezicht.`;

export const Route = createFileRoute("/producten")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: PRODUCTEN_INDEX.heroImage },
    ],
  }),
  component: ProductenRoutePage,
});

function ProductenRoutePage() {
  return (
    <SiteLayout>
      <ProductenIndexPage />
    </SiteLayout>
  );
}
