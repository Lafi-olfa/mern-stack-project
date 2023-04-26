const express = require("express");
const { addItem } = require("../controllers/cart.controller");
router = express.Router();

router.post("/addItem", addItem);
module.exports = router;
