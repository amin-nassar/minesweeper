import { GameLevel, LevelName } from "./types";

export const GAME_LEVELS: Record<LevelName, GameLevel> = {
  EASY: { rows: 9, cols: 9, mines: 10 },
  MEDIUM: { rows: 16, cols: 16, mines: 40 },
  HARD: { rows: 16, cols: 30, mines: 99 },
} as const;
