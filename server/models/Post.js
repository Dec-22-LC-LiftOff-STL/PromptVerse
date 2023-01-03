import mongoose from "mongoose";


const postSchema = mongoose.Schema({
    title: String,
    Image: String,
    promptUsed: String,
})



const Post = mongoose.model('Post', postSchema);


export default Post
