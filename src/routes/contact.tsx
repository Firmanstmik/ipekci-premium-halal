import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/contact/ContactPage";
import { CONTACT_HERO_IMAGE } from "@/lib/contact-content";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Ayat Food Vleesgroothandel" },
      {
        name: "description",
        content:
          "Neem contact op met Ayat Food voor B2B-samenwerkingen, assortimentvragen en klant worden.",
      },
      { property: "og:title", content: "Contact | Ayat Food Vleesgroothandel" },
      { property: "og:image", content: CONTACT_HERO_IMAGE },
    ],
  }),
  component: ContactPage,
});
