"use client";

import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import Tile from "@/components/Tile";
import styles from "./styles.module.css";

export default function Puzzle({ size }: { size: number }) {
  const { width, height } = useWindowSize();

  const getBoardValues = () => Array.from(Array(size * size).keys());
  const buildPuzzleOutOfValues = (values: number[]) =>
    Array(size)
      .fill(0)
      .map((_, i) => values.slice(i * size, (i + 1) * size));
  const getSolvedBoard = () => buildPuzzleOutOfValues(getBoardValues());

  const SOLVED_PUZZLE = getBoardValues();

  const [board, setBoard] = useState<number[][]>([]);
  const [emptySpace, setEmptySpace] = useState<{ x: number; y: number } | null>(null);
  const [hasWon, setHasWon] = useState(false);

  const shuffleBoard = (moves: number = 3) => {
    let board = getSolvedBoard();
    let index = board.flat().indexOf(0);
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

      // Swap with empty space
      board[empty.y][empty.x] = board[next.y][next.x];
      board[next.y][next.x] = 0;
      empty = next;
    }

    setBoard(board);
    setEmptySpace(empty);
    setHasWon(false);
  };

  useEffect(() => {
    shuffleBoard(100); // Number of shuffle moves = difficulty
  }, [size]);

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
    
    if (validWin) {
      setHasWon(true);
    }
  };

  return (
    <div className={styles.container}>
      {hasWon && <Confetti width={width} height={height} />}
      {board.length > 0 ? (
        <div className={styles.box}>
          <div
            className={styles.board}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${size}, 100px)`,
              gridTemplateRows: `repeat(${size}, 100px)`,
              gap: "4px",
            }}
          >
            {board
              .flatMap((row, rowIndex) =>
                row.map((id, colIndex) => ({
                  id,
                  x: colIndex,
                  y: rowIndex,
                }))
              )
              .sort((a, b) => a.y - b.y || a.x - b.x)
              .map(({ id, x, y }) => (
                <Tile
                  key={id}
                  id={id}
                  x={x}
                  y={y}
                  emptySpace={emptySpace}
                  onChange={switchTile}
                />
              ))}
          </div>
        </div>
      ) : (
        <div className={styles.loaderContainer}>
          <div className={styles.loader}></div>
        </div>
      )}
    </div>
  );
}
