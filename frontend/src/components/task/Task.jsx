import { useEffect } from "react";

export default function Task({ task, index, changeCurrentTask, onDoneChange }) {
    const handleCheckboxChange = (e) => {
        onDoneChange(index, e.target.checked);
    };

    useEffect(() => {
        if (task.actualCycle === task.nbCycle && !task.done) {
            onDoneChange(index, true);
        }
    }, [task.actualCycle, task.nbCycle, task.done, index, onDoneChange]);

    return <div onClick={() => changeCurrentTask(index)} style={{cursor: "pointer", border: "1px solid black" }}>
        <h2>{task.title}</h2>
        <span>{task.status}</span>
        <p>{task.desc}</p>
        <span>{task.actualCycle} / {task.nbCycle}</span>
        <input type="checkbox" checked={task.done} onChange={handleCheckboxChange} />
        <button>Update</button>
        <button>Delete</button>
    </div>
}