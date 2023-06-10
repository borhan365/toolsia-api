import express from "express"
import { getUsers, registerUser, loginUser, deleteUser, editUser, userDetails } from "../controllers/userControllers.js"
const router = express.Router()
import {protect} from '../middleware/authMiddleware.js'

router.post('/register', registerUser);
router.get('/', getUsers);
router.get('/:id', userDetails);
router.post('/login', loginUser);
router.delete('/:id', protect, deleteUser);
router.put('/:id', protect, editUser);

export default router; 