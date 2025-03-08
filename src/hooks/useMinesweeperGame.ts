import { useState } from "react";
import { createBoard } from "../utils";
import { GAME_LEVELS } from "../constants";
import { GameBoard } from "../components/Board/types";

export function useMinesweeperGame() {
  const [gameBoard, setGameBoard] = useState(() =>
    createBoard(GAME_LEVELS.EASY)
  );

  function cloneBoard(board: GameBoard): GameBoard {
    return JSON.parse(JSON.stringify(board));
  }

  function openCell(board: GameBoard, row: number, col: number) {
    const newBoard = cloneBoard(board);
    const cell = newBoard[row][col];

    if (cell.value === "mine") {
      console.log("Game Over!");
    } else {
      cell.isOpen = true;
      if (!cell.value) revealAdjacentCells(newBoard, row, col);
    }

    return newBoard;
  }

  function handleCellClick(row: number, col: number) {
    const n = openCell(gameBoard, row, col);
    if (n) setGameBoard(n);
  }

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

  function revealAdjacentCells(board: GameBoard, row: number, col: number) {
    const queue: [number, number][] = [[row, col]];

    while (queue.length > 0) {
      const [cellRow, cellCol] = queue.shift()!;
      const cell = board[cellRow][cellCol];
      cell.isOpen = true;
      if (!cell.value) {
        for (const [dr, dc] of directions) {
          const newRow = cellRow + dr;
          const newCol = cellCol + dc;
          const isValidRow = newRow >= 0 && newRow < board.length;
          const isValidCol = newCol >= 0 && newCol < board[0].length;
          const adjacentCell = board[newRow]?.[newCol];
          const isClosed = !adjacentCell?.isOpen;
          const isFlagged = adjacentCell?.isFlagged;

          if (isValidRow && isValidCol && isClosed && !isFlagged)
            queue.push([newRow, newCol]);
        }
      }
    }

    return board;
  }

  return { gameBoard, handleCellClick };
}
