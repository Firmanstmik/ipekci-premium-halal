import { useEffect, useState } from "react";
import ayatLogo from "@/assets/ayat/logo-transparent.png";

const STORAGE_KEY = "ayat-splash-seen";
const MIN_VISIBLE_MS = 1600;
const FADE_MS = 450;

function hasSeenSplash(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function markSplashSeen(): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* ignore quota / private mode */
  }
}

/**
 * Full-viewport white splash with centered Ayat logo.
 * Shows once per browser session on first open; skips on client navigations.
 * Prefers the static #ayat-splash in index.html when present (no double logo).
 */
export function SplashScreen() {
  const [phase, setPhase] = useState<"show" | "fade" | "done">(() =>
    typeof window !== "undefined" && hasSeenSplash() ? "done" : "show",
  );
  const [useStatic] = useState(
    () => typeof document !== "undefined" && Boolean(document.getElementById("ayat-splash")),
  );

  useEffect(() => {
    if (phase === "done") {
      document.getElementById("ayat-splash")?.remove();
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== "show") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hold = reduceMotion ? 400 : MIN_VISIBLE_MS;

    const fadeTimer = window.setTimeout(() => {
      setPhase("fade");
      markSplashSeen();
    }, hold);

    return () => window.clearTimeout(fadeTimer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "fade") return;

    const staticEl = document.getElementById("ayat-splash");
    staticEl?.classList.add("ayat-splash--fade");

    const doneTimer = window.setTimeout(() => {
      staticEl?.remove();
      setPhase("done");
    }, FADE_MS);

    return () => window.clearTimeout(doneTimer);
  }, [phase]);

  useEffect(() => {
    if (phase === "done") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  if (phase === "done" || useStatic) return null;

  return (
    <div
      className={`ayat-splash${phase === "fade" ? " ayat-splash--fade" : ""}`}
      role="presentation"
      aria-hidden="true"
    >
      <img
        src={ayatLogo}
        alt=""
        className="ayat-splash__logo"
        width={180}
        height={180}
        decoding="async"
        fetchPriority="high"
      />
    </div>
  );
}
