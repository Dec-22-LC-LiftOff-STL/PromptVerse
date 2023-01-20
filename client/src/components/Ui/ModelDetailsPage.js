import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { getUserWithId } from "../../actions/UserActions";
import { Cookies } from 'react-cookie';
import { getModelWithId, removeModelWithId } from "../../actions/ModelActions";
import PostRenderPage from "./PostRenderPage";


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
                <div class="mt-1 px-4 py-3 outline outline-1 outline-slate-600 bg-slate-600 rounded-xl shadow bg-opacity-50 font-light flex flex-col space-y-5">
                    <p>
                        <p class="rounded hover:bg-opacity-40 cursor-pointer " value={copyText}>{copyText}   </p>
                    </p>
                </div>
            }

            {(type === "input" || type === "Display")  && 
                <input className="bg-slate-600 bg-opacity-50 input input-bordered" type="text" value={copyText} readOnly />
            }
             {(type !== "Display" && type !== "textarea display") && 
                <button className=" btn mt-2 btn-sm" onClick={handleCopyClick}>
                     <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                </button>
             }
        </div>
    );
  }




const ModelDetailsPage = () => {
    const { id } = useParams()
    const [model, setModel] = useState([]);
    const [postUser, setPostUser] = useState(undefined)
    const [update, setUpdate] = useState(false)
    const navigate = useNavigate()
    const cookies = new Cookies();
    const userData = cookies.get('user_data');


    const delete_model = async () => { 
        try {
            var data = removeModelWithId(id)
            console.log(data)
            navigate("/")
            window.location.reload()
        } catch (error) {
            
        }
    }


    const GetModel = async (event) => {
        if (id !== undefined) {
            const data = await getModelWithId(id)
            if (!('response' in data)) {
                if (data !== []) {
                    // console.log(data)
                    setModel(data)

                    const user_Data = await getUserWithId(data["user_id"])
                    if (!('response' in user_Data)) {
                        if (user_Data !== undefined) {
                            setPostUser(user_Data)
                        }
                    }
                    else {
                        console.log("here")
                        navigate("/")
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
        GetModel()
    }, [update]);


    return (
        <>

        <input type="checkbox" id="my-modal" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box">

                        <h3 className="font-bold text-lg text-center">Are you sure you want to delete this model?</h3>
                        <div className="modal-action">
                        <div className=" w-full justify-center gap-4 flex">
                            <label onClick={() => delete_model()} htmlFor="my-modal" className="btn text-white btn-error">Yes</label>
                            <label htmlFor="my-modal" className="btn btn-primary">No</label>
                        </div>
                    </div>
                </div>
            </div>


        {model.length !== [] && 
            <div className=" flex gap-5 bg-slate-800 p-10 rounded-md items-top md:flex-row flex-col mb-10">

                <div className=" md:w-[125%]">
                    <label for="my-modal-5" ><img className="rounded-md object-fill block cursor-pointer" alt={model.name} src={model.image}/></label>
                </div>
                
                <input type="checkbox" id="my-modal-5" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box w-11/12 flex flex-col max-w-5xl">
                        <img className="rounded-md object-fill block cursor-pointer" alt={model.title} src={model.image}/>
                        <div className="modal-action">
                        <label htmlFor="my-modal-5" className="btn">Close</label>
                        </div>
                    </div>
                </div>


                <div className="prose flex flex-col gap-2 w-full">
                    <h1 className="font-bold font-Title truncate text-2xl md:text-3xl">{model.name}</h1>

                    <div className=" flex md:items-start flex-col gap-2">
                        { postUser !== undefined &&
                            <h2 className=" font-thin">by <button onClick={() => navigate(`/Profile/${postUser._id}`)} class="link link-hover truncate">{postUser.email}</button></h2>
                        }
                        { userData?.["_id"] === model["user_id"] &&
                            <> 
                            <div className=" flex justify-start md:items-center items-start">
                                <button onClick={() => navigate("/EditModel/"+model["_id"])} className="btn mr-2 btn-primary font-normal cursor-pointer btn-sm rounded-md">Edit</button>
                                <label htmlFor="my-modal" className="btn btn-sm text-white hover:opacity-80 btn-error text-sm font-normal">Delete</label>
                            </div>
                            </>
                        } 
                    </div>

                    <ClipboardCopy type="textarea display" name="Description" copyText={model.description} />
                    <ClipboardCopy type="input" name="Download Link" copyText={model.download_link} />
                </div>


            </div>
        }

        {model.length === 0 && 
            <div className=" w-100% h-screen flexjustify-center">
                <button class="btn loading mt-10">loading</button>
            </div>
        }


        {(model.length !== [] && model["_id"] !== undefined) && 
            <>
                <h1 className=" font-Title text-2xl md:text-5xl mb-4"> Images Created With This Model</h1>
                <PostRenderPage type="profile" search_value={model["_id"]}/>
            </>
        }

        {/* //63ace75679fa82b0686efdc4
             63bf3807bbf89875a2c2da63
            63ace75679fa82b0686efdc4 */}

        </>
    )
}


export default ModelDetailsPage


