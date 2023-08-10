import GoalsList from "../components/ListedGoals/GoalsList"
import PostData from "../components/PostData"
import TipsCard from "../components/TipsCard"

export default function MainPage(props){
    return(
    <>
        {props.tipsOpen  && <TipsCard />}
        <div className="pageTitleDiv">
        <h3 className="goalPrompt">Set a goal</h3>
        </div>
        <form>
        <PostData refreshData={props.refreshData} isGoal={true}/>
        </form>
        <GoalsList goals={props.goals} refreshData={props.refreshData} />
    </>
    )
}