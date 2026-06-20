import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { AssortimentCatalogPage } from "@/components/assortiment/AssortimentCatalogPage";

const heroImage =
  "https://www.ipekcislachterij.nl/wp-content/uploads/2025/12/Ook-klant-worden.webp";

export const Route = createFileRoute("/assortiment")({
  head: () => ({
    meta: [
      { title: "Assortiment — Ipekçi Slachterij" },
      {
        name: "description",
        content:
          "Assortiment premium halalvlees: lamsvlees, rundvlees, kip (op aanvraag) en eindproducten voor B2B-klanten.",
      },
      { property: "og:title", content: "Assortiment — Ipekçi Slachterij" },
      { property: "og:image", content: heroImage },
    ],
  }),
  component: AssortimentIndexPage,
});

function AssortimentIndexPage() {
  return (
    <SiteLayout>
      <AssortimentCatalogPage activeCategory="all" />
    </SiteLayout>
  );
}
