import * as api from '../api/index.js'


export async function createNewUser(user) {
    try {
      const { data } = await api.createUser(user);
      console.log(data)
      return data
    } catch (error) {
      console.log(error);
      return error
    }
};


