import express from "express";

import { getUsers, AddUser, removeUser, updateUser} from "../controllers/UserActions.js";
import auth from "../middleware/auth.js";


const router = express.Router();

router.get('/', getUsers);

router.post('/newUser', AddUser);

router.post('/updateUser', auth, updateUser);

router.delete('/:id', auth, removeUser)


export default router;