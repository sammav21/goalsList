import LoginCard from "../components/LoginCard";

export default function LoginPage(props){

    return(
        <div className="loginScreen">
            <LoginCard setLoginOpen={props.setLoginOpen}/>
        </div>
    )
}