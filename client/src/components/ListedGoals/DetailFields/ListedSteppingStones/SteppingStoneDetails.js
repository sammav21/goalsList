import { useContext, useEffect, useState } from "react";
import SteppingStonesList from "./SteppingStonesList";
import UserContext from "../../../../context/UserContext";
import PostData from "../../../PostData";


export default function SteppingStoneDetails(props){

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
        }
      }

    useEffect(refreshSteppingStones, [steppingStones])
    return(
        <div className="steppingStoneContainer">
            <PostData isGoal={false} goal={props.goal} refreshSteppingStones={refreshSteppingStones}/>
            <SteppingStonesList steppingStones={steppingStones} refreshSteppingStones={refreshSteppingStones}/>
        </div>
    )
}