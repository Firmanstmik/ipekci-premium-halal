import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ChefHat,
  ChevronDown,
  Drumstick,
  Leaf,
  Package,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { ProductRegistrationCta } from "@/components/producten/ProductOfficialSections";
import { ProductTrustRibbon, Reveal } from "@/components/producten/ProductPrimitives";
import { DS_EASE_REVEAL } from "@/lib/design-system";
import {
  PRODUCT_CATEGORY_FEATURES,
  PRODUCT_SECTION_BACKGROUNDS,
  type Product,
  type ProductCategory,
} from "@/lib/producten-content";

const FEATURE_ICONS = [Drumstick, ShieldCheck, Leaf, ChefHat] as const;

function packagingChipMeta(label: string) {
  const lower = label.toLowerCase();
  if (lower.includes("bevroren")) return { icon: Snowflake, accent: "cold" as const };
  if (lower.includes("vers")) return { icon: Leaf, accent: "fresh" as const };
  return { icon: Package, accent: "pack" as const };
}

function CatalogPackagingCta({
  packagingFormats,
  states,
}: {
  packagingFormats: readonly string[];
  states: readonly string[];
}) {
  const chips = [...packagingFormats, ...states];
  const [activeChip, setActiveChip] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className="pr-beste-producten__catalog-foot"
      initial={reducedMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: 0.75, ease: DS_EASE_REVEAL }}
    >
      <div className="pr-beste-producten__foot-panel">
        <div className="pr-beste-producten__foot-panel-glow" aria-hidden />
        <div className="pr-beste-producten__foot-panel-shine" aria-hidden />

        <div className="pr-beste-producten__foot-panel-inner">
          {chips.length > 0 && (
            <div className="pr-beste-producten__packaging">
              <div className="pr-beste-producten__packaging-head">
                <span className="pr-beste-producten__packaging-icon" aria-hidden>
                  <Truck size={15} strokeWidth={1.6} />
                </span>
                <p className="pr-beste-producten__packaging-label">Verpakking &amp; levering</p>
                <span className="pr-beste-producten__packaging-rule" aria-hidden />
              </div>

              <ul className="pr-beste-producten__packaging-chips">
                {chips.map((label, i) => {
                  const { icon: ChipIcon, accent } = packagingChipMeta(label);
                  const isActive = activeChip === label;

                  return (
                    <motion.li
                      key={label}
                      initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.55, delay: i * 0.06, ease: DS_EASE_REVEAL }}
                    >
                      <button
                        type="button"
                        className={`pr-beste-producten__pack-chip${isActive ? " is-active" : ""}`}
                        data-accent={accent}
                        aria-pressed={isActive}
                        onMouseEnter={() => setActiveChip(label)}
                        onMouseLeave={() => setActiveChip(null)}
                        onFocus={() => setActiveChip(label)}
                        onBlur={() => setActiveChip(null)}
                      >
                        <span className="pr-beste-producten__pack-chip-icon" aria-hidden>
                          <ChipIcon size={14} strokeWidth={1.65} />
                        </span>
                        <span className="pr-beste-producten__pack-chip-label">{label}</span>
                        <span className="pr-beste-producten__pack-chip-check" aria-hidden>
                          <Sparkles size={10} strokeWidth={2} />
                        </span>
                      </button>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          )}

          <div className="pr-beste-producten__foot-divider" aria-hidden />

          <ProductRegistrationCta className="pr-beste-producten__catalog-cta" tone="dark" />
        </div>
      </div>
    </motion.div>
  );
}

function MockupCatalogRow({ product, index }: { product: Product; index: number }) {
  const [open, setOpen] = useState(false);
  const hasBody = product.paragraphs.length > 0;

  return (
    <li className={`pr-beste-producten__catalog-item${open ? " is-open" : ""}`}>
      <div className="pr-beste-producten__catalog-card">
        {hasBody ? (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`pr-beste-producten__catalog-row${open ? " is-open" : ""}`}
            aria-expanded={open}
          >
            <span className="pr-beste-producten__catalog-num">{String(index + 1).padStart(2, "0")}</span>
            <span className="pr-beste-producten__catalog-name">{product.name}</span>
            <ChevronDown size={15} className={`pr-beste-producten__catalog-chevron${open ? " is-open" : ""}`} />
          </button>
        ) : (
          <div className="pr-beste-producten__catalog-row pr-beste-producten__catalog-row--static">
            <span className="pr-beste-producten__catalog-num">{String(index + 1).padStart(2, "0")}</span>
            <span className="pr-beste-producten__catalog-name">{product.name}</span>
          </div>
        )}

        <AnimatePresence initial={false}>
          {open && hasBody && (
            <motion.div
              key="body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.42, ease: DS_EASE_REVEAL }}
              className="pr-beste-producten__catalog-body-wrap"
            >
              <div className="pr-beste-producten__catalog-body">
                <span className="pr-beste-producten__catalog-body-rule" aria-hidden />
                <p className="pr-beste-producten__catalog-body-eyebrow">{product.name}</p>
                {product.paragraphs.map((p, i) => (
                  <p key={i} className={i === 0 ? "pr-beste-producten__catalog-body-lead" : undefined}>
                    {p}
                  </p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </li>
  );
}

export function ProductBesteProductenSection({
  category,
  packagingFormats,
  states,
}: {
  category: ProductCategory;
  packagingFormats: readonly string[];
  states: readonly string[];
}) {
  const features = PRODUCT_CATEGORY_FEATURES[category.slug];
  const productCount = category.products.length;
  const sectionBg = PRODUCT_SECTION_BACKGROUNDS[category.slug];

  return (
    <div className="pr-intro-stack relative z-[1]">
      <section className="pr-beste-producten relative overflow-hidden pt-16 sm:pt-20 lg:min-h-[min(820px,92vh)] lg:pt-24">
        <div className="pr-beste-producten__backdrop" aria-hidden>
          <img
            src={sectionBg}
            alt=""
            className="pr-beste-producten__backdrop-img"
            loading="lazy"
            decoding="async"
          />
          <div className="pr-beste-producten__backdrop-fade" />
          <div className="pr-beste-producten__backdrop-scrim" />
        </div>

        <div className="relative z-10 mx-auto max-w-[min(100%,1480px)] px-[var(--ipek-gutter)] sm:px-[var(--ipek-gutter-sm)] lg:px-[var(--ipek-gutter-lg)] xl:px-[var(--ipek-gutter-xl)]">
          <div className="pr-beste-producten__grid pb-16 sm:pb-20 lg:pb-24">
            <Reveal className="pr-beste-producten__copy">
              <div className="flex items-center gap-2.5">
                <Star size={14} className="fill-[#C6A062] text-[#C6A062]" strokeWidth={1.5} />
                <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#DA292A]">
                  Beste producten
                </p>
              </div>

              <h2 className="mt-5 font-display text-[clamp(2.6rem,4.8vw,4rem)] leading-[0.98] tracking-[-0.04em] text-[#141414]">
                {category.label}
              </h2>

              <div className="mt-5 flex items-center gap-3" aria-hidden>
                <span className="h-px w-10 bg-[linear-gradient(90deg,rgba(198,160,98,0.8),transparent)]" />
                <Sparkles size={12} className="text-[#C6A062]" />
                <span className="h-px w-10 bg-[linear-gradient(270deg,rgba(198,160,98,0.8),transparent)]" />
              </div>

              <div className="mt-8 space-y-5">
                {category.intro.map((p, i) => (
                  <p key={i} className="max-w-[52ch] text-[15px] leading-[1.92] text-[#454545]">
                    {p}
                  </p>
                ))}
              </div>

              <div className="pr-beste-producten__features mt-8 overflow-hidden rounded-[22px] border border-[#141414]/08 bg-[#121212] p-5 shadow-[0_28px_80px_-40px_rgba(0,0,0,0.55)] sm:p-6">
                <div className="grid grid-cols-2 gap-4 xl:grid-cols-4 xl:gap-4">
                  {features.map((feature, i) => {
                    const Icon = FEATURE_ICONS[i] ?? ShieldCheck;
                    return (
                      <motion.div
                        key={feature.id}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-8%" }}
                        transition={{ duration: 0.7, delay: i * 0.06, ease: DS_EASE_REVEAL }}
                        className="pr-beste-producten__feature"
                      >
                        <span className="pr-beste-producten__feature-icon">
                          <Icon size={18} strokeWidth={1.6} />
                        </span>
                        <p className="pr-beste-producten__feature-title">{feature.title}</p>
                        <p className="pr-beste-producten__feature-text">{feature.text}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="pr-beste-producten__catalog">
              <p className="pr-beste-producten__catalog-label">
                {productCount} {productCount === 1 ? "product" : "producten"}
              </p>
              <ul id="assortiment" className="pr-beste-producten__catalog-list">
                {category.products.map((product, i) => (
                  <MockupCatalogRow key={product.id} product={product} index={i} />
                ))}
              </ul>
              <CatalogPackagingCta packagingFormats={packagingFormats} states={states} />
            </Reveal>
          </div>
        </div>
      </section>

      <div className="relative z-30 -mt-10 px-4 sm:-mt-14 sm:px-6 lg:-mt-16">
        <div className="mx-auto max-w-[min(100%,960px)]">
          <ProductTrustRibbon />
        </div>
      </div>
    </div>
  );
}
