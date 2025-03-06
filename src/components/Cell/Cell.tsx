import { CELL_VALUE_COLOR } from "./constants";
import classes from "./styles.module.css";
import mineIcon from "/icons/mine.svg";
import flagIcon from "/icons/red-flag.svg";
import type { Cell } from "./types";

interface Props {
  cell: Cell;
}

export default function Cell({ cell }: Props) {
  const { value, isOpen, isFlagged } = cell;

  function renderValue() {
    if (!value) return null;

    if (value === "mine") return <img src={mineIcon} alt="Mine" />;

    return value;
  }

  const colorClass = value === "mine" ? "" : CELL_VALUE_COLOR[value];

  return (
    <div className={`${classes.cell} ${classes[colorClass]}`}>
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
