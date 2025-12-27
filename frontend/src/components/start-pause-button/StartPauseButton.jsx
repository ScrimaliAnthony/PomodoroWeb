export default function StartPauseButton({ isStart, onClickStartOrStop }) {
    return (
        <button
            className={isStart ? "countdown__button--active" : "countdown__button"}
            onClick={onClickStartOrStop}
        >
            {isStart ? "Pause" : "Start"}
        </button>
    )
}