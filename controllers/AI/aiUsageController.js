import { getUserAIUsage, getAllAIUsage } from "../../services/AI/aiUsageService.js";

// User usgae
export async function userUsage(req, res) {
    try {
        const userId = req.user.id;
        const { from, to } = req.query;
        const result = await getUserAIUsage(userId, from, to);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// For admin
export async function allUsage(req, res) {
    try {
        const { from, to } = req.query;
        const result = await getAllAIUsage(from, to);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
