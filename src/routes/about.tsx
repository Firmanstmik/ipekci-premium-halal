import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { OnsVerhaalPage } from "@/components/ons-verhaal/OnsVerhaalPage";
import { ONS_VERHAAL_HERO_FALLBACK } from "@/lib/ons-verhaal-content";

const TITLE = "Over ons | Ayat Food Vleesgroothandel";
const DESCRIPTION =
  "Ayat Food Vleesgroothandel is het adres voor Halal döner kebab producten. 24/7 service, een modern wagenpark, NVWA-normen en ECC Halal-toezicht.";

export const Route = createFileRoute("/ons-verhaal")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: ONS_VERHAAL_HERO_FALLBACK },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <OnsVerhaalPage />
    </SiteLayout>
  );
}
