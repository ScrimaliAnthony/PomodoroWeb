export default function Task({ task, index, changeCurrentTask }) {

    return <div onClick={() => changeCurrentTask(index)} style={{cursor: "pointer", border: "1px solid black" }}>
        <h2>{task.title}</h2>
        <span>{task.status}</span>
        <p>{task.desc}</p>
        <span>{task.actualCycle} / {task.nbCycle}</span>
        <button>Update</button>
        <button>Delete</button>
    </div>
}