import Timer from "./components/timer/Timer";
import StartPauseTimer from "./components/start-pause-timer/StartPauseTimer";
import TimerNavigator from "./components/timer-navigator/TimerNavigator";
import ListTimers from "./components/list-timers/ListTimers";

import { toTotalSeconds } from "./utils/formatTime";

import React, { useEffect, useState } from "react";
import ListTasks from "./components/list-tasks/ListTasks";
import Cycle from "./components/cycle/Cycle";
import UpdatePomodoro from "./components/update-pomodoro/UpdatePomodoro";
import Task from "./components/task/Task";
import AddTask from "./components/add-task/AddTask";

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

  const TASK_STATUS = {
    TODO: "To Do",
    IN_PROGRESS: "In Progress",
    DONE: "Done"
  };

  const [tasks, setTasks] = useState([
    { id: 0, title: "My first Task", status: TASK_STATUS.TODO, desc: "Add my today tasks to the list", actualCycle: 0, nbCycle: 1 },
    { id: 1, title: "My second Task", status: TASK_STATUS.IN_PROGRESS, desc: "Add a task to the cycle", actualCycle: 0, nbCycle: 2 },
    { id: 2, title: "My third Task", status: TASK_STATUS.DONE, desc: "Finish my today tasks", actualCycle: 0, nbCycle: 1 }
  ]);

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
      {/* <ListTasks tasks={tasks} /> */}
      {tasks.map((task, index) => 
        <React.Fragment key={index} >
          <Task task={task} index={index} TASK_STATUS={TASK_STATUS} />
        </React.Fragment>
      )}
      <AddTask TASK_STATUS={TASK_STATUS} tasks={tasks} setTasks={setTasks} />
    </>
  )
}
