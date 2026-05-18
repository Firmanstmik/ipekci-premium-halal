import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Award,
  Building2,
  Clock3,
  Globe,
  LockKeyhole,
  Mail,
  MapPin,
  NotebookPen,
  Phone,
  SendHorizonal,
  ShieldCheck,
  Truck,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import cattleSticker from "@/assets/stiker-sapi.svg";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Ipekçi Slachterij" },
      {
        name: "description",
        content:
          "Neem contact op met Ipekçi Slachterij voor B2B-samenwerkingen, assortimentvragen en klant worden.",
      },
      { property: "og:title", content: "Contact — Ipekçi Slachterij" },
    ],
  }),
  component: ContactPage,
});

const MEAT_IMAGE = "https://www.ipekcislachterij.nl/wp-content/uploads/2025/12/Rib-eye.png";

const CONTACT_MODE: "develop" | "live" = "develop";

const contactItems = [
  {
    icon: MapPin,
    label: "Adres",
    lines: ["Buys Ballotstraat 7", "3846 BG Harderwijk", "Nederland"],
    href: "http://maps.google.com/maps?q=loc:52.3606892,5.6383247",
  },
  {
    icon: Phone,
    label: "Telefoon",
    lines: ["06 - 272 737 63", "Bereikbaar tijdens", "kantooruren"],
    href: "tel:+31627273763",
  },
  {
    icon: Mail,
    label: "E-mail",
    lines: ["info@ipekcislachterij.nl", "Wij reageren zo snel", "mogelijk"],
    href: "mailto:info@ipekcislachterij.nl",
  },
  {
    icon: Clock3,
    label: "Openingstijden",
    lines: ["Maandag - Vrijdag", "07:00 - 17:00", "Zaterdag - Zondag", "Gesloten"],
    href: undefined,
  },
];

const valueHighlight = new Set(["06 - 272 737 63", "info@ipekcislachterij.nl", "07:00 - 17:00"]);

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Halal gecertificeerd",
    description: "100% volgens islamitische normen en waarden",
  },
  {
    icon: Award,
    title: "Nederlandse kwaliteit",
    description: "Premium vlees van Nederlandse bodem",
  },
  {
    icon: Building2,
    title: "Eigen slachterij",
    description: "Volledige controle over kwaliteit en voedselveiligheid",
  },
  {
    icon: Truck,
    title: "Snelle levering",
    description: "Met eigen gekoeld transport door heel Nederland",
  },
];

function ContactDevelopPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <SiteLayout>
      <section className="relative overflow-hidden border-b border-[#a87d42]/18 bg-[#050505] px-6 pb-24 pt-36 text-white grain md:pt-40 lg:px-10 lg:pb-32 lg:pt-[150px]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(1100px_760px_at_20%_25%,rgba(179,18,23,0.22)_0%,transparent_58%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(980px_720px_at_78%_18%,rgba(197,152,87,0.14)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(900px_620px_at_50%_70%,rgba(255,255,255,0.08)_0%,transparent_62%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.52)_26%,rgba(0,0,0,0.88)_100%)]" />
          <div className="absolute left-0 right-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(197,152,87,0.45),transparent)]" />
        </div>

        <div className="relative mx-auto max-w-[1180px]">
          <motion.div
            initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-[860px] text-center"
          >
            <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#B31217]">Contact</div>
            <h1 className="mt-7 font-display text-[clamp(2.4rem,4.2vw,3.8rem)] font-medium leading-[1.02] tracking-[-0.03em] text-[#F5F2ED]">
              Sedang develop
            </h1>

            <div className="relative mx-auto mt-8 h-px w-[240px] bg-[rgba(197,152,87,0.55)]">
              <div className="absolute left-1/2 top-1/2 grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center bg-[#050505]">
                <div className="h-2 w-2 rotate-45 bg-[#B31217]" />
              </div>
            </div>

            <p className="mx-auto mt-9 max-w-[720px] text-sm leading-relaxed text-[#B9B9B9] sm:text-base">
              Halaman contact sedang kami upgrade jadi lebih interaktif dan premium. Untuk sementara, isi email
              untuk dapat update saat sudah live.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
            className="mx-auto mt-12 grid max-w-[860px] gap-6 lg:grid-cols-2"
          >
            <div className="relative overflow-hidden rounded-[26px] border border-[#8f6a37]/35 bg-white/[0.02] p-8 shadow-[0_50px_170px_-140px_rgba(0,0,0,0.98)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(860px_520px_at_35%_20%,rgba(255,255,255,0.10)_0%,transparent_62%)]" />
              <div className="relative">
                <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/55">
                  Status
                </div>
                <div className="mt-4 grid gap-3">
                  {[
                    { label: "Form Contact", value: "In progress" },
                    { label: "Validasi & Routing", value: "Queued" },
                    { label: "UI Premium", value: "In progress" },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between rounded-xl border border-white/5 bg-black/20 px-4 py-3"
                    >
                      <div className="text-[13px] text-[#F5F2ED]/90">{row.label}</div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c59857]">
                        {row.value}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex items-center justify-between rounded-xl border border-white/5 bg-black/20 px-4 py-3">
                  <div className="text-[13px] text-[#F5F2ED]/90">Support response</div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/55">
                    24h
                  </div>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[26px] border border-[#8f6a37]/35 bg-white/[0.02] p-8 shadow-[0_50px_170px_-140px_rgba(0,0,0,0.98)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(860px_520px_at_65%_22%,rgba(177,18,23,0.18)_0%,transparent_62%)]" />
              <div className="relative">
                <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/55">
                  Notifikasi
                </div>
                <form
                  className="mt-4 space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!email.trim()) return;
                    setSent(true);
                  }}
                >
                  <Input
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setSent(false);
                    }}
                    placeholder="Email kamu"
                    className="h-12 rounded-xl border border-white/10 bg-black/25 text-[14px] text-[#F5F2ED] placeholder:text-white/35 focus-visible:ring-0"
                  />
                  <Button
                    type="submit"
                    className="h-12 w-full rounded-xl bg-[#B31217] text-[11px] font-semibold uppercase tracking-[0.24em] text-[#F5F2ED] shadow-[0_20px_70px_-50px_rgba(179,18,23,0.85)] transition-all duration-500 hover:bg-[#C0181D] active:translate-y-px"
                  >
                    Notify me
                    <ArrowUpRight size={14} className="ml-2" />
                  </Button>
                  <div className="min-h-[20px] text-center text-[12px] text-[#c59857]">
                    {sent ? "Tercatat. Kami kabari saat sudah live." : ""}
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

function CinematicBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[#040404]" />
      <div className="absolute inset-0 bg-[radial-gradient(950px_560px_at_18%_26%,rgba(197,152,87,0.12)_0%,transparent_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(880px_620px_at_72%_28%,rgba(177,18,23,0.16)_0%,transparent_62%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,3,3,0.98)_0%,rgba(5,5,5,0.94)_54%,rgba(5,5,5,0.78)_72%,rgba(5,5,5,0.52)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.22)_18%,rgba(0,0,0,0.3)_76%,rgba(0,0,0,0.82)_100%)]" />
      <div
        className="absolute inset-0 opacity-[0.18] mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%27240%27%20height%3D%27240%27%3E%3Cfilter%20id%3D%27n%27%3E%3CfeTurbulence%20type%3D%27fractalNoise%27%20baseFrequency%3D%270.85%27%20numOctaves%3D%273%27%20stitchTiles%3D%27stitch%27/%3E%3C/filter%3E%3Crect%20width%3D%27240%27%20height%3D%27240%27%20filter%3D%27url(%23n)%27%20opacity%3D%270.38%27/%3E%3C/svg%3E")',
          backgroundSize: "360px 360px",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-y-0 left-[72px] w-px bg-gradient-to-b from-transparent via-[#a87d42]/20 to-transparent" />
      <div className="absolute inset-y-0 right-[120px] w-px bg-gradient-to-b from-transparent via-white/6 to-transparent" />
      <img
        src={MEAT_IMAGE}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        className="absolute bottom-[-24px] right-[-180px] hidden h-[82%] max-h-[860px] w-auto object-contain opacity-[0.85] lg:block"
        style={{ filter: "drop-shadow(0 50px 80px rgba(0,0,0,0.7)) saturate(1.04) contrast(1.06)" }}
      />
    </div>
  );
}

function HalalSeal() {
  return (
    <div className="relative hidden h-[170px] w-[170px] shrink-0 lg:block">
      <svg viewBox="0 0 180 180" className="absolute inset-0 h-full w-full">
        <defs>
          <path
            id="seal-circle"
            d="M 90,90 m -62,0 a 62,62 0 1,1 124,0 a 62,62 0 1,1 -124,0"
          />
        </defs>
        <circle cx="90" cy="90" r="62" fill="none" stroke="rgba(168,125,66,0.3)" strokeWidth="1.2" />
        <text fill="rgba(168,125,66,0.78)" fontSize="10" letterSpacing="5" fontFamily="General Sans, sans-serif">
          <textPath href="#seal-circle" startOffset="50%" textAnchor="middle">
            PREMIUM HALAL PREMIUM HALAL PREMIUM HALAL
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-[43px] rounded-full border border-[#a87d42]/20 bg-[#0e0b08]/70 shadow-[0_0_80px_-35px_rgba(168,125,66,0.45)]">
        <img
          src={cattleSticker}
          alt=""
          aria-hidden
          className="absolute inset-0 m-auto h-12 w-12 opacity-60"
          style={{
            filter:
              "sepia(1) saturate(180%) hue-rotate(350deg) brightness(0.82) contrast(1.08)",
          }}
        />
      </div>
    </div>
  );
}

function WorldMapDecoration() {
  return (
    <div className="relative mt-10 h-[150px] max-w-[470px] overflow-hidden">
      <svg viewBox="0 0 640 220" className="absolute inset-0 h-full w-full opacity-[0.18]">
        <g fill="#9f7a45">
          <path d="M44 130l30-32 48-14 40 12 8 24-16 17-35 6-18 19-31-7z" />
          <path d="M184 84l42-25 67 7 34 25-11 18-38 17-24 1-22 14-28-10-18-22z" />
          <path d="M248 140l28-7 15 16-3 32 16 22-18 8-29-17-20-31z" />
          <path d="M333 98l28-18 64 3 38 18 37-10 56 12 42 28-15 18-53-3-36 7-19 17-44-8-33 5-41-12-27-19z" />
          <path d="M512 168l34 5 27 17-14 18-37-7-18-19z" />
        </g>
      </svg>
      <div className="absolute left-[60%] top-[48%] h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c59857]/90 shadow-[0_0_0_5px_rgba(197,152,87,0.12),0_0_22px_8px_rgba(197,152,87,0.45)]" />
      <div className="absolute left-[60%] top-[48%] h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c59857]/25" />
    </div>
  );
}

function ContactInfoCard({
  icon: Icon,
  label,
  lines,
  href,
}: {
  icon: LucideIcon;
  label: string;
  lines: string[];
  href?: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#a87d42] bg-black/20 text-[#c59857] shadow-[0_0_25px_-14px_rgba(197,152,87,0.55)]">
        <Icon size={18} strokeWidth={1.75} />
      </div>
      <div className="space-y-1">
        <div className="text-[13px] font-medium text-white">{label}</div>
        {lines.map((line) => {
          const isLink = href && (line.includes("@") || line.includes("06 -"));
          const content = isLink ? (
            <a href={href} className="transition-colors hover:text-[#c59857]">
              {line}
            </a>
          ) : (
            line
          );

          return (
            <div
              key={`${label}-${line}`}
              className={valueHighlight.has(line) ? "text-[14px] text-[#c59857]" : "text-[14px] text-white/62"}
            >
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ContactField({
  label,
  placeholder,
  icon: Icon,
  type = "text",
  textarea = false,
}: {
  label: string;
  placeholder: string;
  icon: LucideIcon;
  type?: string;
  textarea?: boolean;
}) {
  return (
    <div className="grid gap-2.5">
      <Label className="text-[13px] font-normal text-white/78">{label}</Label>
      <div className="relative">
        <Icon
          size={17}
          strokeWidth={1.75}
          className={`pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-white/45 ${
            textarea ? "top-6 -translate-y-0" : ""
          }`}
        />
        {textarea ? (
          <Textarea
            placeholder={placeholder}
            className="min-h-[140px] rounded-[10px] border border-white/8 bg-[linear-gradient(180deg,rgba(17,17,17,0.84)_0%,rgba(14,14,14,0.9)_100%)] pl-12 text-[14px] text-white placeholder:text-white/28 focus-visible:border-[#a87d42]/55 focus-visible:ring-0"
          />
        ) : (
          <Input
            type={type}
            placeholder={placeholder}
            className="h-12 rounded-[10px] border border-white/8 bg-[linear-gradient(180deg,rgba(17,17,17,0.84)_0%,rgba(14,14,14,0.9)_100%)] pl-12 text-[14px] text-white placeholder:text-white/28 focus-visible:border-[#a87d42]/55 focus-visible:ring-0"
          />
        )}
      </div>
    </div>
  );
}

function ContactPage() {
  if (CONTACT_MODE === "develop") return <ContactDevelopPage />;
  return <ContactLivePage />;
}

function ContactLivePage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden border-b border-[#a87d42]/18 bg-[#050505] pt-36 text-white grain md:pt-40 lg:pt-[150px]">
        <CinematicBackdrop />

        <div className="relative mx-auto max-w-[1520px] px-6 md:px-10 lg:px-[48px]">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-12 pb-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:gap-10 lg:pb-5"
          >
            <div className="min-w-0 pt-2">
              <div className="flex items-start gap-6">
                <HalalSeal />
                <div className="max-w-[640px]">
                  <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.38em] text-[#c59857]">
                    <span>Contact</span>
                    <span className="h-px w-18 bg-[#a87d42]/55" />
                  </div>

                  <h1 className="mt-6 max-w-[580px] font-display text-[clamp(3.5rem,7vw,5.6rem)] font-medium leading-[0.9] tracking-[-0.05em] text-white">
                    Neem contact
                    <br />
                    met <span className="italic text-[#c59857]">ons</span> op
                  </h1>

                  <p className="mt-6 max-w-[520px] text-[16px] leading-8 text-white/68">
                    Wij staan klaar om uw vragen te beantwoorden, advies te geven en samen te werken aan
                    de beste halal oplossingen.
                  </p>
                </div>
              </div>

              <div className="mt-10 h-px max-w-[520px] bg-gradient-to-r from-[#a87d42]/65 via-[#a87d42]/25 to-transparent" />

              <div className="mt-8 grid max-w-[620px] gap-x-10 gap-y-8 sm:grid-cols-2">
                {contactItems.map((item) => (
                  <ContactInfoCard
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    lines={item.lines}
                    href={item.href}
                  />
                ))}
              </div>

              <WorldMapDecoration />

              <div className="mt-2 inline-flex items-center gap-3 rounded-[12px] border border-[#a87d42]/35 bg-[linear-gradient(180deg,rgba(28,21,12,0.72)_0%,rgba(13,10,7,0.92)_100%)] px-5 py-4 text-[14px] text-[#f1d3a2] shadow-[0_0_40px_-24px_rgba(168,125,66,0.65)]">
                <Globe size={18} className="text-[#c59857]" />
                <span>Wij leveren door heel Nederland</span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
              className="relative lg:pt-6"
            >
              <div className="relative overflow-hidden rounded-[22px] border border-[#8f6a37] bg-[linear-gradient(180deg,rgba(21,18,14,0.9)_0%,rgba(8,8,8,0.88)_100%)] p-6 shadow-[0_25px_90px_-35px_rgba(0,0,0,0.85)] backdrop-blur-xl md:p-8">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_420px_at_70%_25%,rgba(255,255,255,0.05)_0%,transparent_62%)]" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(620px_440px_at_28%_78%,rgba(177,18,23,0.12)_0%,transparent_68%)]" />

                <div className="relative">
                  <h2 className="font-display text-[clamp(2rem,3vw,2.9rem)] font-medium tracking-[-0.03em] text-white/95">
                    Stuur ons een bericht
                  </h2>
                  <div className="mt-4 h-px w-14 bg-[#a87d42]" />

                  <form className="mt-8 grid gap-5" onSubmit={(e) => e.preventDefault()}>
                    <ContactField label="Uw naam" placeholder="Vul uw naam in" icon={UserRound} />
                    <ContactField
                      label="E-mail adres"
                      placeholder="Vul uw e-mail adres in"
                      icon={Mail}
                      type="email"
                    />
                    <ContactField label="Bedrijf" placeholder="Naam van uw bedrijf" icon={Building2} />
                    <ContactField
                      label="Telefoonnummer"
                      placeholder="Uw telefoonnummer"
                      icon={Phone}
                    />
                    <ContactField
                      label="Bericht"
                      placeholder="Typ hier uw bericht..."
                      icon={NotebookPen}
                      textarea
                    />

                    <Button
                      type="submit"
                      className="mt-1 h-12 rounded-[8px] bg-[linear-gradient(90deg,#8b0e11_0%,#b11217_55%,#8b0e11_100%)] text-[14px] font-medium text-white shadow-[0_16px_40px_-18px_rgba(177,18,23,0.75)] transition-transform hover:-translate-y-px hover:bg-[linear-gradient(90deg,#991015_0%,#c1151b_55%,#991015_100%)]"
                    >
                      <SendHorizonal size={16} className="mr-2" />
                      Verstuur bericht
                    </Button>

                    <div className="flex items-start gap-3 text-[12px] leading-6 text-white/48">
                      <LockKeyhole size={14} className="mt-1 shrink-0 text-[#c59857]" />
                      <span>Uw gegevens worden vertrouwelijk behandeld en niet gedeeld met derden.</span>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="relative border-t border-[#a87d42]/14 bg-[linear-gradient(180deg,rgba(8,8,8,0.82)_0%,rgba(11,11,11,0.95)_100%)]">
          <div className="mx-auto grid max-w-[1520px] gap-0 px-6 py-7 md:px-10 lg:grid-cols-4 lg:px-[48px]">
            {trustItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`flex items-start gap-4 py-5 lg:px-8 ${
                    index < trustItems.length - 1 ? "lg:border-r lg:border-[#a87d42]/16" : ""
                  }`}
                >
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#a87d42]/45 bg-black/25 text-[#c59857]">
                    <Icon size={19} strokeWidth={1.7} />
                  </div>
                  <div>
                    <div className="text-[15px] text-white">{item.title}</div>
                    <p className="mt-1 max-w-[220px] text-[13px] leading-6 text-white/56">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
