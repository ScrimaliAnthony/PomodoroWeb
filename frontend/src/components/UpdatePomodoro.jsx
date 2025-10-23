import { useState } from "react";

export default function UpdatePomodoro(start) {
    const [isUpdate, setIsUpdate] = useState(false)

    const update = () => {
        setIsUpdate(!isUpdate);
    }

    return (
        <>
            <button onClick={update}>Modifier</button>
            {isUpdate && 
                <>
                    <h2>Modifier le Pomodoro</h2>
                    <p>Modifier le temps sur le pomodoro</p>
                    <input type="number" min="0" max="60" name="minutes" placeholder="minutes"/>
                    <input type="number" min="0" max="60" name="seconds" placeholder="seconds"/>
                    <button onClick={update}>Confirmer</button>
                </>
            }
        </>
    )
}