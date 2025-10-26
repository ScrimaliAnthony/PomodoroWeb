import Timer from "./components/timer/Timer";
import StartPauseTimer from "./components/start-pause-timer/StartPauseTimer";
import UpdateTimer from "./components/Update-timer/UpdateTimer";
import { toTotalSeconds } from "./utils/formatTime";

import { useEffect, useState } from "react";
import ListTimers from "./components/list-timers/ListTimers";

export default function App() {
  // const [minutes, setMinutes] = useState(25);
  // const [seconds, setSeconds] = useState(0);
  const [selectedTime, setSelectedTime] = useState();
  const [isStart, setIsStart] = useState(false);
  const [timers, setTimers] = useState([
    { id: 0, label: "Concentration", minutes: 25, seconds: 0 },
    { id: 1, label: "Pause", minutes: 5, seconds: 0 },
    { id: 2, label: "Concentration", minutes: 25, seconds: 0 }
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setSelectedTime(toTotalSeconds(timers[currentIndex].minutes, timers[currentIndex].seconds))
  }, [timers[currentIndex].minutes, timers[currentIndex].seconds]);

  return (
    <>
      <h1>Pomodoro</h1>
      <ListTimers timers={timers} />
      <Timer selectedTime={selectedTime} isStart={isStart}/>
      <StartPauseTimer isStart={isStart} setIsStart={setIsStart} />
      {/* <UpdateTimer setMinutes={setMinutes} setSeconds={setSeconds} /> */}
    </>
  )
}