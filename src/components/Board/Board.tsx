import classes from "./styles.module.css";
import Cell from "../Cell";
import { createBoard } from "../../utils";

export default function Board() {
  const board = createBoard({ cols: 10, rows: 10, mines: 10 });
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
