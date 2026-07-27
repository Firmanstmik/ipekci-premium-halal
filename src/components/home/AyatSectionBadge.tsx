import ayatLogo from "@/assets/ayat/logo-transparent.png";

type AyatSectionBadgeProps = {
  /** Small red kicker above the title (e.g. Vertrouwen, Assortiment) */
  kicker: string;
  /** Main badge title (e.g. Waarom Ayat Food) */
  title: string;
  className?: string;
  /** Light cream sections vs dark surfaces */
  tone?: "light" | "dark";
  /** Center the badge (e.g. centered section headers) */
  align?: "left" | "center";
};

/** Brand seal — replaces the plain dash next to section kickers. */
function AyatBrandSeal({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 1.2 12.35 6.1l5.35.5-4.05 3.55 1.2 5.25L10 12.9 5.15 15.4l1.2-5.25L2.3 6.6l5.35-.5L10 1.2Z"
        fill="currentColor"
        fillOpacity="0.14"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path
        d="M7.2 10.05 9.05 11.8l3.85-4.2"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Premium Ayat Food section badge — logo mark + seal icon + kicker/title.
 * Use above section headings site-wide for a consistent brand signal.
 */
export function AyatSectionBadge({
  kicker,
  title,
  className = "",
  tone = "light",
  align = "left",
}: AyatSectionBadgeProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={`inline-flex items-center gap-3 rounded-[12px] border px-2.5 py-2 shadow-[0_14px_36px_-24px_rgba(179,18,23,0.45)] ${
        isDark
          ? "border-[rgba(240,215,168,0.28)] bg-[linear-gradient(135deg,rgba(14,14,14,0.88)_0%,rgba(8,8,8,0.62)_55%,rgba(218,41,42,0.14)_100%)] backdrop-blur-xl"
          : "border-[rgba(179,18,23,0.22)] bg-white"
      } ${align === "center" ? "mx-auto" : ""} ${className}`}
    >
      <span
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-[9px] border ${
          isDark
            ? "border-[rgba(218,41,42,0.45)] bg-[linear-gradient(145deg,rgba(218,41,42,0.28),rgba(20,20,20,0.7))]"
            : "border-[rgba(179,18,23,0.28)] bg-[linear-gradient(145deg,rgba(179,18,23,0.12),#fff)]"
        }`}
      >
        <img
          src={ayatLogo}
          alt=""
          aria-hidden
          className={`object-contain ${isDark ? "h-5 w-5 drop-shadow-[0_2px_8px_rgba(218,41,42,0.45)]" : "h-4 w-4"}`}
        />
      </span>

      <span className="min-w-0 pr-1">
        <span className="flex items-center gap-1.5">
          <AyatBrandSeal
            className={`h-3.5 w-3.5 shrink-0 ${isDark ? "text-[rgba(226,192,141,0.95)]" : "text-[#B31217]"}`}
          />
          <span
            className={`text-[8px] font-semibold uppercase tracking-[0.28em] ${
              isDark ? "text-[rgba(226,192,141,0.95)]" : "text-[#B31217]"
            }`}
          >
            {kicker}
          </span>
        </span>
        <span
          className={`mt-0.5 block text-[11px] font-semibold uppercase tracking-[0.18em] ${
            isDark ? "text-white/92" : "text-[#141414]"
          }`}
        >
          {title}
        </span>
      </span>
    </div>
  );
}

export { AyatBrandSeal };
