import { useEffect, useState, useReducer, useRef, useContext } from "react";
import { useNotificationSound } from "./hooks/useNotificationSound";
import { usePersistentReducer } from "./hooks/usePersistentReducer";

import TaskList from "./components/task-List/TaskList";
import CountDown from "./components/countdown/Countdown";
import Pomodoro from "./components/pomodoro/Pomodoro";

import { tasksReducer } from "./reducers/tasks";
import { PhaseContext } from "./context/PhaseContext";
import { toTotalSeconds } from "./utils/formatTime";
import { initialTasks } from "./data/tasks";


export default function APP() {
    const TASKS_KEY = "pomodoro:tasks:v1";

    const { phases, currentPhase } = useContext(PhaseContext);

    const [timer, setTimer] = useState();
    const [isStart, setIsStart] = useState(false);

    const [tasks, dispatchTasks] = usePersistentReducer(tasksReducer, initialTasks, TASKS_KEY);
    const nextTaskIdRef = useRef(getMaxTaskId(tasks));

    const playNotification = useNotificationSound("end-of-task.mp3");

    useEffect(() => {
        setTimer(
        toTotalSeconds(phases[currentPhase].minutes, phases[currentPhase].seconds)
        );
    }, [phases[currentPhase].minutes, phases[currentPhase].seconds, currentPhase]);

    useEffect(() => {
        if (!isStart || timer <= 0) {
        return;
        }

        const id = setTimeout(() => setTimer((t) => Math.max(0, t - 1)), 1000);
        return () => clearTimeout(id);
    }, [timer, isStart]);

    const handleStartOrStop = () => {
        setIsStart(prev => !prev);
    }

    const handleCycle = () => {
        playNotification();
        dispatchTasks({ type: "nextCycle" });
    }

    const handleTaskAdd = (titleInput, statusInput, descriptionInput, cycleInput) => {
        dispatchTasks({ type: "add", id: getNextTaskId(), titleInput, statusInput, descriptionInput, cycleInput });
    }

    function getNextTaskId() {
        return nextTaskIdRef.current += 1;
    }

    function getMaxTaskId(tasks) {
        return tasks.reduce((max, t) => Math.max(max, t.id), -1);
    }

    return (
        <>
            <Pomodoro />
            <CountDown timer={timer} isStart={isStart} handleStartOrStop={handleStartOrStop} onNextCycle={handleCycle} />
            <TaskList tasks={tasks} dispatchTasks={dispatchTasks} onTaskAdd={handleTaskAdd} />
        </>
    )
}
