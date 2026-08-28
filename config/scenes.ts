import type { TimeOfDay } from "@/config/aquarium";

export type SceneId = "aquarium" | "beach" | "space";

export const SCENE_ORDER: SceneId[] = ["aquarium", "beach", "space"];

export const SCENE_LABELS: Record<SceneId, string> = {
  aquarium: "Aquarium",
  beach: "Beach",
  space: "Space",
};

export function isSceneId(value: string | null): value is SceneId {
  return value === "aquarium" || value === "beach" || value === "space";
}

export function nextScene(current: SceneId): SceneId {
  const index = SCENE_ORDER.indexOf(current);
  return SCENE_ORDER[(index + 1) % SCENE_ORDER.length];
}

export function sceneClassName(
  base: string,
  reducedMotion: boolean,
  motionReady: boolean,
): string {
  if (!motionReady) return base;
  return `${base} ${reducedMotion ? `${base}--reduced-motion` : `${base}--allow-motion`}`;
}

export const BEACH_THEMES: Record<
  TimeOfDay,
  {
    skyTop: string;
    skyMid: string;
    skyHorizon: string;
    water: string;
    waterDeep: string;
    sand: string;
    glow: string;
    sun: string;
  }
> = {
  morning: {
    skyTop: "#7eb7e0",
    skyMid: "#f4c9a8",
    skyHorizon: "#ffe7c4",
    water: "#3a9ec4",
    waterDeep: "#1c6a88",
    sand: "#e6d0a4",
    glow: "rgba(255, 196, 140, 0.5)",
    sun: "#ffd39a",
  },
  afternoon: {
    skyTop: "#4ea4e0",
    skyMid: "#87c8ef",
    skyHorizon: "#d7f0ff",
    water: "#2a8fbf",
    waterDeep: "#16607e",
    sand: "#edd9a8",
    glow: "rgba(255, 245, 210, 0.45)",
    sun: "#ffe27a",
  },
  evening: {
    skyTop: "#2a3d72",
    skyMid: "#e07a5a",
    skyHorizon: "#f4b183",
    water: "#2a5f86",
    waterDeep: "#16344c",
    sand: "#c9a078",
    glow: "rgba(255, 140, 80, 0.4)",
    sun: "#ffb36b",
  },
  night: {
    skyTop: "#0b1224",
    skyMid: "#15203c",
    skyHorizon: "#243454",
    water: "#16324a",
    waterDeep: "#0b1a28",
    sand: "#6b5a42",
    glow: "rgba(160, 200, 255, 0.18)",
    sun: "#f0f4ff",
  },
};

export const SPACE_THEMES: Record<
  TimeOfDay,
  {
    skyTop: string;
    skyMid: string;
    skyBottom: string;
    nebulaA: string;
    nebulaB: string;
    glow: string;
    planet: string;
    planetAccent: string;
  }
> = {
  morning: {
    skyTop: "#14244a",
    skyMid: "#1a2a4e",
    skyBottom: "#0c1428",
    nebulaA: "rgba(90, 170, 255, 0.28)",
    nebulaB: "rgba(120, 90, 220, 0.2)",
    glow: "rgba(160, 210, 255, 0.22)",
    planet: "#7ec8e8",
    planetAccent: "#4a9cc4",
  },
  afternoon: {
    skyTop: "#1a1640",
    skyMid: "#22184a",
    skyBottom: "#100c28",
    nebulaA: "rgba(120, 90, 255, 0.28)",
    nebulaB: "rgba(80, 180, 255, 0.18)",
    glow: "rgba(190, 170, 255, 0.2)",
    planet: "#9bb0ff",
    planetAccent: "#6a7ee0",
  },
  evening: {
    skyTop: "#2a1038",
    skyMid: "#1c0c28",
    skyBottom: "#0c0614",
    nebulaA: "rgba(220, 80, 140, 0.28)",
    nebulaB: "rgba(120, 50, 200, 0.22)",
    glow: "rgba(255, 140, 180, 0.16)",
    planet: "#e8a0c0",
    planetAccent: "#c46898",
  },
  night: {
    skyTop: "#070816",
    skyMid: "#0b0d1c",
    skyBottom: "#04040c",
    nebulaA: "rgba(70, 90, 180, 0.2)",
    nebulaB: "rgba(40, 20, 80, 0.22)",
    glow: "rgba(140, 170, 255, 0.12)",
    planet: "#6a7aa8",
    planetAccent: "#3e4c78",
  },
};

export const BEACH_CLOUDS = [
  { id: "c1", left: 8, top: 12, width: 160, duration: 28, delay: 0, opacity: 0.55 },
  { id: "c2", left: 42, top: 8, width: 210, duration: 34, delay: -8, opacity: 0.4 },
  { id: "c3", left: 72, top: 16, width: 140, duration: 30, delay: -14, opacity: 0.5 },
] as const;

export const BEACH_BIRDS = [
  { id: "g1", top: 22, duration: 42, delay: 0, size: 28 },
  { id: "g2", top: 28, duration: 55, delay: -18, size: 22 },
  { id: "g3", top: 18, duration: 48, delay: -30, size: 20 },
] as const;

export const SPACE_STARS = [
  { id: "s1", left: 6, top: 10, size: 2, duration: 3.2, delay: 0, opacity: 0.9 },
  { id: "s2", left: 14, top: 22, size: 1, duration: 4.1, delay: -1, opacity: 0.55 },
  { id: "s3", left: 22, top: 8, size: 2, duration: 2.8, delay: -0.4, opacity: 0.8 },
  { id: "s4", left: 31, top: 28, size: 1, duration: 3.6, delay: -1.6, opacity: 0.45 },
  { id: "s5", left: 38, top: 14, size: 3, duration: 2.4, delay: -0.8, opacity: 0.95 },
  { id: "s6", left: 47, top: 6, size: 1, duration: 4.4, delay: -2, opacity: 0.5 },
  { id: "s7", left: 55, top: 18, size: 2, duration: 3.1, delay: -0.2, opacity: 0.75 },
  { id: "s8", left: 63, top: 11, size: 1, duration: 3.8, delay: -1.2, opacity: 0.4 },
  { id: "s9", left: 71, top: 24, size: 2, duration: 2.6, delay: -0.6, opacity: 0.85 },
  { id: "s10", left: 79, top: 9, size: 1, duration: 4, delay: -1.8, opacity: 0.5 },
  { id: "s11", left: 86, top: 20, size: 2, duration: 3.3, delay: -0.3, opacity: 0.7 },
  { id: "s12", left: 92, top: 13, size: 1, duration: 2.9, delay: -1.4, opacity: 0.6 },
  { id: "s13", left: 10, top: 40, size: 1, duration: 3.7, delay: -2.2, opacity: 0.45 },
  { id: "s14", left: 28, top: 48, size: 2, duration: 2.5, delay: -0.7, opacity: 0.8 },
  { id: "s15", left: 44, top: 36, size: 1, duration: 4.2, delay: -1.1, opacity: 0.5 },
  { id: "s16", left: 58, top: 44, size: 2, duration: 3.4, delay: -0.5, opacity: 0.72 },
  { id: "s17", left: 74, top: 38, size: 1, duration: 2.7, delay: -1.9, opacity: 0.42 },
  { id: "s18", left: 88, top: 50, size: 2, duration: 3.9, delay: -0.9, opacity: 0.68 },
  { id: "s19", left: 18, top: 62, size: 1, duration: 3, delay: -1.5, opacity: 0.48 },
  { id: "s20", left: 36, top: 70, size: 2, duration: 2.3, delay: -0.1, opacity: 0.78 },
  { id: "s21", left: 52, top: 58, size: 1, duration: 4.5, delay: -2.4, opacity: 0.4 },
  { id: "s22", left: 67, top: 66, size: 3, duration: 2.2, delay: -0.35, opacity: 0.9 },
  { id: "s23", left: 83, top: 72, size: 1, duration: 3.5, delay: -1.7, opacity: 0.52 },
  { id: "s24", left: 4, top: 74, size: 2, duration: 2.8, delay: -0.55, opacity: 0.66 },
] as const;
