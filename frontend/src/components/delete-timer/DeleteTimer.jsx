import { useState } from "react";

export default function DeleteTimer({ timers, setTimers, currentIndex, setCurrentIndex }) {

    const [cantDelete, setCantDelete] = useState(false);

    const delTimer = () => {
        if (timers.length === 1) {
            setCantDelete(prev => !prev);
            return;
        }

        const updateTimers = timers.filter(timer => timer.id !== currentIndex);
        const reindexedTimers = updateTimers.map((timer, index) => ({
            ...timer,
            id: index
        }));
        setTimers(reindexedTimers);
        setCurrentIndex(prev => {
            if (prev === 0) {
                return prev;
            } else {
                return prev - 1;
            }
        });
    }

    return <>
        <button onClick={delTimer}>Delete</button>
        {cantDelete && 
            <>
                <p style={{ color: 'red' }}>You Can't Delete the last timer</p>
            </>
        }
    </>
}