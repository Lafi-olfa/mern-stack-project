const express = require("express");
const router = express.Router();
const {
  register,
  login,
  auth,
  getAllUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const { VerifyAuth } = require("../middlewares/verifyAuth");
const { registerRules, validatorMiddle } = require("../middlewares/validator");

//for user
router.post("/register", registerRules(), validatorMiddle, register);
router.post("/login", login);
router.get("/auth", VerifyAuth, auth);
//
router.get("/getAllUser", getAllUser);
router.put("/updateUser/:_id", updateUser);
router.delete("/deleteUser/:_id", deleteUser);
module.exports = router;
