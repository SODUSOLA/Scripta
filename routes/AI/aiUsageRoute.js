import express from "express";
import { authenticateToken, verifyAdmin } from "../../middlewares/authMiddleware.js";
import { userUsage, allUsage } from "../../controllers/AI/aiUsageController.js";

const router = express.Router();

router.get("/me", authenticateToken, userUsage); // User's own stats

// Developing admin side: For admin middleware
router.get("/all", authenticateToken, verifyAdmin, allUsage);

export default router;
