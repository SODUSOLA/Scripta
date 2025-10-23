import { prisma } from "../../db.js";

// Get AI usage for a specific user
export async function getUserAIUsage(userId) {
    const usage = await prisma.aIUsage.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });

    const summary = await prisma.aIUsage.aggregate({
        where: { userId },
        _sum: {
        tokensUsed: true,
        costUSD: true,
        },
        _count: true,
    });

    return {
        total_generations: summary._count.id || usage.length,
        total_tokens: summary._sum.tokensUsed || 0,
        total_cost_usd: summary._sum.costUSD?.toFixed(6) || "0.000000",
        recent_activity: usage.slice(0, 10),
    };
}

// Admin: Get usage summary for all users
export async function getAllAIUsage() {
    return await prisma.aIUsage.groupBy({
        by: ["userId", "model"],
        _sum: {
        tokensUsed: true,
        costUSD: true,
        },
        _count: true,
    });
}
