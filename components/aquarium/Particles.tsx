import { PARTICLES } from "@/config/aquarium";

/** Slow-drifting underwater particles. */
export function Particles() {
  return (
    <div className="aquarium-particles" aria-hidden="true">
      {PARTICLES.map((particle) => (
        <span
          key={particle.id}
          className="aquarium-particle"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            ["--particle-duration" as string]: `${particle.duration}s`,
            ["--particle-delay" as string]: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
