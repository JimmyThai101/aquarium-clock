"use client";

import { useEffect } from "react";
import { Aquarium } from "@/components/aquarium/Aquarium";
import { ClockControls } from "@/components/ClockControls";
import { ClockDisplay } from "@/components/ClockDisplay";
import { useClock } from "@/hooks/useClock";
import { useFullscreen } from "@/hooks/useFullscreen";
import { useLighting } from "@/hooks/useLighting";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const DEFAULT_TAB_TITLE = "Aquarium Clock";

/**
 * Client shell: aquarium background + clock + controls.
 * Keeps time, storage, and fullscreen reads on the client only.
 */
export function AquariumClock() {
  const clock = useClock();
  const lighting = useLighting(clock.now);
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const { reducedMotion, ready: motionReady, toggleReducedMotion } =
    useReducedMotion();

  useEffect(() => {
    document.title = clock.timeLabel
      ? `${clock.timeLabel} · ${DEFAULT_TAB_TITLE}`
      : DEFAULT_TAB_TITLE;
  }, [clock.timeLabel]);

  useEffect(() => {
    return () => {
      document.title = DEFAULT_TAB_TITLE;
    };
  }, []);

  return (
    <div className="aquarium-clock">
      <Aquarium
        timeOfDay={lighting.timeOfDay}
        reducedMotion={reducedMotion}
        motionReady={motionReady}
      />

      <main className="aquarium-clock-content">
        <ClockDisplay
          ready={clock.ready}
          timeLabel={clock.timeLabel}
          dateLabel={clock.dateLabel}
          timeOfDayLabel={lighting.periodLabel}
        />

        <ClockControls
          format={clock.format}
          onToggleFormat={clock.toggleFormat}
          lightingMode={lighting.lightingMode}
          onCycleLighting={lighting.cycleLightingMode}
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
          reducedMotion={reducedMotion}
          onToggleReducedMotion={toggleReducedMotion}
        />
      </main>
    </div>
  );
}
