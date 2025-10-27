import Timer from "./components/timer/Timer";
import StartPauseTimer from "./components/start-pause-timer/StartPauseTimer";
import UpdateTimer from "./components/Update-timer/UpdateTimer";
import TimerNavigator from "./components/timer-navigator/TimerNavigator";
import ListTimers from "./components/list-timers/ListTimers";
import AddTimer from "./components/add-timer/AddTimer";
import DeleteTimer from "./components/delete-timer/DeleteTimer";

import { toTotalSeconds } from "./utils/formatTime";

import { useEffect, useState } from "react";

export default function App() {
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
      <ListTimers timers={timers} currentIndex={currentIndex} />
      <TimerNavigator isNext={false} setCurrentIndex={setCurrentIndex} maxIndex={timers.length - 1}/>
      <StartPauseTimer isStart={isStart} setIsStart={setIsStart} />
      <TimerNavigator isNext={true}  setCurrentIndex={setCurrentIndex} maxIndex={timers.length - 1} />
      <AddTimer timers={timers} setTimers={setTimers} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}/>
      <UpdateTimer timers={timers} setTimers={setTimers} currentIndex={currentIndex} />
      <DeleteTimer timers={timers} setTimers={setTimers} currentIndex={currentIndex}  />
      <Timer selectedTime={selectedTime} isStart={isStart}/>
      <p>currentIndex : {currentIndex}</p>
      <p>currentId : {timers[currentIndex].id}</p>
    </>
  )
}