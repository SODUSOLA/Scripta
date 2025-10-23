import { getUserAIUsage, getAllAIUsage } from "../../services/AI/aiUsageService.js";

// User usgae
export async function userUsage(req, res) {
    try {
        const userId = req.user.id;
        const result = await getUserAIUsage(userId);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// For admin
export async function allUsage(req, res) {
    try {
        const result = await getAllAIUsage();
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
