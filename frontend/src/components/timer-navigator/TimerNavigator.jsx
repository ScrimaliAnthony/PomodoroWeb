export default function TimerNavigator({ isNext, setCurrentIndex, maxIndex, setIsStart, setIsTimerEnd }) {

    const changeTimer = () => {
        if (isNext) {
            setCurrentIndex(prev => 
                maxIndex === prev ? prev : prev + 1
            );
        } else {
            setCurrentIndex(prev => 
                prev === 0 ? prev : prev - 1);
        }
        setIsStart(false);
        setIsTimerEnd(false);
    }

    return <>
        <button onClick={changeTimer}>{isNext ? "Next" : "Prev"}</button>
    </>
}