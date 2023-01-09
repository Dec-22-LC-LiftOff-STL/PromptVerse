import './index.css';
import Header from './components/Ui/Header';
import UserLogin from './components/User/UserLogin.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateAccount from './components/User/CreateAccount';
import Homepage from './components/Ui/HomePage';
import { useCookies } from 'react-cookie';
import Postpage from './components/Ui/Postpage';
import PostDetailsPage from './components/Ui/PostDetailsPage';
import ProfilePage from './components/User/ProfilePage';


function App() {
  const [userToken, setUserToken] = useCookies(['user_token']);
  const [userData, setUserData] = useCookies(['user_data']);
  console.log(userData, userToken)

  
  var CookieFunctions = {'UserData': userData, "setUserData": setUserData, 'userToken': userToken, "setUserToken": setUserToken}

  return (
    <div className="flex flex-col w-full min-h-screen h-auto gap-5 items-center bg-slate-600">
      <BrowserRouter>
        <Header data={CookieFunctions} />
        <Routes>
          
          <Route path="/CreatePost" element={<Postpage data={CookieFunctions} />} />
          <Route path="/Login" element={<UserLogin data={CookieFunctions} />} />
          <Route path="/Sign-Up" element={<CreateAccount data={CookieFunctions} />} />
          <Route path="/" element={<Homepage data={CookieFunctions}/>} />
          <Route path="/post/:id" element={<PostDetailsPage /> } />
          <Route path="/Profile/:id" element={<ProfilePage /> } />

        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
