import React from 'react';
//import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
// import { useCookies } from 'react-cookie';


const Header = (data) => {
  const navigate = useNavigate()
  console.log(data)

  

  return (
    <div className=" bg-slate-900 w-full text-white p-4 mb-4 flex">
      <h1 onClick={() => navigate('/')} className="font-bold text-2xl cursor-pointer">Ai Prompt Share</h1>
      <button onClick={() => navigate('/Login')} className=' ml-auto mr-5 cursor-pointer font-serif text'> Login </button>
      <button onClick={() => navigate('/Sign-Up')} className='cursor-pointer font-serif'> Sign Up </button>
      {/* <button  onClick={() => console.log(userToken)}> check cookie </button> */}
    </div>
  );
}

export default Header;

