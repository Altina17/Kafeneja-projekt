import { Router } from 'express';
import { getUsers, postUser } from '../controllers/userController.js';

const router = Router();

router.route('/').get(getUsers).post(postUser);

export default router;