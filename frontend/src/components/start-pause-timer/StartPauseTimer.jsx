export default function StartPausePomodoro({ isStart, setIsStart }) {

    const startOrStop = () => {
        setIsStart(prev => !prev);
    }

    return <button onClick={startOrStop}>{isStart ? "Pause" : "Start"}</button>
}