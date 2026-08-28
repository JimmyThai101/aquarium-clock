"use client";

import { useEffect, useState } from "react";

/**
 * Hides chrome after a quiet stretch. Movement, taps, or keys bring it back.
 * Pause while a panel that needs the toolbar is open.
 */
export function useIdleUi(paused: boolean, delayMs = 8000) {
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    if (paused) {
      setIdle(false);
      return;
    }

    let timeoutId = 0;
    const bump = () => {
      setIdle(false);
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => setIdle(true), delayMs);
    };

    bump();
    window.addEventListener("mousemove", bump);
    window.addEventListener("pointerdown", bump);
    window.addEventListener("keydown", bump);
    window.addEventListener("touchstart", bump, { passive: true });

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("mousemove", bump);
      window.removeEventListener("pointerdown", bump);
      window.removeEventListener("keydown", bump);
      window.removeEventListener("touchstart", bump);
    };
  }, [paused, delayMs]);

  return idle;
}
