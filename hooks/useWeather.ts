"use client";

import { useEffect, useState } from "react";

export type WeatherKind = "clear" | "cloudy" | "rain" | "unknown";

function weatherFromCode(code: number): WeatherKind {
  if (code === 0 || code === 1) return "clear";
  if (
    (code >= 51 && code <= 67) ||
    (code >= 80 && code <= 99)
  ) {
    return "rain";
  }
  return "cloudy";
}

/**
 * Optional local weather from Open-Meteo. Fails closed if location is denied.
 */
export function useWeather() {
  const [kind, setKind] = useState<WeatherKind>("unknown");

  useEffect(() => {
    if (!navigator.geolocation) return;

    let cancelled = false;
    const controller = new AbortController();

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const url = new URL("https://api.open-meteo.com/v1/forecast");
          url.searchParams.set("latitude", String(position.coords.latitude));
          url.searchParams.set("longitude", String(position.coords.longitude));
          url.searchParams.set("current", "weather_code");
          const response = await fetch(url, { signal: controller.signal });
          if (!response.ok) return;
          const data = (await response.json()) as {
            current?: { weather_code?: number };
          };
          const code = data.current?.weather_code;
          if (!cancelled && typeof code === "number") {
            setKind(weatherFromCode(code));
          }
        } catch {
          // Location or network failed — keep the tank weather-neutral.
        }
      },
      () => {
        // Permission denied or unavailable.
      },
      { maximumAge: 30 * 60 * 1000, timeout: 8000 },
    );

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  return kind;
}
