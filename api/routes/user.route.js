import express from 'express'
import {test, updateUser} from '../controllers/user.controller.js'
const router = express.Router();
import { verifyToken } from '../utils/verify.user.js';


router.get('/test',test)
router.post('/update/:id', verifyToken, updateUser)


export default router;