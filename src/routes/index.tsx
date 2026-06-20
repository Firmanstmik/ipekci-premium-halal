import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AnimatePresence,
  animate,
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
  Award,
  Beef,
  ChefHat,
  Check,
  Package,
  ShieldCheck,
  Snowflake,
  Store,
  Truck,
} from "lucide-react";
import { useCallback, useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { SectionHeader } from "@/components/SectionHeader";
import { MagneticButton } from "@/components/MagneticButton";
import { EnterpriseTrustSection } from "@/components/home/EnterpriseTrustSection";
import { HomeHeroSection } from "@/components/home/HomeHeroSection";
import { IPEKCI_HERO_IMAGE } from "@/lib/home-hero-content";
import { PremiumMeatShowcase } from "@/components/PremiumMeatShowcase";
import {
  StoryBridge,
  StoryItem,
  StoryMoment,
  StoryReveal,
} from "@/components/HomeStorytelling";
import { DS_DURATION, DS_EASE, DS_EASE_REVEAL, dsRevealTransition } from "@/lib/design-system";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: DS_DURATION.section, ease: DS_EASE_REVEAL }}
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
          <div className="ipek-label ipek-heading-label">
            PREMIUM KWALITEIT
          </div>
          <h3 className="ipek-h2 mt-6 text-[#F5F1EB]">
            {title}
          </h3>
          <p className="mt-6 max-w-[420px] text-[15px] leading-[1.7] text-[rgba(245,241,235,0.70)]">
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
              href="/assortiment/eindproducten"
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
                transition={reduceMotion ? undefined : { duration: 0.9, ease: DS_EASE }}
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
                    reduceMotion ? undefined : { duration: 1.25, ease: DS_EASE }
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
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: DS_DURATION.reveal,
        delay: reduceMotion ? 0 : 0.42 + index * 0.12,
        ease: DS_EASE_REVEAL,
      }}
      className="group/trust flex items-center gap-3"
    >
      <motion.div
        className="relative grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-[rgba(200,164,107,0.28)] bg-white shadow-[0_8px_24px_-16px_rgba(0,0,0,0.1)] transition-[border-color,box-shadow] duration-500 group-hover/trust:border-[rgba(200,164,107,0.45)] group-hover/trust:shadow-[0_12px_32px_-14px_rgba(226,192,141,0.35)]"
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
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#141414]/72 transition-colors duration-500 group-hover/trust:text-[#141414]">
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
    <motion.div
      initial={
        reduceMotion
          ? { opacity: 1, x: 0, scale: 1, rotateY: 0, filter: "blur(0px)" }
          : { opacity: 0, x: 86, scale: 0.985, rotateY: -14, filter: "blur(18px)" }
      }
      whileInView={{ opacity: 1, x: 0, scale: 1, rotateY: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{
        duration: 1.95,
        delay: reduceMotion ? 0 : 0.28 + index * 0.26,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={reduceMotion ? undefined : { y: -8 }}
      style={
        reduceMotion
          ? undefined
          : { transformPerspective: 1400, transformStyle: "preserve-3d", willChange: "transform" }
      }
      className="transform-gpu"
    >
      <motion.a
        ref={ref}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        style={
          reduceMotion
            ? undefined
            : {
                rotateX: rx,
                rotateY: ry,
                transformStyle: "preserve-3d",
                willChange: "transform",
                backfaceVisibility: "hidden",
              }
        }
        className="group relative flex h-[340px] flex-col overflow-hidden rounded-[24px] border border-[rgba(226,192,141,0.14)] bg-[#080808] shadow-[0_40px_120px_-88px_rgba(0,0,0,0.98)] transition-[border-color,box-shadow] duration-700 hover:border-[rgba(226,192,141,0.38)] hover:shadow-[0_0_0_1px_rgba(226,192,141,0.22),0_0_56px_-18px_rgba(226,192,141,0.22),0_52px_150px_-96px_rgba(0,0,0,0.98)] lg:h-[400px] transform-gpu"
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
          <motion.div
            aria-hidden
            className="absolute -left-1/2 top-0 h-[130%] w-[60%] rotate-[14deg] opacity-0 mix-blend-screen"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.20) 46%, rgba(255,255,255,0.0) 86%)",
              filter: "blur(10px)",
            }}
            whileInView={
              reduceMotion
                ? undefined
                : {
                    x: ["-120%", "120%"],
                    opacity: [0, 0.28, 0],
                  }
            }
            viewport={{ once: true, margin: "-120px" }}
            transition={{
              duration: 2.2,
              delay: reduceMotion ? 0 : 0.54 + index * 0.26,
              ease: [0.22, 1, 0.36, 1],
            }}
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
    </motion.div>
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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: DS_DURATION.reveal, delay: index * 0.1, ease: DS_EASE_REVEAL }}
      className="group relative overflow-hidden rounded-3xl border border-[rgba(198,160,98,0.28)] bg-[#070707] shadow-[0_40px_120px_-95px_rgba(0,0,0,0.98)] transition-all duration-700 ease-[cubic-bezier(.22,.61,.36,1)] hover:-translate-y-1.5 hover:border-[rgba(198,160,98,0.55)] hover:shadow-[0_56px_170px_-120px_rgba(0,0,0,0.98)]"
    >
      <a href={`/assortiment/${id}`} className="relative block h-full">
        <div className="pointer-events-none absolute inset-0">
          {/* Cinematic image — subtle group-driven zoom (CSS hover works even
              though this layer is pointer-events-none) */}
          <img
            src={image}
            alt=""
            aria-hidden
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.22,.61,.36,1)] will-change-transform group-hover:scale-[1.03]"
            style={{ filter: "brightness(0.82) contrast(1.12) saturate(1.06)" }}
          />

          {/* top sheen + warm depth */}
          <div className="absolute inset-0 bg-[radial-gradient(900px_560px_at_60%_22%,rgba(255,255,255,0.10)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(900px_720px_at_45%_92%,rgba(179,18,23,0.26)_0%,transparent_60%)]" />
          {/* cinematic vignette — darkened edges add depth without blur */}
          <div className="absolute inset-0 bg-[radial-gradient(130%_120%_at_50%_36%,transparent_50%,rgba(0,0,0,0.5)_100%)]" />
          {/* base dark gradient — eases off slightly on hover so the image breathes */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/45 to-black/8 transition-opacity duration-700 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:opacity-[0.86]" />
        </div>

        <div className="pointer-events-none absolute left-6 top-6 grid h-[82px] w-[82px] place-items-center rounded-full border border-[rgba(198,160,98,0.26)] bg-black/35 backdrop-blur-[2px] transition-colors duration-700 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:border-[rgba(198,160,98,0.5)]">
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
          <div className="h-px w-10 bg-[#B31217] transition-all duration-700 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:w-16 group-hover:bg-[rgba(198,160,98,0.85)]" />
          <h3 className="mt-6 font-display text-3xl font-semibold leading-[0.98] tracking-[-0.04em] text-[#F5F2ED] transition-transform duration-700 ease-[cubic-bezier(.22,.61,.36,1)] will-change-transform group-hover:-translate-y-1">
            {title}
          </h3>
          <p className="mt-4 max-w-sm text-[13px] leading-[1.7] text-[rgba(245,242,237,0.6)]">{description}</p>

          <div className="mt-8">
            <div className="group/btn relative inline-flex items-center gap-3 overflow-hidden rounded-2xl border border-[rgba(198,160,98,0.58)] bg-transparent px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.26em] text-[rgba(198,160,98,0.92)] transition-[color,border-color] duration-700 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:border-[rgba(198,160,98,0.9)] group-hover:text-[#070707]">
              <span className="pointer-events-none absolute inset-0 -translate-x-[110%] bg-[rgba(226,192,141,0.95)] transition-transform duration-700 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:translate-x-0" />
              <span className="relative">Lees meer</span>
              <ArrowRight
                size={13}
                className="relative transition-transform duration-[600ms] ease-[cubic-bezier(.22,.61,.36,1)] group-hover:translate-x-1"
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
              href="/assortiment/eindproducten"
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

type ProcessStep = {
  index: string;
  num: string;
  kicker: string;
  navLabel: string;
  title: string;
  titleAccent: string;
  body: string;
  bullets: string[];
  meta: { k: string; v: string }[];
  icon: ReactNode;
  proof: string;
};

const processSteps: ProcessStep[] = [
  {
    index: "01",
    num: "I",
    kicker: "Eerste fase, herkomst",
    navLabel: "Herkomst",
    title: "Halal slacht,",
    titleAccent: "onder toezicht.",
    body:
      "Met de hand uitgevoerd in EU-gecertificeerde slachthuizen door ervaren moslimslachters. Elk dier wordt gevolgd, gezegend en volgens de rite verwerkt, zorgvuldig geregistreerd en bevestigd.",
    bullets: [
      "Traceerbaarheids-ID per dier",
      "Veterinaire controle op locatie",
      "Ondertekend certificaat per batch",
    ],
    meta: [
      { k: "Certificering", v: "AVS, HFA, EU 1099/2009" },
      { k: "Traceerbaarheid", v: "100% per individueel dier" },
      { k: "Auditcyclus", v: "Per kwartaal, onafhankelijk" },
    ],
    proof:
      "Elke karkas verlaat de vloer met een verzegeld dossier, inclusief herkomstbedrijf, naam van de getuige en tijdstip van slacht.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path
          d="M4 13c4-7 12-7 16 0M7 13c2.5-3.5 7.5-3.5 10 0M12 13v7M9 20h6"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    index: "02",
    num: "II",
    kicker: "Tweede fase, atelier",
    navLabel: "Atelier",
    title: "Meesterlijke bereiding,",
    titleAccent: "met de hand versneden.",
    body:
      "Gerijpt aan het bot en volledig met de hand uitgebeend in ateliers met gecontroleerde temperatuur. Onze meester-slagers werken onder strikte HACCP-discipline, elke snede gewogen en elke afwerking verantwoord.",
    bullets: [
      "21 tot 35 dagen dry-aged aan het bot",
      "Met de hand versneden door meester-slagers",
      "Dagelijks gecontroleerde en afgetekende opbrengst",
    ],
    meta: [
      { k: "Atelierklimaat", v: "+2 °C, 78% RV" },
      { k: "Rijpingsvenster", v: "21 tot 35 dagen" },
      { k: "Opbrengstcontrole", v: "Dagelijks, mede ondertekend" },
    ],
    proof:
      "Geen machinale uitsnijding. Elke deelstuk wordt geopend, afgewerkt en geportioneerd door een slager die met naam geregistreerd staat.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path
          d="M4 17l10-10 3 3-10 10H4v-3zM14 7l3 3M5 21h14"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    index: "03",
    num: "III",
    kicker: "Derde fase, levering",
    navLabel: "Levering",
    title: "Ononderbroken koelketen,",
    titleAccent: "tot aan uw deur.",
    body:
      "Vacuüm verpakt, digitaal geregistreerd en verzonden via ons eigen gekoelde transport. Van atelier tot keuken blijft de keten intact en elk moment is controleerbaar.",
    bullets: [
      "Live temperatuurlogging per pallet",
      "Eigen gekoelde vloot, zonder derde partij",
      "Maximaal 18 uur van deur tot deur in EU-hoofdsteden",
    ],
    meta: [
      { k: "Transittijd", v: "Tot 18 uur naar hoofdsteden" },
      { k: "Telemetrie", v: "Live, per pallet" },
      { k: "Verzegeling", v: "Genummerd en gefotografeerd" },
    ],
    proof:
      "Open elke levering met een QR-scan en het volledige temperatuurverloop verschijnt binnen enkele seconden.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path
          d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const processTrust = [
  { v: "100", suffix: "%", k: "Traceerbaarheid per dier" },
  { v: "18", suffix: "u", k: "Maximale transittijd binnen EU-hoofdsteden" },
  { v: "47", suffix: "", k: "Huizen discreet beleverd" },
  { v: "0", suffix: "", k: "Onderbrekingen in de koelketen in 24 maanden" },
] as const;

const processCerts = ["AVS", "HFA", "EU 1099/2009", "HACCP", "IFS Food"] as const;

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

const SEGMENT_REVEAL_EASE = [0.22, 0.61, 0.36, 1] as const;

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
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DS_DURATION.reveal,
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

const EINDPRODUCTEN_LOOP_PRODUCTS = [...EINDPRODUCTEN_PRODUCTS, ...EINDPRODUCTEN_PRODUCTS];

const EINDPRODUCTEN_REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

/* Warm drop-shadow that grounds the product PNG on the dark display case. */
const EINDPRODUCTEN_PRODUCT_SHADOW =
  "drop-shadow(0 24px 36px rgba(0,0,0,0.62)) drop-shadow(0 6px 14px rgba(0,0,0,0.45)) drop-shadow(0 0 26px rgba(226,192,141,0.14))";

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
            transition={{ duration: DS_DURATION.reveal, ease: "easeInOut", repeat: Infinity }}
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
  const eindproductenLoopWidthRef = useRef(0);
  const eindproductenAutoHoldUntilRef = useRef(0);
  const eindproductenAutoPausedRef = useRef(false);
  const eindproductenDraggingRef = useRef(false);

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
      const items = nextEl.querySelectorAll<HTMLElement>("[data-snap-item]");
      if (items.length >= 2) {
        const half = Math.floor(items.length / 2);
        eindproductenLoopWidthRef.current = items[half]?.offsetLeft ?? nextEl.scrollWidth / 2;
      }
      const loopWidth = eindproductenLoopWidthRef.current;
      const maxScrollLeft =
        loopWidth > 0 ? loopWidth : Math.max(0, nextEl.scrollWidth - nextEl.clientWidth);
      const epsilon = 2;
      setEindproductenCanScrollLeft(nextEl.scrollLeft > epsilon);
      setEindproductenCanScrollRight(
        loopWidth > 0 ? true : nextEl.scrollLeft < maxScrollLeft - epsilon,
      );
      const progressBase = maxScrollLeft > 0 ? nextEl.scrollLeft % maxScrollLeft : 0;
      const nextProgress = maxScrollLeft > 0 ? progressBase / maxScrollLeft : 0;
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

  const wrapEindproductenScroll = (el: HTMLDivElement) => {
    const loopWidth = eindproductenLoopWidthRef.current;
    if (loopWidth <= 0) return;
    while (el.scrollLeft >= loopWidth) el.scrollLeft -= loopWidth;
    while (el.scrollLeft < 0) el.scrollLeft += loopWidth;
  };

  useEffect(() => {
    if (reduceMotion || !eindproductenShowcaseInView || !eindproductenIntroComplete) return;

    let cancelled = false;
    let lastTime = performance.now();
    const speedPxPerMs = 0.055;

    const measureLoop = () => {
      const el = eindproductenScrollerRef.current;
      if (!el) return 0;
      const items = el.querySelectorAll<HTMLElement>("[data-snap-item]");
      if (items.length < 2) return Math.max(0, el.scrollWidth / 2);
      const half = Math.floor(items.length / 2);
      const loopWidth = items[half]?.offsetLeft ?? el.scrollWidth / 2;
      eindproductenLoopWidthRef.current = loopWidth;
      return loopWidth;
    };

    const tick = (now: number) => {
      if (cancelled) return;
      const el = eindproductenScrollerRef.current;
      if (!el) {
        eindproductenAutoRafRef.current = requestAnimationFrame(tick);
        return;
      }

      const paused =
        eindproductenAutoPausedRef.current ||
        eindproductenDraggingRef.current ||
        performance.now() < eindproductenAutoHoldUntilRef.current ||
        document.hidden;

      const dt = Math.min(48, now - lastTime);
      lastTime = now;

      if (!paused) {
        const loopWidth = eindproductenLoopWidthRef.current || measureLoop();
        if (loopWidth > 0) {
          el.scrollLeft += speedPxPerMs * dt;
          wrapEindproductenScroll(el);
          eindproductenTiltRaw.set(0.06);
        }
      } else {
        eindproductenTiltRaw.set(0);
      }

      eindproductenAutoRafRef.current = requestAnimationFrame(tick);
    };

    measureLoop();
    eindproductenAutoRafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      if (eindproductenAutoRafRef.current) cancelAnimationFrame(eindproductenAutoRafRef.current);
      eindproductenAutoRafRef.current = null;
      eindproductenTiltRaw.set(0);
    };
  }, [reduceMotion, eindproductenIntroComplete, eindproductenShowcaseInView, eindproductenTiltRaw]);

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

      const nextLeft = nextEl.scrollLeft + v * dt;
      nextEl.scrollLeft = nextLeft;
      wrapEindproductenScroll(nextEl);

      const loopWidth = eindproductenLoopWidthRef.current;
      const maxScrollLeft =
        loopWidth > 0 ? loopWidth : Math.max(0, nextEl.scrollWidth - nextEl.clientWidth);
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
    wrapEindproductenScroll(el);

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

    wrapEindproductenScroll(el);
    const scrollV = -eindproductenVelocityRef.current;
    startEindproductenInertia(scrollV * 28);
    window.setTimeout(() => eindproductenTiltRaw.set(0), 0);
  };

  return (
    <SiteLayout>
      <div className="home-story">
      <HomeHeroSection />

      <EnterpriseTrustSection />

      <StoryBridge tone="dark-dark" line="Waar premium begint bij de snede" />

      <StoryMoment emphasis>
        <PremiumMeatShowcase />
      </StoryMoment>

      <StoryBridge tone="light-light" line="Vakmanschap begint met kennis en respect" />

      <section
        data-story-chapter="heritage"
        aria-labelledby="story-heritage-heading"
        className="story-section story-section--editorial story-surface-light relative overflow-hidden px-6 grain md:px-10 lg:px-[80px]"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/3 top-1/4 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(200,164,107,0.14),transparent_70%)]" />
          <div className="absolute right-0 top-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(179,18,23,0.08),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(1200px_820px_at_35%_30%,rgba(255,255,255,0.65)_0%,rgba(245,241,235,0)_58%)]" />
        </div>

        <StoryReveal className="relative mx-auto max-w-[1440px]">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-12">
            <StoryItem className="lg:col-span-4">
                <div className="ipek-label text-primary">
                  ONS VERHAAL
                </div>
                <h2
                  id="story-heritage-heading"
                  className="ipek-h2 mt-6 text-[#141414]"
                >
                  Passie, vakmanschap
                  <br />
                  en halal integriteit
                </h2>
                <p className="mt-6 max-w-lg text-[15px] leading-[1.7] text-[#141414]/72">
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
            </StoryItem>

            <StoryItem className="lg:col-span-8">
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
                </CardBody>
              </CardContainer>
            </StoryItem>
          </div>
        </StoryReveal>
      </section>

      <StoryBridge tone="light-light" line="Waar selectie transformeert in excellentie" />

      <section
        id="ons-assortiment"
        data-story-chapter="quality"
        aria-labelledby="assortiment-heading"
        className="story-moment story-surface-light relative isolate overflow-hidden px-6 py-20 grain lg:px-10 lg:py-28"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-0 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(226,192,141,0.14),transparent_68%)]" />
          <div className="absolute -right-24 bottom-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(177,18,23,0.05),transparent_70%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(200,164,107,0.38)] to-transparent" />
        </div>

        <div className="relative mx-auto w-full max-w-[1320px]">
          <div className="relative z-0 grid gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: DS_DURATION.section, ease: DS_EASE_REVEAL }}
              className="flex flex-col justify-center lg:col-span-4"
            >
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rotate-45 bg-[#B31217]" aria-hidden />
                <span className="ipek-heading-label text-[10px] font-semibold uppercase tracking-[0.32em]">
                  Premium kwaliteit
                </span>
              </div>
              <h2
                id="assortiment-heading"
                className="mt-6 font-display text-[clamp(2rem,3.5vw,3rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-[#141414]"
              >
                Vlees van topkwaliteit,
                <span className="mt-2 block ipek-heading-accent">
                  voor elke behoefte
                </span>
              </h2>

              <div className="relative mt-8 h-px w-24 bg-[linear-gradient(90deg,rgba(200,164,107,0),rgba(200,164,107,0.55),rgba(200,164,107,0))]">
                <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#B31217]" />
              </div>

              <p className="mt-6 max-w-[520px] text-[15px] leading-[1.75] text-[#141414]/62">
                Dagelijks vers, halal gecertificeerd en met zorg geselecteerd.
                <span className="mt-0.5 block">Ontdek ons uitgebreide assortiment premium vlees.</span>
              </p>

              <div className="mt-6 space-y-3">
                <PremiumTrustPoint icon={ShieldCheck} label="100% Halal Gecertificeerd" index={0} />
                <PremiumTrustPoint icon={DutchCraftIcon} label="Nederlandse Kwaliteit" index={1} />
                <PremiumTrustPoint icon={Truck} label="Dagelijks Vers Geleverd" index={2} />
              </div>
            </motion.div>

            <div className="grid gap-6 lg:col-span-8 lg:grid-cols-3 lg:items-stretch">
              <AssortimentProductCard
                label="Premium lamsvlees"
                title="Lamsvlees"
                description="Mals, smaakvol en zorgvuldig geselecteerd lamsvlees van topkwaliteit."
                image={assortmentLamsvleesImage}
                imagePosition="24% 26%"
                stickerSrc={HERO_STICKERS.lamsvlees}
                href="/assortiment/lamsvlees"
                index={0}
              />
              <AssortimentProductCard
                label="Premium rundvlees"
                title="Rundvlees"
                description="Premium rundvlees, perfect voor elke professionele keuken."
                image={assortmentRundvleesImage}
                imagePosition="52% 28%"
                stickerSrc={HERO_STICKERS.rundvlees}
                href="/assortiment/rundvlees"
                index={1}
              />
              <AssortimentProductCard
                label="Premium kip"
                title="Kip"
                description="Halal kip van hoge kwaliteit, dagvers en breed inzetbaar in elk gerecht."
                image={assortmentKipImage}
                imagePosition="72% 30%"
                stickerSrc={HERO_STICKERS.kip}
                href="/assortiment/kip"
                index={2}
              />
            </div>
          </div>

          <div className="relative z-20 mt-8 border-t border-black/[0.06] pt-6 lg:mt-10 lg:pt-8">
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#141414]/38">
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

      <StoryBridge tone="light-light" line="Vertrouwd door keukens die het verschil kennen" />

      <section
        id="segments"
        data-story-chapter="partnership"
        aria-labelledby="segments-heading"
        className="story-section story-section--information story-surface-light relative overflow-hidden px-6 grain lg:px-10"
      >
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute left-0 top-1/4 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(200,164,107,0.14),transparent_70%)]" />
          <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(179,18,23,0.08),transparent_70%)]" />
          <div className="absolute bottom-1/4 left-1/3 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(226,192,141,0.16),transparent_70%)]" />
        </div>
        <div className="mx-auto max-w-[1480px]">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-12">
            <StoryReveal className="lg:col-span-5">
              <StoryItem>
                <div className="ipek-label text-primary">
                  VOOR WIE WIJ WERKEN
                </div>
              </StoryItem>
              <PremiumTypewriter
                text="Halalvlees voor verkoop en bereiding"
                className="ipek-h2 mt-6 text-[#1A1A1A]"
                startDelay={0.28}
                charMs={40}
              />
              <StoryItem>
                <p
                  id="segments-heading"
                  className="mt-7 max-w-lg text-base leading-relaxed text-[#1A1A1A]/82"
                >
                  Ipekçi levert premium halalvlees en eindproducten aan slagerijen, groothandels,
                  supermarkten en restaurants, met constante kwaliteit, hygiënische verwerking en
                  betrouwbare levering.
                </p>
              </StoryItem>
            </StoryReveal>

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

      <StoryBridge tone="light-dark" line="Van rauwe excellentie tot verfijnd eindproduct" />

      <StoryMoment emphasis>
      <section
        id="products"
        data-story-chapter="finished-products"
        aria-labelledby="products-heading"
        className="story-surface-dark relative overflow-hidden px-6 py-28 grain lg:px-10 lg:py-36"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 right-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(198,160,98,0.32),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(1200px_760px_at_50%_0%,rgba(255,255,255,0.05)_0%,transparent_62%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(900px_640px_at_82%_72%,rgba(226,192,141,0.06)_0%,transparent_58%)]" />
        </div>

        <div className="relative mx-auto max-w-[1480px]">
          <StoryReveal className="text-center">
            <StoryItem>
              <div className="ipek-label ipek-heading-label">
                ONS ASSORTIMENT
              </div>
              <h2
                id="products-heading"
                className="ipek-h2-lg mt-6 text-[#F5F2ED]"
              >
                Slacht van Ipekçi
              </h2>

              <div className="relative mx-auto mt-8 h-px w-[220px] bg-[rgba(198,160,98,0.55)]">
                <div className="absolute left-1/2 top-1/2 grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center bg-[#121110]">
                  <div className="h-2 w-2 rotate-45 bg-[#B31217]" />
                </div>
              </div>
            </StoryItem>

            <StoryItem>
              <p className="mx-auto mt-9 max-w-[720px] text-sm leading-relaxed text-[#B9B9B9] sm:text-base">
                Al ons vlees is 100% halal, met zorg geselecteerd en met vakmanschap verwerkt. Puur,
                vers en van de hoogste kwaliteit.
              </p>
            </StoryItem>
          </StoryReveal>

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

          <div className="relative mt-16 h-px w-full bg-[linear-gradient(90deg,transparent,rgba(198,160,98,0.35),transparent)]" />

          <div className="relative mt-14 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:items-start lg:gap-14 xl:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-140px" }}
              transition={{ duration: DS_DURATION.section, ease: DS_EASE_REVEAL }}
              className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start"
            >
              <div className="ipek-label ipek-heading-label">Eindproducten</div>
              <h3 className="ipek-h2-lg mt-5 text-[#F5F2ED]">
                Premium
                <span className="mt-1 block ipek-heading-accent">
                  Finished Products
                </span>
              </h3>

              <div className="relative mt-7 h-px w-20 bg-[linear-gradient(90deg,rgba(226,192,141,0.0),rgba(226,192,141,0.55),rgba(226,192,141,0.0))]">
                <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#B31217]" />
              </div>

              <p className="mt-6 max-w-[42ch] text-[15px] leading-[1.75] text-[rgba(245,242,237,0.68)]">
                Een zorgvuldig samengestelde halal collectie voor retail, slagerij,
                horeca en moderne foodconcepten — van shoarma en kebab tot burgers en
                verpakte specialiteiten.
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {["Shoarma", "Kebab", "Burgers", "Verpakt"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[rgba(226,192,141,0.18)] bg-white/[0.03] px-3.5 py-1.5 text-[9px] font-medium uppercase tracking-[0.24em] text-[rgba(245,242,237,0.62)]"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href="/assortiment/eindproducten"
                  className="group inline-flex items-center gap-3 rounded-2xl border border-[rgba(226,192,141,0.22)] bg-[linear-gradient(135deg,rgba(179,18,23,0.98),rgba(92,8,10,0.96))] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F5F2ED] shadow-[0_26px_92px_-64px_rgba(0,0,0,0.90)] transition-all duration-500 hover:border-[rgba(226,192,141,0.38)] active:translate-y-px"
                >
                  Alle producten
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1"
                  />
                </a>
                <span className="text-[10px] uppercase tracking-[0.28em] text-[rgba(245,242,237,0.38)]">
                  {EINDPRODUCTEN_PRODUCTS.length} signature selecties
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 88 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-140px" }}
              transition={{ duration: 1.15, ease: EINDPRODUCTEN_REVEAL_EASE, delay: 0.06 }}
              className="relative min-w-0 lg:col-span-8"
              ref={eindproductenShowcaseRef}
            >
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
                <motion.div
                  ref={eindproductenScrollerRef}
                  onPointerDown={handleEindproductenPointerDown}
                  onPointerMove={handleEindproductenPointerMove}
                  onPointerUp={handleEindproductenPointerUp}
                  onPointerCancel={handleEindproductenPointerUp}
                  data-dragging={eindproductenDragging ? "true" : "false"}
                  className={`relative flex w-full min-w-0 gap-5 overflow-x-auto pb-2 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:gap-6 lg:gap-7 ${
                    eindproductenDragging ? "cursor-grabbing" : "cursor-grab"
                  }`}
                  style={{
                    scrollPaddingLeft: "4px",
                    scrollPaddingRight: "4px",
                    WebkitOverflowScrolling: "touch",
                    touchAction: "pan-y",
                  }}
                >
                  {EINDPRODUCTEN_LOOP_PRODUCTS.map((p, idx) => (
                    <EindproductenShowcaseCard
                      key={`eind-${p.title}-${idx}`}
                      product={p}
                      index={idx % EINDPRODUCTEN_PRODUCTS.length}
                      skipReveal={idx >= EINDPRODUCTEN_PRODUCTS.length}
                      tilt={eindproductenTilt}
                      total={EINDPRODUCTEN_PRODUCTS.length}
                      isRevealed={eindproductenShowcaseInView}
                    />
                  ))}

                  <div className="w-2 shrink-0 sm:w-4" />
                </motion.div>
              </div>

              <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-10 hidden sm:block">
                <div className="absolute left-0 top-1/2 -translate-y-1/2">
                  {eindproductenCanScrollLeft ? (
                    <button
                      type="button"
                      aria-label="Vorige"
                      onClick={() => {
                        markEindproductenUserInteract();
                        scrollToSnapItem(eindproductenScrollerRef, "left");
                      }}
                      className="pointer-events-auto group grid h-10 w-10 place-items-center rounded-full border border-[rgba(226,192,141,0.22)] bg-[rgba(18,17,16,0.88)] shadow-[0_12px_40px_-20px_rgba(0,0,0,0.8)] transition-all duration-400 hover:border-[rgba(226,192,141,0.42)] hover:bg-[rgba(24,22,20,0.95)] active:scale-[0.98] lg:h-11 lg:w-11"
                    >
                      <ArrowRight
                        size={16}
                        className="rotate-180 text-[rgba(245,242,237,0.86)] transition-transform duration-400 group-hover:-translate-x-0.5"
                      />
                    </button>
                  ) : null}
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2">
                  {eindproductenCanScrollRight ? (
                    <button
                      type="button"
                      aria-label="Volgende"
                      onClick={() => {
                        markEindproductenUserInteract();
                        scrollToSnapItem(eindproductenScrollerRef, "right");
                      }}
                      className="pointer-events-auto group grid h-10 w-10 place-items-center rounded-full border border-[rgba(226,192,141,0.22)] bg-[rgba(18,17,16,0.88)] shadow-[0_12px_40px_-20px_rgba(0,0,0,0.8)] transition-all duration-400 hover:border-[rgba(226,192,141,0.42)] hover:bg-[rgba(24,22,20,0.95)] active:scale-[0.98] lg:h-11 lg:w-11"
                    >
                      <ArrowRight
                        size={16}
                        className="text-[rgba(245,242,237,0.86)] transition-transform duration-400 group-hover:translate-x-0.5"
                      />
                    </button>
                  ) : null}
                </div>
              </div>

              <div className="relative mt-8 hidden h-[2px] overflow-hidden rounded-full bg-white/[0.06] sm:block">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,rgba(226,192,141,0.0),rgba(226,192,141,0.75),rgba(226,192,141,0.0))] transition-[width] duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
                  style={{ width: `${Math.round(eindproductenProgress * 100)}%` }}
                />
                <div
                  className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border border-[rgba(226,192,141,0.45)] bg-[rgba(245,242,237,0.9)] transition-[left] duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
                  style={{ left: `calc(${Math.max(0, Math.min(1, eindproductenProgress)) * 100}% - 5px)` }}
                />
              </div>
            </motion.div>
        </div>
      </div>
      </section>
      </StoryMoment>

      <StoryBridge tone="dark-dark" />
      </div>
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
        transition={reduceMotion ? undefined : { duration: 1.25, ease: DS_EASE }}
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
        transition={reduceMotion ? undefined : { duration: 1.25, ease: DS_EASE }}
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
  skipReveal = false,
  tilt,
  total,
  isRevealed,
}: {
  product: (typeof EINDPRODUCTEN_PRODUCTS)[number];
  index: number;
  skipReveal?: boolean;
  tilt: MotionValue<number>;
  total: number;
  isRevealed: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);
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
        reduceMotion || skipReveal
          ? { opacity: 1, x: 0, y: 0, scale: 1 }
          : {
              opacity: 0,
              x: 108,
              y: 0,
              scale: 0.98,
            }
      }
      animate={
        reduceMotion || skipReveal || isRevealed
          ? { opacity: 1, x: 0, y: 0, scale: 1, rotateX: 0, rotateY: 0 }
          : undefined
      }
      transition={{
        duration: 1.05,
        ease: EINDPRODUCTEN_REVEAL_EASE,
        delay: reduceMotion || skipReveal ? 0 : 0.14 + index * 0.065,
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -12,
              scale: 1.012,
              rotateX: -2.5,
              rotateY: revealOffset > 0 ? -1.8 : 1.8,
              transition: { type: "spring", stiffness: 260, damping: 28 },
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
      className="group relative w-[272px] shrink-0 overflow-hidden rounded-[24px] border border-[rgba(226,192,141,0.16)] shadow-[0_28px_70px_-32px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.03)] transition-[border-color,box-shadow,transform] duration-500 hover:border-[rgba(226,192,141,0.30)] hover:shadow-[0_36px_90px_-36px_rgba(0,0,0,0.9),0_0_0_1px_rgba(226,192,141,0.10)] sm:w-[288px] lg:w-[296px]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src={cardProductenImage}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            objectPosition: "center 40%",
            filter: "brightness(0.82) contrast(1.08) saturate(1.05)",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,7,6,0.42)_0%,rgba(8,7,6,0.58)_45%,rgba(8,7,6,0.82)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(226,192,141,0.08),transparent_55%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(226,192,141,0.45),transparent)]" />
      </div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={reduceMotion ? undefined : { background: glowBg }}
      />

      <div className="relative flex h-full min-h-[468px] flex-col">
        <div className="relative flex flex-1 flex-col">
          <span
            aria-hidden
            className="pointer-events-none absolute right-4 top-3 select-none font-display text-[3.5rem] font-semibold leading-none tracking-[-0.06em] text-[rgba(226,192,141,0.07)]"
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="relative z-10 flex items-center justify-between gap-3 px-5 pt-5">
            <div className="flex items-center gap-2">
              <img
                src={product.stickerSrc}
                alt=""
                aria-hidden
                loading="lazy"
                decoding="async"
                className="h-4 w-4 select-none opacity-90"
                style={{ filter: STICKER_GOLD_FILTER }}
              />
              <span className="text-[8px] font-medium uppercase tracking-[0.28em] text-[rgba(226,192,141,0.78)]">
                {product.category}
              </span>
            </div>
            <span className="rounded-full border border-[rgba(226,192,141,0.22)] bg-black/30 px-2.5 py-1 text-[7px] font-semibold uppercase tracking-[0.2em] text-[rgba(245,242,237,0.72)]">
              Halal
            </span>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-5 py-4">
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-[170px] w-[170px] -translate-x-1/2 -translate-y-[54%] rounded-full border border-[rgba(226,192,141,0.12)] sm:h-[182px] sm:w-[182px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-[120px] w-[120px] -translate-x-1/2 -translate-y-[54%] rounded-full bg-[radial-gradient(circle,rgba(226,192,141,0.22),transparent_68%)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-2 left-1/2 h-5 w-[50%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(0,0,0,0.45),transparent)]"
            />
            <motion.img
              src={product.image}
              alt={product.title}
              loading="lazy"
              decoding="async"
              className="relative z-10 h-[176px] w-full object-contain sm:h-[188px]"
              style={
                reduceMotion
                  ? { filter: EINDPRODUCTEN_PRODUCT_SHADOW }
                  : { x: imageX, y: imageY, filter: EINDPRODUCTEN_PRODUCT_SHADOW }
              }
              animate={
                reduceMotion
                  ? undefined
                  : hovered
                    ? { scale: 1.05, y: -4 }
                    : { scale: 1, y: 0 }
              }
              transition={reduceMotion ? undefined : { duration: 0.9, ease: EINDPRODUCTEN_REVEAL_EASE }}
            />
          </div>
        </div>

        <div className="relative border-t border-[rgba(226,192,141,0.12)] bg-[rgba(8,7,6,0.72)] px-5 pb-5 pt-4">
          <div className="text-[7.5px] font-medium uppercase tracking-[0.28em] text-[rgba(226,192,141,0.55)]">
            {product.eyebrow}
          </div>
          <h3 className="mt-2 font-display text-[1.75rem] font-semibold leading-[0.98] tracking-[-0.04em] text-[#F5F2ED] sm:text-[1.85rem]">
            {product.title}
          </h3>
          <p className="mt-2.5 text-[12px] leading-[1.65] text-[rgba(245,242,237,0.58)]">
            {product.blurb}
          </p>

          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {product.traits.map((trait) => (
              <span
                key={trait}
                className="rounded-full border border-[rgba(226,192,141,0.14)] bg-white/[0.03] px-2.5 py-1 text-[6.5px] font-medium uppercase tracking-[0.18em] text-[rgba(245,242,237,0.55)] sm:text-[7px]"
              >
                {trait}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/[0.05] pt-3.5">
            <span className="text-[7px] font-medium uppercase tracking-[0.24em] text-[rgba(245,242,237,0.35)] sm:text-[7.5px]">
              Signature selectie
            </span>
            <a
              href="/assortiment/eindproducten"
              className="group/cta inline-flex items-center gap-2 rounded-xl border border-[rgba(226,192,141,0.22)] bg-[linear-gradient(135deg,rgba(147,24,28,0.95),rgba(78,13,15,0.96))] px-3.5 py-2 text-[7.5px] font-semibold uppercase tracking-[0.2em] text-[rgba(250,241,230,0.96)] transition-all duration-400 hover:border-[rgba(226,192,141,0.38)] sm:text-[8px]"
            >
              Bekijk
              <ArrowUpRight
                size={13}
                className="transition-transform duration-400 ease-[cubic-bezier(.22,1,.36,1)] group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
              />
            </a>
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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: DS_DURATION.reveal, delay: index * 0.1, ease: DS_EASE_REVEAL }}
      className="group relative overflow-hidden rounded-3xl border border-[rgba(226,192,141,0.22)] bg-[#070707] shadow-[0_40px_120px_-95px_rgba(0,0,0,0.98)] transition-shadow duration-700 hover:shadow-[0_56px_170px_-120px_rgba(0,0,0,0.98)]"
    >
      <a href={`/assortiment/${id}`} className="relative block">
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
            transition={{ duration: 1.25, ease: DS_EASE }}
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
      transition={{ duration: 0.85, delay: index * 0.06, ease: DS_EASE }}
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
      transition={{ duration: 0.85, delay: index * 0.06, ease: DS_EASE }}
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
              href={`/assortiment/${id}`}
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

function Counter({ to, suffix }: { to: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const mv = useMotionValue(0);
  const target = parseInt(to, 10);
  const rounded = useTransform(mv, (v) => Math.round(v).toString());
  const [val, setVal] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, target, { duration: 1.8, ease: DS_EASE });
    const unsub = rounded.on("change", (v) => setVal(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, mv, rounded, target]);

  return (
    <span ref={ref} className="mc-tabular">
      {val}
      {suffix ? <span className="ml-0.5 align-top text-[0.7em]">{suffix}</span> : null}
    </span>
  );
}

const PROCESS_STEP_MS = 5000;
const PROCESS_TRANSITION_S = DS_DURATION.reveal;
const PROCESS_EASE = DS_EASE;

const PROCESS_CHAPTERS = ["Herkomst", "Bereiding", "Levering"] as const;

function ProcessQualitySection() {
  const reduce = useReducedMotion();
  const initial = reduce ? "show" : "hidden";
  const sectionRef = useRef<HTMLElement>(null);
  const workflowRef = useRef<HTMLDivElement>(null);
  const pauseDepthRef = useRef(0);
  const pendingAdvanceRef = useRef(false);
  const inViewRef = useRef(false);
  const activeRef = useRef(0);
  const progressControlsRef = useRef<ReturnType<typeof animate> | null>(null);
  const progressMv = useMotionValue(0);

  const [active, setActive] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [headlineMouse, setHeadlineMouse] = useState({ x: 0.5, y: 0.5 });
  const step = processSteps[active];

  activeRef.current = active;

  const timelineProgressWidth = useTransform(progressMv, (p) => {
    const combined = (activeRef.current + p) / processSteps.length;
    return `${combined * 100}%`;
  });

  const clearProgressAnimation = useCallback(() => {
    progressControlsRef.current?.stop();
    progressControlsRef.current = null;
  }, []);

  const startStepCycle = useCallback(() => {
    clearProgressAnimation();
    progressMv.set(0);

    if (reduce || !inViewRef.current) return;

    progressControlsRef.current = animate(progressMv, 1, {
      duration: PROCESS_STEP_MS / 1000,
      ease: PROCESS_EASE,
      onComplete: () => {
        if (!inViewRef.current) return;
        if (pauseDepthRef.current > 0) {
          pendingAdvanceRef.current = true;
          return;
        }
        setActive((prev) => {
          const next = (prev + 1) % processSteps.length;
          activeRef.current = next;
          return next;
        });
      },
    });
  }, [clearProgressAnimation, progressMv, reduce]);

  const goToStep = useCallback(
    (idx: number) => {
      if (idx === activeRef.current) {
        startStepCycle();
        return;
      }
      activeRef.current = idx;
      setActive(idx);
    },
    [startStepCycle],
  );

  const pauseAutoplay = useCallback(() => {
    pauseDepthRef.current += 1;
    if (pauseDepthRef.current === 1) {
      progressControlsRef.current?.pause();
    }
  }, []);

  const resumeAutoplay = useCallback(() => {
    pauseDepthRef.current = Math.max(0, pauseDepthRef.current - 1);
    if (pauseDepthRef.current !== 0) return;

    if (pendingAdvanceRef.current) {
      pendingAdvanceRef.current = false;
      setActive((prev) => {
        const next = (prev + 1) % processSteps.length;
        activeRef.current = next;
        return next;
      });
      return;
    }

    progressControlsRef.current?.play();
  }, []);

  useEffect(() => {
    const el = workflowRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
        inViewRef.current = visible;
        setIsInView(visible);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) {
      clearProgressAnimation();
      pendingAdvanceRef.current = false;
      progressMv.set(0);
      return;
    }

    if (reduce) {
      progressMv.set(1);
      const interval = window.setInterval(() => {
        if (pauseDepthRef.current > 0) return;
        setActive((prev) => (prev + 1) % processSteps.length);
      }, PROCESS_STEP_MS);
      return () => window.clearInterval(interval);
    }

    startStepCycle();
    return clearProgressAnimation;
  }, [active, isInView, startStepCycle, clearProgressAnimation, progressMv, reduce]);

  useEffect(() => () => clearProgressAnimation(), [clearProgressAnimation]);

  const stepTransition = {
    duration: reduce ? 0.35 : PROCESS_TRANSITION_S,
    ease: PROCESS_EASE,
  };

  const stepInitial = { opacity: 0, y: 12 };
  const stepExit = { opacity: 0, y: -8 };

  const reveal = (delay: number) => ({
    duration: reduce ? 0.3 : PROCESS_TRANSITION_S,
    delay,
    ease: PROCESS_EASE,
  });

  const processContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.14, delayChildren: 0.08 } },
  };
  const rise: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: DS_DURATION.section, ease: DS_EASE_REVEAL },
    },
  };
  const fade: Variants = {
    hidden: { opacity: 0, y: 18, scale: 0.99 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.9, ease: DS_EASE },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="quality"
      data-story-chapter="process"
      aria-labelledby="process-heading"
      className="mc-grain mc-paper-tex relative isolate overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 80% at 50% 0%, #ffffff 0%, var(--mc-paper) 55%, var(--mc-paper-2) 100%)",
        color: "var(--mc-ink)",
      }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="mc-drift mc-float-soft absolute -left-[8%] top-[12%] h-[36rem] w-[36rem] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(closest-side, rgba(184,137,58,0.18), transparent 70%)" }}
        />
        <div
          className="mc-drift mc-orbit absolute right-[-10%] bottom-[8%] h-[34rem] w-[34rem] rounded-full blur-[140px]"
          style={{
            background: "radial-gradient(closest-side, rgba(163,36,24,0.10), transparent 70%)",
            animationDelay: "-6s",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1320px] px-6 py-24 md:px-10 md:py-32 lg:py-40">
        <motion.header
          initial={initial}
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
          variants={processContainer}
          className="relative grid gap-10 md:grid-cols-12"
        >
          <div className="md:col-span-5">
            <motion.div variants={fade}>
              <span
                className="mc-eyebrow inline-flex items-center rounded-full px-4 py-2"
                style={{
                  color: "var(--mc-gold-deep)",
                  background: "rgba(255,255,255,0.72)",
                  border: "1px solid rgba(184,137,58,0.24)",
                  boxShadow: "0 10px 30px -22px rgba(184,137,58,0.45)",
                }}
              >
                Onze werkwijze, editie 03
              </span>
            </motion.div>
            <motion.p
              variants={fade}
              className="mc-sans mt-8 max-w-sm text-[13.5px] leading-relaxed"
              style={{ color: "var(--mc-ink-dim)" }}
            >
              Drie zorgvuldige fasen. Een bewaakte keten van begin tot eind, van de halal
              slacht tot het openen van de levering in uw keuken.
            </motion.p>

            <motion.div variants={fade} className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
              <span className="mc-eyebrow text-[10px]" style={{ color: "var(--mc-ink-dim)" }}>
                Gecertificeerd door
              </span>
              {processCerts.map((cert) => (
                <span
                  key={cert}
                  className="mc-sans rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.18em]"
                  style={{
                    color: "var(--mc-ink)",
                    border: "1px solid rgba(184,137,58,0.2)",
                    background: "rgba(255,255,255,0.72)",
                  }}
                >
                  {cert}
                </span>
              ))}
            </motion.div>
          </div>

          <div
            className="relative md:col-span-7"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setHeadlineMouse({
                x: (e.clientX - rect.left) / rect.width,
                y: (e.clientY - rect.top) / rect.height,
              });
            }}
            onMouseLeave={() => setHeadlineMouse({ x: 0.5, y: 0.5 })}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-8 rounded-[32px] opacity-60 transition-opacity duration-500 md:opacity-100"
              style={{
                background: `radial-gradient(circle at ${headlineMouse.x * 100}% ${headlineMouse.y * 100}%, rgba(184,137,58,0.08) 0%, transparent 55%)`,
              }}
            />
            <motion.h2
              id="process-heading"
              variants={rise}
              className="mc-serif relative text-[clamp(2.25rem,9.5vw,6rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-balance"
              style={{ color: "var(--mc-ink)" }}
            >
              Een ambacht dat{" "}
              <motion.span
                className="italic inline-block cursor-default"
                style={{ color: "var(--mc-gold-deep)" }}
                whileHover={reduce ? undefined : { y: -2, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              >
                in stilte
              </motion.span>
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              wordt bewaakt,
              <br />
              een norm die{" "}
              <motion.span
                className="italic inline-block cursor-default"
                style={{ color: "var(--mc-gold-deep)" }}
                whileHover={reduce ? undefined : { y: -2, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              >
                altijd standhoudt.
              </motion.span>
            </motion.h2>
            <motion.div
              variants={fade}
              className="relative mt-8 h-2 w-full max-w-md overflow-hidden rounded-full md:mt-10"
              style={{ background: "rgba(184,137,58,0.12)" }}
              aria-hidden
            >
              <motion.div
                className="relative h-full overflow-hidden rounded-full"
                style={{
                  width: timelineProgressWidth,
                  background: "linear-gradient(90deg, rgba(138,102,32,0.85), rgba(184,137,58,0.95))",
                  boxShadow: "0 0 14px rgba(184,137,58,0.22)",
                }}
              >
                <div className="mc-shimmer absolute inset-0 opacity-70" />
              </motion.div>
            </motion.div>
            <motion.p
              variants={fade}
              className="mc-sans mt-4 text-[11px] uppercase tracking-[0.22em] md:mt-5"
              style={{ color: "var(--mc-ink-dim)" }}
            >
              Hoofdstuk {active + 1} · {PROCESS_CHAPTERS[active]} — {step.navLabel}
            </motion.p>
          </div>
        </motion.header>

        <motion.div
          ref={workflowRef}
          initial={initial}
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
          variants={processContainer}
          className="relative mt-16 md:mt-28"
        >
          <motion.div
            variants={fade}
            className="relative"
            onMouseEnter={pauseAutoplay}
            onMouseLeave={resumeAutoplay}
          >
            <div
              className="absolute left-0 right-0 top-1/2 hidden h-[6px] -translate-y-1/2 overflow-hidden rounded-full md:block"
              style={{ background: "rgba(184,137,58,0.08)" }}
            />
            <motion.div
              className="absolute left-0 top-1/2 hidden h-[6px] -translate-y-1/2 overflow-hidden rounded-full md:block"
              style={{
                width: timelineProgressWidth,
                background: "linear-gradient(90deg, rgba(138,102,32,0.85), rgba(184,137,58,0.95))",
                boxShadow: "0 0 18px rgba(184,137,58,0.28)",
              }}
            >
              <div aria-hidden className="process-line-flow absolute inset-0 opacity-80" />
            </motion.div>
            <ol className="scrollbar-hide relative flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
              {processSteps.map((item, idx) => {
                const isActive = idx === active;
                return (
                  <li key={item.index} className="min-w-[min(88vw,280px)] shrink-0 snap-start md:min-w-0">
                    <motion.button
                      type="button"
                      onClick={() => goToStep(idx)}
                      whileHover={reduce ? undefined : { y: -3, scale: 1.01 }}
                      whileTap={reduce ? undefined : { scale: 0.985 }}
                      className="group/tab relative flex w-full items-center gap-4 rounded-[20px] px-4 py-4 text-left transition-[transform,background-color,box-shadow] duration-500 md:px-5 md:py-5"
                      aria-pressed={isActive}
                      style={{
                        background: isActive ? "rgba(255,255,255,0.86)" : "rgba(255,255,255,0.5)",
                        border: `1px solid ${isActive ? "rgba(184,137,58,0.24)" : "rgba(220,210,189,0.75)"}`,
                        boxShadow: isActive
                          ? "0 18px 36px -24px rgba(13,11,8,0.18), 0 8px 24px -18px rgba(184,137,58,0.55)"
                          : "0 8px 20px -22px rgba(13,11,8,0.14)",
                      }}
                    >
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-500 group-hover/tab:opacity-100"
                        style={{
                          background:
                            "radial-gradient(circle at 12% 50%, rgba(184,137,58,0.14), transparent 42%)",
                        }}
                      />
                      <span
                        className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-500"
                        style={{
                          background: isActive
                            ? "linear-gradient(160deg, var(--mc-ink), #2a221a)"
                            : "rgba(255,255,255,0.8)",
                          border: `1px solid ${isActive ? "var(--mc-gold)" : "var(--mc-line)"}`,
                          color: isActive ? "var(--mc-gold-soft)" : "var(--mc-ink-dim)",
                          boxShadow: isActive
                            ? "0 0 0 4px var(--mc-paper), 0 8px 24px -8px rgba(184,137,58,0.6)"
                            : "0 0 0 4px var(--mc-paper)",
                        }}
                      >
                        <span className="mc-serif text-[14px] italic">{item.num}</span>
                      </span>
                      <span className="flex flex-col">
                        <span
                          className="mc-eyebrow text-[10px]"
                          style={{ color: isActive ? "var(--mc-gold-deep)" : "var(--mc-ink-dim)" }}
                        >
                          {item.index}
                        </span>
                        <span
                          className="mc-sans mt-1 text-[13px] font-medium leading-tight transition-colors md:text-[14px]"
                          style={{ color: isActive ? "var(--mc-ink)" : "var(--mc-ink-dim)" }}
                        >
                          {item.navLabel}
                        </span>
                      </span>
                    </motion.button>
                  </li>
                );
              })}
            </ol>
          </motion.div>

          <motion.div
            variants={rise}
            className="process-panel-depth relative mt-8 overflow-hidden rounded-[28px] md:mt-10"
            onMouseEnter={pauseAutoplay}
            onMouseLeave={resumeAutoplay}
            style={{
              background: "linear-gradient(180deg, #ffffff 0%, var(--mc-paper) 100%)",
              border: "1px solid var(--mc-line)",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 18% 0%, rgba(184,137,58,0.07), transparent 48%), radial-gradient(ellipse at 88% 100%, rgba(163,36,24,0.04), transparent 42%)",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-x-8 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, var(--mc-gold), transparent)" }}
            />

            <div
              className="relative flex flex-wrap items-center justify-between gap-3 border-b px-6 py-3 sm:px-10 md:px-14"
              style={{ borderColor: "var(--mc-line)", background: "rgba(255,255,255,0.55)" }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={`chapter-${active}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.45, ease: DS_EASE }}
                  className="mc-eyebrow text-[9px]"
                  style={{ color: "var(--mc-gold-deep)" }}
                >
                  Gecontroleerd proces · Hoofdstuk {active + 1}
                </motion.span>
              </AnimatePresence>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                {[
                  { label: "Gecertificeerd", icon: ShieldCheck },
                  { label: "Traceerbaar", icon: Check },
                  { label: "Gevalideerd", icon: Check },
                ].map(({ label, icon: Icon }) => (
                  <span
                    key={label}
                    className="mc-sans inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.16em]"
                    style={{ color: "var(--mc-ink-dim)" }}
                  >
                    <Icon className="h-3 w-3" style={{ color: "var(--mc-gold-deep)" }} />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-0 md:grid-cols-12">
              <div
                className="relative overflow-hidden p-6 sm:p-8 md:col-span-5 md:p-14"
                style={{
                  background: "linear-gradient(160deg, #1a1612 0%, #0d0b08 100%)",
                  color: "var(--mc-paper)",
                }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full blur-3xl"
                  style={{ background: "radial-gradient(closest-side, rgba(163,36,24,0.45), transparent 70%)" }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-16 -right-16 h-72 w-72 rounded-full blur-3xl"
                  style={{ background: "radial-gradient(closest-side, rgba(184,137,58,0.35), transparent 70%)" }}
                />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step.index}
                    initial={stepInitial}
                    animate={{ opacity: 1, y: 0 }}
                    exit={stepExit}
                    transition={stepTransition}
                    className="relative"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={reveal(0)}
                      className="inline-flex h-12 w-12 items-center justify-center rounded-full md:h-14 md:w-14"
                      style={{
                        background: "linear-gradient(160deg, rgba(50,38,28,1), rgba(20,16,12,1))",
                        border: "1px solid rgba(217,184,120,0.4)",
                        color: "var(--mc-gold-soft)",
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1), 0 0 28px rgba(184,137,58,0.25)",
                      }}
                    >
                      {step.icon}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={reveal(0.1)}
                      className="mc-serif mt-8 text-[120px] font-light italic leading-[0.8] sm:text-[160px] md:mt-12 md:text-[220px]"
                      style={{
                        color: "transparent",
                        WebkitTextStroke: "1px rgba(217,184,120,0.7)",
                      }}
                    >
                      {step.num}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={reveal(0.16)}
                      className="mt-6 h-px w-16 origin-left md:mt-10"
                      style={{ background: "var(--mc-gold-soft)" }}
                    />
                    <motion.p
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={reveal(0.2)}
                      className="mc-sans mt-4 max-w-xs text-[12px] leading-[1.65] md:mt-6 md:text-[12.5px] md:leading-[1.7]"
                      style={{ color: "rgba(243,237,225,0.75)" }}
                    >
                      {step.proof}
                    </motion.p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="relative p-6 sm:p-8 md:col-span-7 md:p-14">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step.index}
                    initial={stepInitial}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={stepExit}
                    transition={stepTransition}
                  >
                    <motion.span
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={reveal(0)}
                      className="mc-eyebrow"
                      style={{ color: "var(--mc-gold-deep)" }}
                    >
                      {step.kicker}
                    </motion.span>
                    <motion.h3
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={reveal(0.08)}
                      className="mc-serif mt-4 text-[clamp(1.85rem,6vw,3.75rem)] font-semibold leading-[0.98] tracking-[-0.04em] md:mt-5"
                      style={{ color: "var(--mc-ink)" }}
                    >
                      {step.title}
                      <br />
                      <span className="italic" style={{ color: "var(--mc-gold-deep)" }}>
                        {step.titleAccent}
                      </span>
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={reveal(0.16)}
                      className="mc-sans mt-5 max-w-xl text-[14px] leading-[1.7] md:mt-7 md:text-[15px] md:leading-[1.75]"
                      style={{ color: "var(--mc-ink-dim)" }}
                    >
                      {step.body}
                    </motion.p>

                    <ul className="mt-6 grid gap-2.5 md:mt-8 md:gap-3">
                      {step.bullets.map((bullet, idx) => (
                        <motion.li
                          key={`${step.index}-${bullet}`}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={reveal(0.24 + idx * 0.08)}
                          className="mc-sans flex items-start gap-3 text-[14px]"
                          style={{ color: "var(--mc-ink)" }}
                        >
                          <span
                            aria-hidden
                            className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                            style={{
                              background: "linear-gradient(160deg, var(--mc-gold-soft), var(--mc-gold-deep))",
                              boxShadow: "0 0 0 3px rgba(184,137,58,0.12)",
                            }}
                          >
                            <svg
                              viewBox="0 0 12 12"
                              className="h-2.5 w-2.5"
                              fill="none"
                              stroke="#fff"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M2 6.5l2.8 2.8L10 3" />
                            </svg>
                          </span>
                          {bullet}
                        </motion.li>
                      ))}
                    </ul>

                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={reveal(0.42)}
                      className="mt-7 grid gap-3 border-t pt-6 sm:grid-cols-3 md:mt-10 md:gap-4 md:pt-8"
                      style={{ borderColor: "var(--mc-line)" }}
                    >
                      {step.meta.map((meta, idx) => (
                        <motion.div
                          key={meta.k}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={reveal(0.44 + idx * 0.07)}
                          className="flex flex-col gap-1"
                        >
                          <dt className="mc-eyebrow flex items-center gap-1.5 text-[9.5px]" style={{ color: "var(--mc-ink-dim)" }}>
                            <Check className="h-2.5 w-2.5 shrink-0" style={{ color: "var(--mc-gold-deep)" }} />
                            {meta.k}
                          </dt>
                          <dd
                            className="mc-sans mc-tabular text-[13px] leading-snug pl-4"
                            style={{ color: "var(--mc-ink)" }}
                          >
                            {meta.v}
                          </dd>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div
              className="relative flex flex-wrap items-center justify-between gap-3 px-6 py-4 text-[11px] sm:px-10 md:px-14 md:py-5"
              style={{ borderTop: "1px solid var(--mc-line)", background: "rgba(255,255,255,0.6)" }}
              onMouseEnter={pauseAutoplay}
              onMouseLeave={resumeAutoplay}
            >
              <span className="mc-eyebrow" style={{ color: "var(--mc-ink-dim)" }}>
                Stap {active + 1} van {processSteps.length}
              </span>
              <div className="flex items-center gap-2">
                <motion.button
                  type="button"
                  onClick={() => goToStep(Math.max(0, active - 1))}
                  disabled={active === 0}
                  className="process-nav-btn mc-sans group/prev rounded-[14px] border px-4 py-2 text-[10.5px] uppercase tracking-[0.2em] disabled:opacity-30"
                  style={{
                    color: "var(--mc-ember)",
                    borderColor: "rgba(163,36,24,0.24)",
                    background: "rgba(163,36,24,0.06)",
                  }}
                >
                  <span className="inline-flex items-center gap-1.5 transition-transform duration-500 group-hover/prev:-translate-x-0.5">
                    ← Vorige
                  </span>
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => goToStep(Math.min(processSteps.length - 1, active + 1))}
                  disabled={active === processSteps.length - 1}
                  className="process-nav-btn process-nav-btn-primary mc-sans group/next rounded-[14px] px-4 py-2 text-[10.5px] uppercase tracking-[0.2em] disabled:opacity-30"
                  style={{
                    color: "var(--mc-paper)",
                    background: "linear-gradient(180deg, #c33a2d 0%, var(--mc-ember) 100%)",
                    border: "1px solid rgba(163,36,24,0.35)",
                    boxShadow: "0 16px 28px -20px rgba(163,36,24,0.42)",
                  }}
                >
                  <span className="inline-flex items-center gap-1.5 transition-transform duration-500 group-hover/next:translate-x-0.5">
                    Volgende →
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={initial}
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
          variants={processContainer}
          className="story-trust-moment relative mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-[26px] md:mt-24 md:grid-cols-4"
          style={{ background: "var(--mc-line)", border: "1px solid var(--mc-line)" }}
        >
          {processTrust.map((item) => (
            <motion.div
              key={item.k}
              variants={fade}
              className="flex flex-col gap-2 p-8 md:p-10"
              style={{ background: "var(--mc-paper)" }}
            >
              <span
                className="mc-serif text-[56px] font-light leading-none tracking-[-0.02em] md:text-[68px]"
                style={{ color: "var(--mc-ink)" }}
              >
                <Counter to={item.v} suffix={item.suffix} />
              </span>
              <span
                className="mc-sans mt-2 max-w-[180px] text-[12px] leading-snug"
                style={{ color: "var(--mc-ink-dim)" }}
              >
                {item.k}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={initial}
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
          variants={processContainer}
          className="story-conclusion relative mt-20 md:mt-28"
        >
          <div className="story-conclusion-card">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full blur-3xl"
              style={{ background: "radial-gradient(closest-side, rgba(184,137,58,0.22), transparent 70%)" }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full blur-3xl"
              style={{ background: "radial-gradient(closest-side, rgba(163,36,24,0.12), transparent 70%)" }}
            />

            <div className="relative grid items-end gap-12 px-8 py-14 md:grid-cols-12 md:px-14 md:py-20">
              <div className="md:col-span-7">
                <motion.div variants={fade}>
                  <span
                    className="mc-eyebrow inline-flex rounded-full px-4 py-2"
                    style={{
                      color: "var(--mc-gold-deep)",
                      background: "rgba(255,255,255,0.72)",
                      border: "1px solid rgba(184,137,58,0.22)",
                    }}
                  >
                    Op uitnodiging
                  </span>
                </motion.div>
                <motion.h3
                  variants={rise}
                  className="mc-serif mt-6 text-4xl font-semibold leading-[0.98] tracking-[-0.04em] md:text-6xl"
                  style={{ color: "var(--mc-ink)" }}
                >
                  We bedienen slechts een{" "}
                  <span className="italic" style={{ color: "var(--mc-gold-deep)" }}>
                    select
                  </span>{" "}
                  aantal huizen.
                  <br />
                  Het uwe kan daar deel van uitmaken.
                </motion.h3>
                <motion.p
                  variants={fade}
                  className="mc-sans mt-6 max-w-xl text-[14.5px] leading-relaxed"
                  style={{ color: "var(--mc-ink-dim)" }}
                >
                  U heeft onze werkwijze gezien — van herkomst tot levering. Nieuwe
                  samenwerkingen worden per kwartaal beoordeeld. Vraag discreet ons private
                  dossier aan met certificeringen, een atelierpresentatie en het actuele assortiment.
                </motion.p>
              </div>

              <motion.div variants={fade} className="md:col-span-5 md:justify-self-end">
                <a
                  href="#contact"
                  className="group/btn relative inline-flex items-center gap-5 overflow-hidden rounded-[20px] px-8 py-5 transition-[transform,box-shadow] duration-500 hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(180deg, #cf4334 0%, var(--mc-ember) 100%)",
                    color: "var(--mc-paper)",
                    border: "1px solid rgba(163,36,24,0.38)",
                    boxShadow: "0 24px 44px -18px rgba(163,36,24,0.4), 0 0 0 1px rgba(184,137,58,0.14)",
                  }}
                >
                  <span className="mc-sweep" />
                  <span className="mc-eyebrow">Vraag het dossier aan</span>
                  <span
                    aria-hidden
                    className="relative flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-500 group-hover/btn:translate-x-1"
                    style={{
                      background:
                        "radial-gradient(circle at 30% 30%, #e7c887, #b78a3c 60%, #6e4f1f 100%)",
                      boxShadow: "0 0 24px rgba(184,137,58,0.35), inset 0 1px 0 rgba(255,255,255,0.5)",
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="#0d0b08"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </a>
                <p
                  className="mc-sans mt-4 text-right text-[11px] uppercase tracking-[0.18em]"
                  style={{ color: "var(--mc-ink-dim)" }}
                >
                  Discreet, per correspondentie
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
