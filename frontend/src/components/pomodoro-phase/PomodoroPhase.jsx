export default function PomodoroPhase({ phase, currentPhase, displayFormat, onPhaseClick }) {

    const handlerClick = () => {
        onPhaseClick(phase.id);
    }

    return (
        <p style={currentPhase === phase.id ? { fontWeight: "bold", cursor: "pointer" } : {cursor: "pointer"}}
            onClick={handlerClick}>
            {phase.label} {displayFormat(phase.minutes, phase.seconds)}
        </p>
    )
}
