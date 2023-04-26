const express = require("express");
const app = express();
app.use(express.json());
const user = require("./routes/user");
const product = require("./routes/product");
const cart = require("./routes/cart");
const upload = require("./routes/upload");
const config = require("config");
const { connectdb } = require("./config/connectDb");
const PORT = config.get("port");
const Port = PORT || 5000;
connectdb();

//router user require
app.use("/user", user);
//
app.use("/product", product);
//
app.use("/cart", cart);
app.use("upload", upload);
app.listen(PORT, (err) => {
  err ? console.log(error) : console.log(`server is running on port ${Port}`);
});
