import { useEffect, useState, useReducer, useRef } from "react";

import { tasksReducer } from "./reducers/tasks";
import { initialTasks } from "./data/tasks";
import TaskList from "./components/task-List/TaskList";

import CountDown from "./components/countdown/Countdown";
import { toTotalSeconds } from "./utils/formatTime";

import ListTimers from "./components/list-timers/ListTimers";
import Cycle from "./components/cycle/Cycle";
import UpdatePomodoro from "./components/update-pomodoro/UpdatePomodoro";
import TimerNavigator from "./components/timer-navigator/TimerNavigator";

export default function App() {
  const [timers, setTimers] = useState([
    { id: 0, label: "Concentration", minutes: 0, seconds: 2 },
    { id: 1, label: "Pause", minutes: 0, seconds: 2 },
    { id: 2, label: "Long Pause", minutes: 0, seconds: 2 }
  ]);
  
  const [nbCycle, setNbCycle] = useState(3);
  const [maxCycle, setMaxCycle] = useState(nbCycle);
  const [currentTimer, setCurrentTimer] = useState(0);
  
  const [selectedTime, setSelectedTime] = useState();
  const [isStart, setIsStart] = useState(false);
  const [isTimerEnd, setIsTimerEnd] = useState(false);

  const [tasks, dispatchTasks] = useReducer(tasksReducer, initialTasks);
  const nextTaskIdRef = useRef(tasks.length - 1);

  useEffect(() => {
    setSelectedTime(toTotalSeconds(timers[currentTimer].minutes, timers[currentTimer].seconds));
  }, [timers[currentTimer].minutes, timers[currentTimer].seconds, currentTimer]);

  const handleCycle = () => {
    dispatchTasks({ type: "nextCycle" });
  }

  const handleTaskAdd = (titleInput, statusInput, descriptionInput, cycleInput) => {
      const newId = getNextTaskId();
      dispatchTasks({ type: "add", id: newId, titleInput, statusInput, descriptionInput, cycleInput });
  }

  function getNextTaskId() {
    return nextTaskIdRef.current += 1;
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

      <CountDown
        selectedTime={selectedTime} isStart={isStart}
        setIsStart={setIsStart} currentTimer={currentTimer}
        setCurrentTimer={setCurrentTimer} timers={timers}
        isTimerEnd={isTimerEnd} setIsTimerEnd={setIsTimerEnd}
        nbCycle={nbCycle} setNbCycle={setNbCycle} maxCycle={maxCycle} onNextCycle={handleCycle}
      />

      <TaskList tasks={tasks} dispatchTasks={dispatchTasks} onTaskAdd={handleTaskAdd} />
    </>
  )
}
