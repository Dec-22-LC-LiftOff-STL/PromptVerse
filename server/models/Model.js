import mongoose from "mongoose";


const ModelSchema = mongoose.Schema({
    name: String,
    image: String,
    description: String,
    download_link: String,
    user_id: String
})



const Model = mongoose.model('Model', ModelSchema);


export default Model