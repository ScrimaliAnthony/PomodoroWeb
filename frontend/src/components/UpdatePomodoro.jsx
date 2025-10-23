import { useState } from "react";

export default function UpdatePomodoro({setMinutes, setSeconds}) {
    const [openUpdate, setOpenUpdate] = useState(false);
    const [minutesInput, setMinutesInput] = useState('');
    const [secondsInput, setSecondsInput] = useState('');

    const changeOpenUpdate = () => {
        setOpenUpdate(!openUpdate);
    }

    const updateTimer = () => {
        if (secondsInput === '' || minutesInput === '') {
            changeOpenUpdate();
        }
        else if (parseInt(secondsInput, 10) > 59) {
            setSeconds(59);
            setMinutes(parseInt(minutesInput, 10));
        } else {
            setMinutes(parseInt(minutesInput, 10));
            setSeconds(parseInt(secondsInput, 10));
        }
        setSecondsInput('');
        setMinutesInput('');
        changeOpenUpdate();
    }

    return (
        <>
            <button onClick={changeOpenUpdate}>Modifier</button>
            {openUpdate && 
                <>
                    <h2>Modifier le Pomodoro</h2>
                    <p>Modifier le temps sur le pomodoro</p>
                    <input type="number" min="0" name="minutes" placeholder="minutes" value={minutesInput} onChange={(e) => setMinutesInput(e.target.value)}/>
                    <input type="number" min="0" max="59" name="seconds" placeholder="seconds" value={secondsInput} onChange={(e) => setSecondsInput(e.target.value)}/>
                    <button onClick={updateTimer}>Confirmer</button>
                </>
            }
        </>
    )
}