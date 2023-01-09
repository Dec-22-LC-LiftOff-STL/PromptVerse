import express from "express";
import { CreatePost, getPosts, getPostWithId } from "../controllers/PostActions.js";
import requireAuth from "../middleware/auth.js";


const router = express.Router();

router.get('/', getPosts);

router.post('/createPost', requireAuth, CreatePost);

router.post('/getPost/:id', requireAuth, getPostWithId)

// router.post('/updateUser', requireAuth, updateUser);

// router.post('/Login', LoginUser);

// router.delete('/:id', requireAuth, removeUser)


export default router;