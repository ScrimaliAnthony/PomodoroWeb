import PomodoroTimer from "./components/PomodoroTimer";
import StartPausePomodoro from "./components/StartPausePomodoro";
import UpdatePomodoro from "./components/UpdatePomodoro";

import { useEffect, useState } from "react";

export default function App() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [selectedTime, setSelectedTime] = useState();
  const [isStart, setIsStart] = useState(false);

  useEffect(() => {
    setSelectedTime(minutes * 60 + seconds)
  }, [minutes, seconds])

  return (
    <>
      <h1>Pomodoro</h1>
      <PomodoroTimer selectedTime={selectedTime} isStart={isStart}/>
      <StartPausePomodoro isStart={isStart} setIsStart={setIsStart} />
      <UpdatePomodoro setMinutes={setMinutes} setSeconds={setSeconds} />
    </>
  )
}