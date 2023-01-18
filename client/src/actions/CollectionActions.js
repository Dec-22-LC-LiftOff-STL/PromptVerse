import * as api from '../api/index.js'


export async function createNewCollection(Collection) {
    try {
      const { data } = await api.createCollection(Collection);
      // console.log(data)
      return data
    } catch (error) {
      console.log(error);
      return error
    }
};


export async function updateOldCollection(Collection) {
  try {
    const { data } = await api.updateCollection(Collection);
    // console.log(data)
    return data
  } catch (error) {
    console.log(error);
    return error
  }
};


export async function getCollectionWithId(id) {
    try {
        const { data } = await api.fetchCollectionWithId(id)
        return data
    } catch (error) {
        console.log(error)
        return error
    }
  }

  
  export async function getCollections(id) {
    try {
        const { data } = await api.fetchCollection(id);
        // console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
  }


  export async function removeCollectionWithId(id) {
    try {
        const { data } = await api.removeCollectionWithId(id)
        return data
    } catch (error) {
        console.log(error)
        return error
    }
  }