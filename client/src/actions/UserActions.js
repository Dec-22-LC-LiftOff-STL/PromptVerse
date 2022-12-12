import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000', mode: "cors"})


export const createNewUser = (user) => async () => {
    try {
      const { data } = await API.createUser(user);
      console.log(data)
      return data
    } catch (error) {
      console.log(error);
    }
};

