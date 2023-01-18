import React, {useEffect, useState} from "react";
import { Cookies } from 'react-cookie';
import { getModels } from "../../actions/ModelActions";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';


const ModelsPage = ( {type, search_value} ) => {

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
            var data = await getModels({"skip":skip,"search": search})
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
            var data = await getModels({"skip":skip,"search": search})
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
            <div className=" w-full flex flex-col justify-center items-center gap-3 mb-10">
                <input onKeyUp={handleKeyDown} className=" input input-bordered w-[95%] md:w-[50%] shadow-md"  onChange={(e) => setsearch(e.target.value)}/>
                <button onClick={()=>searchmodels()} className= " btn shadow-sm">Search</button>
            </div>
          }

        {models.length >= 1 && 
            <div className=" flex flex-col gap-5 justify-center items-center">

                {models.map((data, index) => (
                    <div className="hero md:w-[90%] bg-base-200 rounded-md">

                            <div className="hero-content flex-col lg:flex-row">
                                <img src={data.image} alt={data._id} className="max-w-sm rounded-lg shadow-2xl" />
                            <div>

                            <h2 class="card-title mt-[-10px] truncate text-ellipsis w-auto opacity-80">{data.name}</h2>
                            <p className="py-6">{data.description}</p>
                                <div className=" flex gap-4">
                                    <button onClick={() => navigate("/model/"+data["_id"])} className="btn btn-primary">Details</button>
                                    { userData?.["_id"] === data["user_id"] && 
                                        <button onClick={() => navigate("/EditModel/"+data["_id"])} className="btn btn-error">Edit</button>
                                    }
                                </div>
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
                <span>No Models Found.</span>
            }
            </div>
        </div>
        }

        { (models.length >= 1 && searchResultsFound === false) &&
            <button className=" btn btn-outline btn-success mb-6 mt-2 w-full md:w-[200px]" onClick={() => update_models()}>Load More</button>
        }
    </>
    );

}

export default ModelsPage

