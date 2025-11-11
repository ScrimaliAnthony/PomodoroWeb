import { useEffect, useState } from "react";
import { formatMS } from "../../utils/formatTime";
import StartPauseButton from "../start-pause-button/StartPauseButton";

export default function Countdown({ selectedTime, isStart, setIsStart, currentTimer, setCurrentTimer, nbCycle, setNbCycle, maxCycle, onNextCycle }) {
  const [timer, setTimer] = useState(selectedTime);

  useEffect(() => {
    setTimer(selectedTime);
  }, [selectedTime, currentTimer]);

  useEffect(() => {
    if (!isStart || timer <= 0) {
      return;
    }

    const id = setTimeout(() => setTimer((t) => Math.max(0, t - 1)), 1000);
    return () => clearTimeout(id);
  }, [timer, isStart]);

  useEffect(() => {
    if (timer > 0 || timer < 0 || !isStart) {
      return;
    }

    switch (currentTimer) {
      case 0:
        if (nbCycle > 1) {
          setCurrentTimer(1);
        } else {
          setCurrentTimer(2);
        }
        setNbCycle(prev => prev - 1);
        onNextCycle();
        break;

      case 1:
        if (nbCycle > 0) {
          setCurrentTimer(0);
        } else {
          setCurrentTimer(prev => prev + 1);
        }
        break;

      case 2:
        setCurrentTimer(0);
        setNbCycle(maxCycle);
        break;

      default:
        break;
    }
  }, [timer]);

  return (
    <>
      <div>{formatMS(timer)}</div>
      <StartPauseButton isStart={isStart} setIsStart={setIsStart} />
    </>
  )
}
