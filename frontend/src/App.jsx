import PomodoroTimer from "./components/PomodoroTimer";
import StartPausePomodoro from "./components/StartPausePomodoro";
import UpdatePomodoro from "./components/UpdatePomodoro";

import { useEffect, useState } from "react";

export default function App() {
  // const [minutes, setMinutes] = useState(25);
  // const [seconds, setSeconds] = useState(0);
  const [selectedTime, setSelectedTime] = useState();
  const [isStart, setIsStart] = useState(false);
  const [timer, setTimer] = useState([
    { id: 0, label: "Concentration", minutes: 25, seconds: 0 },
    { id: 1, label: "Pause", minutes: 5, seconds: 0 },
    { id: 2, label: "Concentration", minutes: 25, seconds: 0 }
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setSelectedTime(timer[currentIndex].minutes * 60 + timer[currentIndex].seconds)
  }, [timer[currentIndex].minutes, timer[currentIndex].seconds]);

  return (
    <>
      <h1>Pomodoro</h1>
      
      <PomodoroTimer selectedTime={selectedTime} isStart={isStart}/>
      <StartPausePomodoro isStart={isStart} setIsStart={setIsStart} />
      {/* <UpdatePomodoro setMinutes={setMinutes} setSeconds={setSeconds} /> */}
    </>
  )
}