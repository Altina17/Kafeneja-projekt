import { Router } from 'express';
import { getDetajet, getDetajetPorosi, postDetal, putDetal, removeDetal } from '../controllers/detajetPorosiseController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', verifyToken, getDetajet);
router.get('/:porosi_id', verifyToken, getDetajetPorosi);
router.post('/', verifyToken, postDetal);
router.put('/:id', verifyToken, putDetal);
router.delete('/:id', verifyToken, removeDetal);

export default router;