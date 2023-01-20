import React, { useState } from "react";
import PostRenderPage from "./PostRenderPage";
import ModelsPage from "./ModelsPage";
import CollectionsPage from "./CollectionsPage";


const HomePage = () => {
    const [navState, setNavState] = useState("posts")


    return (
        <div className=" w-full flex flex-col justify-center items-center gap-2">

            <link href="https://fonts.googleapis.com/css2?family=Amatic+SC:wght@700&family=Architects+Daughter&family=Poppins:wght@300&family=Righteous&family=Roboto:wght@300&family=Varela+Round&display=swap" rel="stylesheet"></link>
        
            <div className=" w-full flex flex-col justify-center items-center gap-3">
                <h1 className=" md:text-5xl text-3xl font-bold font-Title">PromptVerse</h1>

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

            { navState === "collections" &&
                <CollectionsPage type="homepage" search_value={""}/>
            }


        </div>
    )
}


export default HomePage


