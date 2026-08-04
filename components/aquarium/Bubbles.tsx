import { BUBBLES } from "@/config/aquarium";

/** Rising bubble field driven by fixed config values. */
export function Bubbles() {
  return (
    <div className="aquarium-bubbles" aria-hidden="true">
      {BUBBLES.map((bubble) => (
        <span
          key={bubble.id}
          className="aquarium-bubble"
          style={{
            left: `${bubble.left}%`,
            width: bubble.size,
            height: bubble.size,
            opacity: bubble.opacity,
            ["--bubble-duration" as string]: `${bubble.duration}s`,
            ["--bubble-delay" as string]: `${bubble.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
