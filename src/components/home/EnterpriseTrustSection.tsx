import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Instagram } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { StoryItem, StoryReveal } from "@/components/HomeStorytelling";
import { ImageFrameOverlay } from "@/components/ui/premium-frame";
import { DS_EASE } from "@/lib/design-system";
import {
  ENTERPRISE_AUTOPLAY_MS,
  ENTERPRISE_TRUST_BADGES,
  ENTERPRISE_TRUST_PILLARS,
} from "@/lib/enterprise-trust-content";

function TrustImageStage({
  active,
  paused,
  reduceMotion,
}: {
  active: number;
  paused: boolean;
  reduceMotion: boolean | null;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [4, -4]), { stiffness: 120, damping: 24 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-5, 5]), { stiffness: 120, damping: 24 });
  const glareX = useTransform(px, [0, 1], ["8%", "92%"]);
  const glareY = useTransform(py, [0, 1], ["8%", "92%"]);
  const glare = useMotionTemplate`radial-gradient(520px 440px at ${glareX} ${glareY}, rgba(255,255,255,0.18), transparent 62%)`;

  const current = ENTERPRISE_TRUST_PILLARS[active];
  const ActiveIcon = current.icon;

  const handleMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reduceMotion) return;
      const rect = stageRef.current?.getBoundingClientRect();
      if (!rect) return;
      px.set((e.clientX - rect.left) / rect.width);
      py.set((e.clientY - rect.top) / rect.height);
    },
    [px, py, reduceMotion],
  );

  const reset = useCallback(() => {
    px.set(0.5);
    py.set(0.5);
  }, [px, py]);

  return (
    <motion.div
      ref={stageRef}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1600 }}
      className="group/if group relative aspect-[4/5] w-full overflow-hidden rounded-[28px] bg-[#080808] shadow-[0_56px_140px_-72px_rgba(0,0,0,0.72)] ring-1 ring-black/[0.06] sm:aspect-[5/4] lg:min-h-[620px] lg:aspect-auto"
    >
        <AnimatePresence mode="wait">
          <motion.img
            key={current.image}
            src={current.image}
            alt={current.title}
            loading="lazy"
            decoding="async"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{
              opacity: { duration: reduceMotion ? 0 : 0.7, ease: DS_EASE },
              scale: { duration: 10, ease: "easeOut" },
            }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/88 via-[#050505]/22 to-[#050505]/08" />
        <ImageFrameOverlay variant="aurora" className="rounded-[28px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_90%_at_50%_0%,rgba(226,192,141,0.12),transparent_58%)]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.45]"
          style={{
            backgroundImage:
              "linear-gradient(120deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)",
          }}
          aria-hidden
        />

        {!reduceMotion ? (
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            style={{ background: glare }}
            aria-hidden
          />
        ) : null}

        <div className="absolute left-6 right-6 top-6 flex items-center justify-between sm:left-8 sm:right-8 sm:top-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/30 px-3.5 py-1.5 backdrop-blur-md">
            <span className="font-display text-[11px] tabular-nums tracking-[0.22em] text-white/85">
              {String(active + 1).padStart(2, "0")}
            </span>
            <span className="h-3 w-px bg-white/20" aria-hidden />
            <span className="font-display text-[11px] tabular-nums tracking-[0.22em] text-white/40">
              {String(ENTERPRISE_TRUST_PILLARS.length).padStart(2, "0")}
            </span>
          </span>

          <div className="flex items-center gap-2" aria-hidden>
            {ENTERPRISE_TRUST_PILLARS.map((p, i) => (
              <span
                key={p.id}
                className={`rounded-full transition-all duration-500 ${
                  i === active
                    ? "h-[3px] w-8 bg-gradient-to-r from-[rgba(226,192,141,0.95)] to-[rgba(177,18,23,0.65)]"
                    : "h-[3px] w-[3px] bg-white/25"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="absolute inset-x-6 bottom-6 sm:inset-x-8 sm:bottom-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.42, ease: DS_EASE }}
              className="max-w-md"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[rgba(226,192,141,0.35)] bg-[rgba(226,192,141,0.12)] text-[rgba(226,192,141,0.95)] backdrop-blur-sm">
                  <ActiveIcon size={17} strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[rgba(226,192,141,0.9)]">
                    {current.kicker}
                  </p>
                  <p className="mt-1 font-display text-[1.65rem] font-medium leading-[1.05] tracking-[-0.03em] text-white sm:text-[1.85rem]">
                    {current.title}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {!reduceMotion && !paused ? (
            <motion.div
              key={`progress-${active}`}
              className="mt-5 h-[2px] max-w-[220px] overflow-hidden rounded-full bg-white/10"
              aria-hidden
            >
              <motion.span
                className="block h-full origin-left bg-gradient-to-r from-[rgba(226,192,141,0.95)] to-[rgba(177,18,23,0.8)]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: ENTERPRISE_AUTOPLAY_MS / 1000, ease: "linear" }}
              />
            </motion.div>
          ) : null}
        </div>
      </motion.div>
  );
}

function PillarCard({
  index,
  active,
  paused,
  reduceMotion,
  onSelect,
  isLast,
}: {
  index: number;
  active: number;
  paused: boolean;
  reduceMotion: boolean | null;
  onSelect: (i: number) => void;
  isLast: boolean;
}) {
  const pillar = ENTERPRISE_TRUST_PILLARS[index];
  const Icon = pillar.icon;
  const isActive = index === active;

  return (
    <li className="relative pl-9">
      <span
        aria-hidden
        className={`absolute left-[13px] top-0 w-px ${
          isLast ? "h-8" : "h-[calc(100%+0.75rem)]"
        } bg-gradient-to-b from-[rgba(200,164,107,0.28)] via-[rgba(200,164,107,0.12)] to-transparent`}
      />

      <motion.span
        aria-hidden
        className="absolute left-0 top-6 z-10 grid h-[27px] w-[27px] place-items-center rounded-full border bg-[#FAF8F5] shadow-[0_0_0_4px_rgba(250,248,245,1)]"
        animate={{
          borderColor: isActive ? "rgba(226,192,141,0.9)" : "rgba(0,0,0,0.07)",
          scale: isActive ? 1.06 : 1,
        }}
        transition={{ duration: 0.4, ease: DS_EASE }}
      >
        <span
          className={`rounded-full transition-all duration-500 ${
            isActive ? "h-2.5 w-2.5 bg-[#B31217]" : "h-2 w-2 bg-[rgba(200,164,107,0.42)]"
          }`}
        />
      </motion.span>

      <motion.button
        type="button"
        onClick={() => onSelect(index)}
        onMouseEnter={() => onSelect(index)}
        onFocus={() => onSelect(index)}
        aria-pressed={isActive}
        layout
        className="group relative w-full overflow-hidden text-left outline-none focus-visible:ring-2 focus-visible:ring-[rgba(200,164,107,0.45)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF8F5]"
        style={{ borderRadius: isActive ? "20px" : "16px" }}
        transition={{ layout: { duration: 0.42, ease: DS_EASE } }}
      >
        <span
          aria-hidden
          className={`pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 font-display text-[3.75rem] font-medium leading-none tracking-[-0.05em] transition-opacity duration-500 sm:text-[4.25rem] ${
            isActive ? "text-white/[0.05]" : "text-[#141414]/[0.035] group-hover:text-[#141414]/[0.06]"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {isActive ? (
          <>
            <motion.span
              layoutId="pillar-active-bg"
              className="absolute inset-0 rounded-[20px] bg-[#101010]"
              transition={{ type: "spring", stiffness: 340, damping: 36 }}
              aria-hidden
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[20px]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(226,192,141,0.12) 0%, transparent 48%, rgba(177,18,23,0.06) 100%)",
              }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(226,192,141,0.65)] to-transparent"
            />
          </>
        ) : (
          <span
            aria-hidden
            className="absolute inset-0 rounded-[16px] border border-black/[0.05] bg-white/70 transition-all duration-500 group-hover:border-[rgba(200,164,107,0.24)] group-hover:bg-white/92 group-hover:shadow-[0_18px_40px_-32px_rgba(0,0,0,0.18)]"
          />
        )}

        <span
          className={`relative flex items-start gap-3.5 transition-all duration-500 sm:gap-4 ${
            isActive ? "px-5 py-5 sm:px-6 sm:py-5" : "px-4 py-3.5 sm:px-5 sm:py-4"
          }`}
        >
          <span
            className={`relative grid shrink-0 place-items-center transition-all duration-500 ${
              isActive
                ? "h-11 w-11 rounded-[14px] border border-[rgba(226,192,141,0.32)] bg-[rgba(226,192,141,0.1)]"
                : "h-9 w-9 rounded-[12px] border border-black/[0.07] bg-white group-hover:border-[rgba(200,164,107,0.28)]"
            }`}
          >
            <Icon
              size={isActive ? 17 : 15}
              strokeWidth={1.75}
              className={`transition-colors duration-500 ${
                isActive ? "text-[rgba(226,192,141,0.95)]" : "text-[#141414]/38 group-hover:text-[#9A6B22]"
              }`}
            />
          </span>

          <span className="min-w-0 flex-1 pt-0.5">
            <span
              className={`text-[9px] font-semibold uppercase tracking-[0.22em] transition-colors duration-500 ${
                isActive ? "text-[rgba(226,192,141,0.78)]" : "text-[#141414]/32"
              }`}
            >
              {pillar.kicker}
            </span>
            <span
              className={`mt-1 block font-display font-medium leading-tight tracking-[-0.025em] transition-colors duration-500 ${
                isActive
                  ? "text-[1.15rem] text-white sm:text-[1.25rem]"
                  : "text-[0.98rem] text-[#141414]/52 group-hover:text-[#141414] sm:text-[1.02rem]"
              }`}
            >
              {pillar.title}
            </span>

            <AnimatePresence initial={false}>
              {isActive ? (
                <motion.span
                  initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                  transition={{ duration: 0.38, ease: DS_EASE }}
                  className="mt-2.5 block overflow-hidden text-[13px] leading-[1.72] text-white/55"
                >
                  {pillar.text}
                </motion.span>
              ) : null}
            </AnimatePresence>
          </span>

          <ArrowUpRight
            size={14}
            className={`mt-1 shrink-0 transition-all duration-500 ${
              isActive
                ? "translate-x-0 translate-y-0 text-[rgba(226,192,141,0.88)] opacity-100"
                : "translate-y-1 text-[#141414]/22 opacity-0 group-hover:translate-y-0 group-hover:opacity-60"
            }`}
          />
        </span>

        {isActive && !reduceMotion && !paused ? (
          <motion.span
            key={`pillar-progress-${active}-${paused}`}
            aria-hidden
            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[rgba(226,192,141,0.95)] via-[#B31217] to-transparent"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: ENTERPRISE_AUTOPLAY_MS / 1000, ease: "linear" }}
          />
        ) : null}
      </motion.button>
    </li>
  );
}

export function EnterpriseTrustSection() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduceMotion || paused) return;
    const t = window.setInterval(() => {
      setActive((i) => (i + 1) % ENTERPRISE_TRUST_PILLARS.length);
    }, ENTERPRISE_AUTOPLAY_MS);
    return () => window.clearInterval(t);
  }, [reduceMotion, paused]);

  return (
    <section
      aria-labelledby="enterprise-trust-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="story-section relative overflow-hidden bg-[#FAF8F5] px-6 py-24 text-[#111111] grain md:px-10 lg:px-[72px] lg:py-36"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-40 top-8 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(226,192,141,0.11),transparent_70%)]" />
        <div className="absolute -right-32 bottom-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(177,18,23,0.04),transparent_72%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(200,164,107,0.32)] to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[1440px]">
        <StoryReveal className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          <StoryItem className="lg:col-span-7">
            <div className="inline-flex items-center gap-3 rounded-full border border-[rgba(177,18,23,0.12)] bg-white/70 px-4 py-2 backdrop-blur-sm">
              <span className="h-2 w-2 rotate-45 bg-[#B31217]" aria-hidden />
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#9A6B22]">
                Waarom Ipekçi
              </span>
            </div>
            <h2
              id="enterprise-trust-heading"
              className="mt-7 font-display text-[clamp(2.35rem,4.5vw,3.85rem)] font-medium leading-[1.02] tracking-[-0.035em] text-[#141414]"
            >
              De betrouwbaarheid van een
              <span className="mt-1 block bg-gradient-to-r from-[#8B6914] via-[#C6A062] to-[#8B6914] bg-clip-text text-transparent">
                enterprise halalpartner.
              </span>
            </h2>
          </StoryItem>

          <StoryItem className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-[26px] border border-black/[0.06] bg-white/75 p-6 shadow-[0_28px_80px_-56px_rgba(0,0,0,0.28)] backdrop-blur-md lg:ml-auto lg:max-w-[400px]">
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(226,192,141,0.18),transparent_70%)]"
                aria-hidden
              />
              <p className="relative text-[15px] leading-[1.78] text-[#141414]/70">
                Van eigen slachterij tot gekoelde levering: elke schakel is gecertificeerd, herleidbaar
                en met vakmanschap beheerd.
              </p>
              <div className="relative mt-5 flex flex-wrap gap-2">
                {ENTERPRISE_TRUST_BADGES.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-2 rounded-full border border-[rgba(200,164,107,0.24)] bg-[#FAF8F5]/90 px-3.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#9A6B22]"
                  >
                    <span className="h-1 w-1 rounded-full bg-[#B31217]" />
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </StoryItem>
        </StoryReveal>

        <StoryReveal className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:items-start lg:gap-14">
          <StoryItem className="lg:col-span-7 lg:sticky lg:top-28">
            <TrustImageStage active={active} paused={paused} reduceMotion={reduceMotion} />
            <a
              href="https://www.instagram.com/ipekciharderwijk/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[#141414]/38 transition-colors hover:text-[#9A6B22]"
            >
              <Instagram size={13} strokeWidth={1.75} />
              Foto&apos;s via @ipekciharderwijk
              <ArrowUpRight size={12} />
            </a>
          </StoryItem>

          <StoryItem className="lg:col-span-5">
            <div className="flex h-full flex-col">
              <div className="mb-7 flex items-end justify-between gap-4 border-b border-black/[0.06] pb-5">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#141414]/38">
                    Zes pijlers van vertrouwen
                  </p>
                  <p className="mt-2 max-w-xs text-[13px] leading-[1.65] text-[#141414]/48">
                    Klik of hover om elk onderdeel van onze keten te ontdekken.
                  </p>
                </div>
                <span className="shrink-0 rounded-full border border-[rgba(200,164,107,0.22)] bg-white/70 px-3 py-1.5 font-display text-[11px] tabular-nums tracking-[0.18em] text-[#9A6B22]/75">
                  {String(active + 1).padStart(2, "0")} / {String(ENTERPRISE_TRUST_PILLARS.length).padStart(2, "0")}
                </span>
              </div>

              <ul className="flex flex-col gap-2.5">
                {ENTERPRISE_TRUST_PILLARS.map((_, i) => (
                  <PillarCard
                    key={ENTERPRISE_TRUST_PILLARS[i].id}
                    index={i}
                    active={active}
                    paused={paused}
                    reduceMotion={reduceMotion}
                    onSelect={setActive}
                    isLast={i === ENTERPRISE_TRUST_PILLARS.length - 1}
                  />
                ))}
              </ul>
            </div>
          </StoryItem>
        </StoryReveal>
      </div>
    </section>
  );
}
