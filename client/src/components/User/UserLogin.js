import React, { useState } from "react";
import { UserLoginAction } from "../../actions/UserActions.js";
import {useNavigate} from 'react-router-dom';
import { Cookies } from 'react-cookie';


const UserLogin = () => {
    const cookies = new Cookies();

    const [user, setUserData] = useState({
        "email": "",
        "password": "",
        "posts": []
    });

    const [usedEmailCheck, setusedEmailCheck] = useState(false)
    const [usedPasswordCheck, setPasswordCheck] = useState(false)
    const navigate = useNavigate()


    const handleSubmit = async (event) => {
        event.preventDefault();
        var data = await UserLoginAction(user)
        

        if ("message" in data){
            console.log(data['response']["data"]["msg"] )

            if (data['response']["data"]["msg"] === "no user with this email") {
                setusedEmailCheck(true)
                return
            }
            else {
                setusedEmailCheck(false)
            }
            if (data['response']["data"]["msg"] === "incorrect password") {
                setPasswordCheck(true)
                return
            }
            else {
                setPasswordCheck(false)
                return
            }
        }


        cookies.set('user_data', data["email_check_UserSchema"], { path: '/' });
        cookies.set('user_token', data["token"], { path: '/' });
        navigate("/")
    };

    return (
    
    <form onSubmit={handleSubmit} className=" bg-slate-800 text-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4 w-[98%] lg:w-[400px]">
        
        <h1 className=" text-center font-sans text-xl mb-[-8px]"> Login </h1>
        <div class="divider"></div> 

        <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
            Email:
            </label>
            <input
            type="email"
            value={user.email}
            onChange={(e) => setUserData({ ...user, email: e.target.value })}
            className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>

        {usedEmailCheck !== false && 
            <div classname="alert alert-error shadow-lg mb-2">
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" classname="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>No account with this email exists.</span>
                </div>
            </div>
            }
        

        <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2">
            Password:
            </label>
            <input
            type="password"
            value={user.password}
            onChange={(e) => setUserData({ ...user, password: e.target.value })}
            className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>

        {usedPasswordCheck !== false && 
         <div classname="alert alert-error shadow-lg mb-4">
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" classname="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Incorrect password.</span>
            </div>
        </div>
        }

        <div className="flex items-center justify-between w-full"> 
            <button className=" btn btn-outline btn-success w-full"> Login </button>
        </div>
    </form>
);
};




export default UserLogin;