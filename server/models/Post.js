import mongoose from "mongoose";


const postSchema = mongoose.Schema({
    title: String,
    image: String,
    promptUsed: String,
    Negative_Prompt: String
})



const Post = mongoose.model('Post', postSchema);


export default Post
