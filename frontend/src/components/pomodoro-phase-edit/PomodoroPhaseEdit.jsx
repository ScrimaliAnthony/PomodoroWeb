export default function PomodoroPhaseEdit({ phase, onUpdateMinutes, onUpdateSecond }) {

    return (
        <div>
            <p>{phase.label}
                <input type="number" min="0" max="59" name="minutes" placeholder="minutes" defaultValue={phase.minutes} onChange={(e) => onUpdateMinutes(e.target.valueAsNumber, phase.id)}/>
                <input type="number" min="0" max="59" name="seconds" placeholder="seconds" defaultValue={phase.seconds} onChange={(e) => onUpdateSecond(e.target.valueAsNumber, phase.id)}/>
            </p>
        </div>
    )
}