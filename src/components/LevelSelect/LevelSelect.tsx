import React from "react";
import { LevelName } from "../../types";
import { GAME_LEVELS } from "../../constants";
import classes from "./styles.module.css";

interface Props {
  level: LevelName;
  onChange: (level: LevelName) => void;
}

export default function LevelSelect({ level: gameLevel, onChange }: Props) {
  return (
    <div className={classes.levelSelect}>
      {Object.keys(GAME_LEVELS).map((level) => {
        const isActive = level === gameLevel;
        return (
          <button
            className={isActive ? classes.active : ""}
            key={level}
            onClick={() => onChange(level as LevelName)}
          >
            {level.toLowerCase()}
          </button>
        );
      })}
    </div>
  );
}
