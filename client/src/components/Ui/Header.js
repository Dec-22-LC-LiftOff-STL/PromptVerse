import React from 'react';
//import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import { Cookies } from 'react-cookie';


const Header = (data) => {
  const navigate = useNavigate()

  const cookies = new Cookies();
  const token = cookies.get('user_token');
  const userData = cookies.get('user_data');
  
  const Logout = () => {

    cookies.remove('user_data');
    cookies.remove('user_token');
    navigate("/")
  }


  return (
    <div className=" bg-slate-900 w-full text-white p-4 mb-4 flex font-sans font-bold">
      <h1 onClick={() => navigate('/')} className="font-bold self-center lg:text-2xl cursor-pointer">Ai Prompt Share</h1>
      {userData !== undefined && 
        <button className='truncate lg:visible invisible ml-auto mr-5 cursor-pointer text'>{userData["email"]}</button>
      }
      {userData !== undefined &&
      <div className=" dropdown dropdown-end">
        <svg tabIndex={0} className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/></svg>
        <ul tabIndex={0} className="dropdown-content menu p-3 shadow mt-5 bg-slate-800 rounded-box w-52">
          <li><button>Profile</button></li>
          <li><button onClick={() => navigate('/CreatePost')}>Create Post</button></li>
          <li><button>Settings</button></li> 
          <li><button onClick={() => Logout()}>Logout</button></li>
        </ul>
      </div>
      }
      {userData === undefined && 
        <button onClick={() => navigate('/Login')} className=' ml-auto mr-5 cursor-pointer font-serif text'> Login </button>
      }
      {userData === undefined && 
        <button onClick={() => navigate('/Sign-Up')} className='cursor-pointer font-serif'> Sign Up </button>
      }

    </div>
  );
}

export default Header;

