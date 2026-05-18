import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { SectionHeader } from "@/components/SectionHeader";
import { MagneticButton } from "@/components/MagneticButton";

const heroImage =
  "https://www.ipekcislachterij.nl/wp-content/uploads/2025/12/Ook-klant-worden.webp";

const ONS_VERHAAL_MODE: "develop" | "live" = "develop";

export const Route = createFileRoute("/ons-verhaal")({
  head: () => ({
    meta: [
      { title: "Ons verhaal — Ipekçi Slachterij" },
      {
        name: "description",
        content:
          "Ipekçi is een familiebedrijf in Harderwijk. Sinds 2012 leveren wij premium Nederlands halalvlees en eindproducten aan B2B-klanten.",
      },
      { property: "og:title", content: "Ons verhaal — Ipekçi Slachterij" },
      { property: "og:image", content: heroImage },
    ],
  }),
  component: AboutPage,
});

function OnsVerhaalDevelopPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <SiteLayout>
      <section className="relative overflow-hidden border-b border-white/5 bg-[#050505] px-6 pb-24 pt-36 text-white grain lg:px-10 lg:pb-32 lg:pt-44">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(1100px_760px_at_20%_25%,rgba(179,18,23,0.24)_0%,transparent_58%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(1000px_720px_at_78%_18%,rgba(198,160,98,0.14)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(900px_620px_at_50%_70%,rgba(255,255,255,0.08)_0%,transparent_62%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.52)_26%,rgba(0,0,0,0.88)_100%)]" />
          <div className="absolute left-0 right-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(198,160,98,0.45),transparent)]" />
        </div>

        <div className="relative mx-auto max-w-[1180px]">
          <motion.div
            initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-[860px] text-center"
          >
            <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#B31217]">
              Ons verhaal
            </div>
            <h1 className="mt-7 font-display text-[clamp(2.4rem,4.2vw,3.8rem)] font-medium leading-[1.02] tracking-[-0.03em] text-[#F5F2ED]">
              Sedang dikembangkan
            </h1>

            <div className="relative mx-auto mt-8 h-px w-[240px] bg-[rgba(198,160,98,0.55)]">
              <div className="absolute left-1/2 top-1/2 grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center bg-[#050505]">
                <div className="h-2 w-2 rotate-45 bg-[#B31217]" />
              </div>
            </div>

            <p className="mx-auto mt-9 max-w-[720px] text-sm leading-relaxed text-[#B9B9B9] sm:text-base">
              Halaman ini sedang kami siapkan dengan tampilan yang lebih interaktif dan premium. Untuk sementara,
              kamu bisa tinggalkan email untuk mendapatkan update saat fitur ini aktif.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
            className="mx-auto mt-12 max-w-[860px] overflow-hidden rounded-[26px] border border-[rgba(198,160,98,0.20)] bg-white/[0.02] shadow-[0_50px_170px_-140px_rgba(0,0,0,0.98)]"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_540px_at_35%_20%,rgba(255,255,255,0.10)_0%,transparent_62%)]" />
            <div className="relative grid gap-10 p-8 md:grid-cols-[1.05fr_0.95fr] md:gap-8 md:p-10">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/55">
                  Status
                </div>
                <div className="mt-4 grid gap-3">
                  {[
                    { label: "UI Premium", value: "In progress" },
                    { label: "Konten & Story", value: "In progress" },
                    { label: "Interaksi", value: "Queued" },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between rounded-xl border border-white/5 bg-black/20 px-4 py-3"
                    >
                      <div className="text-[13px] text-[#F5F2ED]/90">{row.label}</div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C6A062]">
                        {row.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="min-w-0">
                <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/55">
                  Notifikasi
                </div>

                <form
                  className="mt-4 space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!email.trim()) return;
                    setSubmitted(true);
                  }}
                >
                  <div className="relative">
                    <input
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setSubmitted(false);
                      }}
                      placeholder="Email kamu"
                      className="h-12 w-full rounded-xl border border-white/10 bg-black/25 px-4 text-[14px] text-[#F5F2ED] placeholder:text-white/35 focus-visible:outline-none focus-visible:ring-0"
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#B31217]" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="group inline-flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#B31217] text-[11px] font-semibold uppercase tracking-[0.24em] text-[#F5F2ED] shadow-[0_20px_70px_-50px_rgba(179,18,23,0.85)] transition-all duration-500 hover:bg-[#C0181D] active:translate-y-px"
                  >
                    Notify me
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </button>

                  <div className="min-h-[20px] text-center text-[12px] text-[#C6A062]">
                    {submitted ? "Tercatat. Kami kabari saat sudah live." : ""}
                  </div>
                </form>

                <div className="mt-2 flex items-center justify-center gap-2 text-[12px] text-white/50">
                  <a href="/" className="underline underline-offset-4 hover:text-white">
                    Kembali ke home
                  </a>
                  <span className="text-white/25">•</span>
                  <a href="/assortiment" className="underline underline-offset-4 hover:text-white">
                    Lihat assortiment
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </SiteLayout>
  );
}

const highlights = [
  { k: ">40 jaar ervaring", v: "Generaties kennis en betrokkenheid binnen de halalvleessector." },
  { k: "100% halal", v: "Officiële NVWA-erkenning voor onbedwelmd slachten." },
  { k: "Wekelijks verse slacht", v: "Verse slacht in ons eigen halalslachthuis." },
  { k: "Premium kwaliteit", v: "Nederlandse kwaliteit met focus op zorg, respect en vakmanschap." },
  { k: "Halalrundvlees", v: "Naast lamsvlees ook wekelijks halalrundvlees beschikbaar." },
  { k: "Persoonlijke service", v: "Korte lijnen, direct contact en levering binnen 24 uur." },
  { k: ">20 eigen wagens", v: "Eigen koeltransport met vaste routes door heel Nederland." },
  { k: "Eindproducten", v: "Eindproducten gemaakt van ons eigen halalvlees." },
] as const;

const steps = [
  {
    n: "Stap 1",
    title: "Het halalslachtproces",
    text: "Controle op gezondheid en welzijn, slacht door gecertificeerde medewerkers, keuring door de NVWA en weging.",
  },
  {
    n: "Stap 2",
    title: "Voorbereiding op de bestelling",
    text: "Na koeling versnijden we karkassen of bereiden we eindproducten op maat voor levering.",
  },
  {
    n: "Stap 3",
    title: "Eigen transport",
    text: "Gekoelde levering met eigen chauffeurs en vaste routes, afgestemd op uw wensen en afspraken.",
  },
] as const;

function AboutPage() {
  if (ONS_VERHAAL_MODE === "develop") return <OnsVerhaalDevelopPage />;
  return <OnsVerhaalLivePage />;
}

function OnsVerhaalLivePage() {
  return (
    <SiteLayout>
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          src={heroImage}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: "brightness(0.58) contrast(1.08) saturate(1.04)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/35 to-background" />
        <div className="relative mx-auto flex h-full max-w-[1480px] flex-col justify-end px-6 pb-20 lg:px-10 lg:pb-28">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary"
          >
            Ons verhaal — Sinds 2012
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-5xl font-display text-5xl text-foreground md:text-7xl lg:text-8xl text-balance"
          >
            Een familiebedrijf met een{" "}
            <span className="text-gradient-orange">premium halal</span> standaard.
          </motion.h1>
        </div>
      </section>

      <section className="bg-background px-6 py-32 lg:px-10 lg:py-40">
        <div className="mx-auto max-w-[1480px]">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <SectionHeader
                eyebrow="Ipekçi Slachterij Harderwijk"
                title="Groots in premium halalvlees."
                description="Sinds 2012 leveren wij premium Nederlands lamsvlees, rundvlees en eindproducten aan slagerijen, groothandels, supermarkten en restaurants."
              />
            </div>
            <div className="lg:col-span-6">
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-2xl text-sm leading-relaxed text-muted-foreground lg:ml-auto"
              >
                Ipekçi is een echt familiebedrijf, gebouwd op generaties kennis en betrokkenheid binnen de
                halalvleessector. We werken volgens islamitische richtlijnen en leveren met dezelfde
                toewijding waarmee dit vak is begonnen: persoonlijke aandacht, korte lijnen en consistente
                kwaliteit.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-surface px-6 py-32 lg:px-10">
        <div className="mx-auto max-w-[1480px]">
          <SectionHeader
            eyebrow="Kernpunten"
            title="Een premium standaard in elke stap."
            description="Van slacht tot levering: focus op halal, kwaliteit en service."
          />
          <div className="mt-20 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {highlights.map((h, i) => (
              <motion.div
                key={h.k}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-sm border border-white/5 bg-background p-8 transition-all duration-500 hover:border-primary/35 hover:bg-surface-elevated"
              >
                <div className="font-display text-lg text-foreground">{h.k}</div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{h.v}</p>
                <div className="mt-8 h-px w-10 bg-primary/50" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background px-6 py-32 lg:px-10 lg:py-40">
        <div className="mx-auto max-w-[1480px]">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-6">
              <SectionHeader
                eyebrow="Erkenning"
                title="Onbedwelmde slacht-erkenning."
                description="Opereren als NVWA-erkend slachthuis met naleving van wet- en regelgeving en focus op halalrichtlijnen."
              />
              <div className="mt-10 rounded-sm border border-white/5 bg-surface p-10">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Ipekçi Slachterij opereert als een door de Nederlandse Voedsel- en Warenautoriteit (NVWA)
                  erkend slachthuis en waarborgt naleving van geldende hygiëne-, kwaliteits- en
                  controlevoorschriften. Halal is voor ons geen formaliteit, maar een verantwoordelijkheid
                  in elke stap van het proces.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-3 text-[10px] font-medium uppercase tracking-[0.3em] text-foreground/60">
                  {["NVWA", "Halalrichtlijnen", "Hygiëne & controle"].map((t) => (
                    <span key={t} className="inline-flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-primary" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <SectionHeader eyebrow="Werkwijze" title="Halalslacht in drie stappen." />
              <div className="mt-10 space-y-10">
                {steps.map((s, i) => (
                  <motion.div
                    key={s.n}
                    initial={{ opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-sm border border-white/5 bg-surface p-10"
                  >
                    <div className="flex items-center justify-between gap-6">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
                        {s.n}
                      </div>
                      <span className="h-px flex-1 bg-white/10" />
                    </div>
                    <div className="mt-5 font-display text-2xl text-foreground">{s.title}</div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-surface px-6 py-32 lg:px-10 lg:py-40">
        <div className="mx-auto max-w-[1480px]">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-6">
              <SectionHeader
                eyebrow="Onze geschiedenis"
                title="Ontstaan van Ipekçi."
                description="Een islamitische familie met generaties ervaring in de vleessector — gebouwd op vakmanschap en overtuiging."
              />
            </div>
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-sm border border-white/5 bg-background p-10"
              >
                <p className="text-sm leading-relaxed text-muted-foreground">
                  De basis van Ipekçi ligt in de kennis en ervaring van een islamitische familie die al
                  generaties lang actief is in de vleessector. Oprichter Mehmet groeide op in Turkije en
                  leerde het slachtvak van jongs af aan binnen de familie.
                </p>
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                  Na zijn komst naar Nederland deed hij jarenlang ervaring op binnen de Nederlandse
                  vleessector, waarbij hij het slachtproces, kwaliteitsnormen en regelgeving volledig
                  eigen maakte. Samen met zijn zoon Abdulrahim en neef Ridvan richtte hij een eigen
                  halalslachthuis op in Harderwijk.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-3 text-[10px] font-medium uppercase tracking-[0.3em] text-foreground/60">
                  {["Familiebedrijf", "Sinds 2012", "Harderwijk"].map((t) => (
                    <span key={t} className="inline-flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-primary" />
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-background px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-[1480px] overflow-hidden rounded-sm border border-primary/30 bg-gradient-to-br from-surface via-surface to-background">
          <div className="relative grid items-center gap-10 p-10 md:grid-cols-2 md:p-16 lg:p-24">
            <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/18 blur-[140px]" />
            <div className="relative">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
                B2B partnership
              </p>
              <h2 className="mt-5 font-display text-4xl text-foreground md:text-6xl text-balance">
                Ook klant worden?
              </h2>
            </div>
            <div className="relative flex flex-col items-start gap-6 md:items-end">
              <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-right">
                Kies voor premium Nederlands halalvlees met duidelijke afspraken, korte lijnen en gekoelde
                levering.
              </p>
              <MagneticButton href="/contact">
                Word klant
                <ArrowUpRight size={14} />
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
