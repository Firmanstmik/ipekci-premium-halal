import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import heroImg from "@/assets/hero-truck.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Vector Transit" },
      { name: "description", content: "Two decades of moving freight with accountability, precision, and a modern fleet." },
      { property: "og:title", content: "About — Vector Transit" },
      { property: "og:description", content: "Meet the team behind nationwide logistics done right." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-6 pt-12 pb-20 lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          About Vector
        </p>
        <h1 className="mt-4 max-w-4xl text-6xl text-foreground md:text-7xl">
          Built by drivers. Run by operators. Trusted by shippers.
        </h1>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10">
        <img
          src={heroImg}
          alt="Vector Transit truck on the open road"
          loading="lazy"
          width={1920}
          height={1080}
          className="aspect-[21/9] w-full object-cover"
        />
      </section>

      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-24 md:grid-cols-2 lg:px-10 lg:py-32">
        <div>
          <h2 className="text-4xl text-foreground md:text-5xl">Our Story</h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Vector Transit was founded in 2004 with three trucks and one promise:
            move every load like it's the only one. Two decades later, that
            promise still drives every dispatch, every mile, every signature.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Today we operate one of the most modern fleets in the country —
            paired with logistics tech that gives our customers the kind of
            visibility the industry used to only promise.
          </p>
        </div>
        <div>
          <h2 className="text-4xl text-foreground md:text-5xl">What We Believe</h2>
          <ul className="mt-6 space-y-6">
            {[
              { t: "Accountability over excuses", d: "If we said we'd be there, we're there." },
              { t: "Modern fleet, modern tools", d: "Newer trucks, better drivers, real-time data." },
              { t: "Transparency by default", d: "You see what we see — every mile, every milestone." },
            ].map((v) => (
              <li key={v.t} className="border-l-2 border-primary pl-6">
                <h3 className="text-2xl text-foreground">{v.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{v.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteLayout>
  );
}
