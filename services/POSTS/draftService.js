import { prisma } from "../../db.js";

// Create new draft
export async function createDraft({ userId, title, content, platform }) {
    return await prisma.draft.create({
        data: {
            title: title || "Untitled Draft",
            content: content || "",
            platform: platform || "general",
            userId,
            localLastUpdatedAt: new Date(),
            serverLastUpdatedAt: new Date(),
        },
    });

}

// Get all drafts by user
export async function getUserDrafts(userId) {
    return prisma.draft.findMany({
        where: { userId },
        orderBy: { updatedAt: "desc" },
    });
}

// Get single draft
export async function getDraftById(userId, draftId) {
    const draft = await prisma.draft.findFirst({
        where: { id: draftId, userId },
    });
    if (!draft) {
        throw new Error("Draft not found");
    }
    return draft;
}

// Update draft
export async function updateDraft({ userId, draftId, title, content }) {
    const draft = await prisma.draft.findFirst({
        where: { id: draftId, userId },
    });
    if (!draft) {
        throw new Error("Draft not found");
    }
    return await prisma.draft.update({
        where: { id: draft.id },
        data: {
            title,
            content,
            localLastUpdatedAt: new Date(),
            serverLastUpdatedAt: new Date(),
        },
    });
}

// Delete draft
    export async function deleteDraft(userId, draftId) {
    const draft = await prisma.draft.findFirst({
        where: { id: draftId, userId },
    });
    if (!draft) {
        throw new Error("Draft not found");
    }

    await prisma.draft.delete({ where: { id: draft.id } });
    return { message: "Draft deleted successfully" };
}