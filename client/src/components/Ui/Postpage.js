import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import { Cookies } from 'react-cookie';
import { createNewPost } from "../../actions/PostActions.js";
import Resizer from "react-image-file-resizer";


const Postpage = () => {
    const cookies = new Cookies();
    const navigate = useNavigate()


    const [TitleCheck, setTitleCheck] = useState(true)
    const [PromptCheck, setPromptCheck] = useState(true)
    const [ImageCheck, setImageCheck] = useState(true)


    const [image, setImage] = useState()

    const [post, setPostData] = useState({
        "title": "",
        "image": "",
        "promptUsed": "",
        "Negative_Prompt": ""
    });


    useEffect(() => { 
        if (!cookies.get("user_token")) {
            navigate("/")
        }
    })


    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        // const base64 = await convertToBase64(file);
        //console.log(base64)
        const image = await resizeFile(file);
        console.log(image)
        setImage(image);
        setPostData({ ...post, image: image})
    };

      const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                512,
                800,
                "JPEG",
                80,
                0,
                (uri) => {
                    resolve(uri);
                },
                "base64",
                512,
                200
            );
        });



    const handleSubmit = async (event) => {
        event.preventDefault();


        if (post["title"] !== "") {
            setTitleCheck(true)
        }
        else {
            setTitleCheck(false)
            return
        }

        if (post["promptUsed"] !== "") {
            setPromptCheck(true)
        }
        else {
            setPromptCheck(false)
            return
        }

        if (post["image"] !== "") {
            setImageCheck(true)
        }
        else {
            setImageCheck(false)
            return
        }

        var data = await createNewPost(post)
        console.log(data);
        navigate("/")
    };

    return (
    <form onSubmit={handleSubmit} className=" bg-slate-800 text-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4 w-full lg:w-[700px]">
        
        <h1 className=" text-center font-sans text-xl mb-3"> Create Post </h1>
        
        {image !== undefined &&
            <div  className=" w-full flex justify-center mb-5">
                <img src={image} alt="preview_image" />
            </div>
        }

        <div className="mb-4 w-auto mt-4">
            <label className="label">
                <span className="label-text">Title</span>
            </label> 
            <input
            value={post.title}
            onChange={(e) => setPostData({ ...post, title: e.target.value })}
            placeholder="Type here" class="input input-bordered w-full" 
            />
        </div>

        {TitleCheck !== true && 
        <div className="alert alert-error shadow-lg">
             <div>
             <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             <span>Title required.</span>
             </div>
         </div>
        }
        

        <div className="form-control">
            <label className="label">
                <span className="label-text">Prompt</span>
            </label> 
            <textarea 
                onChange={(e) => setPostData({ ...post, promptUsed: e.target.value })}
                className="textarea textarea-bordered h-24 outline-none mb-4" 
                value={post.promptUsed}
                placeholder="A man wearing sunglasses">
            </textarea>
        </div>

        {PromptCheck !== true && 
            <div className="alert alert-error shadow-lg">
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Image prompt required.</span>
                </div>
            </div>
        }

        <div className="form-control">
            <label className="label">
                <span className="label-text">Negative Prompt</span>
            </label> 
            <textarea 
                onChange={(e) => setPostData({ ...post, Negative_Prompt: e.target.value })}
                className="textarea textarea-bordered h-24 outline-none mb-4" 
                value={post.Negative_Prompt}
                placeholder="ugly, deformed, bad lighting">
            </textarea>
        </div>

        <div  className=" w-full flex justify-center mb-5">
            <input type="file" 
            onChange={(e) => handleImageUpload(e)}
            class="file-input file-input-bordered w-auto max-w-xs file-input-primary" />
        </div>

        {ImageCheck !== true && 
          <div className="alert alert-error shadow-lg mb-4">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Pick an image to upload.</span>
            </div>
          </div>
        }

        <div className="flex items-center justify-center"> 
            <button className=" bg-lime-700 text-white p-2 rounded-md"> Share </button>
        </div>
    </form>
);
};




export default Postpage;