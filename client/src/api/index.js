import axios from 'axios';
import { Cookies } from 'react-cookie';


const cookies = new Cookies();
const API = axios.create({ baseURL: 'http://localhost:5000', mode: "cors"})
// const API = axios.create({ baseURL: 'https://promptverse.onrender.com', mode: "cors"})


API.interceptors.request.use((req) => {
    if (cookies.get('user_token')) {
        req.headers.authorization = `Bearer ${cookies.get('user_token')}`;
    }
    return req
})


export const createUser = (newUser) =>  API.post("/users/signup", newUser);
export const ApiUserLogin = (UserLogin) =>  API.post("/users/Login", UserLogin);
export const fetchUserWithId = (id) => API.post(`${"users/getUser"}/${id}`);
export const updateUser = (updatedUser) =>  API.post("/users/updateUser", updatedUser);


export const fetchModels = (search) => API.post("/models/getModels", search);
export const createModel = (newModel) =>  API.post("/models/createModel", newModel);
export const updateModel = (updatedModel) =>  API.post("/models/EditModel", updatedModel);
export const fetchModelWithId = (id) => API.post(`${"models/getModel"}/${id}`);
export const removeModelWithId = (id) => API.post(`${"models/removeModel"}/${id}`);


export const fetchCollection = (search) => API.post("/collections/getCollections", search);
export const createCollection = (newModel) =>  API.post("/collections/createCollections", newModel);
export const updateCollection = (updatedModel) =>  API.post("/collections/EditCollections", updatedModel);
export const fetchCollectionWithId = (id) => API.post(`${"/collections/getCollection"}/${id}`);
export const removeCollectionWithId = (id) => API.post(`${"collections/removeCollection"}/${id}`);


export const createPost = (newPost) =>  API.post("/posts/createPost", newPost);
export const updatePost = (updatedPost) =>  API.post("/posts/EditPost", updatedPost);
export const fetchPosts = (search) => API.post("/posts/getPosts", search);
export const fetchPostWithId = (id) => API.post(`${"posts/getPost"}/${id}`);
export const removePostWithId = (id) => API.post(`${"posts/removePost"}/${id}`);
export const getRandomPost = () => API.post(`${"posts/getRandomPost"}`);