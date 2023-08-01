import GoalDetails from "./GoalDetails"
import GoalTitle from "./GoalTitle"

export default function Goal(props){
    return(
        <>
        {props.goals.map((goal) => {
            return( 
            <div className="goalContainer" key={goal.goalId}>
                <GoalTitle title={goal.name} />{/* will come across issue where the button in this component needs to affect the display of the next component below*/}
                <GoalDetails goal={goal} />
            </div>
            )
        })}
        </>
    )
}