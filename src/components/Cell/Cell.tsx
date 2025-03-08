import { CELL_VALUE_COLOR } from "./constants";
import classes from "./styles.module.css";
import mineIcon from "/icons/mine.svg";
import flagIcon from "/icons/red-flag.svg";
import type { GameCell } from "./types";

interface Props {
  cell: GameCell;
  onClick: () => void;
}

export default function Cell({ cell, onClick }: Props) {
  const { value, isOpen, isFlagged } = cell;

  function renderValue() {
    if (!value) return null;

    if (value === "mine") return <img src={mineIcon} alt="Mine" />;

    const color = CELL_VALUE_COLOR[value];
    return <p className={classes[color] ?? ""}>{value}</p>;
  }

  return (
    <div className={classes.cell} onClick={onClick}>
      {isOpen ? (
        renderValue()
      ) : (
        <div className={classes.overlay}>
          {isFlagged && (
            <img src={flagIcon} alt="Red Flag" className={classes.flag} />
          )}
        </div>
      )}
    </div>
  );
}
