import { displayFormat } from "../../utils/formatTime"

export default function ListTimers({ timers }) {
    return <>
            {timers.map(timer => (
                <div key={timer.id}>
                    <p>{timer.label} {displayFormat(timer.minutes, timer.seconds)}</p>
                </div>
            ))}
        </>
}