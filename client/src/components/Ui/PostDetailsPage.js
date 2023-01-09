import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { getPostWithId } from "../../actions/PostActions";
import { useNavigate } from "react-router-dom";





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
                <button className=" btn" onClick={handleCopyClick}>
                     <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                </button>
             }
        </div>
    );
  }




const PostDetailsPage = () => {
    const { id } = useParams()
    const [post, setPost] = useState([]);
    const [update, setUpdate] = useState(false)
    const navigate = useNavigate()


    const GetPosts = async (event) => {
        const data = await getPostWithId(id)
        if (!('response' in data)) {
            if (data !== []) {
                console.log(data)
                setPost(data)
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
            <div className=" flex gap-5 bg-slate-800 p-10 rounded-md items-top md:flex-row flex-col">

                <div>
                    <img className=" rounded-xl md:min-w-[512px]" alt={post.title} src={post.image}/>
                </div>

                <div className=" flex flex-col gap-2 w-full">
                    <h1 className=" font-bold">{post.title}</h1>
                    <ClipboardCopy type="textarea" name="Prompt" copyText={post.promptUsed} />
                    <ClipboardCopy type="textarea" name="Negative Prompt" copyText={post.Negative_Prompt} />
                    <ClipboardCopy type="input" name="Seed" copyText={post.seed} />
                    <ClipboardCopy type="Display" name="Sampler" copyText={post.sampler} />
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
