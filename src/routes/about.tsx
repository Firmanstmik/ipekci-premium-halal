import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { OnsVerhaalPage } from "@/components/ons-verhaal/OnsVerhaalPage";
import { ONS_VERHAAL_HERO_FALLBACK } from "@/lib/ons-verhaal-content";

export const Route = createFileRoute("/ons-verhaal")({
  head: () => ({
    meta: [
      { title: "Ons verhaal — Ipekçi Slachterij" },
      {
        name: "description",
        content:
          "Het verhaal van Ipekçi Slachterij: een familiebedrijf in Harderwijk met NVWA-erkenning, onbedwelmd halalslacht en premium Nederlands vlees sinds 2012.",
      },
      { property: "og:title", content: "Ons verhaal — Ipekçi Slachterij" },
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
