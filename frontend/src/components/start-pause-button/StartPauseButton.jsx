export default function StartPauseButton({ isStart, setIsStart }) {

    const startOrStop = () => {
        setIsStart(prev => !prev);
    }

    return <button onClick={startOrStop}>{isStart ? "Pause" : "Start"}</button>
}