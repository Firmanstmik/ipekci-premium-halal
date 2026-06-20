import type { ReactNode } from "react";

export type FrameVariant =
  | "reticle"
  | "prism"
  | "aurora"
  | "halo"
  | "orbit"
  | "pulse";

/** Living frame overlay — always rendered INSIDE the image/card bounds */
export function ImageFrameOverlay({
  variant,
  className = "",
}: {
  variant: FrameVariant;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`image-frame image-frame--${variant} pointer-events-none absolute inset-0 z-[8] overflow-hidden ${className}`}
    >
      <FrameDecor variant={variant} />
    </div>
  );
}

function FrameDecor({ variant }: { variant: FrameVariant }) {
  switch (variant) {
    case "reticle":
      return (
        <>
          <span className="if-reticle-ring" />
          <span className="if-reticle-dot if-reticle-dot--tl" />
          <span className="if-reticle-dot if-reticle-dot--tr" />
          <span className="if-reticle-dot if-reticle-dot--bl" />
          <span className="if-reticle-dot if-reticle-dot--br" />
          <span className="if-reticle-cross if-reticle-cross--h" />
          <span className="if-reticle-cross if-reticle-cross--v" />
        </>
      );
    case "prism":
      return (
        <>
          <span className="if-prism-border" />
          <span className="if-prism-slash" />
          <span className="if-prism-shimmer" />
        </>
      );
    case "aurora":
      return (
        <>
          <span className="if-aurora-inset" />
          <span className="if-aurora-sweep" />
        </>
      );
    case "halo":
      return (
        <>
          <span className="if-halo-arc if-halo-arc--tl" />
          <span className="if-halo-arc if-halo-arc--tr" />
          <span className="if-halo-arc if-halo-arc--bl" />
          <span className="if-halo-arc if-halo-arc--br" />
          <span className="if-halo-glow" />
        </>
      );
    case "orbit":
      return (
        <>
          <span className="if-orbit-rail" />
          <span className="if-orbit-node if-orbit-node--a" />
          <span className="if-orbit-node if-orbit-node--b" />
          <span className="if-orbit-node if-orbit-node--c" />
          <span className="if-orbit-vignette" />
        </>
      );
    case "pulse":
      return (
        <>
          <span className="if-pulse-ring if-pulse-ring--1" />
          <span className="if-pulse-ring if-pulse-ring--2" />
          <span className="if-pulse-corner if-pulse-corner--tl" />
          <span className="if-pulse-corner if-pulse-corner--br" />
        </>
      );
    default:
      return null;
  }
}

/** @deprecated Wrap image in a `group/if` container and use ImageFrameOverlay inside */
export function PremiumFrame({
  children,
  variant = "reticle",
  className = "",
  innerClassName = "",
}: {
  children: ReactNode;
  variant?: FrameVariant;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <div className={`group/if relative ${className}`}>
      <div className={`relative ${innerClassName}`}>{children}</div>
      <ImageFrameOverlay variant={variant} className="rounded-[inherit]" />
    </div>
  );
}

/** Inset frame for compact cards (trust grid, etc.) */
export function CardFrameOverlay({
  variant = "pulse",
  className = "",
}: {
  variant?: Extract<FrameVariant, "pulse" | "reticle" | "prism">;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`image-frame image-frame--${variant} image-frame--card pointer-events-none absolute inset-3 z-[2] overflow-hidden rounded-[14px] sm:inset-4 ${className}`}
    >
      <FrameDecor variant={variant} />
    </div>
  );
}

/** @deprecated Use CardFrameOverlay inside card */
export function LivingFrameCard({
  children,
  variant = "pulse",
  className = "",
}: {
  children: ReactNode;
  variant?: Extract<FrameVariant, "pulse" | "reticle" | "prism">;
  className?: string;
}) {
  return (
    <div className={`group/if relative ${className}`}>
      {children}
      <CardFrameOverlay variant={variant} />
    </div>
  );
}

/** @deprecated */
export function FrameCorner({ className }: { className: string }) {
  return <span aria-hidden className={`hidden ${className}`} />;
}

/** Back-compat aliases */
export type { FrameVariant as PremiumFrameVariant };
