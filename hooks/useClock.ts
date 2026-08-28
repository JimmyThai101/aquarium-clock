"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  STORAGE_KEYS,
  getTimeOfDay,
  type ClockFormat,
  type TimeOfDay,
} from "@/config/aquarium";
import { storageGet, storageSet } from "@/lib/storage";

export type ClockState = {
  /** False until the client has mounted — avoids hydration mismatches. */
  ready: boolean;
  now: Date | null;
  format: ClockFormat;
  timeOfDay: TimeOfDay;
  setFormat: (format: ClockFormat) => void;
  toggleFormat: () => void;
  /** Formatted time string including seconds, or null while loading. */
  timeLabel: string | null;
  /** Formatted date string, or null while loading. */
  dateLabel: string | null;
};

const FORMAT_EVENT = "aquarium-clock-format-change";

function readFormat(): ClockFormat {
  const saved = storageGet(STORAGE_KEYS.format);
  return saved === "12" || saved === "24" ? saved : "12";
}

function subscribeFormat(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(FORMAT_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(FORMAT_EVENT, onChange);
  };
}

function formatTime(date: Date, format: ClockFormat): string {
  if (format === "24") {
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  }

  return date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

function formatDate(date: Date): string {
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function subscribeClockReady(onChange: () => void) {
  // Ready flips once on the client; no ongoing subscription needed.
  void onChange;
  return () => {};
}

/**
 * Tracks local time every second and persists the 12/24-hour preference.
 * Time and storage are only read after mount to avoid hydration errors.
 */
export function useClock(): ClockState {
  const [now, setNow] = useState<Date | null>(null);

  const format = useSyncExternalStore(
    subscribeFormat,
    readFormat,
    () => "12" as ClockFormat,
  );

  const ready = useSyncExternalStore(
    subscribeClockReady,
    () => true,
    () => false,
  );

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const setFormat = (next: ClockFormat) => {
    storageSet(STORAGE_KEYS.format, next);
    window.dispatchEvent(new Event(FORMAT_EVENT));
  };

  const toggleFormat = () => {
    setFormat(format === "12" ? "24" : "12");
  };

  return {
    ready,
    now,
    format,
    timeOfDay: now ? getTimeOfDay(now) : "afternoon",
    setFormat,
    toggleFormat,
    timeLabel: ready && now ? formatTime(now, format) : null,
    dateLabel: ready && now ? formatDate(now) : null,
  };
}
