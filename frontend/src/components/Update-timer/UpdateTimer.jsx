import { useState } from "react";

export default function UpdatePomodoro({ timers, setTimers, currentIndex }) {
    const [openUpdate, setOpenUpdate] = useState(false);
    const [minutesInput, setMinutesInput] = useState('');
    const [secondsInput, setSecondsInput] = useState('');
    const [labelInput, setLabelInput] = useState('');

    const changeOpenUpdate = () => {
        setOpenUpdate(prev => !prev);
    }

    const updateTimer = () => {
        if( labelInput === '' || minutesInput === '' || secondsInput === '') {
            changeOpenUpdate();
            return;
        }

        const newTimer = timers.map((timer, index) => {
            if (index === currentIndex) {
                return {
                    ...timers,
                    label: labelInput,
                    minutes: parseInt(minutesInput),
                    seconds: parseInt(secondsInput)
                }
            }
            return timer;
        })

        setTimers(newTimer);
        setLabelInput('');
        setSecondsInput('');
        setMinutesInput('');
        changeOpenUpdate();
    }

    return (
        <>
            <button onClick={changeOpenUpdate}>Modifier</button>
            {openUpdate && 
                <>
                    <h2>Update Pomodoro</h2>
                    <input type="text" placeholder="label" value={labelInput} onChange={(e) => setLabelInput(e.target.value)} />
                    <input type="number" min="0" name="minutes" placeholder="minutes" value={minutesInput} onChange={(e) => setMinutesInput(e.target.value)}/>
                    <input type="number" min="0" max="59" name="seconds" placeholder="seconds" value={secondsInput} onChange={(e) => setSecondsInput(e.target.value)}/>
                    <button onClick={updateTimer}>Confirmer</button>
                </>
            }
        </>
    )
}