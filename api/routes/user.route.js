import express from 'express'
import {deleteUser, test, updateUser} from '../controllers/user.controller.js'
const router = express.Router();
import { verifyToken } from '../utils/verifyUser.js';


router.get('/test',test)
router.post('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)


export default router;