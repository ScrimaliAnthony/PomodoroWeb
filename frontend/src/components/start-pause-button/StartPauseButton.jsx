export default function StartPauseButton({ isStart, onClickStartOrStop }) {
    return <button onClick={onClickStartOrStop}>{isStart ? "Pause" : "Start"}</button>
}