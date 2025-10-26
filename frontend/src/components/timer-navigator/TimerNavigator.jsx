export default function TimerNavigator({ isNext, setCurrentIndex, maxIndex }) {

    const changeTimer = () => {
        if (isNext) {
            return setCurrentIndex(prev => 
                maxIndex === prev ? prev : prev + 1
            );
        } else {
            return setCurrentIndex(prev => 
                prev === 0 ? prev : prev - 1);
        }
    }

    return <>
        <button onClick={changeTimer}>{isNext ? "Next" : "Prev"}</button>
    </>
}