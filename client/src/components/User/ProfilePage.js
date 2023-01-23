import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { getUserWithId } from "../../actions/UserActions";
import { useNavigate } from "react-router-dom";
import Homepage from "../Ui/PostRenderPage";
import ModelsPage from "../Ui/ModelsPage";
import CollectionsPage from "../Ui/CollectionsPage";
import { Cookies } from 'react-cookie';


const ProfilePage = () => {
    const { id } = useParams()
    const [profileUser, setProfileUser] = useState(undefined)
    const [update, setUpdate] = useState(false)
    const navigate = useNavigate()
    const [navState, setNavState] = useState("posts")

    const cookies = new Cookies();
    var userData = cookies.get('user_data', { path: '/' });


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
            <div className=" w-full flex flex-col justify-center items-center gap-4">


                {profileUser["image"] !== "" &&
                    <div  className=" w-full flex flex-col self-center items-center justify-center mb-2">

                        <div className="avatar">
                            <div className="w-36 rounded-full">
                            <img src={profileUser["image"] } alt="preview_image" />
                            </div>
                        </div>

                    </div>
                }

                <h1 className=" text-2xl md:text-4xl font-Title font-bold">{profileUser.email}</h1>
                
                { profileUser["bio"]?.length >= 1 &&
                    <div class="px-3 py-3 w-[95%] md:w-auto max-w-[600px] text-center outline outline-1 outline-slate-600 bg-slate-600 rounded-xl shadow bg-opacity-50 font-light flex flex-col space-y-5">
                        <p>
                            <p class="rounded hover:bg-opacity-40 cursor-pointer ">{profileUser.bio}   </p>
                        </p>
                    </div>
                }

                { userData?.["_id"] === profileUser["_id"] && 
                    <button onClick={() => navigate("/Settings")} className=" mt-[-8px] btn btn-xs btn-primary"> Settings </button>
                }


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

