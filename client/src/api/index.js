import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000', mode: "cors"})


export const createUser = (newUser) =>  API.post("/users/newUser", newUser);


