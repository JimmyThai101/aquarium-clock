"use client";

import { useId, useState, type FormEvent } from "react";
import type { ClockEvent } from "@/hooks/useNextEvent";

type EventMode = "at" | "timer";

type EventPanelProps = {
  event: ClockEvent | null;
  now: Date | null;
  targetTimeLabel: string | null;
  onSetAt: (label: string, timeHHmm: string, from: Date) => void;
  onSetTimer: (label: string, minutes: number, from: Date) => void;
  onClear: () => void;
  onClose: () => void;
};

function defaultTimeValue(now: Date | null): string {
  const date = now ? new Date(now.getTime() + 60 * 60 * 1000) : new Date();
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

/**
 * Set a named event at a wall-clock time, or a countdown timer.
 */
export function EventPanel({
  event,
  now,
  targetTimeLabel,
  onSetAt,
  onSetTimer,
  onClear,
  onClose,
}: EventPanelProps) {
  const labelId = useId();
  const [mode, setMode] = useState<EventMode>("timer");
  const [label, setLabel] = useState(event?.label ?? "Focus ends");
  const [timeValue, setTimeValue] = useState(defaultTimeValue(now));
  const [minutes, setMinutes] = useState(25);

  const handleSubmit = (formEvent: FormEvent) => {
    formEvent.preventDefault();
    const from = now ?? new Date();
    if (mode === "at") {
      onSetAt(label, timeValue, from);
    } else {
      onSetTimer(label, minutes, from);
    }
    onClose();
  };

  return (
    <form
      className="event-panel"
      onSubmit={handleSubmit}
      aria-label="Set next event"
    >
      <p className="event-panel-title">Next event</p>
      {event && targetTimeLabel ? (
        <p className="event-panel-current">Set for {targetTimeLabel}</p>
      ) : (
        <p className="event-panel-current">No event yet</p>
      )}

      <label className="event-field" htmlFor={labelId}>
        Name
        <input
          id={labelId}
          className="event-input"
          value={label}
          onChange={(change) => setLabel(change.target.value)}
          maxLength={40}
          autoComplete="off"
          placeholder="Focus ends"
        />
      </label>

      <div className="event-mode" role="group" aria-label="Event type">
        <button
          type="button"
          className="event-mode-btn"
          aria-pressed={mode === "timer"}
          onClick={() => setMode("timer")}
        >
          Timer
        </button>
        <button
          type="button"
          className="event-mode-btn"
          aria-pressed={mode === "at"}
          onClick={() => setMode("at")}
        >
          At time
        </button>
      </div>

      {mode === "timer" ? (
        <label className="event-field">
          Minutes
          <input
            className="event-input"
            type="number"
            min={1}
            max={180}
            value={minutes}
            onChange={(change) => setMinutes(Number(change.target.value))}
          />
        </label>
      ) : (
        <label className="event-field">
          Time
          <input
            className="event-input"
            type="time"
            value={timeValue}
            onChange={(change) => setTimeValue(change.target.value)}
            required
          />
        </label>
      )}

      <div className="event-actions">
        <button type="submit" className="clock-btn event-action-btn">
          Set
        </button>
        {event ? (
          <button
            type="button"
            className="clock-btn event-action-btn"
            onClick={() => {
              onClear();
              onClose();
            }}
          >
            Clear
          </button>
        ) : (
          <button
            type="button"
            className="clock-btn event-action-btn"
            onClick={onClose}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
