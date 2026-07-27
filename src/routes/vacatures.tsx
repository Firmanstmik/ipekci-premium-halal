import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { VacaturesPage } from "@/components/vacatures/VacaturesPage";
import { VACATURES_HERO_IMAGE } from "@/lib/vacatures-content";

const TITLE = "Vacatures — Ayat Food Vleesgroothandel";
const DESCRIPTION =
  "Ben je op zoek naar een uitdagende baan in het hoogstaande vleessegment? Bekijk de openstaande vacatures van Ayat Food in Watergang.";

export const Route = createFileRoute("/vacatures")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: VACATURES_HERO_IMAGE },
    ],
  }),
  component: VacaturesRoutePage,
});

function VacaturesRoutePage() {
  return (
    <SiteLayout>
      <VacaturesPage />
    </SiteLayout>
  );
}
