import express from 'express';
import { getProducts, getProductById } from '../controllers/productController.js';

// Create a new router instance
const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);

export default router;