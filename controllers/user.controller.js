const User = require("../models/User");
var bcryptjs = require("bcryptjs");
var jwt = require("jsonwebtoken");
const config = require("config");
const secret = config.get("secret");
//callbackFunction

exports.register = async (req, res) => {
  //destracturing les donnees a utiliser dans le register
  const { fullName, email, password, adresse, phone, userRole } = req.body;
  const existantUser = await User.findOne({ email });
  if (existantUser) res.status(409).json({ msg: "user existe" });
  try {
    const newUser = new User({
      fullName,
      email,
      password,
      adresse,
      phone,
      userRole,
    });
    //cryptage du password
    var salt = await bcryptjs.genSalt(10);
    var hash = await bcryptjs.hash(password, salt);
    newUser.password = hash;
    //
    await newUser.save();
    //la creation du token installation jwt
    const payload = {
      _id: newUser._id,
      fullName: newUser.fullName,
      adresse: newUser.adresse,
      email:newUser.email,
      adresse:newUser.adresse,
      phone:newUser.phone,
    };
    var token = jwt.sign(payload, secret);
    res.send({
      token,
      user: {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        adresse: newUser.adresse,
        phone: newUser.phone,
        userRole: newUser.userRole,
      },
    });
    //
    res.send(newUser);
  } catch (error) {
    res.send(500).json({ msg: "erreur" });
  }
};
//
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //verifie lexistance d'un user ppar son email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: error.message });
    //comparer les mdp
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) return res.status(404).json({ msg: error.message });
    const payload = {
      _id: user._id,
      fullName: user.fullName,
      adresse: user.adresse,
    };
    let token = jwt.sign(payload, secret);
    res.send({
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    res.send(500).json({ msg: error.message });
  }
};
//
exports.getAllUser = async (req, res) => {
  try {
    const allUsers = await User.find();
    allUsers
      ? res.status(201).json(allUsers)
      : res.status(401).json({ msg: "getAll error" });
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
};
//
exports.updateUser = async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params._id,
      { ...req.body },
      { new: true }
    );
    res.status(201).send(updateUser);
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params._id);
    res.status(201).json({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
};
exports.auth = async (req, res) => {
  res.send(req.user);
};
