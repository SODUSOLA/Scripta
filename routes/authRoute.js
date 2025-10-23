import express from "express";
import { register, login, verifyLoginCode, requestReset, resetPasswordController, changePasswordController } from "../controllers/authController.js";
import { validateRegister, validateLogin } from "../middlewares/validate.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// User registration
router.post("/register", validateRegister, register);

// Login route
router.post("/login", validateLogin, login);

// Verify login from new device
router.post("/verify-login", verifyLoginCode);

// Request password reset
router.post("/request-reset", requestReset);

// Reset password
router.post("/reset-password", resetPasswordController);

// Change password (requires authentication)
router.post("/change-password", authenticateToken, changePasswordController);

export default router;
