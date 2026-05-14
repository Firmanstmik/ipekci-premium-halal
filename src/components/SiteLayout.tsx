import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function SiteLayout({
  children,
  overlayNav = false,
}: {
  children: React.ReactNode;
  overlayNav?: boolean;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar overlay={overlayNav} />
      <main className={overlayNav ? "" : "pt-24"}>{children}</main>
      <Footer />
    </div>
  );
}
