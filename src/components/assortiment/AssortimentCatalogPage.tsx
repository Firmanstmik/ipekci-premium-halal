import { Link } from "@tanstack/react-router";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { ArrowDown, ArrowUpRight, ChevronRight } from "lucide-react";
import { AssortimentKlantCta } from "@/components/assortiment/AssortimentKlantCta";
import {
  ASSORTIMENT_CATEGORIES,
  ASSORTIMENT_MEGA_MENU,
} from "@/lib/assortiment-content";
import {
  ASSORTIMENT_PRODUCTS,
  CATEGORY_LABELS,
  CATEGORY_STICKERS,
  type AssortimentCategoryId,
  type AssortimentProduct,
} from "@/lib/assortiment-products";
import { DS_EASE, DS_EASE_REVEAL } from "@/lib/design-system";
import backgroundWhite3 from "@/assets/background-white3.webp";

const gridContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
};

const gridItem = {
  hidden: { opacity: 0, y: 48, scale: 0.9, rotateX: 12 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { duration: 0.9, ease: DS_EASE_REVEAL },
  },
};

function ScrollLine() {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 1.2, ease: DS_EASE }}
      className="h-px w-full origin-left bg-gradient-to-r from-transparent via-[rgba(226,192,141,0.55)] to-transparent"
      aria-hidden
    />
  );
}

function CategoryTabs({ active }: { active: AssortimentCategoryId | "all" }) {
  const tabs: { id: AssortimentCategoryId | "all"; label: string }[] = [
    { id: "all", label: "Alle producten" },
    ...ASSORTIMENT_CATEGORIES.map((c) => ({ id: c.id, label: c.label })),
  ];

  return (
    <div className="flex flex-wrap gap-2.5">
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        const linkClass = `relative inline-flex items-center gap-2 overflow-hidden rounded-full border px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] transition-all duration-500 ${
          isActive
            ? "border-[rgba(226,192,141,0.45)] text-[#111]"
            : "border-black/10 bg-white/70 text-[#555] backdrop-blur-md hover:border-[rgba(198,160,98,0.45)] hover:text-[#111]"
        }`;

        const sticker =
          tab.id !== "all" ? (
            <img
              src={CATEGORY_STICKERS[tab.id]}
              alt=""
              aria-hidden
              className="relative z-10 h-3.5 w-3.5"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          ) : null;

        const inner = (
          <>
            {isActive ? (
              <motion.span
                layoutId="assortiment-tab-pill"
                className="absolute inset-0 bg-white"
                transition={{ type: "spring", stiffness: 400, damping: 34 }}
                aria-hidden
              />
            ) : null}
            <span className="relative z-10 flex items-center gap-2">
              {sticker}
              {tab.label}
            </span>
          </>
        );

        if (tab.id === "all") {
          return (
            <Link key={tab.id} to="/assortiment" className={linkClass}>
              {inner}
            </Link>
          );
        }

        return (
          <Link
            key={tab.id}
            to="/assortiment/$category"
            params={{ category: tab.id }}
            className={linkClass}
          >
            {inner}
          </Link>
        );
      })}
    </div>
  );
}

function ProductCard({ product, index }: { product: AssortimentProduct; index: number }) {
  const sticker = CATEGORY_STICKERS[product.category];
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 200, damping: 24 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 200, damping: 24 });
  const glareX = useTransform(mx, (v) => `${v * 100}%`);
  const glareY = useTransform(my, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(480px 300px at ${glareX} ${glareY}, rgba(255,255,255,0.65) 0%, transparent 55%)`;

  function onMove(e: React.MouseEvent<HTMLElement>) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }

  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.article
      ref={ref}
      variants={gridItem}
      custom={index}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      className="group relative flex flex-col overflow-hidden rounded-[26px] bg-white shadow-[0_28px_70px_-36px_rgba(0,0,0,0.75)] ring-1 ring-black/5 transition-shadow duration-500 hover:shadow-[0_40px_90px_-32px_rgba(0,0,0,0.82),0_0_0_1px_rgba(226,192,141,0.25)]"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: glare }}
        aria-hidden
      />

      <div className="relative px-6 pb-1 pt-6">
        <div className="flex items-center gap-2">
          <img
            src={sticker}
            alt=""
            aria-hidden
            className="h-4 w-4 shrink-0"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#B11217]">
            {CATEGORY_LABELS[product.category]}
          </span>
        </div>
        <h3 className="mt-4 text-center font-display text-[1.75rem] italic leading-[1.15] text-[#6E0609]">
          {product.title}
        </h3>
      </div>

      <div className="relative mt-auto flex min-h-[220px] flex-1 items-end justify-center overflow-hidden bg-gradient-to-b from-white to-[#FAFAFA] px-5 pb-6 pt-3">
        <motion.img
          src={product.image}
          alt={product.title}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className="relative z-[1] max-h-[200px] w-full object-contain object-bottom"
          whileHover={{ scale: 1.08, y: -10 }}
          transition={{ duration: 0.55, ease: DS_EASE }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-10 bottom-2 h-14 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(177,18,23,0.14),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </div>
    </motion.article>
  );
}

export function AssortimentCatalogPage({
  activeCategory,
}: {
  activeCategory: AssortimentCategoryId | "all";
}) {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const productsRef = useRef<HTMLElement>(null);

  const categoryMeta =
    activeCategory === "all"
      ? null
      : ASSORTIMENT_CATEGORIES.find((c) => c.id === activeCategory);

  const products =
    activeCategory === "all"
      ? ASSORTIMENT_PRODUCTS
      : ASSORTIMENT_PRODUCTS.filter((p) => p.category === activeCategory);

  const pageTitle =
    activeCategory === "all" ? "Ons assortiment" : (categoryMeta?.label ?? "Assortiment");

  const pageDescription =
    activeCategory === "all"
      ? "Het complete aanbod premium halalvlees en eindproducten van Ipekçi Slachterij. Voor slagerijen, groothandels, supermarkten en restaurants."
      : categoryMeta?.description;

  const heroImage =
    activeCategory === "all"
      ? ASSORTIMENT_MEGA_MENU.allProductsPreviewImage
      : (categoryMeta?.previewImage ?? categoryMeta?.heroImage);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(heroProgress, [0, 1], ["0%", "28%"]);
  const heroContentY = useTransform(heroProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(heroProgress, [0, 0.75], [1, 0]);

  const { scrollYProgress: productsProgress } = useScroll({
    target: productsRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(productsProgress, [0, 1], ["-8%", "8%"]);

  const titleWords = pageTitle.split(" ");

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[88vh] overflow-hidden bg-[#030303] grain"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={heroImage}
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.25, ease: DS_EASE }}
            className="absolute inset-0"
            style={{ y: reduceMotion ? 0 : heroImageY }}
          >
            <motion.img
              src={heroImage}
              alt=""
              aria-hidden
              className="h-[115%] w-full object-cover"
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
              animate={reduceMotion ? undefined : { scale: [1, 1.08] }}
              transition={{ duration: 22, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
              style={{ filter: "brightness(0.38) contrast(1.12) saturate(1.1)" }}
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/55 via-[#030303]/25 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_75%_15%,rgba(226,192,141,0.16),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_10%_90%,rgba(177,18,23,0.18),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-[#030303] via-[#030303]/82 to-transparent" />

        <motion.div
          style={{ y: reduceMotion ? 0 : heroContentY, opacity: reduceMotion ? 1 : heroOpacity }}
          className="relative mx-auto flex min-h-[88vh] max-w-[1480px] flex-col justify-end px-6 pb-20 pt-40 lg:px-10 lg:pb-24 lg:pt-48"
        >
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: DS_EASE }}
            className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-white/42"
          >
            <Link to="/" className="transition-colors hover:text-[rgba(226,192,141,0.95)]">
              Home
            </Link>
            <ChevronRight size={12} className="text-white/22" />
            {activeCategory === "all" ? (
              <span className="text-white/80">Assortiment</span>
            ) : (
              <>
                <Link to="/assortiment" className="transition-colors hover:text-[rgba(226,192,141,0.95)]">
                  Assortiment
                </Link>
                <ChevronRight size={12} className="text-white/22" />
                <span className="text-white/80">{pageTitle}</span>
              </>
            )}
          </motion.nav>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 0.15, ease: DS_EASE }}
            className="mt-10 h-px w-24 origin-left bg-gradient-to-r from-[rgba(226,192,141,0.9)] to-transparent"
            aria-hidden
          />

          <div className="mt-8 max-w-4xl">
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0.34em" }}
              transition={{ duration: 1, delay: 0.2, ease: DS_EASE }}
              className="ipek-label ipek-heading-label text-[10px]"
            >
              {activeCategory === "all" ? "Assortiment" : (categoryMeta?.eyebrow ?? "Categorie")}
            </motion.p>

            <h1 className="mt-6 overflow-hidden font-display text-[clamp(2.8rem,7vw,5.2rem)] leading-[0.95] text-white">
              {titleWords.map((word, i) => (
                <span key={`${word}-${i}`} className="mr-[0.28em] inline-block overflow-hidden">
                  <motion.span
                    initial={{ y: "110%", rotateX: 40 }}
                    animate={{ y: 0, rotateX: 0 }}
                    transition={{
                      duration: 1,
                      delay: 0.28 + i * 0.09,
                      ease: DS_EASE_REVEAL,
                    }}
                    className="inline-block origin-bottom"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            {pageDescription ? (
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.55, ease: DS_EASE }}
                className="mt-8 max-w-2xl text-base leading-[1.8] text-white/72 md:text-lg"
              >
                {pageDescription}
              </motion.p>
            ) : null}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.68, ease: DS_EASE }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/14 bg-white/[0.07] px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/78 backdrop-blur-xl">
                <motion.span
                  animate={{ scale: [1, 1.35, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  className="h-2 w-2 rounded-full bg-[rgba(226,192,141,0.95)]"
                />
                {products.length} producten
              </span>
              <a
                href="#productoverzicht"
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(226,192,141,0.35)] bg-[rgba(226,192,141,0.08)] px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[rgba(226,192,141,0.95)] transition-colors hover:bg-[rgba(226,192,141,0.14)]"
              >
                Bekijk collectie
                <ArrowDown size={14} />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 lg:flex"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.28em] text-white/35"
            >
              Scroll
              <ArrowDown size={14} />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Productoverzicht ───────────────────────────────── */}
      <section
        id="productoverzicht"
        ref={productsRef}
        className="relative z-10 overflow-hidden px-6 py-20 lg:px-10 lg:py-28"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-[linear-gradient(90deg,transparent,rgba(198,160,98,0.42),transparent)]"
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ y: reduceMotion ? 0 : bgY }}
        >
          <img
            src={backgroundWhite3}
            alt=""
            className="h-full w-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(226,192,141,0.06),transparent_55%)]" />

        <div className="relative mx-auto max-w-[1480px]">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease: DS_EASE_REVEAL }}
          >
            <CategoryTabs active={activeCategory} />
          </motion.div>

          <div className="mt-16">
            <ScrollLine />
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.85, delay: 0.1, ease: DS_EASE }}
              className="mt-10 flex flex-wrap items-end justify-between gap-6"
            >
              <div>
                <p className="ipek-label ipek-heading-label text-[10px] tracking-[0.32em]">
                  Productoverzicht
                </p>
                <h2 className="mt-4 font-display text-3xl text-[#1c1c1c] md:text-4xl">
                  Selectie uit ons slachthuis
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#666]">
                  Zelfde kwaliteit als op de vloer bij Ipekçi. Vers, halal en constant geleverd.
                </p>
              </div>
              <a
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#555] backdrop-blur-md transition-all hover:border-[rgba(198,160,98,0.45)] hover:text-[#111]"
              >
                Vraag beschikbaarheid
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </motion.div>
          </div>

          <motion.div
            key={activeCategory}
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-5%" }}
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            style={{ perspective: 1400 }}
          >
            {products.map((item, index) => (
              <ProductCard key={item.id} product={item} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      <AssortimentKlantCta />
    </>
  );
}
