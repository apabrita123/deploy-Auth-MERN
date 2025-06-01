const express = require("express");
const router = express.Router();
const {
  signupValidation,
  loginValidation,
} = require("../middlewares/authMiddleware");
const { signup, login } = require("../controllers/controller");

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);

module.exports = router;
