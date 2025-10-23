import { generatePost } from "../../services/AI/aiService.js";

export async function createGeneratedPost(req, res) {
    try {
        const userId = req.user.id;
        const { topic, tone, platform } = req.body;
        const draft = await generatePost({ 
            userId, 
            topic, 
            tone, 
            platform,
            regenerate: false 
        });
        
        res.status(201).json(draft);
    } catch (err) {
        console.error("AI generation error:", err.message);
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
