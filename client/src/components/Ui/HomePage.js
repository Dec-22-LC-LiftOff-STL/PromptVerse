import React, { useState } from "react";
import PostRenderPage from "./PostRenderPage";
import ModelsPage from "./ModelsPage";


const HomePage = () => {
    const [navState, setNavState] = useState("collections")


    return (
        <div className=" w-full flex flex-col justify-center items-center gap-2">

            <div className=" w-full flex flex-col justify-center items-center gap-3">
                <h1 className=" md:text-xl font-bold">PromptVerse</h1>

                <div className="tabs tabs-boxed gap-2 bg-transparent">
                    <button onClick={() => setNavState("posts")} className={"btn-sm rounded-md btn-primary "+ ((navState === "posts") ? 'btn-active' : 'btn-ghost')}>Posts</button>
                    <button onClick={() => setNavState("collections")} className={"btn-sm rounded-md btn-primary "+ ((navState === "collections") ? 'btn-active' : 'btn-ghost')}>Collections</button>
                    <button onClick={() => setNavState("models")} className={"btn-sm rounded-md btn-primary "+ ((navState === "models") ? 'btn-active' : 'btn-ghost')}>Models</button>
                </div>
            </div>


            { navState === "posts" &&
                <PostRenderPage type="homepage" search_value={""}/>
            }

            { navState === "models" &&
                <ModelsPage type="homepage" search_value={""}/>
            }


        </div>
    )
}


export default HomePage


