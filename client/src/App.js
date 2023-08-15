import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import MainPage from './layout/MainPage';
import UserContext from './context/UserContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './layout/Nav';
import LoginPage from './layout/LoginPage';
import LandingPage from './layout/LandingPage';

function App() {

  const url = "http://162.241.253.186/api";

  const [user, setUser] = useState(null);
  const [goals, setGoals] = useState([]);
  const [reloadUser, setReloadUser] = useState(false);

  const [loginOpen, setLoginOpen] = useState(false);
  const [tipsOpen, setTipsOpen] = useState(false);

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
    <BrowserRouter>
    <UserContext.Provider value={authorities}>
      <Nav loginOpen={loginOpen} setLoginOpen={setLoginOpen} tipsOpen={tipsOpen} setTipsOpen={setTipsOpen}/>
      {loginOpen && <LoginPage setLoginOpen={setLoginOpen} />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="goals" element={<MainPage refreshData={refreshData} goals={goals} tipsOpen={tipsOpen} setTipsOpen={setTipsOpen}/>} />
      </Routes>
    </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
