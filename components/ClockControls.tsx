import type { ClockFormat, LightingMode } from "@/config/aquarium";
import { LIGHTING_MODE_LABELS } from "@/config/aquarium";

type ClockControlsProps = {
  format: ClockFormat;
  onToggleFormat: () => void;
  lightingMode: LightingMode;
  onCycleLighting: () => void;
  sceneLabel: string;
  onCycleScene: () => void;
  lookLabel: string;
  onCycleLook: () => void;
  eventPanelOpen: boolean;
  hasEvent: boolean;
  onToggleEventPanel: () => void;
  soundOn: boolean;
  onToggleSound: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  hidden: boolean;
};

const buttonClass =
  "clock-btn focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200";

/**
 * Toolbar for scene, look, format, lighting, event, sound, fullscreen, and motion.
 * Buttons stay large enough for touch on phones.
 */
export function ClockControls({
  format,
  onToggleFormat,
  lightingMode,
  onCycleLighting,
  sceneLabel,
  onCycleScene,
  lookLabel,
  onCycleLook,
  eventPanelOpen,
  hasEvent,
  onToggleEventPanel,
  soundOn,
  onToggleSound,
  isFullscreen,
  onToggleFullscreen,
  reducedMotion,
  onToggleReducedMotion,
  hidden,
}: ClockControlsProps) {
  return (
    <div
      className={`clock-controls${hidden ? " clock-controls--hidden" : ""}`}
      role="toolbar"
      aria-label="Clock settings"
      aria-hidden={hidden}
    >
      <button
        type="button"
        className={buttonClass}
        onClick={onCycleScene}
        aria-label={`Scene: ${sceneLabel}. Click to change.`}
        tabIndex={hidden ? -1 : 0}
      >
        {sceneLabel}
      </button>

      <button
        type="button"
        className={buttonClass}
        onClick={onCycleLook}
        aria-label={`Look: ${lookLabel}. Click to change.`}
        tabIndex={hidden ? -1 : 0}
      >
        {lookLabel}
      </button>

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
        tabIndex={hidden ? -1 : 0}
      >
        {format === "12" ? "24-hour" : "12-hour"}
      </button>

      <button
        type="button"
        className={buttonClass}
        onClick={onCycleLighting}
        aria-label={`Lighting mode: ${LIGHTING_MODE_LABELS[lightingMode]}. Click to change.`}
        tabIndex={hidden ? -1 : 0}
      >
        {LIGHTING_MODE_LABELS[lightingMode]}
      </button>

      <button
        type="button"
        className={buttonClass}
        onClick={onToggleEventPanel}
        aria-pressed={eventPanelOpen}
        aria-expanded={eventPanelOpen}
        aria-label="Set or edit the next event"
        tabIndex={hidden ? -1 : 0}
      >
        {hasEvent ? "Edit event" : "Event"}
      </button>

      <button
        type="button"
        className={buttonClass}
        onClick={onToggleSound}
        aria-pressed={soundOn}
        aria-label={soundOn ? "Mute ambient sound" : "Play ambient sound"}
        tabIndex={hidden ? -1 : 0}
      >
        {soundOn ? "Sound on" : "Sound"}
      </button>

      <button
        type="button"
        className={buttonClass}
        onClick={onToggleFullscreen}
        aria-pressed={isFullscreen}
        aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        tabIndex={hidden ? -1 : 0}
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
            ? "Enable scene animations"
            : "Reduce scene motion"
        }
        tabIndex={hidden ? -1 : 0}
      >
        {reducedMotion ? "Motion on" : "Less motion"}
      </button>
    </div>
  );
}
