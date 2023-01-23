import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { getUserWithId } from "../../actions/UserActions";
import { Cookies } from 'react-cookie';
import { getCollectionWithId, removeCollectionWithId } from "../../actions/CollectionActions";
import PostRenderPage from "./PostRenderPage";


const CollectionsDetailsPage = () => {
    const { id } = useParams()
    const [collection, setCollection] = useState([]);
    const [postUser, setPostUser] = useState(undefined)
    const [update, setUpdate] = useState(false)
    const navigate = useNavigate()
    const cookies = new Cookies();
    const userData = cookies.get('user_data');


    const GetModel = async (event) => {
        const data = await getCollectionWithId(id)
        if (!('response' in data)) {
            if (data !== []) {
                console.log(data)
                setCollection(data)

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

    const delete_collection = async () => { 
        try {
            var data = removeCollectionWithId(id)
            console.log(data)
            navigate("/")
            window.location.reload()
        } catch (error) {
            
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

                    <h3 className="font-bold text-lg text-center">Are you sure you want to delete this collection?</h3>
                    <div className="modal-action">
                    <div className=" w-full justify-center gap-4 flex">
                        <label onClick={() => delete_collection()} htmlFor="my-modal" className="btn btn-outline btn-error">Yes</label>
                        <label htmlFor="my-modal" className="btn btn-outline btn-success">No</label>
                    </div>
                </div>
            </div>
        </div>


        {!collection !== [] && 
            <>

            <div className=" flex justify-center items-center flex-col w-[100%]">

                <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img alt={collection["_id"]} src={collection["image"]}/>
                    </div>
                </div>

                <h1 className=" text-3xl mt-1 font-Title md:text-5xl truncate"> {collection["name"]} </h1>

                { postUser !== undefined &&
                   
                    <> 
                        {/* { postUser["image"]?.length > 0 &&
                            <div className=" flex gap-3 mt-2 mb-4">
                                <div className="avatar cursor-pointer">
                                    <div className="w-8 md:w-10 rounded-full">
                                        <img onClick={() => navigate(`/Profile/${postUser._id}`)} src={postUser["image"]} alt={collection._id}  />
                                    </div>
                                </div>
                                <button onClick={() => navigate(`/Profile/${postUser._id}`)} class="link link-hover truncate">{postUser.email}</button>
                            </div>
                        } */}
{/* 
                        { postUser["image"]?.length === 0 && */}
                        <h2 className=" font-thin mt-1 mb-2">by <button onClick={() => navigate(`/Profile/${postUser._id}`)} class="link link-hover truncate">{postUser.email}</button></h2>
                        {/* } */}
                    </>
                }

                { userData?.["_id"] === collection["user_id"] &&
                    <div className=" flex md:justify-start  flex-row justify-center items-center gap-2 md:items-center">
                        <button onClick={() => navigate("/EditCollection/"+collection["_id"])} className="btn btn-xs  btn-primary cursor-pointer md:btn-sm rounded-md">Edit</button>
                        <label htmlFor="my-modal" className="btn btn-xs md:btn-sm btn-error hover:opacity-80 text-white">Delete</label>
                    </div>
                } 

                <div class="px-3 py-3 outline outline-1 outline-slate-600 bg-slate-600 rounded-xl shadow bg-opacity-50 font-light flex flex-col space-y-5  w-full md:w-[40%] mt-4">
                    <p>
                        <p class="rounded hover:bg-opacity-40 cursor-pointer text-center">{collection["description"]}   </p>
                    </p>
                </div>

                {/* <div className="form-control w-full md:w-[50%] mt-2">
                    <textarea className=" bg-slate-700 p-2 rounded-md textarea-bordered h-auto text-center" value={collection["description"]} disabled></textarea>
                </div>
                 */}
                <div className=" divider w-[90%] self-center" />
            </div>
            

            {collection?.["_id"] && 
            <>
                <PostRenderPage type="collection" search_value={collection["_id"]}/>
            </>
            }

            </>
        }


        {collection.length === 0 && 
            <div className=" w-100% h-screen flexjustify-center">
                <button class="btn loading mt-10">loading</button>
            </div>
        }
        

        </>
    )
}


export default CollectionsDetailsPage
