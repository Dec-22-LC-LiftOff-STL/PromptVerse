import express from 'express';
import mongoose from 'mongoose';
import Post from '../models/Post.js';
import User from '../models/User.js';



export const CreatePost = async (req, res) => {
    const PostModel = req.body;
    console.log("post creation")
    const newPostSchema = new Post(PostModel)


    try {
        if (!await User.findById(mongoose.Types.ObjectId(req.body["user_id"])));
        
        await User.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(req.body["user_id"]) },
            { $push: { posts: newPostSchema["_id"] } }
        )

        await newPostSchema.save();
        return res.status(201).json({ newPostSchema})
    } catch (error) {
        return res.status(409).json({ message: error.message })
    }
}

// export const getPosts = async (req, res) => { 
//     try {
//         const PostModels = await Post.find();
//         res.status(200).json(PostModels);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }


export const getPosts = async (req, res) => { 
    try {
        // console.log(req.body)
        const skip = req.body["skip"] && /^\d+$/.test(req.body["skip"]) ? Number(req.body["skip"]) : 0

        if (req.body["type"] == "collection") {
            var posts = await Post.find({ in_boards: { $in: [req.body["search"]] } }, undefined, { skip, limit: 20 }) //.sort('_id')
        }
        else {
            if (req.body["search"] !== "") {
                var posts = await Post.find({ $text: { $search: req.body["search"] } }, undefined, { skip, limit: 20 }).sort('_id')
            }
            else {
                var posts = await Post.find({}, undefined, { skip, limit: 20 }).sort('_id')
            }
        }

        // 63bdbc33697d3ff75d3293b9
        // 63c72a654255d90d4e0e6892
        // 63c72a654255d90d4e0e6892
        // 63c72a654255d90d4e0e6892


        res.send(posts)
      } catch (e) {
        console.log(e)
        res.status(500).send()
      }
}


export const getPostWithId = async (req, res) => {
    try {
        const { id } = req.params
        if (!await Post.findById(id));
        const post = await Post.findById(id);
        res.json(post);
    } catch (error) {
        res.status(404).json({ message: "post not found" });
    }
}


export const updatePost = async (req, res) => {
    const { _id } = req.body;

    console.log(" updating post ")

    if (!await Post.findById(_id));

    await Post.findByIdAndUpdate(_id, req.body, { new: true });

    const updated = await Post.findById(_id)

    res.json(updated);

}