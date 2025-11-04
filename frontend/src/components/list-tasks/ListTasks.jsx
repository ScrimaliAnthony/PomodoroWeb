import React, { useEffect } from "react";
import AddTask from "../add-task/AddTask";
import Task from "../task/Task";

export default function ListTasks({ tasks, setTasks, TASK_STATUS, currentTask, setCurrentTask }) {

    const changeCurrentTask = (index) => {
        setCurrentTask(index);

        setTasks(prev => 
            prev.map((t, i) => {
                if (i === index) {
                    return { ...t, status: TASK_STATUS.IN_PROGRESS };
                } else {
                    return t.status = "In Progress" ? { ...t, status: TASK_STATUS.TODO } : t;
                }
            })
        );
    };

    console.log(currentTask);

    return <>
        {tasks.map((task, index) => 
            <React.Fragment key={index} >
                <Task task={task} index={index} setCurrentTask={setCurrentTask} changeCurrentTask={changeCurrentTask} />
            </React.Fragment>
        )}
        <AddTask TASK_STATUS={TASK_STATUS} tasks={tasks} setTasks={setTasks} /> 
    </>
}