import { Link } from "@tanstack/react-router";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { AssortimentKlantCta } from "@/components/assortiment/AssortimentKlantCta";
import { MagneticButton } from "@/components/MagneticButton";
import {
  ASSORTIMENT_PRODUCTS,
  CATEGORY_LABELS,
  CATEGORY_STICKERS,
  type AssortimentProduct,
} from "@/lib/assortiment-products";
import {
  ONS_VERHAAL_ASSORTIMENT,
  ONS_VERHAAL_CAREERS,
  ONS_VERHAAL_CAREERS_IMAGE,
  ONS_VERHAAL_FEATURED_PRODUCTS,
  ONS_VERHAAL_HALAL,
  ONS_VERHAAL_HALAL_IMAGE,
  ONS_VERHAAL_HALAL_NORMEN_IMAGE,
  ONS_VERHAAL_HERO_FALLBACK,
  ONS_VERHAAL_HERO_VIDEO,
  ONS_VERHAAL_HIGHLIGHTS,
  ONS_VERHAAL_HISTORY,
  ONS_VERHAAL_HISTORY_IMAGE,
  ONS_VERHAAL_WORKFLOW,
} from "@/lib/ons-verhaal-content";
import { DS_EASE, DS_EASE_REVEAL } from "@/lib/design-system";
import backgroundBlack from "@/assets/background-black2.webp";

const featuredProducts = ONS_VERHAAL_FEATURED_PRODUCTS.map((title) =>
  ASSORTIMENT_PRODUCTS.find((p) => p.title === title),
).filter((p): p is AssortimentProduct => Boolean(p));

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

function TiltImage({
  src,
  alt,
  className = "",
  aspect = "aspect-[4/5]",
}: {
  src: string;
  alt: string;
  className?: string;
  aspect?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-5, 5]), { stiffness: 160, damping: 26 });
  const rotateX = useSpring(useTransform(my, [0, 1], [4, -4]), { stiffness: 160, damping: 26 });
  const glareX = useTransform(mx, (v) => `${v * 100}%`);
  const glareY = useTransform(my, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(600px 400px at ${glareX} ${glareY}, rgba(255,255,255,0.16) 0%, transparent 58%)`;

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
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
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group relative ${className}`}
      style={{ perspective: 1400 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative overflow-hidden rounded-[28px] border border-white/12 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9)]"
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: glare }}
        />
        <div className={`relative overflow-hidden ${aspect}`}>
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/55 via-transparent to-[#0a0a0a]/10" />
        </div>
      </motion.div>
    </div>
  );
}

function HighlightCard({
  item,
  index,
}: {
  item: (typeof ONS_VERHAAL_HIGHLIGHTS)[number];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: 0.85, delay: index * 0.05, ease: DS_EASE_REVEAL }}
      className="group relative overflow-hidden rounded-[22px] border border-white/10 bg-[#0c0c0c]/75"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={item.image}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(226,192,141,0.45)] to-transparent" />
      </div>
      <div className="p-6">
        <h3 className="font-display text-xl text-white transition-colors group-hover:text-[var(--primary)]">
          {item.title}
        </h3>
        <p className="mt-3 text-[13px] leading-relaxed text-white/52">{item.description}</p>
      </div>
    </motion.article>
  );
}

function ProductMiniCard({ product, index }: { product: AssortimentProduct; index: number }) {
  const sticker = CATEGORY_STICKERS[product.category];
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-4%" }}
      transition={{ duration: 0.7, delay: index * 0.04, ease: DS_EASE }}
      className="group relative overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.03]"
    >
      <div className="relative aspect-square overflow-hidden bg-[#111]">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.05]"
        />
      </div>
      <div className="flex items-start justify-between gap-3 p-4">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[rgba(226,192,141,0.75)]">
            {CATEGORY_LABELS[product.category]}
          </p>
          <p className="mt-1.5 font-display text-lg text-white">{product.title}</p>
        </div>
        <img src={sticker} alt="" aria-hidden className="h-7 w-7 shrink-0 opacity-70" />
      </div>
    </motion.div>
  );
}

export function OnsVerhaalPage() {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroContentY = useTransform(heroProgress, [0, 1], [0, 90]);
  const heroOpacity = useTransform(heroProgress, [0, 0.75], [1, 0]);

  const { scrollYProgress: gridProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(gridProgress, [0, 1], ["-6%", "6%"]);

  const titleWords = "Het verhaal van Ipekçi".split(" ");

  return (
    <>
      <section
        ref={heroRef}
        className="relative min-h-[92vh] overflow-hidden bg-[#030303] grain"
      >
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={ONS_VERHAAL_HERO_FALLBACK}
            className="h-full w-full object-cover"
            style={{ filter: "brightness(0.34) contrast(1.1) saturate(1.05)" }}
          >
            <source src={ONS_VERHAAL_HERO_VIDEO} type="video/mp4" />
          </video>
          <img
            src={ONS_VERHAAL_HERO_FALLBACK}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-0"
            loading="eager"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/35 via-[#030303]/68 to-[#030303]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_75%_15%,rgba(226,192,141,0.14),transparent_50%)]" />

        <motion.div
          style={{ y: reduceMotion ? 0 : heroContentY, opacity: reduceMotion ? 1 : heroOpacity }}
          className="relative mx-auto flex min-h-[92vh] max-w-[1480px] flex-col justify-end px-6 pb-16 pt-44 lg:px-10 lg:pb-20 lg:pt-52"
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
            <span className="text-white/80">Ons verhaal</span>
          </motion.nav>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 0.15, ease: DS_EASE }}
            className="mt-10 h-px w-24 origin-left bg-gradient-to-r from-[rgba(226,192,141,0.9)] to-transparent"
            aria-hidden
          />

          <p className="mt-8 ipek-label ipek-heading-label text-[10px] tracking-[0.32em]">
            Sinds 2012 · Harderwijk
          </p>

          <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.8rem,6vw,5.2rem)] leading-[0.98] text-white">
            {titleWords.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                initial={{ opacity: 0, y: 48, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, delay: 0.2 + i * 0.07, ease: DS_EASE_REVEAL }}
                className="mr-[0.22em] inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: DS_EASE }}
            className="mt-7 max-w-2xl text-base leading-[1.85] text-white/58 md:text-[17px]"
          >
            Een familiebedrijf met generaties kennis in de halalvleessector. Van onbedwelmd slacht
            tot gekoelde levering: premium Nederlands halalvlees met persoonlijke aandacht.
          </motion.p>
        </motion.div>
      </section>

      <section className="relative overflow-hidden border-y border-white/5 bg-[#050505] px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1480px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.9, ease: DS_EASE }}
            className="max-w-2xl"
          >
            <p className="ipek-label ipek-heading-label text-[10px] tracking-[0.28em]">
              Waarom Ipekçi
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,3.5vw,3rem)] text-white">
              Een premium standaard in elke stap
            </h2>
          </motion.div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {ONS_VERHAAL_HIGHLIGHTS.map((item, i) => (
              <HighlightCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#030303] px-6 py-24 grain lg:px-10 lg:py-36">
        <div className="mx-auto max-w-[1480px]">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 1, ease: DS_EASE_REVEAL }}
              className="lg:col-span-5"
            >
              <p className="ipek-label ipek-heading-label text-[10px] tracking-[0.28em]">
                {ONS_VERHAAL_HALAL.eyebrow}
              </p>
              <h2 className="mt-5 font-display text-[clamp(2.2rem,3.5vw,3.2rem)] text-white">
                {ONS_VERHAAL_HALAL.title}
              </h2>
              <div className="mt-8 space-y-5">
                {ONS_VERHAAL_HALAL.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)} className="text-[15px] leading-[1.85] text-white/58">
                    {p}
                  </p>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                {ONS_VERHAAL_HALAL.badges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-2 rounded-full border border-[rgba(226,192,141,0.22)] bg-[rgba(226,192,141,0.06)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[rgba(226,192,141,0.9)]"
                  >
                    <span className="h-1 w-1 rounded-full bg-[#B11217]" />
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 1.1, delay: 0.08, ease: DS_EASE_REVEAL }}
              className="lg:col-span-7"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <TiltImage src={ONS_VERHAAL_HALAL_IMAGE} alt="Halal certificaat" aspect="aspect-[4/5]" />
                <TiltImage
                  src={ONS_VERHAAL_HALAL_NORMEN_IMAGE}
                  alt="Islamitische normen en waarden"
                  aspect="aspect-[4/5]"
                  className="sm:mt-10"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-white/5 bg-[#050505] px-6 py-24 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-[1480px]">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: 48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 1, ease: DS_EASE_REVEAL }}
              className="lg:col-span-6 lg:order-2"
            >
              <TiltImage
                src={ONS_VERHAAL_HISTORY_IMAGE}
                alt={ONS_VERHAAL_HISTORY.title}
                aspect="aspect-[5/4]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 1, ease: DS_EASE_REVEAL }}
              className="lg:col-span-6 lg:sticky lg:top-32 lg:order-1"
            >
              <p className="ipek-label ipek-heading-label text-[10px] tracking-[0.28em]">
                {ONS_VERHAAL_HISTORY.eyebrow}
              </p>
              <h2 className="mt-5 font-display text-[clamp(2.2rem,3.5vw,3.2rem)] text-white">
                {ONS_VERHAAL_HISTORY.title}
              </h2>
              <div className="mt-8 space-y-5">
                {ONS_VERHAAL_HISTORY.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)} className="text-[15px] leading-[1.85] text-white/58">
                    {p}
                  </p>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                {ONS_VERHAAL_HISTORY.badges.map((badge) => (
                  <span
                    key={badge}
                    className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/42"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#030303] px-6 py-24 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-[1480px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.9, ease: DS_EASE }}
            className="max-w-3xl"
          >
            <p className="ipek-label ipek-heading-label text-[10px] tracking-[0.28em]">
              {ONS_VERHAAL_WORKFLOW.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,3.5vw,3rem)] text-white">
              {ONS_VERHAAL_WORKFLOW.title}
            </h2>
          </motion.div>

          <div className="relative mt-16 grid gap-6 lg:grid-cols-3">
            <div
              aria-hidden
              className="pointer-events-none absolute left-[16.5%] right-[16.5%] top-[52px] hidden h-px bg-gradient-to-r from-transparent via-[rgba(226,192,141,0.35)] to-transparent lg:block"
            />
            {ONS_VERHAAL_WORKFLOW.steps.map((step, i) => (
              <motion.article
                key={step.n}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-6%" }}
                transition={{ duration: 0.85, delay: i * 0.1, ease: DS_EASE_REVEAL }}
                className="relative rounded-[24px] border border-white/10 bg-[#0c0c0c]/80 p-8 lg:p-9"
              >
                <div className="flex items-center gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-[rgba(226,192,141,0.3)] bg-[rgba(226,192,141,0.08)] font-display text-lg text-[rgba(226,192,141,0.95)]">
                    {i + 1}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/38">
                    {step.n}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-2xl text-white">{step.title}</h3>
                <p className="mt-4 text-[14px] leading-[1.8] text-white/55">{step.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={gridRef}
        className="relative overflow-hidden px-6 py-24 lg:px-10 lg:py-36"
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ y: reduceMotion ? 0 : bgY }}
        >
          <img
            src={backgroundBlack}
            alt=""
            className="h-[110%] w-full object-cover opacity-90"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-[#030303]/82" />
        </motion.div>

        <div className="relative mx-auto max-w-[1480px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="ipek-label ipek-heading-label text-[10px] tracking-[0.28em]">
                Ons assortiment
              </p>
              <h2 className="mt-4 font-display text-[clamp(2rem,3.5vw,3rem)] text-white">
                Slacht van Ipekçi
              </h2>
            </div>
            <Link
              to="/assortiment"
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45 transition-colors hover:text-[rgba(226,192,141,0.9)]"
            >
              Bekijk assortiment
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {ONS_VERHAAL_ASSORTIMENT.map((cat, i) => (
              <motion.a
                key={cat.id}
                href={cat.href}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-6%" }}
                transition={{ duration: 0.85, delay: i * 0.08, ease: DS_EASE_REVEAL }}
                className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-[#0c0c0c]/70"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={cat.previewImage}
                    alt={cat.label}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
                </div>
                <div className="flex items-start justify-between gap-4 p-7">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[rgba(226,192,141,0.8)]">
                      {cat.eyebrow}
                    </p>
                    <h3 className="mt-2 font-display text-2xl text-white">{cat.label}</h3>
                    <p className="mt-3 text-[13px] leading-relaxed text-white/52">{cat.description}</p>
                  </div>
                  <img src={cat.stickerSrc} alt="" aria-hidden className="h-9 w-9 shrink-0 opacity-75" />
                </div>
                <span className="flex items-center gap-1.5 px-7 pb-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38 transition-colors group-hover:text-[rgba(226,192,141,0.9)]">
                  Lees meer
                  <ArrowUpRight size={12} />
                </span>
              </motion.a>
            ))}
          </div>

          <ScrollLine />

          <div className="mt-20 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="ipek-label ipek-heading-label text-[10px] tracking-[0.28em]">
                Eindproducten
              </p>
              <h2 className="mt-4 font-display text-[clamp(2rem,3.5vw,3rem)] text-white">
                Premium kwaliteit
              </h2>
              <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-white/52">
                Onze eindproducten worden gemaakt van ons eigen halalvlees. Kebabstaafjes, hamburgers,
                kipburgers en meer voor supermarkten, slagerijen en restaurants.
              </p>
            </div>
            <Link
              to="/assortiment/eindproducten"
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45 transition-colors hover:text-[rgba(226,192,141,0.9)]"
            >
              Alle producten
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
            {featuredProducts.map((product, i) => (
              <ProductMiniCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/5 bg-[#050505] px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1480px]">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 1, ease: DS_EASE_REVEAL }}
              className="lg:col-span-5"
            >
              <p className="ipek-label ipek-heading-label text-[10px] tracking-[0.28em]">
                {ONS_VERHAAL_CAREERS.eyebrow}
              </p>
              <h2 className="mt-5 font-display text-[clamp(2rem,3.5vw,3rem)] text-white">
                {ONS_VERHAAL_CAREERS.title}
              </h2>
              <p className="mt-6 text-[15px] leading-[1.85] text-white/58">{ONS_VERHAAL_CAREERS.text}</p>
              <p className="mt-6 font-display text-xl text-white/80">
                Verwelkomen we ook jou binnenkort?
              </p>
              <div className="mt-10">
                <MagneticButton href="/contact">
                  {ONS_VERHAAL_CAREERS.cta}
                  <ArrowUpRight size={14} />
                </MagneticButton>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 1.1, delay: 0.08, ease: DS_EASE_REVEAL }}
              className="lg:col-span-7"
            >
              <TiltImage
                src={ONS_VERHAAL_CAREERS_IMAGE}
                alt="Werken bij Ipekçi"
                aspect="aspect-[16/10]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <AssortimentKlantCta />
    </>
  );
}
