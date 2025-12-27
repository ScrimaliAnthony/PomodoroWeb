import { useContext } from "react";
import { CycleContext } from "../../context/CycleContext";

export default function PomodoroCycleEdit({ onChangeTotalCycle }) {
    const { cycle, totalCycle } = useContext(CycleContext);

    return (
        <div className="pomodoro__cycle">
            <span>{cycle}</span>
            <span> / </span>

            <label htmlFor="totalCycle"></label>
            <input
                id="totalCycle"
                className="pomodoro__cycle__input"
                name="totalCycle"
                type="number"
                min={0}
                defaultValue={totalCycle}
                onChange={(e) => onChangeTotalCycle(e.target.valueAsNumber)}
            />
        </div>
    );
}
