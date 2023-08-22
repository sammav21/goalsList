import { useContext } from "react";
import UserContext from "../../context/UserContext";

export default function GoalTitle(props){

    const authorities = useContext(UserContext);
    
    const handleDelete = async () => {
        const response = await fetch(`${authorities.url}/goal/${props.goal.goalId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${authorities.user.token}`
              }
        })
        if(response.status >= 200 && response.status <= 300){
            props.refreshData();
        }
    }

    const handleChecked = async (e) => {
        e.preventDefault();

        const template = {
            goalId: props.goal.goalId,
            name: props.goal.name,
            checked: !props.goal.checked,
            reason: props.goal.reason,
            ambitiousDeadline: props.goal.ambitiousDeadline,
            realisticDeadline: props.goal.realisticDeadline,
            appUserId: props.goal.appUserId
          }

        const response = await fetch(`${authorities.url}/goal/${props.goal.goalId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authorities.user.token}`
              },
              body: JSON.stringify(template)
        })
    
        if(response.status >= 200 && response.status <= 300){
            props.refreshData();
            if(props.openDetails === props.goal.goalId){
                props.setOpenDetails(null)
            }
          } 
    }


    return(
        <div className={props.goal.checked ? "titleDiv checkedGoal" : "titleDiv"}>
                    <h3 className="titleText">{props.goal.name}</h3>
                    {/*component for buttons?*/}
                    <button className="listBtn" onClick={handleChecked}><i className={props.goal.checked ? "fa-solid fa-check-double" : "fa-solid fa-check" }id="check"></i></button>
                    <button className={props.goal.checked ? "listBtn checkedHide" : "listBtn" } onClick={props.openDetails !== props.goal.goalId 
                        ? () => props.setOpenDetails(props.goal.goalId) 
                        : () => props.setOpenDetails(null)}><i className="fa-solid fa-caret-down" id="details"></i></button>
                    <button className={props.goal.checked ? "listBtn checkedHide" : "listBtn delete" } onClick={handleDelete}><i className="fa-solid fa-trash-can" id="remove"></i></button>
        </div>
    )
}