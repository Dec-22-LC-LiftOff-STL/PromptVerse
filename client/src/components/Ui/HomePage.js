import React, {useEffect, useState} from "react";
import { useCookies, Cookies } from 'react-cookie';
import { getPosts } from "../../actions/PostActions";


const Homepage = () => {
    const cookies = new Cookies();
    const token = cookies.get('user_token');
    const userData = cookies.get('user_data');
    const [posts, setPosts] = useState([]);

    const [update, setUpdate] = useState(false)
  

    const handleSubmit = async (event) => {
        const data = await getPosts()
        console.log(posts)
        setPosts(data)
    }
    


    useEffect(() => {
       handleSubmit()
    }, [update]);
  

    return (
      <>
        <div className=" w-full md:w-[98%] h-screen flex flex-col gap-2 flex-wrap content-start justify-start">

            {posts !== undefined && 
            <>
                {posts.map(post => (


                    <div className="h-max flex-grow-1">
                        <img className=" w-[256px] h-full rounded-md" alt="post_image" src={post.image}/>
                    </div>
                ))}
            </>
            }
        </div>
        {/* {hasMore && <button onClick={() => setPage(page + 1)}>Load More</button>} */}
      </>
    );

}

export default Homepage

