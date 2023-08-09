
export default function Deadline(props){
    return(
        <div className="deadlineDiv">
        <p>{props.ambitious ? "Ambitious" : "Realistic"} Deadline: </p>
        <input type="date" className="dateInput"defaultValue={props.ambitious ? props.updatedFields.ambitiousDeadline : props.updatedFields.realisticDeadline} onChange={props.ambitious ? (e) => {props.setUpdatedFields({...props.updatedFields, ambitiousDeadline: e.target.value})} : (e) => {props.setUpdatedFields({...props.updatedFields, realisticDeadline: e.target.value})} }/>
        </div>
    )
}