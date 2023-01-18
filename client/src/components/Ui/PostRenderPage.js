import React, {useEffect, useState} from "react";
import { useCookies, Cookies } from 'react-cookie';
import { getPosts } from "../../actions/PostActions";
import { getCollections } from "../../actions/CollectionActions";
import { Masonry } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import Post from "./post";
import { updateOldPost } from "../../actions/PostActions.js";


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



const PostRenderPage = ( {type, search_value} ) => {

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
    const [collectionsData, setCollections] = useState([])
    const [currentPost, setCurrentPost] = useState(undefined)


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
            var data = await getPosts({"skip":skip,"search": search, "type": type})
            console.log(data)
            if (data.length >= 1) {
                setPosts([...posts, ...loadImages(data)])
                setSearchResultsFound(false)
            }
            else {
                setSearchResultsFound(true)
            }

            if (userData !== undefined) {
                var collections = await getCollections({"skip":0, "search": userData["_id"]})
                if (collections.length >= 1) {
                    setCollections(collections)
                    console.log(collectionsData)
                }
                else {
                    setCollections([])
                }
            }

            }

            
        catch (e) {
  
        }
    }

    const remove_post_from_board = async (board_id) => {

        if (currentPost !== undefined ) {
            if (currentPost["in_boards"].includes(board_id)) {
                const newList = currentPost["in_boards"].filter((item) => item !== board_id);
                currentPost["in_boards"] = newList
            }
        }

        try {
            var data = await updateOldPost(currentPost)
            setCurrentPost(data)
            if (type === "collection") {
                searchPosts()
            }
        } catch (error) {
            console.log(error)
        }
    }


    const add_post_to_board = async (board_id) => {

        if (currentPost !== undefined && "in_boards" in currentPost ) {
            if (!currentPost["in_boards"].includes(board_id)) {
                currentPost["in_boards"].push(board_id)
            }

        }
        else {
            if (!currentPost["in_boards"].includes(board_id)) {
                currentPost["in_boards"] = [board_id]
            }
        }
        console.log(currentPost)

        try {
            var data = await updateOldPost(currentPost)
            setCurrentPost(data)
        } catch (error) {
            console.log(error)
        }
    }


    const SearchPosts = async () => {
        try {
            var data = await getPosts({"skip":skip,"search": search, "type": type})
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

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            searchPosts()
       }
    }

    return (
        <>

        <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box flex flex-col justify-center items-center">

                    <h1 className=" text-2xl mt-[-10px] mb-[-10px]">Collections</h1>
                    <div className=" divider"></div>

                     {collectionsData.length >= 1 && 
                        <> 
                        <div className=" flex flex-col">
                            {collectionsData.map((data, index) => (
                                <div key={index} className=" flex items-center gap-2">
                                    <h1 className=" truncate overflow-hidden font-bold max-w-[100px]  md:max-w-[400px]">{data["name"]}</h1>
                                    <button onClick={() => navigate('/collection/'+data["_id"])} className=" btn btn-sm btn-primary ml-auto">View</button>
                                    { currentPost?.["in_boards"].includes(data["_id"]) &&
                                        <button onClick={() => remove_post_from_board(data["_id"])} className=" btn btn-sm btn-error text-white"> Remove </button>
                                    }

                                    { !currentPost?.["in_boards"].includes(data["_id"]) &&
                                        <button onClick={() => add_post_to_board(data["_id"])} className=" btn btn-sm btn-secondary"> Add </button>
                                    }

                                </div>
                            ))}
                         </div>
                        </>
                     }

              
                <button onClick={() => navigate('/CreateCollection')} className=" btn btn-sm btn-primary mt-6"> Create Collection  </button>
               

                <div className="modal-action">
                    <label htmlFor="my-modal-6" className="btn">Close</label>
                </div>

                </div>
            </div>


        {type === "homepage" &&
            <div className=" w-full flex flex-col justify-center items-center gap-3 mb-10">
                <input onKeyUp={handleKeyDown} className=" input input-bordered w-[95%] md:w-[50%] shadow-md"  onChange={(e) => setsearch(e.target.value)}/>
                <button onClick={()=>searchPosts()} className= " btn shadow-sm">Search</button>

            </div>
          }


        {posts.length >= 1 && 
            <Masonry columns={{ xs: 1, sm: 2, md: 4, lg: 6, xl: 8}} spacing={1}>
                {posts.map((data, index) => (
                    <Post data={data} userData={userData} setCurrentPost={setCurrentPost}/>
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
                    {type === "collection" &&
                        <span>No Posts Found. </span>
                    }
                </div>
            </div>
        }

        { (posts.length >= 1 && searchResultsFound === false) &&
            <button className=" btn btn-outline btn-success mt-2 mb-6 w-full md:w-[200px]" onClick={() => update_posts()}>Load More</button>
        }
    </>
    );

}

export default PostRenderPage
