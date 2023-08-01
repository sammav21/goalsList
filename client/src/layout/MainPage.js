import GoalCreate from "../components/GoalCreate"

export default function MainPage(props){
    return(
    <>
        <header>
            <h1>Goals</h1>
        </header>
        <GoalCreate refreshData={props.refreshData}/>
        <div className="list-section"> {/* component*/}
            <ul className="list">
                {props.goals.map((goal) => {
                    {/* component*/}
                    return( 
                    <div className="listContainer" key={goal.goalId}>
                        <div className="listDiv">
                            <li className="list-text">{goal.name}</li>
                            <button className="listButton closed"><i className="fa-solid fa-caret-down" id="details"></i></button>
                            <button className="listButton check"><i className="fa-solid fa-check"id="check"></i></button>
                            <button className="listButton remove"><i className="fa-solid fa-minus" id="remove"></i></button>
                        </div>
                        <form className="detailsForm" >
                            <div className="why-div">
                                <p>Why does this goal matter?</p>
                                <div className="whyInput">
                                    <input type="textarea" className="whyText" value={goal.reason}></input>
                                    <button><i className="fa-thin fa-plus" id="whyAdd"></i></button>
                                </div>
                            </div>
                            {/* stepping stone input section*/}
                            {/* deadlines section*/}
                        </form>
                    </div>
                    )
                })}
                
            </ul>
        </div>
    </>
    )
}