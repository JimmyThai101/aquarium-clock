type TreasureChestProps = {
  open: boolean;
};

/** Chest on the sand; opens on the hour and vents extra bubbles. */
export function TreasureChest({ open }: TreasureChestProps) {
  return (
    <div className={`aquarium-chest${open ? " aquarium-chest--open" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 80 56" width="72" height="52">
        <rect x="8" y="24" width="64" height="26" rx="4" fill="#8a5a28" />
        <rect x="8" y="24" width="64" height="8" fill="#6e451c" />
        <rect
          className="aquarium-chest-lid"
          x="8"
          y="10"
          width="64"
          height="16"
          rx="4"
          fill="#a56a32"
        />
        <circle cx="40" cy="30" r="4" fill="#e0c25a" />
      </svg>
      {open ? (
        <span className="aquarium-chest-burst">
          <i />
          <i />
          <i />
          <i />
          <i />
        </span>
      ) : null}
    </div>
  );
}
