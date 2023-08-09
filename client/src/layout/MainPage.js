import { useContext } from "react"
import GoalsList from "../components/ListedGoals/GoalsList"
import PostData from "../components/PostData"
import UserContext from "../context/UserContext"

export default function MainPage(props){
    const authorities = useContext(UserContext);

    const handleLogout = () => {
        authorities.logout();
    }
    
    return(
    <>
        <header>
            <p className="logoutText" onClick={handleLogout}>Logout</p>
        </header>
        <div className="pageTitleDiv">
        <h1 className="pageTitle">Goals</h1>
        </div>
        <form>
        <PostData refreshData={props.refreshData} isGoal={true}/>
        </form>
        <GoalsList goals={props.goals} refreshData={props.refreshData} />
    </>
    )
}