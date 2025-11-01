export default function TimerNavigator({ isNext, setCurrentTimer, maxIndex, setIsStart, setIsTimerEnd }) {

    const changeTimer = () => {
        if (isNext) {
            setCurrentTimer(prev => 
                maxIndex === prev ? prev : prev + 1
            );
        } else {
            setCurrentTimer(prev => 
                prev === 0 ? prev : prev - 1);
        }
        setIsStart(false);
        setIsTimerEnd(false);
    }

    return <>
        <button onClick={changeTimer}>{isNext ? "Next" : "Prev"}</button>
    </>
}