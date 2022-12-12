import React, { useState } from "react";
import { createNewUser } from "../../actions/UserActions.js";

const CreateAccount = () => {
    const [user, setUserData] = useState({
        "email": "",
        "password": "",
        "posts": []
    });


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(user)
        createNewUser(user)
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
        <div className="flex items-center justify-between"> 
            <button className=" bg-slate-600 text-white p-2 rounded-md"> Create </button>
        </div>
      </form>
    );
};


export default CreateAccount
