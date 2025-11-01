export default function Task({ task, index, TASK_STATUS }) {

    const handleClick = () => {
        // task.TASK_STATUS.IN_PROGRESS;
    }


    return <div onClick={handleClick} style={{cursor: "pointer", border: "1px solid black"}}>
        <h2>{task.title}</h2>
        <span>{task.status}</span>
        <p>{task.desc}</p>
        <span>{task.actualCycle} / {task.nbCycle}</span>
        <button>Update</button>
        <button>Delete</button>
    </div>
}