"use client";

import { useSyncExternalStore } from "react";
import { STORAGE_KEYS } from "@/config/aquarium";
import { storageGet, storageSet } from "@/lib/storage";
import {
  LOOK_FISH_COLORS,
  LOOK_LABELS,
  LOOK_WATER_FILTER,
  isLookId,
  nextLook,
  type LookId,
} from "@/config/looks";

const LOOK_EVENT = "aquarium-clock-look-change";

function subscribeLook(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(LOOK_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(LOOK_EVENT, onChange);
  };
}

function readLook(): LookId {
  const saved = storageGet(STORAGE_KEYS.look);
  return isLookId(saved) ? saved : "classic";
}

/** Aquarium color look (tropical, deep sea, koi, reef). Stored in localStorage. */
export function useLook() {
  const look = useSyncExternalStore(
    subscribeLook,
    readLook,
    () => "classic" as LookId,
  );

  const setLook = (next: LookId) => {
    storageSet(STORAGE_KEYS.look, next);
    window.dispatchEvent(new Event(LOOK_EVENT));
  };

  return {
    look,
    lookLabel: LOOK_LABELS[look],
    fishColors: LOOK_FISH_COLORS[look],
    waterFilter: LOOK_WATER_FILTER[look],
    cycleLook: () => setLook(nextLook(look)),
  };
}
