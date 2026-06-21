import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-background text-foreground">
      <Navbar />
      <main className="overflow-x-hidden">{children}</main>
      <Footer />
    </div>
  );
}
