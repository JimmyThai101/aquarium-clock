import { CORAL } from "@/config/life";

/** Rocks, coral, and a tiny castle along the sand. */
export function BottomDecor() {
  return (
    <div className="aquarium-decor" aria-hidden="true">
      <svg className="aquarium-castle" viewBox="0 0 90 80" width="90" height="80">
        <rect x="18" y="28" width="54" height="48" fill="#8fa4b8" />
        <rect x="10" y="18" width="16" height="58" fill="#7b93aa" />
        <rect x="64" y="18" width="16" height="58" fill="#7b93aa" />
        <polygon points="10,18 18,6 26,18" fill="#9bb0c4" />
        <polygon points="64,18 72,6 80,18" fill="#9bb0c4" />
        <rect x="38" y="48" width="14" height="28" fill="#3d4f62" />
        <rect x="24" y="36" width="10" height="10" fill="#cfe6f4" opacity="0.55" />
        <rect x="56" y="36" width="10" height="10" fill="#cfe6f4" opacity="0.55" />
      </svg>

      {CORAL.map((piece) => (
        <svg
          key={piece.id}
          className="aquarium-coral"
          viewBox="0 0 40 70"
          width="36"
          height={piece.height}
          style={{ left: `${piece.left}%` }}
        >
          <path
            d="M20 70 C18 48 8 44 10 28 C12 16 20 18 20 30 C20 16 30 14 30 28 C32 46 22 50 20 70"
            fill={piece.color}
          />
        </svg>
      ))}

      <svg className="aquarium-rock aquarium-rock--a" viewBox="0 0 80 36" width="88" height="40">
        <ellipse cx="40" cy="22" rx="36" ry="14" fill="#4a6570" />
      </svg>
      <svg className="aquarium-rock aquarium-rock--b" viewBox="0 0 60 28" width="64" height="32">
        <ellipse cx="30" cy="18" rx="26" ry="10" fill="#3d5560" />
      </svg>
    </div>
  );
}
