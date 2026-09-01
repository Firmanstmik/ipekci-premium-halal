import { QueryClient } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, useRouter } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import ayatLogo from "@/assets/ayat/logo-transparent.png";
import { DualCtaRow } from "@/components/ui/DualCtaRow";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-center bg-[#faf8f5] px-6 grain">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(179,18,23,0.06),transparent_68%)]" />
      </div>

      <div className="relative max-w-md text-center">
        <img
          src={ayatLogo}
          alt="Ayat Food"
          className="mx-auto h-12 w-auto opacity-90"
          loading="eager"
          decoding="async"
        />
        <p className="page-not-found__code mt-10 font-display font-semibold leading-none tracking-[-0.05em] text-[#141414]/12">
          404
        </p>
        <h1 className="mt-2 font-display text-[clamp(1.5rem,5vw,2rem)] font-semibold tracking-[-0.03em] text-[#141414]">
          Pagina niet gevonden
        </h1>
        <p className="mt-4 text-[15px] leading-[1.7] text-[#141414]/62">
          De pagina die u zoekt bestaat niet meer of is verplaatst. Ga terug naar de homepage of
          neem contact met ons op.
        </p>
        <DualCtaRow centered wide className="mt-8">
          <Link
            to="/"
            className="ipek-btn-premium group inline-flex min-h-12 items-center justify-center px-8 py-3.5 text-[11px] tracking-[0.22em]"
          >
            <span className="relative z-[1] inline-flex items-center gap-2">
              Naar homepage
              <ArrowUpRight size={15} />
            </span>
          </Link>
          <Link
            to="/contact"
            className="lux-btn inline-flex min-h-12 items-center justify-center px-8 py-3.5 text-[10.5px]"
          >
            Contact
          </Link>
        </DualCtaRow>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-center bg-[#0a0a0a] px-6 grain">
      <div className="relative max-w-md text-center text-[#f5f2ed]">
        <h1 className="font-display text-[clamp(1.35rem,4.5vw,1.75rem)] font-semibold tracking-[-0.03em]">
          Deze pagina kon niet worden geladen
        </h1>
        <p className="mt-4 text-[15px] leading-[1.7] text-white/58">
          Er ging iets mis aan onze kant. Probeer de pagina te vernieuwen of ga terug naar de
          homepage.
        </p>
        <DualCtaRow centered wide className="mt-8">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="ipek-btn-premium inline-flex min-h-12 items-center justify-center px-8 py-3.5 text-[11px] tracking-[0.22em]"
          >
            Opnieuw
          </button>
          <a
            href="/"
            className="lux-btn lux-btn--dark inline-flex min-h-12 items-center justify-center px-8 py-3.5 text-[10.5px]"
          >
            Home
          </a>
        </DualCtaRow>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  return <Outlet />;
}
