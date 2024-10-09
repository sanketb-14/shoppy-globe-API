import mongoose from 'mongoose';

// Product schema and model definition
// This schema defines the structure and validation rules for a product in the database
// It includes fields for name, price, description, and stock quantity, with various constraints
const productSchema = new mongoose.Schema({
  name: { type: String, required: true,
    trim: true,
    maxlength: [40, "Name can not be more than 40 characters"],
    minlength: [3, "Name must be at least 3 characters"],
   },
  price: { type: Number, required: true,
    max: [100000, "Price can not be more than 100000"],
    min: [0, "Price can not be less than 0"],
   },
  description: { type: String, required: true,
    maxlength: [200, "Description can not be more than 200 characters"],
    minlength: [10, "Description must be at least 10 characters"],
   },
  stockQuantity: { type: Number, required: true,
    max: [10000, "Stock quantity can not be more than 10000"],
    min: [0, "Stock quantity can not be less than 0"],
   },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
