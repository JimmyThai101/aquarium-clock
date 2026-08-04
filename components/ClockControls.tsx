import type { ClockFormat, LightingMode } from "@/config/aquarium";
import { LIGHTING_MODE_LABELS } from "@/config/aquarium";

type ClockControlsProps = {
  format: ClockFormat;
  onToggleFormat: () => void;
  lightingMode: LightingMode;
  onCycleLighting: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
};

const buttonClass =
  "clock-btn focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200";

/**
 * Toolbar for format, lighting, fullscreen, and reduced-motion preferences.
 * Buttons stay large enough for touch on phones.
 */
export function ClockControls({
  format,
  onToggleFormat,
  lightingMode,
  onCycleLighting,
  isFullscreen,
  onToggleFullscreen,
  reducedMotion,
  onToggleReducedMotion,
}: ClockControlsProps) {
  return (
    <div className="clock-controls" role="toolbar" aria-label="Clock settings">
      <button
        type="button"
        className={buttonClass}
        onClick={onToggleFormat}
        aria-pressed={format === "24"}
        aria-label={
          format === "12"
            ? "Switch to 24-hour time format"
            : "Switch to 12-hour time format"
        }
      >
        {format === "12" ? "24-hour" : "12-hour"}
      </button>

      <button
        type="button"
        className={buttonClass}
        onClick={onCycleLighting}
        aria-label={`Lighting mode: ${LIGHTING_MODE_LABELS[lightingMode]}. Click to change.`}
      >
        {LIGHTING_MODE_LABELS[lightingMode]}
      </button>

      <button
        type="button"
        className={buttonClass}
        onClick={onToggleFullscreen}
        aria-pressed={isFullscreen}
        aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      >
        {isFullscreen ? "Exit full" : "Fullscreen"}
      </button>

      <button
        type="button"
        className={buttonClass}
        onClick={onToggleReducedMotion}
        aria-pressed={reducedMotion}
        aria-label={
          reducedMotion
            ? "Enable aquarium animations"
            : "Reduce aquarium motion"
        }
      >
        {reducedMotion ? "Motion on" : "Less motion"}
      </button>
    </div>
  );
}
