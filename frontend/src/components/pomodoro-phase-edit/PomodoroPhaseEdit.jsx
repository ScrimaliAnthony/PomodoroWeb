export default function PomodoroPhaseEdit({ phase, onUpdateMinutes, onUpdateSecond }) {

    return (
        <div className="pomodoro__phase--edit">
            <span>{phase.label}&nbsp;</span>
            <input
                className="pomodoro__phase__input"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={2}
                name="minutes"
                placeholder="minutes"
                defaultValue={String(phase.minutes).padStart(2, "0")}
                onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 2);
                    e.target.value = value;
                    onUpdateMinutes(value === "" ? 0 : Number(value), phase.id);
                }}
            />
            <span>:</span>
            <input
                className="pomodoro__phase__input"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={2}
                name="seconds"
                defaultValue={String(phase.seconds).padStart(2, "0")}
                onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 2);
                    e.target.value = value;
                    onUpdateSecond(value === "" ? 0 : Number(value), phase.id);
                }}
            />
        </div>
    )
}