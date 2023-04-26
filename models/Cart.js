const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cartSchema = new Schema({

  cartItems: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
      qty: { type: String, default: 1 },
      totalPrice: {
        type: String,
        required: true,
        default: 0.0,
      },
    },
  ],
});
module.exports = mongoose.model("cart", cartSchema);
