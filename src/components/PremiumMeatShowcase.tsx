import { memo, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, CalendarDays, Flame, Sparkles, UtensilsCrossed } from "lucide-react";
import cowImg from "@/assets/meat-cow-hero.jpg";
import ribeyeImg from "@/assets/meat-cut-ribeye.jpg";
import tenderloinImg from "@/assets/meat-cut-tenderloin.jpg";
import sirloinImg from "@/assets/meat-cut-sirloin.jpg";
import brisketImg from "@/assets/meat-cut-brisket.jpg";
import chuckImg from "@/assets/meat-cut-chuck.jpg";

type CutSpecIconKey = "tender" | "flavor" | "prep" | "fresh";
type Tier = "signature" | "standard";

type CutSpec = { icon: CutSpecIconKey; label: string; value: string };

type Cut = {
  id: string;
  label: string;
  name: string;
  description: string;
  image: string;
  x: number;
  y: number;
  tier: Tier;
  specs: CutSpec[];
};

const CUTS: Cut[] = [
  {
    id: "ribeye",
    label: "RIB EYE",
    name: "Rib Eye",
    description: "Mals, sappig en vol van smaak. Perfect voor grillen, bakken of slow cooking.",
    image: ribeyeImg,
    tier: "signature",
    x: 54,
    y: 51,
    specs: [
      { icon: "tender", label: "Malsheid", value: "Uitstekend" },
      { icon: "flavor", label: "Smaak", value: "Rijk & vol" },
      { icon: "prep", label: "Bereiding", value: "Grill, Pan, Oven" },
      { icon: "fresh", label: "Beschikbaarheid", value: "Altijd vers" },
    ],
  },
  {
    id: "sirloin",
    label: "SIRLOIN",
    name: "Sirloin",
    description: "Premium snede uit de rug. Mals, sappig en rijk aan smaak.",
    image: sirloinImg,
    tier: "signature",
    x: 29,
    y: 52,
    specs: [
      { icon: "tender", label: "Malsheid", value: "Uitstekend" },
      { icon: "flavor", label: "Smaak", value: "Verfijnd & vol" },
      { icon: "prep", label: "Bereiding", value: "Grill, Pan" },
      { icon: "fresh", label: "Beschikbaarheid", value: "Altijd vers" },
    ],
  },
  {
    id: "tenderloin",
    label: "OSSENHAAS",
    name: "Tenderloin",
    description: "De meest delicate snede. Botermals en perfect voor de fijne keuken.",
    image: tenderloinImg,
    tier: "signature",
    x: 42,
    y: 68,
    specs: [
      { icon: "tender", label: "Malsheid", value: "Botermals" },
      { icon: "flavor", label: "Smaak", value: "Verfijnd" },
      { icon: "prep", label: "Bereiding", value: "Pan, Oven" },
      { icon: "fresh", label: "Beschikbaarheid", value: "Altijd vers" },
    ],
  },
  {
    id: "chuck",
    label: "SCHOUDER",
    name: "Chuck",
    description: "Rijke smaak met mooie marmering. Uitstekend voor stoofgerechten en braadstuk.",
    image: chuckImg,
    tier: "standard",
    x: 65,
    y: 55,
    specs: [
      { icon: "tender", label: "Malsheid", value: "Goed" },
      { icon: "flavor", label: "Smaak", value: "Intens" },
      { icon: "prep", label: "Bereiding", value: "Slow, Oven" },
      { icon: "fresh", label: "Beschikbaarheid", value: "Altijd vers" },
    ],
  },
  {
    id: "brisket",
    label: "BORSTSTUK",
    name: "Brisket",
    description: "Robuust en smaakvol. De favoriet voor langzaam garen en authentieke gerechten.",
    image: brisketImg,
    tier: "standard",
    x: 63,
    y: 74,
    specs: [
      { icon: "tender", label: "Malsheid", value: "Slow cooked" },
      { icon: "flavor", label: "Smaak", value: "Diep & rokerig" },
      { icon: "prep", label: "Bereiding", value: "Slow, BBQ" },
      { icon: "fresh", label: "Beschikbaarheid", value: "Altijd vers" },
    ],
  },
];

function specIcon(k: CutSpecIconKey) {
  switch (k) {
    case "tender":
      return Sparkles;
    case "flavor":
      return Flame;
    case "prep":
      return UtensilsCrossed;
    default:
      return CalendarDays;
  }
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export const PremiumMeatShowcase = memo(function PremiumMeatShowcase() {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string>(CUTS[0]?.id ?? "ribeye");
  const active = useMemo(() => CUTS.find((c) => c.id === activeId) ?? CUTS[0], [activeId]);

  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-background py-20 grain sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_720px_at_45%_0%,rgba(226,192,141,0.10)_0%,transparent_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_620px_at_15%_55%,rgba(177,18,23,0.14)_0%,transparent_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_820px_at_60%_60%,rgba(0,0,0,0)_0%,rgba(0,0,0,0)_55%,rgba(0,0,0,0.82)_100%)]" />
      </div>

      <div className="relative mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[720px]"
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[rgba(177,18,23,0.70)]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#B11217]">
              Premium rund showcase
            </span>
          </div>
          <h2 className="mt-7 font-display text-[clamp(2.6rem,3.6vw,4.2rem)] font-medium leading-[1.02] tracking-[-0.03em] text-foreground">
            Ontdek onze{" "}
            <span className="italic text-[rgba(226,192,141,0.92)]">premium snijstukken</span>
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-[rgba(245,241,235,0.70)] sm:text-[15px]">
            Klik op een hotspot om details te zien over malsheid, smaak en ideale bereiding. Ontworpen als een
            luxe, interactieve ervaring — volledig native in het Ipekçi systeem.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-12 lg:items-stretch lg:gap-10">
          <motion.div
            initial={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[28px] border border-white/10 bg-black/40 shadow-[0_60px_160px_-120px_rgba(0,0,0,0.95)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_620px_at_30%_35%,rgba(255,255,255,0.08)_0%,transparent_62%)]" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(720px_520px_at_65%_50%,rgba(226,192,141,0.12)_0%,transparent_62%)]" />
              <img
                src={cowImg}
                alt="Premium rund visualisatie"
                className="absolute inset-0 h-full w-full object-cover opacity-95"
                loading="eager"
                decoding="async"
                width={1024}
                height={820}
              />

              <svg
                viewBox="0 0 100 80"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 h-full w-full"
              >
                <defs>
                  <pattern id="ipekciDots" width="0.9" height="0.9" patternUnits="userSpaceOnUse">
                    <circle cx="0.45" cy="0.45" r="0.07" fill="rgba(226,192,141,0.22)" />
                  </pattern>
                  <filter id="ipekciGoldGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="0.6" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {(() => {
                  const regions: Record<string, string> = {
                    sirloin:
                      "M 24 36 C 28 33.5, 32 33, 36 34 L 36 50 C 32 51, 26 51, 22 50 C 21 45, 22 40, 24 36 Z",
                    ribeye: "M 48 33.2 C 52 32.8, 56 33, 60 34.5 L 60 50 L 48 50 Z",
                    chuck: "M 60 34.5 C 64 36, 68 39, 70 43 C 70 48, 69 51, 68 53 L 60 50 Z",
                    tenderloin: "M 36 50 L 48 50 L 48 58 C 44 60, 38 59, 36 57 Z",
                    brisket: "M 56 56 C 60 55, 64 55, 68 55 L 69 63 C 65 65, 59 65, 56 63 Z",
                  };
                  return (
                    <g strokeLinejoin="round" strokeLinecap="round" style={{ mixBlendMode: "screen" }}>
                      {Object.entries(regions).map(([id, d]) => {
                        const isActive = id === activeId;
                        return (
                          <path
                            key={id}
                            d={d}
                            fill={isActive ? "rgba(226,192,141,0.16)" : "url(#ipekciDots)"}
                            stroke={isActive ? "rgba(226,192,141,0.92)" : "rgba(226,192,141,0.38)"}
                            strokeWidth={isActive ? 0.22 : 0.13}
                            filter={isActive ? "url(#ipekciGoldGlow)" : undefined}
                            style={{
                              transition: "stroke 420ms ease, stroke-width 420ms ease, fill 420ms ease",
                            }}
                          />
                        );
                      })}
                    </g>
                  );
                })()}
              </svg>

              {CUTS.map((c) => {
                const isActive = c.id === activeId;
                const isSignature = c.tier === "signature";
                const size = isSignature ? 18 : 14;
                const hit = isSignature ? 44 : 40;
                const ring = isSignature ? 34 : 28;

                return (
                  <button
                    key={c.id}
                    onClick={() => setActiveId(c.id)}
                    onPointerEnter={() => {
                      if (window.matchMedia?.("(hover: hover)").matches) setActiveId(c.id);
                    }}
                    aria-label={c.name}
                    style={{ left: `${c.x}%`, top: `${c.y}%` }}
                    className="group absolute -translate-x-1/2 -translate-y-1/2 rounded-full focus:outline-none"
                  >
                    <span className="sr-only">{c.label}</span>
                    <span
                      aria-hidden
                      style={{ width: hit, height: hit }}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    />
                    <span
                      aria-hidden
                      style={{ width: ring, height: ring }}
                      className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-500 ${
                        isActive
                          ? "border-[rgba(226,192,141,0.95)] opacity-100"
                          : "border-[rgba(226,192,141,0.40)] opacity-80 group-hover:opacity-100"
                      }`}
                    />
                    {isActive && !reduceMotion && (
                      <>
                        <span className="pointer-events-none absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(226,192,141,0.70)] animate-ping motion-reduce:animate-none" />
                        <span className="pointer-events-none absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(226,192,141,0.25)] animate-ping [animation-delay:280ms] motion-reduce:animate-none" />
                      </>
                    )}
                    <span
                      aria-hidden
                      style={{ width: size, height: size }}
                      className={`relative block rounded-full border transition-transform duration-300 ${
                        isSignature ? "border-[rgba(226,192,141,0.90)]" : "border-[rgba(226,192,141,0.70)]"
                      } ${
                        isActive
                          ? "scale-125 bg-[radial-gradient(circle_at_30%_30%,rgba(177,18,23,0.98),rgba(177,18,23,0.56)_60%,rgba(0,0,0,0.92))] shadow-[0_0_0_1px_rgba(226,192,141,0.30),0_0_34px_-10px_rgba(177,18,23,0.70)]"
                          : "bg-[radial-gradient(circle_at_30%_30%,rgba(177,18,23,0.70),rgba(177,18,23,0.36)_60%,rgba(0,0,0,0.92))] shadow-[0_0_0_1px_rgba(226,192,141,0.20),0_0_28px_-12px_rgba(177,18,23,0.55)] group-hover:scale-125"
                      }`}
                    >
                      <span className="pointer-events-none absolute left-[22%] top-[18%] h-[35%] w-[35%] rounded-full bg-white/55 blur-[1px]" />
                    </span>
                    <span
                      className={`pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-full border border-[rgba(226,192,141,0.26)] bg-black/75 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[rgba(226,192,141,0.92)] shadow-[0_20px_70px_-50px_rgba(0,0,0,0.9)] transition-all duration-300 ${
                        isActive
                          ? "translate-y-0 opacity-100"
                          : "-translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                      }`}
                    >
                      {c.label}
                    </span>
                    <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-transparent focus-visible:ring-[rgba(226,192,141,0.55)]" />
                  </button>
                );
              })}

              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.82))]" />
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-[0.34em] text-[rgba(226,192,141,0.78)]">
              <span className="hidden sm:inline">Hover of klik op een snijstuk</span>
              <span className="sm:hidden">Tik op een snijstuk</span>
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[rgba(177,18,23,0.80)]" />
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.95, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[color-mix(in_oklab,var(--background)_70%,transparent)] shadow-[0_80px_170px_-135px_rgba(0,0,0,0.95)] backdrop-blur-[18px]">
              <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(226,192,141,0.16),transparent_70%)] blur-2xl" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <div className="sm:hidden">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={active.image}
                        alt={active.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                        width={900}
                        height={700}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(520px_280px_at_25%_15%,rgba(226,192,141,0.14)_0%,transparent_62%)]" />
                    </div>
                    <div className="px-6 pt-6">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#B11217]">
                        {active.label}
                      </div>
                      <h3 className="mt-3 font-display text-[clamp(2.0rem,7vw,2.6rem)] font-medium leading-[1.05] tracking-[-0.03em] text-foreground">
                        {active.name}
                      </h3>
                      <p className="mt-4 text-sm leading-relaxed text-[rgba(245,241,235,0.72)]">
                        {active.description}
                      </p>
                    </div>
                  </div>

                  <div className="relative hidden min-h-[340px] sm:block">
                    <div className="absolute inset-y-0 right-0 w-[52%]">
                      <img
                        src={active.image}
                        alt={active.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                        width={900}
                        height={900}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/90 via-black/35 to-transparent" />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25" />
                      <div className="pointer-events-none absolute -left-10 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(177,18,23,0.22),transparent_70%)] blur-3xl" />
                    </div>

                    <div className="relative z-10 max-w-[56%] p-8 md:p-10">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#B11217]">
                        {active.label}
                      </div>
                      <h3 className="mt-4 font-display text-[clamp(2.2rem,2.6vw,3.0rem)] font-medium leading-[1.05] tracking-[-0.03em] text-foreground">
                        {active.name}
                      </h3>
                      <p className="mt-5 text-sm leading-relaxed text-[rgba(245,241,235,0.72)] md:text-[15px]">
                        {active.description}
                      </p>
                    </div>
                  </div>

                  <div className="mx-6 mt-7 h-px bg-gradient-to-r from-transparent via-[rgba(226,192,141,0.26)] to-transparent sm:mx-8 md:mx-10" />

                  <div className="grid grid-cols-2 gap-5 px-6 pt-7 sm:px-8 md:grid-cols-4 md:px-10">
                    {active.specs.map((s) => {
                      const Icon = specIcon(s.icon);
                      return (
                        <div key={`${active.id}-${s.label}`} className="text-center">
                          <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-[rgba(226,192,141,0.92)]">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/90">
                            {s.label}
                          </div>
                          <div className="mt-1 text-[11px] text-foreground/60">{s.value}</div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="px-6 pb-8 pt-8 sm:px-8 md:px-10 md:pb-10">
                    <a
                      href="/assortiment#rundvlees"
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-[rgba(226,192,141,0.35)] bg-transparent py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[rgba(226,192,141,0.92)] shadow-[0_0_0_1px_rgba(255,255,255,0.03)] transition-all duration-500 hover:border-[rgba(226,192,141,0.60)] hover:bg-white/[0.02] hover:shadow-[0_0_0_1px_rgba(226,192,141,0.18),0_0_58px_-24px_rgba(226,192,141,0.30)] active:translate-y-px"
                    >
                      Bekijk rundvlees assortiment
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {CUTS.map((c) => {
                const isActive = c.id === activeId;
                return (
                  <button
                    key={`quick-${c.id}`}
                    onClick={() => setActiveId(c.id)}
                    className={`group flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition-all duration-300 ${
                      isActive
                        ? "border-[rgba(226,192,141,0.40)] bg-white/[0.03] shadow-[0_26px_90px_-70px_rgba(0,0,0,0.9)]"
                        : "border-white/10 bg-black/30 hover:border-[rgba(226,192,141,0.24)] hover:bg-white/[0.02]"
                    }`}
                  >
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[rgba(226,192,141,0.80)]">
                        {c.label}
                      </div>
                      <div className="mt-1 text-xs font-semibold text-foreground/85">{c.name}</div>
                    </div>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.02] text-foreground/55 transition-colors group-hover:text-foreground/80">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{
                          backgroundColor: `rgba(177,18,23,${clamp(c.tier === "signature" ? 0.88 : 0.65, 0, 1)})`,
                          boxShadow: `0 0 0 1px rgba(226,192,141,0.22), 0 0 22px -10px rgba(177,18,23,0.7)`,
                        }}
                      />
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

