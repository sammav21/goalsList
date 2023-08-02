import { useContext, useEffect, useState } from "react";
import Reason from "./DetailFields/Reason";
import SteppingStonesList from "./DetailFields/SteppingStonesList";
import UserContext from "../../context/UserContext";
import PostData from "../PostData";
import Deadline from "./DetailFields/Deadline";

export default function GoalDetails(props){
    {/*should this component hold state for the smaller details to control once in an PUT call?*/}

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
    const [steppingStones, setSteppingStones] = useState([]);
    const [errors, setErrors] = useState([]);

    const refreshSteppingStones = () => {
        if(props.goal != null){
          fetch(`${authorities.url}/steppingStone/${props.goal.goalId}`, {
            headers: {
              "Authorization": `Bearer ${authorities.user.token}`
            }
          })
          .then((response) => response.json())
          .then((data) => setSteppingStones(data))
        }
      }
    
      const handleUpdate = async (e) => {
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

      useEffect(refreshSteppingStones, [steppingStones])

    return(
        <form className="detailsForm" onSubmit={handleUpdate}>
            <Reason setUpdatedFields={setUpdatedFields} updatedFields={updatedFields} />
            <PostData isGoal={false} goal={props.goal} refreshSteppingStones={refreshSteppingStones}/>
            <SteppingStonesList steppingStones={steppingStones} />
            <Deadline ambitious={true} setUpdatedFields={setUpdatedFields} updatedFields={updatedFields} />
            <Deadline ambitious={false} setUpdatedFields={setUpdatedFields} updatedFields={updatedFields} />
            <input type="submit" value="Update" />
            <button type="button" onClick={() => props.setOpenDetails(null)}>cancel</button>
        </form>
    )
}