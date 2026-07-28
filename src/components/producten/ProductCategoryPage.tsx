import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Package, Snowflake, Tag } from "lucide-react";
import { AyatSectionBadge } from "@/components/home/AyatSectionBadge";
import {
  CategoryCard,
  LuxLinkButton,
  PrimaryLinkButton,
  ProductAssurances,
  ProductCertification,
  ProductGallery,
  ProductHelpCta,
  ProductHero,
  ProductOrderSteps,
  Reveal,
} from "@/components/producten/ProductPrimitives";
import { DS_EASE_REVEAL } from "@/lib/design-system";
import {
  PRODUCT_CATEGORIES,
  PRODUCT_QUOTE_CTA,
  type Product,
  type ProductCategory,
} from "@/lib/producten-content";
import backgroundWhite1 from "@/assets/background-white1.webp";
import backgroundWhite3 from "@/assets/background-white3.webp";

function SectionBackdrop({ src }: { src: string }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <img
        src={src}
        alt=""
        className="h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

/* ── Product spec card ──────────────────────────────────────── */

/**
 * The official category pages publish product variants as text only, so the
 * card is deliberately spec-forward: numeral, name, published description and
 * the packaging / state / variant chips that the official product name states.
 * No photograph is attached to a variant we have no photograph of.
 */
function ProductSpecCard({ product, index }: { product: Product; index: number }) {
  const chips = [
    product.packaging && { icon: Package, label: product.packaging },
    product.state && { icon: Snowflake, label: product.state },
    product.variantNote && { icon: Tag, label: product.variantNote },
  ].filter(Boolean) as { icon: typeof Package; label: string }[];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.08, ease: DS_EASE_REVEAL }}
      className="lux-spec group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-black/[0.08] bg-white/92 p-7 shadow-[0_24px_70px_-44px_rgba(0,0,0,0.16)] backdrop-blur-sm lg:p-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(179,18,23,0.45),transparent)] opacity-70 transition-opacity duration-700 group-hover:opacity-100"
      />

      <div className="flex items-start justify-between gap-4">
        <span className="font-display text-[11px] font-semibold tabular-nums tracking-[0.22em] text-[#141414]/25">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          aria-hidden
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#B31217]/70 transition-transform duration-700 group-hover:scale-125"
        />
      </div>

      <h3 className="mt-4 font-display text-[1.4rem] leading-tight tracking-[-0.02em] text-[#141414]">
        {product.name}
      </h3>

      <div
        aria-hidden
        className="lux-spec__rule mt-4 h-px w-full bg-[linear-gradient(90deg,rgba(179,18,23,0.34),rgba(20,20,20,0.08)_38%,transparent)]"
      />

      {product.paragraphs.length > 0 ? (
        <div className="mt-5 space-y-3.5">
          {product.paragraphs.map((p, i) => (
            <p key={i} className="text-[13.5px] leading-[1.75] text-[#141414]/66">
              {p}
            </p>
          ))}
        </div>
      ) : (
        <p className="mt-5 text-[13.5px] leading-[1.75] text-[#141414]/50">
          Op aanvraag leverbaar. Neem contact op voor specificaties en hoeveelheden.
        </p>
      )}

      {chips.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-2">
          {chips.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#141414]/62"
            >
              <Icon size={11} className="shrink-0 text-[#B31217]" />
              {label}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto pt-7">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#B31217] transition-colors duration-300 hover:text-[#8f0f13]"
        >
          Offerte aanvragen
          <ArrowUpRight size={12} className="lux-arrow shrink-0" />
        </Link>
      </div>
    </motion.article>
  );
}

/* ── Page ───────────────────────────────────────────────────── */

export function ProductCategoryPage({ category }: { category: ProductCategory }) {
  const related = PRODUCT_CATEGORIES.filter((c) => c.slug !== category.slug).slice(0, 4);
  const productCount = category.products.length;

  /* Packaging formats actually published for this category — deduped. */
  const packagingFormats = Array.from(
    new Set(category.products.map((p) => p.packaging).filter(Boolean) as string[]),
  );
  const states = Array.from(
    new Set(category.products.map((p) => p.state).filter(Boolean) as string[]),
  );

  return (
    <>
      <ProductHero
        image={category.heroImage}
        eyebrow={category.eyebrow}
        title={category.label}
        lede={category.summary}
        breadcrumb={[{ label: "Producten", to: "/producten" }, { label: category.breadcrumbLabel }]}
        badge="100% Halal · ECC Halal"
        meta={[
          { value: String(productCount), label: productCount === 1 ? "Product" : "Producten" },
          { value: "NVWA", label: "Normen" },
          { value: "24/7", label: "Service" },
        ]}
      >
        <PrimaryLinkButton href="#assortiment">
          {productCount === 1 ? "Bekijk product" : "Bekijk producten"}
        </PrimaryLinkButton>
        <LuxLinkButton to="/contact" tone="dark">
          Offerte aanvragen
        </LuxLinkButton>
      </ProductHero>

      {/* ── Introduction + gallery ────────────────────────────── */}
      <section className="relative isolate overflow-hidden ipek-section">
        <SectionBackdrop src={backgroundWhite1} />
        <div aria-hidden className="lux-ambient" />
        <div aria-hidden className="lux-hairline top-0" />

        <div className="relative ipek-container">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <AyatSectionBadge kicker="Beste producten" title={category.label} />
              <h2 className="mt-5 font-display text-[clamp(2rem,3.4vw,2.85rem)] leading-[1.12] text-[#1c1c1c]">
                Over {category.label.toLowerCase()}
              </h2>
              <div
                aria-hidden
                className="mt-4 h-px w-24 bg-[linear-gradient(90deg,rgba(200,164,107,0.95),rgba(179,18,23,0.35),transparent)]"
              />
              <div className="mt-8 space-y-5">
                {category.intro.map((p, i) => (
                  <p key={i} className="text-[15px] leading-[1.85] text-[#5a5a5a]">
                    {p}
                  </p>
                ))}
              </div>

              {(packagingFormats.length > 0 || states.length > 0) && (
                <div className="mt-10 border-t border-black/[0.07] pt-8">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#141414]/45">
                    Verpakking &amp; levering
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2.5">
                    {packagingFormats.map((f) => (
                      <li
                        key={f}
                        className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-4 py-2 text-[11px] font-medium text-[#141414]/78"
                      >
                        <Package size={12} className="text-[#B31217]" />
                        {f}
                      </li>
                    ))}
                    {states.map((s) => (
                      <li
                        key={s}
                        className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-4 py-2 text-[11px] font-medium text-[#141414]/78"
                      >
                        <Snowflake size={12} className="text-[#B31217]" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-9">
                <LuxLinkButton to="/contact">Offerte aanvragen</LuxLinkButton>
              </div>
            </Reveal>

            {/* Sticky on desktop: the intro copy runs much taller than the
                gallery, so the photography tracks alongside it instead of
                leaving the right column empty halfway down. */}
            <div className="lg:col-span-7">
              <ProductGallery items={category.gallery} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Product overview ──────────────────────────────────── */}
      <section id="assortiment" className="relative isolate overflow-hidden ipek-section">
        <SectionBackdrop src={backgroundWhite3} />
        <div aria-hidden className="lux-ambient" />

        <div className="relative ipek-container">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal className="max-w-2xl">
              <p className="ipek-label ipek-heading-label text-[10px] tracking-[0.28em]">
                Ons assortiment
              </p>
              <h2 className="mt-4 font-display text-[clamp(2rem,3.5vw,3rem)] leading-[1.12] text-[#1c1c1c]">
                {productCount === 1
                  ? "Beschikbaar product"
                  : `${productCount} beschikbare producten`}
              </h2>
              <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-[#5a5a5a]">
                {PRODUCT_QUOTE_CTA.text}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <LuxLinkButton to="/contact">{PRODUCT_QUOTE_CTA.cta}</LuxLinkButton>
            </Reveal>
          </div>

          <div
            className={`mt-14 grid gap-5 lg:gap-6 ${
              productCount === 1
                ? "max-w-xl"
                : productCount === 2
                  ? "sm:grid-cols-2"
                  : "sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {category.products.map((product, i) => (
              <ProductSpecCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Quality assurances ────────────────────────────────── */}
      <section className="relative isolate overflow-hidden ipek-section">
        <SectionBackdrop src={backgroundWhite1} />
        <div aria-hidden className="lux-ambient" />
        <div aria-hidden className="lux-hairline top-0" />

        <div className="relative ipek-container">
          <Reveal className="max-w-2xl">
            <p className="ipek-label ipek-heading-label text-[10px] tracking-[0.28em]">
              Kwaliteitsgarantie
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,3.5vw,3rem)] leading-[1.12] text-[#1c1c1c]">
              Zeker van elke levering
            </h2>
          </Reveal>
          <div className="mt-14">
            <ProductAssurances />
          </div>
        </div>
      </section>

      {/* ── Certification + audiences ─────────────────────────── */}
      <section className="relative isolate overflow-hidden ipek-section">
        <SectionBackdrop src={backgroundWhite3} />
        <div aria-hidden className="lux-ambient" />

        <div className="relative ipek-container">
          <ProductCertification image={category.gallery[0]?.src ?? category.heroImage} />
        </div>
      </section>

      {/* ── Ordering process ──────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[#070707] ipek-section grain">
        <div aria-hidden className="lux-ambient lux-ambient--dark" />
        <div aria-hidden className="lux-hairline top-0" />

        <div className="relative ipek-container">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <Reveal className="lg:col-span-7">
              <AyatSectionBadge kicker="Bestellen" title="Ayat Food" tone="dark" />
              <h2 className="mt-5 font-display text-[clamp(2rem,3.5vw,3rem)] leading-[1.12] text-[#F8F4EE]">
                Zo bestelt u {category.label.toLowerCase()}
              </h2>
            </Reveal>
            <Reveal className="lg:col-span-5" delay={0.12}>
              <p className="max-w-[42ch] text-[15px] leading-[1.8] text-white/68 lg:ml-auto lg:text-right">
                Plaats je bestelling per mail of telefoon. Dankzij ons moderne wagenpark leveren wij
                snel en betrouwbaar.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 lg:mt-16">
            <ProductOrderSteps />
          </div>
        </div>
      </section>

      {/* ── Related categories ────────────────────────────────── */}
      <section className="relative isolate overflow-hidden ipek-section">
        <SectionBackdrop src={backgroundWhite1} />
        <div aria-hidden className="lux-ambient" />
        <div aria-hidden className="lux-hairline top-0" />

        <div className="relative ipek-container">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <p className="ipek-label ipek-heading-label text-[10px] tracking-[0.28em]">
                Ontdek ook
              </p>
              <h2 className="mt-4 font-display text-[clamp(2rem,3.5vw,3rem)] leading-[1.12] text-[#1c1c1c]">
                Gerelateerde categorieën
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <LuxLinkButton to="/producten">Alle producten</LuxLinkButton>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {related.map((c, i) => (
              <CategoryCard key={c.slug} category={c} index={i} />
            ))}
          </div>
        </div>
      </section>

      <ProductHelpCta />
    </>
  );
}
