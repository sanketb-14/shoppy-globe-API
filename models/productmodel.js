import mongoose from 'mongoose';

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

const data = [
  {
    "name": "Wireless Mouse",
    "price": 1500,
    "description": "A high-quality wireless mouse with ergonomic design.",
    "stockQuantity": 500
  },
  {
    "name": "Gaming Keyboard",
    "price": 3500,
    "description": "RGB backlit mechanical gaming keyboard with tactile switches.",
    "stockQuantity": 800
  },
  {
    "name": "USB-C Hub",
    "price": 2500,
    "description": "A multi-port USB-C hub with HDMI and Ethernet connectivity.",
    "stockQuantity": 300
  },
  {
    "name": "Laptop Stand",
    "price": 1200,
    "description": "Adjustable aluminum laptop stand for better ergonomics.",
    "stockQuantity": 900
  },
  {
    "name": "Bluetooth Speaker",
    "price": 2000,
    "description": "Portable Bluetooth speaker with deep bass and long battery life.",
    "stockQuantity": 1200
  },
  {
    "name": "Smartphone Charger",
    "price": 800,
    "description": "Fast charging smartphone charger compatible with multiple devices.",
    "stockQuantity": 1500
  },
  {
    "name": "Noise Cancelling Headphones",
    "price": 6000,
    "description": "Wireless noise-cancelling headphones with premium sound quality.",
    "stockQuantity": 450
  },
  {
    "name": "External SSD",
    "price": 8000,
    "description": "1TB external SSD with ultra-fast read and write speeds.",
    "stockQuantity": 350
  },
  {
    "name": "Fitness Tracker",
    "price": 3000,
    "description": "Water-resistant fitness tracker with heart rate monitoring.",
    "stockQuantity": 1000
  },
  {
    "name": "4K Monitor",
    "price": 20000,
    "description": "32-inch 4K monitor with ultra-high resolution and HDR support.",
    "stockQuantity": 100
  }
]
