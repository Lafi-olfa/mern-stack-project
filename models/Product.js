const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
  title: String,
  description: String,
  price: String,
  category: String,
  image: String,
  rating: {
    default: 0,
    type: Number,
    require: true,
  },
  countInStock: {
    type: Number,
    default: 2,
    require: true,
  },
  // quantity: String,
  promo: Number,
});

module.exports = mongoose.model("product", ProductSchema);
