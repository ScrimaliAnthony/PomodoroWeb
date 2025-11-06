import React from "react";
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
                    return t.status === TASK_STATUS.IN_PROGRESS ? { ...t, status: TASK_STATUS.TODO } : t;
                }
            })
        );
    };

    const handleTaskDoneChange = (index, done) => {
        setTasks(prev =>
            prev.map((t, i) =>
                i === index ? { ...t, done } : t
            )
        );
    };

    return <>
        {tasks.map((task, index) => 
            <React.Fragment key={index} >
                <Task task={task} index={index} changeCurrentTask={changeCurrentTask} onDoneChange={handleTaskDoneChange} />
            </React.Fragment>
        )}
        <AddTask TASK_STATUS={TASK_STATUS} tasks={tasks} setTasks={setTasks} /> 
    </>
}