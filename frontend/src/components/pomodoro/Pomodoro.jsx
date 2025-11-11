import PomodoroCycle from "../pomodoro-cycle/PomodoroCycle";
import PomodoroPhase from "../pomodoro-phase/PomodoroPhase";
import { displayFormat } from "../../utils/formatTime"

import { initialPhases } from "../../data/pomodoro"
import { useState } from "react";
import PomodoroPhaseEdit from "../pomodoro-phase-edit/PomodoroPhaseEdit";

export default function Pomodoro({ nbCycle, maxCycle, currentPhase, setCurrentPhase, setNbCycle, setMaxCycle }) {
    const [phases, setPhases] = useState(initialPhases);
    const [phasesInput, setPhasesInput] = useState(phases);

    const [isEditMode, setIsEditMode] = useState(false);
    
    const handleCurrentPhase = (id) => {
        setCurrentPhase(id);
    }

    const handleUpdateClick = () => {
        setIsEditMode(prev => !prev);
    }

    const handleUpdateMinutes = (e) => {
        setPhasesInput(prev => {
            
        })
    }

    // const handleUpdatePomodoro = () => {
    //     setPhases(prev);
    // }

    return (
        <>
            <h1>Pomodoro</h1>
            <PomodoroCycle nbCycle={nbCycle} maxCycle={maxCycle} />
            {phases.map(phase => 
                isEditMode ? (
                    <PomodoroPhaseEdit key={phase.id} phase={phase} phaseInput={phasesInput[phase.id]} onUpdateMinutes={handleUpdateMinutes} />
                ) : (
                    <PomodoroPhase key={phase.id} phase={phase} currentPhase={currentPhase} displayFormat={displayFormat} onPhaseClick={handleCurrentPhase} />
            ))}
            {!isEditMode ? 
                <button onClick={handleUpdateClick}>Update Pomodor</button>
            :
            <>
                <button onClick={handleUpdateClick}>Cancel Update</button>
                {/* <button onClick={jsp}>Confirm Update</button> */}
            </>
            }
        </>
    )
}