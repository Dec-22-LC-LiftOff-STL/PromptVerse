import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import UserSchema from '../models/User.js';
import jwt from 'jsonwebtoken'


const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
  }
  

const router = express.Router();


export const signup = async (req, res) => {
    const { email, password } = req.body
    console.log(req.body)
    const UserModel = req.body;
    const newUserSchema = new UserSchema(UserModel)


    // check for duplicate email
    const email_check_UserSchema = await UserSchema.findOne({ email })
    if (email_check_UserSchema) return res.status(400).json({ msg: 'User already exists' })
    
    bcrypt.hash(password, 7, async (err, hash) => {
        newUserSchema.password = hash
    })

    
    try {
        await newUserSchema.save();
        const token = createToken(user._id)
        return res.status(201).json({ email, token })
    } catch (error) {
        return res.status(409).json({ message: error.message })
    }
}


export const LoginUser = async (req, res) => {
    const { email, password } = req.body;
    const UserModel = req.body;

    const email_check_UserSchema = await UserSchema.findOne({ email })
    if (!email_check_UserSchema) return res.status(400).json({ msg: 'User already exists' })

    const token = createToken(email_check_UserSchema._id)
    return res.status(201).json({ email_check_UserSchema, token })


    console.log(password);
}



export const getUsers = async (req, res) => { 
    try {
        const UserModels = await UserSchema.find();
        res.status(200).json(UserModels);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const removeUser = async (req, res ) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No User with id: ${id}`);
    await UserSchema.findByIdAndRemove(id);
    res.json({ message: "Userdeleted "})
}


export const updateUser = async (req, res) => {
    const { email, password, posts, _id } = req.body;
    if (!await UserSchema.findById(_id));
    const updatedPost = { email, password, posts, _id };
    await UserSchema.findByIdAndUpdate(_id, updatedPost, { new: true });
    const updated = await UserSchema.findById(_id)
    res.json(updated);
}
