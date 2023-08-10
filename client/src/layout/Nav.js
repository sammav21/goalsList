import { useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Nav(props){

    const authorities = useContext(UserContext);
    const navigate = useNavigate();
    
    

    const handleLogout = () => {
        authorities.logout();
        navigate("/");
    }
    return (
        <header>
            <h1 className="logo">GoalStrive</h1>
            {authorities.user == null 
            ? <p className="logText" onClick={() => props.setLoginOpen(!props.loginOpen)}>Login</p> 
            : <>
                <p className="tipLink" onClick={() => props.setTipsOpen(!props.tipsOpen)}>Tips</p>
                <p className="logText" onClick={handleLogout}>Logout</p>
            </>}
        </header>
    )
}