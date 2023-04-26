const jwt = require("jsonwebtoken");
const config = require("config");
const secret = config.get("secret");
const User = require("../models/User");
exports.VerifyAuth = async (req, res, next) => {
  var token = req.headers.authorization;

  try {
    //decoded contient le token et le secret qui est specifie a cette app
    //verifier lexistance du token dans cette app
    var decoded = jwt.verify(token, secret);
    if (!decoded) return res.status(400).json({ msg: " Bad Request" });
    //extraire l id from token et verifier lexistance du user dans cette app
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ msg: "unauthorized" });
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(500).json({ msg: " Internal Server Error" });
  }
};


