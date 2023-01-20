import './index.css';
import Header from './components/Ui/Header';
import UserLogin from './components/User/UserLogin.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateAccount from './components/User/CreateAccount';
import PostRenderPage from './components/Ui/PostRenderPage';
import { useCookies } from 'react-cookie';
import Postpage from './components/Ui/Postpage';
import PostDetailsPage from './components/Ui/PostDetailsPage';
import ProfilePage from './components/User/ProfilePage';
import CreateModelPage from './components/Ui/CreateModelPage';
import ModelDetailsPage from './components/Ui/ModelDetailsPage';
import ModelsPage from './components/Ui/ModelsPage';
import HomePage from './components/Ui/HomePage';
import CreateCollectionPage from './components/Ui/CreateCollectionPage';
import CollectionsDetailsPage from './components/Ui/CollectionDetailsPage';


function App() {
  const [userToken, setUserToken] = useCookies(['user_token']);
  const [userData, setUserData] = useCookies(['user_data']);
  console.log(userData, userToken)

  
  var CookieFunctions = {'UserData': userData, "setUserData": setUserData, 'userToken': userToken, "setUserToken": setUserToken}

  return (
    <div className="flex flex-col w-full min-h-screen h-auto gap-5 items-center bg-slate-700">
      <BrowserRouter>
        <Header data={CookieFunctions} />
        <Routes>
          
          <Route path="/EditModel/:id" element={<CreateModelPage type="EditModel" />} />
          <Route path="/CreateModel" element={<CreateModelPage type="CreateModel" />} />
          <Route path="/model/:id" element={<ModelDetailsPage /> } />


          <Route path="/collection/:id" element={<CollectionsDetailsPage /> } />
          <Route path="/CreateCollection" element={<CreateCollectionPage type="CreateCollection" />} />
          <Route path="/EditCollection/:id" element={<CreateCollectionPage type="EditCollection" />} />
 

          <Route path="/CreatePost" element={<Postpage type="CreatePost" data={CookieFunctions} />} />
          <Route path="/EditPost/:id" element={<Postpage type="EditPost" data={CookieFunctions} />} />
          <Route path="/post/:id" element={<PostDetailsPage /> } />

          <Route path="/Login" element={<UserLogin data={CookieFunctions} />} />
          <Route path="/Sign-Up" element={<CreateAccount data={CookieFunctions} />} />

          <Route path="/" element={<HomePage />} />
          <Route path="/Profile/:id" element={<ProfilePage /> } />

        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
