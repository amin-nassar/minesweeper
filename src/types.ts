export interface GameLevel {
  rows: number;
  cols: number;
  mines: number;
}

export type LevelName = "EASY" | "MEDIUM" | "HARD";
