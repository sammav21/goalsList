export default function Reason(props){
  
    return(
        <div className="reasonDiv">
                <p>Why does this goal matter?</p>
                <textarea className="reasonInput" defaultValue={props.updatedFields.reason} onChange={(e) => {props.setUpdatedFields({...props.updatedFields, reason: e.target.value})}}/>         
                  
        </div>
    )
}