import { useEffect, useState, useContext } from "react";
import { formatMS } from "../../utils/formatTime";
import StartPauseButton from "../start-pause-button/StartPauseButton";

import { PhaseContext } from "../../context/PhaseContext";
import { CycleContext } from "../../context/CycleContext";

export default function Countdown({ timer, isStart, handleStartOrStop, onNextCycle }) {
    const { currentPhase, setCurrentPhase } = useContext(PhaseContext);
    const { cycle, setCycle, totalCycle } = useContext(CycleContext);

    useEffect(() => {
        if (timer !== 0 || !isStart) {
            return;
        }

        switch (currentPhase) {
            case 0:
                if (cycle === totalCycle) {
                    setCurrentPhase(2);
                } else {
                    setCurrentPhase(1);
                    setCycle(prev => prev + 1);
                }
                onNextCycle();
                break;

            case 1:
                setCurrentPhase(0);
                break;

            case 2:
                setCurrentPhase(0);
                setCycle(1);
                break;

            default:
                break;
        }
    }, [timer]);

    return (
        <>
            <div>{formatMS(timer)}</div>
            <StartPauseButton isStart={isStart} onClickStartOrStop={handleStartOrStop} />
        </>
    )
}
