import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { VoorWieCatalogPage } from "@/components/voor-wie/VoorWieCatalogPage";
import { VOOR_WIE_SEGMENTS, isVoorWieSegmentId, type VoorWieSegmentId } from "@/lib/voor-wie-content";

export const Route = createFileRoute("/voor-wie/$segment")({
  beforeLoad: ({ params }) => {
    if (!isVoorWieSegmentId(params.segment)) {
      throw notFound();
    }
  },
  head: ({ params }) => {
    const segment = params.segment as VoorWieSegmentId;
    const meta = VOOR_WIE_SEGMENTS.find((s) => s.id === segment);
    const title = meta ? `${meta.label} — Voor wie` : "Voor wie";
    return {
      meta: [
        { title: `${title} — Ipekçi Slachterij` },
        {
          name: "description",
          content: meta?.longDescription ?? "Premium halalvlees voor B2B klanten.",
        },
        { property: "og:title", content: `${title} — Ipekçi Slachterij` },
        { property: "og:image", content: meta?.image },
      ],
    };
  },
  component: VoorWieSegmentRoute,
});

function VoorWieSegmentRoute() {
  const { segment } = Route.useParams();

  return (
    <SiteLayout>
      <VoorWieCatalogPage activeSegment={segment as VoorWieSegmentId} />
    </SiteLayout>
  );
}
