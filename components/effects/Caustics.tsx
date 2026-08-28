import type { TimeOfDay } from "@/config/aquarium";
import type { WeatherKind } from "@/hooks/useWeather";

type CausticsProps = {
  timeOfDay: TimeOfDay;
  weather: WeatherKind;
};

function causticOpacity(timeOfDay: TimeOfDay, weather: WeatherKind): number {
  const byPeriod =
    timeOfDay === "morning" || timeOfDay === "afternoon"
      ? 0.28
      : timeOfDay === "evening"
        ? 0.12
        : 0.05;
  if (weather === "clear") return byPeriod * 1.25;
  if (weather === "cloudy" || weather === "rain") return byPeriod * 0.45;
  return byPeriod;
}

/** Moving light-on-water patterns, stronger in bright weather and daytime. */
export function Caustics({ timeOfDay, weather }: CausticsProps) {
  return (
    <div
      className="aquarium-caustics"
      style={{ opacity: causticOpacity(timeOfDay, weather) }}
      aria-hidden="true"
    />
  );
}
