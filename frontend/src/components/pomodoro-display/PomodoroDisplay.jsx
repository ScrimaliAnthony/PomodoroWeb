import PomodoroCycle from "../pomodoro-cycle/PomodoroCycle"
import PomodoroPhase from "../pomodoro-phase/PomodoroPhase"

import { PhaseContext } from "../../context/PhaseContext"
import { useContext } from "react"

export default function PomodoroDisplay({ onClickUpdate }) {
    const { phases } = useContext(PhaseContext);
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
