import { LIGHT_RAYS } from "@/config/aquarium";

type LightRaysProps = {
  opacityScale?: number;
};

/** Soft light shafts filtering down from the water surface. */
export function LightRays({ opacityScale = 1 }: LightRaysProps) {
  return (
    <div className="aquarium-rays" aria-hidden="true">
      {LIGHT_RAYS.map((ray) => (
        <span
          key={ray.id}
          className="aquarium-ray"
          style={{
            left: `${ray.left}%`,
            width: ray.width,
            opacity: ray.opacity * opacityScale,
            transform: `skewX(${ray.skew}deg)`,
            ["--ray-duration" as string]: `${ray.duration}s`,
            ["--ray-delay" as string]: `${ray.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
