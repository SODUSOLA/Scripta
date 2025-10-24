import { generatePost } from "../../services/AI/aiService.js";
import { aiQueue } from "../../queues/aiQueue.js";


export async function createGeneratedPost(req, res) {
    try {
        const userId = req.user.id;
        const { topic, tone, platform, forceQueue = false } = req.body;

        // If queue is empty and load is low, just generate instantly
        const waitingCount = await aiQueue.getWaitingCount();
        
        if (!forceQueue && waitingCount === 0) {
            const draft = await generatePost({ userId, topic, tone, platform });
            return res.status(201).json({
                message: "AI generation completed",
                draft,
            });
    }

        // Add job to queue
        const job = await aiQueue.add("generate", {
            userId,
            topic,
            tone,
            platform,
            regenerate: false,
        });

        res.status(202).json({
            message: "AI generation queued",
            jobId: job.id,
            status: "processing",
        });
    } catch (err) {
        console.error("AI queue error:", err.message);
        res.status(400).json({ error: err.message });
    }
}
// Regenerate an existing post draft
export async function regeneratePost(req, res) {
    try {
        const userId = req.user.id;
        const { topic, tone, platform } = req.body;
        const draft = await generatePost({ 
            userId, 
            topic, 
            tone,
            platform, 
            regenerate: true 
        });
        
        res.status(201).json(draft);
    } catch (err) {
        console.error("AI regeneration error:", err.message);
        res.status(400).json({ error: err.message });
    }
}

// Get AI usage summary for the logged-in user
export async function getAIUsage(req, res) {
    try {
        const userId = req.user.id;

        // Get all usage logs (most recent 50)
        const usageHistory = await prisma.aIUsage.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
            take: 50,
        });

        // Count total and today's usage
        const total = await prisma.aIUsage.count({ where: { userId } });
        const today = await prisma.aIUsage.count({
            where: {
                userId,
                createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
            },
        });

        return res.status(200).json({
            total,
            today,
            remaining: Math.max(0, 10 - today), // based on your current DAILY_GENERATION_LIMIT
            history: usageHistory,
        });
    } catch (err) {
        console.error("AI usage error:", err.message);
        return res.status(500).json({ error: err.message });
    }
}