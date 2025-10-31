export default function UpdateTimer({ minutesInput, setMinutesInput, secondsInput, setSecondsInput }) {

    return (
        <>
            <input type="number" min="0" name="minutes" placeholder="minutes" value={minutesInput} onChange={(e) => setMinutesInput(e.target.value)}/>
            <input type="number" min="0" max="59" name="seconds" placeholder="seconds" value={secondsInput} onChange={(e) => setSecondsInput(e.target.value)}/>
        </>
    )
}