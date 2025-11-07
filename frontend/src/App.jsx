import { useEffect, useState, useReducer, useRef } from "react";
import { initialTasks, tasksReducer, TASK_STATUS } from "./reducers/tasks";
import { toTotalSeconds } from "./utils/formatTime";

import ListTimers from "./components/list-timers/ListTimers";
import Cycle from "./components/cycle/Cycle";
import UpdatePomodoro from "./components/update-pomodoro/UpdatePomodoro";
import TimerNavigator from "./components/timer-navigator/TimerNavigator";

import Timer from "./components/timer/Timer";
import StartPauseTimer from "./components/start-pause-timer/StartPauseTimer";

import ListTasks from "./components/list-tasks/ListTasks";

export default function App() {
  const [nbCycle, setNbCycle] = useState(3);
  const [maxCycle, setMaxCycle] = useState(nbCycle);
  
  const [selectedTime, setSelectedTime] = useState();
  const [isStart, setIsStart] = useState(false);
  const [currentTimer, setCurrentTimer] = useState(0);
  const [isTimerEnd, setIsTimerEnd] = useState(false);

  const [currentTask, setCurrentTask] = useState(0);
  const [tasks, dispatchTasks] = useReducer(tasksReducer, initialTasks);


  const [timers, setTimers] = useState([
    { id: 0, label: "Concentration", minutes: 0, seconds: 2 },
    { id: 1, label: "Pause", minutes: 0, seconds: 2 },
    { id: 2, label: "Long Pause", minutes: 0, seconds: 2 }
  ]);


  useEffect(() => {
    setSelectedTime(toTotalSeconds(timers[currentTimer].minutes, timers[currentTimer].seconds));
  }, [timers[currentTimer].minutes, timers[currentTimer].seconds, currentTimer]);

  const progressInTask = () => {
    alert("coucou");
  }

  return (
    <>
      <h1>Pomodoro</h1>
      <Cycle nbCycle={nbCycle} maxCycle={maxCycle} />
      <ListTimers timers={timers} currentTimer={currentTimer} />
      <TimerNavigator isNext={false} setCurrentTimer={setCurrentTimer} maxIndex={timers.length - 1} setIsStart={setIsStart} setIsTimerEnd={setIsTimerEnd}/>
      <TimerNavigator isNext={true}  setCurrentTimer={setCurrentTimer} maxIndex={timers.length - 1} setIsStart={setIsStart} setIsTimerEnd={setIsTimerEnd}/>
      <br/>
      <UpdatePomodoro timers={timers} setTimers={setTimers} nbCycle={nbCycle} setNbCycle={setNbCycle} maxCycle={maxCycle} setMaxCycle={setMaxCycle} />
      <br/>
      <br/>
      <Timer
        selectedTime={selectedTime} isStart={isStart}
        setIsStart={setIsStart} currentTimer={currentTimer}
        setCurrentTimer={setCurrentTimer} timers={timers}
        isTimerEnd={isTimerEnd} setIsTimerEnd={setIsTimerEnd}
        nbCycle={nbCycle} setNbCycle={setNbCycle} maxCycle={maxCycle} progressInTask={progressInTask}
      />
      <StartPauseTimer isStart={isStart} setIsStart={setIsStart} />

      <ListTasks tasks={tasks} dispatchTasks={dispatchTasks} TASK_STATUS={TASK_STATUS} currentTask={currentTask} setCurrentTask={setCurrentTask} />
    </>
  )
}
