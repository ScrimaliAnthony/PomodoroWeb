import React, { useRef } from "react";
import AddTask from "../add-task/AddTask";
import Task from "../task/Task";

export default function ListTasks({ tasks, dispatchTasks, TASK_STATUS, setCurrentTask }) {
    const nextTaskIdRef = useRef(tasks.length);

    const handleTaskSelect = (index) => {
        setCurrentTask(index);
        dispatchTasks({ type: "select", index });
        console.log(tasks);
    };

    const handleTaskDone = (index, done) => {
        dispatchTasks({ type: "checkbox", index, done })
    };

    const handleTaskAdd = (titleInput, statusInput, descriptionInput, cycleInput) => {
        const newId = nextTaskIdRef.current;
        nextTaskIdRef.current += 1;

        dispatchTasks({ type: "add", id: newId, titleInput, statusInput, descriptionInput, cycleInput });
    }
    
    const handleTaskDelete = (id) => {
        dispatchTasks({ type: "delete", id });
    }

    return <>
        {tasks.map((task, index) => 
            <React.Fragment key={task.id} >
                <Task task={task} index={index} onTaskSelect={handleTaskSelect} onCheckBoxClick={handleTaskDone} onDeleteTask={handleTaskDelete}/>
            </React.Fragment>
        )}
        <AddTask TASK_STATUS={TASK_STATUS} onTaskAdd={handleTaskAdd} /> 
    </>
}