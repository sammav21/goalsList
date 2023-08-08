export default function Errors(props){
    return(
        <>
        {props.errors.map((error) => {
            return(
                <p key={props.errors.indexOf(error)}>{error}</p>
            )
        })}
        </>
    )
}