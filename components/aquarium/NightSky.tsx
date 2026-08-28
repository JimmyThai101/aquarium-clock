import { AQUARIUM_STARS } from "@/config/life";

type NightSkyProps = {
  visible: boolean;
};

/** Moon and stars sitting above the waterline after dark. */
export function NightSky({ visible }: NightSkyProps) {
  if (!visible) return null;

  return (
    <div className="aquarium-night-sky" aria-hidden="true">
      <span className="aquarium-moon" />
      {AQUARIUM_STARS.map((star) => (
        <span
          key={star.id}
          className="aquarium-sky-star"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
            ["--star-duration" as string]: `${star.duration}s`,
            ["--star-delay" as string]: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
