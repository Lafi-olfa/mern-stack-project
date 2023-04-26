//connect with database using mongoose
const mongoose = require("mongoose");
//importation db from default.json
const config = require("config");
const db = config.get("db");
exports.connectdb = async () => {
  try {
    await mongoose.connect(db);
    console.log("data base connected with success");
  } catch (error) {
    console.log("Error:not connected");
  }
};
