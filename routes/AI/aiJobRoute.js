import express from "express";
import { authenticateToken } from "../../middlewares/authMiddleware.js";
import { getJobStatus } from "../../controllers/AI/aiJobController.js";

const router = express.Router();

// Check AI job status
router.get("/status/:jobId", authenticateToken, getJobStatus);

export default router;
