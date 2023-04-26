const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
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
