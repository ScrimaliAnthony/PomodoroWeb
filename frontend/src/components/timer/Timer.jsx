import { useEffect, useState } from "react";
import { formatMS } from "../../utils/formatTime";

export default function PomodoroTimer({ selectedTime, isStart, currentIndex, setCurrentIndex, nbCycle, setNbCycle, maxCycle }) {
  const [timer, setTimer] = useState(selectedTime);

  useEffect(() => {
    setTimer(selectedTime);
  }, [selectedTime, currentIndex]);

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

    switch (currentIndex) {
      case 0:
        if (nbCycle > 1) {
          setCurrentIndex(1);
        } else {
          setCurrentIndex(2);
        }
        setNbCycle(prev => prev - 1);
        break;

      case 1:
        if (nbCycle > 0) {
          setCurrentIndex(0);
        } else {
          setCurrentIndex(prev => prev + 1);
        }
        break;

      case 2:
        setCurrentIndex(0);
        setNbCycle(maxCycle);
        break;

      default:
        break;
    }
  }, [timer]);

  return (
    <>
      <div>{formatMS(timer)}</div>
    </>
  )
}
