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
        if(totalCycleRef.current > 99) {
            totalCycleRef.current = 99;
        }
        if(totalCycleRef.current < 1) {
            totalCycleRef.current = 1;
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
            <h1 className="pomodoro__title">Pomodoro</h1>
            <PomodoroCycleEdit onChangeTotalCycle={handleTotalCycleRef} />
            <div className="pomodoro__phases">
                {phases.map(phase => 
                    <PomodoroPhaseEdit key={phase.id} phase={phase} onUpdateMinutes={handleMinuteRef} onUpdateSecond={handleSecondRef} />
                )}
            </div>
            <div className="pomodoro__update">
                <button className="pomodoro__button pomodoro__button--update" onClick={handleUpdateClick}>Confirm Update</button>
                <button className="pomodoro__button pomodoro__button--update" onClick={onClickUpdate}>Cancel Update</button>
            </div>
        </>
    )
}
