import { useRef, useContext } from "react";
import PomodoroCycleEdit from "../pomodoro-cycle-edit/PomodoroCycleEdit";
import PomodoroPhaseEdit from "../pomodoro-phase-edit/PomodoroPhaseEdit";
import { CycleContext } from "../../context/CycleContext";
import { PhaseContext } from "../../context/PhaseContext";

import verifiedEntry from "../../utils/verifiedEntry.js"

export default function PomodoroEdit({ onClickUpdate, onEdit }) {
    const { phases } = useContext(PhaseContext);
    const { cycle, totalCycle } = useContext(CycleContext);
    const totalCycleRef = useRef(totalCycle);
    const cycleRef = useRef(cycle);

    const minuteRef = useRef(phases.map(phase => phase.minutes));
    const secondRef = useRef(phases.map(phase => phase.seconds));

    const handleTotalCycleRef = (e) => {
        totalCycleRef.current = verifiedEntry(e, totalCycle);
        if(totalCycleRef.current < cycleRef.current) {
            cycleRef.current = totalCycleRef.current;
        }
    }

    const handleMinuteRef = (e, id) => {
        minuteRef.current[id] = verifiedEntry(e, phases[id]?.minutes ?? 0);
    }

    const handleSecondRef = (e, id) => {
        secondRef.current[id] = verifiedEntry(e, phases[id]?.seconds ?? 0);
    }

    const handleUpdateClick = () => {
        onEdit(cycleRef, totalCycleRef, minuteRef, secondRef);
    }

    return (
        <>
            <h1>Edit Mode</h1>
            <PomodoroCycleEdit onChangeTotalCycle={handleTotalCycleRef} />
            {phases.map(phase => 
                <PomodoroPhaseEdit key={phase.id} phase={phase} onUpdateMinutes={handleMinuteRef} onUpdateSecond={handleSecondRef} />
            )}
            <button onClick={handleUpdateClick}>Confirm Update</button>
            <button onClick={onClickUpdate}>Cancel Update</button>
        </>
    )
}
