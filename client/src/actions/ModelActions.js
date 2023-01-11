import * as api from '../api/index.js'


export async function createNewModel(model) {
    try {
      const { data } = await api.createModel(model);
      // console.log(data)
      return data
    } catch (error) {
      console.log(error);
      return error
    }
};


export async function updateOldModel(model) {
  try {
    const { data } = await api.updateModel(model);
    // console.log(data)
    return data
  } catch (error) {
    console.log(error);
    return error
  }
};


export async function getModelWithId(id) {
    try {
        const { data } = await api.fetchModelWithId(id)
        return data
    } catch (error) {
        console.log(error)
        return error
    }
  }