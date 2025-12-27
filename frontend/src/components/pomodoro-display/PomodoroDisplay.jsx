import PomodoroCycle from "../pomodoro-cycle/PomodoroCycle"
import PomodoroPhase from "../pomodoro-phase/PomodoroPhase"

import { PhaseContext } from "../../context/PhaseContext"
import { useContext } from "react"

export default function PomodoroDisplay({ onClickUpdate }) {
    const { phases } = useContext(PhaseContext);
    return (
        <>
            <h1 className="pomodoro__title">Pomodoro</h1>
            <PomodoroCycle />
            <div className="pomodoro__phases">
                {phases.map(phase => 
                    <PomodoroPhase key={phase.id} phase={phase} />
                )}
            </div>
            <button className="pomodoro__button" onClick={onClickUpdate}>Update Pomodor</button>
        </>
    )
}
