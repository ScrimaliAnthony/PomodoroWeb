import PomodoroTimer from "./components/PomodoroTimer";
import UpdatePomodoro from "./components/UpdatePomodoro";

import { useEffect, useState } from "react";

export default function App() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [start, setStart] = useState();

  useEffect(() => {
    setStart(minutes * 60 + seconds)
  }, [minutes, seconds])

  return (
    <>
      <h1>Pomodoro</h1>
      <PomodoroTimer start={start} minutes={minutes} seconds={seconds} />
      <UpdatePomodoro setMinutes={setMinutes} setSeconds={setSeconds} />
    </>
  )
}