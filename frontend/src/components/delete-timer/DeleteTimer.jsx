export default function DeleteTimer({ timers, setTimers, currentIndex }) {

    const delTimer = () => {
        const updateTimers = timers.filter(timer => timer.id !== currentIndex);
        const reindexedTimers = updateTimers.map((timer, index) => ({
            ...timer,
            id: index
        }));
        setTimers(reindexedTimers);
    }

    return <>
        <button onClick={delTimer}>Delete</button>
    </>
}