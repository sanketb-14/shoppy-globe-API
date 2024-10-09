import express from 'express';
import { addToCart, updateCartItem, removeFromCart, getCart } from '../controllers/cartController.js';
import { protect } from '../controllers/authController.js';

// Router for handling cart-related operations
const router = express.Router();

router.route('/').get(protect, getCart).post(protect, addToCart);
router.put('/:id', protect, updateCartItem);
router.delete('/:id', protect, removeFromCart);

export default router;