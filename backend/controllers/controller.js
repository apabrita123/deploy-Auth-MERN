const User = require("../models/user");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userModel = await User.findOne({ email });
    if (!userModel) {
      return res.status(403).json({
        success: false,
        message: "User doesn't exist with that email, register first!",
      });
    }

    const isPassEqual = await bcrypt.compare(password, userModel.password);
    if (!isPassEqual) {
      return res.status(403).json({
        message: "Password doesn't match",
        success: false,
      });
    }

    const jwtToken = jwt.sign(
      { email: userModel.email, _id: userModel._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successfully!",
      success: true,
      jwtToken,
      email,
      name: userModel.name,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User is already exist, you can login",
        success: false,
      });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const userModel = await User.create({
      name,
      email,
      password: hashedpassword,
    });

    res.status(201).json({
      success: true,
      message: "Signup successfully!",
      user: userModel,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal sever error",
      success: false,
      error: error,
    });
  }
};
