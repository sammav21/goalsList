import { useContext } from "react";
import UserContext from "../../../../context/UserContext";

export default function SteppingStone(props){

    const authorities = useContext(UserContext);

    const handleDelete = async () => {
        const response = await fetch(`${authorities.url}/steppingStone/${props.steppingStone.steppingStoneId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authorities.user.token}`
            }
        })
        props.refreshSteppingStones();
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
        <div className="steppingStoneDiv">
            <p>{props.steppingStone.name}</p>
            <button className="listButton check" onClick={handleChecked}><i className="fa-solid fa-check"id="check"></i></button>
            <button className="listButton remove" onClick={handleDelete}><i className="fa-solid fa-minus" id="remove"></i></button>
        </div>
    )
}