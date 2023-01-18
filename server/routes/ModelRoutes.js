import express from "express";
import { updateModel, CreateModel, getModelWithId, getModels, removeModel } from "../controllers/ModelActions.js";
import requireAuth from "../middleware/auth.js";


const router = express.Router();


router.post('/getModels/', getModels)
router.post('/createModel', requireAuth, CreateModel);
router.post('/EditModel', requireAuth, updateModel);
router.post('/getModel/:id', getModelWithId)
router.post('/removeModel/:id', removeModel)

export default router;

