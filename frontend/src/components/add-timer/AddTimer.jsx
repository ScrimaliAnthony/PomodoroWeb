import { useState } from "react";

export default function AddTimer({ timers, setTimers, currentIndex, setCurrentIndex }) {
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [minutesInput, setMinutesInput] = useState('');
    const [secondsInput, setSecondsInput] = useState('');
    const [labelInput, setLabelInput] = useState('');

    const isAdd = () => {
        setIsAddOpen(prev => !prev);
    }

    const addTimer = () => {
        if( labelInput === '' || minutesInput === '' || secondsInput === '') {
            isAdd();
            return;
        }

        const newTimer = {
            id: currentIndex +1,
            label: labelInput,
            minutes: parseInt(minutesInput),
            seconds: parseInt(secondsInput)
        };

        const before = timers.slice(0, currentIndex + 1);
        const after = timers.slice(currentIndex + 1);

        const updatedTimers = [...before, newTimer, ...after];

        const reindexedTimers = updatedTimers.map((timer, index) => ({
            ...timer,
            id: index
        }));

        setTimers(reindexedTimers);
        setCurrentIndex(prev => prev + 1);

        setLabelInput('');
        setMinutesInput('');
        setSecondsInput('');
        setIsAddOpen(false);
    }

    return <>
        <button onClick={isAdd}>Add</button>
        {isAddOpen &&
            <>
                <h2>Add a Timer</h2>
                <input type="text" placeholder="label" value={labelInput} onChange={(e) => setLabelInput(e.target.value)} />
                <input type="number" min="0" name="minutes" placeholder="minutes" value={minutesInput} onChange={(e) => setMinutesInput(e.target.value)}/>
                <input type="number" min="0" max="59" name="seconds" placeholder="seconds" value={secondsInput} onChange={(e) => setSecondsInput(e.target.value)}/>
                <button onClick={addTimer}>Confirmer</button>
            </>
        }
    </>
}