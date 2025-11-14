import { useEffect, useState, useReducer, useRef, useContext } from "react";

import { tasksReducer } from "./reducers/tasks";
import { initialTasks } from "./data/tasks";
import TaskList from "./components/task-List/TaskList";

// import CountDown from "./components/countdown/Countdown";
import { toTotalSeconds } from "./utils/formatTime";

import Pomodoro from "./components/pomodoro/Pomodoro";
import { PhaseContext } from "./context/PhaseContext";

import { initialPhases } from "./data/pomodoro";

export default function App() {
  const { currentPhase } = useContext(PhaseContext);
  // const [nbCycle, setNbCycle] = useState(3);
  // const [maxCycle, setMaxCycle] = useState(nbCycle);
  
  const [selectedTime, setSelectedTime] = useState();
  // const [isStart, setIsStart] = useState(false);
  // const [isTimerEnd, setIsTimerEnd] = useState(false);

  const [tasks, dispatchTasks] = useReducer(tasksReducer, initialTasks);
  const nextTaskIdRef = useRef(tasks.length - 1);

  useEffect(() => {
    setSelectedTime(toTotalSeconds(initialPhases[currentPhase].minutes, initialPhases[currentPhase].seconds));
  }, [initialPhases[currentPhase].minutes, initialPhases[currentPhase].seconds, currentPhase]);

  // const handleCycle = () => {
  //   dispatchTasks({ type: "nextCycle" });
  // }

  const handleTaskAdd = (titleInput, statusInput, descriptionInput, cycleInput) => {
      dispatchTasks({ type: "add", id: getNextTaskId(), titleInput, statusInput, descriptionInput, cycleInput });
  }

  function getNextTaskId() {
    return nextTaskIdRef.current += 1;
  }

  return (
    <>
      <Pomodoro />

      {/* <CountDown
        selectedTime={selectedTime} isStart={isStart}
        setIsStart={setIsStart}
        isTimerEnd={isTimerEnd} setIsTimerEnd={setIsTimerEnd}
        nbCycle={nbCycle} setNbCycle={setNbCycle} maxCycle={maxCycle} onNextCycle={handleCycle}
      /> */}

      <TaskList tasks={tasks} dispatchTasks={dispatchTasks} onTaskAdd={handleTaskAdd} />
    </>
  )
}
