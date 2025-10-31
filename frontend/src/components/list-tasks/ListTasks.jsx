export default function ListTasks({ tasks }) {
    return <>
        {tasks.map((task, index) => 
            <div key={index} style={{border: "1px solid black"}}>
                <h2>{task.title}</h2>
                <span>{task.label}</span>
                <p>{task.desc}</p>
                <span>{task.actualCycle} / {task.nbCycle}</span>
                <button>Done</button>
            </div>
        )}
    </>
}