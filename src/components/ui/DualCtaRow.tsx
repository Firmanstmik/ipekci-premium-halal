import type { ReactNode } from "react";

/**
 * Side-by-side compact CTAs on mobile (app-like 50/50 grid).
 * From sm breakpoint up, flows as a normal horizontal button row.
 */
export function DualCtaRow({
  children,
  className = "",
  centered = false,
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  centered?: boolean;
  wide?: boolean;
}) {
  return (
    <div
      className={[
        "ipek-dual-cta",
        centered ? "ipek-dual-cta--center" : "",
        wide ? "ipek-dual-cta--wide" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
