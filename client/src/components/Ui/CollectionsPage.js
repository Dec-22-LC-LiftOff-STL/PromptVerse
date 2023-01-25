import React, {useEffect, useState} from "react";
import { Cookies } from 'react-cookie';
import { getCollections } from "../../actions/CollectionActions";
import { useNavigate } from "react-router-dom";


const CollectionsPage = ( {type, search_value} ) => {

    // console.log(type, search_value)

    const cookies = new Cookies();
    const token = cookies.get('user_token');
    const userData = cookies.get('user_data');
    const [models, setmodels] = useState([]);
    const [update, setUpdate] = useState(false)
    const [skip, setSkip] = useState(0)
    const navigate = useNavigate()
    const [search, setsearch] = useState(search_value);
    const [searchResultsFound, setSearchResultsFound] = useState(false)



    const update_models = () => {
        setSkip(models.length)
        //LoadMoremodels()
    }

    const searchmodels = () => {
        setmodels([])
        setSkip(0)
        Searchmodels()
    }

    // const [stackGrid, setStackGrid] = useState();
    const LoadMoremodels = async () => { 
        try {
            var data = await getCollections({"skip":skip,"search": search})
            console.log(data)
            if (data.length >= 1) {
                setmodels([...models, ...data])
                setSearchResultsFound(false)
            }
            else {
                setSearchResultsFound(true)
            }
            }
        catch (e) {
  
        }
    }


    const Searchmodels = async () => {
        try {
            var data = await getCollections({"skip":skip,"search": search})
            console.log(data)
            if (data.length >= 1) {
                setmodels(data)
                setSearchResultsFound(false)
            }
            else {
                setSearchResultsFound(true)
                setmodels([])
            }
            }
        catch (e) {
  
        }
      }



    useEffect(() => {
        LoadMoremodels()
    }, [skip]);
    

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            searchmodels()
       }
    }

    return (
        <>
        
        {type === "homepage" &&
            <div className=" w-full flex flex-col mb-10 justify-center items-center">
            <div className=" w-[95%] md:w-[50%] max-w-[700px]">   
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input onKeyUp={handleKeyDown} onChange={(e) => setsearch(e.target.value)} type="search" className="input input-bordered w-full p-4 pl-10 text-sm text-white focus:outline-none" placeholder="Search Collections" required />
                </div>
            </div>
            <button onClick={()=>searchmodels()} class="text-white w-[95%] mt-5 btn btn-sm btn-primary md:w-[120px]">Search</button>
        </div>
          }

        {models.length >= 1 && 
            <div className=" flex flex-col gap-5 justify-center items-center max-w-screen w-full md:w-auto">
                {models.map((data, index) => (
                    <div className="hero min-h-auto bg-base-200 rounded-md shadow-md">
                        <div className="hero-content flex-col lg:flex-row-reverse md:justify-between w-full ">


                            {/* <div class="avatar">
                                <div class="w-[300px] rounded">
                                <img src={data["image"]} alt={data["_id"]} />
                                </div>
                            </div> */}

                            <img src={data["image"]} alt={data["_id"]} className="w-sm max-w-screen rounded-lg shadow-2xl max-h-[300px]" />

                            <div className=" w-full max-w-screen">
                                <h1 className="text-2xl font-bold">{data["name"]}</h1>
                                <p className="py-6 opacity-80">{data.description}</p>
                                <button onClick={() => navigate("/collection/"+data["_id"])} className="btn btn-primary mr-4">View</button>
                                { userData?.["_id"] === data["user_id"] && 
                                    <button onClick={() => navigate("/EditCollection/"+data["_id"])} className="btn btn-error">Edit</button>
                                }
                            </div>
                            
                        </div>
                    </div>
                ))}
                </div>
        }

        { (models.length === 0 && searchResultsFound === false) && 
            <div className=" w-100% h-screen flexjustify-center">
                <button class="btn loading mt-10">loading</button>
            </div>
        }

        {searchResultsFound === true &&
        <div class="alert alert-error shadow-lg md:w-[50%] mt-5">
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {type === "homepage" &&
                <span>No Results Found</span>
            }
            {type === "profile" &&
                <span>No Results Found.</span>
            }
            </div>
        </div>
        }

        { (models.length >= 1 && searchResultsFound === false) &&
            <button className=" btn btn-primary mb-6 mt-2 w-full md:w-[200px]" onClick={() => update_models()}>Load More</button>
        }
    </>
    );

}

export default CollectionsPage
