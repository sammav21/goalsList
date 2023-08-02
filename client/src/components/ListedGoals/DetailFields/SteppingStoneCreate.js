import { useState, useContext } from "react";
import UserContext from "../../../context/UserContext";

export default function SteppingStoneCreate(props){
    
    const isGoal = props.isGoal;
    let template;
    let url;
    const authorities = useContext(UserContext);

    if(isGoal){

        url=`${authorities.url}/goal`;

        template = {
            name: "",
            checked: false,
            reason: "",
            realisticDeadline: "",
            ambitiousDeadline: "",
            appUserId: null
        }
    } else{
        url=`${authorities.url}/steppingStone`;

        template = {
            name: "",
            checked: false,
            goalId: null
        }
    }

    const [details, setDetails] = useState(template);
    const [errors, setErrors] = useState([])

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(isGoal){
            details.appUserId = authorities.user.userId;
        } else{
            details.goalId = props.goal.goalId;
        }

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authorities.user.token}`,
                Accept: "application/json",
            },
            body: JSON.stringify(details)
        });
        console.log(url);
        if(response.status >= 200 && response.status <= 300){
            props.refreshSteppingStones();
            setDetails(template);
            setErrors([]);
        } else{
            const error = await response.json();
            setErrors(error);
        }
    }
    return(
        <div className={isGoal ? "goalForm" : "steppingStoneForm"}> 
            <div  className="input-section" >
                <input type="text" className="goalInput" value={details.name} onChange={(e) => {setDetails({...details, name: e.target.value})}}/>
                <input type="submit" className="add" onClick={handleSubmit}></input>
            </div>
            {errors.length > 0 && <p>{errors}</p>}
        </div>
    )
}