import classes from "./styles.module.css";
import Cell from "../Cell";
import { useMinesweeperGame } from "../../hooks/useMinesweeperGame";
import LevelSelect from "../LevelSelect";

export default function Board() {
  const { gameBoard, handleCellClick, changeLevel, level } =
    useMinesweeperGame();
  return (
    <>
      <div className="board">
        {gameBoard.map((row, rowIndex) => (
          <div key={rowIndex} className={classes.row}>
            {row.map((cell, cellIndex) => (
              <Cell
                key={cellIndex}
                cell={cell}
                onClick={() => handleCellClick(rowIndex, cellIndex)}
              />
            ))}
          </div>
        ))}
      </div>
      <LevelSelect level={level} onChange={changeLevel} />
    </>
  );
}
