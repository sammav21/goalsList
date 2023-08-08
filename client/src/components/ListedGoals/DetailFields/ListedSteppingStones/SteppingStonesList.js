import SteppingStone from "./SteppingStone";

export default function SteppingStonesList(props){

    return(
        <div className="steppingStoneListSection">
            <ul className="list">
                {props.steppingStones.map((steppingStone) => {
                    return(
                        <SteppingStone key={steppingStone.steppingStoneId} steppingStone={steppingStone} refreshSteppingStones={props.refreshSteppingStones}/>
                    )
                })}
            </ul>
        </div>
    )
}