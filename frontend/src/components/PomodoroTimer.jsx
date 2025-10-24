import { useEffect, useState } from "react";

function formatMS(totalSeconds) {
  const minute = Math.floor(totalSeconds / 60);
  const second = totalSeconds % 60;
  const mm = String(minute).padStart(2, "0");
  const ss = String(second).padStart(2, "0");
  return `${mm}:${ss}`;
}

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
