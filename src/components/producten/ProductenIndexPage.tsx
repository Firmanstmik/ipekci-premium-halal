import { AyatSectionBadge } from "@/components/home/AyatSectionBadge";
import {
  CategoryCard,
  LuxLinkButton,
  PrimaryLinkButton,
  ProductAssurances,
  ProductCertification,
  ProductHelpCta,
  ProductHero,
  ProductOrderSteps,
  Reveal,
} from "@/components/producten/ProductPrimitives";
import { PRODUCTEN_INDEX, PRODUCT_CATEGORIES, TOTAL_PRODUCT_COUNT } from "@/lib/producten-content";
import backgroundWhite1 from "@/assets/background-white1.webp";
import backgroundWhite3 from "@/assets/background-white3.webp";

/** Decorative full-bleed backdrop shared by the light sections. */
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

export function ProductenIndexPage() {
  return (
    <>
      <ProductHero
        image={PRODUCTEN_INDEX.heroImage}
        eyebrow={PRODUCTEN_INDEX.eyebrow}
        title={PRODUCTEN_INDEX.title}
        lede={PRODUCTEN_INDEX.lede}
        breadcrumb={[{ label: PRODUCTEN_INDEX.breadcrumb }]}
        badge="100% Halal · ECC Halal"
        meta={[
          { value: String(PRODUCT_CATEGORIES.length), label: "Categorieën" },
          { value: String(TOTAL_PRODUCT_COUNT), label: "Producten" },
          { value: "24/7", label: "Service" },
        ]}
      >
        <PrimaryLinkButton href="#categorieen">Bekijk categorieën</PrimaryLinkButton>
        <LuxLinkButton to="/contact" tone="dark">
          Offerte aanvragen
        </LuxLinkButton>
      </ProductHero>

      {/* ── Categories ────────────────────────────────────────── */}
      <section
        id="categorieen"
        className="relative isolate overflow-hidden px-6 py-24 lg:px-10 lg:py-32"
      >
        <SectionBackdrop src={backgroundWhite1} />
        <div aria-hidden className="lux-ambient" />
        <div aria-hidden className="lux-hairline top-0" />

        <div className="relative mx-auto max-w-[1200px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal className="max-w-2xl">
              <AyatSectionBadge kicker="Assortiment" title="Ayat Food" />
              <h2 className="mt-5 font-display text-[clamp(2rem,3.5vw,3rem)] leading-[1.12] text-[#1c1c1c]">
                Acht categorieën, één standaard
              </h2>
              <p className="mt-5 text-[15px] leading-[1.85] text-[#5a5a5a]">
                {PRODUCTEN_INDEX.quality}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <LuxLinkButton to="/contact">Vraag het assortiment op</LuxLinkButton>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6">
            {PRODUCT_CATEGORIES.map((category, i) => (
              <CategoryCard key={category.slug} category={category} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Quality assurances ────────────────────────────────── */}
      <section className="relative isolate overflow-hidden px-6 py-24 lg:px-10 lg:py-32">
        <SectionBackdrop src={backgroundWhite3} />
        <div aria-hidden className="lux-ambient" />

        <div className="relative mx-auto max-w-[1200px]">
          <Reveal className="max-w-2xl">
            <p className="ipek-label ipek-heading-label text-[10px] tracking-[0.28em]">
              Kwaliteitsgarantie
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,3.5vw,3rem)] leading-[1.12] text-[#1c1c1c]">
              Waarom afnemers voor ons kiezen
            </h2>
          </Reveal>

          <div className="mt-14">
            <ProductAssurances />
          </div>
        </div>
      </section>

      {/* ── Certification ─────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden px-6 py-24 lg:px-10 lg:py-32">
        <SectionBackdrop src={backgroundWhite1} />
        <div aria-hidden className="lux-ambient" />
        <div aria-hidden className="lux-hairline top-0" />

        <div className="relative mx-auto max-w-[1200px]">
          <ProductCertification image={PRODUCTEN_INDEX.backdrop} />
        </div>
      </section>

      {/* ── Ordering process ──────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[#070707] px-6 py-24 grain lg:px-10 lg:py-32">
        <div aria-hidden className="lux-ambient lux-ambient--dark" />
        <div aria-hidden className="lux-hairline top-0" />

        <div className="relative mx-auto max-w-[1200px]">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <Reveal className="lg:col-span-7">
              <AyatSectionBadge kicker="Hoe we werken" title="Ayat Food" tone="dark" />
              <h2 className="mt-5 font-display text-[clamp(2rem,3.5vw,3rem)] leading-[1.12] text-[#F8F4EE]">
                Hoe vlees te bestellen
              </h2>
            </Reveal>
            <Reveal className="lg:col-span-5" delay={0.12}>
              <p className="max-w-[42ch] text-[15px] leading-[1.8] text-white/68 lg:ml-auto lg:text-right">
                Onze medewerkers en bezorgers staan 24/7 klaar om uw vragen te beantwoorden en uw
                bestellingen op tijd te leveren.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 lg:mt-16">
            <ProductOrderSteps />
          </div>
        </div>
      </section>

      <ProductHelpCta />
    </>
  );
}
