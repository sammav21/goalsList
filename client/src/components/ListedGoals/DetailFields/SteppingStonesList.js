export default function SteppingStonesList(props){
    return(
        <div className="list-section">
            <ul className="list">
                {props.steppingStones.map((steppingStone) => {
                    return(
                        <p>{steppingStone.name}</p>
                    )
                })}
            </ul>
        </div>
    )
}