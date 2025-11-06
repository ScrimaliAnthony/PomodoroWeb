import { useEffect, useState } from "react";

export default function Task({ task, index, changeCurrentTask }) {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    }
    
    useEffect(() => {
        if (task.actualCycle === task.nbCycle) {
            setIsChecked(true);
        }
    }, [task.actualCycle])
    
    console.log(isChecked);
    return <div onClick={() => changeCurrentTask(index)} style={{cursor: "pointer", border: "1px solid black" }}>
        <h2>{task.title}</h2>
        <span>{task.status}</span>
        <p>{task.desc}</p>
        <span>{task.actualCycle} / {task.nbCycle}</span>
        <input type="checkbox" onChange={handleCheckboxChange} checked={isChecked}/>
        <button>Update</button>
        <button>Delete</button>
    </div>
}