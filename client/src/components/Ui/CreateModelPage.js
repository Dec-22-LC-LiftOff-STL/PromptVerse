import React, { useState, useEffect } from "react";
import Resizer from "react-image-file-resizer";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { createNewModel, getModelWithId, updateOldModel } from "../../actions/ModelActions";
import { useParams } from "react-router-dom";



const CreateModelPage = ( { type } ) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const cookies = new Cookies();
    const userData = cookies.get('user_data');

    const [update, setUpdate] = useState(false)
    const [image, setImage] = useState()
    const [nameCheck, setNameCheck] = useState(true)
    const [downloadLinkCheck, setDownloadLinkCheck] = useState(true)
    const [descriptionCheck, setDescriptionCheck] = useState(true)
    const [ImageCheck, setImageCheck] = useState(true)
    const [model, setModel] = useState({
        "name": "",
        "image": "",
        "description": "",
        "download_link": "",
        "user_id": cookies.get("user_data")["_id"]
    })

    useEffect(() => { 
        if (!cookies.get("user_token")) {
            navigate("/")
        }
        GetModel()
    }, [update])


    const GetModel = async (event) => {
        const data = await getModelWithId(id)
        console.log(data)

        if (data?.["code"] === "ERR_BAD_REQUEST" && id !== undefined) {
            navigate("/")
        }

        if (!('response' in data)) {
            if (data !== []) {
                setModel(data)
                setImage(data["image"])
                if (data["user_id"] !== userData["_id"]) {
                    navigate("/")
                }
        }
        else {
            console.log("here")
            navigate("/")
        }
        }
    }


    const resizeFile = (file) =>
    new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            512,
            800,
            "JPEG",
            80,
            0,
            (uri) => {
                resolve(uri);
            },
            "base64",
            512,
            200
        );
    });


    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        // const base64 = await convertToBase64(file);
        //console.log(base64)
        const image = await resizeFile(file);
        // console.log(image)
        setImage(image);
        setModel({ ...model, image: image})
    };

    const remove_image = () => {
        setImage(undefined)
        setModel({ ...model, image: undefined})
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (model["image"] !== "") {
            setImageCheck(true)
        }
        else {
            setImageCheck(false)
            return
        }


        if (model["name"] !== "") {
            setNameCheck(true)
        }
        else {
            setNameCheck(false)
            return
        }

        if (model["download_link"] !== "") {
            setDescriptionCheck(true)
        }
        else {
            setDescriptionCheck(false)
            return
        }


        if (model["download_link"] !== "") {
            setDownloadLinkCheck(true)
        }
        else {
            setDownloadLinkCheck(false)
            return
        }



        if (type === "CreateModel") {
            var data = await createNewModel(model)
        } else {
            var data = await updateOldModel(model)
        }


        navigate("/model/"+id)
    };


    return (
        <form onSubmit={handleSubmit} className=" bg-slate-800 text-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4 w-full lg:w-[700px]">
            
            {type === "CreateModel" &&
                <h1 className=" text-center font-sans text-xl mt-1"> Create Model
                </h1>
            }

            {type === "EditModel" &&
                <h1 className=" text-center font-sans text-xl mt-1"> Edit Model </h1>
            }
        
            <div class="divider"></div> 
            
            {image !== undefined &&
                <div  className=" w-full flex flex-col justify-center mb-5">
                    <img src={image} alt="preview_image" />
                    <button onClick={() => remove_image()} className=" btn btn-sm btn-primary mt-2"> Remove </button>
                </div>
            }

            {image === undefined &&
                <>
                    <span className="label-text">Post Image</span>
                    <div class="flex items-center justify-center w-full mt-2">
                        <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input onChange={(e) => handleImageUpload(e)} id="dropzone-file" type="file" class="hidden" />
                        </label>
                    </div> 
                </>
            }

            {ImageCheck !== true && 
                <div className="alert alert-error shadow-lg mb-4 mt-4">
                    <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Pick an image to upload.</span>
                    </div>
                </div>
            }
            <div className="mb-4 w-auto mt-4">
                <label className="label">
                    <span className="label-text">Model Name</span>
                </label> 
                <input
                value={model.name}
                onChange={(e) => setModel({ ...model, name: e.target.value })}
                placeholder="stable-diffusion-v1-5" className=" input input-bordered w-full bg-grey" 
                />
            </div>

            {nameCheck !== true && 
                <div className="alert alert-error shadow-lg">
                    <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Model name required.</span>
                    </div>
                </div>
            }

            <div className="mb-4 w-auto mt-4">
                <label className="label">
                    <span className="label-text">Hugging Face Download Link</span>
                </label> 
                <input
                value={model.download_link}
                onChange={(e) => setModel({ ...model, download_link: e.target.value })}
                placeholder="https://huggingface.co/runwayml/stable-diffusion-v1-5" className=" input input-bordered w-full bg-grey" 
                />
            </div>

            {downloadLinkCheck !== true && 
                <div className="alert alert-error shadow-lg">
                    <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Download link required.</span>
                    </div>
                </div>
            }
            

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Model Description</span>
                </label> 
                <textarea 
                    onChange={(e) => setModel({ ...model, description: e.target.value })}
                    className="textarea textarea-bordered h-24 outline-none mb-4" 
                    value={model.description}
                    placeholder="The Stable-Diffusion-v1-5 checkpoint was initialized with the weights of the Stable-Diffusion-v1-2 checkpoint and subsequently fine-tuned on 595k steps at resolution 512x512 on laion-aesthetics v2 5+ and 10% dropping of the text-conditioning to improve classifier-free guidance sampling.">
                </textarea>
            </div>

            {descriptionCheck !== true && 
                <div className="alert alert-error shadow-lg">
                    <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Description required.</span>
                    </div>
                </div>
            }

            

            {/* <div  className="form-control w-full flex justify-center mb-5">
            <label className="label">
                <span className="label-text">Example Image</span>
            </label>
                <input type="file" 
                onChange={(e) => handleImageUpload(e)}
                className="file-input file-input-bordered w-auto max-w-xs file-input-primary" />
            </div>


            {ImageCheck !== true && 
                <div className="alert alert-error shadow-lg mb-4">
                    <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Pick an image to upload.</span>
                    </div>
                </div>
            } */}

            <div className="flex items-center justify-center w-full md:w-auto"> 
                {type === "EditModel" && 
                    <button className="btn btn-outline btn-success w-full md:w-auto"> Update </button>
                }
                {type === "CreateModel" && 
                    <button className="btn btn-outline btn-success w-full md:w-auto"> Share </button>
                }
            </div>


        </form>
    )
}


export default CreateModelPage

