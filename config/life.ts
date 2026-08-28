export const FEEDING_HOURS = [8, 18] as const;

export const WORLD_CLOCKS = [
  { city: "London", timeZone: "Europe/London" },
  { city: "New York", timeZone: "America/New_York" },
  { city: "Tokyo", timeZone: "Asia/Tokyo" },
] as const;

export const JELLYFISH = [
  { id: "j1", left: 18, depth: 28, size: 54, duration: 9, delay: 0, opacity: 0.45 },
  { id: "j2", left: 62, depth: 42, size: 40, duration: 11, delay: -4, opacity: 0.38 },
  { id: "j3", left: 78, depth: 22, size: 32, duration: 13, delay: -7, opacity: 0.32 },
] as const;

export const TURTLE = {
  depth: 58,
  size: 92,
  duration: 110,
  delay: -20,
} as const;

export const CRAB = {
  bottom: 7,
  size: 28,
  duration: 22,
} as const;

export const AQUARIUM_STARS = [
  { id: "as1", left: 8, top: 5, size: 2, duration: 3.1, delay: 0 },
  { id: "as2", left: 18, top: 9, size: 1, duration: 4, delay: -1 },
  { id: "as3", left: 29, top: 4, size: 2, duration: 2.6, delay: -0.5 },
  { id: "as4", left: 41, top: 11, size: 1, duration: 3.4, delay: -1.4 },
  { id: "as5", left: 55, top: 6, size: 2, duration: 2.8, delay: -0.2 },
  { id: "as6", left: 68, top: 10, size: 1, duration: 3.8, delay: -1.8 },
  { id: "as7", left: 79, top: 3, size: 2, duration: 2.4, delay: -0.7 },
  { id: "as8", left: 88, top: 8, size: 1, duration: 3.2, delay: -1.1 },
  { id: "as9", left: 12, top: 14, size: 1, duration: 4.2, delay: -2 },
  { id: "as10", left: 48, top: 2, size: 2, duration: 2.9, delay: -0.4 },
] as const;

export const CORAL = [
  { id: "co1", left: 22, height: 52, color: "#d46a6a" },
  { id: "co2", left: 28, height: 38, color: "#e8a87c" },
  { id: "co3", left: 64, height: 44, color: "#c97b84" },
] as const;
