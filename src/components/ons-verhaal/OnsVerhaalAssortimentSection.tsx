import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Package } from "lucide-react";
import type { ProductenMegaItem } from "@/lib/assortiment-content";
import {
  ONS_VERHAAL_ASSORTIMENT,
  ONS_VERHAAL_PRODUCTGROEPEN,
  ONS_VERHAAL_SECTION_BACKGROUND,
} from "@/lib/ons-verhaal-content";
import { DS_EASE_REVEAL } from "@/lib/design-system";
import {
  EditorialHeader,
  LUXURY_SHELL,
  PremiumSectionShell,
} from "@/components/ons-verhaal/ons-verhaal-premium-ui";
import { CardFrameOverlay, ImageFrameOverlay } from "@/components/ui/premium-frame";

function PremiumLinkButton({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl border border-[rgba(198,160,98,0.45)] bg-transparent px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#555] transition-[color,border-color] duration-[320ms] hover:border-[rgba(198,160,98,0.75)] hover:text-[#111]"
    >
      <span className="pointer-events-none absolute inset-0 -translate-x-[110%] bg-[rgba(226,192,141,0.92)] transition-transform duration-[320ms] ease-[cubic-bezier(.22,.61,.36,1)] group-hover:translate-x-0" />
      <span className="relative">{children}</span>
      <ArrowUpRight size={13} className="relative transition-transform duration-500 group-hover:translate-x-0.5" />
    </Link>
  );
}

function ScrollLine() {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="h-px w-full origin-left bg-gradient-to-r from-transparent via-[rgba(226,192,141,0.55)] to-transparent"
      aria-hidden
    />
  );
}

function ProductMiniCard({ product, index }: { product: ProductenMegaItem; index: number }) {
  return (
    <motion.a
      href={product.href}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-4%" }}
      transition={{ duration: 0.7, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative block overflow-hidden ${LUXURY_SHELL} border border-black/[0.08] bg-white shadow-[0_20px_60px_-36px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1 hover:border-[rgba(198,160,98,0.32)] hover:shadow-[0_28px_70px_-32px_rgba(0,0,0,0.18)]`}
    >
      <div className="relative aspect-square overflow-hidden bg-[linear-gradient(180deg,#FFFFFF_0%,#F5F0E8_100%)]">
        <img
          src={product.image}
          alt={product.label}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.05]"
        />
        <CardFrameOverlay variant="reticle" />
      </div>
      <div className="flex items-start justify-between gap-3 p-4">
        <div className="min-w-0">
          <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#B31217]/80">
            {product.eyebrow}
          </p>
          <p className="mt-1.5 font-display text-lg leading-tight text-[#1c1c1c]">{product.label}</p>
        </div>
      </div>
    </motion.a>
  );
}

function AssortimentAppProductCard({ product }: { product: ProductenMegaItem }) {
  return (
    <a href={product.href} className="ons-assortiment-app__product">
      <div className="ons-assortiment-app__product-img">
        <img src={product.image} alt={product.label} loading="lazy" decoding="async" />
        <CardFrameOverlay variant="reticle" />
      </div>
      <div className="ons-assortiment-app__product-copy">
        <p className="ons-assortiment-app__product-eyebrow">{product.eyebrow}</p>
        <p className="ons-assortiment-app__product-label">{product.label}</p>
      </div>
    </a>
  );
}

function AssortimentAppCategoryCard({
  cat,
}: {
  cat: (typeof ONS_VERHAAL_ASSORTIMENT)[number];
}) {
  return (
    <a href={cat.href} className="ons-assortiment-app__cat">
      <div className="ons-assortiment-app__cat-img">
        <img src={cat.previewImage} alt={cat.label} loading="lazy" decoding="async" />
        <div className="ons-assortiment-app__cat-scrim" aria-hidden />
        <ImageFrameOverlay variant="halo" />
      </div>
      <div className="ons-assortiment-app__cat-body">
        <p className="ons-assortiment-app__cat-eyebrow">{cat.eyebrow}</p>
        <h3 className="ons-assortiment-app__cat-title">{cat.label}</h3>
        <p className="ons-assortiment-app__cat-text">{cat.description}</p>
        <span className="ons-assortiment-app__cat-cta">
          Lees meer
          <ArrowUpRight size={12} strokeWidth={1.75} />
        </span>
      </div>
    </a>
  );
}

export function OnsVerhaalAssortimentSection() {
  const reduceMotion = useReducedMotion();

  return (
    <PremiumSectionShell index="06" backgroundSrc={ONS_VERHAAL_SECTION_BACKGROUND} parallax>
      {/* Mobile luxury app */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8%" }}
        transition={{ duration: 0.95, ease: DS_EASE_REVEAL }}
        className="ons-assortiment-app lg:hidden"
        aria-labelledby="ons-assortiment-app-heading"
      >
        <div className="ons-assortiment-app__sheet">
          <span className="ons-assortiment-app__eyebrow">
            <Package size={14} strokeWidth={1.75} aria-hidden />
            Assortiment
          </span>
          <h2
            id="ons-assortiment-app-heading"
            className="ons-assortiment-app__title mt-4 font-display font-semibold leading-[1.05] tracking-[-0.03em] text-[#141414]"
          >
            Producten van{" "}
            <span className="italic text-[#DA292A]">Ayat Food</span>
          </h2>
          <p className="ons-assortiment-app__lede mt-3">
            De beste van smaak — döner, shoarma en gevogelte, Halal geproduceerd voor professionals.
          </p>
        </div>

        <div className="ons-assortiment-app__cats" aria-label="Uitgelichte categorieën">
          {ONS_VERHAAL_ASSORTIMENT.map((cat) => (
            <AssortimentAppCategoryCard key={cat.id} cat={cat} />
          ))}
        </div>

        <Link to="/producten" className="ons-assortiment-app__link">
          Bekijk assortiment
          <ArrowUpRight size={14} strokeWidth={1.75} />
        </Link>

        <div className="ons-assortiment-app__divider" aria-hidden />

        <div className="ons-assortiment-app__sheet ons-assortiment-app__sheet--compact">
          <p className="ons-assortiment-app__eyebrow ons-assortiment-app__eyebrow--muted">Productgroepen</p>
          <h3 className="ons-assortiment-app__subtitle mt-3 font-display text-[1.35rem] font-semibold leading-tight text-[#141414]">
            Het volledige aanbod
          </h3>
          <p className="ons-assortiment-app__lede mt-3">
            Van döner en shoarma tot gevogelte, vleessoorten, diepvriesproducten, Turkse pizza,
            gegrilde producten en tortilla durum.
          </p>
        </div>

        <div className="ons-assortiment-app__products" aria-label="Alle productgroepen">
          {ONS_VERHAAL_PRODUCTGROEPEN.map((product) => (
            <AssortimentAppProductCard key={product.id} product={product} />
          ))}
        </div>

        <Link to="/producten" className="ons-assortiment-app__link ons-assortiment-app__link--solid">
          Alle producten
          <ArrowUpRight size={14} strokeWidth={1.75} />
        </Link>
      </motion.div>

      {/* Desktop editorial layout */}
      <div className="hidden lg:block">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl">
            <EditorialHeader kicker="Assortiment" badgeTitle="Ayat Food" title="Producten van Ayat Food" />
          </div>
          <PremiumLinkButton to="/producten">Bekijk assortiment</PremiumLinkButton>
        </div>

        <div className="ons-assortiment__cats mt-12 grid gap-6 lg:grid-cols-3">
          {ONS_VERHAAL_ASSORTIMENT.map((cat, i) => (
            <motion.a
              key={cat.id}
              href={cat.href}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6%" }}
              transition={{ duration: 0.9, delay: i * 0.09, ease: DS_EASE_REVEAL }}
              className={`group relative overflow-hidden ${LUXURY_SHELL} border border-black/[0.08] bg-[#0a0a0a] shadow-[0_28px_80px_-44px_rgba(0,0,0,0.45)] transition-all duration-700 hover:-translate-y-2 hover:border-[rgba(198,160,98,0.38)] hover:shadow-[0_44px_110px_-40px_rgba(0,0,0,0.58)]`}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={cat.previewImage}
                  alt={cat.label}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-[1.35s] ease-[cubic-bezier(.22,.61,.36,1)] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
                <ImageFrameOverlay variant="halo" />
              </div>
              <div className="flex items-start justify-between gap-4 p-7">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[rgba(198,160,98,0.88)]">
                    {cat.eyebrow}
                  </p>
                  <h3 className="mt-2 font-display text-2xl text-white">{cat.label}</h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-white/68">{cat.description}</p>
                </div>
              </div>
              <span className="group/btn relative mx-7 mb-7 inline-flex items-center gap-2 overflow-hidden rounded-xl border border-[rgba(198,160,98,0.45)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[rgba(198,160,98,0.92)] transition-colors duration-[320ms] group-hover:border-[rgba(198,160,98,0.75)] group-hover:text-[#0a0a0a]">
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[rgba(226,192,141,0.95)] transition-transform duration-[320ms] ease-[cubic-bezier(.22,.61,.36,1)] group-hover:translate-x-0" />
                <span className="relative">Lees meer</span>
                <ArrowUpRight size={12} className="relative transition-transform duration-500 group-hover:translate-x-0.5" />
              </span>
            </motion.a>
          ))}
        </div>

        <ScrollLine />

        <div className="mt-20 flex flex-wrap items-end justify-between gap-6">
          <EditorialHeader kicker="Productgroepen" badgeTitle="Volledig aanbod" title="Het volledige aanbod" />
          <PremiumLinkButton to="/producten">Alle producten</PremiumLinkButton>
        </div>
        <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-[#141414]/62">
          Van döner en shoarma tot gevogelte, vleessoorten, diepvriesproducten, Turkse pizza,
          gegrilde producten en tortilla durum, Halal geproduceerd voor restaurants, supermarkten
          en retail.
        </p>

        <div className="ons-assortiment__products mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {ONS_VERHAAL_PRODUCTGROEPEN.map((product, i) => (
            <ProductMiniCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </PremiumSectionShell>
  );
}
