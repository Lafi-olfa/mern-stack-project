//addItemIn cart

const cart = require("../models/cart");

exports.addItem = async (req, res, next) => {
  const { cartItems } = req.body;
  try {
    const newCart = new cart({
      cartItems,
    });

    await newCart.save();
    newCart
      ? res.status(200).json(newCart)
      : res.status(401).json({ msg: "create cart error" });
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
};
