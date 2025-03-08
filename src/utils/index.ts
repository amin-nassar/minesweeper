import { GameBoard } from "../components/Board/types";
import { GameCell } from "../components/Cell";
import { GameLevel } from "../types";

function createEmptyCell(): GameCell {
  return { value: 0, isFlagged: false, isOpen: false };
}

function isMine(cell: GameCell) {
  return cell.value === "mine";
}

export function getAdjacentCells(board: GameBoard, row: number, col: number) {
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

  return directions
    .map(([dr, dc]) => board[row + dr]?.[col + dc])
    .filter(Boolean);
}

function countAdjacentMines(board: GameBoard, row: number, col: number) {
  const adjacentCells = getAdjacentCells(board, row, col);
  return adjacentCells.filter(isMine).length as Exclude<
    GameCell["value"],
    string
  >;
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
      cell.value = countAdjacentMines(board, rIdx, cIdx);
    });
  });

  return board;
}
