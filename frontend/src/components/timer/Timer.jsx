import { useEffect, useState } from "react";
import { formatMS } from "../../utils/formatTime";

export default function PomodoroTimer({ selectedTime, isStart }) {
  const [timer, setTimer] = useState(selectedTime);

  useEffect(() => {
    setTimer(selectedTime);
  }, [selectedTime]);

  useEffect(() => {
    if (!isStart || timer <= 0) return;
    const id = setTimeout(() => setTimer((t) => Math.max(0, t - 1)), 1000);
    return () => clearTimeout(id);
  }, [timer, isStart]);

  return (
    <>
      <div>{timer > 0 ? formatMS(timer) : "Terminé !"}</div>
    </>
  )
}
