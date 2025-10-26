import Timer from "./components/timer/Timer";
import StartPauseTimer from "./components/start-pause-timer/StartPauseTimer";
import UpdateTimer from "./components/Update-timer/UpdateTimer";

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
      
      <Timer selectedTime={selectedTime} isStart={isStart}/>
      <StartPauseTimer isStart={isStart} setIsStart={setIsStart} />
      {/* <UpdateTimer setMinutes={setMinutes} setSeconds={setSeconds} /> */}
    </>
  )
}