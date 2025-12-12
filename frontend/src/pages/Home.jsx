import { useEffect, useState, useReducer, useRef, useContext } from "react";

import { tasksReducer } from "../reducers/tasks";
import { initialTasks } from "../data/tasks";
import TaskList from "../components/task-List/TaskList";

import CountDown from "../components/countdown/Countdown";
import { toTotalSeconds } from "../utils/formatTime";

import Pomodoro from "../components/pomodoro/Pomodoro";
import { PhaseContext } from "../context/PhaseContext";

import { useNotificationSound } from "../hooks/useNotificationSound";

export default function App() {
    const { phases } = useContext(PhaseContext);
    const { currentPhase } = useContext(PhaseContext);

    const [timer, setTimer] = useState();
    const [isStart, setIsStart] = useState(false);
    const [isTimerEnd, setIsTimerEnd] = useState(false);

    const [tasks, dispatchTasks] = useReducer(tasksReducer, initialTasks);
    const nextTaskIdRef = useRef(tasks.length - 1);

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

    return (
        <>
            <Pomodoro />
            <CountDown timer={timer} isStart={isStart} handleStartOrStop={handleStartOrStop} onNextCycle={handleCycle} />
            <TaskList tasks={tasks} dispatchTasks={dispatchTasks} onTaskAdd={handleTaskAdd} />
        </>
    )
}
