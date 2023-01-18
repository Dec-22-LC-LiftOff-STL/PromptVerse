import mongoose from "mongoose";


const CollectionSchema = mongoose.Schema({
    name: String,
    description: String,
    image: String,
    user_id: String
})



const Collection = mongoose.model('Collection', CollectionSchema);


export default Collection


