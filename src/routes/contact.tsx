import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Vector Transit" },
      { name: "description", content: "Get a freight quote or talk to our logistics team." },
      { property: "og:title", content: "Contact — Vector Transit" },
      { property: "og:description", content: "Get in touch for quotes, partnerships, and support." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <SiteLayout>
      <section className="mx-auto grid max-w-7xl gap-16 px-6 pt-12 pb-24 md:grid-cols-2 lg:px-10 lg:pb-32">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Contact
          </p>
          <h1 className="mt-4 text-6xl text-foreground md:text-7xl">
            Let's move something.
          </h1>
          <p className="mt-6 max-w-md text-base text-muted-foreground">
            Tell us about your freight and we'll come back with a quote within
            one business day.
          </p>

          <div className="mt-12 space-y-6">
            {[
              { Icon: Phone, label: "1-800-VECTOR-1" },
              { Icon: Mail, label: "hello@vectortransit.com" },
              { Icon: MapPin, label: "1100 Lake Shore Dr, Chicago, IL" },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-primary text-primary-foreground">
                  <Icon size={18} />
                </div>
                <span className="text-base text-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="rounded-sm border border-border bg-card p-8 lg:p-10"
        >
          {sent ? (
            <div className="flex h-full min-h-[400px] flex-col items-center justify-center text-center">
              <h3 className="text-3xl text-foreground">Thank you.</h3>
              <p className="mt-3 text-muted-foreground">
                We've got your message and will be in touch within one business day.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {[
                { name: "name", label: "Full Name", type: "text" },
                { name: "email", label: "Email", type: "email" },
                { name: "company", label: "Company", type: "text" },
              ].map((f) => (
                <div key={f.name}>
                  <label className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    name={f.name}
                    required
                    className="mt-2 w-full border-b border-border bg-transparent py-2 text-base text-foreground outline-none transition-colors focus:border-primary"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Tell us about your shipment
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  className="mt-2 w-full border-b border-border bg-transparent py-2 text-base text-foreground outline-none transition-colors focus:border-primary"
                />
              </div>
              <button
                type="submit"
                className="mt-4 w-full rounded-sm bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90"
              >
                Request a Quote
              </button>
            </div>
          )}
        </form>
      </section>
    </SiteLayout>
  );
}
