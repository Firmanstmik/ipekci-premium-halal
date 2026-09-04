import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ContactPage } from "@/components/contact/ContactPage";
import { CONTACT_HERO_IMAGE } from "@/lib/contact-content";

const TITLE = "Contact | Ayat Food Vleesgroothandel";
const DESCRIPTION =
  "Neem contact op met Ayat Food voor B2B-samenwerkingen, assortimentvragen en klant worden.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: CONTACT_HERO_IMAGE },
    ],
  }),
  component: ContactRoutePage,
});

function ContactRoutePage() {
  return (
    <SiteLayout>
      <ContactPage />
    </SiteLayout>
  );
}
