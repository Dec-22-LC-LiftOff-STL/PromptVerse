import express from 'express';
import mongoose from 'mongoose';
import Post from '../models/Post.js';
import User from '../models/User.js';



export const CreatePost = async (req, res) => {
    const PostModel = req.body;
    const newPostSchema = new Post(PostModel)


    try {
        if (!await User.findById(mongoose.Types.ObjectId(req.body["post_user_id"])));
        
        await User.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(req.body["post_user_id"]) },
            { $push: { posts: newPostSchema["_id"] } }
        )

        await newPostSchema.save();
        return res.status(201).json({ newPostSchema})
    } catch (error) {
        return res.status(409).json({ message: error.message })
    }
}


export const getPosts = async (req, res) => { 
    try {
        const PostModels = await Post.find();
        res.status(200).json(PostModels);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


// export const getPosts = async (req, res) => {
//     try {
//       const page = parseInt(req.query.page) || 1;
//       const limit = parseInt(req.query.limit) || 30;
  
//       const total = await Post.countDocuments();
//       const pages = Math.ceil(total / limit);
  
//       const PostModels = await Post.find()
//         .skip(limit * (page - 1))
//         .limit(limit)
//         .toArray();
  
//       res.status(200).json({ total, pages, data: PostModels });
//     } catch (error) {
//       res.status(404).json({ message: error.message });
//     }
//   };