import { prisma } from "../db.js";

// Func to get all active sessions for logged-in user
export async function getSessions(req, res) {
    try {
        const sessions = await prisma.userSession.findMany({
        where: { userId: req.user.id },
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            ipAddress: true,
            userAgent: true,
            createdAt: true,
        },
        });

        return res.status(200).json({
        message: "Active sessions retrieved",
        sessions,
        });
    } catch (err) {
        console.error("Get sessions error:", err.message);
        return res.status(500).json({ error: "Failed to fetch sessions" });
    }
    }

    // Revoke (delete) a session
export async function revokeSession(req, res) {
    try {
        const { id } = req.params;

        // Ensure the session belongs to the current user
        const session = await prisma.userSession.findUnique({ where: { id } });

        if (!session || session.userId !== req.user.id) {
        return res.status(404).json({ error: "Session not found" });
        }

        await prisma.userSession.delete({ where: { id } });

        return res.status(200).json({ message: "Session revoked successfully" });
    } catch (err) {
        console.error("Revoke session error:", err.message);
        return res.status(500).json({ error: "Failed to revoke session" });
    }
    }
