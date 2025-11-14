import { useState } from "react";

import PomodoroDisplay from "../pomodoro-display/PomodoroDisplay";
import PomodoroEdit from "../pomodoro-edit/PomodoroEdit";

import { initialPhases } from "../../data/pomodoro"

export default function Pomodoro({ nbCycle, maxCycle, setMaxCycle }) {
    const [phases, setPhases] = useState(initialPhases);
    const [isEditMode, setIsEditMode] = useState(false);

    const handleEditMode = () => {
        setIsEditMode(prev => !prev);
    }

    const handleEditPomodoro = (totalCycleRef, minuteRef, secondRef) => {
        setMaxCycle(totalCycleRef.current);
        const newPhases = phases.map((phase, id) => {
            return {
                ...phase,
                minutes: minuteRef.current[id],
                seconds: secondRef.current[id]
            }
        })
        setPhases(newPhases);
        setIsEditMode(prev => !prev);
    }
    
    return (
        <>
            {isEditMode ? 
                <PomodoroEdit nbCycle={nbCycle} maxCycle={maxCycle} phases={phases} onClickUpdate={handleEditMode} onEdit={handleEditPomodoro} />    
                :
                <PomodoroDisplay nbCycle={nbCycle} maxCycle={maxCycle} phases={phases} onClickUpdate={handleEditMode} />
            }
        </>
    )
}
