import './index.css';
import Header from './components/Ui/Header';
import UserLogin from './components/User/UserLogin.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateAccount from './components/User/CreateAccount';
import Homepage from './components/Ui/HomePage';
import { useCookies } from 'react-cookie';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';



function App() {
  const [userToken, setUserToken, removeUserToken] = useCookies(['user_token']);
  const [userData, setUserData, removeUserData] = useCookies(['user_data']);
  console.log(userData, userToken)

  
  var CookieFunctions = {'UserData': userData, "setUserData": setUserData, 'userToken': userToken, "setUserToken": setUserToken}

  return (
    <div className="flex flex-col w-full h-screen gap-5 items-center bg-slate-600">
      <BrowserRouter>
        <Header data={CookieFunctions} />
        <Routes>
          
          <Route path="/Login" element={<UserLogin data={CookieFunctions} />} />
          <Route path="/Sign-Up" element={<CreateAccount data={CookieFunctions} />} />
          <Route path="/" element={<Homepage data={CookieFunctions}/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
