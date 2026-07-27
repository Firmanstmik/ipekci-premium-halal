import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCategoryPage } from "@/components/producten/ProductCategoryPage";
import { getProductCategory, isProductCategorySlug } from "@/lib/producten-content";

export const Route = createFileRoute("/producten/$category")({
  beforeLoad: ({ params }) => {
    if (!isProductCategorySlug(params.category)) {
      throw notFound();
    }
  },
  head: ({ params }) => {
    const category = getProductCategory(params.category);
    const title = category ? `${category.label} — Producten | Ayat Food` : "Producten — Ayat Food";
    const description =
      category?.summary ?? "Het volledige Halal assortiment van Ayat Food Vleesgroothandel.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        ...(category ? [{ property: "og:image", content: category.heroImage }] : []),
      ],
    };
  },
  component: ProductCategoryRoute,
});

function ProductCategoryRoute() {
  const { category: slug } = Route.useParams();
  const category = getProductCategory(slug);

  // beforeLoad already rejects unknown slugs; this keeps the component total.
  if (!category) return null;

  return (
    <SiteLayout>
      <ProductCategoryPage category={category} />
    </SiteLayout>
  );
}
