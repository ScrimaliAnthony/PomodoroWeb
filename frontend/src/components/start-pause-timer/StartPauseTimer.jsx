export default function StartPausePomodoro({ isStart, setIsStart }) {

    const startOrStop = () => {
        setIsStart(!isStart)
    }

    return <button onClick={startOrStop}>{isStart ? "Pause" : "Start"}</button>
}