"use client";

import { useSyncExternalStore } from "react";
import { STORAGE_KEYS } from "@/config/aquarium";
import { storageGet, storageSet } from "@/lib/storage";

const MOTION_EVENT = "aquarium-clock-motion-change";

function subscribeMotion(onChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onChange);
  window.addEventListener("storage", onChange);
  window.addEventListener(MOTION_EVENT, onChange);
  return () => {
    media.removeEventListener("change", onChange);
    window.removeEventListener("storage", onChange);
    window.removeEventListener(MOTION_EVENT, onChange);
  };
}

function readReducedMotion(): boolean {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  const saved = storageGet(STORAGE_KEYS.reducedMotion);

  if (saved === "true") return true;
  if (saved === "false") return false;
  return media.matches;
}

/** Client snapshot is always true once useSyncExternalStore hydrates. */
function readMotionReady(): boolean {
  return true;
}

/**
 * Combines the OS prefers-reduced-motion setting with a manual user toggle.
 * A saved manual choice overrides the OS preference.
 * Preferences are applied only after mount to avoid hydration mismatches.
 */
export function useReducedMotion() {
  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    readReducedMotion,
    () => false,
  );

  const ready = useSyncExternalStore(
    subscribeMotion,
    readMotionReady,
    () => false,
  );

  const setReducedMotion = (value: boolean) => {
    storageSet(
      STORAGE_KEYS.reducedMotion,
      value ? "true" : "false",
    );
    window.dispatchEvent(new Event(MOTION_EVENT));
  };

  const toggleReducedMotion = () => {
    setReducedMotion(!reducedMotion);
  };

  return {
    ready,
    reducedMotion,
    setReducedMotion,
    toggleReducedMotion,
  };
}
