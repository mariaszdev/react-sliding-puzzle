import React from "react";
import styles from "./styles.module.css";

type Props = {
  size: number;
  onSizeChange: (size: number) => void;
  onShuffleEasy: () => void;
  onShuffleHard: () => void;
};

export default function Controls({
  size,
  onSizeChange,
  onShuffleEasy,
  onShuffleHard,
}: Props) {
  return (
    <div className={styles.controls}>
      <div>
        <strong>Grid size:</strong>{" "}
        {[3, 4, 5, 6].map((s) => (
          <button
            key={s}
            className={`${styles.button} ${size === s ? styles.active : ""}`}
            onClick={() => onSizeChange(s)}
          >
            {s}x{s}
          </button>
        ))}
      </div>
      <div>
        <button className={styles.button} onClick={onShuffleEasy}>Shuffle a little</button>
        <button className={styles.button} onClick={onShuffleHard}>Shuffle a lot</button>
      </div>
    </div>
  );
}
