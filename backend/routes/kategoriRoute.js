import { Router } from 'express';
import { getCategories, getCategory, postCategory, putCategory, removeCategory } from '../controllers/kategoriController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.route('/').get(getCategories).post(protect, postCategory);
router.route('/:id').get(getCategory).put(protect, putCategory).delete(protect, removeCategory);

export default router;