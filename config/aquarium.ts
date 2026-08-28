/**
 * Centralized aquarium animation settings.
 * Edit fish, bubbles, plants, particles, colors, and speeds here.
 */

export type TimeOfDay = "morning" | "afternoon" | "evening" | "night";

export type FishConfig = {
  id: string;
  /** Body length in pixels (approximate). */
  size: number;
  /** Vertical position as a percentage of aquarium height (0 = top). */
  depth: number;
  /** Seconds to swim across the screen once. Higher = slower. */
  duration: number;
  /** 1 = left-to-right, -1 = right-to-left. */
  direction: 1 | -1;
  /** Animation start delay in seconds. */
  delay: number;
  /** Main body fill color. */
  color: string;
  /** Accent / fin color. */
  accent: string;
  /** Subtle vertical bob amplitude in pixels. */
  bob: number;
};

export type BubbleConfig = {
  id: string;
  /** Horizontal position as a percentage. */
  left: number;
  /** Bubble diameter in pixels. */
  size: number;
  /** Seconds for one rise cycle. Higher = slower. */
  duration: number;
  /** Animation start delay in seconds. */
  delay: number;
  /** Opacity from 0 to 1. */
  opacity: number;
};

export type PlantConfig = {
  id: string;
  /** Horizontal position as a percentage. */
  left: number;
  /** Plant height in pixels. */
  height: number;
  /** Plant width in pixels. */
  width: number;
  /** Seconds for one sway cycle. */
  duration: number;
  /** Animation start delay in seconds. */
  delay: number;
  /** Base green fill. */
  color: string;
  /** Sway rotation in degrees (peak). */
  sway: number;
};

export type ParticleConfig = {
  id: string;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
};

export type LightRayConfig = {
  id: string;
  left: number;
  width: number;
  skew: number;
  opacity: number;
  duration: number;
  delay: number;
};

/** Lighting themes keyed by local time of day — cool blue / chill palette. */
export const TIME_OF_DAY_THEMES: Record<
  TimeOfDay,
  {
    label: string;
    waterTop: string;
    waterMid: string;
    waterBottom: string;
    glow: string;
    sand: string;
  }
> = {
  morning: {
    label: "Morning",
    waterTop: "#7ec8e3",
    waterMid: "#3a8fb5",
    waterBottom: "#1a4f6e",
    glow: "rgba(200, 235, 255, 0.32)",
    sand: "#6b9aaa",
  },
  afternoon: {
    label: "Afternoon",
    waterTop: "#4db8d9",
    waterMid: "#2a7fa8",
    waterBottom: "#124860",
    glow: "rgba(170, 230, 255, 0.28)",
    sand: "#5a8a9c",
  },
  evening: {
    label: "Evening",
    waterTop: "#4a7fa8",
    waterMid: "#2a4f72",
    waterBottom: "#152840",
    glow: "rgba(140, 190, 230, 0.18)",
    sand: "#4a6a7c",
  },
  night: {
    label: "Night",
    waterTop: "#243a58",
    waterMid: "#152838",
    waterBottom: "#0a121c",
    glow: "rgba(100, 170, 220, 0.14)",
    sand: "#2f4554",
  },
};

/** Lighting can follow local time or stay locked to a period. */
export type LightingMode = "auto" | TimeOfDay;

export const LIGHTING_MODE_ORDER: LightingMode[] = [
  "auto",
  "morning",
  "afternoon",
  "evening",
  "night",
];

export const LIGHTING_MODE_LABELS: Record<LightingMode, string> = {
  auto: "Auto light",
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
  night: "Night",
};

/**
 * Returns the time-of-day key for a local Date.
 * Morning 5–11, Afternoon 11–17, Evening 17–21, Night otherwise.
 */
export function getTimeOfDay(date: Date): TimeOfDay {
  const hour = date.getHours();
  if (hour >= 5 && hour < 11) return "morning";
  if (hour >= 11 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 21) return "evening";
  return "night";
}

/** Fish swimming at different depths, speeds, sizes, and directions. */
export const FISH: FishConfig[] = [
  {
    id: "fish-1",
    size: 52,
    depth: 18,
    duration: 38,
    direction: 1,
    delay: 0,
    color: "#8fd3f4",
    accent: "#4aa8d8",
    bob: 6,
  },
  {
    id: "fish-2",
    size: 36,
    depth: 32,
    duration: 48,
    direction: -1,
    delay: -12,
    color: "#7ee0c8",
    accent: "#3cb89a",
    bob: 4,
  },
  {
    id: "fish-3",
    size: 44,
    depth: 48,
    duration: 55,
    direction: 1,
    delay: -25,
    color: "#9bb8ff",
    accent: "#6a88e0",
    bob: 8,
  },
  {
    id: "fish-4",
    size: 28,
    depth: 62,
    duration: 42,
    direction: -1,
    delay: -8,
    color: "#b8f0e0",
    accent: "#5cc4b0",
    bob: 5,
  },
  {
    id: "fish-5",
    size: 60,
    depth: 72,
    duration: 62,
    direction: 1,
    delay: -30,
    color: "#6ec9e8",
    accent: "#3a9fc4",
    bob: 7,
  },
  {
    id: "fish-6",
    size: 32,
    depth: 24,
    duration: 70,
    direction: -1,
    delay: -40,
    color: "#a8d4f0",
    accent: "#5a9ec8",
    bob: 4,
  },
];

/** Rising bubbles. */
export const BUBBLES: BubbleConfig[] = [
  { id: "b1", left: 8, size: 6, duration: 14, delay: 0, opacity: 0.35 },
  { id: "b2", left: 18, size: 10, duration: 18, delay: -3, opacity: 0.28 },
  { id: "b3", left: 28, size: 5, duration: 12, delay: -7, opacity: 0.4 },
  { id: "b4", left: 42, size: 8, duration: 16, delay: -2, opacity: 0.3 },
  { id: "b5", left: 55, size: 4, duration: 20, delay: -9, opacity: 0.25 },
  { id: "b6", left: 67, size: 9, duration: 15, delay: -5, opacity: 0.32 },
  { id: "b7", left: 78, size: 6, duration: 17, delay: -11, opacity: 0.28 },
  { id: "b8", left: 88, size: 7, duration: 13, delay: -4, opacity: 0.36 },
  { id: "b9", left: 35, size: 5, duration: 19, delay: -14, opacity: 0.22 },
  { id: "b10", left: 72, size: 4, duration: 22, delay: -6, opacity: 0.2 },
];

/** Gently swaying seaweed / plants along the sand. */
export const PLANTS: PlantConfig[] = [
  {
    id: "p1",
    left: 6,
    height: 140,
    width: 28,
    duration: 7,
    delay: 0,
    color: "#2d8f7a",
    sway: 8,
  },
  {
    id: "p2",
    left: 14,
    height: 100,
    width: 22,
    duration: 9,
    delay: -2,
    color: "#247a68",
    sway: 10,
  },
  {
    id: "p3",
    left: 48,
    height: 120,
    width: 26,
    duration: 8,
    delay: -1.5,
    color: "#348f7c",
    sway: 7,
  },
  {
    id: "p4",
    left: 58,
    height: 90,
    width: 20,
    duration: 10,
    delay: -3,
    color: "#1f6b5a",
    sway: 9,
  },
  {
    id: "p5",
    left: 82,
    height: 150,
    width: 30,
    duration: 6.5,
    delay: -0.5,
    color: "#2a8572",
    sway: 11,
  },
  {
    id: "p6",
    left: 90,
    height: 110,
    width: 24,
    duration: 8.5,
    delay: -2.5,
    color: "#216b5c",
    sway: 8,
  },
];

/** Soft floating particles (plankton / silt). */
export const PARTICLES: ParticleConfig[] = [
  { id: "pt1", left: 12, top: 20, size: 2, duration: 24, delay: 0, opacity: 0.35 },
  { id: "pt2", left: 25, top: 45, size: 3, duration: 28, delay: -5, opacity: 0.25 },
  { id: "pt3", left: 40, top: 15, size: 2, duration: 22, delay: -10, opacity: 0.3 },
  { id: "pt4", left: 55, top: 60, size: 2, duration: 30, delay: -3, opacity: 0.2 },
  { id: "pt5", left: 70, top: 30, size: 3, duration: 26, delay: -8, opacity: 0.28 },
  { id: "pt6", left: 85, top: 50, size: 2, duration: 32, delay: -12, opacity: 0.22 },
  { id: "pt7", left: 33, top: 70, size: 2, duration: 27, delay: -6, opacity: 0.18 },
  { id: "pt8", left: 62, top: 25, size: 2, duration: 25, delay: -15, opacity: 0.3 },
];

/** Subtle underwater light rays from the surface. */
export const LIGHT_RAYS: LightRayConfig[] = [
  { id: "lr1", left: 15, width: 80, skew: -12, opacity: 0.12, duration: 10, delay: 0 },
  { id: "lr2", left: 38, width: 60, skew: -8, opacity: 0.1, duration: 12, delay: -3 },
  { id: "lr3", left: 58, width: 90, skew: -14, opacity: 0.08, duration: 14, delay: -6 },
  { id: "lr4", left: 78, width: 50, skew: -6, opacity: 0.11, duration: 11, delay: -2 },
];

export const STORAGE_KEYS = {
  format: "aquarium-clock-format",
  reducedMotion: "aquarium-clock-reduced-motion",
  lighting: "aquarium-clock-lighting",
  scene: "aquarium-clock-scene",
  event: "aquarium-clock-event",
  look: "aquarium-clock-look",
  sound: "aquarium-clock-sound",
} as const;

export type ClockFormat = "12" | "24";

export function isLightingMode(value: string | null): value is LightingMode {
  return (
    value === "auto" ||
    value === "morning" ||
    value === "afternoon" ||
    value === "evening" ||
    value === "night"
  );
}

export function nextLightingMode(current: LightingMode): LightingMode {
  const index = LIGHTING_MODE_ORDER.indexOf(current);
  return LIGHTING_MODE_ORDER[(index + 1) % LIGHTING_MODE_ORDER.length];
}
