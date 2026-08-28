"use client";

import { useSyncExternalStore } from "react";
import { STORAGE_KEYS } from "@/config/aquarium";
import { storageGet, storageSet } from "@/lib/storage";
import {
  SCENE_LABELS,
  isSceneId,
  nextScene,
  type SceneId,
} from "@/config/scenes";

const SCENE_EVENT = "aquarium-clock-scene-change";

function subscribeScene(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(SCENE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(SCENE_EVENT, onChange);
  };
}

function readScene(): SceneId {
  const saved = storageGet(STORAGE_KEYS.scene);
  return isSceneId(saved) ? saved : "aquarium";
}

/**
 * Backdrop scene (aquarium, beach, space). Preference is stored in localStorage.
 */
export function useScene() {
  const scene = useSyncExternalStore(
    subscribeScene,
    readScene,
    () => "aquarium" as SceneId,
  );

  const setScene = (next: SceneId) => {
    storageSet(STORAGE_KEYS.scene, next);
    window.dispatchEvent(new Event(SCENE_EVENT));
  };

  const cycleScene = () => {
    setScene(nextScene(scene));
  };

  return {
    scene,
    sceneLabel: SCENE_LABELS[scene],
    setScene,
    cycleScene,
  };
}
