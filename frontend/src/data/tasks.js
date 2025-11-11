import { TASK_STATUS } from "../constants/tasks";

export const initialTasks = [
    { id: 0, title: "My first Task", status: TASK_STATUS.TODO, desc: "Add my today tasks to the list", actualCycle: 0, nbCycle: 1, isDone: false },
    { id: 1, title: "My second Task", status: TASK_STATUS.TODO, desc: "Add a task to the cycle", actualCycle: 0, nbCycle: 2, isDone: false },
    { id: 2, title: "My third Task", status: TASK_STATUS.DONE, desc: "Finish my today tasks", actualCycle: 1, nbCycle: 1, isDone: true }
];
