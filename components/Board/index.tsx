"use client";

import React from "react";
import Tile from "@/components/Tile";
import styles from "./styles.module.css";

export default function Board({
  board,
  size,
  emptySpace,
  onSwitchTile,
  children, 
}: {
  board: number[][];
  size: number;
  emptySpace: { x: number; y: number } | null;
  onSwitchTile: (args: { position: { x: number; y: number }; id: number }) => void;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={styles.board}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${size}, 100px)`,
        gridTemplateRows: `repeat(${size}, 100px)`,
        gap: "4px",
        position: "relative",
      }}
    >
      {children}
      {board.flatMap((row, rowIndex) =>
        row.map((id, colIndex) => (
          <Tile
            key={id}
            id={id}
            x={colIndex}
            y={rowIndex}
            emptySpace={emptySpace}
            onChange={onSwitchTile}
          />
        ))
      )}
    </div>
  );
}
