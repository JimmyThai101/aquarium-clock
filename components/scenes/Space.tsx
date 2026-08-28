import {
  SPACE_STARS,
  SPACE_THEMES,
  sceneClassName,
} from "@/config/scenes";
import type { TimeOfDay } from "@/config/aquarium";

type SpaceProps = {
  timeOfDay: TimeOfDay;
  reducedMotion: boolean;
  motionReady?: boolean;
};

/** Deep-space scene: nebula, stars, a slow planet, and the occasional meteor. */
export function Space({
  timeOfDay,
  reducedMotion,
  motionReady = false,
}: SpaceProps) {
  const theme = SPACE_THEMES[timeOfDay];

  return (
    <div
      className={sceneClassName("space-scene", reducedMotion, motionReady)}
      style={{
        ["--space-top" as string]: theme.skyTop,
        ["--space-mid" as string]: theme.skyMid,
        ["--space-bottom" as string]: theme.skyBottom,
        ["--nebula-a" as string]: theme.nebulaA,
        ["--nebula-b" as string]: theme.nebulaB,
        ["--space-glow" as string]: theme.glow,
        ["--planet-color" as string]: theme.planet,
        ["--planet-accent" as string]: theme.planetAccent,
      }}
      data-period={timeOfDay}
      aria-hidden="true"
    >
      <div className="space-nebula space-nebula--a" />
      <div className="space-nebula space-nebula--b" />
      <div className="space-glow" />

      {SPACE_STARS.map((star) => (
        <span
          key={star.id}
          className="space-star"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            ["--star-duration" as string]: `${star.duration}s`,
            ["--star-delay" as string]: `${star.delay}s`,
          }}
        />
      ))}

      <div className="space-planet">
        <span className="space-planet-body" />
        <span className="space-planet-ring" />
      </div>

      <span className="space-meteor space-meteor--a" />
      <span className="space-meteor space-meteor--b" />

      <div className="space-vignette" />
    </div>
  );
}
