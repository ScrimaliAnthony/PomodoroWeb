import { useRef } from "react";
import PomodoroCycleEdit from "../pomodoro-cycle-edit/PomodoroCycleEdit";
import PomodoroPhaseEdit from "../pomodoro-phase-edit/PomodoroPhaseEdit";

export default function PomodoroEdit({ nbCycle, maxCycle, phases, onClickUpdate, onEdit }) {
    const totalCycleRef = useRef(maxCycle);
    const minuteRef = useRef(phases.map(phase => phase.minutes));
    const secondRef = useRef(phases.map(phase => phase.seconds));

    const handleTotalCycleRef = (e) => {
        totalCycleRef.current = e;
    }

    const handleMinuteRef = (e, id) => {
        minuteRef.current[id] = e;
    }

    const handleSecondRef = (e, id) => {
        secondRef.current[id] = e;
    }

    const handleUpdateClick = () => {
        onEdit(totalCycleRef, minuteRef, secondRef);
    }

    return (
        <>
            <h1>Edit Mode</h1>
            <PomodoroCycleEdit nbCycle={nbCycle} maxCycle={maxCycle} onChangeTotalCycle={handleTotalCycleRef} />
            {phases.map(phase => 
                <PomodoroPhaseEdit key={phase.id} phase={phase} onUpdateMinutes={handleMinuteRef} onUpdateSecond={handleSecondRef} />
            )}
            <button onClick={handleUpdateClick}>Confirm Update</button>
            <button onClick={onClickUpdate}>Cancel Update</button>
        </>
    )
}
