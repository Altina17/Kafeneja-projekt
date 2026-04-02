import { Router } from 'express';
import { getOrders, getOrder, postOrder, putOrder, removeOrder } from '../controllers/porosiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.route('/').get(protect, getOrders).post(protect, postOrder);
router.route('/:id').get(protect, getOrder).put(protect, putOrder).delete(protect, removeOrder);

export default router;