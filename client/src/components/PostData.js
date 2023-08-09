import { useContext, useState } from "react"
import UserContext from "../context/UserContext";
import Errors from "./Errors";

export default function PostData(props){

    const isGoal = props.isGoal;
    let template;
    let url;
    let refresh;
    const authorities = useContext(UserContext);

    if(isGoal){
        url=`${authorities.url}/goal`;

        refresh = () => {
            props.refreshData()
        }

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

        refresh = () => {
            props.refreshSteppingStones()
        }
        
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

        if(response.status >= 200 && response.status <= 300){
            refresh();
            setDetails(template);
            setErrors([]);
        } else{
            const error = await response.json();
            setErrors(error);
        }
    }
    return(
        <div className={isGoal ? "goalForm" : "steppingStoneForm"}>
            {!isGoal && <p>What steps can you take?</p>}
            <div  className="inputSection" >
                <input type="text" className={isGoal ? "goalInput" : "steppingStoneInput"} value={details.name} onChange={(e) => {setDetails({...details, name: e.target.value})}}/>
                <input type="submit" className={isGoal ? "goalAddButton" : "steppingStoneAddButton" }onClick={handleSubmit} value="+"></input>
            </div>
            <Errors errors={errors}/>
        </div>
    )
}