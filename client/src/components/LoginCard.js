import { useContext, useState } from "react"
import UserContext from "../context/UserContext";

export default function LoginCard(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const authorities = useContext(UserContext);

    const handleSubmit = async(e) => {
        e.preventDefault();

        const response = await fetch(`${authorities.url}/authenticate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({username, password}),
        });
        if(response.status >= 200 && response.status < 300){
            const json = await response.json();
            const jwt_token = json.jwt_token;
            authorities.login(jwt_token);
            window.localStorage.setItem("userToken", jwt_token);
        }
    }
    return(
            <form onSubmit= {handleSubmit} className="loginForm"> {/* component*/}
                <div className="inputSection">
                <label htmlFor="usernameInput">Username:</label>
                <input className="loginInput" id="usernameInput" value={username} type="text" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="inputSection">
                    <label htmlFor="passwordInput">Password: </label>
                    <input className="loginInput" id="passwordInput" value={password} type="text" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="loginButton">
                    <input type="submit" value="Login" />
                </div>
            </form>
    )
}
