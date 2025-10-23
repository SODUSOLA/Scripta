import express from "express";
import { authenticateToken } from "../../middlewares/authMiddleware.js";
import { createGeneratedPost, regeneratePost } from "../../controllers/AI/aiController.js";

const router = express.Router();

router.post("/generate", authenticateToken, createGeneratedPost); // Generate a new post draft
router.post("/regenerate", authenticateToken, regeneratePost); // Regenerate an existing post draft

export default router;
