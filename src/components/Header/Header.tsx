import React from "react";
import classes from "./styles.module.css";
import GameStatus, { GameStatusProps } from "./GameStatus";
import Timer, { TimerProps } from "./Timer";

type HeaderProps = GameStatusProps & TimerProps;

export default function Header({
  isGameOver,
  isGameWin,
  minesLeft,
  timeDiff,
}: HeaderProps) {
  return (
    <header className={classes.header}>
      <GameStatus
        isGameOver={isGameOver}
        isGameWin={isGameWin}
        minesLeft={minesLeft}
      />
      <Timer timeDiff={timeDiff} />
    </header>
  );
}
