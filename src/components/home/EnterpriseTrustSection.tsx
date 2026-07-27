import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { AyatSectionBadge } from "@/components/home/AyatSectionBadge";
import { StoryItem, StoryReveal } from "@/components/HomeStorytelling";
import { ImageFrameOverlay } from "@/components/ui/premium-frame";
import { DS_EASE } from "@/lib/design-system";
import { ENTERPRISE_TRUST_COPY, ENTERPRISE_TRUST_PILLARS } from "@/lib/enterprise-trust-content";

const PILLAR_TRANSITION = { duration: 0.35, ease: DS_EASE } as const;

const SHELL = "rounded-[1.6rem_0.85rem_1.85rem_1rem] sm:rounded-[1.85rem_0.95rem_2.1rem_1.15rem]";

function TrustImageStage({
  active,
  reduceMotion,
}: {
  active: number;
  reduceMotion: boolean | null;
}) {
  const current = ENTERPRISE_TRUST_PILLARS[active];
  const ActiveIcon = current.icon;

  return (
    <div className="relative h-full min-h-[280px] lg:min-h-0">
      <div
        aria-hidden
        className={`pointer-events-none absolute -inset-[3px] border border-[rgba(179,18,23,0.1)] ${SHELL}`}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-4 top-6 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(179,18,23,0.16),transparent_70%)] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-3 bottom-8 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(226,192,141,0.2),transparent_72%)] blur-2xl"
      />

      <div
        className={`group/if absolute inset-0 isolate overflow-hidden bg-[#080808] shadow-[0_26px_64px_-36px_rgba(0,0,0,0.75)] ring-1 ring-black/[0.06] [contain:paint] ${SHELL}`}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={current.image}
            src={current.image}
            alt={current.title}
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={reduceMotion ? { duration: 0 } : PILLAR_TRANSITION}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/92 via-[#050505]/2 to-transparent" />
        <ImageFrameOverlay variant="halo" className={SHELL} />

        <div className="absolute inset-x-4 top-4 flex items-center justify-between sm:inset-x-5 sm:top-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/40 px-2.5 py-1 backdrop-blur-md">
            <span className="font-display text-[10px] tabular-nums tracking-[0.18em] text-white/90">
              {String(active + 1).padStart(2, "0")}
            </span>
            <span className="h-2.5 w-px bg-white/20" aria-hidden />
            <span className="font-display text-[10px] tabular-nums tracking-[0.18em] text-white/40">
              {String(ENTERPRISE_TRUST_PILLARS.length).padStart(2, "0")}
            </span>
          </span>
          <div className="flex items-center gap-1.5" aria-hidden>
            {ENTERPRISE_TRUST_PILLARS.map((p, i) => (
              <span
                key={p.id}
                className={`rounded-full transition-all duration-300 ${
                  i === active
                    ? "h-[2px] w-6 bg-gradient-to-r from-[rgba(226,192,141,0.95)] to-[rgba(177,18,23,0.7)]"
                    : "h-[2px] w-[2px] bg-white/25"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="absolute inset-x-4 bottom-4 sm:inset-x-5 sm:bottom-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={PILLAR_TRANSITION}
            >
              <div className="inline-flex max-w-full items-center gap-2.5 rounded-2xl border border-white/10 bg-black/35 px-3 py-2.5 backdrop-blur-md">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] border border-[rgba(226,192,141,0.35)] bg-[rgba(226,192,141,0.12)] text-[rgba(226,192,141,0.95)]">
                  <ActiveIcon size={14} strokeWidth={1.75} />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[8px] font-semibold uppercase tracking-[0.22em] text-[rgba(226,192,141,0.9)]">
                    {current.kicker}
                  </p>
                  <p className="truncate font-display text-[1.05rem] font-medium leading-tight tracking-[-0.02em] text-white sm:text-[1.15rem]">
                    {current.title}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function PillarCard({
  index,
  active,
  reduceMotion,
  onSelect,
  isLast,
}: {
  index: number;
  active: number;
  reduceMotion: boolean | null;
  onSelect: (i: number) => void;
  isLast: boolean;
}) {
  const pillar = ENTERPRISE_TRUST_PILLARS[index];
  const Icon = pillar.icon;
  const isActive = index === active;

  return (
    <li className="relative pl-7">
      <span
        aria-hidden
        className={`absolute left-[10px] top-0 w-px ${
          isLast ? "h-5" : "h-[calc(100%+0.35rem)]"
        } bg-gradient-to-b from-[rgba(200,164,107,0.3)] via-[rgba(200,164,107,0.12)] to-transparent`}
      />
      <span
        aria-hidden
        className="absolute left-0 top-[0.85rem] z-10 grid h-[21px] w-[21px] place-items-center rounded-full border bg-[#FAF8F5] shadow-[0_0_0_3px_#FAF8F5] transition-[border-color,transform] duration-300"
        style={{
          borderColor: isActive ? "rgba(179,18,23,0.85)" : "rgba(0,0,0,0.08)",
          transform: isActive ? "scale(1.06)" : "scale(1)",
        }}
      >
        <span
          className="rounded-full transition-all duration-300"
          style={{
            width: isActive ? 8 : 6,
            height: isActive ? 8 : 6,
            backgroundColor: isActive ? "#B31217" : "rgba(200,164,107,0.45)",
          }}
        />
      </span>

      <button
        type="button"
        onClick={() => onSelect(index)}
        aria-pressed={isActive}
        className={`pillar-card-btn group relative w-full overflow-hidden text-left outline-none transition-[border-radius] duration-300 focus-visible:ring-2 focus-visible:ring-[rgba(179,18,23,0.35)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF8F5] ${
          isActive ? "rounded-[15px]" : "rounded-[12px]"
        }`}
      >
        {isActive ? (
          <>
            <span className="pillar-card-active-bg absolute inset-0 rounded-[15px]" aria-hidden />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[15px] bg-[linear-gradient(135deg,rgba(255,255,255,0.14),transparent_45%,rgba(0,0,0,0.08))]"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent"
            />
          </>
        ) : (
          <span
            aria-hidden
            className="absolute inset-0 rounded-[12px] border border-black/[0.06] bg-white/70 transition-[border-color,background-color,box-shadow] duration-300 group-hover:border-[rgba(179,18,23,0.22)] group-hover:bg-white group-hover:shadow-[0_14px_28px_-24px_rgba(179,18,23,0.2)]"
          />
        )}

        <span
          className={`relative flex items-start gap-2.5 transition-[padding] duration-300 ${
            isActive ? "px-3.5 py-2.5 sm:px-4 sm:py-3" : "px-3 py-2 sm:px-3.5 sm:py-2.5"
          }`}
        >
          <span
            className={`relative grid shrink-0 place-items-center transition-all duration-300 ${
              isActive
                ? "h-8 w-8 rounded-[10px] border border-white/28 bg-white/15 text-white"
                : "h-7 w-7 rounded-[9px] border border-black/[0.1] bg-white text-[#141414]/75 group-hover:border-[rgba(179,18,23,0.28)] group-hover:text-[#B31217]"
            }`}
          >
            <Icon size={isActive ? 14 : 12} strokeWidth={1.75} />
          </span>

          <span className="min-w-0 flex-1 pt-px">
            <span
              className={`text-[8px] font-semibold uppercase tracking-[0.16em] ${
                isActive ? "text-white/90" : "text-[#B31217]"
              }`}
            >
              {pillar.kicker}
            </span>
            <span
              className={`mt-0.5 block font-display font-semibold leading-tight tracking-[-0.02em] ${
                isActive
                  ? "text-[0.95rem] text-white sm:text-[1.02rem]"
                  : "text-[0.88rem] text-[#141414] group-hover:text-[#0a0a0a]"
              }`}
            >
              {pillar.title}
            </span>
            <AnimatePresence initial={false}>
              {isActive ? (
                <motion.span
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={PILLAR_TRANSITION}
                  className="mt-1 block text-[11.5px] leading-[1.5] text-white/88"
                >
                  {pillar.text}
                </motion.span>
              ) : null}
            </AnimatePresence>
          </span>

          <ArrowUpRight
            size={12}
            className={`mt-0.5 shrink-0 transition-all duration-300 ${
              isActive
                ? "text-white opacity-100"
                : "text-[#141414]/25 opacity-0 group-hover:text-[#B31217] group-hover:opacity-80"
            }`}
          />
        </span>
      </button>
    </li>
  );
}

export function EnterpriseTrustSection() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  return (
    <section
      aria-labelledby="enterprise-trust-heading"
      className="story-section relative flex min-h-0 flex-col justify-center overflow-hidden bg-[#FAF8F5] py-12 text-[#111111] grain lg:min-h-[100svh] lg:py-12"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-32 top-4 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(226,192,141,0.14),transparent_70%)]" />
        <div className="absolute -right-24 bottom-0 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(179,18,23,0.07),transparent_72%)]" />
        <div className="absolute left-1/2 top-1/3 h-[420px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.55),transparent_68%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(200,164,107,0.32)] to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.28]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(200,164,107,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(200,164,107,0.045) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse 75% 65% at 50% 45%, #000 15%, transparent 72%)",
          }}
        />
      </div>

      <div className="relative w-full ipek-container">
        <StoryReveal>
          <StoryItem>
            <div className="relative flex items-start gap-4">
              <span
                aria-hidden
                className="mt-1.5 hidden h-16 w-px shrink-0 bg-gradient-to-b from-[rgba(179,18,23,0.7)] via-[rgba(200,164,107,0.45)] to-transparent sm:block"
              />
              <div className="min-w-0">
                <AyatSectionBadge
                  kicker={ENTERPRISE_TRUST_COPY.badgeKicker}
                  title={ENTERPRISE_TRUST_COPY.badgeTitle}
                />

                <h2
                  id="enterprise-trust-heading"
                  className="mt-3.5 max-w-2xl ipek-h2 text-[#141414]"
                >
                  {ENTERPRISE_TRUST_COPY.headingLine1}{" "}
                  <span className="ipek-heading-accent">{ENTERPRISE_TRUST_COPY.headingAccent}</span>
                </h2>
              </div>
            </div>
          </StoryItem>
        </StoryReveal>

        <StoryReveal className="mt-5 lg:mt-6">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-black/[0.06] bg-[linear-gradient(165deg,rgba(255,255,255,0.72)_0%,rgba(250,248,245,0.45)_100%)] p-3 shadow-[0_28px_70px_-48px_rgba(0,0,0,0.28)] sm:p-4 lg:rounded-[2rem] lg:p-5">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(179,18,23,0.28)] to-transparent"
            />

            <div className="grid gap-4 lg:grid-cols-12 lg:items-stretch lg:gap-6 xl:gap-8">
              <StoryItem className="h-full lg:col-span-6 xl:col-span-7">
                <TrustImageStage active={active} reduceMotion={reduceMotion} />
              </StoryItem>

              <StoryItem className="h-full lg:col-span-6 xl:col-span-5">
                <div className="flex h-full flex-col rounded-[1.25rem] border border-black/[0.05] bg-white/55 p-3 sm:p-3.5 lg:rounded-[1.4rem]">
                  <div className="mb-3 flex items-end justify-between gap-3 border-b border-black/[0.06] pb-3">
                    <div className="min-w-0">
                      <p className="font-display text-[1.05rem] font-semibold leading-tight tracking-[-0.03em] text-[#141414] sm:text-[1.12rem]">
                        {ENTERPRISE_TRUST_COPY.pillarsTitle}
                      </p>
                      <p className="mt-1 text-[12.5px] leading-[1.5] text-[#141414]/68 sm:text-[13px]">
                        {ENTERPRISE_TRUST_COPY.pillarsIntro}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full border border-[rgba(179,18,23,0.18)] bg-[#FAF8F5] px-2.5 py-1 font-display text-[10.5px] tabular-nums tracking-[0.12em] text-[#B31217]">
                      {String(active + 1).padStart(2, "0")} /{" "}
                      {String(ENTERPRISE_TRUST_PILLARS.length).padStart(2, "0")}
                    </span>
                  </div>

                  <ul className="flex flex-col gap-1">
                    {ENTERPRISE_TRUST_PILLARS.map((_, i) => (
                      <PillarCard
                        key={ENTERPRISE_TRUST_PILLARS[i].id}
                        index={i}
                        active={active}
                        reduceMotion={reduceMotion}
                        onSelect={setActive}
                        isLast={i === ENTERPRISE_TRUST_PILLARS.length - 1}
                      />
                    ))}
                  </ul>
                </div>
              </StoryItem>
            </div>
          </div>
        </StoryReveal>
      </div>
    </section>
  );
}
