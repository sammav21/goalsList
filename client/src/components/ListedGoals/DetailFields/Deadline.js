
export default function Deadline(props){
    return(
        <>
        <p>{props.ambitious ? "Ambitious" : "Realistic"} Deadline: </p>
        <input type="date" defaultValue={props.ambitious ? props.updatedFields.ambitiousDeadline : props.updatedFields.realisticDeadline} onChange={props.ambitious ? (e) => {props.setUpdatedFields({...props.updatedFields, ambitiousDeadline: e.target.value})} : (e) => {props.setUpdatedFields({...props.updatedFields, realisticDeadline: e.target.value})} }/>
        </>
    )
}