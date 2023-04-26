const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  const { title, description, price, category, image, rating, promo } =
    req.body;
  try {
    const newProduct = new Product({
      title,
      description,
      price,
      category,
      image,
      rating,
      promo,
    });
    await newProduct.save();
    newProduct
      ? res.status(200).json(newProduct)
      : res.status(401).json({ msg: "create product error" });
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
};
exports.getAllProducts = async (req, res) => {
  try {
    const Allproducts = await Product.find();
    Allproducts
      ? res.status(201).json(Allproducts)
      : res.status(401).json({ msg: "Allproducts error" });
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
};
exports.getOneProduct = async (req, res) => {
  try {
    const oneProduct = await Product.findById(req.params._id);
    oneProduct
      ? res.status(201).send(oneProduct)
      : res.status(401).json({ msg: "get one product error" });
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
};
exports.editProduct = async (req, res, next) => {
  try {
    const editedProduct = await Product.findByIdAndUpdate(
      req.params._id,
      { ...req.body },
      { new: true }
    );
    res.status(200).send(editedProduct);
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deleteProduct = await Product.findByIdAndDelete(req.params._id);
    res.status(201).json({ msg: "product deleted successfully" });
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
};
//1:

//get product salon
exports.getSalonProducts = async (req, res) => {
  try {
    const Allproducts = await Product.find({category:"Salon"});
    Allproducts
      ? res.status(201).json(Allproducts)
      : res.status(401).json({ msg: "Allproducts error" });
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
};
