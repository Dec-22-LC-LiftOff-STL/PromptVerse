import express from 'express';
import mongoose from 'mongoose';

import UserModel from '../models/User.js';


const router = express.Router();


export const AddUser = async (req, res) => {
    console.log(req.body)
    const user = req.body;
    const newUser = new UserModel(user)
    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}


export const getUsers = async (req, res) => { 
    try {
        const UserModels = await UserModel.find();
        res.status(200).json(UserModels);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const removeUser = async (req, res ) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);
    await UserModel.findByIdAndRemove(id);
    res.json({ message: "user deleted "})
}


export const updateUser = async (req, res) => {
    const { email, password, posts, _id } = req.body;
    if (!await UserModel.findById(_id));
    const updatedPost = { email, password, posts, _id };
    await UserModel.findByIdAndUpdate(_id, updatedPost, { new: true });
    const updated = await UserModel.findById(_id)
    res.json(updated);
}
