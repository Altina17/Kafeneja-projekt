import { Router } from 'express';
import { getEmployees, getEmployee, postEmployee, putEmployee, removeEmployee } from '../controllers/punetoriController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.route('/').get(protect, getEmployees).post(protect, postEmployee);
router.route('/:id').get(protect, getEmployee).put(protect, putEmployee).delete(protect, removeEmployee);


export default router;