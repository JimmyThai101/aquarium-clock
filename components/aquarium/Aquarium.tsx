import {
  FISH,
  TIME_OF_DAY_THEMES,
  type TimeOfDay,
} from "@/config/aquarium";
import { Bubbles } from "@/components/aquarium/Bubbles";
import { Fish } from "@/components/aquarium/Fish";
import { LightRays } from "@/components/aquarium/LightRays";
import { Particles } from "@/components/aquarium/Particles";
import { Seaweed } from "@/components/aquarium/Seaweed";

type AquariumProps = {
  timeOfDay: TimeOfDay;
  reducedMotion: boolean;
  /** False until client preferences are known — lets CSS media queries apply first. */
  motionReady?: boolean;
};

/**
 * Full-bleed underwater scene. All fish / bubble / plant positions come from
 * fixed config so server and client HTML match.
 */
export function Aquarium({
  timeOfDay,
  reducedMotion,
  motionReady = false,
}: AquariumProps) {
  const theme = TIME_OF_DAY_THEMES[timeOfDay];

  const motionClass = !motionReady
    ? ""
    : reducedMotion
      ? "aquarium--reduced-motion"
      : "aquarium--allow-motion";

  return (
    <div
      className={`aquarium ${motionClass}`.trim()}
      style={{
        ["--water-top" as string]: theme.waterTop,
        ["--water-mid" as string]: theme.waterMid,
        ["--water-bottom" as string]: theme.waterBottom,
        ["--water-glow" as string]: theme.glow,
        ["--sand-color" as string]: theme.sand,
      }}
      aria-hidden="true"
    >
      <div className="aquarium-surface" />
      <LightRays />
      <Particles />
      <Bubbles />

      <div className="aquarium-fish-layer">
        {FISH.map((fish) => (
          <Fish key={fish.id} fish={fish} />
        ))}
      </div>

      <Seaweed />
      <div className="aquarium-sand" />
      <div className="aquarium-vignette" />
    </div>
  );
}
