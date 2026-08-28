"use client";

import { useEffect, useState } from "react";
import { ClockControls } from "@/components/ClockControls";
import { ClockDisplay } from "@/components/ClockDisplay";
import { EventPanel } from "@/components/EventPanel";
import { SceneBackdrop } from "@/components/scenes/SceneBackdrop";
import { useAmbientSound } from "@/hooks/useAmbientSound";
import { useClock } from "@/hooks/useClock";
import { useFullscreen } from "@/hooks/useFullscreen";
import { useIdleUi } from "@/hooks/useIdleUi";
import { useLighting } from "@/hooks/useLighting";
import { useLook } from "@/hooks/useLook";
import { useMinutePulse } from "@/hooks/useMinutePulse";
import { useNextEvent } from "@/hooks/useNextEvent";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScene } from "@/hooks/useScene";
import { useWeather } from "@/hooks/useWeather";

const DEFAULT_TAB_TITLE = "Aquarium Clock";

function isFeeding(now: Date | null): boolean {
  if (!now) return false;
  const hour = now.getHours();
  return now.getMinutes() === 0 && (hour === 8 || hour === 18);
}

function isChestOpen(now: Date | null): boolean {
  if (!now) return false;
  return now.getMinutes() === 0 && now.getSeconds() < 12;
}

/**
 * Client shell: scene backdrop + clock + controls.
 * Keeps time, storage, and fullscreen reads on the client only.
 */
export function AquariumClock() {
  const clock = useClock();
  const lighting = useLighting(clock.now);
  const { scene, sceneLabel, cycleScene } = useScene();
  const look = useLook();
  const nextEvent = useNextEvent(clock.now);
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const { reducedMotion, ready: motionReady, toggleReducedMotion } =
    useReducedMotion();
  const { soundOn, toggleSound } = useAmbientSound();
  const weather = useWeather();
  const minutePulse = useMinutePulse(clock.now);
  const [eventPanelOpen, setEventPanelOpen] = useState(false);
  const idle = useIdleUi(eventPanelOpen);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setEventPanelOpen(false);
      if (nextEvent.isDue) nextEvent.clearEvent();
      if (document.fullscreenElement) {
        void document.exitFullscreen();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [nextEvent]);

  useEffect(() => {
    if (!clock.timeLabel) {
      document.title = DEFAULT_TAB_TITLE;
      return;
    }
    if (nextEvent.isDue && nextEvent.event) {
      document.title = `${nextEvent.event.label} · ${clock.timeLabel} · ${DEFAULT_TAB_TITLE}`;
      return;
    }
    document.title = `${clock.timeLabel} · ${DEFAULT_TAB_TITLE}`;
  }, [clock.timeLabel, nextEvent.isDue, nextEvent.event]);

  useEffect(() => {
    return () => {
      document.title = DEFAULT_TAB_TITLE;
    };
  }, []);

  return (
    <div
      className={`aquarium-clock${nextEvent.isDue ? " aquarium-clock--event-due" : ""}${reducedMotion ? " aquarium-clock--reduced-motion" : ""}`}
      data-scene={scene}
    >
      <SceneBackdrop
        scene={scene}
        timeOfDay={lighting.timeOfDay}
        reducedMotion={reducedMotion}
        motionReady={motionReady}
        look={look.look}
        feeding={isFeeding(clock.now)}
        chestOpen={isChestOpen(clock.now)}
        weather={weather}
      />

      <main className="aquarium-clock-content">
        <ClockDisplay
          ready={clock.ready}
          now={clock.now}
          timeLabel={clock.timeLabel}
          dateLabel={clock.dateLabel}
          timeOfDayLabel={lighting.periodLabel}
          format={clock.format}
          eventLabel={nextEvent.remainingLabel}
          eventIsDue={nextEvent.isDue}
          minutePulse={minutePulse}
          onDismissEvent={nextEvent.clearEvent}
        />

        <ClockControls
          format={clock.format}
          onToggleFormat={clock.toggleFormat}
          lightingMode={lighting.lightingMode}
          onCycleLighting={lighting.cycleLightingMode}
          sceneLabel={sceneLabel}
          onCycleScene={cycleScene}
          lookLabel={look.lookLabel}
          onCycleLook={look.cycleLook}
          eventPanelOpen={eventPanelOpen}
          hasEvent={Boolean(nextEvent.event)}
          onToggleEventPanel={() => setEventPanelOpen((open) => !open)}
          soundOn={soundOn}
          onToggleSound={toggleSound}
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
          reducedMotion={reducedMotion}
          onToggleReducedMotion={toggleReducedMotion}
          hidden={idle && !eventPanelOpen}
        />
      </main>

      {eventPanelOpen ? (
        <div className="event-overlay">
          <div
            className="event-overlay-scrim"
            role="presentation"
            onClick={() => setEventPanelOpen(false)}
          />
          <EventPanel
            event={nextEvent.event}
            now={clock.now}
            targetTimeLabel={nextEvent.targetTimeLabel}
            onSetAt={nextEvent.setEventAt}
            onSetTimer={nextEvent.setTimer}
            onClear={nextEvent.clearEvent}
            onClose={() => setEventPanelOpen(false)}
          />
        </div>
      ) : null}
    </div>
  );
}
