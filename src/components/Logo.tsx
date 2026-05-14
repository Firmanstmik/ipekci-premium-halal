export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M4 26L16 4L28 26H22L16 14L10 26H4Z" fill="currentColor" />
      </svg>
      <span className="font-sans text-sm font-semibold leading-tight tracking-tight">
        Vector
        <br />
        Transit
      </span>
    </div>
  );
}
