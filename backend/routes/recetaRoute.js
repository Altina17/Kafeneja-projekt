import { Router } from 'express';
import { getAll, getByProduktId, getById, create, update, remove } from '../controllers/recetaController.js';

const router = Router();

router.get('/', getAll);
router.get('/produkt/:produkt_id', getByProduktId);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;