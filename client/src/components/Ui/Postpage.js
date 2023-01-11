import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import { Cookies } from 'react-cookie';
import { createNewPost, updateOldPost } from "../../actions/PostActions.js";
import Resizer from "react-image-file-resizer";
import { useParams } from "react-router-dom";
import { getPostWithId } from "../../actions/PostActions.js";


const Postpage = ( { type } ) => {
    const cookies = new Cookies();
    const navigate = useNavigate()
    const { id } = useParams()
    const userData = cookies.get('user_data');


    const [TitleCheck, setTitleCheck] = useState(true)
    const [PromptCheck, setPromptCheck] = useState(true)
    const [ImageCheck, setImageCheck] = useState(true)
    const [stepsCheck, setStepsCheck] = useState(true)
    const [update, setUpdate] = useState(false)
    const [image, setImage] = useState()


    const [post, setPostData] = useState({
        "title": "",
        "image": "",
        "promptUsed": "",
        "Negative_Prompt": "",
        "sampler": "Euler a",
        "steps": 0,
        "seed": -1,
        "user_id": cookies.get("user_data")["_id"]
    });


    useEffect(() => { 
        if (!cookies.get("user_token")) {
            navigate("/")
        }
        console.log("here")
        GetPost()
    }, [update])


    const GetPost = async (event) => {
        const data = await getPostWithId(id)
        if (!('response' in data)) {
            if (data !== []) {
                setPostData(data)
                if (data["user_id"] !== userData["_id"]) {
                    navigate("/")
                }
        }
        else {
            console.log("here")
            navigate("/")
        }
        }
    }



    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        // const base64 = await convertToBase64(file);
        //console.log(base64)
        const image = await resizeFile(file);
        // console.log(image)
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

        if (!post["steps"] <= 0) {
            setStepsCheck(true)
        }
        else {
            setStepsCheck(false)
            return
        }

        if (post["image"] !== "") {
            setImageCheck(true)
        }
        else {
            setImageCheck(false)
            return
        }

        if (type === "CreatePost") {
            var data = await createNewPost(post)
        } else {
            var data = await updateOldPost(post)
        }

        navigate("/post/"+id)
    };


    return (
        <form onSubmit={handleSubmit} className=" bg-slate-800 text-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4 w-full lg:w-[700px]">
            
            {type === "CreatePost" &&
                <h1 className=" text-center font-sans text-xl mt-1"> Create Post
                </h1>
            }

            {type === "EditPost" &&
                <h1 className=" text-center font-sans text-xl mt-1"> Edit Post </h1>
            }
        
            <div class="divider"></div> 
            
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
                placeholder="Type here" className=" input input-bordered w-full bg-grey" 
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

            <div className="flex justify-start md:form-control w-auto">
                <div className=" md:form-control">
                    <label className="label">
                        <span className="label-text">Sampler Used</span>
                    </label>

                    <select onChange={(e) => setPostData({ ...post, sampler: e.target.value })} className="select select-bordered w-full mb-5">
                        <option value="Euler a" defaultValue={"Euler a"}>Euler a</option>
                        <option value="Euler">Euler</option>
                        <option value="LMS">LMS</option>
                        <option value="Heun">Heun</option>
                        <option value="DPM2">DPM2</option>
                        <option value="DPM2 a">DPM2 a</option>
                        <option value="DPM++ 2S a">DPM++ 2S a</option>
                        <option value="DPM++ 2M">DPM++ 2M</option>
                        <option value="DPM++ SDE">DPM++ SDE</option>
                        <option value="DPM fast">DPM fast</option>
                        <option value="DPM adaptive">DPM adaptive</option>
                        <option value="LMS Karras">LMS Karras</option>
                        <option value="DPM2 Karras">DPM2 Karras</option>
                        <option value="DPM2 a Karras">DPM2 a Karras</option>
                        <option value="DPM++ 2S a Karras">DPM++ 2S a Karras</option>
                        <option value="DPM++ 2M Karras">DPM++ 2M Karras</option>
                        <option value="DPM++ SDE Karras">DPM++ SDE Karras</option>
                        <option value="DDIM">DDIM</option>
                        <option value="PLMS">PLMS</option>
                    </select>
                </div>
            </div>


            <div className="mb-4 w-auto mt-1">
                <label className="label">
                    <span className="label-text">Steps</span>
                </label> 
                <input
                type="number"
                value={post.steps}
                onChange={(e) => setPostData({ ...post, steps: e.target.value })}
                placeholder="20" className="input input-bordered w-full" 
                />
            </div>

            {stepsCheck !== true && 
                <div className="alert alert-error shadow-lg">
                    <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Image steps required.</span>
                    </div>
                </div>
            }

            <div className="mb-4 w-auto mt-1">
                <label className="label">
                    <span className="label-text">Seed</span>
                </label> 
                <input
                type="number"
                value={post.seed}
                onChange={(e) => setPostData({ ...post, seed: e.target.value })}
                placeholder="20" className="input input-bordered w-full" 
                />
            </div>


            <div  className="form-control w-full flex justify-center mb-5">
            <label className="label">
                <span className="label-text">Upload Image</span>
            </label>
                <input type="file" 
                onChange={(e) => handleImageUpload(e)}
                className="file-input file-input-bordered w-auto max-w-xs file-input-primary" />
            </div>


            {ImageCheck !== true && 
            <div className="alert alert-error shadow-lg mb-4">
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Pick an image to upload.</span>
                </div>
            </div>
            }

            <div className="flex items-center justify-center w-full md:w-auto"> 
                {type === "EditPost" && 
                    <button className="btn btn-outline btn-success w-full md:w-auto"> Update </button>
                }
                {type === "CreatePost" && 
                    <button className="btn btn-outline btn-success w-full md:w-auto"> Share </button>
                }
            </div>
        </form>
    );
};




export default Postpage;