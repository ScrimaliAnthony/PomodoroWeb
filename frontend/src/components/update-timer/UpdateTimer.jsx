import { useEffect, useState } from "react";

export default function UpdateTimer({ index, timersInput, setTimersInput }) {
    const [minutesInput, setMinutesInput] = useState(timersInput[index].minutes);
    const [secondsInput, setSecondsInput] = useState(timersInput[index].seconds);

    useEffect(() => {
        const newTimerInput = timersInput.map((timerInput, i) => {
            if(index === i) {
                return {
                    ...timerInput,
                    minutes: minutesInput,
                    seconds: secondsInput
                }
            }
            return timerInput;
        })

        setTimersInput(newTimerInput);
    }, [minutesInput, secondsInput]);

    return (
        <div>
            <p>Update timer {index + 1}</p>
            <input type="number" min="0" name="minutes" placeholder="minutes" value={minutesInput} onChange={(e) => setMinutesInput(Number(e.target.value))}/>
            <input type="number" min="0" max="59" name="seconds" placeholder="seconds" value={secondsInput} onChange={(e) => setSecondsInput(Number(e.target.value))}/>
        </div>
    )
}
