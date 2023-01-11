import express from "express";
import { updateModel, CreateModel, getModelWithId } from "../controllers/ModelActions.js";
import requireAuth from "../middleware/auth.js";


const router = express.Router();

// router.post('/getPosts/', getPosts)

router.post('/createModel', requireAuth, CreateModel);


router.post('/EditModel', requireAuth, updateModel);


router.post('/getModel/:id', getModelWithId)


export default router;