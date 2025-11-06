import React, { useEffect, useState } from "react";
import AddTask from "../add-task/AddTask";
import Task from "../task/Task";

export default function ListTasks({ tasks, setTasks, TASK_STATUS, setCurrentTask }) {
    

    const handleTaskSelect = (index) => {
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

    const handleTaskDone = (index, done) => {
        setTasks(prev => {
            return prev.map((task, i) => {
                if (i !== index) {
                    return task;
                }

                if (done) {
                    return { 
                        ...task,
                        isDone: done,
                        status: TASK_STATUS.DONE,
                        actualCycle: task.nbCycle
                    };
                } else {
                    return {
                        ...task,
                        isDone: done,
                        status: TASK_STATUS.TODO,
                        nbCycle: task.nbCycle + 1
                    };
                }
            });
        });
    };


    return <>
        {tasks.map((task, index) => 
            <React.Fragment key={index} >
                <Task task={task} index={index} onTaskSelect={handleTaskSelect} onCheckBoxClick={handleTaskDone} />
            </React.Fragment>
        )}
        <AddTask TASK_STATUS={TASK_STATUS} tasks={tasks} setTasks={setTasks} /> 
    </>
}