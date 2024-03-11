const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require("dotenv").config();

const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (userFound)
      throw "User has already been registered. Please proceed to login!";
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) throw err;
      const user = new User({ name, email, password: hash });
      await user.save();
      res.status(201).json({ message: "New user has been registered!" });
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (!userFound)
      throw "Email has not been registered. Please register first!";
    bcrypt.compare(password, userFound.password, (err, result) => {
      if (err) throw err;
      if (!result) throw "Invalid credentials!";
      const accessToken = jwt.sign(
        { userID: userFound._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.status(200).json({ message: "Successfully logged in!", accessToken });
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  userLogin,
  userRegister,
};
