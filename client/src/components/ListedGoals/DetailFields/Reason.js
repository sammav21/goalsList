import { useEffect } from "react"

export default function Reason(props){
  
    return(
        <div className="why-div">
                <p>Why does this goal matter?</p>
                    <div className="whyInput">
                        <input type="textarea" className="whyText" defaultValue={props.updatedFields.reason} onChange={(e) => {props.setUpdatedFields({...props.updatedFields, reason: e.target.value})}}></input>           
                    </div>
        </div>
    )
}