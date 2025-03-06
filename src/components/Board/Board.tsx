import classes from "./styles.module.css";
import Cell from "../Cell";
import type { Board } from "./types";

const values: Board = [
  [
    { value: 7, isFlagged: true },
    { value: "mine", isOpen: true },
    { value: 1, isOpen: true },
    { value: "mine", isFlagged: true },
  ],
  [
    { value: "mine", isOpen: true },
    { value: 5, isFlagged: false },
    { value: 6, isOpen: true },
    { value: 4, isOpen: true },
  ],
  [
    { value: 2, isOpen: true },
    { value: 0, isOpen: true },
    { value: 8 },
    { value: 3, isOpen: true },
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
