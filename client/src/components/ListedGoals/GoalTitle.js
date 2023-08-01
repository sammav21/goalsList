export default function GoalTitle(props){
    return(
        <div className="titleDiv">
                    <h3 className="titleText">{props.title}</h3>
                    {/*component for buttons?*/}
                    <button className="listButton closed"><i className="fa-solid fa-caret-down" id="details"></i></button>
                    <button className="listButton check"><i className="fa-solid fa-check"id="check"></i></button>
                    <button className="listButton remove"><i className="fa-solid fa-minus" id="remove"></i></button>
        </div>
    )
}