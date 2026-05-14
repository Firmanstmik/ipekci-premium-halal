export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path
          d="M4 28V4L16 16L28 4V28"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="miter"
          fill="none"
        />
        <circle cx="28" cy="6" r="2.5" fill="var(--color-primary)" />
      </svg>
      <span className="font-display text-[15px] font-bold uppercase tracking-[0.22em] leading-none">
        Nord<span className="text-primary">link</span>
      </span>
    </div>
  );
}
