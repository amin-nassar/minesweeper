import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export default function useTimer() {
  const intervalRef = useRef<number | null>(null);
  const [timeStarted, setTimeStarted] = useState<Date | null>(null);
  const [timeNow, setTimeNow] = useState<Date | null>(null);

  const startTimer = useCallback(() => {
    setTimeStarted(new Date());
  }, []);

  const stopTimer = useCallback(() => {
    clearInterval(intervalRef.current!);
  }, []);

  const resetTimer = useCallback(() => {
    setTimeStarted(null);
    setTimeNow(null);
  }, []);

  useEffect(() => {
    if (!timeStarted) return;
    intervalRef.current = setInterval(() => {
      setTimeNow(new Date());
    }, 1000);
  }, [timeStarted]);

  const timeDiff = useMemo(() => getTimeDiff(timeStarted, timeNow), [timeNow]);
  const isTimerRunning = !!timeStarted;

  return {
    timeDiff,
    isTimerRunning,
    startTimer,
    stopTimer,
    resetTimer,
  };
}

function getTimeDiff(timeStarted: Date | null, timeNow: Date | null) {
  if (!timeStarted || !timeNow) return "00:00";

  const fromatter = Intl.DateTimeFormat("en-US", {
    minute: "2-digit",
    second: "2-digit",
  });

  const msDiff = timeNow.getTime() - timeStarted.getTime();

  return fromatter.format(msDiff);
}
