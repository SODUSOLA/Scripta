import express from "express";
import { getSessions, revokeSession } from "../controllers/sessionController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Protected routes
router.get("/", authenticateToken, getSessions);
router.delete("/:id", authenticateToken, revokeSession);

export default router;
