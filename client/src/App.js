import './index.css';
import CreateAccount from './components/User/CreateAccount';
import Header from './components/Ui/Header';


function App() {
  return (
    <div className="flex flex-col w-full h-screen gap-5 items-center bg-slate-600">
      <Header />
      <CreateAccount />
    </div>
  );
}


export default App;
