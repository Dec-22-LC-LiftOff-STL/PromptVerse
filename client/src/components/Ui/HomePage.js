import React, {useEffect, useState} from "react";
import { useCookies, Cookies } from 'react-cookie';
import { getPosts } from "../../actions/PostActions";
import { Masonry } from "@mui/lab";
import { useNavigate } from "react-router-dom";


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



const Homepage = () => {
    const cookies = new Cookies();
    const token = cookies.get('user_token');
    const userData = cookies.get('user_data');
    const [posts, setPosts] = useState([]);
    const [update, setUpdate] = useState(false)
    const [skip, setSkip] = useState(0)
    const navigate = useNavigate()
    const [search, setsearch] = useState("");


    // const GetPosts = async (event) => {
    //     const data = await getPosts()
    //     if (data !== []) {
    //         setPosts([...posts, ...loadImages(data)])
    //         // setPosts(loadImages(data))
    //     }
    // }

    const update_posts = () => {
        setSkip(posts.length)
    }

    const searchPosts = () => {
        setSkip(0)
    }

    // const [stackGrid, setStackGrid] = useState();
    

    useEffect(() => {
        const fetchTodos = async () => {
            try {
            var data = await getPosts({"skip":skip,"search": search})
            console.log(data)
            if (data !== []) {
                setPosts([...posts, ...loadImages(data)])
                // setPosts(loadImages(data))
                }
            } catch (e) {
      
            }
          }
      
          fetchTodos()
    }, [skip]);
  

    return (
        <>
 <div className=" w-screen flex flex-col justify-center items-center gap-3">
        <h1 className=" md:text-xl font-bold">Ai Prompt Share</h1>
        <input className=" input input-bordered w-[95%] md:w-[50%]"  onChange={(e) => setsearch(e.target.value)}/>
        <button onClick={()=>searchPosts()} className= " btn">Search</button>
    </div>

        {posts.length >= 1 && 
            <Masonry columns={{ xs: 1, sm: 2, md: 4, lg: 6, xl: 8}} spacing={1}>
                {posts.map((data, index) => (
                    <div sx={ data.height } onClick={() => navigate(`/post/${data._id}`)}  class="card card-compact w-96 bg-base-100 shadow-xl cursor-pointer transition duration-75 ease-in-out hover:-translate-y-1">
                            <figure><img src={data.image} alt={index} /></figure>
                            <div class="card-body mb-[-10px]">
                                <h2 class="card-title mt-[-10px] truncate text-ellipsis opacity-80">{data.title}</h2>
                                <p className="mt-[-10px] truncate text-ellipsis opacity-80">{data.promptUsed}</p>
                            </div>
                    </div>
                ))}
            </Masonry>
        }

        {posts.length === 0 && 
            <div className=" w-100% h-screen flexjustify-center">
                <button class="btn loading mt-10">loading</button>
            </div>
        }

        {posts.length >= 1 &&
            <button className=" btn btn-outline btn-success mb-6 w-full md:w-[200px]" onClick={() => update_posts()}>Load More</button>
        }
    </>
    );

}

export default Homepage

