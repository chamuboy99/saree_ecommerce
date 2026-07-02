import express from 'express';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { createOrder, getAllOrders, getOrderById, updateOrderStatus } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/', protectAdmin, getAllOrders);
router.get('/:id', protectAdmin, getOrderById);
router.post('/:id/status', protectAdmin, updateOrderStatus);

export default router;