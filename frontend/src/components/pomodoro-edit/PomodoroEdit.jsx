import { useRef } from "react";
import PomodoroCycleEdit from "../pomodoro-cycle-edit/PomodoroCycleEdit";

export default function PomodoroEdit({ nbCycle, maxCycle, onClickUpdate }) {
    const totalCycleRef = useRef(maxCycle);

    const handleUpdateClick = () => {
        onClickUpdate();
    }

    const handleTotalCycleRef = (e) => {
        totalCycleRef.current = e.target.value;
    }

    return (
        <>
            <h1>Edit Mode</h1>
            <PomodoroCycleEdit nbCycle={nbCycle} maxCycle={maxCycle} onChangeTotalCycle={handleTotalCycleRef} />
            <button onClick={handleUpdateClick}>Cancel Update</button>
        </>
    )
}
