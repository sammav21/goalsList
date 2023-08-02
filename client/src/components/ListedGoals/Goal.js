import { useState } from "react"
import GoalDetails from "./GoalDetails"
import GoalTitle from "./GoalTitle"

export default function Goal(props){

    const [openDetails, setOpenDetails] = useState("");

    return(
        <>
        {props.goals.map((goal) => {
            return( 
            <div className="goalContainer" key={goal.goalId}>
                <GoalTitle goal={goal} refreshData={props.refreshData} openDetails={openDetails} setOpenDetails={setOpenDetails}/>{/* will come across issue where the button in this component needs to affect the display of the next component below*/}
                {openDetails == goal.goalId && <GoalDetails goal={goal} refreshData={props.refreshData} setOpenDetails={setOpenDetails}/>}
                
            </div>
            )
        })}
        </>
    )
}