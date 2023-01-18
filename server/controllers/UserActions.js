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
    console.log(req.body, "creating user")
    const UserModel = req.body;
    const newUserSchema = new UserSchema(UserModel)


    // check for duplicate email
    const email_check_UserSchema = await UserSchema.findOne({ email })
    if (email_check_UserSchema) return res.status(400).json({ msg: 'User already exists' })
    
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log(hashedPassword)
    newUserSchema["password"] = hashedPassword

    console.log(newUserSchema)
    
    try {
        await newUserSchema.save();
        const token = createToken(newUserSchema._id)
        return res.status(201).json({ newUserSchema, token })
    } catch (error) {
        return res.status(409).json({ message: error.message })
    }
}


export const LoginUser = async (req, res) => {
    const { email, password } = req.body;
    const UserModel = req.body;

    const email_check_UserSchema = await UserSchema.findOne({ email })
    if (!email_check_UserSchema) return res.status(400).json({ msg: 'no user with this email' })

    const token = createToken(email_check_UserSchema._id)

    const isMatch = await bcrypt.compare(password, email_check_UserSchema["password"]);
    if (!isMatch) return res.status(400).json({ msg: 'incorrect password' })

    return res.status(201).json({ email_check_UserSchema, token })
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
    try {
        const {id} = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No User with id: ${id}`);
        await UserSchema.findByIdAndRemove(id);
        res.json({ message: "Userdeleted "})
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const updateUser = async (req, res) => {
    try {
        const { email, password, posts, _id } = req.body;
        if (!await UserSchema.findById(_id));
        const updatedPost = { email, password, posts, _id };
        await UserSchema.findByIdAndUpdate(_id, updatedPost, { new: true });
        const updated = await UserSchema.findById(_id)
        res.json(updated);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const GetUserFromId = async (req, res) => { 

    console.log(req.params, "getting user from id")
    try {
        const { id } = req.params
        if (!await UserSchema.findById(id));
        const post = await UserSchema.findById(id);
        res.json(post);

        // if (await UserSchema.findById( mongoose.Types.ObjectId(_id)));


        //  // "63ace82779fa82b0686efdc7"
        //     const user = await UserSchema.findById( mongoose.Types.ObjectId(req.body["_id"]))

        //     console.log(user, _id, "here")
        //     //return res.status(201).json({ "email": user["email"], "posts": user["posts"], "_id": user["_id"] })
    
    } catch (error) {
        console.log(error)
        return res.status(409).json({ message: "user with this id not found" })
    }
}