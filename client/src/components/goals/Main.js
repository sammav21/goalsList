

export default function Main(props){
    return(
    <>
        <header>
            <h1>Goals</h1>
        </header>
        <form className="goalForm"> {/* component*/}
            <div  className="input-section">
                <input type="text" className="input" />
                <button className="add"><i className="fa-thin fa-plus" id="addIcon"></i></button>
            </div>
        </form>
        <div className="list-section"> {/* component*/}
            <ul className="list">
                {props.goals.map((goal) => {
                    {/* component*/}
                    return( 
                    <div className="listContainer">
                        <div className="listDiv">
                            <li className="list-text">{goal.name}</li>
                            <button className="listButton closed"><i class="fa-solid fa-caret-down" id="details"></i></button>
                            <button className="listButton check"><i class="fa-solid fa-check"id="check"></i></button>
                            <button className="listButton remove"><i class="fa-solid fa-minus" id="remove"></i></button>
                        </div>
                        <form className="detailsForm" >
                            <div className="why-div">
                                <p>Why does this goal matter?</p>
                                <div className="whyInput">
                                    <input type="textarea" className="whyText" value={goal.reason}></input>
                                    <button><i class="fa-thin fa-plus" id="whyAdd"></i></button>
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