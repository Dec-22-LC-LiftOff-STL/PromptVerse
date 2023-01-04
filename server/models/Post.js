import mongoose from "mongoose";


const postSchema = mongoose.Schema({
    title: String,
    image: String,
    promptUsed: String,
    Negative_Prompt: String,
    sampler: String,
    steps: Number
})



const Post = mongoose.model('Post', postSchema);


export default Post
