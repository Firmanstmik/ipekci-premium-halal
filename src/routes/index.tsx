import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AnimatePresence,
  motion,
  type MotionValue,
  type Variants,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useInView,
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
import { PremiumMeatShowcase } from "@/components/PremiumMeatShowcase";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import ipekciIntroVideo from "@/assets/videos/Ipekci_introductie.webm";
import brandmovie1 from "@/assets/Ipekci_Brandmovie_1.webm";
import brandmovie2 from "@/assets/Ipekci_Brandmovie_2.webm";
import brandmovie3 from "@/assets/Ipekci_Brandmovie_3.webm";
import assortmentLamsvleesImage from "@/assets/Ons assortiment - dombaa.avif";
import assortmentRundvleesImage from "@/assets/Ons assortiment - sapi.avif";
import assortmentKipImage from "@/assets/Ons assortiment - ayam.avif";
import productenImage from "@/assets/producten.avif";
import cardProductenImage from "@/assets/card-producten.avif";
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
    image:
      "https://www.ipekcislachterij.nl/wp-content/uploads/2025/11/Ipekci-voor-supermarkten.webp",
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
              className="group inline-flex items-center gap-3 rounded-2xl bg-[#9D0208] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_24px_90px_-60px_rgba(0,0,0,0.85)] transition-all duration-500 hover:bg-[#B11217] hover:shadow-[0_0_0_1px_rgba(226,192,141,0.18),0_0_58px_-24px_rgba(177,18,23,0.70),0_34px_110px_-70px_rgba(0,0,0,0.90)] active:translate-y-px"
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
            style={
              reduceMotion ? undefined : { x: px, y: py, rotate: pr, transformStyle: "preserve-3d" }
            }
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

function PremiumTrustPoint({
  icon: Icon,
  label,
  index,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  index: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, x: -14, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.9,
        delay: reduceMotion ? 0 : 0.42 + index * 0.14,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group/trust flex items-center gap-3"
    >
      <motion.div
        className="relative grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-[rgba(226,192,141,0.20)] bg-[rgba(255,255,255,0.02)] shadow-[0_0_28px_-18px_rgba(226,192,141,0.38)] transition-[border-color,box-shadow] duration-500 group-hover/trust:border-[rgba(226,192,141,0.45)] group-hover/trust:shadow-[0_0_40px_-14px_rgba(226,192,141,0.52)]"
        whileHover={reduceMotion ? undefined : { scale: 1.06, y: -2 }}
        transition={{ type: "spring", stiffness: 380, damping: 24 }}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_40%,rgba(226,192,141,0.16)_0%,transparent_68%)] opacity-0 transition-opacity duration-500 group-hover/trust:opacity-100"
        />
        <Icon
          size={16}
          className="relative text-[rgba(226,192,141,0.92)] transition-transform duration-500 group-hover/trust:scale-110"
        />
      </motion.div>
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[rgba(245,241,235,0.74)] transition-colors duration-500 group-hover/trust:text-[rgba(245,241,235,0.94)]">
        {label}
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
  index = 0,
}: {
  label: string;
  title: string;
  description: string;
  image: string;
  imagePosition?: string;
  stickerSrc: string;
  href: string;
  index?: number;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rx = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 160, damping: 26 });
  const ry = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 160, damping: 26 });
  const glowX = useTransform(mx, (v) => `${v * 100}%`);
  const glowY = useTransform(my, (v) => `${v * 100}%`);
  const glowBg = useMotionTemplate`radial-gradient(520px circle at ${glowX} ${glowY}, rgba(226,192,141,0.18), transparent 62%)`;

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
      initial={{ opacity: 0, y: 28, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{
        duration: 1.05,
        delay: reduceMotion ? 0 : 0.18 + index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={reduceMotion ? undefined : { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      className="group relative flex h-[340px] flex-col overflow-hidden rounded-[24px] border border-[rgba(226,192,141,0.14)] bg-[#080808] shadow-[0_40px_120px_-88px_rgba(0,0,0,0.98)] transition-[border-color,box-shadow] duration-700 hover:border-[rgba(226,192,141,0.38)] hover:shadow-[0_0_0_1px_rgba(226,192,141,0.22),0_0_56px_-18px_rgba(226,192,141,0.22),0_52px_150px_-96px_rgba(0,0,0,0.98)] lg:h-[400px]"
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
          filter: "brightness(0.88) contrast(1.14) saturate(1.06)",
          willChange: "transform",
        }}
        initial={false}
        animate={
          reduceMotion
            ? undefined
            : {
                scale: hovered ? 1.14 : 1.07,
                x: hovered ? -8 : 0,
                y: hovered ? -6 : 0,
                rotate: hovered ? -0.9 : -0.15,
              }
        }
        transition={reduceMotion ? undefined : { duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="pointer-events-none absolute inset-0">
        <motion.div
          aria-hidden
          className="absolute inset-0 opacity-[0.55] mix-blend-soft-light"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(255,255,255,0.12) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 20% 20%, rgba(255,255,255,0.06) 0%, transparent 55%)",
          }}
          animate={reduceMotion ? undefined : { opacity: hovered ? 0.72 : 0.55 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(620px_400px_at_28%_12%,rgba(245,241,235,0.10)_0%,transparent_58%)]" />
        <motion.div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(760px_480px_at_82%_42%,rgba(139,14,17,0.22)_0%,transparent_62%)]"
          animate={reduceMotion ? undefined : { opacity: hovered ? 1 : 0.75 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(900px_580px_at_50%_88%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.35)_48%,rgba(0,0,0,0.94)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/38 to-black/10" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/55 to-transparent" />
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
            className="h-6 w-6 select-none opacity-95"
            loading="lazy"
            decoding="async"
            style={{ filter: STICKER_GOLD_FILTER }}
          />
          <span>{label}</span>
        </div>

        <div className="flex-1" />

        <div className="px-6 pb-6">
          <div className="font-display text-[clamp(1.85rem,2.2vw,2.15rem)] font-medium leading-[1.02] tracking-[-0.03em] text-[#F5F1EB]">
            {title}
          </div>
          <p className="mt-3 text-[13px] leading-relaxed text-[rgba(245,241,235,0.68)]">
            {description}
          </p>

          <div className="mt-7 flex items-center justify-between">
            <div className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[rgba(226,192,141,0.72)] transition-colors duration-500 group-hover:text-[rgba(226,192,141,0.95)]">
              Ontdek
            </div>
            <motion.div
              className="relative grid h-12 w-12 place-items-center rounded-full border border-[rgba(226,192,141,0.22)] bg-white/[0.03] backdrop-blur-sm"
              animate={
                reduceMotion
                  ? undefined
                  : hovered
                    ? {
                        scale: 1.08,
                        borderColor: "rgba(226,192,141,0.48)",
                        boxShadow: "0 0 32px -8px rgba(226,192,141,0.45)",
                      }
                    : { scale: 1 }
              }
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
            >
              <motion.div
                aria-hidden
                className="absolute inset-0 rounded-full border border-[rgba(226,192,141,0.35)]"
                animate={reduceMotion ? undefined : hovered ? { scale: [1, 1.35], opacity: [0.5, 0] } : { scale: 1, opacity: 0 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
              />
              <ArrowUpRight
                size={17}
                className="relative text-[rgba(245,241,235,0.85)] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-rotate-45 group-hover:translate-x-0.5"
              />
            </motion.div>
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
      <a href={`/assortiment#${id}`} className="relative block h-full">
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
              <path id={pathId} d="M56,56 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" />
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
            <div className="group/btn relative inline-flex items-center gap-3 overflow-hidden rounded-2xl border border-[rgba(198,160,98,0.58)] bg-transparent px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.26em] text-[rgba(198,160,98,0.92)] transition-colors duration-500 group-hover:text-[#070707]">
              <span className="pointer-events-none absolute inset-0 -translate-x-[110%] bg-[rgba(198,160,98,0.92)] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-0" />
              <span className="relative">Lees meer</span>
              <ArrowRight
                size={13}
                className="relative transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1"
              />
            </div>
          </div>
        </div>
      </a>
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
            EINDPRODUCTEN
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
              className="group inline-flex items-center gap-3 rounded-2xl bg-[#9D0208] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_22px_80px_-60px_rgba(0,0,0,0.85)] transition-all duration-500 hover:bg-[#B11217] hover:shadow-[0_0_0_1px_rgba(226,192,141,0.16),0_0_50px_-24px_rgba(177,18,23,0.65),0_30px_96px_-70px_rgba(0,0,0,0.90)] active:translate-y-px"
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
      <path d="M12 20.6V12.1" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" />
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
      <path d="M6.2 12.1h4.9" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" />
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

function getSegmentsMaxScrollLeft(el: HTMLElement) {
  return Math.max(0, el.scrollWidth - el.clientWidth);
}

function isSegmentsAtRight(el: HTMLElement) {
  const maxScrollLeft = getSegmentsMaxScrollLeft(el);
  if (maxScrollLeft <= 0) return false;

  if (el.scrollLeft >= maxScrollLeft - 12) return true;

  const items = el.querySelectorAll<HTMLElement>("[data-snap-item]");
  if (items.length === 0) return false;

  const last = items[items.length - 1]!;
  const viewRight = el.scrollLeft + el.clientWidth;
  const lastRight = last.offsetLeft + last.offsetWidth;
  return viewRight >= lastRight - 56;
}

function segmentsReturnEase(t: number) {
  const x = Math.max(0, Math.min(1, t));
  return -(Math.cos(Math.PI * x) - 1) / 2;
}

function getSegmentsReturnDuration(scrollPx: number, reducedMotion: boolean) {
  if (reducedMotion) return 500;
  return Math.min(12000, Math.max(7000, scrollPx * 9.5));
}

const SEGMENT_REVEAL_EASE = [0.16, 1, 0.3, 1] as const;

const segmentsCarouselRevealVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.9,
      staggerChildren: 0.28,
    },
  },
};

const segmentCardRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 96,
    scale: 0.97,
    filter: "blur(16px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.25,
      ease: SEGMENT_REVEAL_EASE,
    },
  },
};

const EINDPRODUCTEN_PRODUCTS = [
  {
    category: "Rundvlees",
    title: "Runder Merquez",
    eyebrow: "Premium grill collectie",
    blurb: "Vol van smaak, gekruid voor constante kwaliteit en geschikt voor foodservice en retail.",
    traits: ["Grill", "Foodservice", "Retail"],
    image: "https://www.ipekcislachterij.nl/wp-content/uploads/2025/12/Runder-Merquez.png",
    stickerSrc: HERO_STICKERS.rundvlees,
  },
  {
    category: "Kip",
    title: "Kalkoens-shoarma",
    eyebrow: "Ready to serve",
    blurb: "Luxe shoarma met zachte bite, ontwikkeld voor snelle bereiding en premium presentatie.",
    traits: ["Shoarma", "Retail pack", "Consistent"],
    image: "https://www.ipekcislachterij.nl/wp-content/uploads/2025/12/Kalkoensshoarma.png",
    stickerSrc: HERO_STICKERS.kip,
  },
  {
    category: "Lamsvlees",
    title: "Lamsshoarma",
    eyebrow: "Signature sliced range",
    blurb: "Rijk gekruid en elegant gelaagd, ideaal voor premium horeca en ambachtelijke counters.",
    traits: ["Signature", "Horeca", "Ambacht"],
    image: "https://www.ipekcislachterij.nl/wp-content/uploads/2025/12/Lamsshoarma.png",
    stickerSrc: HERO_STICKERS.lamsvlees,
  },
  {
    category: "Rundvlees",
    title: "Sucuk",
    eyebrow: "Luxury deli classic",
    blurb: "Diepe kruiding en uitgesproken karakter voor premium halal delicatessen en ontbijtmomenten.",
    traits: ["Deli", "Kruidig", "Premium"],
    image: "https://www.ipekcislachterij.nl/wp-content/uploads/2025/12/Turkse-Worst-Sucuk.png",
    stickerSrc: HERO_STICKERS.rundvlees,
  },
  {
    category: "Kip",
    title: "Kip Burger",
    eyebrow: "Packaged burger line",
    blurb: "Ontwikkeld voor retail en snelle service met sappige textuur en nette vormvastheid.",
    traits: ["Burger", "Retail", "Fast service"],
    image: "https://www.ipekcislachterij.nl/wp-content/uploads/2025/12/Kip-burger.png",
    stickerSrc: HERO_STICKERS.kip,
  },
  {
    category: "Rundvlees",
    title: "Hamburger",
    eyebrow: "Classic premium format",
    blurb: "Stevig van structuur en direct inzetbaar voor supermarkten, slagerijen en restaurants.",
    traits: ["Classic", "Retail", "Restaurant"],
    image: "https://www.ipekcislachterij.nl/wp-content/uploads/2025/12/Hamburger.png",
    stickerSrc: HERO_STICKERS.rundvlees,
  },
  {
    category: "Kip",
    title: "Kip Merquez",
    eyebrow: "Spiced sausage edit",
    blurb: "Halal premium worst met levendige kruiding, ontworpen voor onderscheidend assortiment.",
    traits: ["Spiced", "Counter", "Distinctive"],
    image: "https://www.ipekcislachterij.nl/wp-content/uploads/2025/12/Kip-Merquez-1.png",
    stickerSrc: HERO_STICKERS.kip,
  },
  {
    category: "Rundvlees",
    title: "Adana Kebab",
    eyebrow: "Chef driven favourite",
    blurb: "Intens gekruid en visueel krachtig, perfect voor premium fast casual en grillconcepten.",
    traits: ["Chef line", "Grill", "Bold taste"],
    image: "https://www.ipekcislachterij.nl/wp-content/uploads/2025/11/Adana-Kebab.png",
    stickerSrc: HERO_STICKERS.rundvlees,
  },
  {
    category: "Kip",
    title: "Kip döner",
    eyebrow: "Vertical carve range",
    blurb: "Zacht gekruid en ontwikkeld voor hoog volume met consistente sappigheid en kleur.",
    traits: ["Doner", "High volume", "Consistent"],
    image: "https://www.ipekcislachterij.nl/wp-content/uploads/2025/12/placeholder.webp",
    stickerSrc: HERO_STICKERS.kip,
  },
] as const;

const EINDPRODUCTEN_CARD_BG_POSITIONS = [
  "18% 22%",
  "46% 26%",
  "78% 20%",
  "28% 78%",
  "62% 44%",
  "84% 62%",
  "16% 70%",
  "54% 14%",
  "72% 80%",
] as const;

const EINDPRODUCTEN_REVEAL_EASE = [0.16, 1, 0.3, 1] as const;

function PremiumTypewriter({
  text,
  className = "",
  startDelay = 0.2,
  charMs = 42,
}: {
  text: string;
  className?: string;
  startDelay?: number;
  charMs?: number;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [visibleCount, setVisibleCount] = useState(reduceMotion ? text.length : 0);
  const [done, setDone] = useState(Boolean(reduceMotion));

  useEffect(() => {
    if (!isInView) return;
    if (reduceMotion) {
      setVisibleCount(text.length);
      setDone(true);
      return;
    }

    setVisibleCount(0);
    setDone(false);
    let i = 0;
    let timeoutId = 0;

    const tick = () => {
      i += 1;
      setVisibleCount(i);
      if (i < text.length) {
        const jitter = i % 5 === 0 ? 14 : 0;
        timeoutId = window.setTimeout(tick, charMs + jitter);
      } else {
        setDone(true);
      }
    };

    timeoutId = window.setTimeout(tick, startDelay * 1000);
    return () => window.clearTimeout(timeoutId);
  }, [isInView, reduceMotion, text, charMs, startDelay]);

  const visible = text.slice(0, visibleCount);

  return (
    <h2 ref={ref} className={className} aria-label={text}>
      <span aria-hidden className="inline">
        {visible}
        {!done ? (
          <motion.span
            aria-hidden
            className="ml-[0.06em] inline-block h-[0.82em] w-[2px] translate-y-[0.06em] rounded-full bg-[#1A1A1A]/75"
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 1.05, ease: "easeInOut", repeat: Infinity }}
          />
        ) : null}
      </span>
    </h2>
  );
}

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
  const eindproductenShowcaseRef = useRef<HTMLDivElement>(null);
  const [segmentsCanScrollLeft, setSegmentsCanScrollLeft] = useState(false);
  const [segmentsCanScrollRight, setSegmentsCanScrollRight] = useState(false);
  const [segmentsDragging, setSegmentsDragging] = useState(false);
  const [eindproductenCanScrollLeft, setEindproductenCanScrollLeft] = useState(false);
  const [eindproductenCanScrollRight, setEindproductenCanScrollRight] = useState(false);
  const [eindproductenDragging, setEindproductenDragging] = useState(false);
  const [eindproductenProgress, setEindproductenProgress] = useState(0);
  const [eindproductenIntroComplete, setEindproductenIntroComplete] = useState(Boolean(reduceMotion));
  const [heroPoster, setHeroPoster] = useState<string | null>(null);
  const [heroVideoActive, setHeroVideoActive] = useState(false);
  const eindproductenShowcaseInView = useInView(eindproductenShowcaseRef, {
    once: true,
    margin: "-120px",
  });

  const segmentsTiltRaw = useMotionValue(0);
  const segmentsTilt = useSpring(segmentsTiltRaw, { stiffness: 240, damping: 32 });

  const eindproductenTiltRaw = useMotionValue(0);
  const eindproductenTilt = useSpring(eindproductenTiltRaw, { stiffness: 240, damping: 32 });

  const segmentsPointerIdRef = useRef<number | null>(null);
  const segmentsDragStartXRef = useRef(0);
  const segmentsDragStartLeftRef = useRef(0);
  const segmentsLastXRef = useRef(0);
  const segmentsLastTRef = useRef(0);
  const segmentsVelocityRef = useRef(0);
  const segmentsInertiaRafRef = useRef<number | null>(null);
  const segmentsAutoRafRef = useRef<number | null>(null);
  const segmentsAutoDirRef = useRef<1 | -1>(1);
  const segmentsLastInteractRef = useRef(0);
  const segmentsLastAutoScrollRef = useRef(0);
  const segmentsEdgeReturnRef = useRef(false);
  const segmentsDraggingRef = useRef(false);
  const segmentsCardHoveredRef = useRef(false);
  const segmentsAtRightRef = useRef(false);
  const segmentsReturningRef = useRef(false);
  const segmentsReturnAnimRef = useRef<{
    start: number;
    from: number;
    duration: number;
  } | null>(null);

  const eindproductenPointerIdRef = useRef<number | null>(null);
  const eindproductenDragStartXRef = useRef(0);
  const eindproductenDragStartLeftRef = useRef(0);
  const eindproductenLastXRef = useRef(0);
  const eindproductenLastTRef = useRef(0);
  const eindproductenVelocityRef = useRef(0);
  const eindproductenInertiaRafRef = useRef<number | null>(null);
  const eindproductenAutoRafRef = useRef<number | null>(null);
  const eindproductenAutoDirRef = useRef<1 | -1>(1);
  const eindproductenAutoHoldUntilRef = useRef(0);
  const eindproductenAutoPausedRef = useRef(false);
  const eindproductenDraggingRef = useRef(false);

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
    if (!eindproductenShowcaseInView) return;
    if (reduceMotion) {
      setEindproductenIntroComplete(true);
      return;
    }

    setEindproductenIntroComplete(false);
    const timer = window.setTimeout(() => {
      setEindproductenIntroComplete(true);
    }, 2500);

    return () => window.clearTimeout(timer);
  }, [eindproductenShowcaseInView, reduceMotion]);

  useEffect(() => {
    const el = eindproductenScrollerRef.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      const nextEl = eindproductenScrollerRef.current;
      if (!nextEl) return;
      const maxScrollLeft = Math.max(0, nextEl.scrollWidth - nextEl.clientWidth);
      const epsilon = 2;
      setEindproductenCanScrollLeft(nextEl.scrollLeft > epsilon);
      setEindproductenCanScrollRight(nextEl.scrollLeft < maxScrollLeft - epsilon);
      const nextProgress = maxScrollLeft > 0 ? nextEl.scrollLeft / maxScrollLeft : 0;
      setEindproductenProgress((prev) =>
        Math.abs(prev - nextProgress) < 0.003 ? prev : Math.max(0, Math.min(1, nextProgress)),
      );
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
      const canScrollRight = nextEl.scrollLeft < maxScrollLeft - epsilon;
      const atRightEdge =
        maxScrollLeft > 0 &&
        (isSegmentsAtRight(nextEl) || nextEl.scrollLeft >= maxScrollLeft - 48);
      setSegmentsCanScrollLeft(nextEl.scrollLeft > epsilon);
      setSegmentsCanScrollRight(canScrollRight);
      segmentsAtRightRef.current = atRightEdge;
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
    eindproductenDraggingRef.current = eindproductenDragging;
  }, [eindproductenDragging]);

  useEffect(() => {
    if (reduceMotion || !eindproductenShowcaseInView || !eindproductenIntroComplete) return;

    let lastT = performance.now();
    eindproductenAutoDirRef.current = 1;

    const tick = (t: number) => {
      const el = eindproductenScrollerRef.current;
      if (!el) {
        eindproductenAutoRafRef.current = requestAnimationFrame(tick);
        return;
      }

      const dt = Math.min(32, Math.max(1, t - lastT));
      lastT = t;

      const paused =
        eindproductenAutoPausedRef.current ||
        eindproductenDraggingRef.current ||
        t < eindproductenAutoHoldUntilRef.current ||
        document.hidden;

      if (!paused) {
        const maxScrollLeft = Math.max(0, el.scrollWidth - el.clientWidth);
        if (maxScrollLeft > 0) {
          const distanceToEdge =
            eindproductenAutoDirRef.current > 0 ? maxScrollLeft - el.scrollLeft : el.scrollLeft;
          const edgeFactor = Math.max(0.42, Math.min(1, distanceToEdge / 260));
          const speed = (0.0105 + 0.013 * edgeFactor) * dt;
          let next = el.scrollLeft + eindproductenAutoDirRef.current * speed;

          if (next >= maxScrollLeft) {
            next = maxScrollLeft;
            eindproductenAutoDirRef.current = -1;
          } else if (next <= 0) {
            next = 0;
            eindproductenAutoDirRef.current = 1;
          }

          el.scrollLeft = next;
          eindproductenTiltRaw.set(
            Math.max(-0.28, Math.min(0.28, eindproductenAutoDirRef.current * 0.14 * edgeFactor)),
          );
        }
      } else {
        eindproductenTiltRaw.set(0);
      }

      eindproductenAutoRafRef.current = requestAnimationFrame(tick);
    };

    eindproductenAutoRafRef.current = requestAnimationFrame(tick);
    return () => {
      const raf = eindproductenAutoRafRef.current;
      if (raf) cancelAnimationFrame(raf);
      eindproductenAutoRafRef.current = null;
      eindproductenTiltRaw.set(0);
    };
  }, [reduceMotion, eindproductenDragging, eindproductenIntroComplete, eindproductenShowcaseInView, eindproductenTiltRaw]);

  useEffect(() => {
    segmentsDraggingRef.current = segmentsDragging;
  }, [segmentsDragging]);

  useEffect(() => {
    segmentsLastInteractRef.current = performance.now();

    const disableSnap = (el: HTMLDivElement) => {
      el.style.setProperty("scroll-snap-type", "none", "important");
    };

    const restoreSnap = (el: HTMLDivElement) => {
      el.style.removeProperty("scroll-snap-type");
    };

    const beginReturn = (el: HTMLDivElement, t: number) => {
      const from = el.scrollLeft;
      if (from <= 1) return;

      disableSnap(el);
      segmentsReturningRef.current = true;
      segmentsEdgeReturnRef.current = true;
      segmentsReturnAnimRef.current = {
        start: t,
        from,
        duration: getSegmentsReturnDuration(from, Boolean(reduceMotion)),
      };
      segmentsLastAutoScrollRef.current = t;
    };

    const finishReturn = (el: HTMLDivElement) => {
      el.scrollLeft = 0;
      restoreSnap(el);
      segmentsReturningRef.current = false;
      segmentsReturnAnimRef.current = null;
      segmentsEdgeReturnRef.current = false;
    };

    const tick = (t: number) => {
      const el = segmentsScrollerRef.current;
      if (!el) {
        segmentsAutoRafRef.current = requestAnimationFrame(tick);
        return;
      }

      const atRight = segmentsAtRightRef.current;
      const cardHovered = segmentsCardHoveredRef.current;
      const idleMs = t - segmentsLastInteractRef.current;
      const rightEdgeIdleMs = 1500;
      const returnAnim = segmentsReturnAnimRef.current;

      if (!atRight && !returnAnim) {
        segmentsEdgeReturnRef.current = false;
      }

      if (returnAnim && cardHovered) {
        restoreSnap(el);
        segmentsReturningRef.current = false;
        segmentsReturnAnimRef.current = null;
        segmentsEdgeReturnRef.current = false;
      } else if (returnAnim) {
        const elapsed = t - returnAnim.start;
        const progress = Math.min(1, elapsed / returnAnim.duration);
        const eased = segmentsReturnEase(progress);
        el.scrollLeft = returnAnim.from * (1 - eased);
        segmentsLastAutoScrollRef.current = t;

        if (progress >= 1) {
          finishReturn(el);
        }
      } else if (
        atRight &&
        !segmentsDraggingRef.current &&
        !document.hidden &&
        !cardHovered &&
        idleMs >= rightEdgeIdleMs
      ) {
        beginReturn(el, t);
      }

      segmentsAutoRafRef.current = requestAnimationFrame(tick);
    };

    segmentsAutoRafRef.current = requestAnimationFrame(tick);
    return () => {
      const raf = segmentsAutoRafRef.current;
      if (raf) cancelAnimationFrame(raf);
      segmentsAutoRafRef.current = null;
      const el = segmentsScrollerRef.current;
      if (el) restoreSnap(el);
      segmentsReturningRef.current = false;
      segmentsReturnAnimRef.current = null;
    };
  }, [reduceMotion]);

  const scrollToSnapItem = (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: "left" | "right",
  ) => {
    const el = ref.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-snap-item]"));
    if (items.length === 0) return;

    const viewportCenter = el.scrollLeft + el.clientWidth / 2;
    const epsilon = 1;
    const centerOf = (it: HTMLElement) => it.offsetLeft + it.offsetWidth / 2;
    const sorted = items.slice().sort((a, b) => centerOf(a) - centerOf(b));

    const target =
      direction === "right"
        ? (sorted.find((it) => centerOf(it) > viewportCenter + epsilon) ??
          sorted[sorted.length - 1])
        : (sorted
            .slice()
            .reverse()
            .find((it) => centerOf(it) < viewportCenter - epsilon) ?? sorted[0]);

    const maxScrollLeft = Math.max(0, el.scrollWidth - el.clientWidth);
    const targetLeft = target.offsetLeft - (el.clientWidth - target.offsetWidth) / 2;
    const nextLeft = Math.min(maxScrollLeft, Math.max(0, targetLeft));
    el.scrollTo({ left: nextLeft, behavior: "smooth" });
  };

  const scrollSegments = (direction: "left" | "right") => {
    markSegmentsUserInteract();
    const el = segmentsScrollerRef.current;
    if (!el) return;
    if (direction === "right" && !segmentsCanScrollRight) {
      el.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }
    scrollToSnapItem(segmentsScrollerRef, direction);
  };

  const markSegmentsUserInteract = () => {
    segmentsLastInteractRef.current = performance.now();
    segmentsEdgeReturnRef.current = false;
    segmentsReturnAnimRef.current = null;
    segmentsReturningRef.current = false;
    const el = segmentsScrollerRef.current;
    if (el) el.style.removeProperty("scroll-snap-type");
  };

  const handleSegmentCardHover = (hovered: boolean) => {
    segmentsCardHoveredRef.current = hovered;
  };

  const stopSegmentsInertia = () => {
    const raf = segmentsInertiaRafRef.current;
    if (raf) cancelAnimationFrame(raf);
    segmentsInertiaRafRef.current = null;
  };

  const startSegmentsInertia = (velocityPxPerMs: number) => {
    if (reduceMotion) return;
    const el = segmentsScrollerRef.current;
    if (!el) return;
    stopSegmentsInertia();
    let v = velocityPxPerMs;
    let lastT = performance.now();

    const tick = (t: number) => {
      const nextEl = segmentsScrollerRef.current;
      if (!nextEl) return;
      const dt = Math.max(0, t - lastT);
      lastT = t;

      const maxScrollLeft = Math.max(0, nextEl.scrollWidth - nextEl.clientWidth);
      const nextLeft = nextEl.scrollLeft + v * dt;
      nextEl.scrollLeft = Math.min(maxScrollLeft, Math.max(0, nextLeft));

      const atEdge = nextEl.scrollLeft <= 0.5 || nextEl.scrollLeft >= maxScrollLeft - 0.5;
      const decay = atEdge ? 0.86 : 0.93;
      v *= Math.pow(decay, dt / 16);

      const tilt = Math.max(-0.9, Math.min(0.9, v * 0.08));
      segmentsTiltRaw.set(tilt);

      if (Math.abs(v) < 0.02) {
        segmentsTiltRaw.set(0);
        stopSegmentsInertia();
        return;
      }

      segmentsInertiaRafRef.current = requestAnimationFrame(tick);
    };

    segmentsInertiaRafRef.current = requestAnimationFrame(tick);
  };

  const handleSegmentsPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = segmentsScrollerRef.current;
    if (!el) return;
    markSegmentsUserInteract();
    stopSegmentsInertia();
    segmentsPointerIdRef.current = e.pointerId;
    segmentsDragStartXRef.current = e.clientX;
    segmentsDragStartLeftRef.current = el.scrollLeft;
    segmentsLastXRef.current = e.clientX;
    segmentsLastTRef.current = performance.now();
    segmentsVelocityRef.current = 0;
    segmentsTiltRaw.set(0);
    setSegmentsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleSegmentsPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    if (segmentsPointerIdRef.current !== e.pointerId) return;
    const el = segmentsScrollerRef.current;
    if (!el) return;
    e.preventDefault();
    const dx = e.clientX - segmentsDragStartXRef.current;
    el.scrollLeft = segmentsDragStartLeftRef.current - dx;

    const now = performance.now();
    const dt = Math.max(1, now - segmentsLastTRef.current);
    const vx = (e.clientX - segmentsLastXRef.current) / dt;
    segmentsLastXRef.current = e.clientX;
    segmentsLastTRef.current = now;
    segmentsVelocityRef.current = segmentsVelocityRef.current * 0.82 + vx * 0.18;

    const scrollV = -segmentsVelocityRef.current;
    const tilt = Math.max(-0.95, Math.min(0.95, scrollV * 1.2));
    segmentsTiltRaw.set(tilt);
  };

  const handleSegmentsPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    if (segmentsPointerIdRef.current !== e.pointerId) return;
    segmentsPointerIdRef.current = null;
    markSegmentsUserInteract();
    setSegmentsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}

    const scrollV = -segmentsVelocityRef.current;
    startSegmentsInertia(scrollV * 26);
    window.setTimeout(() => segmentsTiltRaw.set(0), 0);
  };

  const stopEindproductenInertia = () => {
    const raf = eindproductenInertiaRafRef.current;
    if (raf) cancelAnimationFrame(raf);
    eindproductenInertiaRafRef.current = null;
  };

  const disableEindproductenSnap = () => {
    const el = eindproductenScrollerRef.current;
    if (!el) return;
    el.style.setProperty("scroll-snap-type", "none", "important");
  };

  const restoreEindproductenSnap = () => {
    const el = eindproductenScrollerRef.current;
    if (!el) return;
    window.setTimeout(() => {
      const nextEl = eindproductenScrollerRef.current;
      if (!nextEl) return;
      nextEl.style.removeProperty("scroll-snap-type");
    }, 80);
  };

  const startEindproductenInertia = (velocityPxPerMs: number) => {
    if (reduceMotion) return;
    const el = eindproductenScrollerRef.current;
    if (!el) return;
    stopEindproductenInertia();
    let v = velocityPxPerMs;
    let lastT = performance.now();

    const tick = (t: number) => {
      const nextEl = eindproductenScrollerRef.current;
      if (!nextEl) return;
      const dt = Math.max(0, t - lastT);
      lastT = t;

      const maxScrollLeft = Math.max(0, nextEl.scrollWidth - nextEl.clientWidth);
      const nextLeft = nextEl.scrollLeft + v * dt;
      nextEl.scrollLeft = Math.min(maxScrollLeft, Math.max(0, nextLeft));

      const atEdge = nextEl.scrollLeft <= 0.5 || nextEl.scrollLeft >= maxScrollLeft - 0.5;
      const decay = atEdge ? 0.86 : 0.93;
      v *= Math.pow(decay, dt / 16);

      const tilt = Math.max(-1.1, Math.min(1.1, v * 0.09));
      eindproductenTiltRaw.set(tilt);

      if (Math.abs(v) < 0.02) {
        eindproductenTiltRaw.set(0);
        stopEindproductenInertia();
        return;
      }

      eindproductenInertiaRafRef.current = requestAnimationFrame(tick);
    };

    eindproductenInertiaRafRef.current = requestAnimationFrame(tick);
  };

  const markEindproductenUserInteract = (holdMs = 3200) => {
    eindproductenAutoHoldUntilRef.current = performance.now() + holdMs;
  };

  const handleEindproductenPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = eindproductenScrollerRef.current;
    if (!el) return;
    markEindproductenUserInteract(4200);
    stopEindproductenInertia();
    disableEindproductenSnap();
    eindproductenPointerIdRef.current = e.pointerId;
    eindproductenDragStartXRef.current = e.clientX;
    eindproductenDragStartLeftRef.current = el.scrollLeft;
    eindproductenLastXRef.current = e.clientX;
    eindproductenLastTRef.current = performance.now();
    eindproductenVelocityRef.current = 0;
    eindproductenTiltRaw.set(0);
    setEindproductenDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleEindproductenPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    if (eindproductenPointerIdRef.current !== e.pointerId) return;
    const el = eindproductenScrollerRef.current;
    if (!el) return;
    e.preventDefault();
    const dx = e.clientX - eindproductenDragStartXRef.current;
    el.scrollLeft = eindproductenDragStartLeftRef.current - dx;

    const now = performance.now();
    const dt = Math.max(1, now - eindproductenLastTRef.current);
    const vx = (e.clientX - eindproductenLastXRef.current) / dt;
    eindproductenLastXRef.current = e.clientX;
    eindproductenLastTRef.current = now;
    eindproductenVelocityRef.current = eindproductenVelocityRef.current * 0.82 + vx * 0.18;

    const scrollV = -eindproductenVelocityRef.current;
    const tilt = Math.max(-1.1, Math.min(1.1, scrollV * 1.4));
    eindproductenTiltRaw.set(tilt);
  };

  const handleEindproductenPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    if (eindproductenPointerIdRef.current !== e.pointerId) return;
    eindproductenPointerIdRef.current = null;
    setEindproductenDragging(false);
    markEindproductenUserInteract(4200);
    restoreEindproductenSnap();
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}

    const scrollV = -eindproductenVelocityRef.current;
    startEindproductenInertia(scrollV * 28);
    window.setTimeout(() => eindproductenTiltRaw.set(0), 0);
  };

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
          <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(11,11,11,0.86)_0%,rgba(11,11,11,0.50)_34%,rgba(11,11,11,0.16)_54%,rgba(11,11,11,0)_72%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_38%_0%,rgba(255,255,255,0.10)_0%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(1100px_760px_at_50%_48%,rgba(0,0,0,0)_0%,rgba(0,0,0,0)_60%,rgba(0,0,0,0.62)_100%)]" />
          <div className="absolute -bottom-40 left-1/4 h-[600px] w-[700px] rounded-full bg-primary/16 blur-[190px]" />
          <div className="absolute -top-28 right-0 h-[420px] w-[580px] rounded-full bg-[color-mix(in_oklab,var(--accent)_18%,transparent)] blur-[210px]" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 mx-auto flex h-full max-w-[1480px] flex-col px-5 pb-10 pt-32 sm:px-8 sm:pb-12 sm:pt-36 lg:px-12 lg:pb-14 lg:pt-44"
        >
          <div className="flex flex-1 items-center">
            <div className="w-full max-w-[660px] lg:max-w-[760px]">
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

              <motion.h1 className="mt-7 font-display text-[clamp(3.6rem,5.8vw,6.3rem)] font-semibold leading-[0.96] tracking-[-0.04em] text-foreground">
                <span className="block overflow-x-visible overflow-y-hidden pr-2 pb-[0.12em] -mb-[0.12em]">
                  <motion.span
                    initial={
                      reduceMotion
                        ? { opacity: 1, y: 0, filter: "blur(0px)" }
                        : { opacity: 0, y: 36, filter: "blur(14px)" }
                    }
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.26, duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
                    className="block sm:whitespace-nowrap"
                  >
                    Groots in premium
                  </motion.span>
                </span>
                <span className="mt-1 block overflow-x-visible overflow-y-hidden pr-2">
                  <motion.span
                    initial={
                      reduceMotion
                        ? { opacity: 1, y: 0, filter: "blur(0px)" }
                        : { opacity: 0, y: 44, filter: "blur(16px)" }
                    }
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
                Ipekçi is een van de grootste halal-lammerenslachthuizen van Nederland. Sinds 2012
                leveren wij premium halal vlees en eindproducten aan slagerijen, groothandels,
                supermarkten en restaurants in heel Nederland.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.72, duration: 0.9 }}
                className="mt-10 flex flex-wrap items-center gap-3"
              >
                <Link
                  to="/ons-verhaal"
                  className="group inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-foreground shadow-[0_0_30px_-16px_color-mix(in_oklab,var(--primary)_70%,transparent)] transition-all duration-300 hover:shadow-[0_0_44px_-16px_color-mix(in_oklab,var(--primary)_80%,transparent)] active:translate-y-px"
                >
                  Ontdek ons verhaal
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
                <Link
                  to="/assortiment"
                  className="group inline-flex items-center gap-2 rounded-2xl border border-white/18 bg-black/40 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/90 transition-all duration-300 hover:border-white/26 hover:bg-black/55"
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

          <div className="pointer-events-none absolute right-8 top-40 hidden lg:block">
            <HalalStamp />
          </div>
        </motion.div>
      </section>

      <PremiumMeatShowcase />

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
                  Ipekçi Slachterij staat voor premium halalvlees van Nederlandse bodem. Met respect
                  voor islamitische normen en oog voor kwaliteit, leveren wij sinds 2012 aan
                  tevreden klanten in heel Nederland.
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
                    className="group inline-flex items-center gap-3 rounded-2xl bg-[#8B0E11] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_0_40px_-18px_rgba(177,18,23,0.45)] transition-all duration-300 hover:bg-[#B11217] hover:shadow-[0_0_58px_-18px_rgba(177,18,23,0.60)] active:translate-y-px"
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
              <CardContainer
                containerClassName="py-0 flex items-stretch justify-start"
                className="w-full"
              >
                <CardBody className="relative h-auto w-full rounded-3xl border border-black/10 bg-white/70 p-0 shadow-[0_36px_120px_-80px_rgba(0,0,0,0.55)]">
                  <div className="grid gap-3 p-3 sm:gap-4 sm:p-4 md:grid-cols-12">
                    <CardItem
                      translateZ={24}
                      className="relative w-full overflow-hidden rounded-2xl md:col-span-7 md:row-span-2"
                    >
                      <video
                        src={brandmovie1}
                        muted
                        loop
                        playsInline
                        autoPlay
                        preload="metadata"
                        aria-hidden
                        className="h-[340px] w-full object-cover md:h-full"
                        style={{ filter: "brightness(0.9) contrast(1.06) saturate(1.02)" }}
                      />
                      <div className="absolute inset-0 bg-[radial-gradient(800px_520px_at_30%_25%,rgba(255,255,255,0.18)_0%,transparent_62%)]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/5" />
                    </CardItem>

                    <CardItem
                      translateZ={18}
                      className="relative w-full overflow-hidden rounded-2xl md:col-span-5"
                    >
                      <video
                        src={brandmovie2}
                        muted
                        loop
                        playsInline
                        autoPlay
                        preload="metadata"
                        aria-hidden
                        className="h-[170px] w-full object-cover md:h-[210px]"
                        style={{ filter: "brightness(0.9) contrast(1.06) saturate(1.02)" }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/5" />
                    </CardItem>

                    <CardItem
                      translateZ={18}
                      className="relative w-full overflow-hidden rounded-2xl md:col-span-5"
                    >
                      <video
                        src={brandmovie3}
                        muted
                        loop
                        playsInline
                        autoPlay
                        preload="metadata"
                        aria-hidden
                        className="h-[170px] w-full object-cover md:h-[210px]"
                        style={{ filter: "brightness(0.9) contrast(1.06) saturate(1.02)" }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/38 via-transparent to-black/5" />
                    </CardItem>
                  </div>

                  <CardItem
                    translateZ={40}
                    className="absolute bottom-5 left-1/2 w-[320px] -translate-x-1/2 px-3 sm:bottom-6 sm:w-[360px]"
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-[#8B0E11] p-5 text-white shadow-[0_30px_90px_-55px_rgba(0,0,0,0.75)]">
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(420px_260px_at_20%_15%,rgba(255,255,255,0.20)_0%,transparent_60%)]" />
                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.10)_0%,rgba(0,0,0,0)_40%,rgba(0,0,0,0.16)_100%)]" />
                      <div className="relative flex items-start gap-4">
                        <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 bg-white/10">
                          <HalalSealIcon size={18} className="text-white/90" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold tracking-[-0.01em]">
                            Halal & Vertrouwd
                          </div>
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
        className="relative isolate overflow-hidden border-y border-white/5 bg-[#080808] px-6 py-20 text-white grain lg:px-10 lg:py-28"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_18%_42%,rgba(255,255,255,0.06)_0%,transparent_58%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(980px_720px_at_82%_28%,rgba(226,192,141,0.09)_0%,transparent_62%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(1100px_820px_at_42%_88%,rgba(139,14,17,0.28)_0%,transparent_58%)]" />
          <motion.div className="absolute inset-0 bg-[radial-gradient(1200px_760px_at_50%_60%,rgba(0,0,0,0)_0%,rgba(0,0,0,0)_50%,rgba(0,0,0,0.88)_100%)]" />
        </div>

        <div className="relative mx-auto max-w-[1480px]">
          <div className="relative z-0 grid gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col justify-center lg:col-span-4"
            >
              <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#B11217]">
                PREMIUM KWALITEIT
              </div>
              <h2 className="mt-6 font-display text-[clamp(2.6rem,3.8vw,4.1rem)] font-medium leading-[1.02] tracking-[-0.03em] text-[#F5F1EB]">
                Vlees van topkwaliteit,
                <span className="mt-2 block italic text-[rgba(226,192,141,0.94)]">
                  voor elke behoefte
                </span>
              </h2>

              <div className="relative mt-8 h-px w-24 bg-[linear-gradient(90deg,rgba(226,192,141,0.0),rgba(226,192,141,0.55),rgba(226,192,141,0.0))]">
                <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#B31217]" />
              </div>

              <p className="mt-6 max-w-[520px] text-[15px] leading-[1.68] text-[rgba(245,241,235,0.66)]">
                Dagelijks vers, halal gecertificeerd en met zorg geselecteerd.
                <span className="mt-0.5 block">Ontdek ons uitgebreide assortiment premium vlees.</span>
              </p>

              <div className="mt-6 space-y-3">
                <PremiumTrustPoint icon={ShieldCheck} label="100% Halal Gecertificeerd" index={0} />
                <PremiumTrustPoint icon={DutchCraftIcon} label="Nederlandse Kwaliteit" index={1} />
                <PremiumTrustPoint icon={Truck} label="Dagelijks Vers Geleverd" index={2} />
              </div>
            </motion.div>

            <div className="grid gap-5 lg:col-span-8 lg:grid-cols-3 lg:items-stretch">
              <AssortimentProductCard
                label="Premium lamsvlees"
                title="Lamsvlees"
                description="Mals, smaakvol en zorgvuldig geselecteerd lamsvlees van topkwaliteit."
                image={assortmentLamsvleesImage}
                imagePosition="24% 26%"
                stickerSrc={HERO_STICKERS.lamsvlees}
                href="/assortiment#lamsvlees"
                index={0}
              />
              <AssortimentProductCard
                label="Premium rundvlees"
                title="Rundvlees"
                description="Premium rundvlees, perfect voor elke professionele keuken."
                image={assortmentRundvleesImage}
                imagePosition="52% 28%"
                stickerSrc={HERO_STICKERS.rundvlees}
                href="/assortiment#rundvlees"
                index={1}
              />
              <AssortimentProductCard
                label="Premium kip"
                title="Kip"
                description="Halal kip van hoge kwaliteit, dagvers en breed inzetbaar in elk gerecht."
                image={assortmentKipImage}
                imagePosition="72% 30%"
                stickerSrc={HERO_STICKERS.kip}
                href="/assortiment#kip"
                index={2}
              />
            </div>
          </div>

          <div className="relative z-20 mt-8 border-t border-white/[0.06] pt-6 lg:mt-10 lg:pt-8">
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-[rgba(245,241,235,0.38)]">
              Verder in ons assortiment
            </div>
            <EindproductenStrip
              title={endProducts.title}
              text={endProducts.text}
              image={endProducts.image}
            />
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
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="text-[10px] font-semibold uppercase tracking-[0.34em] text-primary"
              >
                VOOR WIE WIJ WERKEN
              </motion.div>
              <PremiumTypewriter
                text="Halalvlees voor verkoop en bereiding"
                className="mt-6 text-balance font-display text-[clamp(2.2rem,3.2vw,3.4rem)] font-medium leading-[1.03] tracking-[-0.03em] text-[#1A1A1A]"
                startDelay={0.28}
                charMs={40}
              />
              <motion.p
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{
                  duration: 0.95,
                  delay: reduceMotion ? 0.1 : 2.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-7 max-w-lg text-base leading-relaxed text-[#1A1A1A]/82"
              >
                Ipekçi levert premium halalvlees en eindproducten aan slagerijen, groothandels,
                supermarkten en restaurants, met constante kwaliteit, hygiënische verwerking en
                betrouwbare levering.
              </motion.p>
            </div>

            <div className="min-w-0 lg:col-span-7 lg:-mr-10">
              <div className="relative min-w-0">
                <div aria-hidden className="pointer-events-none absolute inset-0 z-10">
                  {[
                    { left: "12%", top: "18%", size: 2, o: 0.26, d: 0 },
                    { left: "22%", top: "72%", size: 2, o: 0.20, d: 0.2 },
                    { left: "44%", top: "28%", size: 3, o: 0.22, d: 0.35 },
                    { left: "64%", top: "18%", size: 2, o: 0.18, d: 0.55 },
                    { left: "78%", top: "66%", size: 3, o: 0.20, d: 0.7 },
                    { left: "92%", top: "34%", size: 2, o: 0.16, d: 0.9 },
                  ].map((p) => (
                    <motion.span
                      key={`${p.left}-${p.top}`}
                      className="absolute rounded-full bg-white"
                      style={{
                        left: p.left,
                        top: p.top,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        opacity: p.o,
                        filter: "blur(0.2px)",
                      }}
                      animate={reduceMotion ? undefined : { y: [0, -9, 0], opacity: [p.o, p.o + 0.06, p.o] }}
                      transition={
                        reduceMotion
                          ? undefined
                          : { duration: 8.5, ease: "easeInOut", repeat: Infinity, delay: p.d }
                      }
                    />
                  ))}
                </div>

                <div className="pointer-events-none absolute inset-0 z-10">
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-28 transition-opacity duration-700 ease-[cubic-bezier(.22,1,.36,1)] sm:w-32 ${
                      segmentsCanScrollRight ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(270deg,rgba(245,241,235,0.98)_0%,rgba(245,241,235,0.72)_18%,rgba(245,241,235,0.18)_56%,rgba(245,241,235,0)_100%)]" />
                  </div>

                  <div className="absolute left-2 top-1/2 -translate-y-1/2">
                    {segmentsCanScrollLeft ? (
                      <button
                        type="button"
                        aria-label="Scroll links"
                        onClick={() => {
                          scrollSegments("left");
                        }}
                        className="pointer-events-auto group grid h-10 w-10 place-items-center rounded-2xl border border-black/10 bg-white/55 shadow-[0_22px_70px_-46px_rgba(0,0,0,0.52)] backdrop-blur-xl transition-all duration-300 hover:bg-white/75 hover:shadow-[0_30px_90px_-52px_rgba(0,0,0,0.60)] active:scale-[0.98] sm:h-11 sm:w-11 lg:h-12 lg:w-12"
                      >
                        <ArrowRight
                          size={16}
                          className="rotate-180 text-black/70 transition-transform duration-300 group-hover:-translate-x-0.5"
                        />
                      </button>
                    ) : null}
                  </div>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    <button
                      type="button"
                      aria-label="Scroll rechts"
                      data-disabled={segmentsCanScrollRight ? "false" : "true"}
                      onClick={() => {
                        scrollSegments("right");
                      }}
                      className={`pointer-events-auto group grid h-10 w-10 place-items-center rounded-2xl border border-black/10 bg-white/55 shadow-[0_22px_70px_-46px_rgba(0,0,0,0.52)] backdrop-blur-xl transition-all duration-300 hover:bg-white/75 hover:shadow-[0_30px_90px_-52px_rgba(0,0,0,0.60)] active:scale-[0.98] sm:h-11 sm:w-11 lg:h-12 lg:w-12 ${
                        segmentsCanScrollRight ? "" : "opacity-70"
                      }`}
                    >
                      <ArrowRight
                        size={16}
                        className={`text-black/70 transition-transform duration-300 ${
                          segmentsCanScrollRight ? "group-hover:translate-x-0.5" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <motion.div
                  ref={segmentsScrollerRef}
                  initial={reduceMotion ? false : "hidden"}
                  whileInView={reduceMotion ? undefined : "visible"}
                  viewport={{ once: true, amount: 0.28, margin: "0px 0px -8% 0px" }}
                  variants={reduceMotion ? undefined : segmentsCarouselRevealVariants}
                  onMouseLeave={() => {
                    segmentsCardHoveredRef.current = false;
                  }}
                  onPointerDown={handleSegmentsPointerDown}
                  onPointerMove={handleSegmentsPointerMove}
                  onPointerUp={handleSegmentsPointerUp}
                  onPointerCancel={handleSegmentsPointerUp}
                  onTouchStart={markSegmentsUserInteract}
                  onWheel={markSegmentsUserInteract}
                  data-dragging={segmentsDragging ? "true" : "false"}
                  className={`relative flex min-h-[440px] w-full min-w-0 snap-x snap-mandatory gap-6 overflow-x-auto px-2 pb-4 pt-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:gap-7 sm:px-4 lg:px-0 lg:pb-0 ${
                    segmentsDragging ? "cursor-grabbing" : "cursor-grab"
                  }`}
                  style={{
                    scrollPaddingLeft: "22px",
                    scrollPaddingRight: "0px",
                    WebkitOverflowScrolling: "touch",
                    touchAction: "pan-x",
                  }}
                >
                  {segments.map((s, idx) => (
                    <SegmentCard
                      key={s.title}
                      {...s}
                      index={idx}
                      tilt={segmentsTilt}
                      revealVariants={reduceMotion ? undefined : segmentCardRevealVariants}
                      onHoverChange={handleSegmentCardHover}
                    />
                  ))}
                </motion.div>
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
              Al ons vlees is 100% halal, met zorg geselecteerd en met vakmanschap verwerkt. Puur,
              vers en van de hoogste kwaliteit.
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

          <div className="relative mt-14 grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
            <motion.div
              initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-140px" }}
              transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-4"
            >
              <div className="relative">
                <div className="relative inline-flex items-center gap-3 rounded-full border border-[rgba(226,192,141,0.18)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.34em] text-[rgba(239,225,203,0.78)] shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_28px_90px_-70px_rgba(0,0,0,0.92)] backdrop-blur-xl">
                  <span className="relative inline-flex h-2 w-2 shrink-0 rounded-full bg-[#B31217] shadow-[0_0_0_6px_rgba(179,18,23,0.10),0_0_18px_rgba(179,18,23,0.72)]">
                    <span className="absolute inset-[-4px] rounded-full border border-[rgba(226,192,141,0.28)] opacity-70" />
                  </span>
                  <span className="inline-flex items-center gap-3 whitespace-nowrap">
                    <span className="h-px w-5 bg-[linear-gradient(90deg,rgba(226,192,141,0.0),rgba(226,192,141,0.72))]" />
                    Premium Processed Halal Collection
                    <span className="h-px w-10 bg-[linear-gradient(90deg,rgba(226,192,141,0.72),rgba(226,192,141,0.0))]" />
                  </span>
                </div>
                <div className="mt-7 font-display text-[clamp(2.7rem,4vw,4.4rem)] font-medium leading-[0.98] tracking-[-0.04em] text-[#F5F2ED]">
                  Premium
                  <span className="mt-2 block italic text-[rgba(226,192,141,0.96)]">Eindproducten</span>
                </div>

                <div className="relative mt-8 h-px w-32 bg-[linear-gradient(90deg,rgba(226,192,141,0.0),rgba(226,192,141,0.82),rgba(226,192,141,0.0))]">
                  <div className="absolute left-10 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 bg-[#B31217] shadow-[0_0_0_6px_rgba(179,18,23,0.10),0_0_34px_rgba(179,18,23,0.58)]" />
                </div>

                <p className="mt-8 max-w-[470px] text-[15px] leading-[1.78] text-[rgba(245,242,237,0.70)]">
                  Een luxe collectie van premium halal eindproducten voor retail, slagerijen,
                  horeca en moderne foodconcepten. Van shoarma en kebab tot burgers en verpakte
                  halal specialiteiten, ontwikkeld om direct onderscheidend aan te voelen.
                </p>

                <div className="mt-7 flex flex-wrap gap-2.5">
                  {["Shoarma", "Burgers", "Kebab", "Packaged halal"].map((item) => (
                    <div
                      key={item}
                      className="rounded-full border border-[rgba(226,192,141,0.16)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.24em] text-[rgba(245,242,237,0.68)] transition-all duration-500 hover:-translate-y-px hover:border-[rgba(226,192,141,0.28)] hover:text-[rgba(245,242,237,0.84)]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="/assortiment#eindproducten"
                  className="group inline-flex items-center gap-3 rounded-2xl border border-[rgba(226,192,141,0.22)] bg-[linear-gradient(135deg,rgba(179,18,23,0.98),rgba(92,8,10,0.96))] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F5F2ED] shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_26px_92px_-64px_rgba(0,0,0,0.90)] transition-all duration-500 hover:border-[rgba(226,192,141,0.38)] hover:bg-[linear-gradient(135deg,rgba(192,24,29,0.98),rgba(100,10,12,0.95))] hover:shadow-[0_0_0_1px_rgba(226,192,141,0.16),0_0_52px_-22px_rgba(179,18,23,0.55),0_34px_120px_-70px_rgba(0,0,0,0.92)] active:translate-y-px"
                >
                  Alle producten
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1"
                  />
                </a>
                <div className="text-[11px] uppercase tracking-[0.24em] text-[rgba(245,242,237,0.42)]">
                  Drag or swipe to explore
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-140px" }}
              transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
              className="relative min-w-0 lg:col-span-8"
              ref={eindproductenShowcaseRef}
            >
              <div className="relative min-w-0 overflow-hidden rounded-[36px] border border-[rgba(226,192,141,0.14)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_70px_180px_-120px_rgba(0,0,0,0.98)]">
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute inset-0 bg-[radial-gradient(980px_640px_at_16%_18%,rgba(255,255,255,0.12)_0%,transparent_62%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(980px_760px_at_76%_72%,rgba(179,18,23,0.36)_0%,transparent_58%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(900px_660px_at_88%_24%,rgba(226,192,141,0.16)_0%,transparent_62%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(1200px_860px_at_50%_60%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.28)_42%,rgba(0,0,0,0.94)_100%)]" />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.56)_0%,rgba(0,0,0,0.12)_34%,rgba(0,0,0,0.48)_100%)]" />
                  <img
                    src={productenImage}
                    alt=""
                    aria-hidden
                    className="absolute -right-16 bottom-0 w-[420px] opacity-[0.08] blur-[2px] sm:w-[520px]"
                  />
                </div>

                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                  initial={reduceMotion ? { opacity: 0.18, scale: 1 } : { opacity: 0, scale: 0.72, filter: "blur(32px)" }}
                  animate={
                    reduceMotion || !eindproductenShowcaseInView
                      ? { opacity: 0.18, scale: 1, filter: "blur(30px)" }
                      : eindproductenIntroComplete
                        ? { opacity: 0.16, scale: 1.08, filter: "blur(30px)" }
                        : { opacity: 0.46, scale: 1, filter: "blur(18px)" }
                  }
                  transition={{ duration: 1.8, ease: EINDPRODUCTEN_REVEAL_EASE }}
                  style={{
                    background:
                      "radial-gradient(circle, rgba(226,192,141,0.34) 0%, rgba(179,18,23,0.22) 42%, rgba(0,0,0,0) 74%)",
                  }}
                />

                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-60"
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          opacity: [0.46, 0.62, 0.46],
                          x: [-10, 12, -10],
                          y: [0, -8, 0],
                        }
                  }
                  transition={
                    reduceMotion
                      ? undefined
                      : { duration: 16, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }
                  }
                  style={{
                    background:
                      "radial-gradient(520px 340px at 24% 26%, rgba(255,255,255,0.12), transparent 68%), radial-gradient(620px 420px at 72% 72%, rgba(226,192,141,0.10), transparent 72%), radial-gradient(560px 360px at 52% 22%, rgba(179,18,23,0.14), transparent 70%)",
                    filter: "blur(18px)",
                    mixBlendMode: "screen",
                  }}
                />

                <div
                  className="relative"
                  onMouseEnter={() => {
                    eindproductenAutoPausedRef.current = true;
                  }}
                  onMouseLeave={() => {
                    eindproductenAutoPausedRef.current = false;
                  }}
                  onTouchStart={() => {
                    eindproductenAutoPausedRef.current = true;
                    markEindproductenUserInteract(4200);
                  }}
                  onTouchEnd={() => {
                    eindproductenAutoPausedRef.current = false;
                  }}
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 py-5 sm:px-8">
                    <div className="rounded-full border border-white/8 bg-black/18 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[rgba(245,242,237,0.56)] backdrop-blur-md">
                      Collection 01
                    </div>
                    <div className="hidden rounded-full border border-white/8 bg-black/18 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[rgba(245,242,237,0.48)] backdrop-blur-md sm:block">
                      Premium halal finished products
                    </div>
                  </div>

                  <motion.div
                    ref={eindproductenScrollerRef}
                    onPointerDown={handleEindproductenPointerDown}
                    onPointerMove={handleEindproductenPointerMove}
                    onPointerUp={handleEindproductenPointerUp}
                    onPointerCancel={handleEindproductenPointerUp}
                    data-dragging={eindproductenDragging ? "true" : "false"}
                    className={`relative flex w-full min-w-0 snap-x snap-proximity gap-5 overflow-x-auto px-5 pt-20 pb-14 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:gap-7 sm:px-7 sm:pt-24 sm:pb-16 lg:px-8 ${
                      eindproductenDragging ? "cursor-grabbing" : "cursor-grab"
                    }`}
                    style={{
                      scrollPaddingLeft: "24px",
                      scrollPaddingRight: "26px",
                      WebkitOverflowScrolling: "touch",
                      touchAction: "pan-y",
                      maskImage:
                        "linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%)",
                      WebkitMaskImage:
                        "linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%)",
                    }}
                  >
                    {EINDPRODUCTEN_PRODUCTS.map((p, idx) => (
                      <EindproductenShowcaseCard
                        key={`${p.title}-${idx}`}
                        product={p}
                        index={idx}
                        tilt={eindproductenTilt}
                        total={EINDPRODUCTEN_PRODUCTS.length}
                        isRevealed={eindproductenShowcaseInView}
                      />
                    ))}

                    <div className="w-10 shrink-0 sm:w-16" />
                  </motion.div>
                </div>

              <div className="pointer-events-none absolute inset-0 z-10">
                <div className="absolute left-2 top-1/2 -translate-y-1/2">
                  {eindproductenCanScrollLeft ? (
                    <button
                      type="button"
                      aria-label="Vorige"
                      onClick={() => {
                        markEindproductenUserInteract();
                        scrollToSnapItem(eindproductenScrollerRef, "left");
                      }}
                      className="pointer-events-auto group grid h-10 w-10 place-items-center rounded-2xl border border-[rgba(226,192,141,0.30)] bg-black/35 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_30px_110px_-78px_rgba(0,0,0,0.92)] backdrop-blur-xl transition-all duration-500 hover:border-[rgba(226,192,141,0.55)] hover:bg-black/45 hover:shadow-[0_0_0_1px_rgba(226,192,141,0.18),0_0_46px_-20px_rgba(179,18,23,0.60),0_30px_110px_-78px_rgba(0,0,0,0.92)] active:scale-[0.98] sm:h-11 sm:w-11 lg:h-12 lg:w-12"
                    >
                      <ArrowRight
                        size={16}
                        className="rotate-180 text-[rgba(245,242,237,0.86)] transition-transform duration-500 group-hover:-translate-x-0.5"
                      />
                    </button>
                  ) : null}
                </div>
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  {eindproductenCanScrollRight ? (
                    <button
                      type="button"
                      aria-label="Volgende"
                      onClick={() => {
                        markEindproductenUserInteract();
                        scrollToSnapItem(eindproductenScrollerRef, "right");
                      }}
                      className="pointer-events-auto group grid h-10 w-10 place-items-center rounded-2xl border border-[rgba(226,192,141,0.30)] bg-black/35 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_30px_110px_-78px_rgba(0,0,0,0.92)] backdrop-blur-xl transition-all duration-500 hover:border-[rgba(226,192,141,0.55)] hover:bg-black/45 hover:shadow-[0_0_0_1px_rgba(226,192,141,0.18),0_0_46px_-20px_rgba(179,18,23,0.60),0_30px_110px_-78px_rgba(0,0,0,0.92)] active:scale-[0.98] sm:h-11 sm:w-11 lg:h-12 lg:w-12"
                    >
                      <ArrowRight
                        size={16}
                        className="text-[rgba(245,242,237,0.86)] transition-transform duration-500 group-hover:translate-x-0.5"
                      />
                    </button>
                  ) : null}
                </div>
              </div>

              <div className="pointer-events-none absolute inset-x-8 bottom-6 z-10 hidden h-[3px] overflow-hidden rounded-full bg-white/10 sm:block">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,rgba(179,18,23,0.0),rgba(179,18,23,0.88),rgba(226,192,141,0.92),rgba(179,18,23,0.0))] transition-[width] duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
                  style={{ width: `${Math.round(eindproductenProgress * 100)}%` }}
                />
                <div
                  className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border border-[rgba(226,192,141,0.40)] bg-[rgba(245,242,237,0.86)] shadow-[0_0_24px_-8px_rgba(226,192,141,0.68),0_20px_48px_-26px_rgba(0,0,0,0.9)] transition-[left] duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
                  style={{ left: `calc(${Math.max(0, Math.min(1, eindproductenProgress)) * 100}% - 7px)` }}
                />
              </div>
            </div>
          </motion.div>
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
                Betrouwbare halal partner met premium Nederlandse kwaliteit, hygiënische verwerking
                en gekoelde levering via eigen transport.
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
  tilt,
  revealVariants,
  onHoverChange,
}: {
  id: string;
  title: string;
  text: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  image: string;
  index: number;
  tilt?: MotionValue<number>;
  revealVariants?: Variants;
  onHoverChange?: (hovered: boolean) => void;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [5.5, -5.5]), { stiffness: 160, damping: 26 });
  const ry = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 160, damping: 26 });
  const baseTilt = tilt ?? useMotionValue(0);
  const rz = useSpring(useTransform(baseTilt, [-1, 1], [-1.15, 1.15]), { stiffness: 200, damping: 30 });
  const liftY = useSpring(
    useTransform(baseTilt, (v) => -Math.min(7, Math.abs(v) * 7)),
    { stiffness: 240, damping: 34 },
  );
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
      data-snap-item
      data-hovered={hovered ? "true" : "false"}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        handleMouseLeave();
        onHoverChange?.(false);
      }}
      onPointerEnter={() => {
        setHovered(true);
        onHoverChange?.(true);
      }}
      onPointerLeave={() => {
        setHovered(false);
        onHoverChange?.(false);
      }}
      variants={revealVariants}
      style={
        reduceMotion
          ? undefined
          : { rotateX: rx, rotateY: ry, rotateZ: rz, y: liftY, transformStyle: "preserve-3d" }
      }
      className="group relative w-[270px] shrink-0 snap-center scroll-mt-28 overflow-hidden rounded-2xl border border-black/10 bg-[#0B0B0B] shadow-[0_28px_110px_-65px_rgba(0,0,0,0.82)] transition-[box-shadow,transform,border-color] duration-700 hover:border-black/20 hover:shadow-[0_40px_150px_-75px_rgba(0,0,0,0.92)] sm:w-[300px] lg:w-[310px]"
    >
      <motion.img
        src={image}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          filter: "brightness(0.94) contrast(1.06) saturate(1.05)",
          willChange: "transform, opacity",
        }}
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

      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-0 h-[140%] w-[55%] rotate-[18deg] opacity-35"
        initial={false}
        animate={
          reduceMotion
            ? undefined
            : hovered
              ? { x: 120, opacity: 0.55 }
              : { x: 0, opacity: 0.28 }
        }
        transition={reduceMotion ? undefined : { duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.00) 0%, rgba(255,255,255,0.18) 42%, rgba(255,255,255,0.00) 86%)",
          filter: "blur(8px)",
          mixBlendMode: "screen",
        }}
      />

      <div className="absolute inset-0 opacity-0 transition-opacity duration-700 lg:group-hover:opacity-100">
        <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" />
      </div>

      <motion.div
        aria-hidden
        className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={reduceMotion ? undefined : { background: glowBg }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(520px 320px at 40% 62%, rgba(226,192,141,0.20), transparent 62%), radial-gradient(620px 360px at 70% 30%, rgba(179,18,23,0.22), transparent 65%)",
          filter: "blur(14px)",
        }}
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
              <span className="relative grid h-12 w-12 place-items-center overflow-hidden rounded-2xl border border-white/20 bg-white/[0.04] backdrop-blur-sm transition-all duration-500 group-hover/btn:border-white/35 group-hover/btn:bg-white/[0.10] group-hover/btn:shadow-[0_0_0_1px_rgba(226,192,141,0.24),0_16px_44px_-28px_rgba(0,0,0,0.9)]">
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
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function EindproductenShowcaseCard({
  product,
  index,
  tilt,
  total,
  isRevealed,
}: {
  product: (typeof EINDPRODUCTEN_PRODUCTS)[number];
  index: number;
  tilt: MotionValue<number>;
  total: number;
  isRevealed: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);
  const bgPosition = EINDPRODUCTEN_CARD_BG_POSITIONS[index % EINDPRODUCTEN_CARD_BG_POSITIONS.length];
  const centerIndex = (total - 1) / 2;
  const revealOffset = index - centerIndex;
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [5.5, -5.5]), { stiffness: 170, damping: 28 });
  const ry = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 170, damping: 28 });
  const rz = useSpring(useTransform(tilt, [-1.1, 1.1], [-1.4, 1.4]), {
    stiffness: 220,
    damping: 32,
  });
  const cardLift = useSpring(
    useTransform(tilt, (v) => -Math.min(9, Math.abs(v) * 6)),
    { stiffness: 240, damping: 34 },
  );
  const imageX = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 120, damping: 22 });
  const imageY = useSpring(useTransform(my, [0, 1], [-8, 8]), { stiffness: 120, damping: 22 });
  const glowX = useTransform(mx, (v) => `${v * 100}%`);
  const glowY = useTransform(my, (v) => `${v * 100}%`);
  const glowBg = useMotionTemplate`radial-gradient(460px circle at ${glowX} ${glowY}, rgba(226,192,141,0.20), transparent 60%)`;

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
      ref={ref}
      data-snap-item
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        handleMouseLeave();
        setHovered(false);
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={
        reduceMotion
          ? { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }
          : {
              opacity: 0,
              x: revealOffset * -42,
              y: 24,
              scale: 0.9,
              filter: "blur(14px)",
            }
      }
      animate={
        reduceMotion || isRevealed
          ? { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }
          : undefined
      }
      transition={{
        duration: 1.1,
        ease: EINDPRODUCTEN_REVEAL_EASE,
        delay: reduceMotion ? 0 : 0.22 + Math.abs(revealOffset) * 0.14,
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -10,
              scale: 1.008,
              transition: { type: "spring", stiffness: 280, damping: 30 },
            }
      }
      style={
        reduceMotion
          ? undefined
          : {
              rotateX: rx,
              rotateY: ry,
              rotateZ: rz,
              y: cardLift,
              transformStyle: "preserve-3d",
            }
      }
      className="group relative w-[84vw] max-w-[430px] shrink-0 snap-center overflow-hidden rounded-[36px] border border-[rgba(226,192,141,0.16)] bg-[#110c0a] shadow-[0_44px_160px_-92px_rgba(0,0,0,0.9)] transition-[border-color,box-shadow,transform] duration-700 hover:border-[rgba(226,192,141,0.34)] hover:shadow-[0_0_0_1px_rgba(226,192,141,0.08),0_0_90px_-36px_rgba(179,18,23,0.24),0_64px_180px_-96px_rgba(0,0,0,0.96)] sm:w-[390px] lg:w-[408px]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <img
          src={cardProductenImage}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            objectPosition: bgPosition,
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,248,239,0.18),rgba(35,28,23,0.06)_24%,rgba(15,11,9,0.18)_54%,rgba(8,7,7,0.42)_100%)]" />
        <div className="absolute inset-y-0 right-0 w-[56%] bg-[radial-gradient(540px_480px_at_100%_18%,rgba(255,255,255,0.30)_0%,rgba(255,255,255,0.08)_34%,transparent_72%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-[linear-gradient(180deg,rgba(8,7,7,0),rgba(8,7,7,0.20)_42%,rgba(8,7,7,0.54)_100%)]" />
        <div className="absolute right-[-16%] top-[10%] h-[68%] w-[66%] rounded-[46%] border border-[rgba(206,176,123,0.10)] bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.03))] opacity-70 backdrop-blur-[2px]" />
        <div className="absolute left-[-8%] bottom-[-12%] h-[52%] w-[52%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0)_70%)] opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(1100px_720px_at_50%_18%,rgba(255,255,255,0.16)_0%,transparent_58%)] mix-blend-screen" />
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(198,160,98,0.62),transparent)]" />
        <div className="absolute inset-y-0 left-0 w-px bg-[linear-gradient(180deg,transparent,rgba(198,160,98,0.38),transparent)]" />
        <div className="absolute inset-0 rounded-[36px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),inset_0_-120px_140px_-76px_rgba(0,0,0,0.52)]" />
        <div className="absolute inset-0 -translate-x-[120%] bg-[linear-gradient(108deg,transparent,rgba(255,255,255,0.16),transparent)] opacity-0 transition-[transform,opacity] duration-[1600ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-[120%] group-hover:opacity-100" />
      </div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={reduceMotion ? undefined : { background: glowBg }}
      />

      <div className="relative flex h-full min-h-[640px] flex-col p-7 pb-7 text-[rgba(24,18,13,0.92)] sm:p-8 sm:pb-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[54%] bg-[linear-gradient(180deg,rgba(255,255,255,0.42),rgba(255,255,255,0.16)_52%,rgba(255,255,255,0)_100%)]"
        />
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={product.stickerSrc}
                alt=""
                aria-hidden
                className="h-[18px] w-[18px] select-none opacity-90"
                loading="lazy"
                decoding="async"
                style={{ filter: STICKER_GOLD_FILTER }}
              />
              <div className="flex items-center gap-2.5">
                <div className="text-[10px] font-medium uppercase tracking-[0.34em] text-[rgba(62,44,24,0.86)]">
                  {product.category}
                </div>
                <span className="h-px w-10 bg-[linear-gradient(90deg,rgba(186,150,94,0.58),rgba(186,150,94,0.0))]" />
              </div>
            </div>
            <div className="max-w-[16rem] text-[10px] font-medium uppercase tracking-[0.32em] text-[rgba(92,64,28,0.84)]">
              {product.eyebrow}
            </div>
          </div>

          <div className="rounded-full border border-[rgba(226,192,141,0.26)] bg-black/28 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.24em] text-[rgba(245,242,237,0.92)] shadow-[0_18px_40px_-28px_rgba(0,0,0,0.28)] backdrop-blur-md">
            100% halal
          </div>
        </div>

        <div className="mt-8 flex items-start justify-between gap-5">
          <div className="flex-1">
            <div className="text-[10px] font-medium uppercase tracking-[0.34em] text-[rgba(45,32,18,0.66)]">
              Collection {String(index + 1).padStart(2, "0")}
            </div>
            <div className="mt-3 text-balance font-display text-[36px] leading-[0.94] tracking-[-0.045em] text-[rgba(24,18,13,0.94)] sm:text-[40px]">
              {product.title}
            </div>
          </div>
          <div className="hidden h-[72px] w-px bg-[linear-gradient(180deg,rgba(184,147,89,0.0),rgba(184,147,89,0.56),rgba(184,147,89,0.0))] sm:block" />
        </div>

        <p className="mt-5 max-w-[31ch] text-[14px] leading-[1.82] text-[rgba(40,30,20,0.78)] sm:text-[15px]">
          {product.blurb}
        </p>

        <div className="mt-6 flex flex-wrap gap-2.5">
          {product.traits.map((trait) => (
            <div
              key={trait}
              className="rounded-full border border-[rgba(180,146,95,0.22)] bg-[linear-gradient(180deg,rgba(255,255,255,0.40),rgba(255,255,255,0.18))] px-3.5 py-1.5 text-[9px] font-medium uppercase tracking-[0.24em] text-[rgba(34,25,16,0.86)] shadow-[inset_0_1px_0_rgba(255,255,255,0.38),0_16px_28px_-22px_rgba(0,0,0,0.22)] backdrop-blur-sm transition-all duration-500 group-hover:-translate-y-[2px] group-hover:border-[rgba(180,146,95,0.34)] group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.52),0_20px_40px_-24px_rgba(0,0,0,0.26)]"
            >
              {trait}
            </div>
          ))}
        </div>

        <div className="relative mt-8 flex flex-1 items-end justify-center overflow-hidden rounded-[30px] border border-[rgba(171,137,84,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.20),rgba(255,255,255,0.06))] px-4 pb-4 pt-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.34),inset_0_-80px_120px_-90px_rgba(0,0,0,0.26)]">
          <div className="pointer-events-none absolute inset-x-[14%] bottom-2 h-14 rounded-full bg-[radial-gradient(closest-side,rgba(0,0,0,0.24),rgba(0,0,0,0.0))] blur-lg" />
          <div className="pointer-events-none absolute left-1/2 top-5 h-20 w-52 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.60),rgba(255,255,255,0)_72%)] blur-2xl opacity-70 transition-opacity duration-700 group-hover:opacity-100" />
          <div className="pointer-events-none absolute inset-x-4 bottom-4 top-4 rounded-[26px] border border-white/18 opacity-60" />
          <motion.img
            src={product.image}
            alt={product.title}
            loading="lazy"
            decoding="async"
            className="relative z-10 mx-auto h-[250px] w-full object-contain sm:h-[290px]"
            style={
              reduceMotion
                ? {
                    filter:
                      "drop-shadow(0 18px 34px rgba(255,255,255,0.22)) drop-shadow(0 26px 42px rgba(0,0,0,0.20)) drop-shadow(0 8px 18px rgba(0,0,0,0.10))",
                  }
                : {
                    x: imageX,
                    y: imageY,
                    filter:
                      "drop-shadow(0 18px 34px rgba(255,255,255,0.22)) drop-shadow(0 26px 42px rgba(0,0,0,0.20)) drop-shadow(0 8px 18px rgba(0,0,0,0.10))",
                  }
            }
            animate={
              reduceMotion
                ? undefined
                : hovered
                  ? { scale: 1.06, rotate: -0.8, y: -4 }
                  : { scale: 1, rotate: 0, y: 0 }
            }
            transition={reduceMotion ? undefined : { duration: 1.15, ease: EINDPRODUCTEN_REVEAL_EASE }}
          />
        </div>

        <div className="mt-7 flex items-center justify-between gap-4">
          <div className="text-[10px] font-medium uppercase tracking-[0.32em] text-[rgba(34,25,16,0.68)]">
            Premium collection
          </div>
          <a
            href="/assortiment#eindproducten"
            className="group/cta inline-flex items-center gap-3 rounded-[18px] border border-[rgba(150,32,35,0.26)] bg-[linear-gradient(135deg,rgba(147,24,28,0.92),rgba(78,13,15,0.96))] px-[18px] py-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[rgba(250,241,230,0.96)] shadow-[0_18px_44px_-26px_rgba(0,0,0,0.32)] transition-all duration-500 hover:-translate-y-px hover:border-[rgba(196,158,101,0.42)] hover:shadow-[0_0_0_1px_rgba(226,192,141,0.12),0_0_48px_-22px_rgba(179,18,23,0.36),0_22px_60px_-28px_rgba(0,0,0,0.38)]"
          >
            <span className="relative">
              Explore
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[rgba(245,219,186,0.8)] transition-transform duration-500 group-hover/cta:scale-x-100" />
            </span>
            <ArrowUpRight
              size={14}
              className="transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5 group-hover/cta:-rotate-6"
            />
          </a>
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
      <a href={`/assortiment#${id}`} className="relative block">
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
              <path id={pathId} d="M56,56 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" />
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
            <div className="group/btn relative inline-flex items-center gap-3 overflow-hidden rounded-2xl border border-[rgba(226,192,141,0.58)] bg-transparent px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-[rgba(226,192,141,0.92)] transition-colors duration-500 group-hover:text-[#070707]">
              <span className="pointer-events-none absolute inset-0 -translate-x-[110%] bg-[rgba(226,192,141,0.92)] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-0" />
              <span className="relative">Lees meer</span>
              <ArrowRight
                size={14}
                className="relative transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1"
              />
            </div>
          </div>
        </div>
      </a>
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
              className="inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/85 transition-colors hover:border-white/25 hover:bg-white/[0.07]"
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
          <path id="halal-stamp-path" d="M56,56 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" />
        </defs>
        <text
          fill="rgba(245,241,235,0.68)"
          fontSize="7.2"
          fontWeight="700"
          letterSpacing="0.26em"
          textAnchor="middle"
        >
          <textPath href="#halal-stamp-path" startOffset="50%">
            PREMIUM HALAL PREMIUM KWALITEIT IPEKCI SLACHTERIJ
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
