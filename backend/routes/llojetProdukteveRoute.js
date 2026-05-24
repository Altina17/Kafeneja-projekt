import { Router } from 'express';
import { getLlojet } from '../controllers/llojetProdukteveController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', protect, getLlojet);

export default router;