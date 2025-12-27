import { useState } from "react"

export default function AddTask({ TASK_STATUS, onTaskAdd }) {
    const [addTaskState, setAddTaskState] = useState(false);
    const [titleInput, setTitleInput] = useState("");
    const [statusInput, setStatusInput] = useState(TASK_STATUS.TODO);
    const [descriptionInput, setDescriptionInput] = useState("");
    const [cycleInput, setCycleInput] = useState("");

    const openAddTask = () => {
        setAddTaskState(prev => !prev);
    }

    const handleAddClick = () => {
        onTaskAdd(titleInput, statusInput, descriptionInput, cycleInput);

        setTitleInput("");
        setStatusInput(TASK_STATUS.TODO);
        setDescriptionInput("");
        setCycleInput("");
        setAddTaskState(false);
    }

    return (
        <div className="addTask">
            <div className="addTask__container">
                <button className="task__button" onClick={openAddTask}>{!addTaskState ? "Add" : "Cancel"}</button>
            </div>
            {addTaskState && (
                <div className="task task--no-hover">
                    <div className="task__section">
                        <input className="task__title task__title--edit" type="text" name="title" placeholder="new Task" onChange={(e) => setTitleInput(e.target.value)} />
                        <select className="task__status task__status--edit" id="status" onChange={(e) => setStatusInput(e.target.value)} >
                            <option value={TASK_STATUS.TODO}>To Do</option>
                            <option value={TASK_STATUS.IN_PROGRESS}>In Progress</option>
                        </select>
                    </div>
                    <div className="task__section">
                        <input className="task__description task__description--edit" type="text" name="Description" placeholder="Description" onChange={(e) => setDescriptionInput(e.target.value)} />
                        <input className="task__cycles task__cycles--add" type="number" name="cycle" placeholder="Cycle" onChange={(e) => setCycleInput(e.target.value)} />
                    </div>
                    <button className="task__button" type="submit" onClick={handleAddClick}>Add Task</button>
                </div>
            )}
        </div>
    )
}
