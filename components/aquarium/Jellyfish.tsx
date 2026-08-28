import { JELLYFISH } from "@/config/life";

type JellyfishFieldProps = {
  night: boolean;
};

/** Slow translucent jellies — brighter after dark. */
export function JellyfishField({ night }: JellyfishFieldProps) {
  return (
    <div className="aquarium-jellies" aria-hidden="true">
      {JELLYFISH.map((jelly) => (
        <svg
          key={jelly.id}
          className="aquarium-jelly"
          viewBox="0 0 60 90"
          width={jelly.size}
          height={jelly.size * 1.5}
          style={{
            left: `${jelly.left}%`,
            top: `${jelly.depth}%`,
            opacity: night ? jelly.opacity + 0.28 : jelly.opacity,
            ["--jelly-duration" as string]: `${jelly.duration}s`,
            ["--jelly-delay" as string]: `${jelly.delay}s`,
          }}
        >
          <ellipse cx="30" cy="22" rx="22" ry="16" fill="rgba(190, 230, 255, 0.35)" />
          <ellipse cx="30" cy="20" rx="16" ry="11" fill="rgba(230, 250, 255, 0.28)" />
          <path
            d="M16 30 Q14 58 18 82"
            fill="none"
            stroke="rgba(200, 240, 255, 0.45)"
            strokeWidth="1.6"
          />
          <path
            d="M24 32 Q22 62 26 86"
            fill="none"
            stroke="rgba(200, 240, 255, 0.4)"
            strokeWidth="1.4"
          />
          <path
            d="M36 32 Q38 62 34 86"
            fill="none"
            stroke="rgba(200, 240, 255, 0.4)"
            strokeWidth="1.4"
          />
          <path
            d="M44 30 Q46 58 42 82"
            fill="none"
            stroke="rgba(200, 240, 255, 0.45)"
            strokeWidth="1.6"
          />
        </svg>
      ))}
    </div>
  );
}
