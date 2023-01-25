import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';


const Post = ( { type, data, userData, setCurrentPost } ) => {
    const navigate = useNavigate()
    const [PostState, setPostState] = useState(false) 

    const load_post_page = () => {
        navigate(`/post/${data._id}`)
        window.location.reload()
    }
    
    return (

        <>  
            <div sx={ data.height } key={data["_id"]} onMouseEnter={() => { setPostState(true) }}  onMouseLeave={() => { setPostState(false) }} class="z-0 relative card card-compact w-96 bg-base-100 shadow-2xl transition duration-75 ease-in-out hover:-translate-y-1">

                { userData?.["_id"] === data["user_id"] &&
                    <EditIcon onClick={() => navigate("/EditPost/"+data["_id"])} className={" z-10 ml-2 mt-2 cursor-pointer w-5 rounded-md bg-none absolute hover:opacity-90 transition-2 opacity-60 rounded-empty" + ((PostState === false) ? ' invisible' : ' visible')}/> 
                }
                { userData?.["_id"] !== undefined &&
                    <label htmlFor="my-modal-6" onClick={() => setCurrentPost(data)} className={" z-10 btn btn-sm btn-primary absolute mt-1 right-1 font-Title text-xl" + ((PostState === false) ? ' invisible' : ' visible')}> Save </label> 
                }

                <div class="relative overflow-hidden self-center rounded-t-md bg-no-repeat bg-cover">
                    <figure><a className=" rounded-t-md" href={"/post/"+(data._id)}><img className=" z-0 cursor-pointer rounded-t-md hover:scale-110 transition duration-300 ease-in-out" onClick={() => load_post_page()} src={data.image} alt={data._id} /></a></figure>
                </div>

                {/* bg-slate-600  */}
                <div class="card-body bg-slate-600 rounded-b-lg">
                    <h2 class="card-title mt-[-10px] truncate text-ellipsis font-Title text-3xl w-auto opacity-100">{data.title}</h2>
                    <p className="mt-[-10px] truncate text-ellipsis opacity-80">{data.promptUsed}</p>
                </div>

            </div>
        </>
    )
}


export default Post

