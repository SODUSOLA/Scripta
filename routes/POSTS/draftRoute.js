import express from "express";
import { authenticateToken } from "../../middlewares/authMiddleware.js";
import { create, list, view, update, remove } from "../../controllers/POSTS/draftController.js";

const router = express.Router();

router.use(authenticateToken); // all routes require login

router.post("/", create); // Create post route
router.get("/", list); // Get all draft posts
router.get("/:id", view); // Get single draft
router.patch("/:id", update); // Update draft
router.delete("/:id", remove); // Delete draft

export default router;
