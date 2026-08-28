import {
  BEACH_BIRDS,
  BEACH_CLOUDS,
  BEACH_THEMES,
  sceneClassName,
} from "@/config/scenes";
import type { TimeOfDay } from "@/config/aquarium";
import { Rain } from "@/components/effects/Rain";
import type { WeatherKind } from "@/hooks/useWeather";

type BeachProps = {
  timeOfDay: TimeOfDay;
  reducedMotion: boolean;
  motionReady?: boolean;
  weather?: WeatherKind;
};

/** Shoreline scene: sky, sun or moon, waves, palms, and gulls. */
export function Beach({
  timeOfDay,
  reducedMotion,
  motionReady = false,
  weather = "unknown",
}: BeachProps) {
  const theme = BEACH_THEMES[timeOfDay];
  const isNight = timeOfDay === "night";

  return (
    <div
      className={sceneClassName("beach", reducedMotion, motionReady)}
      style={{
        ["--sky-top" as string]: theme.skyTop,
        ["--sky-mid" as string]: theme.skyMid,
        ["--sky-horizon" as string]: theme.skyHorizon,
        ["--water-color" as string]: theme.water,
        ["--water-deep" as string]: theme.waterDeep,
        ["--sand-color" as string]: theme.sand,
        ["--sky-glow" as string]: theme.glow,
        ["--sun-color" as string]: theme.sun,
      }}
      data-period={timeOfDay}
      aria-hidden="true"
    >
      <div className="beach-glow" />

      <div className={isNight ? "beach-moon" : "beach-sun"} />

      {BEACH_CLOUDS.map((cloud) => (
        <span
          key={cloud.id}
          className="beach-cloud"
          style={{
            left: `${cloud.left}%`,
            top: `${cloud.top}%`,
            width: cloud.width,
            opacity: isNight ? cloud.opacity * 0.25 : cloud.opacity,
            ["--cloud-duration" as string]: `${cloud.duration}s`,
            ["--cloud-delay" as string]: `${cloud.delay}s`,
          }}
        />
      ))}

      <div className="beach-birds">
        {BEACH_BIRDS.map((bird) => (
          <span
            key={bird.id}
            className="beach-bird"
            style={{
              top: `${bird.top}%`,
              width: bird.size,
              height: bird.size * 0.45,
              ["--bird-duration" as string]: `${bird.duration}s`,
              ["--bird-delay" as string]: `${bird.delay}s`,
            }}
          >
            <svg viewBox="0 0 32 12" width="100%" height="100%">
              <path
                d="M1 8 Q8 1 16 8 Q24 1 31 8"
                fill="none"
                stroke="rgba(255,255,255,0.85)"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </span>
        ))}
      </div>

      <svg
        className="beach-wave beach-wave--back"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0 50 C150 90 350 10 600 50 C850 90 1050 10 1200 50 L1200 120 L0 120 Z"
          fill="var(--water-deep)"
        />
      </svg>
      <svg
        className="beach-wave beach-wave--mid"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0 55 C200 15 400 85 600 55 C800 25 1000 85 1200 55 L1200 120 L0 120 Z"
          fill="var(--water-color)"
          opacity="0.85"
        />
      </svg>
      <svg
        className="beach-wave beach-wave--front"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0 62 C180 92 420 32 600 62 C780 92 1020 32 1200 62 L1200 120 L0 120 Z"
          fill="var(--water-color)"
        />
      </svg>

      <div className="beach-sand" />

      <svg className="beach-palm beach-palm--left" viewBox="0 0 80 180">
        <path d="M40 180 C36 120 42 70 40 20" stroke="#4a3320" strokeWidth="8" fill="none" />
        <path d="M40 28 C8 40 4 62 10 78" stroke="#2d6b3a" strokeWidth="5" fill="none" />
        <path d="M40 24 C18 18 4 8 2 4" stroke="#34824a" strokeWidth="5" fill="none" />
        <path d="M40 26 C62 16 78 8 80 6" stroke="#2d6b3a" strokeWidth="5" fill="none" />
        <path d="M40 30 C72 42 78 64 74 80" stroke="#34824a" strokeWidth="5" fill="none" />
      </svg>
      <svg className="beach-palm beach-palm--right" viewBox="0 0 80 180">
        <path d="M42 180 C46 118 38 72 42 18" stroke="#4a3320" strokeWidth="8" fill="none" />
        <path d="M42 26 C10 36 6 58 12 74" stroke="#2d6b3a" strokeWidth="5" fill="none" />
        <path d="M42 22 C20 14 8 6 4 2" stroke="#34824a" strokeWidth="5" fill="none" />
        <path d="M42 24 C66 14 80 8 82 6" stroke="#2d6b3a" strokeWidth="5" fill="none" />
        <path d="M42 28 C74 40 80 62 76 78" stroke="#34824a" strokeWidth="5" fill="none" />
      </svg>

      <Rain active={weather === "rain"} />
      <div className="beach-vignette" />
    </div>
  );
}
