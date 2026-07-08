const express = require("express");

const router = express.Router();

const {
  register,
  login,
  getProfile,
} = require("../controllers/authController");

const {
  registerValidator,
  loginValidator,
} = require("../validators/authValidator");

const protect = require("../middleware/authMiddleware");

// Register
router.post("/register", registerValidator, register);

// Login
router.post("/login", loginValidator, login);

// Profile
router.get("/profile", protect, getProfile);

module.exports = router;
