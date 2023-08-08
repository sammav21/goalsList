import { useContext, useState } from "react";
import Reason from "./DetailFields/Reason";
import UserContext from "../../context/UserContext";
import Deadline from "./DetailFields/Deadline";
import SteppingStoneDetails from "./DetailFields/ListedSteppingStones/SteppingStoneDetails";
import Errors from "../Errors";

export default function GoalDetails(props){
    /*should this component hold state for the smaller details to control once in an PUT call?*/

    const authorities = useContext(UserContext);

    const template = {
      goalId: props.goal.goalId,
      name: props.goal.name,
      checked: props.goal.checked,
      reason: props.goal.reason,
      ambitiousDeadline: props.goal.ambitiousDeadline,
      realisticDeadline: props.goal.realisticDeadline,
      appUserId: props.goal.appUserId
    }

    const [updatedFields, setUpdatedFields] = useState(template);
    
    const [errors, setErrors] = useState([]);
    
      const handleUpdate = async (e) => {
        console.log(updatedFields)
        e.preventDefault();
        const response = await fetch(`${authorities.url}/goal/${props.goal.goalId}`, {
          method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authorities.user.token}`,
            },
            body: JSON.stringify(updatedFields)
        })
        if(response.status >= 200 && response.status <= 300){
          props.refreshData();
          setUpdatedFields(template);
          setErrors([]);
        } else{
          const error = await response.json();
          setErrors(error);
        }
      }

    return(
        <form className="detailsForm" onSubmit={handleUpdate}>
            <Reason setUpdatedFields={setUpdatedFields} updatedFields={updatedFields} />
            <SteppingStoneDetails goal={props.goal} />
            <Deadline ambitious={true} setUpdatedFields={setUpdatedFields} updatedFields={updatedFields} />
            <Deadline ambitious={false} setUpdatedFields={setUpdatedFields} updatedFields={updatedFields} />
            <input type="submit" value="Update" />
            <button type="button" onClick={() => props.setOpenDetails(null)}>cancel</button>
            <Errors errors={errors}/>
        </form>
    )
}