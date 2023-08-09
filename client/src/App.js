import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import LoginPage from './layout/LoginPage';
import MainPage from './layout/MainPage';
import UserContext from './context/UserContext';

function App() {

  const url = "http://localhost:8080/api";

  const [user, setUser] = useState(null);
  const [goals, setGoals] = useState([]);
  const [reloadUser, setReloadUser] = useState(false);
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
    window.location.reload(false);
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
    }
  }

  useEffect(refreshData, [user])
  useEffect(() => {
    if(localStorage.getItem("userToken") != null){
      login(localStorage.getItem("userToken"))
    }
    setReloadUser(true)
  }, [])

  return (
    <UserContext.Provider value={authorities}>
    {user == null && <LoginPage />}
    <MainPage refreshData={refreshData} goals={goals}/>
    </UserContext.Provider>
  );
}

export default App;
