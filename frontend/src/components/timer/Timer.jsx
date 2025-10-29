import { useEffect, useState } from "react";
import { formatMS } from "../../utils/formatTime";

export default function PomodoroTimer({ selectedTime, isStart, setIsStart, currentIndex, setCurrentIndex, timers, isTimerEnd, setIsTimerEnd }) {
  const [timer, setTimer] = useState(selectedTime);


  useEffect(() => {
    setTimer(selectedTime);
  }, [selectedTime, currentIndex]);

  useEffect(() => {
    if (timer === 0 && currentIndex < timers.length - 1) {
      setCurrentIndex(prev => prev + 1 );
    }

    if (timer === 0 && timers.length - 1 === currentIndex) {
      setIsTimerEnd(true);
      setIsStart(false);
    }

    if (!isStart || timer <= 0) {
      return;
    }

    const id = setTimeout(() => setTimer((t) => Math.max(0, t - 1)), 1000);
    return () => clearTimeout(id);
  }, [timer, isStart]);

  return (
    <>
      <div>{!isTimerEnd ? formatMS(timer) : "End of Timer"}</div>
    </>
  )
}
