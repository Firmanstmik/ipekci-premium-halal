import {

  CategoryCard,

  LuxLinkButton,

  ProductHelpCta,

  ProductPageHeader,

  ProductSpotlight,

  ProductTrustBar,

  Reveal,

} from "@/components/producten/ProductPrimitives";

import {

  ProductAssurancesSection,

  ProductStarRating,

} from "@/components/producten/ProductOfficialSections";

import {

  PRODUCTEN_INDEX,

  PRODUCTEN_SPOTLIGHT,

  PRODUCT_CATEGORIES,

} from "@/lib/producten-content";



export function ProductenIndexPage() {
  return (
    <div className="pr-index-page">
      <ProductPageHeader
        title={PRODUCTEN_INDEX.title}
        breadcrumb={[{ label: PRODUCTEN_INDEX.breadcrumb }]}
        image={PRODUCTEN_INDEX.backdrop}
      />



      <ProductTrustBar />



      {/* ── Categories ────────────────────────────────────────── */}

      <section id="categorieen" className="relative isolate overflow-hidden bg-[#030303] pt-8 ipek-section grain sm:pt-12">

        <div aria-hidden className="lux-ambient lux-ambient--dark" />

        <div aria-hidden className="lux-hairline top-0 opacity-20" />



        <div className="relative ipek-container">

          <div className="flex flex-wrap items-end justify-between gap-6">

            <Reveal className="max-w-2xl">

              <p className="ipek-label ipek-heading-label text-[10px] tracking-[0.28em] text-[#DA292A]">

                Aanbevolen voor jou

              </p>

              <h2 className="mt-4 font-display text-[clamp(2rem,3.5vw,3rem)] leading-[1.12] text-white">

                Ons assortiment

              </h2>

              <p className="mt-5 text-[15px] leading-[1.85] text-white/58">

                {PRODUCTEN_INDEX.quality}

              </p>

              <ProductStarRating className="mt-5" />

            </Reveal>

            <Reveal delay={0.1}>

              <LuxLinkButton to="/contact" tone="dark">

                Vraag het assortiment op

              </LuxLinkButton>

            </Reveal>

          </div>



          <div className="app-hscroll-track pr-index__categories mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6">

            {PRODUCT_CATEGORIES.map((category, i) => (

              <CategoryCard key={category.slug} category={category} index={i} />

            ))}

          </div>

        </div>

      </section>



      <ProductAssurancesSection />



      {/* ── Speciale aanbiedingen ───────────────────────────────── */}

      <section className="relative isolate overflow-hidden bg-[#F8F4EE] ipek-section">

        <div aria-hidden className="lux-hairline top-0 opacity-30" />



        <div className="relative ipek-container">

          <ProductSpotlight

            eyebrow={PRODUCTEN_SPOTLIGHT.eyebrow}

            title={PRODUCTEN_SPOTLIGHT.title}

            lede={PRODUCTEN_SPOTLIGHT.lede}

            items={PRODUCTEN_SPOTLIGHT.items}

          />

        </div>

      </section>



      <ProductHelpCta />
    </div>
  );

}


