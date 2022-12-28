import './index.css';
// import CreateAccount from './components/User/CreateAccount';
import Header from './components/Ui/Header';
import UserLogin from './components/User/UserLogin.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateAccount from './components/User/CreateAccount';
import Homepage from './components/Ui/HomePage';


function App() {
  return (
    <div className="flex flex-col w-full h-screen gap-5 items-center bg-slate-600">
      <BrowserRouter>
        <Header />
        <Routes>
          
          <Route path="/Login" element={<UserLogin />} />
          <Route path="/Sign-Up" element={<CreateAccount />} />
          <Route path="/Home" element={<Homepage />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
