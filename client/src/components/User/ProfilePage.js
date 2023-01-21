import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { getUserWithId } from "../../actions/UserActions";
import { useNavigate } from "react-router-dom";
import Homepage from "../Ui/PostRenderPage";
import ModelsPage from "../Ui/ModelsPage";
import CollectionsPage from "../Ui/CollectionsPage";


const ProfilePage = () => {
    const { id } = useParams()
    const [profileUser, setProfileUser] = useState(undefined)
    const [update, setUpdate] = useState(false)
    const navigate = useNavigate()
    
    const [navState, setNavState] = useState("posts")


    const LoadUserData = async () => { 
        const user_Data = await getUserWithId(id)
            if (!('response' in user_Data)) {
                if (user_Data !== undefined) {
                    setProfileUser(user_Data)
                }
            }
            else {
                console.log("here")
                navigate("/")
            }
    }



    useEffect(() => {
        //window.location.reload()
        console.log(navState)
        LoadUserData()
        // setUpdate(!update)
    }, [update]);


    return (
        <>
        { profileUser !== undefined &&
            <div className=" w-full flex flex-col justify-center items-center gap-8">

                <h1 className=" text-2xl font-bold">{profileUser.email}</h1>

                {/* <form className="btn-group">
                    <input onClick={() => setNavState("posts")} defaultChecked type="radio" value="posts" name="options" data-title="Posts" className="btn"/>
                    <input onClick={() => setNavState("collections")} type="radio" value="collections" name="options" data-title="Collections" className="btn"/>
                    <input onClick={() => setNavState("models")}  type="radio" value="models" name="options" data-title="Models" className="btn" />
                </form>
                 */}
                 
                <div className="tabs tabs-boxed gap-2 bg-transparent">
                    <button onClick={() => setNavState("posts")} className={"btn-sm rounded-md btn-primary "+ ((navState === "posts") ? 'btn-active' : 'btn-ghost')}>Posts</button>
                    <button onClick={() => setNavState("collections")} className={"btn-sm rounded-md btn-primary "+ ((navState === "collections") ? 'btn-active' : 'btn-ghost')}>Collections</button>
                    <button onClick={() => setNavState("models")} className={"btn-sm rounded-md btn-primary "+ ((navState === "models") ? 'btn-active' : 'btn-ghost')}>Models</button>
                </div>


                { (navState === "posts" && profileUser !== undefined) &&
                <>  
                    <Homepage type="profile" search_value={profileUser._id}/>
                </>
                }


                { (navState === "models" && profileUser !== undefined) &&
                <>
                    <ModelsPage type="profile" search_value={profileUser._id} />
                </>
                }

                { (navState === "collections" && profileUser !== undefined) &&
                    <CollectionsPage type="profile" search_value={profileUser._id}/>
                }

            </div>
        }
        { profileUser === undefined &&
            <div className=" w-100% h-screen flex justify-center">
            <button class="btn loading mt-10">loading</button>
        </div>
        }
        </>
    )
}

export default ProfilePage

