import { useContext, useEffect, useState } from "react"
import UserContext from "../context/UserContext";

export default function  GoalCreate(props){

    const authorities = useContext(UserContext);

    const goalTemplate = {
        name: "",
        checked: false,
        reason: "",
        realisticDeadline: "",
        ambitiousDeadline: "",
        appUserId: null
    }

    const [goal, setGoal] = useState(goalTemplate);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        goal.appUserId = authorities.user.userId;
        
        const response = await fetch(`${authorities.url}/goal`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authorities.user.token}`,
                Accept: "application/json",
            },
            body: JSON.stringify(goal)
        });
        if(response.status >= 200 && response.status <= 300){
            props.refreshData();
            setGoal(goalTemplate);
            setErrors([]);
        } else{
            const error = await response.json();
            setErrors(error);
        }
    }

    return (
        <form className="goalForm" onSubmit={handleSubmit}> 
            <div  className="input-section">
                <input type="text" className="goalInput" value={goal.name} onChange={(e) => {setGoal({...goal, name: e.target.value})}}/>
                <input type="submit" className="add"></input>
            </div>
            {errors.length > 0 && <p>{errors}</p>}
        </form>
    )
}