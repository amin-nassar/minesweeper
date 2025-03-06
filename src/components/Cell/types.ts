type OpenedCell = {
  isOpen: true;
  isFlagged: false;
};

type ClosedCell = {
  isOpen: false;
  isFlagged: boolean;
};

type MineCell = {
  value: "mine";
  highlight?: "red" | "green";
};

type NumberCell = {
  value: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
};

type EmptyCell = {
  value: 0;
  isFlagged: false;
  isOpen: false;
};

type OpenedMineCell = OpenedCell & MineCell;
type ClosedMineCell = ClosedCell & MineCell;
type OpenNumberCell = OpenedCell & NumberCell;
type CloseNumberCell = ClosedCell & NumberCell;

export type GameCell =
  | OpenedMineCell
  | ClosedMineCell
  | OpenNumberCell
  | CloseNumberCell
  | EmptyCell;
