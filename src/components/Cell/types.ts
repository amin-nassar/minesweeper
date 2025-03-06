export type CellValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | "mine";

export type Cell = {
  value: CellValue;
  isOpen?: boolean;
  isFlagged?: boolean;
};
