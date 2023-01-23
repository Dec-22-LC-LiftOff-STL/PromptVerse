import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    email: String,
    password: String,
    posts: Array,
    image: String,
    bio: String,
    display_name: String
})



const User = mongoose.model('User', userSchema);


export default User

