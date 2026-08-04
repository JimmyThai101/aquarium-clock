import type { FishConfig } from "@/config/aquarium";

type FishProps = {
  fish: FishConfig;
};

/** Original SVG fish — mirrored when swimming right-to-left. */
export function Fish({ fish }: FishProps) {
  const facingRight = fish.direction === 1;

  return (
    <div
      className={`aquarium-fish aquarium-fish--${facingRight ? "ltr" : "rtl"}`}
      style={{
        top: `${fish.depth}%`,
        width: fish.size,
        height: fish.size * 0.55,
        ["--fish-duration" as string]: `${fish.duration}s`,
        ["--fish-delay" as string]: `${fish.delay}s`,
        ["--fish-bob" as string]: `${fish.bob}px`,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 80 44"
        width="100%"
        height="100%"
        style={{ transform: facingRight ? undefined : "scaleX(-1)" }}
      >
        <ellipse cx="38" cy="22" rx="28" ry="14" fill={fish.color} />
        <path
          d="M10 22 L0 8 L0 36 Z"
          fill={fish.accent}
        />
        <path
          d="M42 10 Q48 2 54 10 Q48 12 42 10 Z"
          fill={fish.accent}
        />
        <path
          d="M42 34 Q48 42 54 34 Q48 32 42 34 Z"
          fill={fish.accent}
        />
        <circle cx="52" cy="18" r="3.2" fill="#1a2a32" />
        <circle cx="53" cy="17" r="1.1" fill="#fff" />
        <path
          d="M58 22 Q66 18 72 22 Q66 26 58 22 Z"
          fill={fish.accent}
          opacity="0.85"
        />
      </svg>
    </div>
  );
}
