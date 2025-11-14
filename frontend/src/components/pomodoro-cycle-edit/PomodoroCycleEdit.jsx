import { useContext } from "react";
import { CycleContext } from "../../context/CycleContext";

export default function PomodoroCycleEdit({ onChangeTotalCycle }) {
    const { cycle, totalCycle } = useContext(CycleContext);
    
    return (
        <>
            <div style={{display: "flex"}}>
                <p style={{fontWeight: "bold"}}>{cycle} / </p>
                <input type="number" min="0" placeholder="cycle" defaultValue={totalCycle} onChange={(e) => onChangeTotalCycle(e.target.valueAsNumber)}/>
            </div>
        </>
    )
}
