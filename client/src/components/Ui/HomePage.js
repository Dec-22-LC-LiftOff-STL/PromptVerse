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
    //   img.onerror = (err) => {
    //     console.log("img error");
    //     console.error(err);
    //   };
  
    })
    return images
  };



const Homepage = () => {
    const cookies = new Cookies();
    const token = cookies.get('user_token');
    const userData = cookies.get('user_data');
    const [posts, setPosts] = useState([]);
    const [update, setUpdate] = useState(false)
    const navigate = useNavigate()


    const GetPosts = async (event) => {
        const data = await getPosts()
        if (data !== []) {
            setPosts(loadImages(data))
        }
    }

    // const [stackGrid, setStackGrid] = useState();
    

    useEffect(() => {
        GetPosts()
    //    if (stackGrid) {
    //         stackGrid.updateLayout()
    //     }
    }, [update]);
  

    return (
        <>
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
    </>
    );

}

export default Homepage

