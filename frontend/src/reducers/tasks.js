export const TASK_STATUS = {
    TODO: "To Do",
    IN_PROGRESS: "In Progress",
    DONE: "Done"
};

export const initialTasks = [
    { id: 0, title: "My first Task", status: TASK_STATUS.TODO, desc: "Add my today tasks to the list", actualCycle: 0, nbCycle: 1, isDone: false },
    { id: 1, title: "My second Task", status: TASK_STATUS.TODO, desc: "Add a task to the cycle", actualCycle: 0, nbCycle: 2, isDone: false },
    { id: 2, title: "My third Task", status: TASK_STATUS.DONE, desc: "Finish my today tasks", actualCycle: 1, nbCycle: 1, isDone: true }
];

export function tasksReducer(state, action) {
    switch (action.type) {
        case "select": {
            const { index } = action;

            return state.map((task, i) => {
                let newCycle = task.nbCycle;

                if (task.isDone) {
                    newCycle++;
                }

                if (i === index) {
                    return { ...task, status: TASK_STATUS.IN_PROGRESS, isDone: false, nbCycle: newCycle };
                }

                if (task.status === TASK_STATUS.IN_PROGRESS) {
                    return { ...task, status: TASK_STATUS.TODO };
                }

                return task;
            });
        }

        case "checkbox": {
            const { index, done } = action;

            return state.map((task, i) => {
                if (i !== index) {
                    return task;
                }

                if (done) {
                    return { 
                        ...task,
                        isDone: done,
                        status: TASK_STATUS.DONE,
                        nbCycle: task.actualCycle
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
        }

        case "add": {
            const { titleInput, statusInput, descriptionInput, cycleInput, id } = action;

            if(titleInput === "" || statusInput === "" || descriptionInput === "" || cycleInput === "") {
                return state;
            }

            const newNbCycle = Number(cycleInput);

            const newTask = {
                id,
                title: titleInput,
                status: statusInput,
                desc: descriptionInput,
                actualCycle: 0,
                nbCycle: newNbCycle,
                isDone: false
            };

            return [...state, newTask];
        }

        case "delete": {
            const { id } = action;

            const newTasks = state.filter(task => task.id !== id);
            return newTasks;
        }

        case "update": {
            const { titleInput, descriptionInput, cycleInput, id } = action;

            return state.map((task) => {
                if (id !== task.id) {
                    return task;
                }
                
                const newNbCycle = Number(cycleInput);
                let newIsDone = false;
                let newActualCycle = 0;

                if (task.actualCycle > newNbCycle) {
                    newIsDone = true;
                    newActualCycle = newNbCycle;
                } else if (task.actualCycle === newNbCycle) {
                    newIsDone = true;
                }


                return {
                    ...task,
                    title: titleInput,
                    desc: descriptionInput,
                    actualCycle: newActualCycle,
                    nbCycle: newNbCycle,
                    isDone: newIsDone
                }
            })
        }

        case "nextCycle": {
            let isNewCurrentTask = false;

            let newTasks =  state.map((task) => {
                if (task.status === TASK_STATUS.IN_PROGRESS) {
                    const nextCycle = task.actualCycle + 1;
                    let newIsDone = false;
                    let newStatus = TASK_STATUS.IN_PROGRESS;

                    if (nextCycle === task.nbCycle) {
                        newIsDone = true;
                        newStatus = TASK_STATUS.DONE;
                        isNewCurrentTask = true;
                    }

                    return {
                        ...task,
                        status: newStatus,
                        actualCycle: nextCycle,
                        isDone: newIsDone
                    }
                }

                if (isNewCurrentTask && task.status === TASK_STATUS.TODO) {
                    isNewCurrentTask = false;
                    return {
                        ...task,
                        status: TASK_STATUS.IN_PROGRESS
                    }
                }
                return task;
            });

            if (isNewCurrentTask) {
                return newTasks.map((task) => {
                    if (task.status === TASK_STATUS.TODO) {
                        isNewCurrentTask = false;
                        return {
                            ...task,
                            status: TASK_STATUS.IN_PROGRESS
                        }
                    }
                    return task;
                })
            }
            return newTasks;
        }

        default:
            return state;
    }
}