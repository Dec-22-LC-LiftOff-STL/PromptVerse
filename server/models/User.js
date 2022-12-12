import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    email: String,
    password: String,
    posts: Array,
})


const User = mongoose.model('User', userSchema);
export default User;

