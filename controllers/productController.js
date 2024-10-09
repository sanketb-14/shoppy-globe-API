import Product from '../models/productModel.js';

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      status: 'success',
      message: 'Products fetched successfully',
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ status: 'error', message: 'Server error while fetching products' });
  }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).json({
        status: 'success',
        data: product
      });
    } else {
      res.status(404).json({ status: 'fail', message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ status: 'error', message: 'Server error while fetching product' });
  }
};