const express = require("express");
const router = express.Router();

const {
  addProduct,
  getAllProducts,
  getOneProduct,
  deleteProduct,
  getSalonProducts,
  editProduct,
} = require("../controllers/product.controller");
router.post("/addProduct", addProduct);
router.put("/editProduct/:_id", editProduct);
router.get("/getAllProducts", getAllProducts);
router.get("/getSalonProducts", getSalonProducts);
router.get("/getOneProduct/:_id", getOneProduct);
router.delete("/deleteProduct/:_id", deleteProduct);
module.exports = router;
