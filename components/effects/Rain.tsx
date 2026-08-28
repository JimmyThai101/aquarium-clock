const DROPS = [
  { id: "r1", left: 6, delay: 0, duration: 1.4 },
  { id: "r2", left: 14, delay: -0.3, duration: 1.1 },
  { id: "r3", left: 22, delay: -0.8, duration: 1.6 },
  { id: "r4", left: 31, delay: -0.2, duration: 1.2 },
  { id: "r5", left: 40, delay: -1.1, duration: 1.5 },
  { id: "r6", left: 48, delay: -0.5, duration: 1.3 },
  { id: "r7", left: 57, delay: -0.9, duration: 1.7 },
  { id: "r8", left: 66, delay: -0.1, duration: 1.2 },
  { id: "r9", left: 74, delay: -0.6, duration: 1.4 },
  { id: "r10", left: 83, delay: -1.3, duration: 1.1 },
  { id: "r11", left: 91, delay: -0.4, duration: 1.5 },
  { id: "r12", left: 18, delay: -1.6, duration: 1.8 },
  { id: "r13", left: 53, delay: -1.8, duration: 1.3 },
  { id: "r14", left: 87, delay: -2, duration: 1.6 },
] as const;

type RainProps = {
  active: boolean;
};

/** Surface rain streaks when local weather is wet. */
export function Rain({ active }: RainProps) {
  if (!active) return null;

  return (
    <div className="weather-rain" aria-hidden="true">
      {DROPS.map((drop) => (
        <span
          key={drop.id}
          className="weather-drop"
          style={{
            left: `${drop.left}%`,
            ["--rain-duration" as string]: `${drop.duration}s`,
            ["--rain-delay" as string]: `${drop.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
