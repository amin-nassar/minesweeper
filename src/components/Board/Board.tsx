import classes from "./styles.module.css";
import Cell from "../Cell";
import { createBoard } from "../../utils";
import { GAME_LEVELS } from "../../constants";

export default function Board() {
  const board = createBoard(GAME_LEVELS.EASY);
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className={classes.row}>
          {row.map((cell, cellIndex) => (
            <Cell key={cellIndex} cell={cell} />
          ))}
        </div>
      ))}
    </div>
  );
}
