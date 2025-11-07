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
            const { tasks, titleInput, statusInput, descriptionInput, cycleInput } = action;

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
                nbCycle: cycleInput,
                isDone: false
            };

            const newTaskList = [...tasks, newTask];
            return newTaskList;
        }

        case "delete": {
            const { id } = action;

            const newTasks = state.filter(task => task.id !== id);
            console.log(newTasks)
            return newTasks;
        }

        default:
            return state;
    }
}