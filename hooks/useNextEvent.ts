"use client";

import { useEffect, useSyncExternalStore } from "react";
import { STORAGE_KEYS } from "@/config/aquarium";
import { storageGet, storageRemove, storageSet } from "@/lib/storage";

export type ClockEvent = {
  label: string;
  at: number;
};

const EVENT_CHANGE = "aquarium-clock-event-change";
const MAX_LABEL = 40;
const OVERDUE_HIDE_MS = 2 * 60 * 1000;

let cachedEvent: ClockEvent | null | undefined;

function subscribeEvent(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(EVENT_CHANGE, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(EVENT_CHANGE, onChange);
  };
}

function sanitizeLabel(label: string): string {
  const trimmed = label.trim().slice(0, MAX_LABEL);
  return trimmed || "Focus ends";
}

function parseStoredEvent(): ClockEvent | null {
  const raw = storageGet(STORAGE_KEYS.event);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<ClockEvent>;
    if (typeof parsed.label !== "string" || typeof parsed.at !== "number") {
      return null;
    }
    if (!Number.isFinite(parsed.at)) return null;
    if (parsed.at < Date.now() - OVERDUE_HIDE_MS) return null;
    return { label: sanitizeLabel(parsed.label), at: parsed.at };
  } catch {
    return null;
  }
}

function sameEvent(a: ClockEvent | null, b: ClockEvent | null): boolean {
  if (a === b) return true;
  if (!a || !b) return false;
  return a.label === b.label && a.at === b.at;
}

/**
 * Must return a stable reference when the stored event has not changed,
 * or React will re-render in a loop and the countdown never settles.
 */
function readEvent(): ClockEvent | null {
  const next = parseStoredEvent();
  if (cachedEvent !== undefined && sameEvent(cachedEvent, next)) {
    return cachedEvent;
  }
  cachedEvent = next;
  return cachedEvent;
}

function writeEvent(event: ClockEvent | null) {
  cachedEvent = event;
  if (!event) {
    storageRemove(STORAGE_KEYS.event);
  } else {
    storageSet(STORAGE_KEYS.event, JSON.stringify(event));
  }
  window.dispatchEvent(new Event(EVENT_CHANGE));
}

/** Next wall-clock time today. Same minute still counts as today, not tomorrow. */
export function nextOccurrence(timeHHmm: string, now: Date): Date {
  const parts = timeHHmm.split(":").map(Number);
  const hours = parts[0] || 0;
  const minutes = parts[1] || 0;
  const next = new Date(now);
  next.setHours(hours, minutes, 0, 0);
  if (next.getTime() < now.getTime() - 60 * 1000) {
    next.setDate(next.getDate() + 1);
  }
  return next;
}

export function formatRemaining(ms: number): string {
  if (ms <= 0) return "now";
  const totalSec = Math.max(1, Math.ceil(ms / 1000));
  const hours = Math.floor(totalSec / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function formatTargetTime(at: number): string {
  return new Date(at).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function setEventAt(label: string, timeHHmm: string, from: Date) {
  writeEvent({
    label: sanitizeLabel(label),
    at: nextOccurrence(timeHHmm, from).getTime(),
  });
}

export function setTimer(
  label: string,
  minutes: number,
  seconds: number,
  from: Date,
) {
  const mins = Number.isFinite(minutes) ? Math.max(0, Math.round(minutes)) : 0;
  const secs = Number.isFinite(seconds) ? Math.max(0, Math.round(seconds)) : 0;
  const totalMs = (mins * 60 + secs) * 1000;
  const duration = Math.min(180 * 60 * 1000, Math.max(5 * 1000, totalMs));
  writeEvent({
    label: sanitizeLabel(label),
    at: from.getTime() + duration,
  });
}

export function clearEvent() {
  writeEvent(null);
}

/**
 * One upcoming named event / alarm, persisted in localStorage.
 * Counts down from the live clock tick.
 */
export function useNextEvent(now: Date | null) {
  const event = useSyncExternalStore(subscribeEvent, readEvent, () => null);

  useEffect(() => {
    if (!event) return;
    if (event.at < Date.now() - OVERDUE_HIDE_MS) {
      clearEvent();
    }
  }, [event]);

  const remainingMs = event && now ? event.at - now.getTime() : null;
  const isDue = remainingMs !== null && remainingMs <= 0;
  const isUpcoming = remainingMs !== null && remainingMs > 0;

  const remainingLabel =
    event && remainingMs !== null
      ? isDue
        ? `${event.label} · now`
        : `${event.label} in ${formatRemaining(remainingMs)}`
      : null;

  return {
    event,
    remainingMs,
    remainingLabel,
    targetTimeLabel: event ? formatTargetTime(event.at) : null,
    isDue,
    isUpcoming,
    setEventAt,
    setTimer,
    clearEvent,
  };
}
