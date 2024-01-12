const express = require("express");
const forgotPasswordController = require("./forgotPassword.controller");

const router = express.Router();

// Route to initiate the forgot password process
router.post("/forgot-password", forgotPasswordController.forgotPassword);

// Route to handle password reset
router.post("/reset-password", forgotPasswordController.resetPassword);

module.exports = router;
