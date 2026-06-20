import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Award,
  Buildings,
  MagicStar,
  ShieldTick,
  TruckTick,
} from "iconsax-react";
import { useEffect, useRef, useState } from "react";
import { HeroCtaButton } from "@/components/home/HeroCtaButton";
import { HeroMeatScrollCue } from "@/components/home/HeroMeatScrollCue";
import { HeroShowcaseCard } from "@/components/home/HeroShowcaseCard";
import { DS_DURATION, DS_EASE } from "@/lib/design-system";
import {
  HERO_SHOWCASE_AUTOPLAY_MS,
  HERO_SHOWCASE_SLIDES,
  HERO_TRUST_ITEMS,
  IPEKCI_HERO_IMAGE,
} from "@/lib/home-hero-content";
import ipekciIntroVideo from "@/assets/videos/Ipekci_introductie.webm";

const TRUST_ICONS = [ShieldTick, Award, Buildings, TruckTick] as const;

export function HomeHeroSection() {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [heroPoster, setHeroPoster] = useState<string | null>(null);
  const [heroVideoActive, setHeroVideoActive] = useState(false);
  const [showcaseActive, setShowcaseActive] = useState(0);
  const [showcasePaused, setShowcasePaused] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
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
    if (reduceMotion || showcasePaused) return;
    const t = window.setInterval(() => {
      setShowcaseActive((i) => (i + 1) % HERO_SHOWCASE_SLIDES.length);
    }, HERO_SHOWCASE_AUTOPLAY_MS);
    return () => window.clearInterval(t);
  }, [reduceMotion, showcasePaused]);

  return (
    <section
      ref={heroRef}
      data-story-chapter="introduction"
      aria-label="Introductie"
      className="relative min-h-[100svh] w-full overflow-hidden bg-background grain lg:h-[100svh] lg:max-h-[100svh]"
    >
      <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
        <motion.img
          src={heroPoster ?? IPEKCI_HERO_IMAGE}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: "brightness(0.48) contrast(1.1) saturate(0.92)" }}
          initial={false}
          animate={{
            opacity: heroVideoActive ? 0 : 1,
            scale: heroVideoActive ? 1.02 : 1,
          }}
          transition={{ duration: 1.15, ease: DS_EASE }}
        />
        <motion.div
          className="absolute inset-0 overflow-hidden"
          initial={false}
          animate={{
            opacity: heroVideoActive ? 1 : 0,
            clipPath: heroVideoActive ? "inset(0% 0% 0% 0%)" : "inset(54% 0% 54% 0%)",
            filter: heroVideoActive ? "blur(0px)" : "blur(14px)",
          }}
          transition={{ duration: 1.6, ease: DS_EASE }}
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
            transition={{ duration: 1.85, ease: DS_EASE }}
            style={{ filter: "brightness(0.88) contrast(1.04) saturate(1.04)" }}
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-background/58 via-background/14 to-background/65" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/80 via-black/28 to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,6,6,0.94)_0%,rgba(6,6,6,0.58)_44%,rgba(6,6,6,0.14)_72%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(720px_480px_at_18%_8%,rgba(226,192,141,0.06)_0%,transparent_70%)]" />
      </motion.div>

      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative z-10 mx-auto flex h-[100svh] max-h-[100svh] min-h-0 max-w-[1380px] flex-col px-5 pb-4 pt-[8.5rem] sm:px-8 sm:pt-[9rem] lg:px-12 lg:pb-5 lg:pt-[10rem] xl:pt-[10.25rem]"
      >
        <div className="grid min-h-0 flex-1 items-center gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-10 xl:gap-12">
          <div className="relative z-20 min-w-0 lg:pr-4">
            <span
              className="pointer-events-none absolute -left-3 top-2 hidden h-24 w-px bg-gradient-to-b from-transparent via-[rgba(226,192,141,0.45)] to-transparent lg:block"
              aria-hidden
            />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.65 }}
              className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--gold-champagne)_32%,transparent)] bg-black/35 px-3.5 py-1.5 backdrop-blur-md"
            >
              <MagicStar size={12} variant="Bold" color="var(--gold-champagne)" />
              <p className="text-gradient-orange ipek-label text-[10px]">Premium halalvlees uit Nederland</p>
            </motion.div>

            <motion.h1 className="mt-3.5 font-display text-[clamp(2.15rem,4.6vw,3.75rem)] font-semibold leading-[0.99] tracking-[-0.04em] text-foreground">
              <motion.span
                initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: DS_DURATION.reveal, ease: DS_EASE }}
                className="block"
              >
                Groots in premium
              </motion.span>
              <motion.span
                initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.88, ease: DS_EASE }}
                className="mt-0.5 block bg-gradient-to-r from-[var(--gold-champagne)] via-[var(--gold-primary)] to-[var(--gold-champagne)] bg-clip-text italic text-transparent"
              >
                halalvlees
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.44, duration: 0.8 }}
              className="mt-3.5 max-w-[480px] text-[14px] leading-[1.68] text-foreground/64 sm:text-[15px]"
            >
              Ipekçi is een van de grootste halal-lammerenslachthuizen van Nederland. Sinds 2012
              leveren wij premium halal vlees aan slagerijen, groothandels, supermarkten en
              restaurants.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.64, duration: 0.8 }}
              className="relative z-30 mt-4 flex flex-wrap items-center gap-2 sm:gap-2.5"
            >
              <HeroCtaButton to="/ons-verhaal" variant="primary">
                Ontdek ons verhaal
              </HeroCtaButton>
              <HeroCtaButton to="/assortiment" variant="ghost">
                Bekijk assortiment
              </HeroCtaButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.76, duration: 0.75 }}
              className="mt-3.5 flex flex-wrap gap-1.5 sm:mt-4"
            >
              {HERO_TRUST_ITEMS.map((item, i) => {
                const Icon = TRUST_ICONS[i];
                return (
                  <div
                    key={item.title}
                    className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-black/30 px-2.5 py-1 backdrop-blur-sm"
                  >
                    <Icon size={12} variant="Linear" color="var(--gold-champagne)" />
                    <span className="text-[8px] font-semibold uppercase tracking-[0.1em] text-foreground/68">
                      {item.title}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </div>

          <div
            className="relative z-10 lg:justify-self-end lg:pl-2"
            onMouseEnter={() => setShowcasePaused(true)}
            onMouseLeave={() => setShowcasePaused(false)}
          >
            <HeroShowcaseCard
              active={showcaseActive}
              paused={showcasePaused}
              onSelect={setShowcaseActive}
              reduceMotion={reduceMotion}
            />
          </div>
        </div>

        <HeroMeatScrollCue />
      </motion.div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-20 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/35 to-transparent"
        aria-hidden
      />
    </section>
  );
}
