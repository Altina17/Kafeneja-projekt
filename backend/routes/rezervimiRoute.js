import { Router } from 'express';
import { getAll, getById, create, update, remove, getTavolinatZena } from '../controllers/rezervimiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/tavolina-zena', protect, getTavolinatZena);
router.route('/').get(protect, getAll).post(protect, create);
router.route('/:id').get(protect, getById).put(protect, update).delete(protect, remove);

export default router;