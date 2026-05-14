import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { ServiceCard } from "@/components/ServiceCard";
import heroImg from "@/assets/hero-truck.jpg";
import ftlImg from "@/assets/service-ftl.jpg";
import ltlImg from "@/assets/service-ltl.jpg";
import intermodalImg from "@/assets/service-intermodal.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vector Transit — Logistics, Redefined" },
      { name: "description", content: "Nationwide freight and logistics solutions engineered for reliability, speed, and transparency." },
      { property: "og:title", content: "Vector Transit — Logistics, Redefined" },
      { property: "og:description", content: "Premium freight and logistics for shippers who don't compromise." },
    ],
  }),
  component: HomePage,
});

const services = [
  { title: "Full Truckload (FTL)", description: "Dedicated trailers moving direct from origin to destination — no stops, no transfers, no surprises.", image: ftlImg },
  { title: "Less-than-Truckload", description: "Cost-effective consolidated shipping for partial loads, with full visibility from pickup to delivery.", image: ltlImg },
  { title: "Intermodal Freight", description: "Rail, road, and port — orchestrated as one continuous, optimized supply chain.", image: intermodalImg },
];

function HomePage() {
  return (
    <SiteLayout overlayNav>
      {/* Hero */}
      <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
        <img
          src={heroImg}
          alt="Silver freight truck driving along a coastal highway at sunset"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-6 pb-20 lg:px-10">
          <div className="max-w-5xl">
            <h1 className="text-[clamp(3rem,8vw,7rem)] leading-[0.95] text-white drop-shadow-lg">
              Logistics, Redefined.
              <br />
              Delivery, Perfected.
            </h1>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-sm bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90"
              >
                Get a Quote <ArrowRight size={16} />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-sm border border-white/40 bg-white/10 px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur transition-colors hover:bg-white/20"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                What We Do
              </p>
              <h2 className="mt-4 text-5xl text-foreground md:text-6xl">
                Integrated Freight Solutions
              </h2>
              <p className="mt-6 max-w-md text-base text-muted-foreground">
                We provide a comprehensive range of services tailored to your
                business's unique shipping demands.
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-sm bg-primary px-7 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              Explore All Services
            </Link>
          </div>

          <div className="mt-20 grid gap-12 md:grid-cols-3 md:gap-8">
            {services.map((s, i) => (
              <ServiceCard key={s.title} {...s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats / About teaser */}
      <section className="border-t border-border bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:px-10 lg:py-32">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Why Vector
            </p>
            <h2 className="mt-4 text-5xl text-foreground md:text-6xl">
              Twenty years moving what matters.
            </h2>
            <p className="mt-6 max-w-lg text-base text-muted-foreground">
              We've built our network on accountability — modern fleet, vetted
              drivers, and live tracking that makes guesswork obsolete.
            </p>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary"
            >
              About the Company <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8">
            {[
              { n: "20+", l: "Years on the road" },
              { n: "1.2M", l: "Shipments delivered" },
              { n: "98.7%", l: "On-time rate" },
              { n: "48", l: "States covered" },
            ].map((s) => (
              <div key={s.l} className="border-l-2 border-primary pl-6">
                <div className="text-5xl text-foreground">{s.n}</div>
                <div className="mt-2 text-sm text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-20 lg:flex-row lg:items-center lg:px-10">
          <h2 className="max-w-2xl text-4xl text-primary-foreground md:text-5xl">
            Ready to move freight the right way?
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-sm bg-primary-foreground px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary transition-opacity hover:opacity-90"
          >
            Get a Quote <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
