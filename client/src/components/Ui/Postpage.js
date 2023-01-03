import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { Cookies } from 'react-cookie';
import { createNewPost } from "../../actions/PostActions.js";


const Postpage = () => {
    const cookies = new Cookies();

    const [post, setPostData] = useState({
        "title": "",
        "image": "",
        "promptUsed": ""
    });

    const navigate = useNavigate()


    const handleSubmit = async (event) => {
        event.preventDefault();
        var data = await createNewPost(post)
        console.log(data);
        navigate("/")
    };

    return (<form onSubmit={handleSubmit} className=" bg-slate-800 text-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[98%] lg:w-[400px]">
        
    <div className="mb-4">
        <h1 className=" text-center font-sans text-xl"> Create Post </h1>
        <label className="block text-white text-sm font-bold mb-2">
        Title:
        </label>
        <input
        value={post.title}
        onChange={(e) => setPostData({ ...post, title: e.target.value })}
        className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
    </div>
    

    <div className="mb-6">
        <label className="block text-white text-sm font-bold mb-2">
        Prompt
        </label>
        <input
        value={post.promptUsed}
        onChange={(e) => setPostData({ ...post, promptUsed: e.target.value })}
        className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
    </div>


    <div className="flex items-center justify-center"> 
        <button className=" bg-slate-600 text-white p-2 rounded-md"> Share </button>
    </div>
  </form>
);
};




export default Postpage;