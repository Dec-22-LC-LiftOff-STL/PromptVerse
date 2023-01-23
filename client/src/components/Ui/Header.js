import React, {useState} from 'react';
//import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import { Cookies } from 'react-cookie';


const Header = (data) => {
  const navigate = useNavigate()
  const cookies = new Cookies();
  var userData = cookies.get('user_data', { path: '/' });
  

  const Logout = () => {
    cookies.remove('user_data', { path: '/' });
    cookies.remove('user_token', { path: '/' });
    userData = cookies.get('user_data', { path: '/' });
    console.log(userData)
    navigate("/")
  }

  const goToProfile = () => {
    navigate(`/Profile/${userData._id}`)
    window.location.reload()
  }

  const goToHomepage = () => {
    navigate('/')
    window.location.reload()
  }


  return (
    <div className=" bg-slate-800 w-full text-white p-1 mb-4 flex font-sans font-bold shadow-lg">

    <link href="https://fonts.googleapis.com/css2?family=Amatic+SC:wght@700&family=Architects+Daughter&family=Poppins:wght@300&family=Righteous&family=Roboto:wght@300&family=Varela+Round&display=swap" rel="stylesheet"></link>
        

      <h1 onClick={() => goToHomepage()} className="font-bold text-2xl self-center md:text-3xl font-Title cursor-pointer btn btn-ghost normal-case">PromptVerse</h1>


      {cookies.get('user_data') !== undefined && 
        <div class="dropdown hidden md:inline bg-transparent self-center pt-1">
          <label tabindex="0" className=' self-center'> 
                <button className=' self-center btn btn-sm btn-ghost'>
                Create
                <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
              </button></label>
          <ul tabindex="0" class="dropdown-content menu p-2 mt-3 shadow bg-slate-600 rounded-b-md w-52">
            <li><a href='/CreateCollection'>New Collection</a></li>
            <li><a href='/createModel'>New Model</a></li>
            <li><a href='/createPost'>New Post</a></li>
          </ul>
        </div>
      }


      {cookies.get('user_data') !== undefined && 
        <button onClick={() => goToProfile()} className='truncate md:visible invisible ml-auto mr-1 max-w-[140px] cursor-pointer text btn btn-ghost normal-case'>{userData["email"]}</button>
      }


      {cookies.get('user_data') !== undefined &&
        <div className=" dropdown dropdown-end">
          <button class=" outline-none btn btn-square btn-ghost mr-1">
            <svg tabIndex={0}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-7 h-7 stroke-current outline-none"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow mt-1 bg-slate-600 rounded-b-md w-52">
            <li><button onClick={() => goToProfile()}>Profile</button></li>
            <li><button onClick={() => navigate('/CreatePost')}>Create Post</button></li>
            <li><button onClick={() => navigate('/CreateCollection')}>Create Collection</button></li>
            <li><button onClick={() => navigate('/CreateModel')}>Create Model</button></li>
            <li><button>Settings</button></li> 
            <li><button onClick={() => Logout()}>Logout</button></li>
          </ul>
        </div>
      }


      {cookies.get('user_data') === undefined && 
        <button onClick={() => navigate('/Login')} className=' ml-auto mr-5 cursor-pointer font-serif text btn btn-sm self-center btn-ghost'> Login </button>
      }


      {cookies.get('user_data') === undefined && 
        <button onClick={() => navigate('/Sign-Up')} className='cursor-pointer font-serif mr-5 btn btn-sm self-center btn-primary'> Sign Up </button>
      }

    </div>
  );
}

export default Header;

