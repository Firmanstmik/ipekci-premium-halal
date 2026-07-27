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
import { ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";
import { ImageFrameOverlay } from "@/components/ui/premium-frame";
import { ASSORTIMENT_MEGA_MENU } from "@/lib/assortiment-content";
import { DS_EASE, DS_EASE_REVEAL } from "@/lib/design-system";

const KLANT_IMAGE = ASSORTIMENT_MEGA_MENU.allProductsPreviewImage;

export function AssortimentKlantCta() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const decorY = useTransform(scrollYProgress, [0, 1], [40, -30]);

  const cardRotateY = useSpring(useTransform(mx, [0, 1], [-10, 10]), {
    stiffness: 160,
    damping: 26,
  });
  const cardRotateX = useSpring(useTransform(my, [0, 1], [7, -7]), {
    stiffness: 160,
    damping: 26,
  });
  const cardLift = useSpring(useTransform(my, [0, 1], [3, -3]), { stiffness: 180, damping: 28 });
  const glareX = useTransform(mx, (v) => `${v * 100}%`);
  const glareY = useTransform(my, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(380px 260px at ${glareX} ${glareY}, rgba(255,255,255,0.55) 0%, transparent 58%)`;

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }

  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#FAF8F5] ipek-section grain">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_0%_50%,rgba(226,192,141,0.14),transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_100%_20%,rgba(177,18,23,0.06),transparent_50%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(177,18,23,0.18)] to-transparent"
      />

      <motion.div
        style={{ y: reduceMotion ? 0 : decorY }}
        aria-hidden
        className="pointer-events-none absolute right-[8%] top-[18%] h-32 w-32 rounded-full border border-[rgba(226,192,141,0.35)] opacity-60"
      />
      <motion.div
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
        aria-hidden
        className="pointer-events-none absolute bottom-[12%] left-[6%] h-24 w-24 rounded-full border border-dashed border-[rgba(177,18,23,0.15)]"
      />

      <div className="relative ipek-container">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 1, ease: DS_EASE_REVEAL }}
            className="lg:col-span-7"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#B11217]">
              Ook klant worden?
            </p>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[0.98] tracking-[-0.04em] text-[#141414] md:text-5xl lg:text-[3.25rem]">
              Ayat Food Vleesgroothandel
            </h2>
            <p className="mt-6 max-w-xl text-base leading-[1.8] text-[#141414]/68 md:text-[17px]">
              Kies voor de zekerheid van een Halal vleesgroothandel die werkt volgens NVWA-normen en
              onder toezicht van ECC Halal. Snelle levering via ons moderne wagenpark en 24/7
              service.
            </p>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#141414]/50">
              Word klant van Ayat Food. Hoogwaardige Halal producten, op tijd geleverd aan uw
              bedrijf.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <MagneticButton href="/contact">
                Word klant bij Ayat Food
                <ArrowUpRight size={14} />
              </MagneticButton>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#141414]/50 transition-colors hover:text-[#B11217]"
              >
                Neem contact op
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, delay: 0.1, ease: DS_EASE_REVEAL }}
            className="flex justify-center lg:col-span-5 lg:justify-end"
            style={{ perspective: 1200 }}
          >
            <div
              ref={cardRef}
              onMouseMove={onMove}
              onMouseLeave={onLeave}
              className="group relative w-full max-w-[380px] sm:max-w-[400px]"
            >
              {/* Outer living frame */}
              <div className="relative rounded-[22px] bg-white p-3 shadow-[0_24px_60px_-28px_rgba(17,17,17,0.2)] ring-1 ring-[#141414]/6 transition-shadow duration-500 hover:shadow-[0_32px_70px_-24px_rgba(177,18,23,0.14)]">
                <motion.div
                  style={{
                    rotateX: reduceMotion ? 0 : cardRotateX,
                    rotateY: reduceMotion ? 0 : cardRotateY,
                    y: reduceMotion ? 0 : cardLift,
                    transformStyle: "preserve-3d",
                  }}
                  className="relative overflow-hidden rounded-[14px] bg-[#111]"
                >
                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={reduceMotion ? undefined : { background: glare }}
                  />

                  <div className="group/if relative aspect-[4/3] overflow-hidden">
                    <img
                      src={KLANT_IMAGE}
                      alt="Word klant bij Ayat Food"
                      className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/75 via-[#141414]/15 to-transparent" />
                    <ImageFrameOverlay variant="orbit" />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 z-10 p-5">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.26em] text-[rgba(226,192,141,0.92)]">
                      B2B partnership
                    </p>
                    <p className="mt-2 font-display text-xl leading-snug text-white">
                      Halal producten, op tijd geleverd
                    </p>
                    <a
                      href="/contact"
                      className="ipek-btn-wipe ipek-btn-wipe--light group mt-4 px-4 py-2 text-[10px] tracking-[0.16em]"
                    >
                      Klant worden
                      <ArrowUpRight
                        size={13}
                        className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                      />
                    </a>
                  </div>
                </motion.div>

                {/* Animated accent rail */}
                <motion.div
                  aria-hidden
                  animate={reduceMotion ? undefined : { x: ["-120%", "220%"] }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 1.2,
                  }}
                  className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(226,192,141,0.9)] to-transparent opacity-70"
                />
              </div>

              <div
                aria-hidden
                className="absolute -bottom-5 left-[12%] right-[12%] h-8 rounded-[50%] bg-[#141414]/10 blur-xl transition-all duration-500 group-hover:bg-[#141414]/16"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
