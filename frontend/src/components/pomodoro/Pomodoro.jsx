import { useState } from "react";

import PomodoroDisplay from "../pomodoro-display/PomodoroDisplay";
import PomodoroEdit from "../pomodoro-edit/PomodoroEdit";

import { initialPhases } from "../../data/pomodoro"

export default function Pomodoro({ nbCycle, maxCycle, setNbCycle, setMaxCycle }) {
    const [phases, setPhases] = useState(initialPhases);
    const [isEditMode, setIsEditMode] = useState(false);

    const handleEditMode = () => {
        setIsEditMode(prev => !prev);
    }
    
    return (
        <>
            {isEditMode ? 
                <PomodoroEdit />    
                :
                <PomodoroDisplay nbCycle={nbCycle} maxCycle={maxCycle} phases={phases} onClickUpdate={handleEditMode} />
            }
        </>
    )
}



{/* <h1>Pomodoro</h1>
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
    <button onClick={jsp}>Confirm Update</button> 
</>
} */}



    // const [phases, setPhases] = useState(initialPhases);
    // const [phasesInput, setPhasesInput] = useState(phases);

    // const handleCurrentPhase = (id) => {
    //     setCurrentPhase(id);
    // }

    // const handleUpdateClick = () => {
    //     setIsEditMode(prev => !prev);
    // }

    // const handleUpdateMinutes = (e) => {
    //     setPhasesInput(prev => {
            
    //     })
    // }

    // const handleUpdatePomodoro = () => {
    //     setPhases(prev);
    // }