import React, { useState } from "react";
import { createNewUser } from "../../actions/UserActions.js";
import {useNavigate} from 'react-router-dom';


const CreateAccount = () => {
    const [user, setUserData] = useState({
        "email": "",
        "password": "",
        "posts": []
    });
    const [comfirmPassword, setComfirmPassword] = useState({"password": ""})
    const [passwordsMatchCheck, setPasswordsMatchCheck] = useState(false)
    const [usedEmailCheck, setusedEmailCheck] = useState(false)
    const navigate = useNavigate()


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(user)
        console.log(comfirmPassword)
        if (user["password"] !== comfirmPassword["password"]) {
            setPasswordsMatchCheck(true)
            return
        }
        else {
            setPasswordsMatchCheck(false)
        }
        var data = await createNewUser(user)
        if ("message" in data){
            if (data['message'] === "Request failed with status code 400") {
                setusedEmailCheck(true)
                return
            }
        }
        else {
            setusedEmailCheck(false)
        }
        
        console.log(data)
        navigate("/")
    };



    return (
    <form onSubmit={handleSubmit} className=" bg-slate-800 text-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[98%] lg:w-[400px]">
        
        <div className="mb-4">
            <h1 className=" text-center font-sans text-xl"> Create Account </h1>
            <label className="block text-white text-sm font-bold mb-2">
            Email:
            </label>
            <input
            type="email"
            value={user.email}
            onChange={(e) => setUserData({ ...user, email: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        {usedEmailCheck !== false && 
            <div className=" p-2 bg-red-600 rounded-lg text-center mb-5 font-serif">
                Email already in use.
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>

        <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2">
            Confirm Password:
            </label>
            <input
            type="password"
            value={comfirmPassword.password}
            onChange={(e) =>  setComfirmPassword({...comfirmPassword, password: e.target.value})}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        {passwordsMatchCheck !== false && 
            <div className=" p-2 bg-red-600 rounded-lg text-center mb-5 font-serif">
                Passwords do not match.
            </div>
        }

        <div className="flex items-center justify-between"> 
            <button className=" bg-slate-600 text-white p-2 rounded-md"> Create </button>
        </div>
      </form>
    );
};


export default CreateAccount
