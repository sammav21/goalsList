import GoalCreate from "../components/GoalCreate"
import GoalsList from "../components/ListedGoals/GoalsList"
import PostData from "../components/PostData"

export default function MainPage(props){
    return(
    <>
        <header>
            <h1>Goals</h1>
        </header>
        <PostData refreshData={props.refreshData} isGoal={true}/>
        <GoalsList goals={props.goals} refreshData={props.refreshData} />
    </>
    )
}