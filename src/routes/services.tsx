import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ServiceCard } from "@/components/ServiceCard";
import ftlImg from "@/assets/service-ftl.jpg";
import ltlImg from "@/assets/service-ltl.jpg";
import intermodalImg from "@/assets/service-intermodal.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Vector Transit" },
      { name: "description", content: "Full truckload, LTL, intermodal, warehousing, and last-mile delivery services." },
      { property: "og:title", content: "Services — Vector Transit" },
      { property: "og:description", content: "Comprehensive freight services for every shipping need." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  { title: "Full Truckload (FTL)", description: "Dedicated trailers moving direct from origin to destination — no stops, no transfers.", image: ftlImg },
  { title: "Less-than-Truckload", description: "Cost-effective consolidated shipping for partial loads, with full chain-of-custody visibility.", image: ltlImg },
  { title: "Intermodal Freight", description: "Rail, road, and port — orchestrated as one continuous supply chain.", image: intermodalImg },
  { title: "Warehousing", description: "Strategic distribution centers with real-time inventory and pick-pack-ship operations.", image: ftlImg },
  { title: "Last-Mile Delivery", description: "White-glove final-mile service for high-value goods and time-critical freight.", image: ltlImg },
  { title: "Cross-Border", description: "Customs-cleared US, Canada, and Mexico transit with bonded carrier authority.", image: intermodalImg },
];

function ServicesPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-6 pt-12 pb-24 lg:px-10 lg:pb-32">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Services
        </p>
        <h1 className="mt-4 max-w-3xl text-6xl text-foreground md:text-7xl">
          Every link in the supply chain.
        </h1>
        <p className="mt-6 max-w-xl text-base text-muted-foreground">
          From the warehouse floor to the final doorstep, we manage freight
          end-to-end so your operation never misses a beat.
        </p>

        <div className="mt-20 grid gap-12 md:grid-cols-3 md:gap-8">
          {services.map((s, i) => (
            <ServiceCard key={s.title} {...s} index={i} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
