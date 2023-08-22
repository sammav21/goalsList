import { useContext } from "react";
import UserContext from "../../../../context/UserContext";

export default function SteppingStone(props){

    const authorities = useContext(UserContext);

    const handleDelete = async (e) => {
        e.preventDefault();
        
        const response = await fetch(`${authorities.url}/steppingStone/${props.steppingStone.steppingStoneId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authorities.user.token}`
            }
        })
        if(response.status >= 200 && response.status <= 300){
        props.refreshSteppingStones();
        }
    }

    const handleChecked = async (e) => {
        e.preventDefault();

        const template = {
            name: props.steppingStone.name,
            checked: !props.steppingStone.checked,
            goalId: props.steppingStone.goalId,
            steppingStoneId: props.steppingStone.steppingStoneId
        }

        const response = await fetch(`${authorities.url}/steppingStone/${props.steppingStone.steppingStoneId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authorities.user.token}`
            },
            body: JSON.stringify(template)
        })
        if(response.status >= 200 && response.status <= 300){
            props.refreshSteppingStones();
            console.log(props.steppingStone);
          }
    }
    return (
        <div className={props.steppingStone.checked ? "steppingStoneDiv checkedSteppingStone" : "steppingStoneDiv" }>
            <p className="steppingStoneTitleText">{props.steppingStone.name}</p>
            <button className="listBtnS checkS" onClick={handleChecked}><i className={props.steppingStone.checked ? "fa-solid fa-check-double" : "fa-solid fa-check"} ></i></button>
            <button className={props.steppingStone.checked ? "listBtnS checkedHide" : "listBtnS delete" } onClick={handleDelete}><i className="fa-solid fa-trash-can"></i></button>
        </div>
    )
}