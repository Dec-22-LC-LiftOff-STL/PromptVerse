import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { getPostWithId } from "../../actions/PostActions";
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
            {type === "textarea" && 
                <textarea className=" textarea textarea-bordered " type="text" value={copyText} readOnly />
            }
            {(type === "input" || type === "Display")  && 
                <input className=" input input-bordered" type="text" value={copyText} readOnly />
            }
             {type !== "Display" && 
                <button className=" btn btn-sm mt-2" onClick={handleCopyClick}>
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


    const GetPosts = async (event) => {
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

    useEffect(() => {
        GetPosts()
    }, [update]);


    return (
        <>

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


                <div className=" flex flex-col gap-2 w-full">


                    <h1 className=" font-bold">{post.title}
                        { userData?.["_id"] === post["user_id"] &&
                            <button onClick={() => navigate("/EditPost/"+post["_id"])} className=" ml-2 cursor-pointer btn-sm btn-outline rounded-md">Edit Post</button>
                        } 
                    </h1>

                    { postUser !== undefined &&
                        <h2 className=" font-thin">by <button onClick={() => navigate(`/Profile/${postUser._id}`)} class="link link-hover truncate">{postUser.email}</button></h2>
                    }

                    <div className=" divider mb-[-5px] mt-[-5px]"></div>

                    <div className=" flex flex-col md:flex-row justify-between">

                        <div className=" flex flex-col">
                            <ClipboardCopy type="textarea" name="Prompt" copyText={post.promptUsed} />
                            {post.Negative_Prompt !== "" &&
                                <ClipboardCopy type="textarea" name="Negative Prompt" copyText={post.Negative_Prompt} />
                            }
                        </div>
                        
                        <div className=" flex flex-col">
                            {postModel !== undefined &&
                                <>
                                    <ClipboardCopy type="Display" name="Model Used" copyText={postModel.name} />
                                    <button onClick={() => navigate("/model/"+postModel._id)} className=" btn btn-sm w-full"> view model</button>
                                </>
                            }
                            <ClipboardCopy type="input" name="Seed" copyText={post.seed} />
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
