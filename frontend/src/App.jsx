import Timer from "./components/timer/Timer";
import StartPauseTimer from "./components/start-pause-timer/StartPauseTimer";
import TimerNavigator from "./components/timer-navigator/TimerNavigator";
import ListTimers from "./components/list-timers/ListTimers";

import { toTotalSeconds } from "./utils/formatTime";

import { useEffect, useState } from "react";
import ListTasks from "./components/list-tasks/ListTasks";
import Cycle from "./components/cycle/Cycle";
import UpdatePomodoro from "./components/update-pomodoro/UpdatePomodoro";

export default function App() {
  const [nbCycle, setNbCycle] = useState(3);
  const [maxCycle, setMaxCycle] = useState(nbCycle);
  
  const [selectedTime, setSelectedTime] = useState();
  const [isStart, setIsStart] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTimerEnd, setIsTimerEnd] = useState(false);

  const [timers, setTimers] = useState([
    { id: 0, label: "Concentration", minutes: 0, seconds: 2 },
    { id: 1, label: "Pause", minutes: 0, seconds: 2 },
    { id: 2, label: "Long Pause", minutes: 0, seconds: 2 }
  ]);

  const [tasks, setTasks] = useState([
    { id: 0, title: "My first Task", label: "To do", desc: "Add my today tasks to the list", actualCycle: 0, nbCycle: 1 },
    { id: 1, title: "My second Task", label: "To do", desc: "Add a task to the cycle", actualCycle: 0, nbCycle: 2 },
    { id: 2, title: "My third Task", label: "To do", desc: "Finish my today tasks", actualCycle: 0, nbCycle: 1 }
  ])

  useEffect(() => {
    setSelectedTime(toTotalSeconds(timers[currentIndex].minutes, timers[currentIndex].seconds));
  }, [timers[currentIndex].minutes, timers[currentIndex].seconds, currentIndex]);

  return (
    <>
      <h1>Pomodoro</h1>
      <Cycle nbCycle={nbCycle} maxCycle={maxCycle} />
      <ListTimers timers={timers} currentIndex={currentIndex} />
      <TimerNavigator isNext={false} setCurrentIndex={setCurrentIndex} maxIndex={timers.length - 1} setIsStart={setIsStart} setIsTimerEnd={setIsTimerEnd}/>
      <TimerNavigator isNext={true}  setCurrentIndex={setCurrentIndex} maxIndex={timers.length - 1} setIsStart={setIsStart} setIsTimerEnd={setIsTimerEnd}/>
      <br/>
      <UpdatePomodoro timers={timers} setTimers={setTimers} currentIndex={currentIndex} nbCycle={nbCycle} setNbCycle={setNbCycle} maxCycle={maxCycle} setMaxCycle={setMaxCycle} />
      <br/>
      <br/>
      <Timer
        selectedTime={selectedTime} isStart={isStart}
        setIsStart={setIsStart} currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex} timers={timers}
        isTimerEnd={isTimerEnd} setIsTimerEnd={setIsTimerEnd}
        nbCycle={nbCycle} setNbCycle={setNbCycle} maxCycle={maxCycle}
      />
      <StartPauseTimer isStart={isStart} setIsStart={setIsStart} />
      <ListTasks tasks={tasks} />
    </>
  )
}
