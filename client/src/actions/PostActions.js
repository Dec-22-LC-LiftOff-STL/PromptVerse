import * as api from '../api/index.js'


export async function createNewPost(post) {
    try {
      const { data } = await api.createPost(post);
      return data
    } catch (error) {
      console.log(error);
      return error
    }
};


export async function updateOldPost(post) {
  try {
    const { data } = await api.updatePost(post);
    return data
  } catch (error) {
    console.log(error);
    return error
  }
};


export async function getPosts(id) {
  try {
      const { data } = await api.fetchPosts(id);
      return data
  } catch (error) {
      console.log(error)
  }
}


export async function getPostWithId(id) {
  try {
      const { data } = await api.fetchPostWithId(id)
      return data
  } catch (error) {
      console.log(error)
      return error
  }
}


export async function removePostWithId(id) {
  try {
      const { data } = await api.removePostWithId(id)
      return data
  } catch (error) {
      console.log(error)
      return error
  }
}


