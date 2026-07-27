import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  AyatBrandSeal,
  AyatSectionBadge,
} from "@/components/home/AyatSectionBadge";
import { DS_EASE_REVEAL } from "@/lib/design-system";
import {
  HOME_OVER_ONS,
  type OverOnsFeature,
} from "@/lib/home-company-story-content";

const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;
const COUNT_EASE = [0.33, 1, 0.68, 1] as const;
const SHELL =
  "rounded-[1.35rem_0.75rem_1.5rem_0.9rem] sm:rounded-[1.65rem_0.9rem_1.85rem_1.05rem]";

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.85, delay: reduceMotion ? 0 : delay, ease: LUXURY_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Feature card — spec-sheet composition: numeral, icon, copy, hairline,
 * certification metadata and a footer action. Hovering it also lights up the
 * hero photo (see `onActivate`), so cards and image read as one system.
 */
function OverOnsFeatureCard({
  feature,
  delay,
  onActivate,
  onDeactivate,
}: {
  feature: OverOnsFeature;
  delay: number;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  return (
    <Reveal className="lg:col-span-5" delay={delay}>
      <article
        className={`over-ons-icon-card group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-black/[0.06] bg-[linear-gradient(165deg,#ffffff_0%,#faf8f5_100%)] p-6 shadow-[0_28px_70px_-48px_rgba(0,0,0,0.28)] sm:p-7 lg:min-h-[248px]`}
        onPointerEnter={onActivate}
        onPointerLeave={onDeactivate}
        onFocusCapture={onActivate}
        onBlurCapture={onDeactivate}
      >
        <div
          aria-hidden
          className="over-ons-icon-card__glow pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(179,18,23,0.08),transparent_70%)]"
        />
        <div
          aria-hidden
          className="over-ons-icon-card__edge pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(179,18,23,0.55),transparent)]"
        />
        <span
          aria-hidden
          className="absolute right-5 top-5 font-display text-[11px] font-semibold tabular-nums tracking-[0.22em] text-[#141414]/25 sm:right-6 sm:top-6"
        >
          {feature.index}
        </span>

        <div className="relative flex gap-5">
          <div className="over-ons-icon-card__tile flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-2xl border border-[rgba(179,18,23,0.12)] bg-[linear-gradient(145deg,rgba(179,18,23,0.06),rgba(255,255,255,0.9))] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
            <img
              src={feature.icon}
              alt=""
              aria-hidden
              loading="lazy"
              decoding="async"
              className="over-ons-icon-card__icon h-12 w-12 object-contain"
            />
          </div>
          <div className="min-w-0 pt-1">
            <h3 className="pr-9 font-display text-[1.35rem] font-semibold tracking-[-0.02em] text-[#141414]">
              {feature.title}
            </h3>
            <p className="mt-2.5 text-[13px] leading-[1.7] text-[#141414]/66">
              {feature.text}
            </p>
          </div>
        </div>

        <div
          aria-hidden
          className="over-ons-icon-card__rule relative mt-5 h-px w-full origin-left bg-[linear-gradient(90deg,rgba(179,18,23,0.34),rgba(20,20,20,0.08)_38%,transparent)]"
        />

        {(feature.certification || feature.meta) && (
          <ul className="relative mt-4 flex flex-wrap items-center gap-2">
            {feature.certification && (
              <li className="over-ons-chip over-ons-chip--cert inline-flex items-center gap-1.5 rounded-full border border-[rgba(179,18,23,0.22)] bg-white px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#B31217] shadow-[0_8px_20px_-16px_rgba(179,18,23,0.7)]">
                <AyatBrandSeal className="h-3 w-3 shrink-0" />
                {feature.certification}
              </li>
            )}
            {feature.meta?.map((item) => (
              <li
                key={item}
                className="over-ons-chip inline-flex items-center gap-1.5 rounded-full border border-black/[0.07] bg-white/70 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#141414]/55"
              >
                <span
                  aria-hidden
                  className="h-1 w-1 shrink-0 rounded-full bg-[#141414]/25"
                />
                {item}
              </li>
            ))}
          </ul>
        )}

        <div className="relative mt-auto flex items-end justify-between gap-4 pt-5">
          {feature.linkLabel && feature.linkTo ? (
            <Link
              to={feature.linkTo}
              className="over-ons-icon-card__link inline-flex items-center gap-1.5 text-[9.5px] font-semibold uppercase tracking-[0.22em] text-[#B31217]"
            >
              <span className="over-ons-icon-card__link-text relative">
                {feature.linkLabel}
              </span>
              <ArrowUpRight
                size={12}
                className="over-ons-icon-card__link-arrow shrink-0"
              />
            </Link>
          ) : (
            <span aria-hidden />
          )}
          {feature.certificationNote && (
            <span className="hidden max-w-[17ch] text-right text-[9px] leading-[1.5] text-[#141414]/35 sm:block">
              {feature.certificationNote}
            </span>
          )}
        </div>
      </article>
    </Reveal>
  );
}

/** Years-of-experience figure — counts up once, in view, motion permitting. */
function ExperienceCounter() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  /** Starts at the real value so SSR/no-JS render the fact, not a zero. */
  const count = useMotionValue(HOME_OVER_ONS.experience.numeric);
  const rounded = useTransform(count, (value) => Math.round(value).toString());

  /* Reset to zero on the client while the section is still far off-screen. */
  useEffect(() => {
    if (!reduceMotion) count.set(0);
  }, [count, reduceMotion]);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(count, HOME_OVER_ONS.experience.numeric, {
      duration: 1.4,
      delay: 0.3,
      ease: COUNT_EASE,
    });
    return () => controls.stop();
  }, [count, inView, reduceMotion]);

  return (
    <p
      ref={ref}
      className="mt-4 flex items-baseline font-display text-[3rem] font-semibold leading-none tracking-[-0.04em] sm:text-[3.25rem]"
    >
      <motion.span className="tabular-nums">{rounded}</motion.span>
      <span className="text-[#DA292A]">{HOME_OVER_ONS.experience.suffix}</span>
      <span className="sr-only"> {HOME_OVER_ONS.experience.label}</span>
    </p>
  );
}

export function HomeOverOnsSection() {
  const reduceMotion = useReducedMotion();
  const [levertijd, kwaliteit, halal] = HOME_OVER_ONS.features;

  /* Card → image link: the hovered/focused card is echoed inside the photo. */
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeFeature =
    activeId === kwaliteit.id ? kwaliteit : activeId === halal.id ? halal : null;

  /* Barely-there scroll parallax so the photo breathes with the page. */
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["0%", "0%"] : ["-2.4%", "2.4%"],
  );

  return (
    <section
      id="over-ons"
      data-story-chapter="heritage"
      aria-labelledby="story-heritage-heading"
      className="story-section story-section--editorial story-surface-light relative overflow-hidden px-6 grain lg:px-10"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-20 top-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(226,192,141,0.16),transparent_68%)]" />
        <div className="absolute right-0 top-1/4 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(179,18,23,0.07),transparent_72%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(200,164,107,0.35)] to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-[1320px]">
        {/* Editorial header */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <AyatSectionBadge
                kicker={HOME_OVER_ONS.kicker}
                title={HOME_OVER_ONS.badgeTitle}
              />
            </Reveal>
            <motion.h2
              id="story-heritage-heading"
              className="ipek-h2 mt-5 text-[#141414]"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 1.05, delay: 0.08, ease: LUXURY_EASE }}
            >
              {HOME_OVER_ONS.title}
            </motion.h2>
            {/* Gold rule draws itself under the heading — scaleX only.
                The wrapper carries the viewport trigger: a scaleX(0) element has
                zero area and would never intersect, so it would never animate. */}
            <motion.div
              aria-hidden
              className="mt-5"
              initial={reduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-70px" }}
            >
              <motion.div
                className="h-px w-24 origin-left bg-[linear-gradient(90deg,rgba(200,164,107,0.95),rgba(179,18,23,0.35),transparent)]"
                variants={{
                  hidden: { scaleX: 0, opacity: 0 },
                  visible: { scaleX: 1, opacity: 1 },
                }}
                transition={{ duration: 1.1, delay: 0.32, ease: LUXURY_EASE }}
              />
            </motion.div>
          </div>
          <Reveal className="lg:col-span-5" delay={0.18}>
            <p className="text-[15px] leading-[1.8] text-[#141414]/72 lg:text-right">
              {HOME_OVER_ONS.paragraphs[0]}
            </p>
          </Reveal>
        </div>

        {/* Premium bento theater */}
        <div className="mt-12 grid gap-4 sm:mt-14 sm:gap-5 lg:grid-cols-12 lg:grid-rows-[auto_auto] lg:gap-5">
          {/* Hero image — levertijd */}
          <Reveal className="lg:col-span-7 lg:row-span-2" delay={0.06}>
            <article
              ref={heroRef}
              data-linked={activeFeature ? "true" : "false"}
              className={`over-ons-hero group relative isolate flex h-full min-h-[340px] flex-col overflow-hidden bg-[#0a0a0a] shadow-[0_40px_100px_-48px_rgba(0,0,0,0.55)] sm:min-h-[420px] lg:min-h-[520px] ${SHELL}`}
            >
              {/* Media + cinematic grade */}
              <motion.div
                className="absolute inset-x-0 -top-[6%] h-[112%]"
                style={{
                  y: imageY,
                  willChange: reduceMotion ? undefined : "transform",
                }}
              >
                <img
                  src={levertijd.image}
                  alt={levertijd.imageAlt}
                  loading="lazy"
                  decoding="async"
                  className="over-ons-hero__img h-full w-full object-cover"
                />
              </motion.div>

              <div aria-hidden className="absolute inset-0">
                {/* Bottom-weighted scrim — protects the copy that sits there */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#040404]/96 via-[#050505]/42 to-[#050505]/10" />
                {/* Key light, matched to the photograph's own direction */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_58%_50%_at_18%_6%,rgba(255,241,222,0.13),transparent_62%)]" />
                {/* Brand wash */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_0%,rgba(179,18,23,0.16),transparent_55%)]" />
                {/* Vignette for depth */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_78%_72%_at_50%_46%,transparent_34%,rgba(0,0,0,0.44)_100%)]" />
                {/* Accent that answers the hovered card */}
                <motion.div
                  className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_78%_18%,rgba(179,18,23,0.3),transparent_62%)]"
                  initial={false}
                  animate={{ opacity: activeFeature ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: DS_EASE_REVEAL }}
                />
                {/* Hover lighting — opacity only, so it stays on the GPU */}
                <div className="over-ons-hero__lift absolute inset-0" />
                <div className="over-ons-hero__sheen absolute inset-0" />
                <div className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(226,192,141,0.32),transparent)]" />
              </div>

              <div className="relative flex flex-1 flex-col justify-between p-6 sm:p-8 lg:p-10">
                {/* Top rail — index + live status, which becomes the card echo */}
                <div className="flex items-start justify-between gap-4">
                  <span
                    aria-hidden
                    className="font-display text-[11px] font-semibold tabular-nums tracking-[0.24em] text-white/45"
                  >
                    {levertijd.index}
                  </span>
                  <AnimatePresence mode="wait" initial={false}>
                    {activeFeature ? (
                      <motion.span
                        key={activeFeature.id}
                        initial={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
                        transition={{ duration: 0.35, ease: DS_EASE_REVEAL }}
                        className="inline-flex items-center gap-2 rounded-full border border-[rgba(226,192,141,0.34)] bg-black/45 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-[rgba(240,226,202,0.95)] backdrop-blur-md"
                      >
                        <img
                          src={activeFeature.icon}
                          alt=""
                          aria-hidden
                          className="h-3.5 w-3.5 object-contain"
                        />
                        {activeFeature.certification}
                      </motion.span>
                    ) : (
                      <motion.span
                        key="default"
                        initial={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
                        transition={{ duration: 0.35, ease: DS_EASE_REVEAL }}
                        className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/35 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/75 backdrop-blur-md"
                      >
                        <span
                          aria-hidden
                          className="over-ons-hero__pulse h-1.5 w-1.5 rounded-full bg-[#DA292A]"
                        />
                        {levertijd.meta?.[0]}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                {/* Caption block — now the section's second-level anchor */}
                <div className="mt-10 max-w-lg">
                  <h3 className="font-display text-[1.65rem] font-semibold leading-[1.08] tracking-[-0.03em] text-white drop-shadow-[0_14px_36px_rgba(0,0,0,0.6)] sm:text-[2rem] lg:text-[2.3rem]">
                    {levertijd.title}
                  </h3>
                  <p className="mt-3.5 max-w-md text-[14px] leading-[1.75] text-white/76 sm:text-[15px]">
                    {levertijd.text}
                  </p>
                  <div
                    aria-hidden
                    className="over-ons-hero__rule mt-6 h-px w-14 origin-left bg-[linear-gradient(90deg,rgba(226,192,141,0.9),transparent)]"
                  />
                  <p className="mt-3.5 font-display text-[12.5px] italic leading-[1.6] text-[rgba(232,210,178,0.82)]">
                    {levertijd.caption}
                  </p>
                </div>
              </div>
            </article>
          </Reveal>

          <OverOnsFeatureCard
            feature={kwaliteit}
            delay={0.12}
            onActivate={() => setActiveId(kwaliteit.id)}
            onDeactivate={() => setActiveId(null)}
          />
          <OverOnsFeatureCard
            feature={halal}
            delay={0.18}
            onActivate={() => setActiveId(halal.id)}
            onDeactivate={() => setActiveId(null)}
          />
        </div>

        {/* Lower editorial panel */}
        <Reveal className="mt-5 sm:mt-6" delay={0.22}>
          <div className="grid gap-5 lg:grid-cols-12 lg:gap-5">
            {/* Story + customer promise */}
            <div className="over-ons-story relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-black/[0.06] bg-white/80 p-6 shadow-[0_24px_60px_-44px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:p-8 lg:col-span-7">
              <div
                aria-hidden
                className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(226,192,141,0.22),transparent_70%)]"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-8 right-4 font-display text-[8rem] leading-none text-[#B31217]/[0.055]"
              >
                &rdquo;
              </span>

              <div className="relative">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#141414]/45">
                  {HOME_OVER_ONS.storyKicker}
                </p>
                <div
                  aria-hidden
                  className="mt-3 h-px w-10 bg-[linear-gradient(90deg,rgba(200,164,107,0.9),transparent)]"
                />
                <p className="mt-5 text-[16px] leading-[1.75] text-[#141414]/78 sm:text-[17px]">
                  {HOME_OVER_ONS.paragraphs[1]}
                </p>
              </div>

              <div className="relative mt-auto border-t border-black/[0.06] pt-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#B31217]">
                  {HOME_OVER_ONS.customerTitle}
                </p>
                <p className="mt-3 max-w-lg font-display text-[1.35rem] leading-[1.45] tracking-[-0.02em] text-[#141414] sm:text-[1.5rem]">
                  {HOME_OVER_ONS.customerText}
                </p>
                <div className="mt-5 flex items-center gap-2.5">
                  <AyatBrandSeal className="h-3.5 w-3.5 shrink-0 text-[#B31217]" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#141414]/45">
                    {HOME_OVER_ONS.customerAttribution}
                  </span>
                </div>
              </div>
            </div>

            {/* Proof panel */}
            <div className="over-ons-proof relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-white/[0.06] bg-[linear-gradient(165deg,#141414_0%,#0a0a0a_55%,#1a0808_100%)] p-6 text-white shadow-[0_32px_80px_-40px_rgba(0,0,0,0.55)] sm:p-8 lg:col-span-5">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(179,18,23,0.24),transparent_70%)]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(226,192,141,0.42),transparent)]"
              />

              <div className="relative">
                <div className="flex items-start justify-between gap-6">
                  <img
                    src={HOME_OVER_ONS.experience.icon}
                    alt=""
                    aria-hidden
                    className="h-10 w-auto object-contain opacity-90 brightness-0 invert"
                    loading="lazy"
                    decoding="async"
                  />
                  <span
                    aria-hidden
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] border border-[rgba(226,192,141,0.24)] bg-white/[0.04]"
                  >
                    <AyatBrandSeal className="h-4 w-4 text-[rgba(226,192,141,0.72)]" />
                  </span>
                </div>

                <ExperienceCounter />
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
                  {HOME_OVER_ONS.experience.label}
                </p>
                <p className="mt-5 border-t border-white/[0.07] pt-5 text-[11px] leading-[1.65] text-white/48">
                  {HOME_OVER_ONS.experience.meta}
                </p>
              </div>

              <ul className="relative mt-auto grid gap-3 pt-7 sm:grid-cols-2">
                {HOME_OVER_ONS.checklist.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{
                      duration: 0.5,
                      delay: reduceMotion ? 0 : 0.28 + index * 0.06,
                      ease: DS_EASE_REVEAL,
                    }}
                    className="over-ons-check flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-[12px] font-medium tracking-[0.01em] text-white/88"
                  >
                    <span className="over-ons-check__mark grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#B31217] text-white">
                      <Check size={11} strokeWidth={2.5} />
                    </span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal className="mt-10 sm:mt-12" delay={0.3}>
          <div className="flex flex-col items-center">
            <div
              aria-hidden
              className="h-px w-[min(360px,62%)] bg-[linear-gradient(90deg,transparent,rgba(179,18,23,0.32),transparent)]"
            />
            <p className="mt-6 max-w-[42ch] text-center text-[13px] leading-[1.7] text-[#141414]/55">
              {HOME_OVER_ONS.ctaNote}
            </p>
            <Link
              to={HOME_OVER_ONS.ctaTo}
              className="ipek-btn-premium group mt-6 px-8 py-4 text-[12px] tracking-[0.22em] sm:px-10"
            >
              <span className="relative z-[1] inline-flex items-center gap-2.5">
                {HOME_OVER_ONS.ctaLabel}
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
