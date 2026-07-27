import { motion } from "framer-motion";
import ayatLogo from "@/assets/ayat/logo-transparent.png";
import { AyatBrandSeal } from "@/components/home/AyatSectionBadge";
import { DS_EASE } from "@/lib/design-system";

export function HeroOriginBadge({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.08, duration: 0.8, ease: DS_EASE }}
      className="hero-origin-badge relative inline-flex"
    >
      <span className="hero-origin-badge__orbit" aria-hidden />
      <span className="hero-origin-badge__glow" aria-hidden />

      <div className="hero-origin-badge__inner relative flex items-center gap-3 overflow-hidden rounded-[11px] border border-[rgba(240,215,168,0.28)] bg-[linear-gradient(135deg,rgba(14,14,14,0.82)_0%,rgba(8,8,8,0.55)_55%,rgba(218,41,42,0.12)_100%)] px-3.5 py-2.5 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.65)] backdrop-blur-xl">
        <span className="hero-origin-badge__sweep" aria-hidden />

        <motion.span
          className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-[10px] border border-[rgba(218,41,42,0.45)] bg-[linear-gradient(145deg,rgba(218,41,42,0.28),rgba(20,20,20,0.7))] text-[var(--primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
          animate={reduceMotion ? {} : { scale: [1, 1.04, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.img
            src={ayatLogo}
            alt=""
            aria-hidden
            className="h-7 w-7 object-contain drop-shadow-[0_2px_10px_rgba(218,41,42,0.45)]"
            animate={reduceMotion ? {} : { y: [0, -1.5, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="pointer-events-none absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[var(--primary)] shadow-[0_0_8px_rgba(218,41,42,0.65)]" aria-hidden />
        </motion.span>

        <span className="relative min-w-0">
          <span className="flex items-center gap-1.5">
            <AyatBrandSeal className="h-3.5 w-3.5 shrink-0 text-[rgba(226,192,141,0.95)]" />
            <span className="text-[8px] font-semibold uppercase tracking-[0.34em] text-[var(--primary)]/90">
              Ayat Food
            </span>
          </span>
          <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/92 sm:text-[10.5px]">
            Premium Halal vleesgroothandel
          </span>
        </span>
      </div>
    </motion.div>
  );
}
