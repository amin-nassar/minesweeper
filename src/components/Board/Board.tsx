import classes from "./styles.module.css";
import Cell from "../Cell";
import { useMinesweeperGame } from "../../hooks/useMinesweeperGame";
import LevelSelect from "../LevelSelect";
import Header from "../Header";
import ReactConfetti from "react-confetti";

export default function Board() {
  const {
    gameBoard,
    handleCellClick,
    changeLevel,
    level,
    handleCellRightClick,
    isGameOver,
    isGameWin,
    minesLeft,
    timeDiff,
    resetGame,
  } = useMinesweeperGame();
  return (
    <>
      <Header
        isGameOver={isGameOver}
        isGameWin={isGameWin}
        minesLeft={minesLeft}
        timeDiff={timeDiff}
        resetGame={resetGame}
      />
      <div className="board">
        {gameBoard.map((row, rowIndex) => (
          <div key={rowIndex} className={classes.row}>
            {row.map((cell, cellIndex) => (
              <Cell
                key={cellIndex}
                cell={cell}
                onClick={() => handleCellClick(rowIndex, cellIndex)}
                onRightClick={() => handleCellRightClick(rowIndex, cellIndex)}
                size={level === "EASY" ? "normal" : "small"}
              />
            ))}
          </div>
        ))}
      </div>
      <LevelSelect level={level} onChange={changeLevel} />
      {isGameWin && <ReactConfetti />}
    </>
  );
}
