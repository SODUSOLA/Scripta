import { createDraft, getUserDrafts, getDraftById, updateDraft, deleteDraft } from "../../services/POSTS/draftService.js";

// Create new draft
export async function create(req, res) {
    try {
        const userId = req.user.id;
        const { title, content, platform } = req.body;
        const draft = await createDraft({ userId, title, content, platform });
        res.status(201).json(draft);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// List all drafts
export async function list(req, res) {
    try {
        const drafts = await getUserDrafts(req.user.id);
        res.json(drafts);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// Get single draft
export async function view(req, res) {
    try {
        const draft = await getDraftById(req.user.id, req.params.id);
        res.json(draft);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

// Update draft
export async function update(req, res) {
    try {
    const { title, content } = req.body;
    const updated = await updateDraft({
        userId: req.user.id,
        draftId: req.params.id,
        title,
        content,
    });
    res.json(updated);
    } catch (err) {
    res.status(400).json({ error: err.message });
}
}

// Delete draft
export async function remove(req, res) {
    try {
        const result = await deleteDraft(req.user.id, req.params.id);
        res.json(result);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}