import { CRAB } from "@/config/life";

/** Sideways crab along the sand. */
export function Crab() {
  return (
    <div
      className="aquarium-crab"
      style={{
        bottom: `${CRAB.bottom}%`,
        width: CRAB.size,
        height: CRAB.size * 0.7,
        ["--crab-duration" as string]: `${CRAB.duration}s`,
      }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 64 44" width="100%" height="100%">
        <ellipse cx="32" cy="24" rx="16" ry="10" fill="#c45c3a" />
        <circle cx="22" cy="20" r="3" fill="#1a1814" />
        <circle cx="42" cy="20" r="3" fill="#1a1814" />
        <path d="M16 18 L6 8" stroke="#c45c3a" strokeWidth="3" strokeLinecap="round" />
        <path d="M48 18 L58 8" stroke="#c45c3a" strokeWidth="3" strokeLinecap="round" />
        <path d="M18 30 L10 38" stroke="#a0482e" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M26 32 L22 40" stroke="#a0482e" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M38 32 L42 40" stroke="#a0482e" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M46 30 L54 38" stroke="#a0482e" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    </div>
  );
}
