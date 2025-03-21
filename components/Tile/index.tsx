"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.css";

export default function Tile({
  id,
  x,
  y,
  onChange,
  emptySpace
}: {
  id: number;
  x: number;
  y: number;
  onChange: (data: { id: number; position: { x: number; y: number } }) => void;
  emptySpace: { x: number; y: number } | null;
}) {
  const isMovable =
    emptySpace &&
    ((emptySpace.y === y - 1 && emptySpace.x === x) ||
      (emptySpace.y === y + 1 && emptySpace.x === x) ||
      (emptySpace.y === y && emptySpace.x === x - 1) ||
      (emptySpace.y === y && emptySpace.x === x + 1));

  const onClickHandler = () => {
    if (id !== 0 && isMovable) {
      onChange({ id, position: { x, y } });
    }
  };

  return (
    <motion.div
      layout
      className={`${id === 0 ? "" : styles.tile} ${isMovable ? styles.movableTile : ""}`}
      onClick={onClickHandler}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {id !== 0 && <div>{id}</div>}
    </motion.div>
  );
}
