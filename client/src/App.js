import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import LoginCard from './components/login/LoginCard';
import UserContext from './context/UserContext';

function App() {

  const url = "http://localhost:8080/api";

  const [user, setUser] = useState(null);
  const [goals, setGoals] = useState([]);

  const login = (token) => {
    const {sub: username, app_user_id: userId, authorities: authoritiesString} = jwtDecode(token);

    const roles = authoritiesString.split(",");

    const user = {
      username,
      userId,
      roles,
      token,
      hasRole(role){
        return this.roles.includes(role);
      }
    }
    
    console.log(user);
    setUser(user);
    return user;
  }

  const logout = () =>{
    setUser(null);
    window.localStorage.removeItem("userToken");
  }

  const authorities = {
    user: user ? {...user} : null,
    login,
    logout,
    url
  };

  const refreshData = () => {
    if(user != null){
      fetch(`${url}/goal/user/${user.userId}`, {
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      })
      .then((response) => response.json())
      .then((data) => setGoals(data))
      console.log(goals)
    }
  }

  useEffect(refreshData, [user])

  return (
    <UserContext.Provider value={authorities}>
    <div className="App">
      <LoginCard url= {url} />
    </div>
    </UserContext.Provider>
  );
}

export default App;
