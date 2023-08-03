import { useState } from "react"
import GoalDetails from "./GoalDetails"
import GoalTitle from "./GoalTitle"

export default function Goal(props){

    const [openDetails, setOpenDetails] = useState("");

    return(
            <div className="goalContainer" key={props.goal.goalId}>
                <GoalTitle goal={props.goal} refreshData={props.refreshData} openDetails={openDetails} setOpenDetails={setOpenDetails}/>
                {openDetails === props.goal.goalId 
                && <GoalDetails goal={props.goal} refreshData={props.refreshData} setOpenDetails={setOpenDetails}/>}
            </div>
    )
}