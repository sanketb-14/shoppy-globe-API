# ShoppyGlobe E-Commerce API

## Project Overview

ShoppyGlobe E-Commerce API is a backend service built with Node.js, Express.js, and MongoDB. It provides RESTful endpoints for managing products, user authentication, and shopping cart functionalities for an e-commerce platform.

## Features

- Product management (list all, get single product)
- User authentication (register, login)
- Shopping cart operations (add, update, remove items)
- JWT-based authentication
- MongoDB integration for data persistence

## Prerequisites

- Node.js (v14 or later)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/shoppyglobe-api.git
   cd shoppyglobe-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```

4. Start the server:
   ```
   npm start
   ```

## API Endpoints

### Products

- `GET /api/v1/products` - Get all products
- `GET /api/v1/products/:id` - Get a single product by ID

### Authentication

- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user

### Cart (Protected Routes)

- `POST /api/v1/cart` - Add product to cart
- `GET /api/v1/cart` - Get user's cart
- `PUT /api/v1/cart/:itemId` - Update cart item quantity
- `DELETE /api/v1/cart/:itemId` - Remove item from cart

## Authentication

This API uses JWT (JSON Web Tokens) for authentication. To access protected routes, include the JWT token in the Authorization header:
