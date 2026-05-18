import { createFileRoute, Link } from "@tanstack/react-router";
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
import {
  ArrowRight,
  ArrowUpRight,
  Beef,
  ChefHat,
  Check,
  Package,
  ShieldCheck,
  Store,
  Truck,
} from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { SectionHeader } from "@/components/SectionHeader";
import { MagneticButton } from "@/components/MagneticButton";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import ipekciIntroVideo from "@/assets/videos/Ipekci_introductie.webm";
import islamitischeNormenWaardenImage from "@/assets/Islamitische-normen-en-waarden.webp";
import assortmentLamsvleesImage from "@/assets/Ons assortiment - dombaa.avif";
import assortmentRundvleesImage from "@/assets/Ons assortiment - sapi.avif";
import assortmentKipImage from "@/assets/Ons assortiment - ayam.avif";
import productenImage from "@/assets/producten.avif";
import assortimentLamsvleesHeroImage from "@/assets/assortiment-lamsvlees.webp";
import assortimentRundvleesHeroImage from "@/assets/Assortiment-rundvlees.webp";
import assortimentKipHeroImage from "@/assets/assortiment-Kip.webp";

const STICKER_GOLD_FILTER =
  "sepia(1) saturate(520%) hue-rotate(352deg) brightness(0.66) contrast(1.12) drop-shadow(0 10px 22px rgba(194,139,82,0.12))";

const HERO_STICKERS = {
  lamsvlees: "https://www.ipekcislachterij.nl/wp-content/uploads/2025/11/sticker_lamsvlees.svg",
  rundvlees: "https://www.ipekcislachterij.nl/wp-content/uploads/2025/11/sticker_rundvlees.svg",
  kip: "https://www.ipekcislachterij.nl/wp-content/uploads/2025/11/sticker_gevogelte.svg",
} as const;

const IPEKCI_HERO_IMAGE =
  "https://www.ipekcislachterij.nl/wp-content/uploads/2025/12/Ook-klant-worden.webp";

const marquee = [
  "Premium halalvlees",
  "Nederlands lamsvlees",
  "Rundvlees",
  "Kip (op aanvraag)",
  "Eindproducten",
  "Eigen halalslachthuis",
  "Eigen koeltransport",
  "Persoonlijke service",
];

const customerTypes = ["Slagerijen", "Groothandels", "Supermarkten", "Restaurants"] as const;

const segments = [
  {
    id: "slagerijen",
    title: "Slagerijen",
    text: "Onze slagerijen ontvangen dagelijks vers halalvlees van de hoogste Nederlandse kwaliteit. Van complete lammeren tot versgesneden delen, altijd snel geleverd en volledig volgens islamitische normen en waarden.",
    icon: Store,
    image: "https://www.ipekcislachterij.nl/wp-content/uploads/2025/11/Voor-wie-slagerijen.webp",
  },
  {
    id: "groothandels",
    title: "Groothandels",
    text: "Groothandels kunnen rekenen op een stabiele aanvoer van Nederlands halalvlees, direct uit ons eigen slachthuis. Ontvang grote aantallen op vaste momenten, zodat uw klantenbestand altijd efficiënt bediend wordt.",
    icon: Package,
    image: "https://www.ipekcislachterij.nl/wp-content/uploads/2025/11/Voor-wie-groothandels.webp",
  },
  {
    id: "supermarkten",
    title: "Supermarkten",
    text: "Aan supermarkten leveren we halalvlees én eindproducten die geschikt zijn voor zowel de versafdeling als de diepvries. Een breed assortiment dat direct verkoopklaar is en aansluit op de vraag van uw klanten.",
    icon: ShieldCheck,
    image: "https://www.ipekcislachterij.nl/wp-content/uploads/2025/11/Ipekci-voor-supermarkten.webp",
  },
  {
    id: "restaurants",
    title: "Restaurants",
    text: "Voor restaurants leveren we geselecteerde delen zoals koteletten, gehakt en grillproducten, precies afgestemd op uw menukaart. Altijd halal, vers en klaar voor directe bereiding in de keuken.",
    icon: ChefHat,
    image: "https://www.ipekcislachterij.nl/wp-content/uploads/2025/11/Voor-restaurants.webp",
  },
];

const categories = [
  {
    id: "lamsvlees",
    title: "Lamsvlees",
    text: "Premium Nederlandse lammeren, onbedwelmd halalgeslacht in eigen slachthuis. Leverbaar als karkas of delen.",
    icon: Beef,
    image: assortimentLamsvleesHeroImage,
    stickerSrc: HERO_STICKERS.lamsvlees,
  },
  {
    id: "rundvlees",
    title: "Rundvlees",
    text: "Nederlands rundvlees via vaste partners. Leverbaar als premium cuts en veelgevraagde delen.",
    icon: Beef,
    image: assortimentRundvleesHeroImage,
    stickerSrc: HERO_STICKERS.rundvlees,
  },
  {
    id: "kip",
    title: "Kip",
    text: "Op aanvraag van bestaande klanten: halalgeslachte kip van premium kwaliteit in standaarddelen.",
    icon: Package,
    image: assortimentKipHeroImage,
    stickerSrc: HERO_STICKERS.kip,
  },
  {
    id: "eindproducten",
    title: "Eindproducten",
    text: "Gemaakt van ons eigen halalvlees: hamburgers, kebab, shoarma en meer voor verkoop en bereiding.",
    icon: ShieldCheck,
    image: productenImage,
  },
];

const homeAssortment = [
  {
    id: "lamsvlees",
    title: "Lamsvlees",
    text: "Premium Nederlandse lammeren, onbedwelmd halalgeslacht in ons eigen slachthuis. Leverbaar als complete karkassen of versgesneden delen voor iedere klantvraag.",
    image: assortmentLamsvleesImage,
    icon: Beef,
  },
  {
    id: "rundvlees",
    title: "Rundvlees",
    text: "Ons rundvlees komt van Nederlandse runderen en vaste partners. Altijd halalgeslacht en leverbaar als ribeye, entrecote, gehakt en andere veelgevraagde delen.",
    image: assortmentRundvleesImage,
    icon: Beef,
  },
  {
    id: "kip",
    title: "Kip",
    text: "Op aanvraag van bestaande klanten leveren wij ook halalgeslachte kip. Premium kwaliteit uit Nederland en beschikbaar in alle standaarddelen.",
    image: assortmentKipImage,
    icon: Package,
  },
] as const;

const endProducts = {
  title: "Eindproducten",
  eyebrow: "Premium kwaliteit",
  text: "Onze eindproducten worden gemaakt van ons eigen halalvlees. Kebabstaafjes, hamburgers, kipburgers en meer voor supermarkten, slagerijen en restaurants.",
  image: productenImage,
} as const;

function EindproductenBanner({
  title,
  text,
  image,
}: {
  title: string;
  text: string;
  image: string;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const px = useSpring(useTransform(mx, [0, 1], [-14, 14]), { stiffness: 160, damping: 26 });
  const py = useSpring(useTransform(my, [0, 1], [-10, 10]), { stiffness: 160, damping: 26 });
  const pr = useSpring(useTransform(mx, [0, 1], [-1.4, 1.4]), { stiffness: 140, damping: 26 });

  const glareX = useTransform(mx, (v) => `${v * 100}%`);
  const glareY = useTransform(my, (v) => `${v * 100}%`);
  const glareBg = useMotionTemplate`radial-gradient(520px 320px at ${glareX} ${glareY}, rgba(245,241,235,0.14) 0%, transparent 60%)`;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-[30px] border border-[rgba(226,192,141,0.22)] bg-[#070707] shadow-[0_50px_140px_-110px_rgba(0,0,0,0.95)] grain"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_30%_45%,rgba(255,255,255,0.06)_0%,transparent_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_620px_at_75%_40%,rgba(226,192,141,0.10)_0%,transparent_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_20%_85%,rgba(177,18,23,0.20)_0%,transparent_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_760px_at_50%_60%,rgba(0,0,0,0)_0%,rgba(0,0,0,0)_50%,rgba(0,0,0,0.86)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.65)_0%,rgba(0,0,0,0.30)_35%,rgba(0,0,0,0.12)_62%,rgba(0,0,0,0.55)_100%)]" />
      </div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={reduceMotion ? undefined : { background: glareBg }}
      />

      <div className="relative grid min-h-[520px] gap-8 px-7 py-10 sm:px-10 sm:py-12 lg:grid-cols-12 lg:items-stretch lg:px-14 lg:py-14">
        <div className="relative z-10 flex flex-col justify-center lg:col-span-5">
          <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#B11217]">
            PREMIUM KWALITEIT
          </div>
          <h3 className="mt-6 font-display text-[clamp(2.4rem,3.4vw,4.0rem)] font-medium leading-[1.02] tracking-[-0.03em] text-[#F5F1EB]">
            {title}
          </h3>
          <p className="mt-7 max-w-[420px] text-sm leading-relaxed text-[rgba(245,241,235,0.70)] sm:text-[15px]">
            {text}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Link
              to="/assortiment"
              className="group inline-flex items-center gap-3 rounded-full bg-[#9D0208] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_24px_90px_-60px_rgba(0,0,0,0.85)] transition-all duration-500 hover:bg-[#B11217] hover:shadow-[0_0_0_1px_rgba(226,192,141,0.18),0_0_58px_-24px_rgba(177,18,23,0.70),0_34px_110px_-70px_rgba(0,0,0,0.90)] active:translate-y-px"
            >
              Alle producten
              <ArrowRight
                size={14}
                className="transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1"
              />
            </Link>
            <a
              href="/assortiment#eindproducten"
              className="group inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.26em] text-[rgba(226,192,141,0.92)] transition-colors duration-500 hover:text-[rgba(245,241,235,0.90)]"
            >
              Lees meer
              <ArrowUpRight
                size={15}
                className="text-[rgba(226,192,141,0.95)] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center lg:col-span-7 lg:justify-end">
          <motion.div
            className="relative w-full max-w-[760px]"
            style={reduceMotion ? undefined : { x: px, y: py, rotate: pr, transformStyle: "preserve-3d" }}
          >
            <motion.div
              className="relative"
              animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
              transition={
                reduceMotion ? undefined : { duration: 7.5, ease: "easeInOut", repeat: Infinity }
              }
            >
              <motion.div
                className="relative overflow-hidden rounded-[26px] border border-white/5 bg-white/[0.02] shadow-[0_50px_140px_-110px_rgba(0,0,0,0.95)] backdrop-blur-[2px]"
                animate={reduceMotion ? undefined : { y: hovered ? -4 : 0 }}
                transition={reduceMotion ? undefined : { duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute inset-0 bg-[radial-gradient(560px_360px_at_30%_20%,rgba(245,241,235,0.10)_0%,transparent_62%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(720px_420px_at_70%_65%,rgba(177,18,23,0.12)_0%,transparent_65%)]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
                </div>

                <motion.img
                  src={image}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  decoding="async"
                  className="h-[320px] w-full object-cover sm:h-[360px] lg:h-[470px]"
                  style={{
                    filter: "brightness(0.9) contrast(1.12) saturate(1.06)",
                    willChange: "transform",
                  }}
                  initial={false}
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          scale: hovered ? 1.055 : 1.02,
                        }
                  }
                  transition={
                    reduceMotion ? undefined : { duration: 1.25, ease: [0.22, 1, 0.36, 1] }
                  }
                />

                <div className="pointer-events-none absolute inset-0 opacity-70 mix-blend-screen">
                  <div className="absolute -left-20 top-6 h-40 w-[420px] rotate-[-18deg] bg-[linear-gradient(90deg,transparent_0%,rgba(245,241,235,0.14)_35%,transparent_70%)] blur-[1px]" />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function AssortimentProductCard({
  label,
  title,
  description,
  image,
  imagePosition = "68% 28%",
  stickerSrc,
  href,
}: {
  label: string;
  title: string;
  description: string;
  image: string;
  imagePosition?: string;
  stickerSrc: string;
  href: string;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rx = useSpring(useTransform(my, [0, 1], [5.5, -5.5]), { stiffness: 170, damping: 28 });
  const ry = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 170, damping: 28 });
  const glowX = useTransform(mx, (v) => `${v * 100}%`);
  const glowY = useTransform(my, (v) => `${v * 100}%`);
  const glowBg = useMotionTemplate`radial-gradient(480px circle at ${glowX} ${glowY}, rgba(226,192,141,0.14), transparent 60%)`;

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      style={reduceMotion ? undefined : { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      className="group relative flex h-[330px] flex-col overflow-hidden rounded-[22px] border border-[rgba(226,192,141,0.16)] bg-[#0A0A0A] shadow-[0_30px_100px_-80px_rgba(0,0,0,0.95)] transition-shadow duration-700 hover:shadow-[0_44px_130px_-92px_rgba(0,0,0,0.98)] lg:h-[380px]"
    >
      <motion.img
        src={image}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          objectPosition: imagePosition,
          filter: "brightness(0.92) contrast(1.10) saturate(1.04)",
          willChange: "transform",
        }}
        initial={false}
        animate={
          reduceMotion
            ? undefined
            : {
                scale: hovered ? 1.12 : 1.06,
                x: hovered ? -6 : 0,
                y: hovered ? -4 : 0,
                rotate: hovered ? -0.7 : -0.2,
              }
        }
        transition={reduceMotion ? undefined : { duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(560px_360px_at_30%_18%,rgba(245,241,235,0.08)_0%,transparent_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(720px_420px_at_78%_48%,rgba(177,18,23,0.14)_0%,transparent_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_50%_60%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.25)_52%,rgba(0,0,0,0.86)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/12" />
      </div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={reduceMotion ? undefined : { background: glowBg }}
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-center gap-2 px-6 pt-6 text-[10px] font-semibold uppercase tracking-[0.34em] text-[rgba(226,192,141,0.82)]">
          <img
            src={stickerSrc}
            alt=""
            aria-hidden
            className="h-5 w-5 select-none opacity-90"
            loading="lazy"
            decoding="async"
            style={{ filter: STICKER_GOLD_FILTER }}
          />
          <span>{label}</span>
        </div>

        <div className="flex-1" />

        <div className="px-6 pb-6">
          <div className="font-display text-3xl font-medium leading-[1.02] tracking-[-0.03em] text-[#F5F1EB]">
            {title}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-[rgba(245,241,235,0.72)]">{description}</p>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[rgba(226,192,141,0.75)] transition-colors duration-500 group-hover:text-[rgba(226,192,141,0.92)]">
              Lees meer
            </div>
            <div className="grid h-11 w-11 place-items-center rounded-full border border-[rgba(226,192,141,0.18)] bg-white/[0.02] backdrop-blur-sm transition-all duration-500 group-hover:border-[rgba(226,192,141,0.32)] group-hover:bg-white/[0.06]">
              <ArrowUpRight
                size={16}
                className="text-[rgba(245,241,235,0.78)] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-rotate-45 group-hover:translate-x-0.5"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.a>
  );
}

function AssortimentUnifiedCard({
  id,
  title,
  description,
  image,
  stickerSrc,
  index,
}: {
  id: string;
  title: string;
  description: string;
  image: string;
  stickerSrc?: string;
  index: number;
}) {
  const badgeId = useId();
  const pathId = `assortiment-badge-${badgeId}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.95, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-3xl border border-[rgba(198,160,98,0.28)] bg-[#070707] shadow-[0_40px_120px_-95px_rgba(0,0,0,0.98)] transition-all duration-700 hover:-translate-y-1 hover:border-[rgba(198,160,98,0.55)] hover:shadow-[0_56px_170px_-120px_rgba(0,0,0,0.98)]"
    >
      <Link to={`/assortiment#${id}`} className="relative block h-full">
        <div className="pointer-events-none absolute inset-0">
          <motion.img
            src={image}
            alt=""
            aria-hidden
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: "brightness(0.80) contrast(1.08) saturate(1.04)" }}
            initial={false}
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="absolute inset-0 bg-[radial-gradient(900px_560px_at_60%_22%,rgba(255,255,255,0.10)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(900px_720px_at_45%_92%,rgba(179,18,23,0.26)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/45 to-black/8" />
        </div>

        <div className="pointer-events-none absolute left-6 top-6 grid h-[82px] w-[82px] place-items-center rounded-full border border-[rgba(198,160,98,0.26)] bg-black/35 backdrop-blur-[2px]">
          <svg viewBox="0 0 112 112" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
              <path
                id={pathId}
                d="M56,56 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0"
              />
            </defs>
            <text
              fill="rgba(198,160,98,0.82)"
              fontSize="7.1"
              fontWeight="700"
              letterSpacing="0.26em"
              textAnchor="middle"
            >
              <textPath href={`#${pathId}`} startOffset="50%">
                100% HALAL • PUUR &amp; VERS • 100% HALAL • PUUR &amp; VERS
              </textPath>
            </text>
          </svg>

          {stickerSrc ? (
            <img
              src={stickerSrc}
              alt=""
              aria-hidden
              className="relative h-[28px] w-[28px] opacity-90"
              loading="lazy"
              decoding="async"
              style={{ filter: STICKER_GOLD_FILTER }}
            />
          ) : null}
        </div>

        <div className="relative flex min-h-[460px] flex-col justify-end p-7 sm:min-h-[520px]">
          <div className="h-px w-10 bg-[#B31217]" />
          <div className="mt-6 font-display text-3xl font-medium leading-[1.03] tracking-[-0.03em] text-[#F5F2ED]">
            {title}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-[#B9B9B9]">{description}</p>

          <div className="mt-8">
            <div className="group/btn relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-[rgba(198,160,98,0.58)] bg-transparent px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.26em] text-[rgba(198,160,98,0.92)] transition-colors duration-500 group-hover:text-[#070707]">
              <span className="pointer-events-none absolute inset-0 -translate-x-[110%] bg-[rgba(198,160,98,0.92)] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-0" />
              <span className="relative">Lees meer</span>
              <ArrowRight
                size={13}
                className="relative transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1"
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function EindproductenStrip({
  title,
  text,
  image,
}: {
  title: string;
  text: string;
  image: string;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const px = useSpring(useTransform(mx, [0, 1], [-12, 12]), { stiffness: 160, damping: 26 });
  const py = useSpring(useTransform(my, [0, 1], [-8, 8]), { stiffness: 160, damping: 26 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-[22px] border border-[rgba(226,192,141,0.18)] bg-[#070707] shadow-[0_46px_130px_-110px_rgba(0,0,0,0.95)]"
    >
      <motion.img
        src={image}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          objectPosition: "82% 35%",
          filter: "brightness(0.90) contrast(1.12) saturate(1.06)",
          willChange: "transform",
        }}
        initial={false}
        animate={reduceMotion ? undefined : { scale: hovered ? 1.04 : 1.02 }}
        transition={reduceMotion ? undefined : { duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(980px_520px_at_25%_30%,rgba(255,255,255,0.07)_0%,transparent_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(820px_520px_at_20%_90%,rgba(177,18,23,0.20)_0%,transparent_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(760px_520px_at_70%_55%,rgba(226,192,141,0.14)_0%,transparent_66%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1100px_680px_at_50%_60%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.20)_45%,rgba(0,0,0,0.90)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.55)_42%,rgba(0,0,0,0.22)_68%,rgba(0,0,0,0.55)_100%)]" />
      </div>

      <div className="relative grid h-[310px] gap-7 px-7 py-8 sm:h-[340px] sm:px-10 sm:py-10 lg:grid-cols-12 lg:items-center">
        <div className="relative lg:col-span-5">
          <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#B11217]">
            PREMIUM KWALITEIT
          </div>
          <div className="mt-4 font-display text-[clamp(2.2rem,3.1vw,3.2rem)] font-medium leading-[1.02] tracking-[-0.03em] text-[#F5F1EB]">
            {title}
          </div>
          <p className="mt-4 max-w-[420px] text-sm leading-relaxed text-[rgba(245,241,235,0.70)]">
            {text}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-5">
            <Link
              to="/assortiment"
              className="group inline-flex items-center gap-3 rounded-full bg-[#9D0208] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_22px_80px_-60px_rgba(0,0,0,0.85)] transition-all duration-500 hover:bg-[#B11217] hover:shadow-[0_0_0_1px_rgba(226,192,141,0.16),0_0_50px_-24px_rgba(177,18,23,0.65),0_30px_96px_-70px_rgba(0,0,0,0.90)] active:translate-y-px"
            >
              Alle producten
              <ArrowRight
                size={14}
                className="transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1"
              />
            </Link>
            <a
              href="/assortiment#eindproducten"
              className="group inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.26em] text-[rgba(226,192,141,0.92)] transition-colors duration-500 hover:text-[rgba(245,241,235,0.90)]"
            >
              Lees meer
              <ArrowUpRight
                size={15}
                className="text-[rgba(226,192,141,0.95)] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </div>

        <div className="hidden lg:col-span-7 lg:block" />
      </div>
    </motion.div>
  );
}

function HalalSealIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 3.2c4.85 0 8.8 3.95 8.8 8.8s-3.95 8.8-8.8 8.8-8.8-3.95-8.8-8.8 3.95-8.8 8.8-8.8Z"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 6.35c3.1 0 5.65 2.55 5.65 5.65S15.1 17.65 12 17.65 6.35 15.1 6.35 12 8.9 6.35 12 6.35Z"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.45"
      />
      <path
        d="M10.05 12.15l1.25 1.25 2.95-3.2"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.05 20.05 7.2 22l2.05-.85M15.95 20.05 16.8 22l-2.05-.85"
        stroke="currentColor"
        strokeWidth="1.05"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
      />
    </svg>
  );
}

function DutchCraftIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 20.6V12.1"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <path
        d="M7.35 10.1c0 2.95 2.05 4.95 4.65 4.95s4.65-2 4.65-4.95c0-2.1-1.6-3.85-4.65-6.05-3.05 2.2-4.65 3.95-4.65 6.05Z"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M9.05 9.25c.55-.9 1.55-1.55 2.95-2.25 1.4.7 2.4 1.35 2.95 2.25"
        stroke="currentColor"
        strokeWidth="1.05"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

function SlaughterhouseIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4.4 10.4 12 5.9l7.6 4.5v9.1H4.4v-9.1Z"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M9 19.5v-6.2h6v6.2"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M7.35 10.55h9.3"
        stroke="currentColor"
        strokeWidth="1.05"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M16.8 6.95v3.35"
        stroke="currentColor"
        strokeWidth="1.05"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

function ColdDeliveryIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6.2 16.8h8.6c1.65 0 3-1.35 3-3v-4.6h-3.55l-1.25-2.6H9.3c-.85 0-1.6.5-1.95 1.25L6.2 10.6v6.2Z"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M6.2 16.8c0 1.25 1.05 2.25 2.35 2.25S10.9 18.05 10.9 16.8"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <path
        d="M13.85 16.8c0 1.25 1.05 2.25 2.35 2.25s2.35-1 2.35-2.25"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <path
        d="M6.2 12.1h4.9"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <path
        d="M4.85 8.25v2.7M3.5 9.6h2.7M4.1 8.85l1.5 1.5M5.6 8.85 4.1 10.35"
        stroke="currentColor"
        strokeWidth="1.05"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
      />
    </svg>
  );
}

const heroTrust = [
  {
    title: "Halal gecertificeerd",
    subtitle: "100% volgens islamitische normen en waarden",
    icon: HalalSealIcon,
  },
  {
    title: "Nederlandse kwaliteit",
    subtitle: "Premium vlees van Nederlandse bodem",
    icon: DutchCraftIcon,
  },
  {
    title: "Eigen slachterij",
    subtitle: "Volledige controle over kwaliteit en voedselveiligheid",
    icon: SlaughterhouseIcon,
  },
  {
    title: "Snelle levering",
    subtitle: "Met eigen gekoeld transport door heel Nederland",
    icon: ColdDeliveryIcon,
  },
] as const;

const process = [
  {
    step: "Stap 1",
    title: "Het halalslachtproces",
    text: "Controle op gezondheid en welzijn, slacht door gecertificeerde medewerkers, keuring en weging.",
    icon: ShieldCheck,
  },
  {
    step: "Stap 2",
    title: "Voorbereiding op de bestelling",
    text: "Karkassen worden gekoeld en op maat versneden of voorbereid als eindproduct, afgestemd op uw vraag.",
    icon: Package,
  },
  {
    step: "Stap 3",
    title: "Eigen koeltransport",
    text: "Gekoelde levering met eigen chauffeurs en vaste routes, afgestemd op uw afspraken en planning.",
    icon: Truck,
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ipekçi Slachterij — Groots in premium halalvlees" },
      {
        name: "description",
        content:
          "Premium Nederlands halalvlees: lamsvlees, rundvlees en eindproducten voor slagerijen, groothandels, supermarkten en restaurants.",
      },
      { property: "og:title", content: "Ipekçi Slachterij — Premium halalvlees" },
      { property: "og:image", content: IPEKCI_HERO_IMAGE },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const segmentsScrollerRef = useRef<HTMLDivElement>(null);
  const eindproductenScrollerRef = useRef<HTMLDivElement>(null);
  const [segmentsCanScrollLeft, setSegmentsCanScrollLeft] = useState(false);
  const [segmentsCanScrollRight, setSegmentsCanScrollRight] = useState(false);
  const [eindproductenCanScrollRight, setEindproductenCanScrollRight] = useState(false);
  const [heroPoster, setHeroPoster] = useState<string | null>(null);
  const [heroVideoActive, setHeroVideoActive] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  useEffect(() => {
    let cancelled = false;
    const v = document.createElement("video");
    v.src = ipekciIntroVideo;
    v.muted = true;
    v.playsInline = true;
    v.preload = "auto";

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    function finalize() {
      v.removeEventListener("loadedmetadata", handleLoaded);
      v.removeEventListener("loadeddata", handleLoaded);
      v.removeEventListener("seeked", handleSeeked);
      v.src = "";
    }

    function handleSeeked() {
      if (!ctx || cancelled) {
        finalize();
        return;
      }
      const w = v.videoWidth || 1920;
      const h = v.videoHeight || 1080;
      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(v, 0, 0, w, h);
      try {
        const data = canvas.toDataURL("image/jpeg", 0.86);
        if (!cancelled) setHeroPoster(data);
      } catch {
        if (!cancelled) setHeroPoster(null);
      }
      finalize();
    }

    function handleLoaded() {
      if (cancelled) return;
      try {
        v.currentTime = Math.min(0.2, (v.duration || 0.2) / 10);
      } catch {
        handleSeeked();
      }
    }

    v.addEventListener("loadedmetadata", handleLoaded, { once: true });
    v.addEventListener("loadeddata", handleLoaded, { once: true });
    v.addEventListener("seeked", handleSeeked);

    return () => {
      cancelled = true;
      finalize();
    };
  }, []);

  useEffect(() => {
    const ms = reduceMotion ? 0 : 1500;
    const t = window.setTimeout(() => setHeroVideoActive(true), ms);
    return () => window.clearTimeout(t);
  }, [reduceMotion]);

  useEffect(() => {
    if (!heroVideoActive) return;
    const v = heroVideoRef.current;
    if (!v) return;
    const p = v.play();
    if (p) p.catch(() => {});
  }, [heroVideoActive]);

  useEffect(() => {
    const el = eindproductenScrollerRef.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      const nextEl = eindproductenScrollerRef.current;
      if (!nextEl) return;
      const maxScrollLeft = Math.max(0, nextEl.scrollWidth - nextEl.clientWidth);
      const epsilon = 2;
      setEindproductenCanScrollRight(nextEl.scrollLeft < maxScrollLeft - epsilon);
    };

    const schedule = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    schedule();
    el.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const ro = new ResizeObserver(schedule);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const el = segmentsScrollerRef.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      const nextEl = segmentsScrollerRef.current;
      if (!nextEl) return;
      const maxScrollLeft = Math.max(0, nextEl.scrollWidth - nextEl.clientWidth);
      const epsilon = 2;
      setSegmentsCanScrollLeft(nextEl.scrollLeft > epsilon);
      setSegmentsCanScrollRight(nextEl.scrollLeft < maxScrollLeft - epsilon);
    };

    const schedule = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    schedule();
    el.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const ro = new ResizeObserver(schedule);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <SiteLayout>
      <section
        ref={heroRef}
        className="relative h-[100svh] min-h-[700px] w-full overflow-hidden bg-background grain"
      >
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <motion.img
            src={heroPoster ?? IPEKCI_HERO_IMAGE}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: "brightness(0.6) contrast(1.1) saturate(0.98)" }}
            initial={false}
            animate={{
              opacity: heroVideoActive ? 0 : 1,
              scale: heroVideoActive ? 1.02 : 1,
            }}
            transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className="absolute inset-0 overflow-hidden"
            initial={false}
            animate={{
              opacity: heroVideoActive ? 1 : 0,
              clipPath: heroVideoActive ? "inset(0% 0% 0% 0%)" : "inset(54% 0% 54% 0%)",
              filter: heroVideoActive ? "blur(0px)" : "blur(14px)",
            }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden
          >
            <motion.video
              ref={heroVideoRef}
              src={ipekciIntroVideo}
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover"
              initial={false}
              animate={{ scale: heroVideoActive ? 1 : 1.035 }}
              transition={{ duration: 1.85, ease: [0.16, 1, 0.3, 1] }}
              style={{ filter: "brightness(1.06) contrast(1.03) saturate(1.12)" }}
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-b from-background/44 via-background/6 to-background/46" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(11,11,11,0.86)_0%,rgba(11,11,11,0.50)_34%,rgba(11,11,11,0.16)_54%,rgba(11,11,11,0)_72%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_38%_0%,rgba(255,255,255,0.10)_0%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(1100px_760px_at_50%_48%,rgba(0,0,0,0)_0%,rgba(0,0,0,0)_60%,rgba(0,0,0,0.62)_100%)]" />
          <div className="absolute -bottom-40 left-1/4 h-[600px] w-[700px] rounded-full bg-primary/16 blur-[190px]" />
          <div className="absolute -top-28 right-0 h-[420px] w-[580px] rounded-full bg-[color-mix(in_oklab,var(--accent)_18%,transparent)] blur-[210px]" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 mx-auto flex h-full max-w-[1480px] flex-col px-5 pb-10 pt-24 sm:px-8 sm:pb-12 sm:pt-28 lg:px-12 lg:pb-14 lg:pt-32"
        >
          <div className="flex flex-1 items-center">
            <div className="w-full max-w-[560px]">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.8 }}
                className="text-gradient-orange text-[10px] font-semibold uppercase tracking-[0.34em]"
              >
                Premium halalvlees uit Nederland
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.22, duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 font-display text-[clamp(1.2rem,2.2vw,1.65rem)] leading-[1.25] tracking-[-0.02em] text-foreground/88"
              >
                Bestel uw vlees bij dé halalslachterij van Nederland
              </motion.p>

              <motion.h1
                className="mt-7 font-display text-[clamp(3.6rem,5.8vw,6.3rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-foreground"
              >
                <span className="block overflow-hidden">
                  <motion.span
                    initial={reduceMotion ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 36, filter: "blur(14px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.26, duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
                    className="block"
                  >
                    Groots in premium
                  </motion.span>
                </span>
                <span className="mt-1 block overflow-hidden">
                  <motion.span
                    initial={reduceMotion ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 44, filter: "blur(16px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.38, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    className="block italic text-accent tracking-[-0.03em]"
                  >
                    halalvlees
                  </motion.span>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.9 }}
                className="mt-8 text-sm leading-relaxed text-foreground/65"
              >
                Ipekçi is een van de grootste halal-lammerenslachthuizen van Nederland. Sinds 2012 leveren
                wij premium halal vlees en eindproducten aan slagerijen, groothandels, supermarkten en
                restaurants in heel Nederland.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.72, duration: 0.9 }}
                className="mt-10 flex flex-wrap items-center gap-3"
              >
                <Link
                  to="/ons-verhaal"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-foreground shadow-[0_0_30px_-16px_color-mix(in_oklab,var(--primary)_70%,transparent)] transition-all duration-300 hover:shadow-[0_0_44px_-16px_color-mix(in_oklab,var(--primary)_80%,transparent)] active:translate-y-px"
                >
                  Ontdek ons verhaal
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
                <Link
                  to="/assortiment"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/18 bg-black/40 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/90 transition-all duration-300 hover:border-white/26 hover:bg-black/55"
                >
                  Bekijk assortiment
                  <ArrowUpRight
                    size={16}
                    className="text-foreground/60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col gap-8 border-t border-white/10 pt-7 lg:flex-row lg:items-end lg:justify-between"
          >
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {heroTrust.map((t) => {
                const Icon = t.icon;
                return (
                  <div key={t.title} className="flex items-start gap-4">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.02] shadow-[0_18px_60px_-36px_rgba(0,0,0,0.9)]">
                      <Icon size={18} className="text-foreground/62" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/75">
                        {t.title}
                      </div>
                      <div className="mt-1 text-xs leading-relaxed text-foreground/55">
                        {t.subtitle}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <div className="pointer-events-none absolute right-8 top-28 hidden lg:block">
            <HalalStamp />
          </div>
        </motion.div>
      </section>

      <section className="relative overflow-hidden border-y border-white/5 bg-background py-8">
        <div className="flex w-max marquee gap-14 whitespace-nowrap px-8">
          {[...marquee, ...marquee, ...marquee].map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="font-display text-2xl font-semibold tracking-[0.15em] text-foreground/25 transition-colors hover:text-foreground/70 md:text-4xl"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#F5F1EB] px-6 py-24 text-[#111111] grain md:px-10 md:py-28 lg:px-[80px] lg:py-[120px]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-48 -top-48 h-[620px] w-[620px] rounded-full bg-[rgba(200,164,107,0.18)] blur-[150px]" />
          <div className="absolute -right-64 top-0 h-[720px] w-[720px] rounded-full bg-[rgba(179,18,23,0.10)] blur-[170px]" />
          <div className="absolute inset-0 bg-[radial-gradient(1200px_820px_at_35%_30%,rgba(255,255,255,0.65)_0%,rgba(245,241,235,0)_58%)]" />
        </div>

        <div className="relative mx-auto max-w-[1440px]">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#A10F14]">
                  ONS VERHAAL
                </div>
                <h2 className="mt-7 text-balance font-display text-[clamp(2.2rem,3.1vw,3.35rem)] font-medium leading-[1.03] tracking-[-0.03em] text-[#141414]">
                  Passie, vakmanschap
                  <br />
                  en halal integriteit
                </h2>
                <p className="mt-7 max-w-lg text-sm leading-relaxed text-[#141414]/72">
                  Ipekçi Slachterij staat voor premium halalvlees van Nederlandse bodem. Met respect voor
                  islamitische normen en oog voor kwaliteit, leveren wij sinds 2012 aan tevreden klanten
                  in heel Nederland.
                </p>

                <div className="mt-10 space-y-3 text-sm text-[#141414]/75">
                  {[
                    "Eigen slachterij in Harderwijk",
                    "Halal gecertificeerd",
                    "Nederlandse lammeren",
                    "Kwaliteit zonder compromis",
                  ].map((t) => (
                    <div key={t} className="flex items-start gap-3">
                      <div className="mt-0.5 grid h-5 w-5 place-items-center rounded-full border border-[#141414]/10 bg-white/70">
                        <Check size={13} className="text-[rgba(200,164,107,0.92)]" />
                      </div>
                      <div className="leading-relaxed">{t}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-12">
                  <Link
                    to="/ons-verhaal"
                    className="group inline-flex items-center gap-3 rounded-full bg-[#8B0E11] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_0_40px_-18px_rgba(177,18,23,0.45)] transition-all duration-300 hover:bg-[#B11217] hover:shadow-[0_0_58px_-18px_rgba(177,18,23,0.60)] active:translate-y-px"
                  >
                    Lees ons verhaal
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-8"
            >
              <CardContainer containerClassName="py-0 flex items-stretch justify-start" className="w-full">
                <CardBody className="relative h-auto w-full rounded-3xl border border-black/10 bg-white/70 p-0 shadow-[0_36px_120px_-80px_rgba(0,0,0,0.55)]">
                  <div className="grid gap-3 p-3 sm:gap-4 sm:p-4 md:grid-cols-12">
                    <CardItem translateZ={24} className="relative w-full overflow-hidden rounded-2xl md:col-span-7 md:row-span-2">
                      <img
                        src={IPEKCI_HERO_IMAGE}
                        alt=""
                        aria-hidden
                        loading="lazy"
                        decoding="async"
                        className="h-[340px] w-full object-cover md:h-full"
                        style={{ filter: "brightness(0.9) contrast(1.06) saturate(1.02)" }}
                      />
                      <div className="absolute inset-0 bg-[radial-gradient(800px_520px_at_30%_25%,rgba(255,255,255,0.18)_0%,transparent_62%)]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/5" />
                    </CardItem>

                    <CardItem translateZ={18} className="relative w-full overflow-hidden rounded-2xl md:col-span-5">
                      <img
                        src={islamitischeNormenWaardenImage}
                        alt=""
                        aria-hidden
                        loading="lazy"
                        decoding="async"
                        className="h-[170px] w-full object-cover md:h-[210px]"
                        style={{ filter: "brightness(0.9) contrast(1.06) saturate(1.02)" }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/5" />
                    </CardItem>

                    <CardItem translateZ={18} className="relative w-full overflow-hidden rounded-2xl md:col-span-5">
                      <img
                        src="https://www.ipekcislachterij.nl/wp-content/uploads/2025/11/Voor-wie-slagerijen.webp"
                        alt=""
                        aria-hidden
                        loading="lazy"
                        decoding="async"
                        className="h-[170px] w-full object-cover md:h-[210px]"
                        style={{ filter: "brightness(0.9) contrast(1.06) saturate(1.02)" }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/38 via-transparent to-black/5" />
                    </CardItem>
                  </div>

                  <CardItem translateZ={40} className="absolute bottom-5 left-1/2 w-[320px] -translate-x-1/2 px-3 sm:bottom-6 sm:w-[360px]">
                    <div className="relative overflow-hidden rounded-2xl bg-[#8B0E11] p-5 text-white shadow-[0_30px_90px_-55px_rgba(0,0,0,0.75)]">
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(420px_260px_at_20%_15%,rgba(255,255,255,0.20)_0%,transparent_60%)]" />
                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.10)_0%,rgba(0,0,0,0)_40%,rgba(0,0,0,0.16)_100%)]" />
                      <div className="relative flex items-start gap-4">
                        <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 bg-white/10">
                          <HalalSealIcon size={18} className="text-white/90" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold tracking-[-0.01em]">Halal & Vertrouwd</div>
                          <div className="mt-1 text-xs leading-relaxed text-white/85">
                            100% volgens islamitische normen en waarden
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </motion.div>
          </div>
        </div>
      </section>

      <section
        id="ons-assortiment"
        className="relative isolate min-h-[100svh] overflow-hidden border-y border-white/5 bg-[#0B0B0B] px-6 pt-8 pb-14 text-white grain lg:px-10 lg:pt-10 lg:pb-16"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_30%_40%,rgba(255,255,255,0.08)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(900px_640px_at_75%_30%,rgba(226,192,141,0.10)_0%,transparent_62%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(1100px_760px_at_50%_60%,rgba(0,0,0,0)_0%,rgba(0,0,0,0)_55%,rgba(0,0,0,0.80)_100%)]" />
        </div>

        <div className="relative mx-auto flex h-full max-w-[1480px] flex-col">
          <div className="text-center">
            <div className="font-display text-[clamp(2.1rem,3.2vw,3.6rem)] font-medium tracking-[-0.02em] text-[rgba(226,192,141,0.92)]">
              <span className="italic">Ons assortiment</span>
            </div>
            <div className="mt-3 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#B11217]">
              SLACHT VAN IPEKÇI
            </div>
            <div className="mx-auto mt-5 h-px w-24 bg-[rgba(226,192,141,0.35)]" />
          </div>

          <div className="relative z-0 mt-8 grid flex-1 gap-5 lg:grid-cols-12 lg:items-stretch lg:gap-6">
            <div className="flex flex-col justify-center lg:col-span-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#B11217]">
                PREMIUM KWALITEIT
              </div>
              <h2 className="mt-6 font-display text-[clamp(2.8rem,3.2vw,3.8rem)] font-medium leading-[1.02] tracking-[-0.03em] text-[#F5F1EB]">
                Vlees van topkwaliteit,
                <span className="mt-3 block italic text-[rgba(226,192,141,0.92)]">voor elke behoefte</span>
              </h2>

              <div className="mt-7 h-px w-20 bg-[rgba(226,192,141,0.28)]" />

              <p className="mt-7 max-w-[420px] text-sm leading-relaxed text-[rgba(245,241,235,0.68)]">
                Dagelijks vers, halal gecertificeerd en met zorg geselecteerd. Ontdek ons uitgebreide assortiment
                premium vlees.
              </p>

              <div className="mt-8 space-y-4 text-[11px] text-[rgba(245,241,235,0.72)]">
                {[
                  { icon: ShieldCheck, label: "100% halal gecertificeerd" },
                  { icon: DutchCraftIcon, label: "Nederlandse kwaliteit" },
                  { icon: Truck, label: "Dagelijks vers geleverd" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.03]">
                      <Icon size={16} className="text-[rgba(226,192,141,0.88)]" />
                    </div>
                    <div className="font-semibold uppercase tracking-[0.22em]">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-5 lg:col-span-8 lg:grid-cols-3 lg:items-stretch">
              <AssortimentProductCard
                label="Premium lamsvlees"
                title="Lamsvlees"
                description="Mals, smaakvol en zorgvuldig geselecteerd lamsvlees van topkwaliteit."
                image={assortmentLamsvleesImage}
                imagePosition="24% 26%"
                stickerSrc={HERO_STICKERS.lamsvlees}
                href="/assortiment#lamsvlees"
              />
              <AssortimentProductCard
                label="Premium rundvlees"
                title="Rundvlees"
                description="Premium rundvlees, perfect voor elke professionele keuken."
                image={assortmentRundvleesImage}
                imagePosition="52% 28%"
                stickerSrc={HERO_STICKERS.rundvlees}
                href="/assortiment#rundvlees"
              />
              <AssortimentProductCard
                label="Premium kip"
                title="Kip"
                description="Halal kip van hoge kwaliteit, dagvers en breed inzetbaar in elk gerecht."
                image={assortmentKipImage}
                imagePosition="72% 30%"
                stickerSrc={HERO_STICKERS.kip}
                href="/assortiment#kip"
              />
            </div>
          </div>

          <div className="relative z-20 mt-10">
            <EindproductenStrip title={endProducts.title} text={endProducts.text} image={endProducts.image} />
          </div>
        </div>
      </section>

      <section
        id="segments"
        className="relative overflow-hidden bg-[#F5F1EB] px-6 py-32 text-[#111111] grain lg:px-10 lg:py-44"
      >
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[rgba(200,164,107,0.18)] blur-[140px]" />
          <div className="absolute -right-48 top-10 h-[620px] w-[620px] rounded-full bg-[rgba(179,18,23,0.10)] blur-[170px]" />
          <div className="absolute bottom-0 left-1/3 h-[520px] w-[720px] rounded-full bg-[rgba(226,192,141,0.22)] blur-[190px]" />
        </div>
        <div className="mx-auto max-w-[1480px]">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-primary">
                  VOOR WIE WIJ WERKEN
                </div>
                <h2 className="mt-6 text-balance font-display text-[clamp(2.2rem,3.2vw,3.4rem)] font-medium leading-[1.03] tracking-[-0.03em] text-[#1A1A1A]">
                  Halalvlees voor verkoop en bereiding
                </h2>
                <p className="mt-7 max-w-lg text-base leading-relaxed text-[#1A1A1A]/82">
                  Ipekçi levert premium halalvlees en eindproducten aan slagerijen, groothandels, supermarkten en restaurants — met constante kwaliteit, hygiënische verwerking en betrouwbare levering.
                </p>
              </motion.div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative">
                <div className="pointer-events-none absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 items-center lg:flex">
                  {segmentsCanScrollRight ? (
                    <button
                      type="button"
                      aria-label="Scroll rechts"
                      onClick={() => {
                        const el = segmentsScrollerRef.current;
                        if (!el) return;
                        el.scrollBy({ left: 360, behavior: "smooth" });
                      }}
                      className="pointer-events-auto group grid h-12 w-12 place-items-center rounded-full border border-black/10 bg-white/55 shadow-[0_22px_70px_-46px_rgba(0,0,0,0.52)] backdrop-blur-xl transition-all duration-300 hover:bg-white/75 hover:shadow-[0_30px_90px_-52px_rgba(0,0,0,0.60)] active:scale-[0.98]"
                    >
                      <ArrowRight
                        size={16}
                        className="text-black/70 transition-transform duration-300 group-hover:translate-x-0.5"
                      />
                    </button>
                  ) : segmentsCanScrollLeft ? (
                    <button
                      type="button"
                      aria-label="Scroll links"
                      onClick={() => {
                        const el = segmentsScrollerRef.current;
                        if (!el) return;
                        el.scrollBy({ left: -360, behavior: "smooth" });
                      }}
                      className="pointer-events-auto group grid h-12 w-12 place-items-center rounded-full border border-black/10 bg-white/55 shadow-[0_22px_70px_-46px_rgba(0,0,0,0.52)] backdrop-blur-xl transition-all duration-300 hover:bg-white/75 hover:shadow-[0_30px_90px_-52px_rgba(0,0,0,0.60)] active:scale-[0.98]"
                    >
                      <ArrowRight
                        size={16}
                        className="rotate-180 text-black/70 transition-transform duration-300 group-hover:-translate-x-0.5"
                      />
                    </button>
                  ) : null}
                </div>

                <div
                  ref={segmentsScrollerRef}
                  className="flex gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:pb-0"
                >
                  {segments.map((s, idx) => (
                    <SegmentCard key={s.title} {...s} index={idx} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="products"
        className="relative overflow-hidden border-y border-white/5 bg-[#050505] px-6 py-28 text-white grain lg:px-10 lg:py-36"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 right-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(198,160,98,0.45),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(1200px_760px_at_50%_0%,rgba(255,255,255,0.08)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(1100px_820px_at_16%_86%,rgba(179,18,23,0.28)_0%,transparent_58%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(980px_720px_at_86%_64%,rgba(198,160,98,0.12)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(1200px_860px_at_50%_60%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.40)_52%,rgba(0,0,0,0.92)_100%)]" />
        </div>

        <div className="relative mx-auto max-w-[1480px]">
          <motion.div
            initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#B31217]">
              ONS ASSORTIMENT
            </div>
            <h2 className="mt-7 font-display text-[clamp(2.8rem,4.2vw,4.6rem)] font-medium leading-[1.02] tracking-[-0.03em] text-[#F5F2ED]">
              Slacht van Ipekçi
            </h2>

            <div className="relative mx-auto mt-8 h-px w-[220px] bg-[rgba(198,160,98,0.55)]">
              <div className="absolute left-1/2 top-1/2 grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center bg-[#050505]">
                <div className="h-2 w-2 rotate-45 bg-[#B31217]" />
              </div>
            </div>

            <p className="mx-auto mt-9 max-w-[720px] text-sm leading-relaxed text-[#B9B9B9] sm:text-base">
              Al ons vlees is 100% halal, met zorg geselecteerd en met vakmanschap verwerkt. Puur, vers en van de
              hoogste kwaliteit.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-7">
            {[
              {
                id: "lamsvlees",
                title: "Lamsvlees",
                description:
                  "Premium Nederlands lamsvlees, onbedwelmd halalgeslacht in ons eigen slachthuis. Leverbaar als complete karkassen of versgesneden delen.",
                image: assortimentLamsvleesHeroImage,
                stickerSrc: HERO_STICKERS.lamsvlees,
              },
              {
                id: "rundvlees",
                title: "Rundvlees",
                description:
                  "Ons rundvlees komt van Nederlandse runderen en vaste partners. Altijd halalgeslacht en leverbaar als ribeye, entrecote, gehakt en andere delen.",
                image: assortimentRundvleesHeroImage,
                stickerSrc: HERO_STICKERS.rundvlees,
              },
              {
                id: "kip",
                title: "Kip",
                description:
                  "Op aanvraag van bestaande klanten leveren wij ook halalgeslachte kip. Premium kwaliteit uit Nederland en beschikbaar in alle standaarddelen.",
                image: assortimentKipHeroImage,
                stickerSrc: HERO_STICKERS.kip,
              },
            ].map((c, idx) => (
              <AssortimentUnifiedCard key={c.id} {...c} index={idx} />
            ))}
          </div>

          <div className="mt-16 h-px w-full bg-[linear-gradient(90deg,transparent,rgba(198,160,98,0.45),transparent)]" />

          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-4">
              <div className="relative">
                <div className="font-display text-[clamp(2.2rem,3.3vw,3.2rem)] font-medium leading-[1.02] tracking-[-0.03em] text-[#F5F2ED]">
                  <span className="italic">Eindproducten</span>
                </div>
                <div className="mt-4 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#B31217]">
                  PREMIUM KWALITEIT
                </div>

                <div className="relative mt-6 h-px w-24 bg-[rgba(198,160,98,0.55)]">
                  <div className="absolute left-8 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rotate-45 bg-[#B31217]" />
                </div>

                <p className="mt-6 max-w-[420px] text-sm leading-relaxed text-[#B9B9B9]">
                  Onze eindproducten worden gemaakt van ons eigen halalvlees. Kebabstaafjes, hamburgers,
                  kipburgers en meer voor supermarkten, slagerijen en restaurants.
                </p>
              </div>

              <div className="mt-8">
                <Link
                  to="/assortiment#eindproducten"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#B31217] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F5F2ED] shadow-[0_22px_90px_-60px_rgba(0,0,0,0.85)] transition-all duration-500 hover:bg-[#C0181D] hover:shadow-[0_0_0_1px_rgba(198,160,98,0.18),0_0_58px_-24px_rgba(179,18,23,0.75),0_34px_110px_-70px_rgba(0,0,0,0.90)] active:translate-y-px"
                >
                  Alle producten
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>

            <div className="relative lg:col-span-8">
              <div className="relative overflow-hidden rounded-[32px] border border-white/5 bg-white/[0.02] shadow-[0_44px_140px_-120px_rgba(0,0,0,0.95)] backdrop-blur-[2px]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(980px_640px_at_20%_20%,rgba(255,255,255,0.10)_0%,transparent_60%)]" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(980px_720px_at_70%_70%,rgba(179,18,23,0.22)_0%,transparent_60%)]" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(920px_640px_at_88%_24%,rgba(198,160,98,0.10)_0%,transparent_62%)]" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.22)_0%,rgba(0,0,0,0.52)_100%)]" />

                <div
                  ref={eindproductenScrollerRef}
                  className="relative flex gap-5 overflow-x-auto px-4 py-5 pb-6 sm:gap-6 sm:px-6 sm:py-6 sm:pb-7 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                >
                {[
                  {
                    category: "Rundvlees",
                    title: "Runder Merquez",
                    image: "https://www.ipekcislachterij.nl/wp-content/uploads/2025/12/Runder-Merquez.png",
                  },
                  {
                    category: "Rundvlees",
                    title: "Rib eye",
                    image: "https://www.ipekcislachterij.nl/wp-content/uploads/2025/12/Rib-eye.png",
                  },
                  {
                    category: "Kip",
                    title: "Kip Shoarma",
                    image: "https://www.ipekcislachterij.nl/wp-content/uploads/2025/12/placeholder.webp",
                  },
                  {
                    category: "Kip",
                    title: "Kalkoens-shoarma",
                    image: "https://www.ipekcislachterij.nl/wp-content/uploads/2025/12/Kalkoensshoarma.png",
                  },
                  {
                    category: "Lamsvlees",
                    title: "Lamsshoarma",
                    image: "https://www.ipekcislachterij.nl/wp-content/uploads/2025/12/Lamsshoarma.png",
                  },
                  {
                    category: "Rundvlees",
                    title: "Yaprak döner",
                    image: "https://www.ipekcislachterij.nl/wp-content/uploads/2025/12/placeholder.webp",
                  },
                  {
                    category: "Rundvlees",
                    title: "Kalfs döner",
                    image: "https://www.ipekcislachterij.nl/wp-content/uploads/2025/12/placeholder.webp",
                  },
                  {
                    category: "Rundvlees",
                    title: "Pastirma",
                    image: "https://www.ipekcislachterij.nl/wp-content/uploads/2025/12/placeholder.webp",
                  },
                  {
                    category: "Rundvlees",
                    title: "Sucuk",
                    image: "https://www.ipekcislachterij.nl/wp-content/uploads/2025/12/Turkse-Worst-Sucuk.png",
                  },
                  {
                    category: "Kip",
                    title: "Kip Burger",
                    image: "https://www.ipekcislachterij.nl/wp-content/uploads/2025/12/Kip-burger.png",
                  },
                  {
                    category: "Rundvlees",
                    title: "Hamburger",
                    image: "https://www.ipekcislachterij.nl/wp-content/uploads/2025/12/Hamburger.png",
                  },
                  {
                    category: "Kip",
                    title: "Kip Merquez",
                    image: "https://www.ipekcislachterij.nl/wp-content/uploads/2025/12/Kip-Merquez-1.png",
                  },
                  {
                    category: "Rundvlees",
                    title: "Adana Kebab",
                    image: "https://www.ipekcislachterij.nl/wp-content/uploads/2025/11/Adana-Kebab.png",
                  },
                  {
                    category: "Kip",
                    title: "Kip döner",
                    image: "https://www.ipekcislachterij.nl/wp-content/uploads/2025/12/placeholder.webp",
                  },
                ].map((p) => (
                  <motion.article
                    key={p.title}
                    initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative w-[270px] shrink-0 overflow-hidden rounded-3xl border border-black/10 bg-[#F5F2ED] shadow-[0_34px_120px_-85px_rgba(0,0,0,0.75)] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1"
                  >
                    <div aria-hidden className="pointer-events-none absolute inset-0">
                      <div className="absolute inset-0 bg-[radial-gradient(520px_360px_at_30%_18%,rgba(0,0,0,0.06)_0%,transparent_62%)]" />
                      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[rgba(179,18,23,0.14)] blur-[110px]" />
                      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(198,160,98,0.35),transparent)]" />
                    </div>

                    <div className="relative p-7">
                      <div className="flex items-center justify-between">
                        <div className="text-[10px] font-semibold uppercase tracking-[0.26em] text-black/55">
                          {p.category}
                        </div>
                        <div className="h-px w-10 bg-[rgba(198,160,98,0.55)]" />
                      </div>

                      <div className="mt-5 font-display text-3xl italic tracking-[-0.02em] text-[#5B0E10]">
                        {p.title}
                      </div>

                      <div className="mt-6 grid place-items-center">
                        <img
                          src={p.image}
                          alt={p.title}
                          loading="lazy"
                          decoding="async"
                          className="h-[150px] w-full object-contain transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
                          style={{ filter: "drop-shadow(0 26px 60px rgba(0,0,0,0.30))" }}
                        />
                      </div>
                    </div>
                  </motion.article>
                ))}

                <div className="w-2 shrink-0" />
              </div>
              </div>

              {eindproductenCanScrollRight ? (
                <div className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 lg:flex">
                  <button
                    type="button"
                    aria-label="Volgende"
                    onClick={() => {
                      const el = eindproductenScrollerRef.current;
                      if (!el) return;
                      el.scrollBy({ left: 340, behavior: "smooth" });
                    }}
                    className="pointer-events-auto grid h-12 w-12 place-items-center rounded-full border border-[rgba(198,160,98,0.55)] bg-[#B31217] shadow-[0_30px_100px_-70px_rgba(0,0,0,0.90)] transition-all duration-300 hover:bg-[#C0181D] active:scale-[0.98]"
                  >
                    <ArrowRight size={16} className="text-[#F5F2ED]" />
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section id="quality" className="relative bg-background px-6 py-32 lg:px-10 lg:py-40">
        <div className="absolute inset-0 opacity-35">
          <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[220px]" />
        </div>
        <div className="relative mx-auto max-w-[1480px]">
          <SectionHeader
            eyebrow="Kwaliteit & halal"
            title="Transparant proces. Consistente kwaliteit."
            description="Slacht, verwerking en levering volgens halalrichtlijnen — met focus op hygiëne, controle en vakmanschap."
          />

          <div className="mt-20 grid gap-4 lg:grid-cols-3">
            {process.map((p, idx) => (
              <ProcessTile key={p.title} {...p} index={idx} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-background px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-[1480px] overflow-hidden rounded-sm border border-primary/30 bg-gradient-to-br from-surface via-surface to-background">
          <div className="relative grid items-center gap-10 p-10 md:grid-cols-2 md:p-16 lg:p-24">
            <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/18 blur-[140px]" />
            <div className="absolute -left-32 -bottom-32 h-96 w-96 rounded-full bg-[color-mix(in_oklab,var(--accent)_18%,transparent)] blur-[140px]" />
            <div className="relative">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
                Ook klant worden?
              </p>
              <h2 className="mt-5 text-balance font-display text-4xl text-foreground md:text-6xl">
                Word klant bij Ipekçi.
              </h2>
            </div>
            <div className="relative flex flex-col items-start gap-6 md:items-end">
              <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-right">
                Betrouwbare halal partner met premium Nederlandse kwaliteit, hygiënische verwerking en
                gekoelde levering via eigen transport.
              </p>
              <MagneticButton href="/contact">
                Word klant bij Ipekci
                <ArrowUpRight size={14} />
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function SegmentCard({
  id,
  title,
  text,
  icon: Icon,
  image,
  index,
}: {
  id: string;
  title: string;
  text: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  image: string;
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [5.5, -5.5]), { stiffness: 160, damping: 26 });
  const ry = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 160, damping: 26 });
  const glowX = useTransform(mx, (v) => `${v * 100}%`);
  const glowY = useTransform(my, (v) => `${v * 100}%`);
  const glowBg = useMotionTemplate`radial-gradient(520px circle at ${glowX} ${glowY}, rgba(226,192,141,0.20), transparent 60%)`;

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.article
      id={id}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 34, filter: "blur(14px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 1, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={reduceMotion ? undefined : { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      className="group relative w-[270px] shrink-0 scroll-mt-28 overflow-hidden rounded-2xl border border-black/10 bg-[#0B0B0B] shadow-[0_24px_90px_-55px_rgba(0,0,0,0.75)] transition-shadow duration-500 hover:shadow-[0_34px_120px_-60px_rgba(0,0,0,0.85)] sm:w-[300px] lg:w-[310px]"
    >
      <motion.img
        src={image}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: "brightness(0.94) contrast(1.06) saturate(1.05)", willChange: "transform, opacity" }}
        initial={false}
        animate={
          reduceMotion
            ? undefined
            : {
                scale: hovered ? 1.08 : 1,
                opacity: hovered ? 0.92 : 1,
              }
        }
        transition={reduceMotion ? undefined : { duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(900px_560px_at_50%_40%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.20)_48%,rgba(0,0,0,0.78)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/20" />

      <div className="absolute inset-0 opacity-0 transition-opacity duration-700 lg:group-hover:opacity-100">
        <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" />
      </div>

      <motion.div
        aria-hidden
        className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={reduceMotion ? undefined : { background: glowBg }}
      />

      <div className="relative flex min-h-[440px] flex-col justify-end p-8 text-white">
        <div className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
          <Icon size={18} className="text-[rgba(226,192,141,0.78)]" />
        </div>

        <div className="relative">
          <div className="transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] lg:group-hover:-translate-y-6">
            <div className="font-display text-3xl font-medium leading-[1.02] tracking-[-0.03em]">
              {title}
            </div>
          </div>

          <div className="mt-3">
            <p className="text-sm leading-relaxed text-white/75 transition-[max-height,opacity,transform,color] duration-700 ease-[cubic-bezier(.22,1,.36,1)] lg:max-h-0 lg:translate-y-3 lg:overflow-hidden lg:opacity-0 lg:delay-0 lg:group-hover:max-h-48 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-hover:delay-100 lg:group-hover:text-white/92">
              {text}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <a href={`/#${id}`} className="group/btn inline-flex items-center gap-3">
              <span className="relative grid h-12 w-12 place-items-center overflow-hidden rounded-full border border-white/20 bg-white/[0.04] backdrop-blur-sm transition-all duration-500 group-hover/btn:border-white/35 group-hover/btn:bg-white/[0.10] group-hover/btn:shadow-[0_0_0_1px_rgba(226,192,141,0.24),0_16px_44px_-28px_rgba(0,0,0,0.9)]">
                <span className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100 bg-[radial-gradient(140px_140px_at_30%_30%,rgba(226,192,141,0.22)_0%,transparent_60%)]" />
                <ArrowUpRight
                  size={18}
                  className="text-white/85 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover/btn:-rotate-45 group-hover/btn:translate-x-0.5"
                />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-white/70 transition-colors duration-500 group-hover/btn:text-white/90">
                Lees meer
              </span>
            </a>
            <span className="h-px w-12 bg-[rgba(226,192,141,0.50)] transition-all duration-500 group-hover:w-16" />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function AssortmentCategoryCard({
  id,
  title,
  text,
  icon: Icon,
  image,
  stickerSrc,
  index,
}: {
  id: string;
  title: string;
  text: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  image: string;
  stickerSrc?: string;
  index: number;
}) {
  const badgeId = useId();
  const pathId = `assortment-halal-badge-${badgeId}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.95, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-3xl border border-[rgba(226,192,141,0.22)] bg-[#070707] shadow-[0_40px_120px_-95px_rgba(0,0,0,0.98)] transition-shadow duration-700 hover:shadow-[0_56px_170px_-120px_rgba(0,0,0,0.98)]"
    >
      <Link
        to={`/assortiment#${id}`}
        className="relative block"
      >
        <div className="pointer-events-none absolute inset-0">
          <motion.img
            src={image}
            alt=""
            aria-hidden
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: "brightness(0.78) contrast(1.08) saturate(1.04)" }}
            initial={false}
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="absolute inset-0 bg-[radial-gradient(900px_560px_at_60%_20%,rgba(255,255,255,0.10)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(900px_720px_at_45%_92%,rgba(177,18,23,0.26)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/45 to-black/8" />
        </div>

        <div className="pointer-events-none absolute left-7 top-7 grid h-[86px] w-[86px] place-items-center rounded-full border border-[rgba(226,192,141,0.26)] bg-black/35 backdrop-blur-[2px]">
          <svg viewBox="0 0 112 112" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
              <path
                id={pathId}
                d="M56,56 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0"
              />
            </defs>
            <text
              fill="rgba(226,192,141,0.82)"
              fontSize="7.1"
              fontWeight="700"
              letterSpacing="0.26em"
              textAnchor="middle"
            >
              <textPath href={`#${pathId}`} startOffset="50%">
                100% HALAL • PUUR &amp; VERS • 100% HALAL • PUUR &amp; VERS
              </textPath>
            </text>
          </svg>

          {stickerSrc ? (
            <img
              src={stickerSrc}
              alt=""
              aria-hidden
              className="relative h-[30px] w-[30px] opacity-90"
              loading="lazy"
              decoding="async"
              style={{ filter: STICKER_GOLD_FILTER }}
            />
          ) : (
            <Icon size={28} className="relative text-[rgba(226,192,141,0.85)]" />
          )}
        </div>

        <div className="relative flex min-h-[560px] flex-col justify-end p-8 sm:min-h-[600px]">
          <div className="h-px w-10 bg-[#B31217]" />
          <div className="mt-6 font-display text-4xl font-medium leading-[1.03] tracking-[-0.03em] text-[#F5F2ED]">
            {title}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-[rgba(245,242,237,0.70)]">{text}</p>

          <div className="mt-10">
            <div className="group/btn relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-[rgba(226,192,141,0.58)] bg-transparent px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-[rgba(226,192,141,0.92)] transition-colors duration-500 group-hover:text-[#070707]">
              <span className="pointer-events-none absolute inset-0 -translate-x-[110%] bg-[rgba(226,192,141,0.92)] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-0" />
              <span className="relative">Lees meer</span>
              <ArrowRight
                size={14}
                className="relative transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1"
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function CategoryCard({
  title,
  text,
  icon: Icon,
  image,
  index,
}: {
  title: string;
  text: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  image: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-sm border border-white/5 bg-background transition-all duration-500 hover:border-primary/35 hover:bg-surface"
    >
      <div className="absolute inset-0">
        <img
          src={image}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain p-10 opacity-[0.22] transition-transform duration-[1600ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]"
          style={{ filter: "drop-shadow(0 30px 70px rgba(0,0,0,0.55))" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/15 via-background/55 to-background/85" />
        <div className="absolute -left-28 -bottom-28 h-64 w-64 rounded-full bg-[color-mix(in_oklab,var(--accent)_14%,transparent)] blur-[95px]" />
      </div>

      <div className="relative p-8">
        <div className="flex items-start justify-between">
          <Icon size={22} className="text-primary" />
          <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground/55">
            Categorie
          </div>
        </div>
        <h3 className="mt-8 font-display text-2xl text-foreground">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
        <div className="mt-8 h-px w-12 bg-primary/45" />
      </div>
    </motion.div>
  );
}

function AssortmentTile({
  id,
  title,
  text,
  image,
  icon: Icon,
  index,
}: {
  id: string;
  title: string;
  text: string;
  image: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative min-h-[520px] overflow-hidden rounded-sm border border-white/5 bg-background"
    >
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(600px_460px_at_50%_10%,rgba(255,255,255,0.08)_0%,transparent_70%)]" />
        <div className="absolute -left-28 -bottom-28 h-72 w-72 rounded-full bg-primary/14 blur-[120px]" />
      </div>

      <div className="relative flex h-full flex-col justify-between p-10">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/[0.03]">
              <Icon size={20} className="text-primary" />
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground/65">
              100% halal · NL kwaliteit
            </div>
          </div>
          <div className="h-px w-10 bg-white/10" />
        </div>

        <div className="mt-10 flex-1">
          <div className="relative mx-auto grid max-w-[360px] place-items-center">
            <img
              src={image}
              alt=""
              aria-hidden
              loading="lazy"
              decoding="async"
              className="w-full object-contain transition-transform duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05]"
              style={{ filter: "drop-shadow(0 34px 90px rgba(0,0,0,0.60))" }}
            />
          </div>
        </div>

        <div className="mt-10">
          <div className="font-display text-3xl text-foreground">{title}</div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            {text}
          </p>
          <div className="mt-8 flex items-center justify-between">
            <a
              href={`/assortiment#${id}`}
              className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/85 transition-colors hover:border-white/25 hover:bg-white/[0.07]"
            >
              Lees meer
              <ArrowUpRight size={16} className="text-primary" />
            </a>
            <div className="h-px w-12 bg-primary/50" />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function HalalStamp() {
  const reduceMotion = useReducedMotion();
  const icons = useMemo(
    () =>
      [
        {
          key: "lamsvlees",
          src: "https://www.ipekcislachterij.nl/wp-content/uploads/2025/11/sticker_lamsvlees.svg",
        },
        {
          key: "rundvlees",
          src: "https://www.ipekcislachterij.nl/wp-content/uploads/2025/11/sticker_rundvlees.svg",
        },
        {
          key: "kip",
          src: "https://www.ipekcislachterij.nl/wp-content/uploads/2025/11/sticker_gevogelte.svg",
        },
      ] as const,
    [],
  );

  const [shownIdx, setShownIdx] = useState(0);
  const [incomingIdx, setIncomingIdx] = useState<number | null>(null);
  const [loaded, setLoaded] = useState<Record<string, true>>({});
  const [failed, setFailed] = useState<Record<string, true>>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    icons.forEach((icon) => {
      const img = new Image();
      img.onload = () => setLoaded((prev) => ({ ...prev, [icon.key]: true }));
      img.onerror = () => setFailed((prev) => ({ ...prev, [icon.key]: true }));
      img.src = icon.src;
    });
  }, [icons]);

  useEffect(() => {
    if (reduceMotion) return;
    if (incomingIdx !== null) return;

    const current = icons[shownIdx] ?? icons[0];
    const ok = icons.filter((i) => !failed[i.key] && loaded[i.key]);
    if (!current || ok.length < 2) return;

    const t = window.setTimeout(() => {
      let nextIdx = (shownIdx + 1) % icons.length;
      for (let i = 0; i < icons.length; i += 1) {
        const candidate = icons[nextIdx];
        if (candidate && !failed[candidate.key] && loaded[candidate.key]) break;
        nextIdx = (nextIdx + 1) % icons.length;
      }
      if (nextIdx !== shownIdx) setIncomingIdx(nextIdx);
    }, 1000);
    return () => window.clearTimeout(t);
  }, [failed, incomingIdx, loaded, reduceMotion, shownIdx, icons]);

  const shown = icons[shownIdx] ?? icons[0];
  const incoming = incomingIdx !== null ? (icons[incomingIdx] ?? null) : null;

  return (
    <div className="relative grid h-44 w-44 place-items-center rounded-full bg-transparent">
      <svg
        viewBox="0 0 112 112"
        className="absolute inset-0 h-full w-full spin-ring"
        aria-hidden="true"
      >
        <defs>
          <path
            id="halal-stamp-path"
            d="M56,56 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0"
          />
        </defs>
        <text
          fill="rgba(245,241,235,0.68)"
          fontSize="7.2"
          fontWeight="700"
          letterSpacing="0.26em"
          textAnchor="middle"
        >
          <textPath href="#halal-stamp-path" startOffset="50%">
            PREMIUM HALAL  PREMIUM KWALITEIT  IPEKCI SLACHTERIJ
          </textPath>
        </text>
      </svg>

      <div aria-hidden className="relative h-[72px] w-[72px]">
        <motion.img
          key={`shown-${shown?.key}`}
          src={shown?.src}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full opacity-90"
          loading="eager"
          decoding="async"
          referrerPolicy="no-referrer"
          style={{
            filter:
              "sepia(1) saturate(520%) hue-rotate(352deg) brightness(0.66) contrast(1.12) drop-shadow(0 10px 22px rgba(194,139,82,0.12))",
          }}
          initial={false}
          animate={incoming ? { x: -10, opacity: 0 } : { x: 0, opacity: 0.9 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />

        <AnimatePresence>
          {incoming ? (
            <motion.img
              key={`incoming-${incoming.key}`}
              src={incoming.src}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full opacity-90"
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
              style={{
                filter:
                  "sepia(1) saturate(520%) hue-rotate(352deg) brightness(0.66) contrast(1.12) drop-shadow(0 10px 22px rgba(194,139,82,0.12))",
              }}
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 0.9 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              onError={() => {
                setFailed((prev) => ({ ...prev, [incoming.key]: true }));
                setIncomingIdx(null);
              }}
              onAnimationComplete={() => {
                if (incomingIdx !== null) setShownIdx(incomingIdx);
                setIncomingIdx(null);
              }}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ProcessTile({
  step,
  title,
  text,
  icon: Icon,
  index,
}: {
  step: string;
  title: string;
  text: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-sm border border-white/5 bg-surface p-8 transition-all duration-500 hover:border-primary/40 hover:bg-surface-elevated"
    >
      <div className="flex items-start justify-between">
        <div className="text-primary">
          <Icon size={24} />
        </div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground/55">
          {step}
        </div>
      </div>
      <div className="mt-8">
        <h3 className="font-display text-2xl text-foreground">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
      </div>
    </motion.div>
  );
}
