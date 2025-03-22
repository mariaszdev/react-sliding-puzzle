"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Controls from "@/components/Controls";
import Board from "@/components/Board";
import WinIndicator from "@/components/WinIndicator";
import styles from "./styles.module.css";

export default function Puzzle() {
  const [size, setSize] = useState(4);
  const [board, setBoard] = useState<number[][]>([]);
  const [emptySpace, setEmptySpace] = useState<{ x: number; y: number } | null>(null);
  const [hasWon, setHasWon] = useState(false);

  const getBoardValues = useCallback(() => {
    return Array.from(Array(size * size).keys());
  }, [size]);

  const buildPuzzleOutOfValues = useCallback((values: number[]) => {
    return Array(size)
      .fill(0)
      .map((_, i) => values.slice(i * size, (i + 1) * size));
  }, [size]);

  const getSolvedBoard = useCallback(() => {
    return buildPuzzleOutOfValues(getBoardValues());
  }, [buildPuzzleOutOfValues, getBoardValues]);

  const shuffleBoard = (moves: number = size * size) => {
    const board = getSolvedBoard();
    const index = board.flat().indexOf(0);
    let empty = { y: Math.floor(index / size), x: index % size };

    const getNeighbors = ({ x, y }: { x: number; y: number }) =>
      [
        { x, y: y - 1 },
        { x, y: y + 1 },
        { x: x - 1, y },
        { x: x + 1, y },
      ].filter(({ x, y }) => x >= 0 && x < size && y >= 0 && y < size);

    for (let i = 0; i < moves; i++) {
      const neighbors = getNeighbors(empty);
      const next = neighbors[Math.floor(Math.random() * neighbors.length)];
      board[empty.y][empty.x] = board[next.y][next.x];
      board[next.y][next.x] = 0;
      empty = next;
    }

    setBoard(board);
    setEmptySpace(empty);
    setHasWon(false);
  };

  useEffect(() => {
    const solved = getSolvedBoard();
    const flat = solved.flat();
    const zeroIndex = flat.indexOf(0);
    if (zeroIndex !== 0) {
      const origX = zeroIndex % size;
      const origY = Math.floor(zeroIndex / size);
      solved[origY][origX] = solved[0][0];
      solved[0][0] = 0;
    }
    setBoard(solved);
    setEmptySpace({ x: 0, y: 0 });
    setHasWon(false);
  }, [getSolvedBoard, size]);

  const isNeighbor = ({ x, y }: { x: number; y: number }) =>
    emptySpace &&
    ((emptySpace.y === y - 1 && emptySpace.x === x) ||
      (emptySpace.y === y + 1 && emptySpace.x === x) ||
      (emptySpace.y === y && emptySpace.x === x - 1) ||
      (emptySpace.y === y && emptySpace.x === x + 1));

  const switchTile = ({ position, id }: { position: { x: number; y: number }; id: number }) => {
    if (!emptySpace || !isNeighbor(position)) return;

    const newBoard = [...board];
    newBoard[position.y][position.x] = 0;
    newBoard[emptySpace.y][emptySpace.x] = id;
    setEmptySpace(position);
    setBoard(newBoard);

    const flat = newBoard.flat();
    const emptyIndex = flat.indexOf(0);

    const validWin =
      (emptyIndex === 0 || emptyIndex === flat.length - 1) &&
      flat.filter(n => n !== 0).every((val, i) => val === i + 1);

    setHasWon(validWin);
  };

  return (
    <div className={styles.container}>
      <Controls
        size={size}
        onSizeChange={setSize}
        onShuffleEasy={() => shuffleBoard(size * size)}
        onShuffleHard={() => shuffleBoard(size * size * 20)}
      />

      <div className={styles.boxContainer}>
        <motion.div
          className={styles.box}
          layout
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <Board
            board={board}
            size={size}
            emptySpace={emptySpace}
            onSwitchTile={switchTile}
          >
            <WinIndicator active={hasWon} />
          </Board>
        </motion.div>
      </div>
    </div>
  );
}
