import PomodoroCycle from "../pomodoro-cycle/PomodoroCycle"
import PomodoroPhase from "../pomodoro-phase/PomodoroPhase"

export default function PomodoroDisplay({ nbCycle, maxCycle, phases, onClickUpdate }) {
    return (
        <>
            <h1>display mode</h1>
            <PomodoroCycle nbCycle={nbCycle} maxCycle={maxCycle} />
            {phases.map(phase => 
                <PomodoroPhase key={phase.id} phase={phase} />
            )}
            <button onClick={onClickUpdate}>Update Pomodor</button>
        </>
    )
}