import Model from "../models/Model.js";
import User from "../models/User.js";


export const updateModel = async (req, res) => {
    try {
        const { _id } = req.body;

        console.log(" updating Model ")
    
        if (!await Model.findById(_id));
    
        await Model.findByIdAndUpdate(_id, req.body, { new: true });
    
        const updated = await Model.findById(_id)
    
        res.json(updated);
        
    } catch (error) {
        return res.status(409).json({ message: error.message })
    }
}


export const CreateModel = async (req, res) => {
    const model = req.body;
    const newModelSchema = new Model(model)

    try {
        // if (!await Model.findById(mongoose.Types.ObjectId(req.body["user_id"])));
        
        // await User.findOneAndUpdate(
        //     { _id: mongoose.Types.ObjectId(req.body["user_id"]) },
        //     { $push: { posts: newPostSchema["_id"] } }
        // )
        await newModelSchema.save();
        return res.status(201).json({ newModelSchema })
    } catch (error) {
        return res.status(409).json({ message: error.message })
    }
}


export const getModelWithId = async (req, res) => {
    try {
        const { id } = req.params
        if (!await Model.findById(id));
        const model = await Model.findById(id);
        res.json(model);
    } catch (error) {
        res.status(404).json({ message: "post not found" });
    }
}


export const getModels = async (req, res) => { 
    try {
        console.log(req.body)
        const skip = req.body["skip"] && /^\d+$/.test(req.body["skip"]) ? Number(req.body["skip"]) : 0

        if (req.body["search"] !== "") {
            var models = await Model.find({ $text: { $search: req.body["search"] } }, undefined, { skip, limit: 20 }).sort('_id')
        }


        else {
            var models = await Model.find({}, undefined, { skip, limit: 20 }).sort('_id')
        }


        res.send(models)
      } catch (e) {
        console.log(e)
        res.status(500).send()
      }
}