import { useState } from "react";
import { createBoard } from "../utils";
import { GAME_LEVELS } from "../constants";
import { GameBoard } from "../components/Board/types";
import { LevelName } from "../types";

function useGameLevel() {
  const [level, changeLevel] = useState<LevelName>("EASY");

  return { level, changeLevel };
}

export function useMinesweeperGame() {
  const { level, changeLevel } = useGameLevel();
  const gameLevel = GAME_LEVELS[level];
  const [gameBoard, setGameBoard] = useState(() => createBoard(gameLevel));

  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWin, setIsGameWin] = useState(false);

  function resetGame() {
    setGameBoard(createBoard(GAME_LEVELS[level]));
    setIsGameOver(false);
    setIsGameWin(false);
  }

  function handleChange(newLevel: LevelName) {
    changeLevel(newLevel);
    resetGame();
    setGameBoard(createBoard(GAME_LEVELS[newLevel]));
  }

  function cloneBoard(board: GameBoard): GameBoard {
    return JSON.parse(JSON.stringify(board));
  }

  function openCell(board: GameBoard, row: number, col: number) {
    const newBoard = cloneBoard(board);
    const cell = newBoard[row][col];

    if (cell.value === "mine") {
      setIsGameOver(true);
      cell.highlight = "red";
      revealAllMines(newBoard);
    } else {
      cell.isOpen = true;
      if (!cell.value) revealAdjacentCells(newBoard, row, col);
    }

    if (checkGameWin(newBoard)) {
      setIsGameWin(true);
      revealAllMines(newBoard, true);
    }
    return newBoard;
  }

  function checkGameWin(board: GameBoard) {
    let correctlyFlaggedMines = 0;
    let unOpenedCells = 0;

    const totalMines = gameLevel.mines;
    board.forEach((row) => {
      row.forEach((cell) => {
        if (!cell.isOpen) unOpenedCells++;
        if (cell.value === "mine" && cell.isFlagged) correctlyFlaggedMines++;
      });
    });

    return unOpenedCells === totalMines || correctlyFlaggedMines === totalMines;
  }

  function revealAllMines(board: GameBoard, win?: boolean) {
    board.forEach((row) => {
      row.forEach((cell) => {
        if (cell.value === "mine") {
          cell.isOpen = true;
          if (win) cell.highlight = "green";
        }
      });
    });
  }
  function handleCellClick(row: number, col: number) {
    if (isGameOver || isGameWin) return;
    const { isFlagged, isOpen } = gameBoard[row][col];
    if (isFlagged || isOpen) return;

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

  return { gameBoard, handleCellClick, level, changeLevel: handleChange };
}
