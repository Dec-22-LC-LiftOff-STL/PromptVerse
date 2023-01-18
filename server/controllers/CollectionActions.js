import Collection from "../models/Collection.js";



export const updateCollection = async (req, res) => {
    const { _id } = req.body;

    console.log(" updating Collection ")

    if (!await Collection.findById(_id));

    await Collection.findByIdAndUpdate(_id, req.body, { new: true });

    const updated = await Collection.findById(_id)

    res.json(updated);

}


export const CreateCollection = async (req, res) => {
    const collection = req.body;
    const newCollectionSchema = new Collection(collection)

    try {
        await newCollectionSchema.save();
        return res.status(201).json({ newCollectionSchema })
    } catch (error) {
        return res.status(409).json({ message: error.message })
    }
}


export const getCollectionWithId = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        if (!await Collection.findById(id));
        const collection = await Collection.findById(id);
        res.json(collection);
    } catch (error) {
        res.status(404).json({ message: "post not found" });
    }
}


export const getCollections = async (req, res) => { 
    try {
        console.log(req.body)
        const skip = req.body["skip"] && /^\d+$/.test(req.body["skip"]) ? Number(req.body["skip"]) : 0

        if (req.body["search"] !== "") {
            var Collections = await Collection.find({ $text: { $search: req.body["search"] } }, undefined, { skip, limit: 20 }).sort('_id')
        }
        else {
            var Collections = await Collection.find({}, undefined, { skip, limit: 20 }).sort('_id')
        }


        res.send(Collections)
      } catch (e) {
        console.log(e)
        res.status(500).send()
      }
}