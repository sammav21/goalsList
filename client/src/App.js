import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import LoginCard from './components/login/LoginCard';
import Main from './components/goals/Main';
import UserContext from './context/UserContext';

function App() {

  const url = "http://localhost:8080/api";

  const [user, setUser] = useState(null);
  const [goals, setGoals] = useState([]);
  {/*need another call for stepping stone related to goal id (here or in goal component?)*/}

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
    {user == null && <LoginCard url= {url} />}
    <Main goals={goals}/>
    </UserContext.Provider>
  );
}

export default App;
