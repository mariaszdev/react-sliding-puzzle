import React from "react";
import Puzzle from "@/components/Puzzle";
import styles from "./page.module.css";

export default function SlidingPuzzlePage() {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.heading}>Sliding Puzzle Challenge</h1>
      <p className={styles.description}>
        Reorder the tiles by sliding them into the empty space. The goal is to arrange the numbers in ascending order from top-left to bottom-right. Click a tile next to the empty space to move it.
      </p>
      <Puzzle size={4} />
    </div>
  );
}
