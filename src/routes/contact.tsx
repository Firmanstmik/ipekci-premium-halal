import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/contact/ContactPage";
import { CONTACT_HERO_IMAGE } from "@/lib/contact-content";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Ipekçi Slachterij" },
      {
        name: "description",
        content:
          "Neem contact op met Ipekçi Slachterij voor B2B-samenwerkingen, assortimentvragen en klant worden.",
      },
      { property: "og:title", content: "Contact — Ipekçi Slachterij" },
      { property: "og:image", content: CONTACT_HERO_IMAGE },
    ],
  }),
  component: ContactPage,
});
