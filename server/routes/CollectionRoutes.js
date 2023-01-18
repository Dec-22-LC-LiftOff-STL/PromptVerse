import express from "express";
import { updateCollection, getCollections, CreateCollection, getCollectionWithId  } from "../controllers/CollectionActions.js";
import requireAuth from "../middleware/auth.js";


const router = express.Router();


router.post('/getCollections/', getCollections)
router.post('/createCollections', requireAuth, CreateCollection);
router.post('/EditCollections', requireAuth, updateCollection);
router.post('/getCollection/:id', getCollectionWithId)


export default router;

