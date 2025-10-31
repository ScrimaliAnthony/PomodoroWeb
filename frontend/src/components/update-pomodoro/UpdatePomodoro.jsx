import { useState } from "react";
import UpdateCycle from "../update-cycle/UpdateCycle";
import UpdateTimer from "../update-timer/UpdateTimer";

export default function UpdatePomodoro({ timers, setTimers, currentIndex, nbCycle, setNbCycle, maxCycle, setMaxCycle }) {
    const [openUpdate, setOpenUpdate] = useState(false);
    const [nbCycleInput, setNbCycleInput] = useState(nbCycle);
    const [minutesInput, setMinutesInput] = useState('');
    const [secondsInput, setSecondsInput] = useState('');

    const changeOpenUpdate = () => {
        if (!openUpdate) {
            const currentTimer = timers[currentIndex];
            setMinutesInput(currentTimer.minutes.toString());
            setSecondsInput(currentTimer.seconds.toString());
        }
        setOpenUpdate(prev => !prev);
    }

    const updateTimer = () => {
        if( minutesInput === '' || secondsInput === '' || nbCycleInput === '') {
            changeOpenUpdate();
            return;
        }

        // const newTimer = timers.map((timer, index) => {
        //     if (index === currentIndex) {
        //         return {
        //             ...timer,
        //             minutes: parseInt(minutesInput),
        //             seconds: parseInt(secondsInput)
        //         }
        //     }
        //     return timer;
        // })
        setNbCycle(parseInt(nbCycleInput));
        setMaxCycle(parseInt(nbCycleInput));

        // setTimers(newTimer);
        changeOpenUpdate();
    }

    return (
        <>
            <button onClick={changeOpenUpdate}>Modifier</button>
            {openUpdate && 
                <>
                    <h2>Update Pomodoro</h2>
                    <UpdateCycle nbCycleInput={nbCycleInput} setNbCycleInput={setNbCycleInput} maxCycle={maxCycle} />
                    {/* <br />
                    <UpdateTimer minutesInput={minutesInput} setMinutesInput={setMinutesInput} secondsInput={secondsInput} setSecondsInput={setSecondsInput} />
                    <br />
                    <UpdateTimer minutesInput={minutesInput} setMinutesInput={setMinutesInput} secondsInput={secondsInput} setSecondsInput={setSecondsInput} />
                    <br />
                    <UpdateTimer minutesInput={minutesInput} setMinutesInput={setMinutesInput} secondsInput={secondsInput} setSecondsInput={setSecondsInput} />
                    <br /> */}
                    <button onClick={updateTimer}>Confirmer</button>
                </>
            }
        </>
    )
}