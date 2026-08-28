import { TURTLE } from "@/config/life";

/** A rare sea turtle that drifts through on a long loop. */
export function Turtle() {
  return (
    <div
      className="aquarium-turtle aquarium-fish--ltr"
      style={{
        top: `${TURTLE.depth}%`,
        width: TURTLE.size,
        height: TURTLE.size * 0.55,
        ["--fish-duration" as string]: `${TURTLE.duration}s`,
        ["--fish-delay" as string]: `${TURTLE.delay}s`,
        ["--fish-bob" as string]: "5px",
      }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 120 70" width="100%" height="100%">
        <ellipse cx="62" cy="34" rx="32" ry="20" fill="#3d7a5a" />
        <ellipse cx="62" cy="34" rx="24" ry="14" fill="#2f6248" />
        <ellipse cx="28" cy="34" rx="12" ry="9" fill="#4a8f68" />
        <circle cx="22" cy="32" r="2.2" fill="#1a2a22" />
        <circle cx="23" cy="31" r="0.8" fill="#fff" />
        <path d="M90 34 Q112 18 118 28 Q108 38 90 36 Z" fill="#3d7a5a" />
        <path d="M48 18 Q40 4 58 10 Z" fill="#4a8f68" />
        <path d="M48 50 Q40 66 58 60 Z" fill="#4a8f68" />
        <path d="M78 18 Q92 6 88 22 Z" fill="#4a8f68" />
        <path d="M78 50 Q92 64 88 48 Z" fill="#4a8f68" />
      </svg>
    </div>
  );
}
