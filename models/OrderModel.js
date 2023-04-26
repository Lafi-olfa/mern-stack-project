const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },

  fullName: String,
  email: String,
  password: String,
  adresse: String,
  phone: String,
  userRole: {
    type: String,
    default: "user",
    roles: ["user", "admin"],
  },
});
module.exports = mongoose.model("user", userSchema);
