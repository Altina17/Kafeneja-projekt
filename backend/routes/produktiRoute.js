import { Router } from 'express';
import { getProducts, getProduct, postProduct, putProduct, removeProduct } from '../controllers/produktiController.js';
import { verifyToken as protect } from '../middleware/authMiddleware.js';

const router = Router();

router.route('/').get(getProducts).post(protect, postProduct);
router.route('/:id').get(getProduct).put(protect, putProduct).delete(protect, removeProduct);

export default router;