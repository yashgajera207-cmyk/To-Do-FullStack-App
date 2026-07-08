const { validationResult } = require("express-validator");

const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");

const {

  registerUser,
  loginUser,
} = require("../services/authService");

// ================= Register =================
const register = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg);
  }

  const result = await registerUser(req.body);

  res.status(201).json(
    new ApiResponse(201, "User registered successfully", result)
  );
});

// ================= Login ==================
const login = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg);
  }

  const result = await loginUser(req.body);

  res.status(200).json(
    new ApiResponse(200, "Login successful", result)
  );
});

// ================= Profile =================
const getProfile = asyncHandler(async (req, res) => {
  res.status(200).json(
    new ApiResponse(
      200,
      "Profile fetched successfully",
      req.user
    )
  );
});

module.exports = {
  register,
  login,
  getProfile,
};