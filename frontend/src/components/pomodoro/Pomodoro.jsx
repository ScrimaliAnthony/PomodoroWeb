import { useState, useContext } from "react";

import PomodoroDisplay from "../pomodoro-display/PomodoroDisplay";
import PomodoroEdit from "../pomodoro-edit/PomodoroEdit";

import { initialPhases } from "../../data/pomodoro"

import { CycleContext } from "../../context/CycleContext";

export default function Pomodoro() {
    const { setTotalCycle } = useContext(CycleContext);

    const [phases, setPhases] = useState(initialPhases);
    const [isEditMode, setIsEditMode] = useState(false);

    const handleEditMode = () => {
        setIsEditMode(prev => !prev);
    }

    const handleEditPomodoro = (totalCycleRef, minuteRef, secondRef) => {
        setTotalCycle(totalCycleRef.current);
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
                <PomodoroEdit phases={phases} onClickUpdate={handleEditMode} onEdit={handleEditPomodoro} />    
                :
                <PomodoroDisplay phases={phases} onClickUpdate={handleEditMode} />
            }
        </>
    )
}
