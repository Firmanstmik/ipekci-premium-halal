import { motion, useReducedMotion } from "framer-motion";
import { Award, Clock, Headphones, Mail, Search, ShieldCheck, Truck } from "lucide-react";
import { AyatSectionBadge } from "@/components/home/AyatSectionBadge";
import { ONS_VERHAAL_WORKFLOW } from "@/lib/ons-verhaal-content";
import { DS_EASE, DS_EASE_REVEAL } from "@/lib/design-system";

const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;
const STEP_ICONS = [Search, Mail, Truck, ShieldCheck] as const;
const TRUST_ICONS = [ShieldCheck, Award, Clock, Headphones] as const;

function WorkflowStepAppCard({
  step,
  index,
}: {
  step: (typeof ONS_VERHAAL_WORKFLOW.steps)[number];
  index: number;
}) {
  const StepIcon = STEP_ICONS[index] ?? Search;

  return (
    <li className="ons-workflow-app__step">
      <span className="ons-workflow-app__step-num" aria-hidden>
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="ons-workflow-app__step-icon" aria-hidden>
        <StepIcon size={18} strokeWidth={1.65} />
      </span>
      <p className="ons-workflow-app__step-label">{step.n}</p>
      <h3 className="ons-workflow-app__step-title">{step.title}</h3>
      <p className="ons-workflow-app__step-text">{step.text}</p>
      <div className="ons-workflow-app__step-img">
        <img src={step.image} alt="" aria-hidden loading="lazy" decoding="async" />
      </div>
    </li>
  );
}

function WorkflowTrustAppItem({
  item,
  index,
}: {
  item: (typeof ONS_VERHAAL_WORKFLOW.trust.items)[number];
  index: number;
}) {
  const Icon = TRUST_ICONS[index] ?? ShieldCheck;

  return (
    <li className="ons-workflow-app__trust-item">
      <span className="ons-workflow-app__trust-icon" aria-hidden>
        <Icon size={16} strokeWidth={1.5} />
      </span>
      <p className="ons-workflow-app__trust-title">{item.title}</p>
      <p className="ons-workflow-app__trust-text">{item.description}</p>
    </li>
  );
}

export function OnsVerhaalWorkflowSection() {
  const reduceMotion = useReducedMotion();
  const { steps, trust, heroImage, lede } = ONS_VERHAAL_WORKFLOW;

  return (
    <section
      aria-labelledby="ons-verhaal-workflow-heading"
      className="ons-verhaal-workflow relative isolate overflow-hidden bg-[#FDFBF7]"
    >
      {/* ── Mobile luxury app ── */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8%" }}
        transition={{ duration: 0.95, ease: DS_EASE_REVEAL }}
        className="ons-workflow-app ipek-container relative z-10 py-14 lg:hidden"
      >
        <div className="ons-workflow-app__sheet">
          <AyatSectionBadge kicker={ONS_VERHAAL_WORKFLOW.eyebrow} title="Ayat Food" />

          <h2
            id="ons-verhaal-workflow-heading"
            className="ons-workflow-app__title mt-5 font-display font-semibold leading-[1.05] tracking-[-0.03em] text-[#141414]"
          >
            {ONS_VERHAAL_WORKFLOW.title}
          </h2>

          <p className="ons-workflow-app__lede mt-4">{lede}</p>
        </div>

        <div className="ons-workflow-app__hero">
          <img
            src={heroImage}
            alt="Ayat Food — bestelproces"
            loading="lazy"
            decoding="async"
            className="ons-workflow-app__hero-img"
          />
          <div className="ons-workflow-app__hero-scrim" aria-hidden />
        </div>

        <ul className="ons-workflow-app__steps" aria-label="Bestel stappen">
          {steps.map((step, i) => (
            <WorkflowStepAppCard key={step.n} step={step} index={i} />
          ))}
        </ul>

        <div className="ons-workflow-app__trust">
          <div className="ons-workflow-app__trust-head">
            <span className="ons-workflow-app__trust-badge" aria-hidden>
              <ShieldCheck size={20} strokeWidth={1.5} />
            </span>
            <div className="min-w-0">
              <p className="ons-workflow-app__trust-heading">{trust.title}</p>
              <p className="ons-workflow-app__trust-lede">{trust.description}</p>
            </div>
          </div>

          <ul className="ons-workflow-app__trust-items" aria-label="Kwaliteitsgaranties">
            {trust.items.map((item, i) => (
              <WorkflowTrustAppItem key={item.id} item={item} index={i} />
            ))}
          </ul>
        </div>
      </motion.div>

      {/* ── Desktop cinematic ── */}
      <div className="relative hidden lg:block">
        <div className="relative">
          <motion.div
            aria-hidden
            initial={reduceMotion ? false : { opacity: 0, scale: 1.02 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 1.15, ease: DS_EASE_REVEAL }}
            className="pointer-events-none absolute inset-x-0 top-0 z-0 h-full min-h-[680px] sm:min-h-[740px] lg:min-h-[780px]"
          >
            <div className="absolute inset-y-0 left-0 right-[calc(50%-50vw)] sm:left-[4%] lg:left-[30%] xl:left-[32%]">
              <img
                src={heroImage}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-[center_38%]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,#FDFBF7_0%,rgba(253,251,247,0.94)_14%,rgba(253,251,247,0.55)_30%,rgba(253,251,247,0.12)_48%,transparent_65%)]" />
              <div className="absolute inset-x-0 bottom-0 h-[55%] bg-[linear-gradient(to_top,#FDFBF7_0%,#FDFBF7_18%,rgba(253,251,247,0.98)_32%,rgba(255,255,255,0.75)_48%,rgba(255,255,255,0.25)_62%,transparent_82%)]" />
              <div className="absolute inset-x-0 bottom-[22%] h-28 bg-[radial-gradient(ellipse_90%_100%_at_50%_100%,rgba(255,255,255,0.92),transparent_70%)] blur-[2px]" />
            </div>
          </motion.div>

          <span
            aria-hidden
            className="pointer-events-none absolute right-[6%] top-[18%] z-[1] hidden select-none font-display text-[clamp(7rem,16vw,11.5rem)] font-semibold leading-none tracking-[-0.06em] text-[#141414]/[0.035] lg:block xl:right-[10%]"
          >
            03
          </span>

          <div className="ipek-container relative z-10 pt-14 sm:pt-20 lg:pt-24">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 1, ease: DS_EASE_REVEAL }}
              className="max-w-xl lg:max-w-md xl:max-w-lg"
            >
              <AyatSectionBadge kicker={ONS_VERHAAL_WORKFLOW.eyebrow} title="Ayat Food" />

              <h2 className="mt-7 font-display text-[clamp(2.4rem,4.8vw,3.55rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-[#141414]">
                {ONS_VERHAAL_WORKFLOW.title}
              </h2>

              <p className="mt-5 max-w-md text-[14px] leading-[1.85] text-[#141414]/58 sm:text-[15px]">{lede}</p>
            </motion.div>

            <div aria-hidden className="ons-workflow__spacer h-[240px] sm:h-[260px] lg:h-[280px]" />
          </div>

          <div className="ons-workflow__cards-wrap ipek-container relative z-20 -mt-[240px] sm:-mt-[260px] lg:-mt-[280px]">
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[46px] hidden lg:block"
              >
                <motion.div
                  initial={reduceMotion ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-6%" }}
                  transition={{ duration: 1.2, delay: 0.15, ease: DS_EASE }}
                  className="h-px origin-left bg-[rgba(198,160,98,0.45)]"
                />
                {[1, 2, 3].map((node) => (
                  <span
                    key={node}
                    className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(198,160,98,0.65)] bg-white"
                    style={{ left: `${node * 25}%` }}
                  />
                ))}
              </div>

              <div className="ons-workflow__steps grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4 xl:gap-5">
                {steps.map((step, i) => {
                  const StepIcon = STEP_ICONS[i] ?? Search;
                  return (
                    <motion.article
                      key={step.n}
                      initial={reduceMotion ? false : { opacity: 0, y: 36 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-6%" }}
                      transition={{ duration: 0.85, delay: i * 0.08, ease: DS_EASE_REVEAL }}
                      className="group relative flex min-h-[340px] flex-col overflow-hidden rounded-2xl border border-white/80 bg-white shadow-[0_24px_64px_-20px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_36px_88px_-22px_rgba(0,0,0,0.22)] sm:min-h-[360px] lg:min-h-[380px]"
                    >
                      <span
                        aria-hidden
                        className="pointer-events-none absolute right-3 top-1 font-display text-[clamp(3.25rem,7vw,4.5rem)] font-semibold leading-none tracking-[-0.05em] text-[#141414]/[0.05]"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <div className="relative flex-1 px-6 pb-3 pt-6 sm:px-7 sm:pt-7">
                        <span className="relative z-10 grid h-11 w-11 place-items-center rounded-full bg-[#8B1A1A] text-white shadow-[0_8px_22px_-8px_rgba(139,26,26,0.55)]">
                          <StepIcon size={18} strokeWidth={1.65} />
                        </span>

                        <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#B8955E]">
                          {step.n}
                        </p>
                        <h3 className="mt-2 font-display text-[1.2rem] font-semibold leading-tight text-[#141414] sm:text-[1.28rem]">
                          {step.title}
                        </h3>
                        <span
                          aria-hidden
                          className="mt-2.5 block h-0.5 w-8 rounded-full bg-[rgba(179,18,23,0.55)]"
                        />
                        <p className="mt-2.5 text-[13px] leading-[1.7] text-[#141414]/55 sm:text-[14px]">{step.text}</p>
                      </div>

                      <div className="relative mt-auto flex h-[128px] items-end justify-center overflow-hidden bg-[#FAFAF8] px-4 pb-0 pt-2 sm:h-[140px]">
                        <img
                          src={step.image}
                          alt=""
                          aria-hidden
                          loading="lazy"
                          decoding="async"
                          className="max-h-full w-auto max-w-full object-contain object-bottom transition-transform duration-[1s] ease-[cubic-bezier(.22,.61,.36,1)] group-hover:scale-[1.03]"
                        />
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 bg-[#FDFBF7] pt-10 sm:pt-12 lg:pt-14 pb-14 sm:pb-20 lg:pb-24">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-transparent to-[#FDFBF7]" aria-hidden />
          <div className="ipek-container">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6%" }}
              transition={{ duration: 0.9, delay: 0.08, ease: LUXURY_EASE }}
              className="rounded-2xl border border-black/[0.05] bg-[#F0EDE8] p-5 sm:p-6 lg:flex lg:items-center lg:gap-8 lg:p-7"
            >
              <div className="flex shrink-0 items-start gap-4 lg:max-w-[280px] xl:max-w-[320px]">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-[rgba(198,160,98,0.32)] bg-white text-[#B8955E]">
                  <ShieldCheck size={22} strokeWidth={1.5} />
                </span>
                <div className="min-w-0">
                  <p className="font-display text-[1.05rem] font-semibold leading-snug text-[#141414] sm:text-lg">
                    {trust.title}
                  </p>
                  <p className="mt-1 text-[12px] leading-relaxed text-[#141414]/50 sm:text-[13px]">
                    {trust.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-4 lg:mt-0 lg:flex-1 lg:gap-0">
                {trust.items.map((item, i) => {
                  const Icon = TRUST_ICONS[i] ?? ShieldCheck;
                  return (
                    <div
                      key={item.id}
                      className={`flex min-w-0 flex-col px-0 sm:px-2 lg:px-4 xl:px-5 ${
                        i > 0 ? "lg:border-l lg:border-black/[0.06]" : ""
                      }`}
                    >
                      <span className="grid h-8 w-8 place-items-center text-[#141414]/70">
                        <Icon size={18} strokeWidth={1.5} />
                      </span>
                      <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#141414]/85">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-[11px] leading-snug text-[#141414]/48">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
