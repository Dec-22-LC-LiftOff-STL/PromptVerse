import axios from 'axios';
import { Cookies } from 'react-cookie';


const cookies = new Cookies();
const API = axios.create({ baseURL: 'http://localhost:5000', mode: "cors"})

API.interceptors.request.use((req) => {
    if (cookies.get('user_token')) {
        req.headers.authorization = `Bearer ${cookies.get('user_token')}`;
    }
    return req
})


export const createUser = (newUser) =>  API.post("/users/signup", newUser);

export const ApiUserLogin = (UserLogin) =>  API.post("/users/Login", UserLogin);

export const createPost = (newPost) =>  API.post("/posts/createPost", newPost);

export const fetchPosts = (id) => API.post(`${"posts/getPosts"}/${id}`);

export const fetchPostWithId = (id) => API.post(`${"posts/getPost"}/${id}`);