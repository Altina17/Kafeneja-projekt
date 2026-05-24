import { Router } from 'express';
import { getMetodat } from '../controllers/metodatPagesaveController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', protect, getMetodat);

export default router;