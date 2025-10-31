export default function UpdateCycle({ nbCycleInput, setNbCycleInput, maxCycle }) {

    return <div style={{display: "flex"}}>
        <input type="number" min="0" placeholder="cycle" value={nbCycleInput} onChange={(e) => setNbCycleInput(e.target.value)}/>
        <p style={{fontWeight: "bold"}}>/ {maxCycle}</p>
    </div>
}