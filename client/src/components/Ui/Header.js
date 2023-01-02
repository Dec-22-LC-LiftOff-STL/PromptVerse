import React from 'react';
//import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import { useCookies, Cookies } from 'react-cookie';


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
    <div className=" bg-slate-900 w-full text-white p-4 mb-4 flex">
      <h1 onClick={() => navigate('/')} className="font-bold text-2xl cursor-pointer">Ai Prompt Share</h1>
      {userData !== undefined && 
        <button className=' ml-auto mr-5 cursor-pointer font-serif text'>{userData["email"]}</button>
      }
      {userData !== undefined && 
        <button onClick={() => Logout()} className='cursor-pointer font-serif'>Logout</button>
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

