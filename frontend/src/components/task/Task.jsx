import { useState } from "react";

export default function Task({ task, index, onTaskSelect, onCheckBoxClick, onDeleteTask, onUpdateTask }) {
    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const [titleInput, setTitleInput] = useState(task.title);
    const [descriptionInput, setDescriptionInput] = useState(task.desc);
    const [cycleInput, setCycleInput] = useState(task.nbCycle);

    const handleTaskClick = () => {
        onTaskSelect(index);
    }

    const handleCheckBoxClick = (e) => {
        onCheckBoxClick(index, e.target.checked);
    }

    const handleDeleteClick = () => {
        onDeleteTask(task.id);
    }

    const handleUpdateClick = () => {
        onUpdateTask(titleInput, descriptionInput, cycleInput, task.id);
        setIsOpenUpdate(prev => !prev);
    }

    const handleIsOpenUpdate = () => {
        setTitleInput(task.title);
        setDescriptionInput(task.desc);
        setCycleInput(task.nbCycle);

        setIsOpenUpdate(prev => !prev);
    }
    
    return (
        <div style={{cursor: "pointer", border: "1px solid black" }}>
            {!isOpenUpdate ?
                <>
                    <div onClick={handleTaskClick} >
                        <h2>{task.title}</h2>
                        <span>{task.status}</span>
                        <p>{task.desc}</p>
                        <span>{task.actualCycle} / {task.nbCycle}</span>
                    </div>
                    <div>
                        <input type="checkbox" checked={task.isDone} onChange={handleCheckBoxClick} />
                        <button onClick={handleIsOpenUpdate}>Update</button>
                        <button onClick={handleDeleteClick}>Delete</button>
                    </div>
                </>
                :
                <>
                    <div>
                        <h2>
                            <input type="text" name="title" placeholder="new Task" value={titleInput} onChange={(e) => setTitleInput(e.target.value)} />
                        </h2>
                        <span>{task.status}</span>
                        <p>
                            <input type="text" name="Description" placeholder="Description" value={descriptionInput} onChange={(e) => setDescriptionInput(e.target.value)} />
                        </p>
                        <span>{task.actualCycle} / 
                            <input type="number" name="cycle" placeholder="Number of Cycle to finish" value={cycleInput} onChange={(e) => setCycleInput(e.target.value)} />
                        </span>
                    </div>
                    <div>
                        <input type="checkbox" checked={task.isDone} readOnly />
                        <button onClick={handleUpdateClick}>Confirm Update</button>
                        <button onClick={handleIsOpenUpdate}>Cancel Update</button>
                    </div>
                </>
            }
        </div>
    )
}
