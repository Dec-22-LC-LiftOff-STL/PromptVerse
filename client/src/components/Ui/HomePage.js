import React, {useEffect, useState} from "react";
import { useCookies, Cookies } from 'react-cookie';
import { getPosts } from "../../actions/PostActions";
import { Masonry } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';


const loadImages = (images) => {
    images.forEach((value) => {
  
      const img = new Image();
      img.src = value["imageUrl"];
    
      img.onload = () => {
        value["height"] = img.height;
      };
    })
    return images
  };



const Homepage = ( {type, search_value} ) => {

    // console.log(type, search_value)

    const cookies = new Cookies();
    const token = cookies.get('user_token');
    const userData = cookies.get('user_data');
    const [posts, setPosts] = useState([]);
    const [update, setUpdate] = useState(false)
    const [skip, setSkip] = useState(0)
    const navigate = useNavigate()
    const [search, setsearch] = useState(search_value);
    const [searchResultsFound, setSearchResultsFound] = useState(false)



    const update_posts = () => {
        setSkip(posts.length)
        //LoadMorePosts()
    }

    const searchPosts = () => {
        setPosts([])
        setSkip(0)
        SearchPosts()
    }

    // const [stackGrid, setStackGrid] = useState();
    const LoadMorePosts = async () => { 
        try {
            var data = await getPosts({"skip":skip,"search": search})
            console.log(data)
            if (data.length >= 1) {
                setPosts([...posts, ...loadImages(data)])
                setSearchResultsFound(false)
            }
            else {
                setSearchResultsFound(true)
            }
            }
        catch (e) {
  
        }
    }


    const SearchPosts = async () => {
        try {
            var data = await getPosts({"skip":skip,"search": search})
            console.log(data)
            if (data.length >= 1) {
                setPosts(data)
                setSearchResultsFound(false)
            }
            else {
                setSearchResultsFound(true)
                setPosts([])
            }
            }
        catch (e) {
  
        }
      }


    useEffect(() => {
        LoadMorePosts()
    }, [skip]);
  

    return (
        <>
        
        {type === "homepage" &&
            <div className=" w-full flex flex-col justify-center items-center gap-3">
                <h1 className=" md:text-xl font-bold">PromptVerse</h1>
                <input className=" input input-bordered w-[95%] md:w-[50%] shadow-md"  onChange={(e) => setsearch(e.target.value)}/>
                <button onClick={()=>searchPosts()} className= " btn shadow-sm">Search</button>
            </div>
          }

        {posts.length >= 1 && 
            <Masonry columns={{ xs: 1, sm: 2, md: 4, lg: 6, xl: 8}} spacing={1}>
                {posts.map((data, index) => (
                    <div sx={ data.height } key={data["_id"]}  class="z-0 card card-compact w-96 bg-base-100 shadow-xl transition duration-75 ease-in-out hover:-translate-y-1">
                            { userData?.["_id"] === data["user_id"] &&
                                <EditIcon onClick={() => navigate("/EditPost/"+data["_id"])} className="ml-2 mt-2 cursor-pointer w-5 rounded-md bg-none absolute hover:opacity-100 opacity-60 rounded-empty"/> 
                            }
                            <figure><img className=" cursor-pointer rounded-md" onClick={() => navigate(`/post/${data._id}`)} src={data.image} alt={index} /></figure>
                            <div class="card-body mb-[-10px]">
                                <h2 class="card-title mt-[-10px] truncate text-ellipsis w-auto opacity-80">{data.title}</h2>
                                <p className="mt-[-10px] truncate text-ellipsis opacity-80">{data.promptUsed}</p>
                            </div>
                    </div>
                ))}
            </Masonry>
        }

        { (posts.length === 0 && searchResultsFound === false) && 
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
                <span>No Posts Available.</span>
            }
            </div>
        </div>
        }

        { (posts.length >= 1 && searchResultsFound === false) &&
            <button className=" btn btn-outline btn-success mb-6 w-full md:w-[200px]" onClick={() => update_posts()}>Load More</button>
        }
    </>
    );

}

export default Homepage
