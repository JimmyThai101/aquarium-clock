"use client";

import { useCallback, useState, type MouseEvent } from "react";
import {
  FISH,
  TIME_OF_DAY_THEMES,
  type TimeOfDay,
} from "@/config/aquarium";
import { BottomDecor } from "@/components/aquarium/BottomDecor";
import { Bubbles } from "@/components/aquarium/Bubbles";
import { Crab } from "@/components/aquarium/Crab";
import { Fish } from "@/components/aquarium/Fish";
import { JellyfishField } from "@/components/aquarium/Jellyfish";
import { LightRays } from "@/components/aquarium/LightRays";
import { NightSky } from "@/components/aquarium/NightSky";
import { Particles } from "@/components/aquarium/Particles";
import { Seaweed } from "@/components/aquarium/Seaweed";
import { TreasureChest } from "@/components/aquarium/TreasureChest";
import { Turtle } from "@/components/aquarium/Turtle";
import { Caustics } from "@/components/effects/Caustics";
import { Rain } from "@/components/effects/Rain";
import type { LookId } from "@/config/looks";
import { LOOK_FISH_COLORS, LOOK_WATER_FILTER } from "@/config/looks";
import type { WeatherKind } from "@/hooks/useWeather";

type ClickBurst = {
  id: number;
  x: number;
  y: number;
};

type AquariumProps = {
  timeOfDay: TimeOfDay;
  reducedMotion: boolean;
  motionReady?: boolean;
  look?: LookId;
  feeding?: boolean;
  chestOpen?: boolean;
  weather?: WeatherKind;
};

function rayScale(weather: WeatherKind): number {
  if (weather === "clear") return 1.45;
  if (weather === "cloudy") return 0.42;
  if (weather === "rain") return 0.28;
  return 1;
}

/**
 * Full-bleed underwater scene. Positions stay config-driven so markup is stable.
 */
export function Aquarium({
  timeOfDay,
  reducedMotion,
  motionReady = false,
  look = "classic",
  feeding = false,
  chestOpen = false,
  weather = "unknown",
}: AquariumProps) {
  const theme = TIME_OF_DAY_THEMES[timeOfDay];
  const isNight = timeOfDay === "night";
  const fishColors = LOOK_FISH_COLORS[look];
  const waterFilter =
    weather === "rain" || weather === "cloudy"
      ? `${LOOK_WATER_FILTER[look] === "none" ? "" : `${LOOK_WATER_FILTER[look]} `}saturate(0.72)`
      : LOOK_WATER_FILTER[look];
  const [bursts, setBursts] = useState<ClickBurst[]>([]);

  const motionClass = !motionReady
    ? ""
    : reducedMotion
      ? "aquarium--reduced-motion"
      : "aquarium--allow-motion";

  const onTankClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const burst: ClickBurst = {
        id: Date.now(),
        x: ((event.clientX - rect.left) / rect.width) * 100,
        y: ((event.clientY - rect.top) / rect.height) * 100,
      };
      setBursts((current) => [...current.slice(-8), burst]);
      window.setTimeout(() => {
        setBursts((current) => current.filter((item) => item.id !== burst.id));
      }, 2800);
    },
    [],
  );

  return (
    <div
      className={`aquarium ${motionClass}${isNight ? " aquarium--bio" : ""}${feeding ? " aquarium--feeding" : ""}${weather === "rain" || weather === "cloudy" ? " aquarium--overcast" : ""}`.trim()}
      style={{
        ["--water-top" as string]: theme.waterTop,
        ["--water-mid" as string]: theme.waterMid,
        ["--water-bottom" as string]: theme.waterBottom,
        ["--water-glow" as string]: theme.glow,
        ["--sand-color" as string]: theme.sand,
        filter: waterFilter,
      }}
      data-period={timeOfDay}
      onClick={onTankClick}
    >
      <NightSky visible={isNight} />
      <div className="aquarium-surface" />
      <Caustics timeOfDay={timeOfDay} weather={weather} />
      <LightRays opacityScale={rayScale(weather)} />
      <Particles />
      <Bubbles />
      <JellyfishField night={isNight} />

      <div className="aquarium-fish-layer">
        {FISH.map((fish, index) => {
          const palette = fishColors[index] ?? fish;
          return (
            <Fish
              key={fish.id}
              fish={{
                ...fish,
                color: palette.color,
                accent: palette.accent,
                duration: feeding ? fish.duration * 0.42 : fish.duration,
              }}
            />
          );
        })}
        <Turtle />
      </div>

      <Seaweed />
      <BottomDecor />
      <Crab />
      <TreasureChest open={chestOpen} />
      <div className="aquarium-sand" />

      {bursts.map((burst) => (
        <span
          key={burst.id}
          className="aquarium-click-fx"
          style={{ left: `${burst.x}%`, top: `${burst.y}%` }}
        >
          <i className="aquarium-knock" />
          <i className="aquarium-click-bubble" />
          <i className="aquarium-click-bubble aquarium-click-bubble--b" />
          <i className="aquarium-click-bubble aquarium-click-bubble--c" />
        </span>
      ))}

      <Rain active={weather === "rain"} />
      <div className="aquarium-vignette" />
    </div>
  );
}
