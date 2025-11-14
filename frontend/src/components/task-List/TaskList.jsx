import { TASK_STATUS } from "../../constants/tasks";
import AddTask from "../add-task/AddTask";
import Task from "../task/Task";

export default function TaskList({ tasks, dispatchTasks, onTaskAdd }) {
    
    const handleTaskSelect = (index) => {
        dispatchTasks({ type: "select", index });
    };

    const handleTaskDone = (index, done) => {
        dispatchTasks({ type: "checkbox", index, done })
    };

    const handleTaskDelete = (id) => {
        dispatchTasks({ type: "delete", id });
    }

    const handleTaskUpdate = (titleInput, descriptionInput, cycleInput, id) => {
        dispatchTasks({ type: "update", titleInput, descriptionInput, cycleInput, id });
    }

    return <>
        {tasks.map((task, index) => 
            <Task
                key={task.id} task={task} index={index}
                onTaskSelect={handleTaskSelect} onCheckBoxClick={handleTaskDone} onDeleteTask={handleTaskDelete} onUpdateTask={handleTaskUpdate}
            />
        )}
        <AddTask TASK_STATUS={TASK_STATUS} onTaskAdd={onTaskAdd} /> 
    </>
}