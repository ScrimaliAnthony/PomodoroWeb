import PomodoroCycle from "../pomodoro-cycle/PomodoroCycle"
import PomodoroPhase from "../pomodoro-phase/PomodoroPhase"

export default function PomodoroDisplay({ phases, onClickUpdate }) {
    return (
        <>
            <h1>Pomodoro</h1>
            <PomodoroCycle />
            {phases.map(phase => 
                <PomodoroPhase key={phase.id} phase={phase} />
            )}
            <button onClick={onClickUpdate}>Update Pomodor</button>
        </>
    )
}