import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
      .populate("user", "fullName")
      .populate("items.product", "title price");

    if (!cart) {
      return res.status(404).json({
        status: "fail",
        message: "Cart not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        cart,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Server error",
      error: error.message,
    });
  }
};

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    let [product, cart] = await Promise.all([
      Product.findById(productId),
      Cart.findOne({ user: req.user._id }),
    ]);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(201).json({
      status: "success",
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateCartItem = async (req, res) => {
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id, "items._id": req.params.id },
      { $set: { "items.$.quantity": quantity } },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart or item not found" });
    }

    res.status(200).json({
      status: "success",
      message: "Cart item updated successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      res.status(404);
      throw new Error("Cart not found");
    }

    cart.items = cart.items.filter(
      (item) => item._id.toString() !== req.params.id
    );
    await cart.save();

    res.status(200).json({
        status: 'success',
        currentCart: cart
    });
  } catch (error) {
    res.status(500).json({
        status: 'error',
        message: 'Server error',
        error: error.message
    });
  }
};
