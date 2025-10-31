import { useState } from "react";
import UpdateCycle from "../update-cycle/UpdateCycle";
import UpdateTimer from "../update-timer/UpdateTimer";

export default function UpdatePomodoro({ timers, setTimers, nbCycle, setNbCycle, maxCycle, setMaxCycle }) {
    const [openUpdate, setOpenUpdate] = useState(false);
    const [nbCycleInput, setNbCycleInput] = useState(nbCycle);
    const [timersInput, setTimersInput] = useState(
        timers.map((timer, index) => ({
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

        const newTimer = timers.map((timer, index) => {
            return {
                ...timer,
                minutes: parseInt(timersInput[index].minutes),
                seconds: parseInt(timersInput[index].seconds),
            }
        })

        setNbCycle(parseInt(nbCycleInput));
        setMaxCycle(parseInt(nbCycleInput));

        setTimers(newTimer);
        changeOpenUpdate();
    }

    return (
        <>
            <button onClick={changeOpenUpdate}>Modifier</button>
            {openUpdate && 
                <>
                    <h2>Update Pomodoro</h2>
                    <UpdateCycle nbCycleInput={nbCycleInput} setNbCycleInput={setNbCycleInput} maxCycle={maxCycle} />
                    {timers.map((timer, index) =>
                        <div key={timer.id}>
                            <UpdateTimer index={index} timersInput={timersInput} setTimersInput={setTimersInput} />
                        </div>
                    )}
                    <button onClick={updatePomodoro}>Confirmer</button>
                </>
            }
        </>
    )
}
