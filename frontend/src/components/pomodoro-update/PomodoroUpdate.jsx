import { useState } from "react";
import UpdateCycle from "../update-cycle/UpdateCycle";
import UpdateTimer from "../update-timer/UpdateTimer";

export default function UpdatePomodoro({ phases, setPhases, nbCycle, setNbCycle, maxCycle, setMaxCycle }) {
    const [openUpdate, setOpenUpdate] = useState(false);
    const [nbCycleInput, setNbCycleInput] = useState(nbCycle);
    const [phasesInput, setPhasesInput] = useState(
        phases.map((timer, index) => ({
            id: index,
            minutes: timer.minutes,
            seconds: timer.seconds
        }))
    );

    const changeOpenUpdate = () => {
        setOpenUpdate(prev => !prev);
    }

    const updatePomodoro = () => {
        if( nbCycleInput === '') {
            changeOpenUpdate();
            return;
        }

        const newTimer = phases.map((timer, index) => {
            return {
                ...timer,
                minutes: parseInt(phasesInput[index].minutes),
                seconds: parseInt(phasesInput[index].seconds)
            }
        })

        setNbCycle(parseInt(nbCycleInput));
        setMaxCycle(parseInt(nbCycleInput));

        setPhases(newTimer);
        changeOpenUpdate();
    }

    return (
        <>
            <button onClick={changeOpenUpdate}>Update Pomodoro</button>
            {openUpdate && 
                <>
                    <h2>Update Pomodoro</h2>
                    <UpdateCycle nbCycleInput={nbCycleInput} setNbCycleInput={setNbCycleInput} maxCycle={maxCycle} />
                    {phases.map((timer, index) =>
                        <div key={timer.id}>
                            <UpdateTimer index={index} phasesInput={phasesInput} setPhasesInput={setPhasesInput} />
                        </div>
                    )}
                    <button onClick={updatePomodoro}>Confirmer</button>
                </>
            }
        </>
    )
}
