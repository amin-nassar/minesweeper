import classes from "./styles.module.css";
import Cell from "../Cell";
import type { GameBoard } from "./types";

const values: GameBoard = [
  [
    { value: 7, isFlagged: true, isOpen: false },
    { value: "mine", isOpen: true, isFlagged: false },
    { value: 1, isOpen: true, isFlagged: false },
    { value: "mine", isFlagged: true, isOpen: false },
  ],
  [
    { value: "mine", isOpen: true, isFlagged: false },
    { value: 5, isFlagged: false, isOpen: true },
    { value: 6, isOpen: false, isFlagged: false },
    { value: 4, isOpen: true, isFlagged: false },
  ],
  [
    { value: 2, isOpen: true, isFlagged: false },
    { value: 0, isFlagged: false, isOpen: false },
    { value: "mine", isFlagged: false, isOpen: false },
    { value: 3, isOpen: true, isFlagged: false },
  ],
];

export default function Board() {
  return (
    <div className="board">
      {values.map((row, rowIndex) => (
        <div key={rowIndex} className={classes.row}>
          {row.map((cell, cellIndex) => (
            <Cell key={cellIndex} cell={cell} />
          ))}
        </div>
      ))}
    </div>
  );
}
