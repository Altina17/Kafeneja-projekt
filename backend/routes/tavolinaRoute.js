import { Router } from 'express';
import { getTables, getTable, postTable, putTable, removeTable } from '../controllers/tavolinaController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.route('/').get(getTables).post(protect, postTable);
router.route('/:id').get(getTable).put(protect, putTable).delete(protect, removeTable);

export default router;