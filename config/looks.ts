export type LookId = "classic" | "tropical" | "deep-sea" | "koi" | "reef";

export const LOOK_ORDER: LookId[] = [
  "classic",
  "tropical",
  "deep-sea",
  "koi",
  "reef",
];

export const LOOK_LABELS: Record<LookId, string> = {
  classic: "Classic",
  tropical: "Tropical",
  "deep-sea": "Deep sea",
  koi: "Koi pond",
  reef: "Coral reef",
};

/** CSS filter applied to the aquarium water when a look is selected. */
export const LOOK_WATER_FILTER: Record<LookId, string> = {
  classic: "none",
  tropical: "hue-rotate(-18deg) saturate(1.28)",
  "deep-sea": "hue-rotate(22deg) saturate(0.78) brightness(0.82)",
  koi: "hue-rotate(-50deg) saturate(1.12)",
  reef: "hue-rotate(8deg) saturate(1.38)",
};

export const LOOK_FISH_COLORS: Record<
  LookId,
  { color: string; accent: string }[]
> = {
  classic: [
    { color: "#8fd3f4", accent: "#4aa8d8" },
    { color: "#7ee0c8", accent: "#3cb89a" },
    { color: "#9bb8ff", accent: "#6a88e0" },
    { color: "#b8f0e0", accent: "#5cc4b0" },
    { color: "#6ec9e8", accent: "#3a9fc4" },
    { color: "#a8d4f0", accent: "#5a9ec8" },
  ],
  tropical: [
    { color: "#ffb347", accent: "#ff7a3c" },
    { color: "#ff6b9d", accent: "#e23d6e" },
    { color: "#ffe066", accent: "#e0b000" },
    { color: "#5ce1c5", accent: "#2bb39a" },
    { color: "#ff8c5a", accent: "#e25a2a" },
    { color: "#c9f07a", accent: "#7cbc2a" },
  ],
  "deep-sea": [
    { color: "#3d5a80", accent: "#7ae0ff" },
    { color: "#2b3a55", accent: "#5cffc8" },
    { color: "#4a3f8a", accent: "#c9a7ff" },
    { color: "#1f3d4d", accent: "#7ee0ff" },
    { color: "#243050", accent: "#4ad2ff" },
    { color: "#2a2458", accent: "#9d8cff" },
  ],
  koi: [
    { color: "#f4f0e8", accent: "#e24a2a" },
    { color: "#f28b30", accent: "#c43a18" },
    { color: "#f7f4ee", accent: "#222" },
    { color: "#e24a2a", accent: "#f4f0e8" },
    { color: "#f0c27a", accent: "#d4552a" },
    { color: "#efeae2", accent: "#e24a2a" },
  ],
  reef: [
    { color: "#ffe566", accent: "#ff9f1c" },
    { color: "#c77dff", accent: "#7b2cbf" },
    { color: "#00bbf9", accent: "#0077b6" },
    { color: "#80ed99", accent: "#38a3a5" },
    { color: "#ff6b6b", accent: "#c9184a" },
    { color: "#ffd6a5", accent: "#ee9b00" },
  ],
};

export function isLookId(value: string | null): value is LookId {
  return LOOK_ORDER.includes(value as LookId);
}

export function nextLook(current: LookId): LookId {
  const index = LOOK_ORDER.indexOf(current);
  return LOOK_ORDER[(index + 1) % LOOK_ORDER.length];
}
