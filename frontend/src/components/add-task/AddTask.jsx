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
        <>
            <button onClick={openAddTask}>{!addTaskState ? "Add" : "Cancel"}</button>
            {addTaskState && (
                <>
                    <input type="text" name="title" placeholder="new Task" onChange={(e) => setTitleInput(e.target.value)} />
                    <select id="status" onChange={(e) => setStatusInput(e.target.value)} >
                        <option value={TASK_STATUS.TODO}>To Do</option>
                        <option value={TASK_STATUS.IN_PROGRESS}>In Progress</option>
                    </select>
                    <input type="text" name="Description" placeholder="Description" onChange={(e) => setDescriptionInput(e.target.value)} />
                    <input type="number" name="cycle" placeholder="Number of Cycle to finish" onChange={(e) => setCycleInput(e.target.value)} />
                    <button type="submit" onClick={handleAddClick}>Add Task</button>
                </>
            )}
        </>
    )
}
