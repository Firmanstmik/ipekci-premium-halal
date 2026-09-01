import {

  CategoryCard,

  LuxLinkButton,

  PrimaryLinkButton,

  ProductCinematicHero,

  ProductHelpCta,

  Reveal,

} from "@/components/producten/ProductPrimitives";

import { ProductBesteProductenSection } from "@/components/producten/ProductBesteProductenSection";
import { ProductMobileStickyBar } from "@/components/producten/ProductMobileStickyBar";

import { ProductStatsRail } from "@/components/producten/ProductOfficialSections";

import {

  PRODUCT_CATEGORIES,

  type ProductCategory,

} from "@/lib/producten-content";



export function ProductCategoryPage({ category }: { category: ProductCategory }) {

  const related = PRODUCT_CATEGORIES.filter((c) => c.slug !== category.slug).slice(0, 4);

  const productCount = category.products.length;



  const packagingFormats = Array.from(

    new Set(category.products.map((p) => p.packaging).filter(Boolean) as string[]),

  );

  const states = Array.from(

    new Set(category.products.map((p) => p.state).filter(Boolean) as string[]),

  );



  return (
    <div className="pr-category-page">
      <ProductCinematicHero

        image={category.heroImage}

        eyebrow={category.eyebrow}

        title={category.label}

        lede={category.summary}

        breadcrumb={[{ label: "Producten", to: "/producten" }, { label: category.breadcrumbLabel }]}

        meta={[

          { value: String(productCount), label: productCount === 1 ? "Product" : "Producten" },

          { value: "NVWA", label: "Normen" },

          { value: "24/7", label: "Service" },

        ]}

      >

        <PrimaryLinkButton href="#assortiment">

          <span className="hidden sm:inline">

            {productCount === 1 ? "Bekijk product" : "Bekijk producten"}

          </span>

          <span className="sm:hidden">Producten</span>

        </PrimaryLinkButton>

        <LuxLinkButton to="/contact" tone="dark">

          <span className="hidden sm:inline">Offerte aanvragen</span>

          <span className="sm:hidden">Offerte</span>

        </LuxLinkButton>

      </ProductCinematicHero>



      <ProductBesteProductenSection

        category={category}

        packagingFormats={packagingFormats}

        states={states}

      />



      <ProductStatsRail />



      <section className="relative isolate overflow-hidden bg-[#030303] ipek-section grain">

        <div aria-hidden className="lux-ambient lux-ambient--dark" />

        <div aria-hidden className="lux-hairline top-0 opacity-20" />



        <div className="relative ipek-container">

          <div className="flex flex-wrap items-end justify-between gap-6">

            <Reveal>

              <p className="ipek-label ipek-heading-label text-[10px] tracking-[0.28em] text-[#DA292A]">

                Ontdek ook

              </p>

              <h2 className="mt-4 font-display text-[clamp(2rem,3.5vw,3rem)] leading-[1.12] text-white">

                Gerelateerde categorieën

              </h2>

            </Reveal>

            <Reveal delay={0.1}>

              <LuxLinkButton to="/producten" tone="dark">

                Alle producten

              </LuxLinkButton>

            </Reveal>

          </div>



          <div className="pr-related__track mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">

            {related.map((c, i) => (

              <CategoryCard key={c.slug} category={c} index={i} />

            ))}

          </div>

        </div>

      </section>



      <ProductHelpCta image={category.heroImage} />

      <ProductMobileStickyBar productCount={productCount} />
    </div>
  );

}


