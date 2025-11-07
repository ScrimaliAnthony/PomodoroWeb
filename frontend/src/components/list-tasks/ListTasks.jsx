import React from "react";
import AddTask from "../add-task/AddTask";
import Task from "../task/Task";

export default function ListTasks({ tasks, dispatchTasks, TASK_STATUS, setCurrentTask }) {

    const handleTaskSelect = (index) => {
        setCurrentTask(index);
        dispatchTasks({ type: "select", index });
    };

    const handleTaskDone = (index, done) => {
        dispatchTasks({ type: "checkbox", index, done })
    };

    const handleTaskAdd = (tasks, titleInput, statusInput, descriptionInput, cycleInput) => {
        dispatchTasks({ type: "add", tasks, titleInput, statusInput, descriptionInput, cycleInput });
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
        <AddTask TASK_STATUS={TASK_STATUS} tasks={tasks} onTaskAdd={handleTaskAdd} /> 
    </>
}