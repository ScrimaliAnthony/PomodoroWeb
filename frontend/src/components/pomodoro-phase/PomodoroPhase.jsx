import { useContext } from "react";
import { PhaseContext } from "../../context/PhaseContext";
import { displayFormat } from "../../utils/formatTime"

export default function PomodoroPhase({ phase }) {
    const { currentPhase, setCurrentPhase } = useContext(PhaseContext);
    const isCurrentPhase = currentPhase === phase.id;

    return (
        <button 
            className={`pomodoro__phase ${isCurrentPhase ? "pomodoro__phase--active" : ""}`}
            onClick={() => setCurrentPhase(phase.id)}>
                {phase.label}&nbsp;{displayFormat(phase.minutes, phase.seconds)}
        </button>
    )
}
