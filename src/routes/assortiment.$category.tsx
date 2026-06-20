import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { AssortimentCatalogPage } from "@/components/assortiment/AssortimentCatalogPage";
import { ASSORTIMENT_CATEGORIES } from "@/lib/assortiment-content";
import {
  isAssortimentCategoryId,
  type AssortimentCategoryId,
} from "@/lib/assortiment-products";

export const Route = createFileRoute("/assortiment/$category")({
  beforeLoad: ({ params }) => {
    if (!isAssortimentCategoryId(params.category)) {
      throw notFound();
    }
  },
  head: ({ params }) => {
    const category = params.category as AssortimentCategoryId;
    const meta = ASSORTIMENT_CATEGORIES.find((c) => c.id === category);
    const title = meta ? `${meta.label} — Assortiment` : "Assortiment";
    return {
      meta: [
        { title: `${title} — Ipekçi Slachterij` },
        {
          name: "description",
          content: meta?.description ?? "Premium halalvlees assortiment van Ipekçi Slachterij.",
        },
        { property: "og:title", content: `${title} — Ipekçi Slachterij` },
        { property: "og:image", content: meta?.heroImage },
      ],
    };
  },
  component: AssortimentCategoryRoute,
});

function AssortimentCategoryRoute() {
  const { category } = Route.useParams();

  return (
    <SiteLayout>
      <AssortimentCatalogPage activeCategory={category as AssortimentCategoryId} />
    </SiteLayout>
  );
}
