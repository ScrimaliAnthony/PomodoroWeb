import { useContext } from "react";
import { CycleContext } from "../../context/CycleContext";

export default function PomodoroCycle() {
    const { cycle, totalCycle } = useContext(CycleContext);

    return (
        <div className="pomodoro__cycle">
            <span>{cycle}</span>
            <span> / </span>
            <span className="pomodoro__cycle__total">{totalCycle}</span>
        </div>
    );
}
