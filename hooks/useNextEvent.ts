"use client";

import { useSyncExternalStore } from "react";
import { STORAGE_KEYS } from "@/config/aquarium";

export type ClockEvent = {
  label: string;
  at: number;
};

const EVENT_CHANGE = "aquarium-clock-event-change";
const MAX_LABEL = 40;
const STALE_AFTER_MS = 24 * 60 * 60 * 1000;

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

function readEvent(): ClockEvent | null {
  const raw = window.localStorage.getItem(STORAGE_KEYS.event);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<ClockEvent>;
    if (typeof parsed.label !== "string" || typeof parsed.at !== "number") {
      return null;
    }
    if (!Number.isFinite(parsed.at)) return null;
    if (Date.now() - parsed.at > STALE_AFTER_MS) {
      return null;
    }
    return { label: sanitizeLabel(parsed.label), at: parsed.at };
  } catch {
    return null;
  }
}

function writeEvent(event: ClockEvent | null) {
  if (!event) {
    window.localStorage.removeItem(STORAGE_KEYS.event);
  } else {
    window.localStorage.setItem(STORAGE_KEYS.event, JSON.stringify(event));
  }
  window.dispatchEvent(new Event(EVENT_CHANGE));
}

/** Next wall-clock time today, or tomorrow if that time already passed. */
export function nextOccurrence(timeHHmm: string, now: Date): Date {
  const [hours, minutes] = timeHHmm.split(":").map(Number);
  const next = new Date(now);
  next.setHours(hours || 0, minutes || 0, 0, 0);
  if (next.getTime() <= now.getTime()) {
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

/**
 * One upcoming named event / alarm, persisted in localStorage.
 * Counts down from the live clock tick.
 */
export function useNextEvent(now: Date | null) {
  const event = useSyncExternalStore(subscribeEvent, readEvent, () => null);

  const remainingMs = event && now ? event.at - now.getTime() : null;
  const isDue = remainingMs !== null && remainingMs <= 0;
  const isUpcoming = remainingMs !== null && remainingMs > 0;

  const remainingLabel =
    event && remainingMs !== null
      ? isDue
        ? `${event.label} · now`
        : `${event.label} in ${formatRemaining(remainingMs)}`
      : null;

  const setEventAt = (label: string, timeHHmm: string, from: Date) => {
    writeEvent({
      label: sanitizeLabel(label),
      at: nextOccurrence(timeHHmm, from).getTime(),
    });
  };

  const setTimer = (label: string, minutes: number, from: Date) => {
    const clamped = Math.min(180, Math.max(1, Math.round(minutes)));
    if (!Number.isFinite(clamped)) return;
    writeEvent({
      label: sanitizeLabel(label),
      at: from.getTime() + clamped * 60 * 1000,
    });
  };

  const clearEvent = () => {
    writeEvent(null);
  };

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
