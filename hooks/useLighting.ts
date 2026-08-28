"use client";

import { useSyncExternalStore } from "react";
import {
  LIGHTING_MODE_LABELS,
  STORAGE_KEYS,
  getTimeOfDay,
  isLightingMode,
  nextLightingMode,
  type LightingMode,
  type TimeOfDay,
} from "@/config/aquarium";
import { storageGet, storageSet } from "@/lib/storage";

const LIGHTING_EVENT = "aquarium-clock-lighting-change";

function subscribeLighting(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(LIGHTING_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(LIGHTING_EVENT, onChange);
  };
}

function readLightingMode(): LightingMode {
  const saved = storageGet(STORAGE_KEYS.lighting);
  return isLightingMode(saved) ? saved : "auto";
}

/**
 * Lighting can follow the clock (auto) or stay locked to a period.
 * Preference is stored in localStorage.
 */
export function useLighting(now: Date | null) {
  const lightingMode = useSyncExternalStore(
    subscribeLighting,
    readLightingMode,
    () => "auto" as LightingMode,
  );

  const naturalTimeOfDay: TimeOfDay = now
    ? getTimeOfDay(now)
    : "afternoon";

  const timeOfDay: TimeOfDay =
    lightingMode === "auto" ? naturalTimeOfDay : lightingMode;

  const setLightingMode = (mode: LightingMode) => {
    storageSet(STORAGE_KEYS.lighting, mode);
    window.dispatchEvent(new Event(LIGHTING_EVENT));
  };

  const cycleLightingMode = () => {
    setLightingMode(nextLightingMode(lightingMode));
  };

  return {
    lightingMode,
    timeOfDay,
    lightingLabel: LIGHTING_MODE_LABELS[lightingMode],
    periodLabel:
      lightingMode === "auto"
        ? `${LIGHTING_MODE_LABELS[naturalTimeOfDay]} · Auto`
        : LIGHTING_MODE_LABELS[lightingMode],
    setLightingMode,
    cycleLightingMode,
  };
}
