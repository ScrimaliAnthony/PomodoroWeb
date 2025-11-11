export default function PomodoroPhaseEdit({ phaseInput, onUpdateMinutes }) {

    const handlerInputMinutes = (e) => {
        onUpdateMinutes(e, phase);
    }

    return (
        <div>
            <p>{phaseInput.label}
                <input type="number" min="0" name="minutes" placeholder="minutes" value={phaseInput.minutes} onChange={(e) => handlerInputMinutes(Number(e.target.value))}/>
                {/* <input type="number" min="0" max="59" name="seconds" placeholder="seconds" value={phaseInput.seconds} onChange={(e) => handlerPhaseInput(Number(e.target.value))}/> */}
            </p>
        </div>
    )
}