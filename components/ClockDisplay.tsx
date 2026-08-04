type ClockDisplayProps = {
  ready: boolean;
  timeLabel: string | null;
  dateLabel: string | null;
  timeOfDayLabel: string;
};

/**
 * Large readable clock over the aquarium.
 * Shows a calm loading state until client time is available.
 */
export function ClockDisplay({
  ready,
  timeLabel,
  dateLabel,
  timeOfDayLabel,
}: ClockDisplayProps) {
  return (
    <div className="clock-display">
      <p className="clock-brand">Aquarium Clock</p>

      {ready && timeLabel && dateLabel ? (
        <>
          <p className="clock-time" aria-live="polite" aria-atomic="true">
            {timeLabel}
          </p>
          <p className="clock-date">{dateLabel}</p>
          <p className="clock-period">{timeOfDayLabel}</p>
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
