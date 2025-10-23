import PomodoroTimer from "./components/PomodoroTimer";
import UpdatePomodoro from "./components/UpdatePomodoro";

import { useState } from "react";

export default function App() {
  const [start, setStart] = useState();

  return (
    <>
      <h1>Pomodoro</h1>
      <PomodoroTimer start={1200} />
      <UpdatePomodoro start={setStart}/>
    </>
  )
}