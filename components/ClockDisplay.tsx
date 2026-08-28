import type { ClockFormat } from "@/config/aquarium";
import { WORLD_CLOCKS } from "@/config/life";

type ClockDisplayProps = {
  ready: boolean;
  now: Date | null;
  timeLabel: string | null;
  dateLabel: string | null;
  timeOfDayLabel: string;
  format: ClockFormat;
  eventLabel: string | null;
  eventIsDue: boolean;
  minutePulse: boolean;
  onDismissEvent: () => void;
};

function worldTime(now: Date, timeZone: string, format: ClockFormat): string {
  try {
    return now.toLocaleTimeString(undefined, {
      hour: format === "12" ? "numeric" : "2-digit",
      minute: "2-digit",
      hour12: format === "12",
      timeZone,
    });
  } catch {
    return "--";
  }
}

const RING_LENGTH = 100;

/**
 * Large readable clock in a glass tank pane.
 * Shows a calm loading state until client time is available.
 */
export function ClockDisplay({
  ready,
  now,
  timeLabel,
  dateLabel,
  timeOfDayLabel,
  format,
  eventLabel,
  eventIsDue,
  minutePulse,
  onDismissEvent,
}: ClockDisplayProps) {
  const seconds = now?.getSeconds() ?? 0;
  const ringOffset = RING_LENGTH - (seconds / 60) * RING_LENGTH;

  return (
    <div
      className={`clock-display${eventIsDue ? " clock-display--due" : ""}${minutePulse ? " clock-display--minute" : ""}`}
    >
      <span className="clock-tank-shine" aria-hidden="true" />
      <span className="clock-waterline" aria-hidden="true" />
      <span className="clock-droplet clock-droplet--a" aria-hidden="true" />
      <span className="clock-droplet clock-droplet--b" aria-hidden="true" />
      <span className="clock-droplet clock-droplet--c" aria-hidden="true" />
      <span className="clock-minute-ripple" aria-hidden="true" />

      <svg className="clock-second-ring" viewBox="0 0 100 100" aria-hidden="true">
        <rect
          className="clock-second-ring-track"
          x="2.5"
          y="2.5"
          width="95"
          height="95"
          rx="14"
          pathLength={RING_LENGTH}
        />
        <rect
          className="clock-second-ring-progress"
          x="2.5"
          y="2.5"
          width="95"
          height="95"
          rx="14"
          pathLength={RING_LENGTH}
          style={{
            strokeDasharray: `${RING_LENGTH}`,
            strokeDashoffset: ringOffset,
            transition:
              seconds === 0 ? "none" : "stroke-dashoffset 1s linear",
          }}
        />
      </svg>

      <p className="clock-brand">Aquarium Clock</p>

      {ready && timeLabel && dateLabel ? (
        <>
          <p className="clock-time" aria-live="polite" aria-atomic="true">
            {timeLabel}
          </p>
          <p className="clock-date">{dateLabel}</p>
          <p className="clock-period">{timeOfDayLabel}</p>
          {now ? (
            <ul className="clock-worlds">
              {WORLD_CLOCKS.map((zone) => (
                <li key={zone.timeZone}>
                  <span>{zone.city}</span>
                  <strong>{worldTime(now, zone.timeZone, format)}</strong>
                </li>
              ))}
            </ul>
          ) : null}
          {eventLabel ? (
            <p
              className={`clock-event${eventIsDue ? " clock-event--due" : ""}`}
              aria-live={eventIsDue ? "assertive" : "off"}
            >
              {eventLabel}
              {eventIsDue ? (
                <button
                  type="button"
                  className="clock-event-dismiss"
                  onClick={onDismissEvent}
                >
                  Dismiss
                </button>
              ) : null}
            </p>
          ) : null}
        </>
      ) : (
        <div className="clock-loading" role="status" aria-live="polite">
          <span className="clock-loading-pulse" aria-hidden="true" />
          <span>Preparing clock…</span>
        </div>
      )}
    </div>
  );
}
