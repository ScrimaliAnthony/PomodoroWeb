import { useState } from "react";

import verifiedEntry from "../../utils/verifiedEntry.js"

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

    const handleCycleChange = (e) => {
        let newCycle = e.target.valueAsNumber;
        setCycleInput(verifiedEntry(newCycle, task.nbCycle));
    };
    
    return (
        <div className="task">
            {!isOpenUpdate ?
                <>
                    <div onClick={handleTaskClick} >
                        <div className="task__section">
                            <h2 className="task__title">{task.title}</h2>
                            <span className="task__status">{task.status}</span>
                        </div>
                        <div className="task__section">
                            <p className="task__description">{task.desc}</p>
                            <span className="task__cycles">{task.actualCycle} / {task.nbCycle}</span>
                        </div>
                    </div>
                    <div className="task__section task__section--button">
                        <input className="task__checkbox" type="checkbox" checked={task.isDone} onChange={handleCheckBoxClick} />
                        <div className="task__buttons">
                            <button className="task__button" onClick={handleIsOpenUpdate}>Update</button>
                            <button className="task__button" onClick={handleDeleteClick}>Delete</button>
                        </div>
                    </div>
                </>
                :
                <>
                    <div>
                        <div className="task__section">
                            <input className="task__title task__title--edit" type="text" name="title" placeholder="new Task" value={titleInput} onChange={(e) => setTitleInput(e.target.value)} />
                            <span className="task__status">{task.status}</span>
                        </div>
                        <div className="task__section">
                            <input className="task__description task__description--edit" type="text" name="Description" placeholder="Description" value={descriptionInput} onChange={(e) => setDescriptionInput(e.target.value)} />
                            <div className="task__section--cycle">
                                <span className="task__cycles">{task.actualCycle} / </span>
                                <input className="task__cycles task__cycles--edit" type="number" min={0} max={9} name="cycle" placeholder="Number of Cycle to finish" defaultValue={cycleInput} onChange={handleCycleChange} />
                            </div>
                        </div>
                    </div>
                    <div className="task__section task__section--button">
                        <input className="task__checkbox" type="checkbox" checked={task.isDone} readOnly />
                        <div className="task__buttons">
                            <button className="task__button" onClick={handleUpdateClick}>Confirm Update</button>
                            <button className="task__button" onClick={handleIsOpenUpdate}>Cancel Update</button>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}
