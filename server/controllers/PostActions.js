import express from 'express';
import mongoose from 'mongoose';
import Post from '../models/Post.js';


export const CreatePost = async (req, res) => {
    // const { title,image,promptUsed } = req.body
    console.log(req.body)
    const PostModel = req.body;
    const newPostSchema = new Post(PostModel)

    // check for duplicate email
    try {
        await newPostSchema.save();
        return res.status(201).json({ newPostSchema})
    } catch (error) {
        return res.status(409).json({ message: error.message })
    }
}