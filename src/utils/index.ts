import { GameBoard } from "../components/Board/types";
import { GameCell } from "../components/Cell";
import { GameLevel } from "../types";

function createEmptyCell(): GameCell {
  return { value: 0, isFlagged: false, isOpen: false };
}

function isMine(cell: GameCell) {
  return cell.value === "mine";
}

function getAdjacentCells(board: GameBoard, row: number, col: number) {
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  const isValidPair = ([r, c]: number[]) => !!board[r]?.[c];

  // TODO: Merge 2 .map calls together.
  return directions
    .map(([dr, dc]) => [row + dr, col + dc])
    .filter(isValidPair)
    .map(([r, c]) => board[r][c]);
}

export function createBoard({ rows, cols, mines }: GameLevel): GameBoard {
  const board = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, createEmptyCell)
  );

  let mineCount = 0;
  while (mineCount < mines) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    const cell = board[row][col];
    if (!isMine(cell)) {
      (cell as GameCell).value = "mine";
      mineCount++;
    }
  }

  board.forEach((row, rIdx) => {
    row.forEach((cell, cIdx) => {
      if (cell.value === "mine") return;
      // TODO: Convert `getAdjacentCells` to `countAdjacentMines`
      const adjacentCells = getAdjacentCells(board, rIdx, cIdx);
      // TODO: Fix Typing Or Extract Numeric Values of a cell
      cell.value = adjacentCells.filter(isMine).length as Exclude<
        GameCell["value"],
        "mine"
      >;
    });
  });

  return board;
}
