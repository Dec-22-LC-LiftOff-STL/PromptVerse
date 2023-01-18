import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { getUserWithId } from "../../actions/UserActions";
import { Cookies } from 'react-cookie';
import { getCollectionWithId } from "../../actions/CollectionActions";
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


    useEffect(() => {
        GetModel()
    }, [update]);


    return (
        <>

        {!collection !== [] && 
            <>

            <div className=" flex justify-center items-center flex-col w-[100%]">

                <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img alt={collection["_id"]} src={collection["image"]}/>
                    </div>
                </div>

                <h1 className=" text-3xl"> {collection["name"]} </h1>
                { postUser !== undefined &&
                    <h2 className=" font-thin mt-2">by <button onClick={() => navigate(`/Profile/${postUser._id}`)} class="link link-hover truncate">{postUser.email}</button></h2>
                }

                <div className="form-control w-full md:w-[50%] mt-2">
                    <textarea className=" bg-slate-700 p-2 rounded-md textarea-bordered h-auto text-center" value={collection["description"]} disabled></textarea>
                </div>
                
                <div className=" divider w-[90%] self-center"> </div>
            </div>
            
            {collection?.["_id"] && 
                <PostRenderPage type="collection" search_value={collection["_id"]}/>
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
