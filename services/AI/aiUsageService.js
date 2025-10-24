import { prisma } from "../../db.js";

// Utility: parse date safely
function parseDate(value, fallback) {
    const date = new Date(value);
    return isNaN(date) ? fallback : date;
}

// Get AI usage for a specific user
export async function getUserAIUsage(userId, from, to) {
    const start = from ? parseDate(from, new Date(0)) : new Date(0);
    const end = to ? parseDate(to, new Date()) : new Date();

    const usage = await prisma.aIUsage.findMany({
        where: {
            userId,
            createdAt: { gte: start, lte: end },
        },
        orderBy: { createdAt: "desc" },
});

    // aggregate summary
    const summary = await prisma.aIUsage.aggregate({
        where: { 
            userId,
            createdAt: { gte: from, lte: to },
        },
        _sum: {
            tokensUsed: true,
            costUSD: true,
        },
        _count: true,
    });

    // Calculate today's usage for limit tracking
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayCount = await prisma.aIUsage.count({
        where: { userId, createdAt: { gte: todayStart } },
    });

    const DAILY_LIMIT = 10; // match aiService.js

    return {
        total_generations: summary._count.id || usage.length,
        total_tokens: summary._sum.tokensUsed || 0,
        total_cost_usd: summary._sum.costUSD?.toFixed(6) || "0.000000",
        daily_usage: todayCount,
        remaining_today: Math.max(0, DAILY_LIMIT - todayCount),
        recent_activity: usage.slice(0, 10),
    };
}

// Admin: Get usage summary for all users (with user info)
export async function getAllAIUsage(from, to) {
    const start = from ? parseDate(from, new Date(0)) : new Date(0);
    const end = to ? parseDate(to, new Date()) : new Date();

    const grouped = await prisma.aIUsage.groupBy({
        by: ["userId", "model"],
        where: { createdAt: { gte: start, lte: end } },
        _sum: {
            tokensUsed: true,
            costUSD: true,
        },
        _count: {
            id: true, // Explicit count of entries
        },
    });

    // Attach user info
    return await Promise.all(
        grouped.map(async (g) => {
            const user = await prisma.user.findUnique({
                where: { id: g.userId },
                select: { username: true, email: true },
            });
            return {
                userId: g.userId,
                model: g.model,
                total_generations: g._count.id,
                total_tokens: g._sum.tokensUsed || 0,
                total_cost_usd: g._sum.costUSD?.toFixed(6) || "0.000000",
                user,
            };
        })
    );
}
