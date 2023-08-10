import { useContext, useState } from "react"
import UserContext from "../context/UserContext";
import Errors from "./Errors";
import { useNavigate } from "react-router-dom";

export default function LoginCard(props){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [create, setCreate] = useState(false);

    const navigate = useNavigate();
    const authorities = useContext(UserContext);

    const handleSubmit = async(e) => {
       if(!create){
        e.preventDefault();
       } 

        const response = await fetch(`${authorities.url}/authenticate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({username, password}),
        });
        if(response.status >= 200 && response.status <= 300){
            const json = await response.json();
            const jwt_token = json.jwt_token;
            authorities.login(jwt_token);
            window.localStorage.setItem("userToken", jwt_token);
            clearFields();
            setCreate(false);
            props.setLoginOpen(false);
            navigate("/goals");
        } else if(response.status === 403){
            setErrors(["User not found, try again."])
            console.log(errors)
        }   else{
            const error = await response.json();
            setErrors(error);
        }
        
    }

    const handleCreateAccount = async (e) => {
        e.preventDefault();

        const response = await fetch(`${authorities.url}/create_account`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({username, password})
        });
        if(response.status >= 200 && response.status <= 300){
            handleSubmit();
        } else{
            const error = await response.json();
            setErrors(error)
        }
    }

    const switchCreateMode = (e) => {
        e.preventDefault();
        setCreate(!create)
        clearFields();
    }   
    const clearFields = () => {
        setUsername("");
        setPassword("");
        setErrors([]);
    }

    return(
        <div className="loginCard">
            <div className="loginClose"><i className="fa-solid fa-xmark close" onClick={() => props.setLoginOpen(false)}></i></div>
            <h3 className="loginTitle">{create ? "Create account" : "Login"}</h3>
            <form onSubmit={create ? handleCreateAccount : handleSubmit} className="loginForm">
                <div className="loginInputSection">
                <label htmlFor="usernameInput">Username</label>
                <input className="loginInput" id="usernameInput" value={username} type="text" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="loginInputSection">
                    <label htmlFor="passwordInput">Password </label>
                    <input className="loginInput" id="passwordInput" value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Errors errors={errors}/>
                <div className="loginButton">
                    <input type="submit" value={create ? "Create Account" : "Login"} className="loginInputButton"/>
                </div>
                <div className="createAccountDiv">
                <input type="button" value={create ? "Login" : "Create Account"} className="createAccountButton" onClick={switchCreateMode}/>
                </div>
            </form>
        </div>
    )
}
