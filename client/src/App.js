import './index.css';
import CreateAccount from './components/User/CreateAccount';
import Header from './components/Ui/Header';
import UserLogin from './components/User/UserLogin.js';

function App() {
  return (
    <div className="flex flex-col w-full h-screen gap-5 items-center bg-slate-600">
      <Header />
      {/* <CreateAccount /> */}
      <UserLogin />
    </div>
  );
}


export default App;
