import Goal from "./Goal";

export default function GoalsList(props){
    return (
        <div className="list-section">
            <ul className="list">
                <Goal goals={props.goals} refreshData={props.refreshData}/>
            </ul>
        </div>
    )
}