export default function PomodoroCycleEdit({ nbCycle, maxCycle, onChangeTotalCycle }) {
    return (
        <>
            <div style={{display: "flex"}}>
                <p style={{fontWeight: "bold"}}>{nbCycle} / </p>
                <input type="number" min="0" placeholder="cycle" defaultValue={maxCycle} onChange={onChangeTotalCycle}/>
            </div>
        </>
    )
}
