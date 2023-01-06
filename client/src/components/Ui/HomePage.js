import React, {useEffect, useState} from "react";
import { useCookies, Cookies } from 'react-cookie';
import { getPosts } from "../../actions/PostActions";
import { Masonry } from "@mui/lab";




const loadImages = (images) => {
    images.forEach((value) => {
  
      const img = new Image();
      img.src = value["imageUrl"];
    
      img.onload = () => {
        value["height"] = img.height;
      };
      img.onerror = (err) => {
        console.log("img error");
        console.error(err);
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
    

    const handleSubmit = async (event) => {
        const data = await getPosts()
        console.log(posts)
        if (data !== []) {
            setPosts(loadImages(data))
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
        <Masonry columns={{ xs: 1, sm: 2, md: 4, lg: 6, xl: 8}} spacing={1}>
        {posts.map((data, index) => (
          <img className="rounded-md shadow-md" src={data.image} alt={index} key={index} sx={ data.height } />
        ))}
        {posts.map((data, index) => (
          <img className=" rounded-md shadow-md" src={data.image} alt={index} key={index} sx={ data.height } />
        ))}
      </Masonry>
    );

}

export default Homepage

