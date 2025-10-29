import { displayFormat } from "../../utils/formatTime"

export default function ListTimers({ timers, currentIndex }) {
    return <>
            {timers.map(timer => (
                <div key={timer.id}>
                    <p style={currentIndex === timer.id ? { fontWeight: "bold" } : {}}>{timer.label} {displayFormat(timer.minutes, timer.seconds)}</p>
                </div>
            ))}
        </>
}