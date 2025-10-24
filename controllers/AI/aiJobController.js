import { aiQueue } from "../../queues/aiQueue.js";

export async function getJobStatus(req, res) {
    try {
        const { jobId } = req.params;

        const job = await aiQueue.getJob(jobId);
        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }

        const state = await job.getState();
        const result = job.returnvalue || null;
        const progress = job.progress() || 0;

        res.status(200).json({
            jobId: job.id,
            state,       // waiting | active | completed | failed | delayed
            progress,    // (0 - 100)%
            result,      // generated content (if completed)
            timestamp: new Date().toISOString(),
        });
    } catch (err) {
        console.error("Job status error:", err.message);
        res.status(500).json({ error: err.message });
    }
}
