import { ArrowUpRight, Package } from "lucide-react";
import { useEffect, useState } from "react";
import { ProductRegistrationModal } from "@/components/producten/ProductOfficialSections";
import { PRODUCT_REGISTRATION } from "@/lib/producten-content";

export function ProductMobileStickyBar({
  productCount,
}: {
  productCount: number;
}) {
  const [visible, setVisible] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.5);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("pr-category-bar-visible", visible);
    return () => document.body.classList.remove("pr-category-bar-visible");
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      <div className="pr-mobile-action-bar fixed inset-x-0 bottom-0 z-50 md:hidden" role="region" aria-label="Snelle acties">
        <div className="pr-mobile-action-bar__inner mx-auto max-w-lg">
          <a
            href="#assortiment"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.06] px-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/88"
          >
            <Package size={14} className="shrink-0 text-[#C6A062]" aria-hidden />
            {productCount === 1 ? "1 product" : `${productCount} producten`}
          </a>
          <button
            type="button"
            onClick={() => setRegisterOpen(true)}
            className="ipek-btn-premium inline-flex min-h-[44px] items-center justify-center gap-2 px-3 text-[9px] tracking-[0.16em]"
          >
            <span className="relative z-[1] inline-flex items-center gap-1.5">
              {PRODUCT_REGISTRATION.cta}
              <ArrowUpRight size={13} className="ipek-btn-premium__arrow shrink-0" />
            </span>
          </button>
        </div>
      </div>
      <ProductRegistrationModal open={registerOpen} onOpenChange={setRegisterOpen} />
    </>
  );
}
