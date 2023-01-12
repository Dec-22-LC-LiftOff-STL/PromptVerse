import mongoose from "mongoose";


const postSchema = mongoose.Schema({
    title: String,
    image: String,
    promptUsed: String,
    Negative_Prompt: String,
    sampler: String,
    steps: Number,
    seed: Number,
    user_id: String,
    model_id: String
})



const Post = mongoose.model('Post', postSchema);


export default Post
