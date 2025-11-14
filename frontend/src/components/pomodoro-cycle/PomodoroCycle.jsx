import { useContext } from "react";

import { CycleContext } from "../../context/CycleContext";

export default function PomodoroCycle() {
    const { cycle, totalCycle } = useContext(CycleContext);

    return (
        <span>{cycle} / {totalCycle}</span>
    )
}