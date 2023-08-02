export default function SteppingStonesList(props){
    return(
        <div>
            <ul className="list">
                {props.steppingStones.map((steppingStone) => {
                    return(
                        <p key={steppingStone.steppingStoneId}>{steppingStone.name}</p>
                    )
                })}
            </ul>
        </div>
    )
}