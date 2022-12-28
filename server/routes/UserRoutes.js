import express from "express";

import { getUsers, signup, removeUser, updateUser} from "../controllers/UserActions.js";
import requireAuth from "../middleware/auth.js";


const router = express.Router();

router.get('/', getUsers);

router.post('/signup', signup);

router.post('/updateUser', requireAuth, updateUser);

router.post('/Login', LoginUser);

router.delete('/:id', requireAuth, removeUser)


export default router;