import * as api from '../api/index.js'


export async function createNewPost(post) {
    try {
      const { data } = await api.createPost(post);
      // console.log(data)
      return data
    } catch (error) {
      console.log(error);
      return error
    }
};


export async function updateOldPost(post) {
  try {
    const { data } = await api.updatePost(post);
    // console.log(data)
    return data
  } catch (error) {
    console.log(error);
    return error
  }
};


export async function getPosts(id) {
  try {
      const { data } = await api.fetchPosts(id);
      // console.log(data)
      return data
  } catch (error) {
      console.log(error)
  }
}


export async function getPostWithId(id) {
  try {
      const { data } = await api.fetchPostWithId(id)
      // console.log(data)
      return data
  } catch (error) {
      console.log(error)
      return error
  }
}