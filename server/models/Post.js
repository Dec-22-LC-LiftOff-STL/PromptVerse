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
    model_id: String,
    in_boards: Array
})



const Post = mongoose.model('Post', postSchema);


export default Post
