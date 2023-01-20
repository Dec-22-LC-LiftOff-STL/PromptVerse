import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { getPostWithId, removePostWithId } from "../../actions/PostActions";
import { useNavigate } from "react-router-dom";
import { getUserWithId } from "../../actions/UserActions";
import EditIcon from '@mui/icons-material/Edit';
import { Cookies } from 'react-cookie';
import { getModelWithId } from "../../actions/ModelActions";


function ClipboardCopy({ type, name, copyText }) {
    const [isCopied, setIsCopied] = useState(false);
  

    async function copyTextToClipboard(text) {
      if ('clipboard' in navigator) {
        return await navigator.clipboard.writeText(text);
      } else {
        return document.execCommand('copy', true, text);
      }
    }
  
    const handleCopyClick = () => {
      copyTextToClipboard(copyText)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 1500);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  
    return (
        <div class="form-control w-[100%] md:max-w-xs">
            <label class="label">
                <span class="label-text">{name}</span>
            </label>

            {(type === "textarea" || type === "textarea display") && 
                <div class="px-3 py-3 outline outline-1 outline-slate-600 bg-slate-600 rounded-xl shadow bg-opacity-50 font-light flex flex-col space-y-5">
                    <p>
                        <p class="rounded hover:bg-opacity-40 cursor-pointer " value={copyText}>{copyText}   </p>
                    </p>
                </div>
            }

            {(type === "input" || type === "Display")  && 
                <input className="bg-slate-600 bg-opacity-50 input input-bordered" type="text" value={copyText} readOnly />
            }
             {(type !== "Display" && type !== "textarea display") && 
                <button className="mt-1 btn btn-sm" onClick={handleCopyClick}>
                     <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                </button>
             }
        </div>
    );
  }




const PostDetailsPage = () => {
    const { id } = useParams()
    const [post, setPost] = useState([]);
    const [postUser, setPostUser] = useState(undefined)
    const [update, setUpdate] = useState(false)
    const [postModel, setPostModel] = useState(undefined)
    const navigate = useNavigate()
    const cookies = new Cookies();
    const userData = cookies.get('user_data');


    const delete_post = async () => { 
        try {
            var data = removePostWithId(id)
            console.log(data)
            navigate("/")
            window.location.reload()
        } catch (error) {
            
        }
    }


    const GetPosts = async (event) => {
        if (id !== undefined) {
            const data = await getPostWithId(id)
            if (!('response' in data)) {
                if (data !== []) {
                    // console.log(data)
                    setPost(data)
                    
                    const user_Data = await getUserWithId(data["user_id"])
                    if (!('response' in user_Data)) {
                        if (user_Data !== undefined) {
                            setPostUser(user_Data)
                        }
                    }
                    else {
                        navigate("/")
                    }
    
                    const model_data = await getModelWithId(data["model_id"])
                    if (!('response' in model_data)) {
                        if (model_data !== undefined) {
                            setPostModel(model_data)
                        }
                    }
                }
    
            }
            else {
                console.log("here")
                navigate("/")
            }
        }
    }

    useEffect(() => {
        GetPosts()
    }, [update]);


    return (
        <>


    <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">

                    <h3 className="font-bold text-lg text-center">Are you sure you want to delete this post?</h3>
                    <div className="modal-action">
                    <div className=" w-full justify-center gap-4 flex">
                        <label onClick={() => delete_post()} htmlFor="my-modal" className="btn btn-outline btn-error">Yes</label>
                        <label htmlFor="my-modal" className="btn btn-outline btn-success">No</label>
                    </div>
                </div>
            </div>
        </div>

        {post.length !== [] && 
            <div className=" flex gap-5 bg-slate-800 p-10 rounded-md items-top flex-col mb-20">

                <div>
                    <label className="flex items-center justify-center" for="my-modal-5" ><img className="rounded-md md:w-[80%] object-fill block cursor-pointer" alt={post.title} src={post.image}/></label>
                </div>
                

                <input type="checkbox" id="my-modal-5" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box w-11/12 flex flex-col max-w-5xl">
                        <img className="rounded-md object-fill block cursor-pointer" alt={post.title} src={post.image}/>
                        <div className="modal-action">
                        <label htmlFor="my-modal-5" className="btn">Close</label>
                        </div>
                    </div>
                </div>


                <div className=" flex flex-col gap-2 w-full max-w-full">

                    <h1 className=" font-bold truncate text-ellipsis overflow-hidden font-Title text-2xl md:text-4xl max-w-screen">{post.title}</h1>

                    { postUser !== undefined &&
                        <div className=" flex md:items-center flex-col md:flex-row gap-2">

                            <h2 className=" font-thin">by <button onClick={() => navigate(`/Profile/${postUser._id}`)} class="link link-hover truncate">{postUser.email}</button></h2>

                            { userData?.["_id"] === post["user_id"] &&
                                <> 
                                <div className=" flex justify-start md:ml-3 md:items-center items-start">
                                    <button onClick={() => navigate("/EditPost/"+post["_id"])} className="btn mr-2 btn-primary  cursor-pointer btn-sm rounded-md">Edit</button>
                                    <label htmlFor="my-modal" className="btn btn-sm text-white btn-error hover:opacity-80">Delete</label>
                                </div>
                                </>
                            } 

                        </div>
                    }

                    <div className=" divider mb-[-5px] mt-[-5px]"></div>

                    <div className=" flex flex-col md:flex-row justify-between">

                        <div className=" flex flex-col md:w-[50%]">
                            <ClipboardCopy type="textarea" name="Prompt" copyText={post.promptUsed} />
                            {post.Negative_Prompt !== "" &&
                                <ClipboardCopy type="textarea" name="Negative Prompt" copyText={post.Negative_Prompt} />
                            }
                        </div>
                        
                        <div className=" flex flex-col md:w-[45%]">
                            {postModel !== undefined &&
                                <>
                                    <ClipboardCopy type="Display" name="Model Used" copyText={postModel.name} />
                                    <button onClick={() => navigate("/model/"+postModel._id)} className=" btn btn-sm w-full"> view model</button>
                                </>
                            }

                            { post["seed"] !== -1 &&
                                <ClipboardCopy type="input" name="Seed" copyText={post.seed} />
                            }

                            <ClipboardCopy type="Display" name="Sampler" copyText={post.sampler} />
                        </div>

                    </div>

                </div>

                    
            </div>
        }

        {post.length === 0 && 
            <div className=" w-100% h-screen flexjustify-center">
                <button class="btn loading mt-10">loading</button>
            </div>
        }
        
        </>
    )
}

export default PostDetailsPage

