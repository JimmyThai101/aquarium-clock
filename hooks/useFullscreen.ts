"use client";

import { useSyncExternalStore } from "react";

function subscribeFullscreen(onChange: () => void) {
  document.addEventListener("fullscreenchange", onChange);
  return () => document.removeEventListener("fullscreenchange", onChange);
}

function readFullscreen() {
  return Boolean(document.fullscreenElement);
}

/**
 * Tracks the Fullscreen API without reading it during the first render,
 * so server and client markup stay in sync.
 */
export function useFullscreen() {
  const isFullscreen = useSyncExternalStore(
    subscribeFullscreen,
    readFullscreen,
    () => false,
  );

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await document.documentElement.requestFullscreen();
      }
    } catch {
      // Fullscreen can fail on unsupported browsers or denied permissions.
    }
  };

  return { isFullscreen, toggleFullscreen };
}
