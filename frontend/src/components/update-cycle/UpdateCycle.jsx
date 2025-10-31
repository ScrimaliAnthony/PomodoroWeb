import { useState } from "react"

export default function UpdateCycle() {
    const [inputCycle, setInputCycle] = useState('');

    return <div>
        <input type="number" min="0" placeholder="cycle" value={inputCycle} onChange={(e) => setInputCycle(e.target.value)}/> / 
    </div>
}