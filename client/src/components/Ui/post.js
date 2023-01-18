import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';


const Post = ( { data, userData, setCurrentPost } ) => {
    const navigate = useNavigate()
    const [PostState, setPostState] = useState(false) 

    
    return (

        <>  
            <div sx={ data.height } key={data["_id"]} onMouseEnter={() => { setPostState(true) }}  onMouseLeave={() => { setPostState(false) }} class="z-0 relative card card-compact w-96 bg-base-100 shadow-xl transition duration-75 ease-in-out hover:-translate-y-1">

                { userData?.["_id"] === data["user_id"] &&
                    <EditIcon onClick={() => navigate("/EditPost/"+data["_id"])} className={"ml-2 mt-2 cursor-pointer w-5 rounded-md bg-none absolute hover:opacity-90 transition-2 opacity-60 rounded-empty" + ((PostState === false) ? ' invisible' : ' visible')}/> 
                }
                { userData?.["_id"] !== undefined &&
                    <label htmlFor="my-modal-6" onClick={() => setCurrentPost(data)} className={" btn btn-sm btn-primary absolute mt-1 right-1 font-sans font-thin" + ((PostState === false) ? ' invisible' : ' visible')}> Save </label> 
                }

                <figure><img className=" cursor-pointer rounded-md" onClick={() => navigate(`/post/${data._id}`)} src={data.image} alt={data._id} /></figure>
                
                <div class="card-body mb-[-10px]">
                    <h2 class="card-title mt-[-10px] truncate text-ellipsis w-auto opacity-100">{data.title}</h2>
                    <p className="mt-[-10px] truncate text-ellipsis opacity-80">{data.promptUsed}</p>
                </div>

            </div>
        </>
    )
}


export default Post
