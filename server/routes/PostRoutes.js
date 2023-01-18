import express from "express";
import { CreatePost, getPosts, getPostWithId, updatePost, removePost } from "../controllers/PostActions.js";
import requireAuth from "../middleware/auth.js";


const router = express.Router();

router.post('/getPosts/', getPosts)

router.post('/createPost', requireAuth, CreatePost);


router.post('/EditPost', requireAuth, updatePost);


router.post('/getPost/:id', getPostWithId)


router.post('/removePost/:id', removePost)


// router.post('/updateUser', requireAuth, updateUser);

// router.post('/Login', LoginUser);

// router.delete('/:id', requireAuth, removeUser)


export default router;