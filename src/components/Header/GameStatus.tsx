import mineIcon from "/icons/mine.svg";
import classes from "./styles.module.css";

export interface GameStatusProps {
  isGameWin: boolean;
  isGameOver: boolean;
  minesLeft: number;
}

export default function GameStatus({
  isGameOver,
  isGameWin,
  minesLeft,
}: GameStatusProps) {
  const isGameEnded = isGameOver || isGameWin;

  return (
    <>
      {isGameWin && <span>You Win!</span>}
      {isGameOver && <span>Game Over!</span>}
      {!isGameEnded && (
        <>
          <img src={mineIcon} alt="Mine" className={classes.icon} />
          {minesLeft}
        </>
      )}
    </>
  );
}
