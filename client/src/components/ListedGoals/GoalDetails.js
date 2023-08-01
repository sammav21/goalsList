import { useContext, useEffect, useState } from "react";
import Reason from "./DetailFields/Reason";
import SteppingStoneCreate from "./DetailFields/SteppingStoneCreate";
import SteppingStonesList from "./DetailFields/SteppingStonesList";
import UserContext from "../../context/UserContext";

export default function GoalDetails(props){
    {/*should this component hold state for the smaller details to control once in an PUT call?*/}

    const authorities = useContext(UserContext);

    const [steppingStones, setSteppingStones] = useState([]);

    const refreshSteppingStones = () => {
        if(props.goal != null){
          fetch(`${authorities.url}/steppingStone/${props.goal.goalId}`, {
            headers: {
              "Authorization": `Bearer ${authorities.user.token}`
            }
          })
          .then((response) => response.json())
          .then((data) => setSteppingStones(data))
          console.log(steppingStones);
        }
      }
    
      useEffect(refreshSteppingStones, [props.goal])
    return(
        <form className="detailsForm" >
            <Reason reason={props.goal.reason} />
            <SteppingStoneCreate isGoal={false} goal={props.goal} />
            <SteppingStonesList steppingStones={steppingStones} refreshSteppingStones={refreshSteppingStones}/>
                    {/* deadlines section*/}
                    {}
        </form>
    )
}