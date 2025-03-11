import React from "react";
import classes from "./styles.module.css";
import GameStatus, { GameStatusProps } from "./GameStatus";
import Timer, { TimerProps } from "./Timer";

interface HeaderProps extends GameStatusProps, TimerProps {
  resetGame: () => void;
}

export default function Header({
  isGameOver,
  isGameWin,
  minesLeft,
  timeDiff,
  resetGame,
}: HeaderProps) {
  return (
    <header className={classes.header}>
      <GameStatus
        isGameOver={isGameOver}
        isGameWin={isGameWin}
        minesLeft={minesLeft}
      />
      <button onClick={resetGame}>Reset</button>
      <Timer timeDiff={timeDiff} />
    </header>
  );
}
