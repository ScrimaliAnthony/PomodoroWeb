import { useState } from "react"

export default function AddTask({ TASK_STATUS, tasks, setTasks }) {
    const [addTaskState, setAddTaskState] = useState(false);
    const [titleInput, setTitleInput] = useState("");
    const [statusInput, setStatusInput] = useState(TASK_STATUS.TODO);
    const [descriptionInput, setDescriptionInput] = useState("");
    const [cycleInput, setCycleInput] = useState("");

    const openAddTask = () => {
        setAddTaskState(prev => !prev);
    }

    const addTask= () => {
        if(titleInput === "" || statusInput === "" || descriptionInput === "" || cycleInput === "") {
            setAddTaskState(false);
            return;
        }

        const newTask = {
            id: tasks.lenght,
            title: titleInput,
            status: statusInput,
            desc: descriptionInput,
            actualCycle: 0,
            nbCycle: cycleInput
        };

        const newTaskList = [...tasks, newTask];
        setTasks(newTaskList);
        setTitleInput("");
        setStatusInput("");
        setDescriptionInput("");
        setCycleInput("");
        setAddTaskState(prev => !prev);
    }

    return <>
        <button onClick={openAddTask}>{!addTaskState ? "Add" : "Cancel"}</button>
        {addTaskState && (
            <>
                <input type="text" name="title" placeholder="new Task" onChange={(e) => setTitleInput(e.target.value)} />
                <select id="status" onChange={(e) => setStatusInput(e.target.value)} >
                    <option value={TASK_STATUS.TODO}>To Do</option>
                    <option value={TASK_STATUS.IN_PROGRESS}>In Progress</option>
                    <option value={TASK_STATUS.DONE}>Done</option>
                </select>
                <input type="text" name="Description" placeholder="Description" onChange={(e) => setDescriptionInput(e.target.value)} />
                <input type="number" name="cycle" placeholder="Number of Cycle to finish" onChange={(e) => setCycleInput(e.target.value)} />
                <button type="submit" onClick={addTask}>Add Task</button>
            </>
        )}
    </>
}
