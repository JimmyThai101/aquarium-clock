import { Aquarium } from "@/components/aquarium/Aquarium";
import { Beach } from "@/components/scenes/Beach";
import { Space } from "@/components/scenes/Space";
import type { LookId } from "@/config/looks";
import type { SceneId } from "@/config/scenes";
import type { TimeOfDay } from "@/config/aquarium";
import type { WeatherKind } from "@/hooks/useWeather";

type SceneBackdropProps = {
  scene: SceneId;
  timeOfDay: TimeOfDay;
  reducedMotion: boolean;
  motionReady?: boolean;
  look?: LookId;
  feeding?: boolean;
  chestOpen?: boolean;
  weather?: WeatherKind;
};

/** Swaps the full-bleed backdrop: aquarium, beach, or space. */
export function SceneBackdrop({
  scene,
  timeOfDay,
  reducedMotion,
  motionReady = false,
  look = "classic",
  feeding = false,
  chestOpen = false,
  weather = "unknown",
}: SceneBackdropProps) {
  const shared = { timeOfDay, reducedMotion, motionReady };

  if (scene === "beach") return <Beach {...shared} weather={weather} />;
  if (scene === "space") return <Space {...shared} />;
  return (
    <Aquarium
      {...shared}
      look={look}
      feeding={feeding}
      chestOpen={chestOpen}
      weather={weather}
    />
  );
}
