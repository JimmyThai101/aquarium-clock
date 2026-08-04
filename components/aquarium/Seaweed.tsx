import { PLANTS } from "@/config/aquarium";

/** Gently swaying seaweed along the sand bed. */
export function Seaweed() {
  return (
    <div className="aquarium-seaweed" aria-hidden="true">
      {PLANTS.map((plant) => (
        <svg
          key={plant.id}
          className="aquarium-plant"
          viewBox={`0 0 ${plant.width} ${plant.height}`}
          width={plant.width}
          height={plant.height}
          style={{
            left: `${plant.left}%`,
            ["--plant-duration" as string]: `${plant.duration}s`,
            ["--plant-delay" as string]: `${plant.delay}s`,
            ["--plant-sway" as string]: `${plant.sway}deg`,
          }}
        >
          <path
            d={`M${plant.width / 2} ${plant.height}
               Q${plant.width * 0.15} ${plant.height * 0.65} ${plant.width * 0.45} ${plant.height * 0.4}
               Q${plant.width * 0.7} ${plant.height * 0.2} ${plant.width * 0.35} 4
               Q${plant.width * 0.55} ${plant.height * 0.25} ${plant.width * 0.5} ${plant.height * 0.45}
               Q${plant.width * 0.4} ${plant.height * 0.7} ${plant.width / 2} ${plant.height}`}
            fill={plant.color}
            opacity="0.9"
          />
          <path
            d={`M${plant.width / 2} ${plant.height}
               Q${plant.width * 0.85} ${plant.height * 0.6} ${plant.width * 0.6} ${plant.height * 0.35}
               Q${plant.width * 0.4} ${plant.height * 0.15} ${plant.width * 0.7} 8
               Q${plant.width * 0.55} ${plant.height * 0.3} ${plant.width * 0.55} ${plant.height * 0.55}
               Q${plant.width * 0.55} ${plant.height * 0.75} ${plant.width / 2} ${plant.height}`}
            fill={plant.color}
            opacity="0.7"
          />
        </svg>
      ))}
    </div>
  );
}
