import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { getUserWithId } from "../../actions/UserActions";
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
                <textarea className=" textarea textarea-bordered " type="text" value={copyText} readOnly />
            }
            {(type === "input" || type === "Display")  && 
                <input className=" input input-bordered" type="text" value={copyText} readOnly />
            }
             {(type !== "Display" && type !== "textarea display") && 
                <button className=" btn" onClick={handleCopyClick}>
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


    const GetModel = async (event) => {
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


    useEffect(() => {
        GetModel()
    }, [update]);


    return (
        <>

        {model.length !== [] && 
            <div className=" flex gap-5 bg-slate-800 p-10 rounded-md items-top md:flex-row flex-col mb-20">

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


                <div className=" flex flex-col gap-2 w-full">
                    <h1 className="font-bold">{model.name}</h1>

                    <div className=" flex items-center flex-row">
                        { postUser !== undefined &&
                            <h2 className=" font-thin">by <button onClick={() => navigate(`/Profile/${postUser._id}`)} class="link link-hover truncate">{postUser.email}</button></h2>
                        }
                        { userData?.["_id"] === model["user_id"] &&
                            <button onClick={() => navigate("/EditModel/"+model["_id"])} className=" ml-2 cursor-pointer btn-sm btn-outline rounded-md self-center">Edit Model</button>
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
        
        </>
    )
}


export default ModelDetailsPage


