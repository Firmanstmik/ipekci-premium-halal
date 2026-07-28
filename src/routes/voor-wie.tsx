import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { VoorWieCatalogPage } from "@/components/voor-wie/VoorWieCatalogPage";
import { VOOR_WIE_MEGA_MENU } from "@/lib/voor-wie-content";

export const Route = createFileRoute("/voor-wie")({
  head: () => ({
    meta: [
      { title: "Voor wie | Ayat Food" },
      {
        name: "description",
        content: VOOR_WIE_MEGA_MENU.pageDescription,
      },
      { property: "og:title", content: "Voor wie | Ayat Food" },
      { property: "og:image", content: VOOR_WIE_MEGA_MENU.featuredImage },
    ],
  }),
  component: VoorWieIndexPage,
});

function VoorWieIndexPage() {
  return (
    <SiteLayout>
      <VoorWieCatalogPage activeSegment="all" />
    </SiteLayout>
  );
}
