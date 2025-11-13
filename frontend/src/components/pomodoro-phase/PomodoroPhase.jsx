import { useContext } from "react";
import { PhaseContext } from "../../context/PhaseContext";
import { displayFormat } from "../../utils/formatTime"

export default function PomodoroPhase({ phase }) {
    const { currentPhase, setCurrentPhase } = useContext(PhaseContext);
    const isCurrentPhase = currentPhase === phase.id;

    return (
        <p style={isCurrentPhase ? { fontWeight: "bold", cursor: "pointer" } : {cursor: "pointer"}}
            onClick={() => setCurrentPhase(phase.id)}>
            {phase.label} {displayFormat(phase.minutes, phase.seconds)}
        </p>
    )
}
