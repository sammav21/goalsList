import GoalCreate from "../components/GoalCreate"
import GoalsList from "../components/ListedGoals/GoalsList"

export default function MainPage(props){
    return(
    <>
        <header>
            <h1>Goals</h1>
        </header>
        <GoalCreate refreshData={props.refreshData} goal={true}/>
        <GoalsList goals={props.goals} />
    </>
    )
}