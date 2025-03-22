import React from "react";
import Puzzle from "@/components/Puzzle";
import styles from "./page.module.css";

export default function SlidingPuzzlePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Sliding Puzzle</h1>
      <p className={styles.description}>
        Shuffle the board and arrange the tiles in ascending order.
      </p>
      <Puzzle />
    </div>
  );
}
