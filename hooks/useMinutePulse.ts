"use client";

import { useEffect, useRef, useState } from "react";

/** Fires a one-shot pulse when the local minute rolls over. */
export function useMinutePulse(now: Date | null) {
  const [pulse, setPulse] = useState(false);
  const previousMinute = useRef<number | null>(null);

  useEffect(() => {
    if (!now) return;
    const minute = now.getMinutes();
    const previous = previousMinute.current;
    previousMinute.current = minute;

    if (previous === null || previous === minute || now.getSeconds() !== 0) {
      return;
    }

    setPulse(true);
    const id = window.setTimeout(() => setPulse(false), 1800);
    return () => window.clearTimeout(id);
  }, [now]);

  return pulse;
}
