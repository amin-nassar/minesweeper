import React from "react";
import classes from "./styles.module.css";
import GameStatus, { GameStatusProps } from "./GameStatus";

type HeaderProps = GameStatusProps;

export default function Header({
  isGameOver,
  isGameWin,
  minesLeft,
}: HeaderProps) {
  return (
    <header className={classes.header}>
      <GameStatus
        isGameOver={isGameOver}
        isGameWin={isGameWin}
        minesLeft={minesLeft}
      />
    </header>
  );
}
