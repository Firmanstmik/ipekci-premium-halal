import { ShieldCheck } from "lucide-react";
import { useId } from "react";

export function HalalStamp({
  className = "",
  compact = false,
}: {
  className?: string;
  activeKey?: string;
  compact?: boolean;
}) {
  const pathId = useId().replace(/:/g, "");
  const size = compact
    ? "h-[5.25rem] w-[5.25rem] sm:h-[5.75rem] sm:w-[5.75rem]"
    : "h-36 w-36 sm:h-40 sm:w-40";
  const iconSize = compact ? 22 : 32;

  return (
    <div
      className={`relative grid place-items-center rounded-full bg-transparent ${size} ${className}`}
    >
      <svg viewBox="0 0 112 112" className="absolute inset-0 h-full w-full spin-ring" aria-hidden>
        <defs>
          <path id={pathId} d="M56,56 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" />
        </defs>
        <text
          fill="rgba(245,241,235,0.72)"
          fontSize={compact ? "6.4" : "7.2"}
          fontWeight="700"
          letterSpacing="0.24em"
          textAnchor="middle"
        >
          <textPath href={`#${pathId}`} startOffset="50%">
            PREMIUM HALAL · 100% HALAL · NVWA ·
          </textPath>
        </text>
      </svg>

      <ShieldCheck
        size={iconSize}
        strokeWidth={1.75}
        className="relative text-[rgba(226,192,141,0.92)]"
        aria-hidden
      />
    </div>
  );
}
