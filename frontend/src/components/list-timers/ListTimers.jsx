import { displayFormat } from "../../utils/formatTime"

export default function ListTimers({ timers, currentTimer }) {
    return <>
        {timers.map(timer => (
            <div key={timer.id}>
                <p style={currentTimer === timer.id ? { fontWeight: "bold" } : {}}>{timer.label} {displayFormat(timer.minutes, timer.seconds)}</p>
            </div>
        ))}
    </>
}