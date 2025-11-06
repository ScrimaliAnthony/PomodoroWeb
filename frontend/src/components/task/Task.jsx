export default function Task({ task, index, onTaskSelect, onCheckBoxClick }) {
    const handleTaskClick = () => {
        onTaskSelect(index);
    }

    const handleCheckBoxClick = (e) => {
        onCheckBoxClick(index, e.target.checked);
    }
    
    return (
        <div style={{cursor: "pointer", border: "1px solid black" }}>
            <div onClick={handleTaskClick} >
                <h2>{task.title}</h2>
                <span>{task.status}</span>
                <p>{task.desc}</p>
                <span>{task.actualCycle} / {task.nbCycle}</span>
            </div>
            <div>
                <input type="checkbox" checked={task.isDone} onChange={handleCheckBoxClick} />
                <button>Update</button>
                <button>Delete</button>
            </div>
        </div>
    )
}