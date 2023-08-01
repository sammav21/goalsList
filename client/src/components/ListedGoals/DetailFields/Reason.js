export default function Reason(props){
    return(
        <div className="why-div">
                <p>Why does this goal matter?</p>
                    <div className="whyInput">
                        <input type="textarea" className="whyText" value={props.reason}></input>                        
                        <button><i className="fa-thin fa-plus" id="whyAdd"></i></button>
                    </div>
        </div>
    )
}