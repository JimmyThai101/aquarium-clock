import { LIGHT_RAYS } from "@/config/aquarium";

/** Soft light shafts filtering down from the water surface. */
export function LightRays() {
  return (
    <div className="aquarium-rays" aria-hidden="true">
      {LIGHT_RAYS.map((ray) => (
        <span
          key={ray.id}
          className="aquarium-ray"
          style={{
            left: `${ray.left}%`,
            width: ray.width,
            opacity: ray.opacity,
            transform: `skewX(${ray.skew}deg)`,
            ["--ray-duration" as string]: `${ray.duration}s`,
            ["--ray-delay" as string]: `${ray.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
