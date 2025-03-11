import React from "react";
import timerIcon from "/icons/timer.svg";
import classes from "./styles.module.css";

export interface TimerProps {
  timeDiff: string;
}
export default function Timer({ timeDiff }: TimerProps) {
  return (
    <div>
      {timeDiff}
      <img src={timerIcon} alt="Timer" className={classes.icon} />
    </div>
  );
}
