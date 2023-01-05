import React, {useEffect, useState, onr} from "react";
import { useCookies, Cookies } from 'react-cookie';
import { getPosts } from "../../actions/PostActions";
import StackGrid, {transitions} from "react-stack-grid";


const Homepage = () => {
    const cookies = new Cookies();
    const token = cookies.get('user_token');
    const userData = cookies.get('user_data');
    const [posts, setPosts] = useState([]);
    const { scaleDown } = transitions;
    const [update, setUpdate] = useState(false)
    

    const handleSubmit = async (event) => {
        const data = await getPosts()
        console.log(posts)
        if (data !== []) {
            setPosts(data)
        }
    }

    const [stackGrid, setStackGrid] = useState();
    

    useEffect(() => {
       handleSubmit()
       if (stackGrid) {
            stackGrid.updateLayout()
        }
    }, [update]);
  

    return (
        <StackGrid
        className=" w-full h-auto"
        appear={scaleDown.appear}
        appeared={scaleDown.appeared}
        enter={scaleDown.enter}
        entered={scaleDown.entered}
        leaved={scaleDown.leaved}
        columnWidth={210}
        gridRef={grid => setStackGrid(grid)}
        monitorImagesLoaded={true}>
            {posts.map(post => (
                <div key={post._id} className="h-max flex-grow-1 cursor-pointer hover:opacity-80">
                    <img className=" w-[256px] h-full rounded-md" alt="post_image" src={post.image}/>
                </div>
            ))}
        </StackGrid>
    );

}

export default Homepage

