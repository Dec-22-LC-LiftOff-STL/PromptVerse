import express from "express";

import { getUsers, AddUser, removeUser, updateUser} from "../controllers/UserActions.js";


const router = express.Router();

router.get('/', getUsers);

router.post('/newUser', AddUser);

router.post('/updateUser', updateUser);

router.delete('/:id', removeUser)


export default router;