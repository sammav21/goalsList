import Goal from "./Goal";

export default function GoalsList(props){
    return (
        <div className="list-section">
            <ul className="list">
            {props.goals.map((goal) => {
            return(
                <Goal key={goal.goalId} goal={goal} refreshData={props.refreshData}/>
            )})}
            </ul>
        </div>
    )
}